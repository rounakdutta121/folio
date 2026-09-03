export const QuoteStatus = {
  DRAFT: "draft",
  SENT: "sent",
  ACCEPTED: "accepted",
  DECLINED: "declined",
  EXPIRED: "expired",
} as const;

export const InvoiceStatus = {
  DUE: "due",
  AWAITING_CONFIRM: "awaiting_confirm",
  PAID: "paid",
  OVERDUE: "overdue",
  VOID: "void",
} as const;

export type PaymentEventType =
  | "claimed"
  | "confirmed"
  | "rejected"
  | "reminded"
  | "manual_paid";

export type StoredStatus =
  | (typeof QuoteStatus)[keyof typeof QuoteStatus]
  | (typeof InvoiceStatus)[keyof typeof InvoiceStatus];

export function effectiveStatus(doc: {
  kind: string;
  status: string;
  validUntil: Date | null;
  dueDate: Date | null;
}): string {
  const now = new Date();
  if (doc.kind === "quote") {
    if (
      doc.status === QuoteStatus.SENT &&
      doc.validUntil &&
      doc.validUntil < now
    ) {
      return QuoteStatus.EXPIRED;
    }
    return doc.status;
  }
  if (doc.status === InvoiceStatus.VOID || doc.status === InvoiceStatus.PAID) {
    return doc.status;
  }
  if (doc.status === InvoiceStatus.AWAITING_CONFIRM) {
    return InvoiceStatus.AWAITING_CONFIRM;
  }
  if (doc.dueDate && doc.dueDate < now) {
    return InvoiceStatus.OVERDUE;
  }
  return InvoiceStatus.DUE;
}

export function boardColumn(doc: {
  kind: string;
  status: string;
  validUntil: Date | null;
  dueDate: Date | null;
}): string {
  const status = effectiveStatus(doc);
  if (doc.kind === "quote") {
    if (status === QuoteStatus.DRAFT) return "draft_quotes";
    if (status === QuoteStatus.SENT || status === QuoteStatus.EXPIRED)
      return "sent_quotes";
    return "sent_quotes";
  }
  if (status === InvoiceStatus.AWAITING_CONFIRM) return "awaiting";
  if (status === InvoiceStatus.PAID) return "paid";
  if (status === InvoiceStatus.OVERDUE) return "overdue";
  if (status === InvoiceStatus.VOID) return "paid";
  return "invoices_due";
}

export function canClaimPaid(status: string) {
  return (
    status === InvoiceStatus.DUE ||
    status === InvoiceStatus.OVERDUE ||
    status === InvoiceStatus.AWAITING_CONFIRM
  );
}

export function canConfirm(status: string) {
  return status === InvoiceStatus.AWAITING_CONFIRM;
}

export function money(amount: number, currency: string) {
  try {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency,
      maximumFractionDigits: 2,
    }).format(amount);
  } catch {
    return `${currency} ${amount.toFixed(2)}`;
  }
}

export function documentTotals(input: {
  lineItems: { qty: number; rate: number }[];
  discount: number;
  taxRate: number;
}) {
  const subtotal = input.lineItems.reduce((s, l) => s + l.qty * l.rate, 0);
  const afterDiscount = Math.max(0, subtotal - input.discount);
  const tax = afterDiscount * (input.taxRate / 100);
  const total = afterDiscount + tax;
  return { subtotal, afterDiscount, tax, total };
}
