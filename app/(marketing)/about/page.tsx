import type { Metadata } from "next";
import Link from "next/link";
import { absoluteUrl, site } from "@/lib/site";
import { JsonLd } from "@/components/marketing/JsonLd";
import { MarketingSection } from "@/components/marketing/MarketingSection";
import { SectionHeading } from "@/components/marketing/SectionHeading";

export const metadata: Metadata = {
  title: "About Folio — free quote-to-invoice software with a clear payment trail",
  description:
    "Why Folio exists: one money document trail from quote to confirmed payment, free for service businesses that collect via QR and UPI—not freemium demos.",
  alternates: { canonical: absoluteUrl("/about") },
  openGraph: {
    title: "About Folio",
    description:
      "Paper-like money documents, claim-vs-confirm payment tracking, free for every account.",
    url: absoluteUrl("/about"),
  },
};

export default function AboutPage() {
  return (
    <main>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "AboutPage",
          name: "About Folio",
          url: absoluteUrl("/about"),
          description: site.description,
          mainEntity: {
            "@type": "Organization",
            name: site.name,
            url: absoluteUrl("/"),
            email: site.email,
          },
        }}
      />

      <MarketingSection
        variant="image"
        image="/marketing/dusk.jpg"
        align="center"
        size="hero"
        scrim="heavy"
      >
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-yellow">
          About
        </p>
        <h1 className="mx-auto mt-3 max-w-3xl text-3xl font-black text-yellow sm:text-5xl">
          Folio is the desk between a handshake and money in the bank.
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-[#fdba74] sm:text-lg">
          Software for people who already know how to get paid—and keep losing
          the paper trail between estimate, invoice, and that blurry UPI
          screenshot.
        </p>
      </MarketingSection>

      <MarketingSection variant="solid" solid="#2a1540" size="content">
        <SectionHeading
          eyebrow="Stance"
          title="Built for the messy middle of local service work."
        />
        <div className="mkt-pair">
          <div className="mkt-pair__cell" style={{ background: "#3b0764" }}>
            <h3 className="text-xl font-bold text-yellow sm:text-2xl">
              Why we exist
            </h3>
            <p className="mt-4 text-base leading-relaxed text-[#fff8e7]">
              Most invoice apps optimize for looking like accounting software.
              Local service businesses optimize for closing work on phones,
              collecting through a QR at the counter, and remembering who said
              what when a dispute appears.
            </p>
          </div>
          <div className="mkt-pair__cell" style={{ background: "#1a0a2e" }}>
            <h3 className="text-xl font-bold text-yellow sm:text-2xl">
              What we are not
            </h3>
            <p className="mt-4 text-base leading-relaxed text-[#fdba74]">
              Not a bank. Not a GST filing product. Not an ERP. Folio is
              operational memory for money documents: quote → invoice → QR claim
              → confirmed paid—without a processor tax on every rupee.
            </p>
          </div>
        </div>
      </MarketingSection>

      <MarketingSection variant="solid" solid="#3b0764" size="content">
        <SectionHeading
          eyebrow="Focus"
          title="Narrow on purpose."
          lead="One numbered document that begins as a quote, converts into an invoice, carries your payment QR, and records claim versus confirm."
        />
        <div className="mkt-split-panel">
          <div
            className="mkt-split-panel__visual"
            style={{ backgroundImage: "url(/marketing/seal.jpg)" }}
            aria-hidden
          />
          <div className="mkt-split-panel__body">
            <p className="text-base leading-relaxed text-[#fdba74]">
              That trail is the product. Everything else is noise we refuse to
              ship as “features.”
            </p>
            <ul className="mt-5 space-y-3 text-[#fff8e7]">
              {[
                "Quote → invoice without retyping",
                "Public page with your payment QR",
                "Claim paid vs confirm received",
              ].map((line) => (
                <li key={line} className="flex gap-3 text-sm sm:text-base">
                  <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-yellow" />
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </MarketingSection>

      <MarketingSection variant="solid" solid="#1a0a2e" size="content">
        <SectionHeading
          eyebrow="Principles"
          title="What we refuse to blur."
        />
        <ul className="mkt-principle-grid">
          {[
            {
              t: "One trail beats many tools",
              d: "If the quote and the invoice disagree, the client argues with the weaker story. Convert; do not recreate.",
            },
            {
              t: "Human confirmation is a feature",
              d: "Automatic capture is great when you want it. Until then, “awaiting confirmation” is honest and useful.",
            },
            {
              t: "Free means the money path is open",
              d: "Reminders, public links, and client history are not demos.",
            },
            {
              t: "Mobile clients, not dashboard tourists",
              d: "The person paying opens the link in a lobby. The QR must be obvious. The ask must be one tap.",
            },
          ].map((p) => (
            <li key={p.t}>
              <h3 className="text-lg font-bold text-yellow">{p.t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[#fdba74] sm:text-base">
                {p.d}
              </p>
            </li>
          ))}
        </ul>
      </MarketingSection>

      <MarketingSection variant="solid" solid="#4c1d95" align="center" size="band">
        <SectionHeading
          eyebrow="Contact"
          title="Talk to us"
          lead="Fit questions, SEO partnerships, or workflow mapping—we read every message."
        >
          <div className="mkt-cta-row" style={{ marginTop: "1.25rem" }}>
            <Link href="/contact" className="folio-btn-ghost">
              Contact Folio
            </Link>
            <Link href="/enter" className="folio-btn-ink">
              Start free instead
            </Link>
          </div>
        </SectionHeading>
      </MarketingSection>
    </main>
  );
}
