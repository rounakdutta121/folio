import type { Metadata } from "next";
import Link from "next/link";
import { ContactForm } from "@/components/marketing/ContactForm";
import { JsonLd } from "@/components/marketing/JsonLd";
import { MarketingSection } from "@/components/marketing/MarketingSection";
import { SectionHeading } from "@/components/marketing/SectionHeading";
import { mktImg } from "@/lib/marketing-images";
import { pageMetadata } from "@/lib/seo";
import { absoluteUrl, site } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Contact Folio — product questions, partnerships, support",
  description:
    "Contact the Folio team about quote-to-invoice workflows, QR payment tracking, partnerships, or account help. We reply to real humans.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <main>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ContactPage",
          name: "Contact Folio",
          url: absoluteUrl("/contact"),
          mainEntity: {
            "@type": "Organization",
            name: site.name,
            email: site.email,
            telephone: site.phone,
            address: {
              "@type": "PostalAddress",
              addressLocality: "Chandigarh",
              addressCountry: "IN",
            },
            url: absoluteUrl("/"),
          },
        }}
      />

      <MarketingSection
        variant="image"
        image={mktImg.contactHero}
        imageAlt="Contact Folio about quote-to-invoice workflows and support"
        align="center"
        size="hero"
        scrim="medium"
      >
        <p className="mkt-hero-kicker" style={{ justifyContent: "center" }}>
          Contact
        </p>
        <h1 className="font-display mx-auto mt-5 max-w-4xl text-3xl font-extrabold leading-[1.15] text-white sm:text-5xl">
          Tell us what is stuck
          <br className="hidden sm:block" /> in your money trail.
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-[#b7cfd8] sm:text-lg">
          Product fit, partnerships, press, or support. Prefer to try first?{" "}
          <Link
            href="/enter"
            className="text-[#5eead4] underline-offset-4 hover:underline"
          >
            Open a free desk
          </Link>
          .
        </p>
      </MarketingSection>

      <MarketingSection variant="solid" solid="#07131f" size="content">
        <SectionHeading
          align="center"
          eyebrow="Reach us"
          title="Write like a human. We’ll reply like one."
          lead="Use the form or email directly—whichever is faster for you."
        />
        <div className="mkt-dock">
          <aside className="mkt-dock__aside">
            <h3 className="font-display text-xl font-bold text-white sm:text-2xl">
              Direct channels
            </h3>
            <dl className="mt-5 space-y-5 text-[#b7cfd8]">
              <div>
                <dt className="text-sm font-bold uppercase tracking-wider text-[#5eead4]">
                  Email
                </dt>
                <dd className="mt-1 text-lg text-white">
                  <a href={`mailto:${site.email}`} className="hover:underline">
                    {site.email}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-sm font-bold uppercase tracking-wider text-[#5eead4]">
                  Phone
                </dt>
                <dd className="mt-1 text-lg text-white">
                  <a href={`tel:${site.phone}`} className="hover:underline">
                    {site.phoneDisplay}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-sm font-bold uppercase tracking-wider text-[#5eead4]">
                  Location
                </dt>
                <dd className="mt-1 text-lg text-white">{site.location}</dd>
              </div>
              <div>
                <dt className="text-sm font-bold uppercase tracking-wider text-[#5eead4]">
                  Typical reply
                </dt>
                <dd className="mt-1">Within a few business days.</dd>
              </div>
            </dl>
          </aside>
          <div className="mkt-dock__form">
            <h3 className="font-display text-xl font-bold text-white sm:text-2xl">
              Send a message
            </h3>
            <ContactForm />
          </div>
        </div>
      </MarketingSection>

      <MarketingSection variant="solid" solid="#0a1c2b" size="content">
        <SectionHeading
          align="center"
          eyebrow="Before you write"
          title="A few shortcuts that save time."
        />
        <div className="mkt-board">
          {[
            {
              n: "01",
              t: "Product fit",
              d: "Skim Services for the quote → invoice → QR confirm path.",
              img: mktImg.contactFit,
              href: "/services",
            },
            {
              n: "02",
              t: "Operations help",
              d: "The blog covers collections tone, UPI confirmation, and free invoicing checklists.",
              img: mktImg.contactOps,
              href: "/blog",
            },
            {
              n: "03",
              t: "Pricing & FAQ",
              d: "Folio is ₹0 forever. Read pricing and FAQ before you write.",
              img: mktImg.contactAccount,
              href: "/pricing",
            },
          ].map((item) => (
            <article key={item.t} className="mkt-board__card">
              <div
                className="mkt-board__media"
                style={{ backgroundImage: `url(${item.img})` }}
                role="img"
                aria-label={item.t}
              />
              <div className="mkt-board__body">
                <p className="mkt-board__n">{item.n}</p>
                <h3 className="text-lg font-bold text-white">
                  <Link href={item.href} className="hover:text-[#5eead4]">
                    {item.t}
                  </Link>
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[#b7cfd8]">
                  {item.d}{" "}
                  <Link
                    href={item.href}
                    className="font-semibold text-[#5eead4] hover:underline"
                  >
                    Open →
                  </Link>
                </p>
              </div>
            </article>
          ))}
        </div>
      </MarketingSection>
    </main>
  );
}
