import type { Metadata } from "next";
import Link from "next/link";
import { ContactForm } from "@/components/marketing/ContactForm";
import { JsonLd } from "@/components/marketing/JsonLd";
import { MarketingSection } from "@/components/marketing/MarketingSection";
import { SectionHeading } from "@/components/marketing/SectionHeading";
import { absoluteUrl, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact Folio — product questions, partnerships, support",
  description:
    "Contact the Folio team about quote-to-invoice workflows, QR payment tracking, partnerships, or account help. We reply to real humans.",
  alternates: { canonical: absoluteUrl("/contact") },
  openGraph: {
    title: "Contact Folio",
    description: "Ask about fit, partnerships, or support for free Folio desks.",
    url: absoluteUrl("/contact"),
  },
};

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
        image="/marketing/dusk.jpg"
        align="center"
        size="hero"
        scrim="heavy"
      >
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-yellow">
          Contact
        </p>
        <h1 className="mx-auto mt-3 max-w-3xl text-3xl font-black text-yellow sm:text-5xl">
          Tell us what is stuck in your money trail.
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-[#fdba74] sm:text-lg">
          Product fit, partnerships, press, or support. Prefer to try first?{" "}
          <Link
            href="/enter"
            className="text-yellow underline-offset-4 hover:underline"
          >
            Open a free desk
          </Link>
          .
        </p>
      </MarketingSection>

      <MarketingSection variant="solid" solid="#2a1540" size="content">
        <SectionHeading
          eyebrow="Reach us"
          title="Write like a human. We’ll reply like one."
          lead="Use the form or email directly—whichever is faster for you."
        />
        <div className="mkt-pair">
          <div className="mkt-pair__cell" style={{ background: "#3b0764" }}>
            <h3 className="text-xl font-bold text-yellow sm:text-2xl">
              Direct channels
            </h3>
            <dl className="mt-5 space-y-5 text-[#fdba74]">
              <div>
                <dt className="text-sm font-bold uppercase tracking-wider text-yellow">
                  Email
                </dt>
                <dd className="mt-1 text-lg text-[#fff8e7]">
                  <a href={`mailto:${site.email}`} className="hover:underline">
                    {site.email}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-sm font-bold uppercase tracking-wider text-yellow">
                  Phone
                </dt>
                <dd className="mt-1 text-lg text-[#fff8e7]">
                  <a href={`tel:${site.phone}`} className="hover:underline">
                    {site.phoneDisplay}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-sm font-bold uppercase tracking-wider text-yellow">
                  Location
                </dt>
                <dd className="mt-1 text-lg text-[#fff8e7]">{site.location}</dd>
              </div>
              <div>
                <dt className="text-sm font-bold uppercase tracking-wider text-yellow">
                  Typical reply
                </dt>
                <dd className="mt-1">Within a few business days.</dd>
              </div>
            </dl>
            <ul className="mt-6 space-y-2 text-sm text-[#fdba74]">
              <li>
                · Browse{" "}
                <Link href="/services" className="text-yellow hover:underline">
                  services
                </Link>
              </li>
              <li>
                · Read the{" "}
                <Link href="/blog" className="text-yellow hover:underline">
                  blog
                </Link>
              </li>
            </ul>
          </div>
          <div className="mkt-pair__cell" style={{ background: "#1a0a2e" }}>
            <h3 className="text-xl font-bold text-yellow sm:text-2xl">
              Send a message
            </h3>
            <ContactForm />
          </div>
        </div>
      </MarketingSection>

      <MarketingSection variant="solid" solid="#3b0764" size="content">
        <SectionHeading
          eyebrow="Before you write"
          title="A few shortcuts that save time."
        />
        <div className="mkt-steps-row">
          {[
            {
              n: "01",
              t: "Product fit",
              d: "Skim Services for the quote → invoice → QR confirm path.",
            },
            {
              n: "02",
              t: "Operations help",
              d: "The blog covers collections tone, UPI confirmation, and free invoicing checklists.",
            },
            {
              n: "03",
              t: "Account issues",
              d: "Include the email you signed up with so we can find your desk faster.",
            },
          ].map((item) => (
            <div key={item.t} className="mkt-step-tile">
              <span className="mkt-step-tile__n">{item.n}</span>
              <h3 className="text-lg font-bold text-[#fff8e7]">{item.t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[#fdba74]">
                {item.d}
              </p>
            </div>
          ))}
        </div>
      </MarketingSection>
    </main>
  );
}
