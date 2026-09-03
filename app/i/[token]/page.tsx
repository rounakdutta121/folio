import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { FolioSheet } from "@/components/folio/FolioSheet";
import { claimPaid } from "@/lib/actions";
import { effectiveStatus } from "@/lib/folio-machine";

export default async function PublicInvoicePage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;
  const doc = await prisma.document.findUnique({
    where: { publicToken: token },
    include: {
      client: true,
      lineItems: { orderBy: { sort: "asc" } },
      business: true,
    },
  });
  if (!doc || doc.kind !== "invoice") notFound();
  const status = effectiveStatus(doc);

  return (
    <main className="folio-app-shell min-h-screen px-3 py-6 sm:px-4 sm:py-10">
      <FolioSheet doc={doc} showQr />
      <div className="no-print mx-auto mt-6 max-w-2xl">
        {status === "paid" ? (
          <p className="text-center text-base font-medium text-ok">
            This invoice is paid.
          </p>
        ) : status === "void" ? (
          <p className="text-center text-base text-muted">Void.</p>
        ) : status === "awaiting_confirm" ? (
          <p className="text-center text-sm text-muted">
            You said you paid. They will confirm when the money arrives.
          </p>
        ) : (
          <form
            action={async (formData) => {
              "use server";
              await claimPaid(token, formData);
            }}
            className="folio-panel space-y-3"
          >
            <p className="text-lg font-semibold">I have paid</p>
            <p className="text-sm text-muted">
              Scan the QR, pay the total, then confirm. A UTR or last four
              digits helps them match it.
            </p>
            <input
              name="reference"
              placeholder="Reference / UTR / last 4"
              className="folio-input"
            />
            <button className="folio-btn-ink" type="submit">
              I’ve paid
            </button>
          </form>
        )}
      </div>
    </main>
  );
}
