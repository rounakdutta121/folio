import type { Metadata } from "next";
import Link from "next/link";
import { MarketingSection } from "@/components/marketing/MarketingSection";
import { SectionHeading } from "@/components/marketing/SectionHeading";
import { absoluteUrl, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms & conditions",
  description: `Terms of use for ${site.name} — free quote-to-invoice software.`,
  alternates: { canonical: absoluteUrl("/terms") },
};

export default function TermsPage() {
  return (
    <main>
      <MarketingSection
        variant="image"
        image="/marketing/seal.jpg"
        align="center"
        size="hero"
        scrim="heavy"
      >
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-yellow">
          Legal
        </p>
        <h1 className="mx-auto mt-3 max-w-3xl text-4xl font-black text-yellow sm:text-5xl">
          Terms &amp; conditions
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-[#fdba74]">
          Last updated: 3 September 2026 · {site.location}
        </p>
      </MarketingSection>

      <MarketingSection variant="solid" solid="#2a1540" size="content">
        <SectionHeading
          eyebrow="Agreement"
          title="By using Folio, you agree to these terms."
          lead="If you do not agree, do not create an account or use the service."
        />
        <div className="mkt-blog-copy">
          <p>
            Folio provides free software to create quotes and invoices, share
            public links, display your payment QR, and track claim/confirm
            payment statuses. Folio is not a bank, payment gateway, or tax
            filing service.
          </p>
          <p>
            Contact:{" "}
            <a className="text-yellow underline" href={`mailto:${site.email}`}>
              {site.email}
            </a>{" "}
            ·{" "}
            <a className="text-yellow underline" href={`tel:${site.phone}`}>
              {site.phoneDisplay}
            </a>{" "}
            · {site.location}
          </p>
        </div>
      </MarketingSection>

      <MarketingSection variant="solid" solid="#3b0764" size="content">
        <SectionHeading
          eyebrow="Accounts"
          title="You are responsible for your desk."
        />
        <ul className="mkt-principle-grid">
          {[
            {
              t: "Accuracy",
              d: "You must provide accurate registration details and keep credentials secure.",
            },
            {
              t: "Lawful use",
              d: "Do not use Folio for fraud, spam, illegal goods/services, or to harass others.",
            },
            {
              t: "Client data",
              d: "You are the controller of client and invoice data you enter. Comply with applicable privacy laws.",
            },
            {
              t: "Public links",
              d: "Anyone with a document link may view that document. Share carefully.",
            },
          ].map((i) => (
            <li key={i.t}>
              <h3 className="text-lg font-bold text-yellow">{i.t}</h3>
              <p className="mt-2 text-sm text-[#fdba74]">{i.d}</p>
            </li>
          ))}
        </ul>
      </MarketingSection>

      <MarketingSection variant="solid" solid="#1a0a2e" size="content">
        <SectionHeading
          eyebrow="Payments"
          title="Folio does not process your client payments."
        />
        <div className="mkt-blog-copy">
          <p>
            When clients pay via your QR or UPI details, money moves on rails
            outside Folio. Claim/confirm statuses are operational records you
            control. Folio does not guarantee settlement, bank posting times, or
            dispute outcomes with payment networks.
          </p>
          <p>
            You are responsible for tax invoices, GST compliance, and statutory
            records as required in your jurisdiction.
          </p>
        </div>
      </MarketingSection>

      <MarketingSection variant="solid" solid="#4c1d95" size="content">
        <SectionHeading
          eyebrow="Service terms"
          title="Availability, IP, and liability."
        />
        <div className="mkt-blog-takeaways">
          <p className="mkt-blog-takeaways__label">Important points</p>
          <ul>
            <li>Service is provided “as is” without warranties of uninterrupted uptime</li>
            <li>We may modify features; core free money-path intent remains our goal</li>
            <li>Folio branding, UI, and code remain our intellectual property</li>
            <li>To the maximum extent permitted by law, liability is limited to direct damages you prove, and not consequential losses</li>
            <li>We may suspend accounts that abuse the service or harm others</li>
          </ul>
        </div>
      </MarketingSection>

      <MarketingSection variant="solid" solid="#2a1540" size="content">
        <SectionHeading
          eyebrow="Governing law"
          title="India · Chandigarh contact."
        />
        <p className="text-center text-[#fdba74]">
          These terms are governed by the laws of India. For notices, use{" "}
          {site.email}. We may update these terms; continued use after changes
          means you accept the updated version.
        </p>
      </MarketingSection>

      <MarketingSection variant="solid" solid="#3b0764" align="center" size="band">
        <SectionHeading
          eyebrow="Also see"
          title="Privacy policy"
          lead="How we handle personal data related to your Folio account."
        >
          <div className="mkt-cta-row" style={{ marginTop: "1.25rem" }}>
            <Link href="/privacy" className="folio-btn-ghost">
              Privacy policy
            </Link>
            <Link href="/contact" className="folio-btn-ink">
              Contact
            </Link>
          </div>
        </SectionHeading>
      </MarketingSection>
    </main>
  );
}
