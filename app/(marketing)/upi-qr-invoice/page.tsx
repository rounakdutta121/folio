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
  title: "Invoice with UPI QR code — free for service businesses",
  description:
    "Create invoices with your UPI QR on a public link. Clients scan, pay in any UPI app, claim payment, and you confirm when money arrives—free with Folio.",
  path: "/upi-qr-invoice",
  image: mktImg.seoUpiHero,
});

export default function UpiQrInvoicePage() {
  const faqs = coreFaqs.filter((f) =>
    [
      "Can I put a UPI QR on invoices?",
      "Does Folio process UPI or card payments?",
      "What is claim vs confirm?",
      "Do clients need a Folio account to pay?",
    ].includes(f.question),
  );

  return (
    <main>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "UPI QR invoices", path: "/upi-qr-invoice" },
        ])}
      />
      <JsonLd data={faqPageJsonLd(faqs)} />

      <MarketingSection
        variant="image"
        image={mktImg.seoUpiHero}
        imageAlt="Phone scanning a UPI QR code on an invoice"
        align="center"
        size="hero"
        scrim="medium"
      >
        <p className="mkt-hero-kicker" style={{ justifyContent: "center" }}>
          UPI · QR · Confirm
        </p>
        <h1 className="font-display mx-auto mt-5 max-w-4xl text-3xl font-extrabold leading-[1.15] text-white sm:text-5xl">
          Invoices with your UPI QR—
          <br className="hidden sm:block" />
          and a confirmation trail.
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-[#b7cfd8] sm:text-lg">
          Folio puts the QR you already use on a public invoice link. Clients pay
          in GPay, PhonePe, or Paytm. You confirm when the bank credit is real.
        </p>
        <div
          className="mkt-cta-row"
          style={{ justifyContent: "center", marginTop: "1.5rem" }}
        >
          <Link href="/enter" className="folio-btn-ghost">
            Add QR on a free desk
          </Link>
          <Link href="/services#qr" className="folio-btn-ink">
            See QR in the workflow
          </Link>
        </div>
      </MarketingSection>

      <MarketingSection variant="solid" solid="#07131f" size="content">
        <SectionHeading
          align="center"
          eyebrow="Why it matters"
          title="India solved the rail. Desks still lose the receipt."
          lead="UPI moves money in seconds. Month-end still dies in screenshot archaeology."
        />
        <div className="mkt-track">
          {[
            { t: "Share", d: "One public invoice with amount + QR" },
            { t: "Scan", d: "Client pays in their own UPI app" },
            { t: "Confirm", d: "You match the bank—then close the trail" },
          ].map((s) => (
            <div key={s.t} className="mkt-track__step">
              <p className="mkt-track__label">{s.t}</p>
              <p className="text-base font-semibold text-white">{s.d}</p>
            </div>
          ))}
        </div>
      </MarketingSection>

      <MarketingSection variant="solid" solid="#0a1c2b" size="content">
        <SectionHeading
          align="center"
          eyebrow="How Folio does it"
          title="Upload once. Show on every due invoice."
        />
        <div className="mkt-board">
          {[
            {
              n: "01",
              t: "Your QR",
              d: "Upload the payment QR you already use—no new merchant account for day-one local work.",
              img: mktImg.seoUpiHero,
            },
            {
              n: "02",
              t: "Public invoice",
              d: "Clients open the link, see the total, scan, and pay in any UPI app.",
              img: mktImg.seoUpiScan,
            },
            {
              n: "03",
              t: "Claim → confirm",
              d: "They mark paid with optional UTR. You verify money—or reject wrong amounts.",
              img: mktImg.seoUpiConfirm,
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
                <h3 className="text-lg font-bold text-white">{item.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#b7cfd8]">
                  {item.d}
                </p>
              </div>
            </article>
          ))}
        </div>
      </MarketingSection>

      <MarketingSection variant="solid" solid="#0c2233" size="content">
        <div className="mkt-audience">
          <div
            className="mkt-audience__visual"
            style={{ backgroundImage: `url(${mktImg.seoUpiConfirm})` }}
            role="img"
            aria-label="Owner confirming UPI payment"
          />
          <div className="mkt-audience__body">
            <SectionHeading
              eyebrow="Honest positioning"
              title="Not a payment gateway—on purpose."
            />
            <ul className="space-y-3.5">
              {[
                "No Folio MDR on UPI collections",
                "Claim is a notification; confirm is the control",
                "No client Folio account required to pay",
                "Statuses stay useful if you add a gateway later",
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

      <MarketingSection variant="solid" solid="#07131f" size="content">
        <SectionHeading align="center" eyebrow="FAQ" title="UPI & QR questions." />
        <ul className="mkt-principle-grid">
          {[
            {
              question: "Does Folio process UPI or card payments?",
              answer:
                "No. Clients pay using your existing UPI QR or bank details. Folio shows the QR on the public invoice and records claim/confirm statuses. Money moves on rails outside Folio—no gateway fees from us.",
              img: mktImg.seoCardUpiRails,
            },
            {
              question: "Can I put a UPI QR on invoices?",
              answer:
                "Yes. Upload the QR you already use once in settings. Folio places it on public invoice pages so clients can scan and pay in any UPI app, then tap that they paid for you to confirm.",
              img: mktImg.seoCardUpiQr,
            },
            {
              question: "What is claim vs confirm?",
              answer:
                "Claim means the client says they paid. Confirm means you verified money in your bank or UPI alerts and closed the trail. Claim alone is never treated as settled.",
              img: mktImg.seoCardUpiClaim,
            },
            {
              question: "Do clients need a Folio account to pay?",
              answer:
                "No. They open your public document link on a phone, see the amount and QR, pay in their own app, and can mark that they paid. No client signup wall.",
              img: mktImg.seoCardUpiGuest,
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
            eyebrow="Get started"
            title="Put your QR on the next invoice."
          >
            <div className="mkt-cta-row" style={{ marginTop: "1.25rem" }}>
              <Link href="/enter" className="folio-btn-ghost">
                Start free
              </Link>
              <Link href="/pricing" className="folio-btn-ink">
                Pricing ₹0
              </Link>
            </div>
          </SectionHeading>
        </div>
      </MarketingSection>
    </main>
  );
}
