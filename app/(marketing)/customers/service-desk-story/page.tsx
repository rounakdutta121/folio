import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/marketing/JsonLd";
import { MarketingSection } from "@/components/marketing/MarketingSection";
import { SectionHeading } from "@/components/marketing/SectionHeading";
import { mktImg } from "@/lib/marketing-images";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Service desk story — quote to confirmed paid with Folio",
  description:
    "A composite case story of how a service business replaced spreadsheet quotes and WhatsApp payment chases with Folio’s free quote-to-invoice and UPI confirmation trail.",
  path: "/customers/service-desk-story",
  image: mktImg.seoStoryHero,
});

export default function CustomerStoryPage() {
  return (
    <main>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Service desk story", path: "/customers/service-desk-story" },
        ])}
      />

      <MarketingSection
        variant="image"
        image={mktImg.seoStoryHero}
        imageAlt="Studio owner completing a job and preparing to invoice"
        align="center"
        size="hero"
        scrim="medium"
      >
        <p className="mkt-hero-kicker" style={{ justifyContent: "center" }}>
          Customer story
        </p>
        <h1 className="font-display mx-auto mt-5 max-w-4xl text-3xl font-extrabold leading-[1.15] text-white sm:text-5xl">
          From chat prices to
          <br className="hidden sm:block" />
          confirmed paid—one desk.
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-[#b7cfd8] sm:text-lg">
          Composite story based on how Folio is designed to be used. Names and
          figures are illustrative; the workflow is real.
        </p>
        <div
          className="mkt-cta-row"
          style={{ justifyContent: "center", marginTop: "1.5rem" }}
        >
          <Link href="/enter" className="folio-btn-ghost">
            Try the same path free
          </Link>
          <Link href="/services" className="folio-btn-ink">
            See the workflow
          </Link>
        </div>
      </MarketingSection>

      <MarketingSection variant="solid" solid="#07131f" size="content">
        <SectionHeading
          align="center"
          eyebrow="Before"
          title="Three tools, one confused client."
          lead="WhatsApp quotes, spreadsheet bills, gallery QR—partial payments with no matching document."
        />
        <div className="mkt-board">
          {[
            {
              n: "01",
              t: "Broken trail",
              d: "Price in chat, invoice in Excel, proof in media folders.",
            },
            {
              n: "02",
              t: "Noisy reminders",
              d: "Two teammates pinging the same morning.",
            },
            {
              n: "03",
              t: "Trust cooled",
              d: "Good work, messy money story.",
            },
          ].map((item) => (
            <article key={item.t} className="mkt-board__card">
              <div className="mkt-board__body">
                <p className="mkt-board__n">{item.n}</p>
                <h3 className="text-lg font-bold text-white">{item.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#b7cfd8]">
                  {item.d}
                </p>
              </div>
            </article>
          ))}
        </div>
      </MarketingSection>

      <MarketingSection variant="solid" solid="#0a1c2b" size="content">
        <div className="mkt-audience">
          <div
            className="mkt-audience__visual"
            style={{ backgroundImage: `url(${mktImg.seoStoryConfirm})` }}
            role="img"
            aria-label="Confirming payment on an invoice"
          />
          <div className="mkt-audience__body">
            <SectionHeading
              eyebrow="After"
              title="One folio, three statuses that matter."
            />
            <ul className="space-y-3.5">
              {[
                "Week 1: active clients, Folio quotes, public accept",
                "Week 2: convert after accept, QR once in settings",
                "Week 3: remind from the invoice, confirm same day",
                "Fewer “which PDF?” messages—quiet Mondays",
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
          eyebrow="Lesson"
          title="Professional means a stable trail."
          lead="Stable amount, due date, QR that works on a mid-range phone, and a human who confirms receipt."
        />
        <div className="mkt-track">
          {[
            { t: "Due", d: "Share the public invoice" },
            { t: "Claimed", d: "Client says paid" },
            { t: "Confirmed", d: "Bank matched—trail closed" },
          ].map((s) => (
            <div key={s.t} className="mkt-track__step">
              <p className="mkt-track__label">{s.t}</p>
              <p className="text-base font-semibold text-white">{s.d}</p>
            </div>
          ))}
        </div>
      </MarketingSection>

      <MarketingSection variant="solid" solid="#0f766e" align="center" size="band">
        <div className="mkt-cta-band">
          <SectionHeading
            align="center"
            eyebrow="Your turn"
            title="Run the same story on your desk."
          >
            <div className="mkt-cta-row" style={{ marginTop: "1.25rem" }}>
              <Link href="/enter" className="folio-btn-ghost">
                Start free
              </Link>
              <Link href="/for/freelancers" className="folio-btn-ink">
                For freelancers
              </Link>
            </div>
          </SectionHeading>
        </div>
      </MarketingSection>
    </main>
  );
}
