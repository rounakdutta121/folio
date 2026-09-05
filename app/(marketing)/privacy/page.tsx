import type { Metadata } from "next";
import Link from "next/link";
import { MarketingSection } from "@/components/marketing/MarketingSection";
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

      <section className="blog-shell">
        <article className="blog-article">
          <section className="blog-article__block" id="overview">
            <p className="blog-article__eyebrow">Overview</p>
            <h2 className="blog-article__h2">
              We collect only what Folio needs to run your desk.
            </h2>
            <p className="blog-article__lead">
              Folio is free quote-to-invoice software. This policy explains what
              we store, why, and how you can reach us.
            </p>
            <div className="blog-article__body">
              <p>
                This Privacy Policy applies to the Folio website and application
                operated from {site.location}. By creating an account or using
                public quote/invoice links, you agree to this policy.
              </p>
              <p>
                Questions:{" "}
                <a className="blog-article__link" href={`mailto:${site.email}`}>
                  {site.email}
                </a>{" "}
                or{" "}
                <a className="blog-article__link" href={`tel:${site.phone}`}>
                  {site.phoneDisplay}
                </a>
                .
              </p>
            </div>
          </section>

          <section className="blog-article__block" id="data-we-collect">
            <p className="blog-article__eyebrow">Data we collect</p>
            <h2 className="blog-article__h2">
              Account, business, and document data.
            </h2>
            <p className="blog-article__lead">
              Folio stores the information you enter to run quotes, invoices,
              and payments—not more than the desk needs.
            </p>
            <div className="blog-article__body">
              <p>
                Depending on how you use Folio, we may process the following
                categories of data:
              </p>
            </div>
            <div className="blog-takeaways">
              <p className="blog-takeaways__label">What we collect</p>
              <ul>
                <li>
                  <span className="blog-takeaways__mark" aria-hidden>
                    →
                  </span>
                  <span>
                    <strong>Account</strong> — Name, email, and password hash
                    (we do not store plain-text passwords).
                  </span>
                </li>
                <li>
                  <span className="blog-takeaways__mark" aria-hidden>
                    →
                  </span>
                  <span>
                    <strong>Business profile</strong> — Business name, contact
                    details, and optional payment QR image you upload.
                  </span>
                </li>
                <li>
                  <span className="blog-takeaways__mark" aria-hidden>
                    →
                  </span>
                  <span>
                    <strong>Clients &amp; documents</strong> — Client records,
                    quotes, invoices, line items, statuses, and payment events
                    you create.
                  </span>
                </li>
                <li>
                  <span className="blog-takeaways__mark" aria-hidden>
                    →
                  </span>
                  <span>
                    <strong>Usage signals</strong> — Basic technical logs (IP,
                    device/browser) needed for security and reliability.
                  </span>
                </li>
              </ul>
            </div>
          </section>

          <section className="blog-article__block" id="how-we-use-data">
            <p className="blog-article__eyebrow">How we use data</p>
            <h2 className="blog-article__h2">
              To provide Folio—not to sell your client list.
            </h2>
            <div className="blog-article__body">
              <p>
                We use personal data only to operate and protect your Folio desk.
                We do not sell personal data. Public links only expose the
                document you chose to share with a client.
              </p>
            </div>
            <div className="blog-takeaways">
              <p className="blog-takeaways__label">Uses</p>
              <ul>
                {[
                  "Authenticate you and protect your desk",
                  "Create and share quotes/invoices you request",
                  "Show payment claim/confirm status trails",
                  "Send optional email notifications when configured",
                  "Improve reliability, prevent abuse, and respond to support",
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

          <section className="blog-article__block" id="sharing-retention">
            <p className="blog-article__eyebrow">Sharing &amp; retention</p>
            <h2 className="blog-article__h2">
              Processors, retention, and your rights.
            </h2>
            <div className="blog-article__body">
              <p>
                We may use infrastructure providers (hosting, database, file
                storage, email delivery) solely to operate Folio. They process
                data under our instructions.
              </p>
              <p>
                We retain account and document data while your account is active
                and for a reasonable period afterward for backups, disputes, or
                legal obligations. You may request access, correction, or
                deletion by emailing{" "}
                <a className="blog-article__link" href={`mailto:${site.email}`}>
                  {site.email}
                </a>
                .
              </p>
            </div>
          </section>

          <footer className="blog-article__footer">
            <p>
              Privacy requests:{" "}
              <a className="blog-article__link" href={`mailto:${site.email}`}>
                {site.email}
              </a>
              {" · "}
              <a className="blog-article__link" href={`tel:${site.phone}`}>
                {site.phoneDisplay}
              </a>
              {" · "}
              {site.location}. Prefer the form?{" "}
              <Link href="/contact" className="blog-article__link">
                Contact us
              </Link>
              {" · "}
              <Link href="/terms" className="blog-article__link">
                Terms &amp; conditions
              </Link>
              .
            </p>
          </footer>
        </article>
      </section>
    </main>
  );
}
