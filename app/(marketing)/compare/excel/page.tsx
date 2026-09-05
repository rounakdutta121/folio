import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/marketing/JsonLd";
import { MarketingSection } from "@/components/marketing/MarketingSection";
import { SectionHeading } from "@/components/marketing/SectionHeading";
import { mktImg } from "@/lib/marketing-images";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Folio vs Excel & WhatsApp invoicing",
  description:
    "Why service businesses leave spreadsheet quotes and WhatsApp UPI chases for a free quote-to-invoice desk with QR payment confirmation.",
  path: "/compare/excel",
  image: mktImg.seoCompareExcelHero,
});

export default function CompareExcelPage() {
  return (
    <main>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "vs Excel & WhatsApp", path: "/compare/excel" },
        ])}
      />

      <MarketingSection
        variant="image"
        image={mktImg.seoCompareExcelHero}
        imageAlt="Spreadsheets and notes contrasted with a clean invoice phone"
        align="center"
        size="hero"
        scrim="medium"
      >
        <p className="mkt-hero-kicker" style={{ justifyContent: "center" }}>
          Compare
        </p>
        <h1 className="font-display mx-auto mt-5 max-w-4xl text-3xl font-extrabold leading-[1.15] text-white sm:text-5xl">
          Folio vs spreadsheets
          <br className="hidden sm:block" />
          and WhatsApp chaos.
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-[#b7cfd8] sm:text-lg">
          Excel is a fine ledger. It is a terrible shared commercial truth with
          clients. Folio keeps one trail from quote to confirmed paid.
        </p>
        <div
          className="mkt-cta-row"
          style={{ justifyContent: "center", marginTop: "1.5rem" }}
        >
          <Link href="/enter" className="folio-btn-ghost">
            Open a free desk
          </Link>
          <Link
            href="/blog/quote-to-invoice-without-spreadsheets"
            className="folio-btn-ink"
          >
            Read the deep guide
          </Link>
        </div>
      </MarketingSection>

      <MarketingSection variant="solid" solid="#07131f" size="content">
        <SectionHeading
          align="center"
          eyebrow="When sheets win"
          title="Keep Excel for your books—not the client promise."
        />
        <div className="mkt-track">
          {[
            { t: "Versions", d: "Sheets multiply files. Folio converts one folio." },
            { t: "Proof", d: "Chat screenshots vs claim/confirm on the invoice." },
            { t: "Mobile", d: "Attachments vs a thumb-friendly public QR link." },
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
            style={{ backgroundImage: `url(${mktImg.seoCompareExcelChaos})` }}
            role="img"
            aria-label="Chaotic printed sheets versus a calm notebook"
          />
          <div className="mkt-audience__body">
            <SectionHeading
              eyebrow="Monday plan"
              title="Migrate the next ten jobs—not five years of history."
            />
            <ul className="space-y-3.5">
              {[
                "Keep Excel for accounting if your CA wants it",
                "Put client truth in Folio",
                "Train one habit: convert after accept",
                "Measure fewer disputes, not more charts",
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
            eyebrow="Next"
            title="Leave the gallery QR behind."
          >
            <div className="mkt-cta-row" style={{ marginTop: "1.25rem" }}>
              <Link href="/enter" className="folio-btn-ghost">
                Start free
              </Link>
              <Link href="/upi-qr-invoice" className="folio-btn-ink">
                UPI QR invoices
              </Link>
            </div>
          </SectionHeading>
        </div>
      </MarketingSection>
    </main>
  );
}
