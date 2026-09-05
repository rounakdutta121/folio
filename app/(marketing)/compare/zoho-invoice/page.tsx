import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/marketing/JsonLd";
import { MarketingSection } from "@/components/marketing/MarketingSection";
import { SectionHeading } from "@/components/marketing/SectionHeading";
import { mktImg } from "@/lib/marketing-images";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Folio vs Zoho Invoice — free quote-to-invoice for UPI desks",
  description:
    "Honest comparison: Zoho Invoice is strong free SaaS invoicing. Folio is a free forever quote-to-invoice desk focused on UPI QR and claim/confirm for Indian service businesses.",
  path: "/compare/zoho-invoice",
  image: mktImg.seoCompareZohoHero,
});

export default function CompareZohoPage() {
  return (
    <main>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "vs Zoho Invoice", path: "/compare/zoho-invoice" },
        ])}
      />

      <MarketingSection
        variant="image"
        image={mktImg.seoCompareZohoHero}
        imageAlt="Two desks comparing a lean tablet workflow versus heavy binders"
        align="center"
        size="hero"
        scrim="medium"
      >
        <p className="mkt-hero-kicker" style={{ justifyContent: "center" }}>
          Compare
        </p>
        <h1 className="font-display mx-auto mt-5 max-w-4xl text-3xl font-extrabold leading-[1.15] text-white sm:text-5xl">
          Folio vs Zoho Invoice—
          <br className="hidden sm:block" />
          pick the desk that fits.
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-[#b7cfd8] sm:text-lg">
          Zoho Invoice is excellent free invoicing with a broad ecosystem. Folio
          is narrower on purpose: quote → invoice → your UPI QR → claim/confirm.
        </p>
        <div
          className="mkt-cta-row"
          style={{ justifyContent: "center", marginTop: "1.5rem" }}
        >
          <Link href="/enter" className="folio-btn-ghost">
            Try Folio free
          </Link>
          <Link href="/pricing" className="folio-btn-ink">
            Folio pricing ₹0
          </Link>
        </div>
      </MarketingSection>

      <MarketingSection variant="solid" solid="#07131f" size="content">
        <SectionHeading
          align="center"
          eyebrow="Respect the peer"
          title="Zoho wins on breadth. Folio wins on a lean UPI desk."
        />
        <ul className="mkt-principle-grid">
          {[
            {
              t: "Choose Zoho when",
              d: "You need timesheets, portals, multi-currency gateways, and Zoho ecosystem depth.",
              img: mktImg.seoCardZohoBreadth,
            },
            {
              t: "Choose Folio when",
              d: "You want convert-not-retype, your own UPI QR, and claim≠confirm without freemium cliffs.",
              img: mktImg.seoCardFolioLean,
            },
            {
              t: "GST honesty",
              d: "Neither replaces your CA. Folio is explicit: not a GST portal tool.",
              img: mktImg.seoCardGstHonesty,
            },
            {
              t: "Cost stance",
              d: "Both can be free—Folio keeps the full money path unlocked on every account.",
              img: mktImg.seoCardCostFree,
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
                <p className="mt-2 text-sm leading-relaxed text-[#b7cfd8]">
                  {i.d}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </MarketingSection>

      <MarketingSection variant="solid" solid="#0a1c2b" size="content">
        <div className="mkt-audience">
          <div
            className="mkt-audience__visual"
            style={{ backgroundImage: `url(${mktImg.seoCompareZohoLean})` }}
            role="img"
            aria-label="Lean tablet desk for a focused invoicing workflow"
          />
          <div className="mkt-audience__body">
            <SectionHeading
              eyebrow="Where Folio fits"
              title="Narrow money path + confirmation culture."
            />
            <ul className="space-y-3.5">
              {[
                "UPI QR you already use",
                "Claim ≠ confirm for owners who reconcile by eye",
                "Convert-not-retype after accept",
                "Export/ledger elsewhere either way",
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

      <MarketingSection variant="solid" solid="#0f766e" align="center" size="band">
        <div className="mkt-cta-band">
          <SectionHeading
            align="center"
            eyebrow="Decide with a real job"
            title="One client. One quote. One confirmation."
          >
            <div className="mkt-cta-row" style={{ marginTop: "1.25rem" }}>
              <Link href="/enter" className="folio-btn-ghost">
                Open Folio
              </Link>
              <Link href="/faq" className="folio-btn-ink">
                FAQ
              </Link>
            </div>
          </SectionHeading>
        </div>
      </MarketingSection>
    </main>
  );
}
