import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/marketing/JsonLd";
import { MarketingSection } from "@/components/marketing/MarketingSection";
import { SectionHeading } from "@/components/marketing/SectionHeading";
import { mktImg } from "@/lib/marketing-images";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Invoicing for clinics & studios — Folio",
  description:
    "Free quote-to-invoice software for clinics, salons, and studios in India. Share treatment or session estimates, invoice with UPI QR, and confirm payments.",
  path: "/for/clinics",
  image: mktImg.seoClinicHero,
});

export default function ForClinicsPage() {
  return (
    <main>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "For clinics & studios", path: "/for/clinics" },
        ])}
      />

      <MarketingSection
        variant="image"
        image={mktImg.seoClinicHero}
        imageAlt="Calm clinic reception desk ready for client billing"
        align="center"
        size="hero"
        scrim="medium"
      >
        <p className="mkt-hero-kicker" style={{ justifyContent: "center" }}>
          For clinics &amp; studios
        </p>
        <h1 className="font-display mx-auto mt-5 max-w-4xl text-3xl font-extrabold leading-[1.15] text-white sm:text-5xl">
          Packages, sessions, and follow-ups—
          <br className="hidden sm:block" />
          one payment trail.
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-[#b7cfd8] sm:text-lg">
          For clinics, salons, physio practices, photo studios, and teaching
          studios that quote packages and collect on UPI between appointments.
        </p>
        <div
          className="mkt-cta-row"
          style={{ justifyContent: "center", marginTop: "1.5rem" }}
        >
          <Link href="/enter" className="folio-btn-ghost">
            Open a free desk
          </Link>
          <Link href="/services" className="folio-btn-ink">
            See the workflow
          </Link>
        </div>
      </MarketingSection>

      <MarketingSection variant="solid" solid="#07131f" size="content">
        <SectionHeading
          align="center"
          eyebrow="Front desk reality"
          title="Reception should not be your accounting department."
          lead="Package quotes, session invoices, and payment proof should not live in three chats."
        />
        <div className="mkt-board">
          {[
            {
              n: "01",
              t: "Clear packages",
              d: "Line items for sessions, add-ons, and follow-ups clients can read.",
            },
            {
              n: "02",
              t: "Mobile pay",
              d: "Clients open the link in the lobby and scan—no app install for them.",
            },
            {
              n: "03",
              t: "Staff handoff",
              d: "Claim/confirm statuses tell the next shift what is still open.",
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
            style={{ backgroundImage: `url(${mktImg.seoClinicRoom})` }}
            role="img"
            aria-label="Studio treatment room with tablet for billing"
          />
          <div className="mkt-audience__body">
            <SectionHeading
              eyebrow="Fit"
              title="Service packages—not pharmacy inventory."
            />
            <ul className="space-y-3.5">
              {[
                "Keep GST filing with your CA tools",
                "Keep Folio for client-facing money documents",
                "Reduce “which PDF?” between therapists and reception",
                "One QR in settings for every due invoice",
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
            eyebrow="Try it"
            title="Quiet the front desk money trail."
          >
            <div className="mkt-cta-row" style={{ marginTop: "1.25rem" }}>
              <Link href="/enter" className="folio-btn-ghost">
                Start free
              </Link>
              <Link href="/contact" className="folio-btn-ink">
                Ask about fit
              </Link>
            </div>
          </SectionHeading>
        </div>
      </MarketingSection>
    </main>
  );
}
