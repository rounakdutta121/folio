import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/marketing/JsonLd";
import { MarketingSection } from "@/components/marketing/MarketingSection";
import { SectionHeading } from "@/components/marketing/SectionHeading";
import { coreFaqs } from "@/lib/faq-content";
import { mktImg } from "@/lib/marketing-images";
import {
  breadcrumbJsonLd,
  faqPageJsonLd,
  pageMetadata,
} from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "FAQ — Folio free quote-to-invoice software",
  description:
    "Answers about Folio pricing, UPI QR invoices, claim vs confirm payments, GST stance, WhatsApp reminders, and who the free desk is for.",
  path: "/faq",
  image: mktImg.seoFaqHero,
});

const faqImages = [
  mktImg.seoCardFaqFree,
  mktImg.seoCardFaqGateway,
  mktImg.seoCardFaqNotGst,
  mktImg.seoCardFaqQr,
  mktImg.seoCardFaqClaim,
  mktImg.seoCardFaqAudience,
  mktImg.seoCardFaqNoSignup,
  mktImg.seoCardFaqWhatsapp,
  mktImg.seoCardFaqLocation,
  mktImg.seoCardFaqConvert,
] as const;

export default function FaqPage() {
  const items = coreFaqs.map((f, i) => ({
    ...f,
    img: faqImages[i] ?? mktImg.seoCardFaqFree,
  }));

  return (
    <main>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "FAQ", path: "/faq" },
        ])}
      />
      <JsonLd data={faqPageJsonLd(coreFaqs)} />

      <MarketingSection
        variant="image"
        image={mktImg.seoFaqHero}
        imageAlt="Person researching Folio FAQ on a laptop"
        align="center"
        size="hero"
        scrim="medium"
      >
        <p className="mkt-hero-kicker" style={{ justifyContent: "center" }}>
          FAQ
        </p>
        <h1 className="font-display mx-auto mt-5 max-w-3xl text-3xl font-extrabold text-white sm:text-5xl">
          Straight answers for service desks.
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-base text-[#b7cfd8] sm:text-lg">
          Free forever, UPI QR, claim vs confirm, and what Folio is not. Prefer a
          human?{" "}
          <Link
            href="/contact"
            className="text-[#5eead4] underline-offset-4 hover:underline"
          >
            Contact us
          </Link>
          .
        </p>
      </MarketingSection>

      <MarketingSection variant="solid" solid="#07131f" size="content">
        <div className="mkt-audience">
          <div
            className="mkt-audience__visual"
            style={{ backgroundImage: `url(${mktImg.seoFaqCards})` }}
            role="img"
            aria-label="Question cards on a desk"
          />
          <div className="mkt-audience__body">
            <SectionHeading
              eyebrow="Before you ask"
              title="Most owners want the same five truths."
            />
            <ul className="space-y-3.5">
              {[
                "₹0 forever on the money path",
                "Your QR—not a Folio payment cut",
                "Claim is not confirm",
                "Not a GST filing suite",
                "Clients pay without signing up",
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
        </div>
      </MarketingSection>

      <MarketingSection variant="solid" solid="#0a1c2b" size="content">
        <SectionHeading
          align="center"
          eyebrow="Questions"
          title="Everything owners ask before opening a desk."
        />
        <ul className="mkt-principle-grid">
          {items.map((f) => (
            <li key={f.question}>
              <div
                className="mkt-card-media"
                style={{ backgroundImage: `url(${f.img})` }}
                role="img"
                aria-label={f.question}
              />
              <div className="mkt-card-body">
                <h3 className="text-lg font-bold text-[#5eead4]">{f.question}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#b7cfd8]">
                  {f.answer}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </MarketingSection>

      <MarketingSection variant="solid" solid="#0f766e" align="center" size="band">
        <div className="mkt-cta-band">
          <SectionHeading
            align="center"
            eyebrow="Next"
            title="Ready to try the path?"
          >
            <div className="mkt-cta-row" style={{ marginTop: "1.25rem" }}>
              <Link href="/enter" className="folio-btn-ghost">
                Create a free desk
              </Link>
              <Link href="/upi-qr-invoice" className="folio-btn-ink">
                UPI QR invoices
              </Link>
            </div>
          </SectionHeading>
        </div>
      </MarketingSection>
    </main>
  );
}
