import { notFound, redirect } from "next/navigation";
import { requireBusiness } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { updateInvoice } from "@/lib/actions";
import { LineEditor } from "@/components/folio/LineEditor";
import { effectiveStatus } from "@/lib/folio-machine";

export default async function EditInvoicePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const ctx = await requireBusiness();
  if (!ctx) redirect("/enter");
  const { id } = await params;

  const doc = await prisma.document.findFirst({
    where: { id, businessId: ctx.business.id, kind: "invoice" },
    include: { lineItems: { orderBy: { sort: "asc" } } },
  });
  if (!doc) notFound();

  const status = effectiveStatus(doc);
  if (status === "paid" || status === "void") {
    redirect(`/invoices/${doc.id}`);
  }

  const clients = await prisma.client.findMany({
    where: { businessId: ctx.business.id },
    orderBy: { name: "asc" },
  });

  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="text-3xl font-semibold tracking-tight">Edit invoice</h1>
      <p className="mt-1 text-sm text-muted">{doc.number}</p>
      <form action={updateInvoice} className="folio-panel mt-6 space-y-5">
        <input type="hidden" name="id" value={doc.id} />
        <label className="block">
          <span className="folio-label">Client</span>
          <select
            name="clientId"
            defaultValue={doc.clientId}
            className="folio-input"
          >
            {clients.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </label>
        <LineEditor
          initial={doc.lineItems.map((l) => ({
            description: l.description,
            qty: l.qty,
            rate: l.rate,
          }))}
        />
        <div className="grid gap-4 sm:grid-cols-3">
          <label>
            <span className="folio-label">Discount</span>
            <input
              name="discount"
              type="number"
              step="0.01"
              defaultValue={doc.discount}
              className="folio-input"
            />
          </label>
          <label>
            <span className="folio-label">{ctx.business.taxLabel} %</span>
            <input
              name="taxRate"
              type="number"
              step="0.01"
              defaultValue={doc.taxRate}
              className="folio-input"
            />
          </label>
          <label>
            <span className="folio-label">Due</span>
            <input
              name="dueDate"
              type="date"
              defaultValue={
                doc.dueDate ? doc.dueDate.toISOString().slice(0, 10) : ""
              }
              className="folio-input"
            />
          </label>
        </div>
        <textarea
          name="notes"
          placeholder="Notes"
          defaultValue={doc.notes}
          className="folio-input"
          rows={2}
        />
        <button className="folio-btn-ink" type="submit">
          Save changes
        </button>
      </form>
    </div>
  );
}
