import Link from "next/link";
import { requireBusiness } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import {
  boardColumn,
  documentTotals,
  effectiveStatus,
  money,
} from "@/lib/folio-machine";
import { redirect } from "next/navigation";

const COLS = [
  {
    id: "draft_quotes",
    title: "Draft quotes",
    hint: "Still editing",
  },
  {
    id: "sent_quotes",
    title: "Sent quotes",
    hint: "Waiting on client",
  },
  {
    id: "invoices_due",
    title: "Invoices due",
    hint: "Payment pending",
  },
  {
    id: "awaiting",
    title: "Awaiting confirmation",
    hint: "They claim paid",
  },
  {
    id: "paid",
    title: "Paid",
    hint: "Money received",
  },
  {
    id: "overdue",
    title: "Overdue",
    hint: "Past due date",
  },
] as const;

export default async function DeskPage() {
  const ctx = await requireBusiness();
  if (!ctx) redirect("/enter");
  const docs = await prisma.document.findMany({
    where: { businessId: ctx.business.id, status: { not: "void" } },
    include: {
      client: true,
      lineItems: true,
      paymentEvents: { orderBy: { createdAt: "desc" }, take: 1 },
    },
    orderBy: { updatedAt: "desc" },
  });

  const grouped: Record<string, typeof docs> = {};
  for (const col of COLS) grouped[col.id] = [];
  for (const doc of docs) {
    const col = boardColumn(doc);
    if (grouped[col]) grouped[col].push(doc);
  }

  const invoiceLike = docs.filter((d) => d.kind === "invoice");
  const dueAmt = invoiceLike
    .filter((d) => ["due", "overdue"].includes(effectiveStatus(d)))
    .reduce((s, d) => s + documentTotals(d).total, 0);
  const claimedAmt = invoiceLike
    .filter((d) => effectiveStatus(d) === "awaiting_confirm")
    .reduce((s, d) => s + documentTotals(d).total, 0);
  const paidAmt = invoiceLike
    .filter((d) => effectiveStatus(d) === "paid")
    .reduce((s, d) => s + documentTotals(d).total, 0);

  return (
    <div className="space-y-5">
      <div className="folio-panel flex flex-col gap-5">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted">
            Workspace
          </p>
          <h1 className="mt-1 text-2xl font-semibold tracking-tight sm:text-3xl">
            Board
          </h1>
          <p className="mt-1 max-w-md text-sm text-muted">
            Quotes and invoices by status. Claimed payments wait until you
            confirm the money.
          </p>
          <div className="folio-actions mt-4">
            <Link href="/quotes" className="folio-btn-ink">
              Quotes
            </Link>
            <Link href="/invoices" className="folio-btn-ghost">
              Invoices
            </Link>
            <Link href="/clients" className="folio-btn-ghost">
              Clients
            </Link>
          </div>
        </div>
        <dl className="flex flex-wrap gap-2 sm:gap-3">
          <div className="folio-stat">
            <dt className="text-xs uppercase tracking-wide text-muted">Due</dt>
            <dd className="mt-1 text-lg font-semibold tabular-nums sm:text-xl">
              {money(dueAmt, ctx.business.currency)}
            </dd>
          </div>
          <div className="folio-stat">
            <dt className="text-xs uppercase tracking-wide text-muted">
              Claimed
            </dt>
            <dd className="mt-1 text-lg font-semibold tabular-nums text-warn sm:text-xl">
              {money(claimedAmt, ctx.business.currency)}
            </dd>
          </div>
          <div className="folio-stat">
            <dt className="text-xs uppercase tracking-wide text-muted">
              Collected
            </dt>
            <dd className="mt-1 text-lg font-semibold tabular-nums text-ok sm:text-xl">
              {money(paidAmt, ctx.business.currency)}
            </dd>
          </div>
        </dl>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 xl:grid-cols-3">
        {COLS.map((col) => (
          <section
            key={col.id}
            className="folio-panel flex min-h-[12rem] flex-col p-3 sm:min-h-[16rem] sm:p-4"
          >            <div className="flex items-start justify-between gap-2">
              <div>
                <h2 className="text-sm font-semibold text-ink">{col.title}</h2>
                <p className="mt-0.5 text-xs text-muted">{col.hint}</p>
              </div>
              <span className="rounded-full border-2 border-brown bg-yellow px-2 py-0.5 text-xs font-bold text-brown">
                {grouped[col.id].length}
              </span>
            </div>
            <ul className="mt-4 flex flex-1 flex-col gap-2.5">
              {grouped[col.id].map((doc) => {
                const total = documentTotals(doc).total;
                const href =
                  doc.kind === "quote"
                    ? `/quotes/${doc.id}`
                    : `/invoices/${doc.id}`;
                const last = doc.paymentEvents[0];
                return (
                  <li key={doc.id}>
                    <Link href={href} className="folio-card">
                      <div className="flex items-center justify-between gap-2">
                        <p className="text-xs text-muted">{doc.number}</p>
                        <span className="text-[0.65rem] uppercase tracking-wide text-muted">
                          {doc.kind}
                        </span>
                      </div>
                      <p className="mt-1 font-medium">{doc.client.name}</p>
                      <p className="mt-1 text-sm font-semibold tabular-nums">
                        {money(total, ctx.business.currency)}
                      </p>
                      {last?.reference ? (
                        <p className="mt-2 truncate text-xs text-muted">
                          {last.type}: {last.reference}
                        </p>
                      ) : null}
                    </Link>
                  </li>
                );
              })}
              {!grouped[col.id].length ? (
                <li className="folio-empty flex-1">Nothing here yet</li>
              ) : null}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}
