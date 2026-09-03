import type { Metadata } from "next";
import Link from "next/link";
import { allPosts } from "@/lib/blog";
import { absoluteUrl, site } from "@/lib/site";
import { JsonLd } from "@/components/marketing/JsonLd";
import { MarketingSection } from "@/components/marketing/MarketingSection";
import { SectionHeading } from "@/components/marketing/SectionHeading";

export const metadata: Metadata = {
  title: `${site.name} — Free quote to invoice with QR payment confirmation`,
  description: site.description,
  alternates: { canonical: absoluteUrl("/") },
  openGraph: {
    title: `${site.name} — Quotes and invoices that get paid`,
    description: site.description,
    url: absoluteUrl("/"),
  },
};

export default function HomePage() {
  const posts = allPosts().slice(0, 3);

  return (
    <main>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          name: site.name,
          applicationCategory: "BusinessApplication",
          operatingSystem: "Web",
          offers: {
            "@type": "Offer",
            price: "0",
            priceCurrency: "INR",
          },
          description: site.description,
          url: absoluteUrl("/"),
        }}
      />

      <MarketingSection
        variant="image"
        image="/marketing/desk.jpg"
        align="center"
        size="hero"
        scrim="heavy"
      >
        <p className="text-5xl font-black tracking-tight text-yellow sm:text-7xl lg:text-8xl">
          Folio
        </p>
        <h1 className="mx-auto mt-5 max-w-3xl text-2xl font-semibold leading-snug text-[#fff8e7] sm:text-4xl">
          Money documents with a status trail—from quote to confirmed paid.
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-[#fdba74] sm:text-lg">
          Free quote-to-invoice software for service businesses. Share a public
          link with your payment QR. Clients claim they paid. You confirm when
          money actually arrives.
        </p>
        <div className="mkt-cta-row">
          <Link href="/enter" className="folio-btn-ghost">
            Open a free desk
          </Link>
          <Link href="/services" className="folio-btn-ink">
            See how Folio works
          </Link>
        </div>
      </MarketingSection>

      <MarketingSection variant="solid" solid="#2a1540" size="content">
        <SectionHeading
          eyebrow="The broken trail"
          title="The money story breaks before the payment does."
          lead="When quote, invoice, and proof live in three places, collections turn into guesswork."
        />
        <div className="mkt-steps-row">
          {[
            {
              n: "01",
              t: "Quote in chat",
              d: "A price is agreed in messages. Totals change. Nobody owns the latest version.",
            },
            {
              n: "02",
              t: "Invoice elsewhere",
              d: "Someone retypes lines into a sheet. Margin and tax quietly drift.",
            },
            {
              n: "03",
              t: "Pay by screenshot",
              d: "A UPI photo lands in chat. Month-end becomes archaeology.",
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

      <MarketingSection variant="solid" solid="#3b0764" size="content">
        <SectionHeading
          eyebrow="Unique positioning"
          title="Claim paid is not the same as money received."
          lead="Your QR already moves money. Folio gives you the operational memory around it—so you stop chasing screenshots and start confirming what the bank shows."
        />
        <div className="mkt-status-flow">
          {[
            { t: "Due", d: "Invoice shared with your QR" },
            { t: "Claimed", d: "Client taps “I’ve paid”" },
            { t: "Confirmed", d: "You mark money received" },
          ].map((s) => (
            <div key={s.t} className="mkt-status-flow__item">
              <p className="font-bold text-yellow">{s.t}</p>
              <p className="mt-1 text-sm text-[#fff8e7]">{s.d}</p>
            </div>
          ))}
        </div>
      </MarketingSection>

      <MarketingSection variant="solid" solid="#1a0a2e" size="content">
        <SectionHeading
          eyebrow="How Folio works"
          title="One document trail. Three clear moves."
        />
        <div className="mkt-steps-row">
          {[
            {
              n: "01",
              t: "One folio, two moments",
              d: "Write the quote once. Convert accepted lines into an invoice—no retyping.",
            },
            {
              n: "02",
              t: "Public page, your QR",
              d: "Clients open a clean link on their phone. Your payment QR sits on the invoice.",
            },
            {
              n: "03",
              t: "Confirm what your bank shows",
              d: "They tap “I’ve paid.” Your board lights yellow until you mark money received.",
            },
          ].map((step) => (
            <div key={step.n} className="mkt-step-tile">
              <span className="mkt-step-tile__n">{step.n}</span>
              <h3 className="text-xl font-bold text-[#fff8e7]">{step.t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[#fdba74] sm:text-base">
                {step.d}
              </p>
            </div>
          ))}
        </div>
      </MarketingSection>

      <MarketingSection variant="solid" solid="#2a1540" size="content">
        <SectionHeading
          eyebrow="Who it’s for"
          title="Service owners who collect through UPI, QR, and transfer."
        />
        <div className="mkt-split-panel">
          <div
            className="mkt-split-panel__visual"
            style={{ backgroundImage: "url(/marketing/workshop.jpg)" }}
            aria-hidden
          />
          <div className="mkt-split-panel__body">
            <ul className="space-y-3 text-[#fff8e7]">
              {[
                "Clinics and practitioners issuing estimates then final bills",
                "Studios, tutors, and agencies with project quotes",
                "Contractors and crews who close work on WhatsApp",
                "Owners tired of freemium tools locking reminders behind a plan",
              ].map((line) => (
                <li key={line} className="flex gap-3 text-sm sm:text-base">
                  <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-yellow" />
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </MarketingSection>

      <MarketingSection variant="solid" solid="#4c1d95" align="center" size="band">
        <SectionHeading
          eyebrow="Free forever"
          title="Free for every account—on purpose."
          lead="Auth keeps documents private. It is not a meter for features. Quotes, invoices, QR links, reminders, and confirmation stay open on the money path."
        >
          <div className="mkt-cta-row" style={{ marginTop: "1.25rem" }}>
            <Link href="/about" className="folio-btn-ghost">
              Read our stance
            </Link>
          </div>
        </SectionHeading>
      </MarketingSection>

      <MarketingSection variant="solid" solid="#1a0a2e" size="content">
        <SectionHeading eyebrow="Blog" title="From the Folio desk">
          <div className="mt-3">
            <Link
              href="/blog"
              className="text-sm font-semibold text-yellow hover:underline"
            >
              All articles →
            </Link>
          </div>
        </SectionHeading>
        <ul className="mkt-post-list mx-auto max-w-3xl text-left">
          {posts.map((post) => (
            <li key={post.slug}>
              <p className="text-xs font-semibold uppercase tracking-wider text-[#fdba74]">
                {post.date} · {post.readingMinutes} min
              </p>
              <Link
                href={`/blog/${post.slug}`}
                className="mt-1 block text-lg font-bold text-yellow hover:text-white sm:text-xl"
              >
                {post.title}
              </Link>
              <p className="mt-1 text-sm text-[#fdba74] sm:text-base">
                {post.description}
              </p>
            </li>
          ))}
        </ul>
      </MarketingSection>

      <MarketingSection variant="solid" solid="#3b0764" align="center" size="band">
        <SectionHeading
          eyebrow="Get started"
          title="Start with one client and one quote."
          lead="Open a desk in under a minute. No card. No trial countdown."
        >
          <div className="mkt-cta-row" style={{ marginTop: "1.25rem" }}>
            <Link href="/enter" className="folio-btn-ghost">
              Create your free Folio account
            </Link>
          </div>
        </SectionHeading>
      </MarketingSection>
    </main>
  );
}
