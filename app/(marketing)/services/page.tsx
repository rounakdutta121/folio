import type { Metadata } from "next";
import Link from "next/link";
import { absoluteUrl } from "@/lib/site";
import { mktImg } from "@/lib/marketing-images";
import { JsonLd } from "@/components/marketing/JsonLd";
import { MarketingSection } from "@/components/marketing/MarketingSection";
import { SectionHeading } from "@/components/marketing/SectionHeading";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Services — quote to invoice, QR pay links, payment confirmation",
  description:
    "Folio services for service businesses: client records, quotes with accept/decline, convert to invoice, QR payment pages, claim-vs-confirm tracking, and WhatsApp reminders—free.",
  path: "/services",
});

const SERVICES = [
  {
    id: "clients",
    title: "Client desk",
    lead: "Keep the people you bill in one place—name, phone, email—ready for the next quote.",
    detail:
      "Clean client records so every quote and invoice points at a real relationship, not a one-off PDF.",
    seo: "Client management for small business invoicing",
    img: mktImg.svcClients,
  },
  {
    id: "quotes",
    title: "Quotes clients can answer",
    lead: "Send a public quote link. They accept or decline without logging into your tools.",
    detail:
      "Valid-until dates, readable line items, and tax only when you charge it.",
    seo: "Online quote software with accept decline link",
    img: mktImg.svcQuotes,
  },
  {
    id: "convert",
    title: "Convert quote → invoice",
    lead: "Lock accepted lines into an invoice number. Stop retyping and silent total drift.",
    detail:
      "The document trail stays intact so collections refer to the same promise.",
    seo: "Convert quote to invoice online free",
    img: mktImg.svcConvert,
  },
  {
    id: "qr",
    title: "Invoice pages with your QR",
    lead: "Upload the QR you already use. Clients pay in their bank app; Folio records the claim.",
    detail: "Built for UPI and local QR rails. No Folio cut. No mandatory gateway KYC.",
    seo: "Free invoice with QR / UPI payment link",
    img: mktImg.svcQr,
  },
  {
    id: "confirm",
    title: "Claim paid → confirm received",
    lead: "Awaiting confirmation means your eyes. Match the claim to your bank alert, then stamp money received.",
    detail:
      "Reject sends the invoice back to due. Event history settles “I paid last Tuesday.”",
    seo: "Client payment confirmation for invoices",
    img: mktImg.svcConfirm,
  },
  {
    id: "remind",
    title: "Reminders that stay specific",
    lead: "WhatsApp-ready copy with amount, due date, and one link—logged so you do not double-ping.",
    detail:
      "Optional email when Resend is configured. Due-soon notices live on your desk.",
    seo: "WhatsApp invoice payment reminders",
    img: mktImg.svcRemind,
  },
  {
    id: "board",
    title: "Live payment board",
    lead: "See due, claimed, and confirmed invoices in one place—without refreshing spreadsheets.",
    detail:
      "Notifications and live refresh keep the desk current while you confirm money as it lands.",
    seo: "Invoice status board for small business",
    img: mktImg.svcBoard,
  },
] as const;

export default function ServicesPage() {
  const path = SERVICES.slice(0, 3);
  const trail = SERVICES.slice(3);

  return (
    <main>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
        ])}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: "Folio services",
          itemListElement: SERVICES.map((s, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: s.title,
            description: s.lead,
            url: absoluteUrl(`/services#${s.id}`),
          })),
        }}
      />

      <MarketingSection
        variant="image"
        image={mktImg.servicesHero}
        imageAlt="Folio services: quote to invoice with UPI QR and payment confirmation"
        align="center"
        size="hero"
        scrim="medium"
      >
        <p className="mkt-hero-kicker" style={{ justifyContent: "center" }}>
          Services
        </p>
        <h1 className="font-display mx-auto mt-5 max-w-4xl text-3xl font-extrabold leading-[1.15] text-white sm:text-5xl">
          From estimate to confirmed money
          <br className="hidden sm:block" />
          —opened for free.
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-[#b7cfd8] sm:text-lg">
          One desk workflow for service businesses that collect through QR, UPI,
          and bank transfer.
        </p>
        <div className="mkt-cta-row" style={{ justifyContent: "center" }}>
          <Link href="/enter" className="folio-btn-ghost">
            Open your desk
          </Link>
          <Link href="/upi-qr-invoice" className="folio-btn-ink">
            UPI QR invoices
          </Link>
          <Link href="/pricing" className="folio-btn-ink">
            Pricing ₹0
          </Link>
        </div>
      </MarketingSection>

      <MarketingSection variant="solid" solid="#07131f" size="content">
        <SectionHeading
          align="center"
          eyebrow="The path"
          title="Quote, convert, collect—without retyping."
          lead="Seven connected moves on one desk. Free on the full money path."
        />
        <div className="mkt-board">
          {path.map((s, i) => (
            <article key={s.id} id={s.id} className="mkt-board__card scroll-mt-24">
              <div
                className="mkt-board__media"
                style={{ backgroundImage: `url(${s.img})` }}
                aria-hidden
              />
              <div className="mkt-board__body">
                <p className="mkt-board__n">{String(i + 1).padStart(2, "0")}</p>
                <p className="mb-2 text-[0.65rem] font-bold uppercase tracking-wider text-[#5eead4]">
                  {s.seo}
                </p>
                <h3 className="text-lg font-bold text-white">{s.title}</h3>
                <p className="mt-2 text-sm font-medium text-[#e8f4f2]">{s.lead}</p>
                <p className="mt-2 text-sm leading-relaxed text-[#b7cfd8]">
                  {s.detail}
                </p>
              </div>
            </article>
          ))}
        </div>
      </MarketingSection>

      <MarketingSection variant="solid" solid="#0a1c2b" size="content">
        <SectionHeading
          align="center"
          eyebrow="Status flow"
          title="Due → claimed → confirmed."
          lead="The same three states every invoice should make obvious."
        />
        <div className="mkt-track">
          {[
            { t: "Due", d: "Share the public invoice with your QR" },
            { t: "Claimed", d: "Client taps “I’ve paid” with optional UTR" },
            { t: "Confirmed", d: "You match the bank and stamp received" },
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
          eyebrow="Payment trail"
          title="QR on the page. Confirmation in your hands."
        />
        <ul className="mkt-principle-grid">
          {trail.map((s, i) => (
            <li key={s.id} id={s.id} className="scroll-mt-24">
              <div
                className="mkt-card-media"
                style={{ backgroundImage: `url(${s.img})` }}
                aria-hidden
              />
              <div className="mkt-card-body">
                <span className="mkt-moves__n">{i + 1}</span>
                <h3 className="font-display mt-3 text-xl font-bold text-white">
                  {s.title}
                </h3>
                <p className="mt-2 text-sm font-medium text-[#e8f4f2]">{s.lead}</p>
                <p className="mt-2 text-sm leading-relaxed text-[#b7cfd8]">
                  {s.detail}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </MarketingSection>

      <MarketingSection variant="solid" solid="#0c2233" size="content">
        <div className="mkt-audience">
          <div
            className="mkt-audience__visual"
            style={{ backgroundImage: `url(${mktImg.servicesAudience})` }}
            aria-hidden
          />
          <div className="mkt-audience__body">
            <SectionHeading
              eyebrow="In practice"
              title="Built around how service work actually closes."
            />
            <ul className="space-y-3.5">
              {[
                "Issue a quote from a phone or desk",
                "Client accepts on a public page",
                "Convert lines to an invoice in one click",
                "Remind with WhatsApp-ready copy, then confirm cash",
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

      <MarketingSection variant="solid" solid="#0f766e" align="center" size="band">
        <div className="mkt-cta-band">
          <SectionHeading
            align="center"
            eyebrow="Get started"
            title="Ready to stop retyping invoices?"
            lead="Create a free account, add one client, and send your first quote today."
          >
            <div className="mkt-cta-row" style={{ marginTop: "1.25rem" }}>
              <Link href="/enter" className="folio-btn-ghost">
                Start free
              </Link>
              <Link href="/contact" className="folio-btn-ink">
                Ask a question
              </Link>
            </div>
          </SectionHeading>
        </div>
      </MarketingSection>
    </main>
  );
}
