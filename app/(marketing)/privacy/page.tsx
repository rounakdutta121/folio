import type { Metadata } from "next";
import Link from "next/link";
import { MarketingSection } from "@/components/marketing/MarketingSection";
import { SectionHeading } from "@/components/marketing/SectionHeading";
import { mktImg } from "@/lib/marketing-images";
import { absoluteUrl, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy policy",
  description: `How ${site.name} collects, uses, and protects your information.`,
  alternates: { canonical: absoluteUrl("/privacy") },
};

export default function PrivacyPage() {
  return (
    <main>
      <MarketingSection
        variant="image"
        image={mktImg.privacyHero}
        align="center"
        size="hero"
        scrim="medium"
      >
        <p className="mkt-hero-kicker" style={{ justifyContent: "center" }}>
          Legal
        </p>
        <h1 className="font-display mx-auto mt-4 max-w-3xl text-4xl font-extrabold text-white sm:text-5xl">
          Privacy policy
        </h1>
        <p className="mx-auto mt-4 text-[#b7cfd8]">
          Last updated: 3 September 2026 · {site.location}
        </p>
      </MarketingSection>

      <MarketingSection variant="solid" solid="#07131f" size="content">
        <SectionHeading
          eyebrow="Overview"
          title="We collect only what Folio needs to run your desk."
          lead="Folio is free quote-to-invoice software. This policy explains what we store, why, and how you can reach us."
        />
        <div className="mkt-blog-copy">
          <p>
            This Privacy Policy applies to the Folio website and application
            operated from {site.location}. By creating an account or using
            public quote/invoice links, you agree to this policy.
          </p>
          <p>
            Questions:{" "}
            <a className="text-yellow underline" href={`mailto:${site.email}`}>
              {site.email}
            </a>{" "}
            or{" "}
            <a className="text-yellow underline" href={`tel:${site.phone}`}>
              {site.phoneDisplay}
            </a>
            .
          </p>
        </div>
      </MarketingSection>

      <MarketingSection variant="solid" solid="#0c2233" size="content">
        <SectionHeading
          eyebrow="Data we collect"
          title="Account, business, and document data."
        />
        <ul className="mkt-principle-grid">
          {[
            {
              t: "Account",
              d: "Name, email, and password hash (we do not store plain-text passwords).",
            },
            {
              t: "Business profile",
              d: "Business name, contact details, and optional payment QR image you upload.",
            },
            {
              t: "Clients & documents",
              d: "Client records, quotes, invoices, line items, statuses, and payment events you create.",
            },
            {
              t: "Usage signals",
              d: "Basic technical logs (IP, device/browser) needed for security and reliability.",
            },
          ].map((i) => (
            <li key={i.t}>
              <h3 className="text-lg font-bold text-yellow">{i.t}</h3>
              <p className="mt-2 text-sm text-[#8eb6c7]">{i.d}</p>
            </li>
          ))}
        </ul>
      </MarketingSection>

      <MarketingSection variant="solid" solid="#0a1c2b" size="content">
        <SectionHeading
          eyebrow="How we use data"
          title="To provide Folio—not to sell your client list."
        />
        <div className="mkt-blog-takeaways">
          <p className="mkt-blog-takeaways__label">Uses</p>
          <ul>
            <li>Authenticate you and protect your desk</li>
            <li>Create and share quotes/invoices you request</li>
            <li>Show payment claim/confirm status trails</li>
            <li>Send optional email notifications when configured</li>
            <li>Improve reliability, prevent abuse, and respond to support</li>
          </ul>
        </div>
        <p className="mt-6 text-[#e8f4f2]">
          We do not sell personal data. Public links only expose the document
          you chose to share with a client.
        </p>
      </MarketingSection>

      <MarketingSection variant="solid" solid="#0f766e" size="content">
        <SectionHeading
          eyebrow="Sharing & retention"
          title="Processors, retention, and your rights."
        />
        <div className="mkt-blog-copy">
          <p>
            We may use infrastructure providers (hosting, database, file
            storage, email delivery) solely to operate Folio. They process data
            under our instructions.
          </p>
          <p>
            We retain account and document data while your account is active and
            for a reasonable period afterward for backups, disputes, or legal
            obligations. You may request access, correction, or deletion by
            emailing {site.email}.
          </p>
        </div>
      </MarketingSection>

      <MarketingSection variant="solid" solid="#0f766e" align="center" size="band">
        <div className="mkt-cta-band">
          <SectionHeading
            align="center"
            eyebrow="Contact"
            title="Privacy requests"
            lead={`${site.email} · ${site.phoneDisplay} · ${site.location}`}
          >
            <div className="mkt-cta-row" style={{ marginTop: "1.25rem" }}>
              <Link href="/contact" className="folio-btn-ghost">
                Contact form
              </Link>
              <Link href="/terms" className="folio-btn-ink">
                Terms &amp; conditions
              </Link>
            </div>
          </SectionHeading>
        </div>
      </MarketingSection>
    </main>
  );
}
