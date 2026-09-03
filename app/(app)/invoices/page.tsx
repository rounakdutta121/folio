import Link from "next/link";
import { redirect } from "next/navigation";
import { requireBusiness } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { deleteInvoice } from "@/lib/actions";
import {
  documentTotals,
  effectiveStatus,
  money,
} from "@/lib/folio-machine";

export default async function InvoicesPage() {
  const ctx = await requireBusiness();
  if (!ctx) redirect("/enter");

  const invoices = await prisma.document.findMany({
    where: { businessId: ctx.business.id, kind: "invoice" },
    include: {
      client: true,
      lineItems: true,
    },
    orderBy: { updatedAt: "desc" },
  });

  return (
    <div>
      <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            Invoices
          </h1>
          <p className="mt-1 text-sm text-muted">
            All invoices and their payment status.
          </p>
        </div>
        <Link href="/invoices/new" className="folio-btn-ink w-full sm:w-auto">
          New invoice
        </Link>
      </div>

      <div className="folio-panel mt-6 overflow-hidden p-0">
        {invoices.length ? (
          <ul className="divide-y divide-brown/30">
            {invoices.map((doc) => {
              const status = effectiveStatus(doc);
              const total = documentTotals(doc).total;
              const canEdit =
                status !== "paid" && status !== "void";

              return (
                <li
                  key={doc.id}
                  className="flex flex-col gap-3 px-3 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-5"
                >
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="font-medium">{doc.number}</p>
                      <span
                        className={
                          status === "paid"
                            ? "folio-badge folio-badge-paid capitalize"
                            : status === "overdue" || status === "awaiting_confirm"
                              ? "folio-badge folio-badge-due capitalize"
                              : "folio-badge capitalize"
                        }
                      >
                        {status.replaceAll("_", " ")}
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-muted">
                      {doc.client.name} ·{" "}
                      <span className="tabular-nums font-medium text-ink">
                        {money(total, ctx.business.currency)}
                      </span>
                    </p>
                  </div>
                  <div className="folio-actions">
                    <Link
                      href={`/invoices/${doc.id}`}
                      className="folio-btn-ghost"
                    >
                      View
                    </Link>
                    {canEdit ? (
                      <Link
                        href={`/invoices/${doc.id}/edit`}
                        className="folio-btn-ghost"
                      >
                        Edit
                      </Link>
                    ) : null}
                    <form
                      action={async () => {
                        "use server";
                        await deleteInvoice(doc.id);
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
            No invoices yet.{" "}
            <Link href="/invoices/new" className="text-accent hover:underline">
              Create one
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
