export const site = {
  name: "Folio",
  tagline: "Quotes and invoices that get paid",
  description:
    "Folio is free quote-to-invoice software with QR payment tracking for service businesses. Send a quote, convert to an invoice, share your payment QR, and confirm when money arrives—no subscription.",
  url: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
  locale: "en_IN",
  email: "rounak153d@gmail.com",
  phone: "+919815121578",
  phoneDisplay: "+91 98151 21578",
  location: "Chandigarh, India",
  developer: {
    name: "Panelverse",
    url: "https://panelverse.onrender.com",
  },
  keywords: [
    "free invoice software",
    "free invoicing software India",
    "quote to invoice",
    "quotation to invoice",
    "QR payment invoice",
    "invoice with UPI QR",
    "UPI invoice link",
    "small business invoicing India",
    "client payment confirmation",
    "WhatsApp invoice reminder",
    "free quote invoice software",
    "freelancer invoice India",
  ],
} as const;

export function absoluteUrl(path = "/") {
  const base = site.url.replace(/\/$/, "");
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${base}${p}`;
}
