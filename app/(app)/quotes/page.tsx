import Link from "next/link";
import { redirect } from "next/navigation";
import { requireBusiness } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import {
  convertQuote,
  deleteQuote,
} from "@/lib/actions";
import {
  documentTotals,
  effectiveStatus,
  money,
} from "@/lib/folio-machine";

export default async function QuotesPage() {
  const ctx = await requireBusiness();
  if (!ctx) redirect("/enter");

  const quotes = await prisma.document.findMany({
    where: { businessId: ctx.business.id, kind: "quote" },
    include: {
      client: true,
      lineItems: true,
    },
    orderBy: { updatedAt: "desc" },
  });

  const convertedIds = new Set(
    (
      await prisma.document.findMany({
        where: {
          businessId: ctx.business.id,
          kind: "invoice",
          convertedFromId: { not: null },
        },
        select: { convertedFromId: true },
      })
    )
      .map((d) => d.convertedFromId)
      .filter(Boolean) as string[],
  );

  return (
    <div>
      <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">Quotes</h1>
          <p className="mt-1 text-sm text-muted">
            All estimates you have created.
          </p>
        </div>
        <Link href="/quotes/new" className="folio-btn-ink w-full sm:w-auto">
          New quote
        </Link>
      </div>

      <div className="folio-panel mt-6 overflow-hidden p-0">
        {quotes.length ? (
          <ul className="divide-y divide-brown/30">
            {quotes.map((doc) => {
              const status = effectiveStatus(doc);
              const total = documentTotals(doc).total;
              const canEdit =
                (status === "draft" || status === "sent") &&
                !convertedIds.has(doc.id);
              const canConvert =
                (status === "sent" || status === "accepted") &&
                !convertedIds.has(doc.id);

              return (
                <li
                  key={doc.id}
                  className="flex flex-col gap-3 px-3 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-5"
                >
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="font-medium">{doc.number}</p>
                      <span className="folio-badge capitalize">{status}</span>
                    </div>
                    <p className="mt-1 text-sm text-muted">
                      {doc.client.name} ·{" "}
                      <span className="tabular-nums font-medium text-ink">
                        {money(total, ctx.business.currency)}
                      </span>
                    </p>
                  </div>
                  <div className="folio-actions">
                    <Link href={`/quotes/${doc.id}`} className="folio-btn-ghost">
                      View
                    </Link>
                    {canEdit ? (
                      <Link
                        href={`/quotes/${doc.id}/edit`}
                        className="folio-btn-ghost"
                      >
                        Edit
                      </Link>
                    ) : null}
                    {canConvert ? (
                      <form
                        action={async () => {
                          "use server";
                          await convertQuote(doc.id);
                        }}
                      >
                        <button className="folio-btn-seal" type="submit">
                          Convert to invoice
                        </button>
                      </form>
                    ) : null}
                    <form
                      action={async () => {
                        "use server";
                        await deleteQuote(doc.id);
                      }}
                    >
                      <button
                        className="folio-btn-ghost text-danger"
                        type="submit"
                      >
                        Delete
                      </button>
                    </form>
                  </div>
                </li>
              );
            })}
          </ul>
        ) : (
          <div className="px-5 py-12 text-center text-sm text-muted">
            No quotes yet.{" "}
            <Link href="/quotes/new" className="text-accent hover:underline">
              Create one
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
