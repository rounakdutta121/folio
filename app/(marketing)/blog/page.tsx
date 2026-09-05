import type { Metadata } from "next";
import Link from "next/link";
import { allPosts } from "@/lib/blog";
import { absoluteUrl } from "@/lib/site";
import { mktImg } from "@/lib/marketing-images";
import { JsonLd } from "@/components/marketing/JsonLd";
import { MarketingSection } from "@/components/marketing/MarketingSection";
import { SectionHeading } from "@/components/marketing/SectionHeading";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Blog — invoicing, QR payments, and quote-to-paid operations",
  description:
    "Practical articles on free invoicing, converting quotes to invoices, UPI/QR payment confirmation, WhatsApp reminders, and organic SEO for local service tools.",
  path: "/blog",
});

export default function BlogIndexPage() {
  const posts = allPosts();
  const featured = posts[0];
  const rest = posts.slice(1);

  return (
    <main>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Blog", path: "/blog" },
        ])}
      />
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
            image: absoluteUrl(p.image),
          })),
        }}
      />

      <MarketingSection
        variant="image"
        image={mktImg.blogHero}
        imageAlt="Folio blog on invoicing, UPI QR payments, and collections"
        align="center"
        size="hero"
        scrim="medium"
      >
        <p className="mkt-hero-kicker" style={{ justifyContent: "center" }}>
          Blog
        </p>
        <h1 className="font-display mx-auto mt-5 max-w-4xl text-3xl font-extrabold leading-[1.15] text-white sm:text-5xl">
          Operations writing for people
          <br className="hidden sm:block" /> who invoice for a living.
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-[#b7cfd8] sm:text-lg">
          Quote-to-invoice, QR confirmation, collections tone, and SEO for the
          work you actually do.
        </p>
      </MarketingSection>

      {featured ? (
        <MarketingSection variant="solid" solid="#07131f" size="content">
          <SectionHeading
            align="center"
            eyebrow="Featured"
            title="Start with the newest desk note."
          />
          <article
            className="mkt-magazine__feature"
            style={{
              backgroundImage: `linear-gradient(160deg, rgba(7,19,31,0.78), rgba(15,118,110,0.42)), url(${featured.image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              minHeight: "16rem",
            }}
          >
            <p className="text-xs font-semibold uppercase tracking-wider text-[#b7cfd8]">
              {featured.date} · {featured.readingMinutes} min
            </p>
            <h3 className="font-display mt-2 max-w-3xl text-2xl font-bold text-white sm:text-3xl">
              <Link
                href={`/blog/${featured.slug}`}
                className="hover:text-[#5eead4]"
              >
                {featured.title}
              </Link>
            </h3>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[#d1e8e4] sm:text-base">
              {featured.description}
            </p>
            <div className="mkt-cta-row">
              <Link href={`/blog/${featured.slug}`} className="folio-btn-ghost">
                Read article
              </Link>
            </div>
          </article>
        </MarketingSection>
      ) : null}

      {rest.length > 0 ? (
        <MarketingSection variant="solid" solid="#0a1c2b" size="content">
          <SectionHeading
            align="center"
            eyebrow="All guides"
            title="More guides for quote-to-paid operations."
          />
          <ul className="mkt-principle-grid">
            {rest.map((post) => (
              <li key={post.slug} className="!p-0 overflow-hidden">
                <div
                  className="mkt-card-media"
                  style={{ backgroundImage: `url(${post.image})` }}
                  aria-hidden
                />
                <div className="mkt-card-body">
                  <p className="text-xs font-semibold uppercase tracking-wider text-[#8eb6c7]">
                    {post.date} · {post.readingMinutes} min
                  </p>
                  <h3 className="mt-2 text-lg font-bold text-white">
                    <Link
                      href={`/blog/${post.slug}`}
                      className="hover:text-[#5eead4]"
                    >
                      {post.title}
                    </Link>
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#b7cfd8]">
                    {post.description}
                  </p>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="mt-3 inline-block text-sm font-semibold text-[#5eead4] hover:text-white"
                  >
                    Read →
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        </MarketingSection>
      ) : null}
    </main>
  );
}
