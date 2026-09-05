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
import { site } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Pricing — Folio is ₹0 forever",
  description:
    "Folio pricing is simple: ₹0 forever for quotes, invoices, UPI QR on public links, and claim/confirm payment tracking. No freemium meter on the money path.",
  path: "/pricing",
  image: mktImg.seoPricingHero,
});

export default function PricingPage() {
  const pricingFaqs = coreFaqs.filter((f) =>
    [
      "Is Folio really free forever?",
      "Does Folio process UPI or card payments?",
      "Is Folio a GST filing or accounting tool?",
      "Can I put a UPI QR on invoices?",
      "Do clients need a Folio account to pay?",
    ].includes(f.question),
  );

  const included = [
    "Client records for active jobs",
    "Quotes with public accept/decline links",
    "One-click convert quote → invoice",
    "Public invoices with your UPI / payment QR",
    "Client “I paid” claims + your confirmation",
    "Reminder-friendly copy with one link",
  ];

  return (
    <main>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Pricing", path: "/pricing" },
        ])}
      />
      <JsonLd data={faqPageJsonLd(pricingFaqs)} />

      <MarketingSection
        variant="image"
        image={mktImg.seoPricingHero}
        imageAlt="Business owner reviewing free Folio invoicing on a tablet"
        align="center"
        size="hero"
        scrim="medium"
      >
        <p className="mkt-hero-kicker" style={{ justifyContent: "center" }}>
          Pricing
        </p>
        <h1 className="font-display mx-auto mt-5 max-w-3xl text-3xl font-extrabold text-white sm:text-5xl">
          ₹0 forever.
          <br className="hidden sm:block" /> No plans. No meter.
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-base text-[#b7cfd8] sm:text-lg">
          Every Folio desk includes the full quote → invoice → QR → claim/confirm
          path. Free is the product—not a demo.
        </p>
        <div
          className="mkt-cta-row"
          style={{ justifyContent: "center", marginTop: "1.5rem" }}
        >
          <Link href="/enter" className="folio-btn-ghost">
            Open a free desk
          </Link>
          <Link href="/faq" className="folio-btn-ink">
            Read the FAQ
          </Link>
        </div>
      </MarketingSection>

      <MarketingSection variant="solid" solid="#07131f" size="content">
        <div className="mkt-audience">
          <div
            className="mkt-audience__visual"
            style={{ backgroundImage: `url(${mktImg.seoPricingIncluded})` }}
            role="img"
            aria-label="Checklist and payment QR on a desk"
          />
          <div className="mkt-audience__body">
            <SectionHeading
              eyebrow="What you get"
              title="The weekly money path—unlocked."
              lead="Judge free tools by whether Mondays get quieter."
            />
            <ul className="space-y-3.5">
              {included.map((line) => (
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
          eyebrow="Honest limits"
          title="What Folio is not."
          lead="So you pick the right desk the first time."
        />
        <div className="mkt-board">
          <article className="mkt-board__card">
            <div
              className="mkt-board__media"
              style={{ backgroundImage: `url(${mktImg.seoPricingIncluded})` }}
              role="img"
              aria-label="Desk tools for free service billing"
            />
            <div className="mkt-board__body">
              <p className="mkt-board__n">01</p>
              <h3 className="text-lg font-bold text-white">Not a gateway</h3>
              <p className="mt-2 text-sm leading-relaxed text-[#b7cfd8]">
                Clients pay on your UPI rails. Folio records claim/confirm—no MDR
                from us.
              </p>
            </div>
          </article>
          <article className="mkt-board__card">
            <div
              className="mkt-board__media"
              style={{ backgroundImage: `url(${mktImg.seoPricingNotGst})` }}
              role="img"
              aria-label="Filing cabinet representing accounting limits"
            />
            <div className="mkt-board__body">
              <p className="mkt-board__n">02</p>
              <h3 className="text-lg font-bold text-white">Not GST filing</h3>
              <p className="mt-2 text-sm leading-relaxed text-[#b7cfd8]">
                Not Tally, not inventory ERP. Use Folio beside your CA workflow.
              </p>
            </div>
          </article>
          <article className="mkt-board__card">
            <div
              className="mkt-board__media"
              style={{ backgroundImage: `url(${mktImg.seoPricingLimits})` }}
              role="img"
              aria-label="Open ledger representing honest product limits"
            />
            <div className="mkt-board__body">
              <p className="mkt-board__n">03</p>
              <h3 className="text-lg font-bold text-white">Still free</h3>
              <p className="mt-2 text-sm leading-relaxed text-[#b7cfd8]">
                Core documents + QR + statuses stay ₹0. Questions?{" "}
                <Link href="/contact" className="text-[#5eead4] hover:underline">
                  Contact {site.name}
                </Link>
                .
              </p>
            </div>
          </article>
        </div>
      </MarketingSection>

      <MarketingSection variant="solid" solid="#0c2233" size="content">
        <SectionHeading
          align="center"
          eyebrow="FAQ"
          title="Pricing questions."
        />
        <ul className="mkt-principle-grid">
          {[
            {
              question: "Is Folio really free forever?",
              answer:
                "Yes. Every account gets the full quote → invoice → QR → claim/confirm path at ₹0. There is no freemium meter on clients, documents, public links, or payment confirmation.",
              img: mktImg.seoCardFaqFree,
            },
            {
              question: "Does Folio process UPI or card payments?",
              answer:
                "No. Clients pay using your existing UPI QR or bank details. Folio shows the QR on the public invoice and records claim/confirm statuses. Money moves on rails outside Folio—no gateway fees from us.",
              img: mktImg.seoCardFaqGateway,
            },
            {
              question: "Is Folio a GST filing or accounting tool?",
              answer:
                "No. Folio is a service-desk money trail: quotes, invoices, public links, and payment confirmation. It is not Tally, not a GST portal exporter, and not inventory billing software. Use it beside your CA workflow, not as a replacement for statutory filing.",
              img: mktImg.seoCardFaqNotGst,
            },
            {
              question: "Can I put a UPI QR on invoices?",
              answer:
                "Yes. Upload the QR you already use once in settings. Folio places it on public invoice pages so clients can scan and pay in any UPI app, then tap that they paid for you to confirm.",
              img: mktImg.seoCardFaqQr,
            },
            {
              question: "Do clients need a Folio account to pay?",
              answer:
                "No. They open your public document link on a phone, see the amount and QR, pay in their own app, and can mark that they paid. No client signup wall.",
              img: mktImg.seoCardFaqNoSignup,
            },
          ].map((f) => (
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
            eyebrow="Compare"
            title="Still weighing tools?"
            lead="Honest comparisons—then open a free desk."
          >
            <div className="mkt-cta-row" style={{ marginTop: "1.25rem" }}>
              <Link href="/compare/zoho-invoice" className="folio-btn-ghost">
                vs Zoho Invoice
              </Link>
              <Link href="/compare/excel" className="folio-btn-ink">
                vs spreadsheets
              </Link>
            </div>
          </SectionHeading>
        </div>
      </MarketingSection>
    </main>
  );
}
