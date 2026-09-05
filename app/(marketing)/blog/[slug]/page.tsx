import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  allPosts,
  getPost,
  postProductLinks,
  relatedPosts,
} from "@/lib/blog";
import { absoluteUrl, site } from "@/lib/site";
import { JsonLd } from "@/components/marketing/JsonLd";
import { MarketingSection } from "@/components/marketing/MarketingSection";
import { SectionHeading } from "@/components/marketing/SectionHeading";
import { breadcrumbJsonLd, OG_IMAGE, pageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

function TitleLines({ title }: { title: string }) {
  const words = title.split(" ");
  if (words.length < 8) return <>{title}</>;
  const mid = Math.ceil(words.length * 0.55);
  return (
    <>
      {words.slice(0, mid).join(" ")}{" "}
      <br className="hidden sm:block" />
      {words.slice(mid).join(" ")}
    </>
  );
}

export async function generateStaticParams() {
  return allPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return { title: "Post not found" };
  return {
    ...pageMetadata({
      title: post.title,
      description: post.description,
      path: `/blog/${post.slug}`,
      image: post.image,
    }),
    openGraph: {
      type: "article",
      title: post.title,
      description: post.description,
      url: absoluteUrl(`/blog/${post.slug}`),
      publishedTime: post.date,
      tags: post.tags,
      images: [
        { url: post.image, width: 1200, height: 630, alt: post.title },
        { ...OG_IMAGE },
      ],
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const related = relatedPosts(post, 3);
  const productLinks = postProductLinks(post);

  const articleBody = post.sections
    .flatMap((s) => [s.title, s.lead, ...s.paragraphs].filter(Boolean))
    .join(" ");

  return (
    <main>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Blog", path: "/blog" },
          { name: post.title, path: `/blog/${post.slug}` },
        ])}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: post.title,
          datePublished: post.date,
          dateModified: post.date,
          description: post.description,
          articleBody: articleBody,
          image: [absoluteUrl(post.image), absoluteUrl(OG_IMAGE.url)],
          author: { "@type": "Organization", name: site.name },
          publisher: {
            "@type": "Organization",
            name: site.name,
            logo: { "@type": "ImageObject", url: absoluteUrl("/icon.png") },
          },
          mainEntityOfPage: absoluteUrl(`/blog/${post.slug}`),
          keywords: post.tags.join(", "),
        }}
      />

      <MarketingSection
        variant="image"
        image={post.image}
        imageAlt={post.title}
        align="center"
        size="hero"
        scrim="medium"
      >
        <Link
          href="/blog"
          className="text-sm font-semibold text-[#b7cfd8] hover:text-[#5eead4]"
        >
          ← Folio blog
        </Link>
        <p className="mt-6 text-xs font-semibold uppercase tracking-[0.16em] text-[#5eead4]">
          <time dateTime={post.date}>{post.date}</time>
          {" · "}
          {post.readingMinutes} min read
          {" · "}
          {post.tags.join(" · ")}
        </p>
        <h1 className="font-display mx-auto mt-4 max-w-4xl text-3xl font-extrabold leading-[1.15] tracking-tight text-white sm:text-4xl lg:text-[2.75rem]">
          <TitleLines title={post.title} />
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-[#b7cfd8] sm:text-lg">
          {post.description}
        </p>
      </MarketingSection>

      <section className="blog-shell">
        <article className="blog-article">
          <div className="blog-cover">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={post.image} alt={post.title} />
          </div>
          {post.sections.map((section, i) => (
            <section
              key={`${section.eyebrow}-${i}`}
              className="blog-article__block"
              id={`section-${i + 1}`}
            >
              <p className="blog-article__eyebrow">{section.eyebrow}</p>
              <h2 className="blog-article__h2">{section.title}</h2>
              {section.lead ? (
                <p className="blog-article__lead">{section.lead}</p>
              ) : null}

              <div className="blog-article__body">
                {section.paragraphs.map((para, j) => (
                  <p key={j}>{para}</p>
                ))}
              </div>

              {section.insights && section.insights.length > 0 ? (
                <div className="blog-callouts" role="list">
                  {section.insights.map((insight) => (
                    <aside
                      key={insight.title + insight.body}
                      className="blog-callout"
                      role="listitem"
                    >
                      <p className="blog-callout__title">{insight.title}</p>
                      <p className="blog-callout__body">{insight.body}</p>
                    </aside>
                  ))}
                </div>
              ) : null}

              {section.takeaways && section.takeaways.length > 0 ? (
                <div className="blog-takeaways">
                  <p className="blog-takeaways__label">Key takeaways</p>
                  <ul>
                    {section.takeaways.map((item) => (
                      <li key={item}>
                        <span className="blog-takeaways__mark" aria-hidden>
                          →
                        </span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </section>
          ))}

          <nav className="blog-takeaways" aria-label="Related Folio pages">
            <p className="blog-takeaways__label">Continue in Folio</p>
            <ul>
              {productLinks.map((l) => (
                <li key={l.href}>
                  <span className="blog-takeaways__mark" aria-hidden>
                    →
                  </span>
                  <Link href={l.href} className="blog-article__link">
                    {l.label}
                  </Link>
                </li>
              ))}
              <li>
                <span className="blog-takeaways__mark" aria-hidden>
                  →
                </span>
                <Link href="/services#convert" className="blog-article__link">
                  Quote → invoice convert
                </Link>
              </li>
              <li>
                <span className="blog-takeaways__mark" aria-hidden>
                  →
                </span>
                <Link href="/services#qr" className="blog-article__link">
                  QR on invoices
                </Link>
              </li>
            </ul>
          </nav>

          <footer className="blog-article__footer">
            <p>
              Ready to try this on a real job?{" "}
              <Link href="/enter" className="blog-article__link">
                Open a free Folio desk
              </Link>{" "}
              or{" "}
              <Link href="/services" className="blog-article__link">
                see the full workflow
              </Link>
              .
            </p>
          </footer>
        </article>
      </section>

      {related.length > 0 ? (
        <MarketingSection variant="solid" solid="#0a1c2b" size="content">
          <SectionHeading
            align="center"
            eyebrow="Keep reading"
            title="Related from the desk."
          />
          <div className="mkt-moves">
            {related.map((r) => (
              <article key={r.slug} className="mkt-moves__item">
                <div
                  className="mkt-card-media"
                  style={{ backgroundImage: `url(${r.image})` }}
                  role="img"
                  aria-label={r.title}
                />
                <div className="mkt-card-body">
                  <p className="text-xs font-semibold uppercase tracking-wider text-[#8eb6c7]">
                    {r.date} · {r.readingMinutes} min
                  </p>
                  <h3 className="mt-2 text-lg font-bold text-white">
                    <Link
                      href={`/blog/${r.slug}`}
                      className="hover:text-[#5eead4]"
                    >
                      {r.title}
                    </Link>
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#b7cfd8]">
                    {r.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </MarketingSection>
      ) : null}
    </main>
  );
}
