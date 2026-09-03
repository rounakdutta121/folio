import { redirect } from "next/navigation";
import { requireBusiness } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { saveQuote } from "@/lib/actions";
import { LineEditor } from "@/components/folio/LineEditor";

export default async function NewQuotePage({
  searchParams,
}: {
  searchParams: Promise<{ client?: string }>;
}) {
  const ctx = await requireBusiness();
  if (!ctx) redirect("/enter");
  const { client } = await searchParams;
  const clients = await prisma.client.findMany({
    where: { businessId: ctx.business.id },
    orderBy: { name: "asc" },
  });
  if (!clients.length) redirect("/clients");

  const valid = new Date();
  valid.setDate(valid.getDate() + 14);
  const validStr = valid.toISOString().slice(0, 10);

  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="text-3xl font-semibold tracking-tight">New quote</h1>
      <p className="mt-1 text-sm text-muted">
        Build the estimate, then send a public link.
      </p>
      <form action={saveQuote} className="folio-panel mt-6 space-y-5">
        <label className="block">
          <span className="folio-label">Client</span>
          <select
            name="clientId"
            defaultValue={client || clients[0].id}
            className="folio-input"
          >
            {clients.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </label>
        <LineEditor />
        <div className="grid gap-4 sm:grid-cols-3">
          <label>
            <span className="folio-label">Discount</span>
            <input
              name="discount"
              type="number"
              step="0.01"
              defaultValue={0}
              className="folio-input"
            />
          </label>
          <label>
            <span className="folio-label">{ctx.business.taxLabel} %</span>
            <input
              name="taxRate"
              type="number"
              step="0.01"
              defaultValue={ctx.business.taxRate}
              className="folio-input"
            />
          </label>
          <label>
            <span className="folio-label">Valid until</span>
            <input
              name="validUntil"
              type="date"
              defaultValue={validStr}
              className="folio-input"
            />
          </label>
        </div>
        <textarea
          name="notes"
          placeholder="Notes"
          className="folio-input"
          rows={2}
        />
        <button className="folio-btn-ink" type="submit">
          Save draft
        </button>
      </form>
    </div>
  );
}
