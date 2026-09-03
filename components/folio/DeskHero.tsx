import Link from "next/link";

export function DeskHero() {
  return (
    <section className="mx-auto max-w-3xl px-3 py-10 sm:px-6 sm:py-20">
      <div className="folio-panel p-5 sm:p-10">
        <p className="text-sm font-medium text-muted">Free for everyone</p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-ink sm:text-5xl">
          Quotes and invoices that get paid
        </h1>
        <p className="mt-4 max-w-xl text-base leading-relaxed text-muted">
          Create a quote, turn it into an invoice, share a link with your
          payment QR, and confirm when the money arrives. No subscription.
        </p>
        <div className="mt-8 flex w-full flex-col gap-3 sm:flex-row sm:flex-wrap">
          <Link href="/enter" className="folio-btn-ink w-full sm:w-auto">
            Start free
          </Link>
          <Link href="/enter?mode=in" className="folio-btn-ghost w-full sm:w-auto">
            Sign in
          </Link>
        </div>
      </div>
    </section>
  );
}
