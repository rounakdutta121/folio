import { nanoid } from "nanoid";
import { prisma } from "./prisma";
import { InvoiceStatus, QuoteStatus, effectiveStatus } from "./folio-machine";

export async function notify(input: {
  businessId: string;
  type: string;
  title: string;
  body?: string;
  href?: string;
  documentId?: string;
  dedupeKey?: string;
}) {
  // MongoDB unique (businessId, dedupeKey) rejects multiple nulls for the same business.
  // Always store a concrete key; intentional dedupe keys stay stable for upserts.
  const dedupeKey =
    input.dedupeKey ||
    `${input.type}:${input.documentId || "none"}:${Date.now()}:${nanoid(8)}`;

  try {
    return await prisma.notification.create({
      data: {
        businessId: input.businessId,
        type: input.type,
        title: input.title,
        body: input.body || "",
        href: input.href || "",
        documentId: input.documentId,
        dedupeKey,
      },
    });
  } catch {
    if (!input.dedupeKey) return null;
    // Same intentional key twice (e.g. due-soon already logged today)
    return prisma.notification.findFirst({
      where: { businessId: input.businessId, dedupeKey: input.dedupeKey },
    });
  }
}

/** Create due-soon / overdue notices once per day per document. */
export async function ensureDueNotifications(businessId: string) {
  const now = new Date();
  const soon = new Date(now);
  soon.setDate(soon.getDate() + 2);
  const dayKey = now.toISOString().slice(0, 10);

  const docs = await prisma.document.findMany({
    where: {
      businessId,
      OR: [
        {
          kind: "invoice",
          status: {
            in: [
              InvoiceStatus.DUE,
              InvoiceStatus.OVERDUE,
              InvoiceStatus.AWAITING_CONFIRM,
            ],
          },
        },
        {
          kind: "quote",
          status: { in: [QuoteStatus.SENT, QuoteStatus.DRAFT] },
        },
      ],
    },
    include: { client: true },
  });

  for (const doc of docs) {
    const status = effectiveStatus(doc);
    if (doc.kind === "invoice") {
      if (!doc.dueDate) continue;
      if (status === InvoiceStatus.PAID || status === InvoiceStatus.VOID) continue;
      const due = new Date(doc.dueDate);
      if (due < now && status !== InvoiceStatus.AWAITING_CONFIRM) {
        await notify({
          businessId,
          type: "invoice_overdue",
          title: `${doc.number} is overdue`,
          body: `${doc.client.name} — send a reminder or mark paid.`,
          href: `/invoices/${doc.id}`,
          documentId: doc.id,
          dedupeKey: `invoice_overdue:${doc.id}:${dayKey}`,
        });
      } else if (due >= now && due <= soon) {
        await notify({
          businessId,
          type: "invoice_due_soon",
          title: `${doc.number} is due soon`,
          body: `Due ${due.toLocaleDateString("en-IN")} for ${doc.client.name}. Consider a reminder.`,
          href: `/invoices/${doc.id}`,
          documentId: doc.id,
          dedupeKey: `invoice_due_soon:${doc.id}:${dayKey}`,
        });
      }
    } else if (doc.kind === "quote" && doc.validUntil) {
      if (status !== QuoteStatus.SENT && status !== QuoteStatus.DRAFT) continue;
      const valid = new Date(doc.validUntil);
      if (valid < now) {
        await notify({
          businessId,
          type: "quote_expiring",
          title: `${doc.number} has expired`,
          body: `Quote for ${doc.client.name} is past its valid date.`,
          href: `/quotes/${doc.id}`,
          documentId: doc.id,
          dedupeKey: `quote_expired:${doc.id}:${dayKey}`,
        });
      } else if (valid <= soon) {
        await notify({
          businessId,
          type: "quote_due_soon",
          title: `${doc.number} expires soon`,
          body: `Valid until ${valid.toLocaleDateString("en-IN")} for ${doc.client.name}.`,
          href: `/quotes/${doc.id}`,
          documentId: doc.id,
          dedupeKey: `quote_due_soon:${doc.id}:${dayKey}`,
        });
      }
    }
  }
}

export async function liveStamp(businessId: string) {
  const [doc, note, pay] = await Promise.all([
    prisma.document.findFirst({
      where: { businessId },
      orderBy: { updatedAt: "desc" },
      select: { updatedAt: true },
    }),
    prisma.notification.findFirst({
      where: { businessId },
      orderBy: { createdAt: "desc" },
      select: { createdAt: true },
    }),
    prisma.paymentEvent.findFirst({
      where: { document: { businessId } },
      orderBy: { createdAt: "desc" },
      select: { createdAt: true },
    }),
  ]);
  const times = [doc?.updatedAt, note?.createdAt, pay?.createdAt]
    .filter(Boolean)
    .map((d) => (d as Date).getTime());
  return times.length ? String(Math.max(...times)) : "0";
}
