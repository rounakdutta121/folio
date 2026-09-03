import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { FolioSheet } from "@/components/folio/FolioSheet";
import { respondQuote } from "@/lib/actions";
import { effectiveStatus } from "@/lib/folio-machine";

export default async function PublicQuotePage({
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
  if (!doc || doc.kind !== "quote") notFound();
  const status = effectiveStatus(doc);

  return (
    <main className="folio-app-shell min-h-screen px-3 py-6 sm:px-4 sm:py-10">
      <FolioSheet doc={doc} />
      <div className="no-print mx-auto mt-6 flex max-w-2xl flex-wrap justify-center gap-2">
        {status === "sent" ? (
          <>
            <form
              action={async () => {
                "use server";
                await respondQuote(token, true);
              }}
            >
              <button className="folio-btn-ink" type="submit">
                Accept
              </button>
            </form>
            <form
              action={async () => {
                "use server";
                await respondQuote(token, false);
              }}
            >
              <button className="folio-btn-ghost" type="submit">
                Decline
              </button>
            </form>
          </>
        ) : (
          <p className="text-base text-muted">
            {status === "accepted"
              ? "Accepted."
              : status === "declined"
                ? "Declined."
                : status === "expired"
                  ? "This quote has expired."
                  : "This quote is not open."}
          </p>
        )}
      </div>
    </main>
  );
}
