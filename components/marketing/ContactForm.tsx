"use client";

import { useActionState } from "react";
import { submitContact, type ContactState } from "@/lib/contact";

const initial: ContactState = { ok: false, message: "" };

export function ContactForm() {
  const [state, action, pending] = useActionState(submitContact, initial);

  return (
    <form action={action} className="mt-10 max-w-xl space-y-5">
      <div className="hidden" aria-hidden>
        <label htmlFor="company">Company</label>
        <input id="company" name="company" tabIndex={-1} autoComplete="off" />
      </div>
      <div>
        <label htmlFor="name" className="block text-sm font-semibold text-yellow">
          Name
        </label>
        <input
          id="name"
          name="name"
          required
          className="folio-input mt-2 w-full"
          autoComplete="name"
        />
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-semibold text-yellow">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="folio-input mt-2 w-full"
          autoComplete="email"
        />
      </div>
      <div>
        <label htmlFor="topic" className="block text-sm font-semibold text-yellow">
          Topic
        </label>
        <select id="topic" name="topic" className="folio-input mt-2 w-full">
          <option value="General">General</option>
          <option value="Product fit">Product fit</option>
          <option value="Partnership">Partnership</option>
          <option value="Press / SEO">Press / SEO</option>
          <option value="Support">Support</option>
        </select>
      </div>
      <div>
        <label htmlFor="message" className="block text-sm font-semibold text-yellow">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={6}
          className="folio-input mt-2 w-full"
        />
      </div>
      {state.message ? (
        <p
          className={
            state.ok
              ? "text-sm font-medium text-[#86efac]"
              : "text-sm font-medium text-[#fca5a5]"
          }
          role="status"
        >
          {state.message}
        </p>
      ) : null}
      <button type="submit" className="folio-btn-ink" disabled={pending}>
        {pending ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}
