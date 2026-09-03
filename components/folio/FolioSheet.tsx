import { documentTotals, effectiveStatus, money } from "@/lib/folio-machine";
import { SealStamp } from "./SealStamp";

export type FolioData = {
  kind: string;
  number: string;
  status: string;
  notes: string;
  validUntil: Date | string | null;
  dueDate: Date | string | null;
  discount: number;
  taxRate: number;
  taxLabel?: string;
  lineItems: { description: string; qty: number; rate: number }[];
  business: {
    name: string;
    logoUrl: string | null;
    currency: string;
    taxLabel: string;
    paymentQrUrl?: string | null;
    payInstructions?: string | null;
  };
  client: { name: string; email?: string; phone?: string };
};

function fmtDate(d: Date | string | null) {
  if (!d) return "—";
  const date = typeof d === "string" ? new Date(d) : d;
  return date.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function FolioSheet({
  doc,
  showQr = false,
}: {
  doc: FolioData;
  showQr?: boolean;
}) {
  const totals = documentTotals(doc);
  const status = effectiveStatus({
    kind: doc.kind,
    status: doc.status,
    validUntil: doc.validUntil ? new Date(doc.validUntil) : null,
    dueDate: doc.dueDate ? new Date(doc.dueDate) : null,
  });
  const paid = status === "paid";
  const voided = status === "void";
  const sealLabel = paid
    ? "Paid"
    : voided
      ? "Void"
      : doc.kind === "quote"
        ? "Quote"
        : "Due";

  return (
    <article className="folio-sheet mx-auto w-full max-w-2xl p-4 sm:p-8">
      <header className="flex flex-wrap items-start justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3 sm:gap-4">
          {doc.business.logoUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={doc.business.logoUrl}
              alt={doc.business.name}
              className="h-14 w-14 shrink-0 rounded-lg border border-border bg-white object-contain p-1 sm:h-16 sm:w-16"
            />
          ) : null}
          <div className="min-w-0">
            <p className="text-sm text-muted">
              {doc.kind === "quote" ? "Quote" : "Invoice"}
            </p>
            <h1 className="truncate text-xl font-semibold text-ink sm:text-2xl">
              {doc.business.name}
            </h1>
          </div>
        </div>
        <SealStamp label={sealLabel} stamped />
      </header>

      <div className="mt-6 grid gap-4 border-y border-border py-4 sm:grid-cols-2">
        <div>
          <p className="text-sm text-muted">Bill to</p>
          <p className="mt-1 font-medium">{doc.client.name}</p>
          {doc.client.email ? (
            <p className="text-sm text-muted">{doc.client.email}</p>
          ) : null}
          {doc.client.phone ? (
            <p className="text-sm text-muted">{doc.client.phone}</p>
          ) : null}
        </div>
        <div className="sm:text-right">
          <p className="font-medium">{doc.number}</p>
          <p className="mt-1 text-sm text-muted">
            {doc.kind === "quote"
              ? `Valid until ${fmtDate(doc.validUntil)}`
              : `Due ${fmtDate(doc.dueDate)}`}
          </p>
        </div>
      </div>

      <div className="mt-4 folio-table-wrap overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border text-left text-muted">
              <th className="pb-2 font-medium">Description</th>
              <th className="pb-2 text-right font-medium">Qty</th>
              <th className="pb-2 text-right font-medium">Rate</th>
              <th className="pb-2 text-right font-medium">Amount</th>
            </tr>
          </thead>
          <tbody>
            {doc.lineItems.map((line, i) => (
              <tr key={i} className="border-b border-border">
                <td className="py-2.5 pr-3">{line.description}</td>
                <td className="py-2.5 text-right tabular-nums">{line.qty}</td>
                <td className="py-2.5 text-right tabular-nums">
                  {money(line.rate, doc.business.currency)}
                </td>
                <td className="py-2.5 text-right tabular-nums">
                  {money(line.qty * line.rate, doc.business.currency)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6 grid gap-6 sm:grid-cols-2 sm:items-start">
        <div className="min-w-0">
          {doc.notes ? (
            <>
              <p className="text-sm font-medium text-ink">Notes</p>
              <p className="mt-1 whitespace-pre-wrap text-sm text-muted">
                {doc.notes}
              </p>
            </>
          ) : null}
        </div>
        <dl className="w-full space-y-1.5 text-sm sm:ml-auto sm:w-52">
          <div className="flex justify-between text-muted">
            <dt>Subtotal</dt>
            <dd className="tabular-nums">
              {money(totals.subtotal, doc.business.currency)}
            </dd>
          </div>
          {doc.discount > 0 ? (
            <div className="flex justify-between text-muted">
              <dt>Discount</dt>
              <dd className="tabular-nums">
                −{money(doc.discount, doc.business.currency)}
              </dd>
            </div>
          ) : null}
          {doc.taxRate > 0 ? (
            <div className="flex justify-between text-muted">
              <dt>
                {doc.taxLabel || doc.business.taxLabel} {doc.taxRate}%
              </dt>
              <dd className="tabular-nums">
                {money(totals.tax, doc.business.currency)}
              </dd>
            </div>
          ) : null}
          <div className="flex justify-between border-t border-border pt-2 text-base font-semibold">
            <dt>Total</dt>
            <dd className="tabular-nums">
              {money(totals.total, doc.business.currency)}
            </dd>
          </div>
        </dl>
      </div>

      {showQr && doc.kind === "invoice" && !paid && !voided ? (
        <footer className="mt-8 flex flex-col gap-4 border-t border-border pt-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-sm">
            <p className="text-sm font-medium">Pay</p>
            <p className="mt-1 text-sm text-muted">
              {doc.business.payInstructions}
            </p>
          </div>
          {doc.business.paymentQrUrl ? (
            <div className="rounded-lg border-2 border-brown bg-surface p-2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={doc.business.paymentQrUrl}
                alt="Payment QR"
                className="h-32 w-32 object-contain"
              />
            </div>
          ) : (
            <p className="text-sm text-danger">No QR uploaded yet.</p>
          )}
        </footer>
      ) : null}
    </article>
  );
}
