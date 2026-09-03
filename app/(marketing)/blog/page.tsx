import type { Metadata } from "next";
import Link from "next/link";
import { allPosts } from "@/lib/blog";
import { absoluteUrl } from "@/lib/site";
import { JsonLd } from "@/components/marketing/JsonLd";
import { MarketingSection } from "@/components/marketing/MarketingSection";
import { SectionHeading } from "@/components/marketing/SectionHeading";

export const metadata: Metadata = {
  title: "Blog — invoicing, QR payments, and quote-to-paid operations",
  description:
    "Practical articles on free invoicing, converting quotes to invoices, UPI/QR payment confirmation, WhatsApp reminders, and organic SEO for local service tools.",
  alternates: { canonical: absoluteUrl("/blog") },
  openGraph: {
    title: "Folio Blog",
    description:
      "Guides for service businesses on quotes, invoices, and getting paid.",
    url: absoluteUrl("/blog"),
  },
};

export default function BlogIndexPage() {
  const posts = allPosts();
  const featured = posts[0];
  const rest = posts.slice(1);

  return (
    <main>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Blog",
          name: "Folio Blog",
          url: absoluteUrl("/blog"),
          blogPost: posts.map((p) => ({
            "@type": "BlogPosting",
            headline: p.title,
            datePublished: p.date,
            description: p.description,
            url: absoluteUrl(`/blog/${p.slug}`),
          })),
        }}
      />

      <MarketingSection
        variant="image"
        image="/marketing/desk.jpg"
        align="center"
        size="hero"
        scrim="heavy"
      >
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-yellow">
          Blog
        </p>
        <h1 className="mx-auto mt-3 max-w-3xl text-3xl font-black text-yellow sm:text-5xl">
          Operations writing for people who invoice for a living.
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-[#fdba74] sm:text-lg">
          Quote-to-invoice, QR confirmation, collections tone, and SEO for the
          work you actually do.
        </p>
      </MarketingSection>

      {featured ? (
        <MarketingSection variant="solid" solid="#2a1540" size="content">
          <SectionHeading
            eyebrow="Featured"
            title="Start with the newest desk note."
          />
          <div className="mkt-split-panel">
            <div
              className="mkt-split-panel__visual"
              style={{ backgroundImage: "url(/marketing/seal.jpg)" }}
              aria-hidden
            />
            <div className="mkt-split-panel__body">
              <p className="text-xs font-semibold uppercase tracking-wider text-[#fdba74]">
                {featured.date} · {featured.readingMinutes} min
              </p>
              <h3 className="mt-2 text-2xl font-bold text-yellow">
                <Link
                  href={`/blog/${featured.slug}`}
                  className="hover:text-white"
                >
                  {featured.title}
                </Link>
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-[#fdba74] sm:text-base">
                {featured.description}
              </p>
              <div className="mkt-cta-row">
                <Link
                  href={`/blog/${featured.slug}`}
                  className="folio-btn-ghost"
                >
                  Read article
                </Link>
              </div>
            </div>
          </div>
        </MarketingSection>
      ) : null}

      <MarketingSection variant="solid" solid="#1a0a2e" size="content">
        <SectionHeading
          eyebrow="All articles"
          title="Guides for quote-to-paid operations."
        />
        <ul className="mkt-principle-grid">
          {rest.map((post) => (
            <li key={post.slug}>
              <p className="text-xs font-semibold uppercase tracking-wider text-[#fdba74]">
                {post.date} · {post.readingMinutes} min
              </p>
              <h3 className="mt-2 text-lg font-bold text-yellow">
                <Link
                  href={`/blog/${post.slug}`}
                  className="hover:text-white"
                >
                  {post.title}
                </Link>
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[#fdba74]">
                {post.description}
              </p>
              <Link
                href={`/blog/${post.slug}`}
                className="mt-3 inline-block text-sm font-semibold text-[#fff8e7] underline-offset-4 hover:underline"
              >
                Read →
              </Link>
            </li>
          ))}
        </ul>
      </MarketingSection>
    </main>
  );
}
