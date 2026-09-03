"use client";

import { useActionState } from "react";
import { signIn, signUp } from "@/lib/actions";

export function EnterForm({ mode }: { mode: "up" | "in" }) {
  const action = mode === "up" ? signUp : signIn;
  const [state, formAction, pending] = useActionState(
    async (_prev: { error?: string } | null, formData: FormData) =>
      action(formData),
    null,
  );

  return (
    <form action={formAction} className="mt-8 space-y-4">
      {mode === "up" ? (
        <label className="block">
          <span className="folio-label">Business name</span>
          <input
            name="studio"
            className="folio-input"
            placeholder="Your business"
          />
        </label>
      ) : null}
      <label className="block">
        <span className="folio-label">Email</span>
        <input name="email" type="email" required className="folio-input" />
      </label>
      <label className="block">
        <span className="folio-label">Password</span>
        <input
          name="password"
          type="password"
          required
          minLength={8}
          className="folio-input"
        />
      </label>
      {state?.error ? (
        <p className="text-sm text-danger">{state.error}</p>
      ) : null}
      <button disabled={pending} className="folio-btn-ink w-full" type="submit">
        {pending ? "Please wait…" : mode === "up" ? "Start free" : "Sign in"}
      </button>
    </form>
  );
}
