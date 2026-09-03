import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import { requireBusiness } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { FolioSheet } from "@/components/folio/FolioSheet";
import { CopyLink } from "@/components/folio/CopyLink";
import { RemindButton } from "@/components/folio/RemindButton";
import {
  confirmPaid,
  deleteInvoice,
  markPaidCash,
  rejectClaim,
  voidInvoice,
} from "@/lib/actions";
import { appOrigin } from "@/lib/notify";
import { effectiveStatus } from "@/lib/folio-machine";

export default async function InvoicePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const ctx = await requireBusiness();
  if (!ctx) redirect("/enter");
  const { id } = await params;
  const doc = await prisma.document.findFirst({
    where: { id, businessId: ctx.business.id, kind: "invoice" },
    include: {
      client: true,
      lineItems: { orderBy: { sort: "asc" } },
      business: true,
      paymentEvents: { orderBy: { createdAt: "asc" } },
    },
  });
  if (!doc) notFound();
  const status = effectiveStatus(doc);
  const link = `${appOrigin()}/i/${doc.publicToken}`;
  const canEdit = status !== "paid" && status !== "void";

  return (
    <div className="mx-auto max-w-3xl">
      <div className="no-print folio-panel mb-4 flex flex-col gap-3 sm:mb-6">
        <div>
          <p className="text-xs uppercase tracking-wide text-muted">Invoice</p>
          <p className="text-lg font-semibold sm:text-xl">{doc.number}</p>
        </div>
        <div className="folio-actions">
        <CopyLink url={link} />
        {canEdit ? (
          <Link href={`/invoices/${doc.id}/edit`} className="folio-btn-ghost">
            Edit
          </Link>
        ) : null}
        {status !== "paid" && status !== "void" ? (
          <>
            <RemindButton documentId={doc.id} />
            {status === "awaiting_confirm" ? (
              <>
                <form
                  action={async () => {
                    "use server";
                    await confirmPaid(doc.id);
                  }}
                >
                  <button className="folio-btn-seal" type="submit">
                    Money received
                  </button>
                </form>
                <form
                  action={async () => {
                    "use server";
                    await rejectClaim(doc.id);
                  }}
                >
                  <button className="folio-btn-ghost" type="submit">
                    Not received
                  </button>
                </form>
              </>
            ) : (
              <form
                action={async () => {
                  "use server";
                  await markPaidCash(doc.id);
                }}
              >
                <button className="folio-btn-ink" type="submit">
                  Mark paid
                </button>
              </form>
            )}
            <form
              action={async () => {
                "use server";
                await voidInvoice(doc.id);
              }}
            >
              <button className="folio-btn-ghost" type="submit">
                Void
              </button>
            </form>
          </>
        ) : null}
        <form
          action={async () => {
            "use server";
            await deleteInvoice(doc.id);
          }}
        >
          <button className="folio-btn-ghost text-danger" type="submit">
            Delete invoice
          </button>
        </form>
        </div>
      </div>
      <FolioSheet doc={doc} showQr />
      <ol className="no-print folio-panel mt-6 space-y-2 text-sm">
        {doc.paymentEvents.map((e) => (
          <li key={e.id} className="text-ink">
            <span className="font-bold uppercase tracking-wide text-accent">
              {e.type}
            </span>{" "}
            <span className="text-muted">
              {new Date(e.createdAt).toLocaleString()}
              {e.reference ? ` — ${e.reference}` : ""}
            </span>
          </li>
        ))}
      </ol>
    </div>
  );
}
