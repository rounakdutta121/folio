import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/marketing/JsonLd";
import { MarketingSection } from "@/components/marketing/MarketingSection";
import { SectionHeading } from "@/components/marketing/SectionHeading";
import { mktImg } from "@/lib/marketing-images";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Invoicing for contractors & agencies — Folio",
  description:
    "Free quote-to-invoice workflow for contractors and agencies: site estimates, convert to invoice, UPI QR collection, and payment confirmation trails.",
  path: "/for/contractors",
  image: mktImg.seoContractorHero,
});

export default function ForContractorsPage() {
  return (
    <main>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "For contractors & agencies", path: "/for/contractors" },
        ])}
      />

      <MarketingSection
        variant="image"
        image={mktImg.seoContractorHero}
        imageAlt="Contractor reviewing site plans on a tablet"
        align="center"
        size="hero"
        scrim="medium"
      >
        <p className="mkt-hero-kicker" style={{ justifyContent: "center" }}>
          For contractors &amp; agencies
        </p>
        <h1 className="font-display mx-auto mt-5 max-w-4xl text-3xl font-extrabold leading-[1.15] text-white sm:text-5xl">
          Site quotes that become bills—
          <br className="hidden sm:block" />
          without retyping the BOQ.
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-[#b7cfd8] sm:text-lg">
          For contractors, fit-out crews, and agencies that win work on estimates
          and collect in stages on UPI or bank transfer.
        </p>
        <div
          className="mkt-cta-row"
          style={{ justifyContent: "center", marginTop: "1.5rem" }}
        >
          <Link href="/enter" className="folio-btn-ghost">
            Open a free desk
          </Link>
          <Link href="/services#convert" className="folio-btn-ink">
            Convert workflow
          </Link>
        </div>
      </MarketingSection>

      <MarketingSection variant="solid" solid="#07131f" size="content">
        <SectionHeading
          align="center"
          eyebrow="Jobsite money"
          title="Scope changes deserve new documents—not silent edits."
          lead="Convert accepted lines forward. When scope changes, issue a new document."
        />
        <div className="mkt-track">
          {[
            { t: "Estimate", d: "Valid-until quotes with readable lines" },
            { t: "Stage bill", d: "Milestones with the same client + QR" },
            { t: "Confirm", d: "Same-day verify after claim when possible" },
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
            style={{ backgroundImage: `url(${mktImg.seoContractorBoard})` }}
            role="img"
            aria-label="Agency project board tracking invoice status"
          />
          <div className="mkt-audience__body">
            <SectionHeading
              eyebrow="Workflow"
              title="Estimate → convert → QR → confirm."
            />
            <ul className="space-y-3.5">
              {[
                "Board shows due, claimed, and confirmed",
                "Not a replacement for project ERP or Tally",
                "Companion for client-facing money documents",
                "Free so supervisors are not blocked by seat licenses",
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
            eyebrow="Start"
            title="Stop arguing about which PDF is final."
          >
            <div className="mkt-cta-row" style={{ marginTop: "1.25rem" }}>
              <Link href="/enter" className="folio-btn-ghost">
                Start free
              </Link>
              <Link href="/compare/excel" className="folio-btn-ink">
                vs spreadsheets
              </Link>
            </div>
          </SectionHeading>
        </div>
      </MarketingSection>
    </main>
  );
}
