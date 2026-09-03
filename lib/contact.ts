"use server";

export type ContactState = {
  ok: boolean;
  message: string;
};

export async function submitContact(
  _prev: ContactState,
  formData: FormData,
): Promise<ContactState> {
  const name = String(formData.get("name") || "").trim();
  const email = String(formData.get("email") || "").trim();
  const topic = String(formData.get("topic") || "").trim();
  const message = String(formData.get("message") || "").trim();
  const honeypot = String(formData.get("company") || "").trim();

  if (honeypot) {
    return { ok: true, message: "Thanks — we will reply soon." };
  }

  if (!name || name.length < 2) {
    return { ok: false, message: "Please enter your name." };
  }
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { ok: false, message: "Please enter a valid email." };
  }
  if (!message || message.length < 10) {
    return { ok: false, message: "Tell us a bit more (at least a sentence)." };
  }

  // Optional: wire Resend when RESEND_API_KEY is set
  const key = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL || process.env.RESEND_FROM;
  if (key && to) {
    try {
      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${key}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: process.env.RESEND_FROM || "Folio <onboarding@resend.dev>",
          to: [to],
          reply_to: email,
          subject: `[Folio contact] ${topic || "General"} — ${name}`,
          text: `From: ${name} <${email}>\nTopic: ${topic || "General"}\n\n${message}`,
        }),
      });
    } catch {
      // Still acknowledge — do not leak infra errors
    }
  } else {
    console.info("[folio-contact]", { name, email, topic, message });
  }

  return {
    ok: true,
    message: "Thanks — we received your message and will reply soon.",
  };
}
