import { Resend } from "resend";

export async function sendMail(opts: {
  to: string;
  subject: string;
  text: string;
}) {
  if (!process.env.RESEND_API_KEY || !opts.to) return { sent: false as const };
  const resend = new Resend(process.env.RESEND_API_KEY);
  const from = process.env.RESEND_FROM || "Folio <folio@updates.local>";
  await resend.emails.send({
    from,
    to: opts.to,
    subject: opts.subject,
    text: opts.text,
  });
  return { sent: true as const };
}

export function fillReminder(
  template: string,
  vars: { name: string; number: string; amount: string; link: string },
) {
  return template
    .replaceAll("{name}", vars.name)
    .replaceAll("{number}", vars.number)
    .replaceAll("{amount}", vars.amount)
    .replaceAll("{link}", vars.link);
}

export function whatsappHref(phone: string, text: string) {
  const digits = phone.replace(/\D/g, "");
  const q = encodeURIComponent(text);
  if (!digits) return `https://wa.me/?text=${q}`;
  return `https://wa.me/${digits}?text=${q}`;
}

export function appOrigin() {
  return process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
}
