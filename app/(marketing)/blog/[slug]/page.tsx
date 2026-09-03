import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { allPosts, getPost } from "@/lib/blog";
import { absoluteUrl, site } from "@/lib/site";
import { JsonLd } from "@/components/marketing/JsonLd";
import { MarketingSection } from "@/components/marketing/MarketingSection";
import { SectionHeading } from "@/components/marketing/SectionHeading";

type Props = { params: Promise<{ slug: string }> };

const SECTION_SOLIDS = ["#2a1540", "#3b0764", "#1a0a2e", "#4c1d95"] as const;
const SECTION_IMAGES = [
  "/marketing/trail.jpg",
  "/marketing/qr.jpg",
  "/marketing/seal.jpg",
  "/marketing/workshop.jpg",
  "/marketing/dusk.jpg",
] as const;

export async function generateStaticParams() {
  return allPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return { title: "Post not found" };
  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: absoluteUrl(`/blog/${post.slug}`) },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.description,
      url: absoluteUrl(`/blog/${post.slug}`),
      publishedTime: post.date,
      tags: post.tags,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const related = allPosts()
    .filter((p) => p.slug !== post.slug)
    .slice(0, 4);

  const articleBody = post.sections
    .flatMap((s) => [s.title, s.lead, ...s.paragraphs].filter(Boolean))
    .join(" ");

  return (
    <main>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: post.title,
          datePublished: post.date,
          description: post.description,
          articleBody: articleBody,
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
        image="/marketing/desk.jpg"
        align="center"
        size="hero"
        scrim="heavy"
      >
        <Link
          href="/blog"
          className="text-sm font-semibold text-[#fdba74] hover:text-yellow"
        >
          ← Folio blog
        </Link>
        <p className="mt-5 text-xs font-semibold uppercase tracking-wider text-[#fdba74]">
          <time dateTime={post.date}>{post.date}</time>
          {" · "}
          {post.readingMinutes} min read · {post.tags.join(" · ")}
        </p>
        <h1 className="mx-auto mt-3 max-w-4xl text-3xl font-black leading-tight text-yellow sm:text-5xl">
          {post.title}
        </h1>
        <p className="mx-auto mt-4 max-w-3xl text-base leading-relaxed text-[#fdba74] sm:text-lg">
          {post.description}
        </p>
      </MarketingSection>

      {post.sections.map((section, i) => {
        const useImage = i % 3 === 1;
        return (
          <MarketingSection
            key={`${section.eyebrow}-${i}`}
            variant={useImage ? "image" : "solid"}
            image={SECTION_IMAGES[i % SECTION_IMAGES.length]}
            solid={SECTION_SOLIDS[i % SECTION_SOLIDS.length]}
            size="content"
            scrim="medium"
          >
            <SectionHeading
              eyebrow={section.eyebrow}
              title={section.title}
              lead={section.lead}
            />

            <div className="mkt-blog-copy">
              {section.paragraphs.map((para, j) => (
                <p key={j}>{para}</p>
              ))}
            </div>

            {section.insights && section.insights.length > 0 ? (
              <div className="mkt-steps-row mt-8">
                {section.insights.map((insight) => (
                  <div key={insight.title + insight.body} className="mkt-step-tile">
                    <h3 className="text-lg font-bold text-yellow">
                      {insight.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-[#fdba74] sm:text-base">
                      {insight.body}
                    </p>
                  </div>
                ))}
              </div>
            ) : null}

            {section.takeaways && section.takeaways.length > 0 ? (
              <div className="mkt-blog-takeaways">
                <p className="mkt-blog-takeaways__label">Key takeaways</p>
                <ul>
                  {section.takeaways.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ) : null}
          </MarketingSection>
        );
      })}

      <MarketingSection variant="solid" solid="#3b0764" align="center" size="band">
        <SectionHeading
          eyebrow="Try Folio"
          title="Put this into practice."
          lead="Open a free desk and send one quote today."
        >
          <div className="mkt-cta-row" style={{ marginTop: "1.25rem" }}>
            <Link href="/enter" className="folio-btn-ghost">
              Start free
            </Link>
            <Link href="/services" className="folio-btn-ink">
              See the workflow
            </Link>
          </div>
        </SectionHeading>
      </MarketingSection>

      <MarketingSection variant="solid" solid="#1a0a2e" size="content">
        <SectionHeading eyebrow="Keep reading" title="More from the desk." />
        <ul className="mkt-principle-grid">
          {related.map((r) => (
            <li key={r.slug}>
              <h3 className="text-lg font-bold text-yellow">
                <Link href={`/blog/${r.slug}`} className="hover:text-white">
                  {r.title}
                </Link>
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[#fdba74]">
                {r.description}
              </p>
            </li>
          ))}
        </ul>
      </MarketingSection>
    </main>
  );
}
