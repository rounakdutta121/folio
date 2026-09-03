import Link from "next/link";
import { redirect } from "next/navigation";
import { requireBusiness } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { saveClient } from "@/lib/actions";

export default async function ClientsPage() {
  const ctx = await requireBusiness();
  if (!ctx) redirect("/enter");
  const clients = await prisma.client.findMany({
    where: { businessId: ctx.business.id },
    orderBy: { name: "asc" },
  });

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">Clients</h1>
        <p className="mt-1 text-sm text-muted">
          People and businesses you quote and invoice.
        </p>
      </div>
      <div className="grid gap-4 lg:grid-cols-[20rem_1fr] lg:gap-6">
        <div className="folio-panel">
          <h2 className="text-base font-semibold">Add client</h2>
          <form action={saveClient} className="mt-5 space-y-3">
            <input
              name="name"
              required
              placeholder="Name"
              className="folio-input"
            />
            <input name="phone" placeholder="Phone" className="folio-input" />
            <input
              name="email"
              type="email"
              placeholder="Email"
              className="folio-input"
            />
            <textarea
              name="notes"
              placeholder="Notes"
              rows={3}
              className="folio-input"
            />
            <button className="folio-btn-ink" type="submit">
              Add client
            </button>
          </form>
        </div>
        <div className="folio-panel overflow-hidden p-0">
          <ul className="divide-y divide-brown/30">
            {clients.map((c) => (
              <li
                key={c.id}
                className="flex items-center justify-between gap-4 px-5 py-4"
              >
                <div>
                  <p className="font-medium">{c.name}</p>
                  <p className="mt-0.5 text-sm text-muted">
                    {[c.phone, c.email].filter(Boolean).join(" · ") ||
                      "No contact yet"}
                  </p>
                </div>
                <Link
                  href={`/quotes/new?client=${c.id}`}
                  className="folio-chip"
                >
                  Create quote
                </Link>
              </li>
            ))}
            {!clients.length ? (
              <li className="px-5 py-12 text-center text-sm text-muted">
                No clients yet — add one on the left.
              </li>
            ) : null}
          </ul>
        </div>
      </div>
    </div>
  );
}
