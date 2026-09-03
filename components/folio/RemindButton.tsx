"use client";

import { useTransition } from "react";
import { remindInvoice } from "@/lib/actions";

export function RemindButton({ documentId }: { documentId: string }) {
  const [pending, start] = useTransition();
  return (
    <button
      type="button"
      disabled={pending}
      className="folio-btn-ghost"
      onClick={() =>
        start(async () => {
          const res = await remindInvoice(documentId);
          if (res?.href) window.open(res.href, "_blank");
        })
      }
    >
      {pending ? "Opening…" : "Remind"}
    </button>
  );
}
