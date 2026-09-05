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
  if (!message) {
    return { ok: false, message: "Please enter a message." };
  }

  const payload = {
    name,
    email,
    topic: topic || "General",
    // Older Apps Script builds required ≥10 chars; keep compatible
    message:
      message.length >= 10
        ? message
        : `${message}\n\n— Sent via Folio contact form`,
  };

  const gasUrl = process.env.GOOGLE_APPS_SCRIPT_CONTACT_URL?.trim();
  if (gasUrl) {
    try {
      // text/plain avoids CORS preflight; Apps Script still JSON.parses the body
      const res = await fetch(gasUrl, {
        method: "POST",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify(payload),
        redirect: "follow",
      });
      const text = await res.text();
      let ok = res.ok;
      let gasError = "";
      try {
        const parsed = JSON.parse(text) as { ok?: boolean; error?: string };
        ok = Boolean(parsed.ok);
        gasError = parsed.error || "";
        if (!ok) {
          console.error("[folio-contact] Apps Script error:", gasError || text);
        }
      } catch {
        console.error(
          "[folio-contact] Apps Script bad response:",
          res.status,
          text.slice(0, 200),
        );
        ok = false;
      }
      if (!ok) {
        return {
          ok: false,
          message: gasError
            ? `Could not send (${gasError}). Please try again or email us directly.`
            : "Could not send right now. Please email us directly or try again later.",
        };
      }
    } catch (err) {
      console.error("[folio-contact] Apps Script fetch failed:", err);
      return {
        ok: false,
        message:
          "Could not send right now. Please email us directly or try again later.",
      };
    }
    return {
      ok: true,
      message: "Thanks — we received your message and will reply soon.",
    };
  }

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
    console.info("[folio-contact]", payload);
  }

  return {
    ok: true,
    message: "Thanks — we received your message and will reply soon.",
  };
}
