import type { Metadata } from "next";
import Link from "next/link";
import { MarketingSection } from "@/components/marketing/MarketingSection";
import { mktImg } from "@/lib/marketing-images";
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
        image={mktImg.termsHero}
        imageAlt="Folio terms and conditions"
        align="center"
        size="hero"
        scrim="medium"
      >
        <p className="mkt-hero-kicker" style={{ justifyContent: "center" }}>
          Legal
        </p>
        <h1 className="font-display mx-auto mt-4 max-w-3xl text-4xl font-extrabold text-white sm:text-5xl">
          Terms &amp; conditions
        </h1>
        <p className="mx-auto mt-4 text-[#b7cfd8]">
          Last updated: 3 September 2026 · {site.location}
        </p>
      </MarketingSection>

      <section className="blog-shell">
        <article className="blog-article">
          <section className="blog-article__block" id="agreement">
            <p className="blog-article__eyebrow">Agreement</p>
            <h2 className="blog-article__h2">
              By using Folio, you agree to these terms.
            </h2>
            <p className="blog-article__lead">
              If you do not agree, do not create an account or use the service.
            </p>
            <div className="blog-article__body">
              <p>
                Folio provides free software to create quotes and invoices, share
                public links, display your payment QR, and track claim/confirm
                payment statuses. Folio is not a bank, payment gateway, or tax
                filing service.
              </p>
              <p>
                Contact:{" "}
                <a className="blog-article__link" href={`mailto:${site.email}`}>
                  {site.email}
                </a>{" "}
                ·{" "}
                <a className="blog-article__link" href={`tel:${site.phone}`}>
                  {site.phoneDisplay}
                </a>{" "}
                · {site.location}
              </p>
            </div>
          </section>

          <section className="blog-article__block" id="accounts">
            <p className="blog-article__eyebrow">Accounts</p>
            <h2 className="blog-article__h2">
              You are responsible for your desk.
            </h2>
            <div className="blog-article__body">
              <p>
                Your Folio account and the data you enter are under your
                control. Keep credentials secure and use the service lawfully.
              </p>
            </div>
            <div className="blog-takeaways">
              <p className="blog-takeaways__label">Your responsibilities</p>
              <ul>
                <li>
                  <span className="blog-takeaways__mark" aria-hidden>
                    →
                  </span>
                  <span>
                    <strong>Accuracy</strong> — You must provide accurate
                    registration details and keep credentials secure.
                  </span>
                </li>
                <li>
                  <span className="blog-takeaways__mark" aria-hidden>
                    →
                  </span>
                  <span>
                    <strong>Lawful use</strong> — Do not use Folio for fraud,
                    spam, illegal goods/services, or to harass others.
                  </span>
                </li>
                <li>
                  <span className="blog-takeaways__mark" aria-hidden>
                    →
                  </span>
                  <span>
                    <strong>Client data</strong> — You are the controller of
                    client and invoice data you enter. Comply with applicable
                    privacy laws.
                  </span>
                </li>
                <li>
                  <span className="blog-takeaways__mark" aria-hidden>
                    →
                  </span>
                  <span>
                    <strong>Public links</strong> — Anyone with a document link
                    may view that document. Share carefully.
                  </span>
                </li>
              </ul>
            </div>
          </section>

          <section className="blog-article__block" id="payments">
            <p className="blog-article__eyebrow">Payments</p>
            <h2 className="blog-article__h2">
              Folio does not process your client payments.
            </h2>
            <div className="blog-article__body">
              <p>
                When clients pay via your QR or UPI details, money moves on rails
                outside Folio. Claim/confirm statuses are operational records you
                control. Folio does not guarantee settlement, bank posting times,
                or dispute outcomes with payment networks.
              </p>
              <p>
                You are responsible for tax invoices, GST compliance, and
                statutory records as required in your jurisdiction.
              </p>
            </div>
          </section>

          <section className="blog-article__block" id="service-terms">
            <p className="blog-article__eyebrow">Service terms</p>
            <h2 className="blog-article__h2">
              Availability, IP, and liability.
            </h2>
            <div className="blog-takeaways">
              <p className="blog-takeaways__label">Important points</p>
              <ul>
                {[
                  "Service is provided “as is” without warranties of uninterrupted uptime",
                  "We may modify features; core free money-path intent remains our goal",
                  "Folio branding, UI, and code remain our intellectual property",
                  "To the maximum extent permitted by law, liability is limited to direct damages you prove, and not consequential losses",
                  "We may suspend accounts that abuse the service or harm others",
                ].map((item) => (
                  <li key={item}>
                    <span className="blog-takeaways__mark" aria-hidden>
                      →
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <section className="blog-article__block" id="governing-law">
            <p className="blog-article__eyebrow">Governing law</p>
            <h2 className="blog-article__h2">India · Chandigarh contact.</h2>
            <div className="blog-article__body">
              <p>
                These terms are governed by the laws of India. For notices, use{" "}
                <a className="blog-article__link" href={`mailto:${site.email}`}>
                  {site.email}
                </a>
                . We may update these terms; continued use after changes means
                you accept the updated version.
              </p>
            </div>
          </section>

          <footer className="blog-article__footer">
            <p>
              Also see how we handle personal data in our{" "}
              <Link href="/privacy" className="blog-article__link">
                Privacy policy
              </Link>
              , or{" "}
              <Link href="/contact" className="blog-article__link">
                contact us
              </Link>{" "}
              with questions.
            </p>
          </footer>
        </article>
      </section>
    </main>
  );
}
