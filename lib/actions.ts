"use server";

import { nanoid } from "nanoid";
import { redirect } from "next/navigation";
import { prisma } from "./prisma";
import {
  createSession,
  destroySession,
  hashPassword,
  requireBusiness,
  requireUser,
  verifyPassword,
} from "./auth";
import {
  InvoiceStatus,
  QuoteStatus,
  documentTotals,
  effectiveStatus,
  money,
} from "./folio-machine";
import { appOrigin, fillReminder, sendMail, whatsappHref } from "./notify";
import { notify } from "./notifications";
import { revalidatePath } from "next/cache";

function revalidateAll() {
  revalidatePath("/desk");
  revalidatePath("/clients");
  revalidatePath("/quotes");
  revalidatePath("/invoices");
  revalidatePath("/settings");
  revalidatePath("/notifications");
}

export async function signUp(formData: FormData) {
  const email = String(formData.get("email") || "")
    .trim()
    .toLowerCase();
  const password = String(formData.get("password") || "");
  const studio = String(formData.get("studio") || "").trim();
  if (!email || password.length < 8) {
    return { error: "Use an email and a password of at least 8 characters." };
  }
  const exists = await prisma.user.findUnique({ where: { email } });
  if (exists) return { error: "That email is already on a desk." };
  const user = await prisma.user.create({
    data: {
      email,
      passwordHash: await hashPassword(password),
      business: {
        create: { name: studio || "Untitled studio" },
      },
    },
  });
  await createSession(user.id);
  redirect("/desk");
}

export async function signIn(formData: FormData) {
  const email = String(formData.get("email") || "")
    .trim()
    .toLowerCase();
  const password = String(formData.get("password") || "");
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user || !(await verifyPassword(password, user.passwordHash))) {
    return { error: "Email or password is wrong." };
  }
  await createSession(user.id);
  redirect("/desk");
}

export async function signOut() {
  await destroySession();
  redirect("/");
}

export async function saveSettings(formData: FormData) {
  const ctx = await requireBusiness();
  if (!ctx) redirect("/enter");

  const qrDataUrl = String(formData.get("qrDataUrl") || "").trim();
  const logoDataUrl = String(formData.get("logoDataUrl") || "").trim();

  let paymentQrUrl = ctx.business.paymentQrUrl;
  let logoUrl = ctx.business.logoUrl;

  if (qrDataUrl.startsWith("data:image/") && qrDataUrl.length < 1_200_000) {
    paymentQrUrl = qrDataUrl;
  }
  if (logoDataUrl.startsWith("data:image/") && logoDataUrl.length < 1_200_000) {
    logoUrl = logoDataUrl;
  }

  await prisma.business.update({
    where: { id: ctx.business.id },
    data: {
      name: String(formData.get("name") || ctx.business.name),
      currency: String(formData.get("currency") || "INR").toUpperCase(),
      taxLabel: String(formData.get("taxLabel") || "GST"),
      taxRate: Number(formData.get("taxRate") || 0),
      payInstructions: String(formData.get("payInstructions") || ""),
      defaultDueDays: Number(formData.get("defaultDueDays") || 7),
      reminderTemplate: String(formData.get("reminderTemplate") || ""),
      paymentQrUrl,
      logoUrl,
    },
  });
  revalidateAll();
}

export async function saveClient(formData: FormData) {
  const ctx = await requireBusiness();
  if (!ctx) redirect("/enter");
  const id = String(formData.get("id") || "");
  const data = {
    name: String(formData.get("name") || "").trim(),
    phone: String(formData.get("phone") || "").trim(),
    email: String(formData.get("email") || "").trim(),
    notes: String(formData.get("notes") || "").trim(),
  };
  if (!data.name) throw new Error("A name is required.");
  if (id) {
    await prisma.client.updateMany({
      where: { id, businessId: ctx.business.id },
      data,
    });
  } else {
    const existing = await prisma.client.findFirst({
      where: {
        businessId: ctx.business.id,
        name: data.name,
        phone: data.phone,
        email: data.email,
      },
    });
    if (existing) {
      redirect("/clients");
    }
    await prisma.client.create({
      data: { ...data, businessId: ctx.business.id },
    });
  }
  revalidateAll();
  redirect("/clients");
}

export async function saveQuote(formData: FormData) {
  const ctx = await requireBusiness();
  if (!ctx) redirect("/enter");
  const id = String(formData.get("id") || "");
  const clientId = String(formData.get("clientId") || "");
  const descriptions = formData.getAll("description").map(String);
  const qtys = formData.getAll("qty").map(Number);
  const rates = formData.getAll("rate").map(Number);
  const lines = descriptions
    .map((description, i) => ({
      description,
      qty: qtys[i] || 0,
      rate: rates[i] || 0,
      sort: i,
    }))
    .filter((l) => l.description.trim());
  if (!clientId) throw new Error("Choose a client.");
  if (!lines.length) throw new Error("Add at least one line.");

  const validUntilRaw = String(formData.get("validUntil") || "");
  const discount = Number(formData.get("discount") || 0);
  const taxRate = Number(formData.get("taxRate") ?? ctx.business.taxRate);
  const notes = String(formData.get("notes") || "");

  if (id) {
    const existing = await prisma.document.findFirst({
      where: { id, businessId: ctx.business.id, kind: "quote" },
    });
    if (!existing) throw new Error("Quote not found.");
    if (
      existing.status !== QuoteStatus.DRAFT &&
      existing.status !== QuoteStatus.SENT
    ) {
      throw new Error("Only draft or sent quotes can be edited.");
    }
    const converted = await prisma.document.findFirst({
      where: { convertedFromId: id, kind: "invoice" },
    });
    if (converted) {
      throw new Error("This quote was already converted to an invoice.");
    }
    await prisma.$transaction([
      prisma.lineItem.deleteMany({ where: { documentId: id } }),
      prisma.document.update({
        where: { id },
        data: {
          clientId,
          discount,
          taxRate,
          notes,
          validUntil: validUntilRaw ? new Date(validUntilRaw) : null,
          lineItems: { create: lines },
        },
      }),
    ]);
    revalidateAll();
    redirect(`/quotes/${id}`);
  }

  const year = new Date().getFullYear();
  const seq = ctx.business.quoteSeq + 1;
  const created = await prisma.$transaction(async (tx) => {
    await tx.business.update({
      where: { id: ctx.business.id },
      data: { quoteSeq: seq },
    });
    return tx.document.create({
      data: {
        businessId: ctx.business.id,
        clientId,
        kind: "quote",
        status: QuoteStatus.DRAFT,
        number: `QT-${year}-${String(seq).padStart(4, "0")}`,
        publicToken: nanoid(12),
        discount,
        taxRate,
        notes,
        validUntil: validUntilRaw ? new Date(validUntilRaw) : null,
        lineItems: { create: lines },
      },
    });
  });
  revalidateAll();
  redirect(`/quotes/${created.id}`);
}

export async function sendQuote(documentId: string) {
  const ctx = await requireBusiness();
  if (!ctx) redirect("/enter");
  const doc = await prisma.document.findFirst({
    where: { id: documentId, businessId: ctx.business.id, kind: "quote" },
    include: { client: true, lineItems: true, business: true },
  });
  if (!doc || doc.status !== QuoteStatus.DRAFT) return;
  await prisma.document.update({
    where: { id: doc.id },
    data: { status: QuoteStatus.SENT },
  });
  const totals = documentTotals(doc);
  const link = `${appOrigin()}/q/${doc.publicToken}`;
  if (doc.client.email) {
    await sendMail({
      to: doc.client.email,
      subject: `${doc.number} from ${doc.business.name}`,
      text: `A quote is ready: ${link}\nTotal ${money(totals.total, doc.business.currency)}`,
    });
  }
  revalidateAll();
}

export async function respondQuote(token: string, accept: boolean) {
  const doc = await prisma.document.findUnique({
    where: { publicToken: token },
    include: { lineItems: true, client: true },
  });
  if (!doc || doc.kind !== "quote") return { error: "Not found." };
  const status = effectiveStatus(doc);
  if (status !== QuoteStatus.SENT) {
    return { error: "This quote can no longer be answered." };
  }
  await prisma.document.update({
    where: { id: doc.id },
    data: { status: accept ? QuoteStatus.ACCEPTED : QuoteStatus.DECLINED },
  });
  await notify({
    businessId: doc.businessId,
    type: accept ? "quote_accepted" : "quote_declined",
    title: accept
      ? `${doc.number} was accepted`
      : `${doc.number} was declined`,
    body: `${doc.client.name} ${accept ? "approved" : "declined"} this quote.`,
    href: `/quotes/${doc.id}`,
    documentId: doc.id,
  });
  revalidatePath(`/q/${token}`);
  revalidateAll();
}

export async function convertQuote(documentId: string) {
  const ctx = await requireBusiness();
  if (!ctx) redirect("/enter");
  const quote = await prisma.document.findFirst({
    where: { id: documentId, businessId: ctx.business.id, kind: "quote" },
    include: { lineItems: true },
  });
  if (!quote) return;
  if (
    quote.status !== QuoteStatus.ACCEPTED &&
    quote.status !== QuoteStatus.SENT
  ) {
    throw new Error("Send or accept the quote first.");
  }
  const existing = await prisma.document.findFirst({
    where: { convertedFromId: quote.id, kind: "invoice" },
  });
  if (existing) redirect(`/invoices/${existing.id}`);

  const year = new Date().getFullYear();
  const seq = ctx.business.invoiceSeq + 1;
  const due = new Date();
  due.setDate(due.getDate() + ctx.business.defaultDueDays);
  const invoice = await prisma.$transaction(async (tx) => {
    await tx.business.update({
      where: { id: ctx.business.id },
      data: { invoiceSeq: seq },
    });
    if (quote.status === QuoteStatus.SENT) {
      await tx.document.update({
        where: { id: quote.id },
        data: { status: QuoteStatus.ACCEPTED },
      });
    }
    return tx.document.create({
      data: {
        businessId: ctx.business.id,
        clientId: quote.clientId,
        kind: "invoice",
        status: InvoiceStatus.DUE,
        number: `INV-${year}-${String(seq).padStart(4, "0")}`,
        publicToken: nanoid(12),
        dueDate: due,
        discount: quote.discount,
        taxRate: quote.taxRate,
        notes: quote.notes,
        convertedFromId: quote.id,
        lineItems: {
          create: quote.lineItems.map((l) => ({
            description: l.description,
            qty: l.qty,
            rate: l.rate,
            sort: l.sort,
          })),
        },
      },
    });
  });
  revalidateAll();
  redirect(`/invoices/${invoice.id}`);
}

export async function issueInvoiceFromScratch(formData: FormData) {
  const ctx = await requireBusiness();
  if (!ctx) redirect("/enter");
  const clientId = String(formData.get("clientId") || "");
  const descriptions = formData.getAll("description").map(String);
  const qtys = formData.getAll("qty").map(Number);
  const rates = formData.getAll("rate").map(Number);
  const lines = descriptions
    .map((description, i) => ({
      description,
      qty: qtys[i] || 0,
      rate: rates[i] || 0,
      sort: i,
    }))
    .filter((l) => l.description.trim());
  if (!clientId || !lines.length) {
    throw new Error("Client and at least one line are required.");
  }
  const dueRaw = String(formData.get("dueDate") || "");
  const due = dueRaw
    ? new Date(dueRaw)
    : new Date(Date.now() + ctx.business.defaultDueDays * 86400000);
  const year = new Date().getFullYear();
  const seq = ctx.business.invoiceSeq + 1;
  const invoice = await prisma.$transaction(async (tx) => {
    await tx.business.update({
      where: { id: ctx.business.id },
      data: { invoiceSeq: seq },
    });
    return tx.document.create({
      data: {
        businessId: ctx.business.id,
        clientId,
        kind: "invoice",
        status: InvoiceStatus.DUE,
        number: `INV-${year}-${String(seq).padStart(4, "0")}`,
        publicToken: nanoid(12),
        dueDate: due,
        discount: Number(formData.get("discount") || 0),
        taxRate: Number(formData.get("taxRate") ?? ctx.business.taxRate),
        notes: String(formData.get("notes") || ""),
        lineItems: { create: lines },
      },
    });
  });
  revalidateAll();
  redirect(`/invoices/${invoice.id}`);
}

export async function updateInvoice(formData: FormData) {
  const ctx = await requireBusiness();
  if (!ctx) redirect("/enter");
  const id = String(formData.get("id") || "");
  const clientId = String(formData.get("clientId") || "");
  const descriptions = formData.getAll("description").map(String);
  const qtys = formData.getAll("qty").map(Number);
  const rates = formData.getAll("rate").map(Number);
  const lines = descriptions
    .map((description, i) => ({
      description,
      qty: qtys[i] || 0,
      rate: rates[i] || 0,
      sort: i,
    }))
    .filter((l) => l.description.trim());
  if (!id) throw new Error("Missing invoice.");
  if (!clientId || !lines.length) {
    throw new Error("Client and at least one line are required.");
  }
  const existing = await prisma.document.findFirst({
    where: { id, businessId: ctx.business.id, kind: "invoice" },
  });
  if (!existing) throw new Error("Invoice not found.");
  if (
    existing.status === InvoiceStatus.PAID ||
    existing.status === InvoiceStatus.VOID
  ) {
    throw new Error("Paid or void invoices cannot be edited.");
  }
  const dueRaw = String(formData.get("dueDate") || "");
  await prisma.$transaction([
    prisma.lineItem.deleteMany({ where: { documentId: id } }),
    prisma.document.update({
      where: { id },
      data: {
        clientId,
        discount: Number(formData.get("discount") || 0),
        taxRate: Number(formData.get("taxRate") ?? ctx.business.taxRate),
        notes: String(formData.get("notes") || ""),
        dueDate: dueRaw ? new Date(dueRaw) : existing.dueDate,
        lineItems: { create: lines },
      },
    }),
  ]);
  revalidateAll();
  redirect(`/invoices/${id}`);
}

export async function claimPaid(token: string, formData: FormData) {
  const doc = await prisma.document.findUnique({
    where: { publicToken: token },
    include: { client: true },
  });
  if (!doc || doc.kind !== "invoice") return { error: "Not found." };
  const status = effectiveStatus(doc);
  if (status === InvoiceStatus.PAID || status === InvoiceStatus.VOID) {
    return { error: "This folio is closed." };
  }
  const reference = String(formData.get("reference") || "").trim();
  await prisma.$transaction([
    prisma.paymentEvent.create({
      data: { documentId: doc.id, type: "claimed", reference },
    }),
    prisma.document.update({
      where: { id: doc.id },
      data: { status: InvoiceStatus.AWAITING_CONFIRM },
    }),
  ]);
  await notify({
    businessId: doc.businessId,
    type: "payment_claimed",
    title: `${doc.number} — payment claimed`,
    body: reference
      ? `${doc.client.name} says they paid. Ref: ${reference}`
      : `${doc.client.name} says they paid. Confirm when money arrives.`,
    href: `/invoices/${doc.id}`,
    documentId: doc.id,
  });
  revalidatePath(`/i/${token}`);
  revalidateAll();
}

export async function confirmPaid(documentId: string) {
  const ctx = await requireBusiness();
  if (!ctx) redirect("/enter");
  const doc = await prisma.document.findFirst({
    where: { id: documentId, businessId: ctx.business.id, kind: "invoice" },
    include: { client: true },
  });
  if (!doc) return;
  await prisma.$transaction([
    prisma.paymentEvent.create({
      data: { documentId: doc.id, type: "confirmed" },
    }),
    prisma.document.update({
      where: { id: doc.id },
      data: { status: InvoiceStatus.PAID },
    }),
  ]);
  await notify({
    businessId: ctx.business.id,
    type: "invoice_paid",
    title: `${doc.number} marked paid`,
    body: `Payment from ${doc.client.name} confirmed.`,
    href: `/invoices/${doc.id}`,
    documentId: doc.id,
  });
  revalidateAll();
}

export async function rejectClaim(documentId: string) {
  const ctx = await requireBusiness();
  if (!ctx) redirect("/enter");
  const doc = await prisma.document.findFirst({
    where: { id: documentId, businessId: ctx.business.id, kind: "invoice" },
    include: { client: true },
  });
  if (!doc) return;
  await prisma.$transaction([
    prisma.paymentEvent.create({
      data: { documentId: doc.id, type: "rejected" },
    }),
    prisma.document.update({
      where: { id: doc.id },
      data: { status: InvoiceStatus.DUE },
    }),
  ]);
  await notify({
    businessId: ctx.business.id,
    type: "payment_rejected",
    title: `${doc.number} — claim rejected`,
    body: `Marked not received for ${doc.client.name}. Invoice is due again.`,
    href: `/invoices/${doc.id}`,
    documentId: doc.id,
  });
  revalidateAll();
}

export async function markPaidCash(documentId: string) {
  const ctx = await requireBusiness();
  if (!ctx) redirect("/enter");
  const doc = await prisma.document.findFirst({
    where: { id: documentId, businessId: ctx.business.id, kind: "invoice" },
    include: { client: true },
  });
  if (!doc) return;
  await prisma.$transaction([
    prisma.paymentEvent.create({
      data: {
        documentId: doc.id,
        type: "manual_paid",
        reference: "cash / other",
      },
    }),
    prisma.document.update({
      where: { id: doc.id },
      data: { status: InvoiceStatus.PAID },
    }),
  ]);
  await notify({
    businessId: ctx.business.id,
    type: "invoice_paid",
    title: `${doc.number} marked paid`,
    body: `Manual / cash payment from ${doc.client.name}.`,
    href: `/invoices/${doc.id}`,
    documentId: doc.id,
  });
  revalidateAll();
}

export async function voidInvoice(documentId: string) {
  const ctx = await requireBusiness();
  if (!ctx) redirect("/enter");
  await prisma.document.updateMany({
    where: {
      id: documentId,
      businessId: ctx.business.id,
      kind: "invoice",
      status: { not: InvoiceStatus.PAID },
    },
    data: { status: InvoiceStatus.VOID },
  });
  revalidateAll();
}

export async function deleteQuote(documentId: string) {
  const ctx = await requireBusiness();
  if (!ctx) redirect("/enter");
  await prisma.document.deleteMany({
    where: {
      id: documentId,
      businessId: ctx.business.id,
      kind: "quote",
    },
  });
  revalidateAll();
  redirect("/quotes");
}

export async function deleteInvoice(documentId: string) {
  const ctx = await requireBusiness();
  if (!ctx) redirect("/enter");
  await prisma.document.deleteMany({
    where: {
      id: documentId,
      businessId: ctx.business.id,
      kind: "invoice",
    },
  });
  revalidateAll();
  redirect("/invoices");
}

export async function remindInvoice(documentId: string) {
  const ctx = await requireBusiness();
  if (!ctx) redirect("/enter");
  const doc = await prisma.document.findFirst({
    where: { id: documentId, businessId: ctx.business.id, kind: "invoice" },
    include: { client: true, lineItems: true, business: true },
  });
  if (!doc) return { href: "#" };
  const totals = documentTotals(doc);
  const link = `${appOrigin()}/i/${doc.publicToken}`;
  const text = fillReminder(doc.business.reminderTemplate, {
    name: doc.client.name,
    number: doc.number,
    amount: money(totals.total, doc.business.currency),
    link,
  });
  await prisma.paymentEvent.create({
    data: { documentId: doc.id, type: "reminded", reference: text },
  });
  await notify({
    businessId: ctx.business.id,
    type: "reminder_sent",
    title: `Reminder sent for ${doc.number}`,
    body: `Opened WhatsApp / email for ${doc.client.name}.`,
    href: `/invoices/${doc.id}`,
    documentId: doc.id,
  });
  if (doc.client.email) {
    await sendMail({
      to: doc.client.email,
      subject: `Reminder: ${doc.number}`,
      text,
    });
  }
  revalidateAll();
  return { href: whatsappHref(doc.client.phone, text), text };
}

export async function markAllNotificationsRead() {
  const ctx = await requireBusiness();
  if (!ctx) redirect("/enter");
  await prisma.notification.updateMany({
    where: { businessId: ctx.business.id, readAt: null },
    data: { readAt: new Date() },
  });
  revalidatePath("/notifications");
}

export async function markNotificationRead(id: string) {
  const ctx = await requireBusiness();
  if (!ctx) redirect("/enter");
  await prisma.notification.updateMany({
    where: { id, businessId: ctx.business.id, readAt: null },
    data: { readAt: new Date() },
  });
  revalidatePath("/notifications");
}
