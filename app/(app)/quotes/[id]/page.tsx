import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import { requireBusiness } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { FolioSheet } from "@/components/folio/FolioSheet";
import { CopyLink } from "@/components/folio/CopyLink";
import { convertQuote, deleteQuote, sendQuote } from "@/lib/actions";
import { appOrigin } from "@/lib/notify";
import { effectiveStatus } from "@/lib/folio-machine";

export default async function QuotePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const ctx = await requireBusiness();
  if (!ctx) redirect("/enter");
  const { id } = await params;
  const doc = await prisma.document.findFirst({
    where: { id, businessId: ctx.business.id, kind: "quote" },
    include: {
      client: true,
      lineItems: { orderBy: { sort: "asc" } },
      business: true,
    },
  });
  if (!doc) notFound();
  const status = effectiveStatus(doc);
  const link = `${appOrigin()}/q/${doc.publicToken}`;
  const converted = await prisma.document.findFirst({
    where: { convertedFromId: doc.id, kind: "invoice" },
  });
  const canEdit = (status === "draft" || status === "sent") && !converted;
  const canConvert =
    (status === "accepted" || status === "sent") && !converted;

  return (
    <div className="mx-auto max-w-3xl">
      <div className="no-print folio-panel mb-4 flex flex-col gap-3 sm:mb-6">
        <div>
          <p className="text-xs uppercase tracking-wide text-muted">Quote</p>
          <p className="text-lg font-semibold sm:text-xl">{doc.number}</p>
        </div>
        <div className="folio-actions">
        {status === "draft" ? (
          <form
            action={async () => {
              "use server";
              await sendQuote(doc.id);
            }}
          >
            <button className="folio-btn-ink" type="submit">
              Send
            </button>
          </form>
        ) : (
          <CopyLink url={link} />
        )}
        {canEdit ? (
          <Link href={`/quotes/${doc.id}/edit`} className="folio-btn-ghost">
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
          <button className="folio-btn-ghost text-danger" type="submit">
            Delete quote
          </button>
        </form>
        </div>
      </div>
      <FolioSheet doc={doc} />
    </div>
  );
}
