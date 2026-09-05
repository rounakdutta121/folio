import type { Metadata } from "next";
import Link from "next/link";
import { allPosts } from "@/lib/blog";
import { mktImg } from "@/lib/marketing-images";
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
        image={mktImg.homeHero}
        align="left"
        size="hero"
        scrim="medium"
      >
        <div className="mkt-hero-grid">
          <div>
            <p className="mkt-hero-kicker">Quote → invoice → confirmed paid</p>
            <p className="font-display mt-4 text-5xl font-extrabold tracking-tight text-white sm:text-6xl lg:text-7xl">
              Folio
            </p>
            <h1 className="mt-4 max-w-xl text-xl font-medium leading-snug text-[#e8f4f2] sm:text-2xl">
              Money documents with a status trail—kept free on purpose.
            </h1>
            <p className="mt-4 max-w-md text-base leading-relaxed text-[#b7cfd8] sm:text-lg">
              Share a public link with your payment QR. Clients claim they paid.
              You confirm when money actually arrives.
            </p>
            <div className="mkt-cta-row">
              <Link href="/enter" className="folio-btn-ghost">
                Open a free desk
              </Link>
              <Link href="/services" className="folio-btn-ink">
                See the path
              </Link>
            </div>
          </div>
          <aside className="mkt-hero-panel" aria-label="Payment status preview">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#5eead4]">
              Live trail
            </p>
            <div className="mkt-hero-panel__row">
              <span className="mkt-hero-panel__dot" />
              <div>
                <p className="font-semibold text-white">Due</p>
                <p className="mt-0.5 text-sm text-[#b7cfd8]">
                  Invoice shared with your QR
                </p>
              </div>
            </div>
            <div className="mkt-hero-panel__row">
              <span className="mkt-hero-panel__dot mkt-hero-panel__dot--warn" />
              <div>
                <p className="font-semibold text-white">Claimed</p>
                <p className="mt-0.5 text-sm text-[#b7cfd8]">
                  Client taps “I’ve paid”
                </p>
              </div>
            </div>
            <div className="mkt-hero-panel__row">
              <span className="mkt-hero-panel__dot mkt-hero-panel__dot--ok" />
              <div>
                <p className="font-semibold text-white">Confirmed</p>
                <p className="mt-0.5 text-sm text-[#b7cfd8]">
                  You mark money received
                </p>
              </div>
            </div>
          </aside>
        </div>
      </MarketingSection>

      <MarketingSection variant="solid" solid="#07131f" size="content">
        <SectionHeading
          align="center"
          eyebrow="The break"
          title="The money story fails before the payment does."
          lead="When quote, invoice, and proof live in three chats, collections become guesswork."
        />
        <div className="mkt-board">
          {[
            {
              n: "01",
              t: "Quote in chat",
              d: "A price is agreed in messages. Totals change. Nobody owns the latest version.",
              img: mktImg.homeBreak1,
            },
            {
              n: "02",
              t: "Invoice elsewhere",
              d: "Someone retypes lines into a sheet. Margin and tax quietly drift.",
              img: mktImg.homeBreak2,
            },
            {
              n: "03",
              t: "Pay by screenshot",
              d: "A UPI photo lands in chat. Month-end becomes archaeology.",
              img: mktImg.homeBreak3,
            },
          ].map((item) => (
            <article key={item.t} className="mkt-board__card">
              <div
                className="mkt-board__media"
                style={{ backgroundImage: `url(${item.img})` }}
                aria-hidden
              />
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
        <SectionHeading
          align="center"
          eyebrow="Unique positioning"
          title="Claim paid is not the same as money received."
          lead="Your QR already moves money. Folio keeps the operational memory around it."
        />
        <div className="mkt-track">
          {[
            { t: "Due", d: "Invoice shared with your QR" },
            { t: "Claimed", d: "Client taps “I’ve paid”" },
            { t: "Confirmed", d: "You mark money received" },
          ].map((s) => (
            <div key={s.t} className="mkt-track__step">
              <p className="mkt-track__label">{s.t}</p>
              <p className="text-base font-semibold text-white">{s.d}</p>
            </div>
          ))}
        </div>
      </MarketingSection>

      <MarketingSection variant="solid" solid="#07131f" size="content">
        <SectionHeading
          align="center"
          eyebrow="How it works"
          title="One document trail. Three clear moves."
        />
        <div className="mkt-moves">
          {[
            {
              n: "01",
              t: "One folio, two moments",
              d: "Write the quote once. Convert accepted lines into an invoice—no retyping.",
              img: mktImg.homeMove1,
            },
            {
              n: "02",
              t: "Public page, your QR",
              d: "Clients open a clean link on their phone. Your payment QR sits on the invoice.",
              img: mktImg.homeMove2,
            },
            {
              n: "03",
              t: "Confirm what your bank shows",
              d: "They tap “I’ve paid.” Your board waits until you mark money received.",
              img: mktImg.homeMove3,
            },
          ].map((step) => (
            <article key={step.n} className="mkt-moves__item">
              <div
                className="mkt-card-media"
                style={{ backgroundImage: `url(${step.img})` }}
                aria-hidden
              />
              <div className="mkt-card-body">
                <span className="mkt-moves__n">{step.n}</span>
                <h3 className="font-display text-xl font-bold text-white">
                  {step.t}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[#b7cfd8] sm:text-base">
                  {step.d}
                </p>
              </div>
            </article>
          ))}
        </div>
      </MarketingSection>

      <MarketingSection variant="solid" solid="#0c2233" size="content">
        <div className="mkt-audience">
          <div className="mkt-audience__body">
            <SectionHeading
              eyebrow="Who it’s for"
              title="Service owners who collect through UPI, QR, and transfer."
            />
            <ul className="mt-1 space-y-3.5">
              {[
                "Clinics and practitioners issuing estimates then final bills",
                "Studios, tutors, and agencies with project quotes",
                "Contractors and crews who close work on WhatsApp",
                "Owners tired of freemium tools locking reminders behind a plan",
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
          <div
            className="mkt-audience__visual"
            style={{ backgroundImage: `url(${mktImg.homeAudience})` }}
            aria-hidden
          />
        </div>
      </MarketingSection>

      <MarketingSection
        variant="image"
        image={mktImg.homeFree}
        align="center"
        size="band"
        scrim="light"
      >
        <div className="mkt-glass mkt-glass--center mkt-glass--wide">
          <SectionHeading
            align="center"
            eyebrow="Free forever"
            title="Free for every account—on purpose."
            lead="Auth keeps documents private. It is not a meter for features."
          >
            <div className="mkt-cta-row" style={{ marginTop: "1.25rem" }}>
              <Link href="/about" className="folio-btn-ghost">
                Read our stance
              </Link>
            </div>
          </SectionHeading>
        </div>
      </MarketingSection>

      <MarketingSection variant="solid" solid="#07131f" size="content">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-3">
          <SectionHeading
            align="left"
            eyebrow="Desk notes"
            title="From the Folio blog"
          />
          <Link
            href="/blog"
            className="mb-2 text-sm font-semibold text-[#5eead4] hover:text-white"
          >
            All articles →
          </Link>
        </div>
        <div className="mkt-magazine">
          {posts[0] ? (
            <article
              className="mkt-magazine__feature"
              style={{
                backgroundImage: `linear-gradient(160deg, rgba(7,19,31,0.78), rgba(15,118,110,0.45)), url(${posts[0].image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <p className="text-xs font-semibold uppercase tracking-wider text-[#b7cfd8]">
                {posts[0].date} · {posts[0].readingMinutes} min
              </p>
              <h3 className="font-display mt-2 text-2xl font-bold text-white">
                <Link
                  href={`/blog/${posts[0].slug}`}
                  className="hover:text-[#5eead4]"
                >
                  {posts[0].title}
                </Link>
              </h3>
              <p className="mt-2 text-sm text-[#d1e8e4]">
                {posts[0].description}
              </p>
            </article>
          ) : null}
          <div className="mkt-magazine__stack">
            {posts.slice(1).map((post) => (
              <article key={post.slug} className="mkt-moves__item">
                <div
                  className="mkt-card-media"
                  style={{
                    backgroundImage: `url(${post.image})`,
                    height: "6.5rem",
                  }}
                  aria-hidden
                />
                <div className="mkt-card-body" style={{ padding: "1rem 1.1rem 1.15rem" }}>
                  <p className="text-xs font-semibold uppercase tracking-wider text-[#8eb6c7]">
                    {post.date} · {post.readingMinutes} min
                  </p>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="mt-1 block text-lg font-bold text-white hover:text-[#5eead4]"
                  >
                    {post.title}
                  </Link>
                  <p className="mt-1 text-sm text-[#b7cfd8] line-clamp-2">
                    {post.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </MarketingSection>

      <MarketingSection variant="solid" solid="#0f766e" align="center" size="band">
        <div className="mkt-cta-band">
          <SectionHeading
            align="center"
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
        </div>
      </MarketingSection>
    </main>
  );
}
