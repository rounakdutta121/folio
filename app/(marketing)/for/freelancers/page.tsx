import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/marketing/JsonLd";
import { MarketingSection } from "@/components/marketing/MarketingSection";
import { SectionHeading } from "@/components/marketing/SectionHeading";
import { mktImg } from "@/lib/marketing-images";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Free invoicing for freelancers in India — Folio",
  description:
    "Folio is free quote-to-invoice software for Indian freelancers: send estimates, convert to invoices, share UPI QR, and confirm payments without freemium limits.",
  path: "/for/freelancers",
  image: mktImg.seoFreelancerHero,
});

export default function ForFreelancersPage() {
  return (
    <main>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "For freelancers", path: "/for/freelancers" },
        ])}
      />

      <MarketingSection
        variant="image"
        image={mktImg.seoFreelancerHero}
        imageAlt="Indian freelancer working at a desk with tablet"
        align="center"
        size="hero"
        scrim="medium"
      >
        <p className="mkt-hero-kicker" style={{ justifyContent: "center" }}>
          For freelancers
        </p>
        <h1 className="font-display mx-auto mt-5 max-w-4xl text-3xl font-extrabold leading-[1.15] text-white sm:text-5xl">
          Quote the job. Invoice the same lines.
          <br className="hidden sm:block" /> Get paid on UPI.
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-[#b7cfd8] sm:text-lg">
          Built for designers, developers, consultants, tutors, and creatives who
          sell services—not inventory—and collect on UPI.
        </p>
        <div
          className="mkt-cta-row"
          style={{ justifyContent: "center", marginTop: "1.5rem" }}
        >
          <Link href="/enter" className="folio-btn-ghost">
            Open a free desk
          </Link>
          <Link href="/upi-qr-invoice" className="folio-btn-ink">
            UPI QR invoices
          </Link>
        </div>
      </MarketingSection>

      <MarketingSection variant="solid" solid="#07131f" size="content">
        <SectionHeading
          align="center"
          eyebrow="The freelancer mess"
          title="Chat prices, Excel bills, QR in the gallery."
          lead="Each hop invents a different total. Folio keeps one folio."
        />
        <div className="mkt-track">
          {[
            { t: "Quote", d: "Send a clear estimate clients can accept" },
            { t: "Convert", d: "Same lines become the invoice—no retype" },
            { t: "Collect", d: "QR on the link → claim → you confirm" },
          ].map((s) => (
            <div key={s.t} className="mkt-track__step">
              <p className="mkt-track__label">{s.t}</p>
              <p className="text-base font-semibold text-white">{s.d}</p>
            </div>
          ))}
        </div>
      </MarketingSection>

      <MarketingSection variant="solid" solid="#0a1c2b" size="content">
        <div className="mkt-audience">
          <div
            className="mkt-audience__visual"
            style={{ backgroundImage: `url(${mktImg.seoFreelancerDesk})` }}
            role="img"
            aria-label="Freelancer desk with quote sheets and phone"
          />
          <div className="mkt-audience__body">
            <SectionHeading
              eyebrow="What you run"
              title="A desk that matches how you already work."
            />
            <ul className="space-y-3.5">
              {[
                "Estimates first—readable lines on mobile",
                "Convert, don’t recreate after accept",
                "UPI without gateway drama on day one",
                "Calm reminders with one link",
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
        </div>
      </MarketingSection>

      <MarketingSection variant="solid" solid="#0c2233" size="content">
        <SectionHeading
          align="center"
          eyebrow="Not for"
          title="Shops with stock and full GST ledgers."
          lead="Those jobs belong to Vyapar, Tally, or Zoho Books. Folio is the free money trail for service freelancers."
        />
        <ul className="mkt-principle-grid">
          {[
            {
              t: "Free forever",
              d: "No freemium invoice caps on the money path.",
              img: mktImg.seoCardFlFree,
            },
            {
              t: "Public links",
              d: "Clients open and pay without a Folio account.",
              img: mktImg.seoCardFlLinks,
            },
            {
              t: "Claim vs confirm",
              d: "Stops “I paid” vs “I didn’t see it” fights.",
              img: mktImg.seoCardFlClaim,
            },
            {
              t: "Beside your CA",
              d: "Not a filing tool—keep returns where they belong.",
              img: mktImg.seoCardFlCa,
            },
          ].map((i) => (
            <li key={i.t}>
              <div
                className="mkt-card-media"
                style={{ backgroundImage: `url(${i.img})` }}
                role="img"
                aria-label={i.t}
              />
              <div className="mkt-card-body">
                <h3 className="text-lg font-bold text-[#5eead4]">{i.t}</h3>
                <p className="mt-2 text-sm text-[#b7cfd8]">{i.d}</p>
              </div>
            </li>
          ))}
        </ul>
      </MarketingSection>

      <MarketingSection variant="solid" solid="#0f766e" align="center" size="band">
        <div className="mkt-cta-band">
          <SectionHeading
            align="center"
            eyebrow="Start"
            title="Run one real job this week."
          >
            <div className="mkt-cta-row" style={{ marginTop: "1.25rem" }}>
              <Link href="/enter" className="folio-btn-ghost">
                Start free
              </Link>
              <Link href="/pricing" className="folio-btn-ink">
                See pricing
              </Link>
            </div>
          </SectionHeading>
        </div>
      </MarketingSection>
    </main>
  );
}
