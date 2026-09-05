import type { Metadata } from "next";
import Link from "next/link";
import { absoluteUrl, site } from "@/lib/site";
import { mktImg } from "@/lib/marketing-images";
import { JsonLd } from "@/components/marketing/JsonLd";
import { MarketingSection } from "@/components/marketing/MarketingSection";
import { SectionHeading } from "@/components/marketing/SectionHeading";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "About Folio — free quote-to-invoice software with a clear payment trail",
  description:
    "Why Folio exists: one money document trail from quote to confirmed payment, free for service businesses that collect via QR and UPI—not freemium demos.",
  path: "/about",
});

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
        image={mktImg.aboutHero}
        imageAlt="About Folio — free quote-to-invoice desk for Indian service businesses"
        align="center"
        size="hero"
        scrim="medium"
      >
        <p className="mkt-hero-kicker" style={{ justifyContent: "center" }}>
          About
        </p>
        <h1 className="font-display mx-auto mt-5 max-w-5xl text-3xl font-extrabold leading-[1.12] tracking-tight text-white sm:text-5xl lg:text-[3.35rem]">
          Folio is the desk between a handshake{" "}
          <br className="hidden sm:block" />
          and money in the bank.
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-[#b7cfd8] sm:text-lg">
          Software for people who already know how to get paid—and keep losing
          the paper trail between estimate, invoice, and that blurry UPI
          screenshot.
        </p>
      </MarketingSection>

      <MarketingSection variant="solid" solid="#07131f" size="content">
        <SectionHeading
          align="center"
          eyebrow="Stance"
          title="Built for the messy middle of local service work."
        />
        <div className="mkt-editorial">
          <article className="mkt-editorial__card mkt-editorial__card--a">
            <h3 className="font-display text-xl font-bold text-white sm:text-2xl">
              Why we exist
            </h3>
            <p className="mt-4 text-base leading-relaxed text-[#e8f4f2]">
              Most invoice apps optimize for looking like accounting software.
              Local service businesses optimize for closing work on phones,
              collecting through a QR at the counter, and remembering who said
              what when a dispute appears.
            </p>
          </article>
          <article className="mkt-editorial__card mkt-editorial__card--b">
            <h3 className="font-display text-xl font-bold text-white sm:text-2xl">
              What we are not
            </h3>
            <p className="mt-4 text-base leading-relaxed text-[#b7cfd8]">
              Not a bank. Not a GST filing product. Not an ERP. Folio is
              operational memory for money documents: quote → invoice → QR claim
              → confirmed paid—without a processor tax on every rupee.
            </p>
          </article>
        </div>
      </MarketingSection>

      <MarketingSection variant="solid" solid="#0a1c2b" size="content">
        <div className="mkt-focus">
          <div>
            <SectionHeading
              eyebrow="Focus"
              title="Narrow on purpose."
              lead="One numbered document that begins as a quote, converts into an invoice, carries your payment QR, and records claim versus confirm."
            />
            <ul className="mt-1 space-y-3.5">
              {[
                "Quote → invoice without retyping",
                "Public page with your payment QR",
                "Claim paid vs confirm received",
              ].map((line) => (
                <li key={line} className="mkt-check">
                  <span className="mkt-check__mark" aria-hidden>
                    ✓
                  </span>
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </div>
          <div
            className="mkt-focus__media"
            style={{ backgroundImage: `url(${mktImg.aboutFocus})` }}
            aria-hidden
          />
        </div>
      </MarketingSection>

      <MarketingSection variant="solid" solid="#07131f" size="content">
        <SectionHeading
          align="center"
          eyebrow="Principles"
          title="What we refuse to blur."
        />
        <ul className="mkt-principle-grid">
          {[
            {
              t: "One trail beats many tools",
              d: "If the quote and the invoice disagree, the client argues with the weaker story. Convert; do not recreate.",
              img: mktImg.aboutP1,
            },
            {
              t: "Human confirmation is a feature",
              d: "Automatic capture is great when you want it. Until then, “awaiting confirmation” is honest and useful.",
              img: mktImg.aboutP2,
            },
            {
              t: "Free means the money path is open",
              d: "Reminders, public links, and client history are not demos.",
              img: mktImg.aboutP3,
            },
            {
              t: "Mobile clients, not dashboard tourists",
              d: "The person paying opens the link in a lobby. The QR must be obvious. The ask must be one tap.",
              img: mktImg.aboutP4,
            },
          ].map((p) => (
            <li key={p.t}>
              <div
                className="mkt-card-media"
                style={{ backgroundImage: `url(${p.img})` }}
                aria-hidden
              />
              <div className="mkt-card-body">
                <h3 className="font-display text-lg font-bold text-white sm:text-xl">
                  {p.t}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[#d1e8e4] sm:text-base">
                  {p.d}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </MarketingSection>

      <MarketingSection variant="solid" solid="#0f766e" align="center" size="band">
        <div className="mkt-cta-band">
          <SectionHeading
            align="center"
            eyebrow="Contact"
            title="Talk to us"
            lead="Fit questions, SEO partnerships, or workflow mapping—we read every message."
          >
            <div className="mkt-cta-row" style={{ marginTop: "1.25rem" }}>
              <Link href="/services" className="folio-btn-ghost">
                See the workflow
              </Link>
              <Link href="/contact" className="folio-btn-ink">
                Contact Folio
              </Link>
              <Link href="/enter" className="folio-btn-ghost">
                Start free
              </Link>
            </div>
          </SectionHeading>
        </div>
      </MarketingSection>
    </main>
  );
}
