"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { saveSettings } from "@/lib/actions";
import { fileToDataUrl } from "@/lib/image-data-url";

type Props = {
  business: {
    name: string;
    currency: string;
    taxLabel: string;
    taxRate: number;
    defaultDueDays: number;
    payInstructions: string;
    reminderTemplate: string;
    logoUrl: string | null;
    paymentQrUrl: string | null;
  };
};

export function SettingsForm({ business: b }: Props) {
  const router = useRouter();
  const [logoPreview, setLogoPreview] = useState(b.logoUrl);
  const [qrPreview, setQrPreview] = useState(b.paymentQrUrl);
  const [logoData, setLogoData] = useState("");
  const [qrData, setQrData] = useState("");
  const [error, setError] = useState("");
  const [saved, setSaved] = useState(false);
  const [pending, startTransition] = useTransition();

  async function onLogoChange(file: File | null) {
    setError("");
    setSaved(false);
    if (!file) {
      setLogoData("");
      return;
    }
    try {
      const dataUrl = await fileToDataUrl(file, {
        maxSide: 480,
        mime: "image/jpeg",
        quality: 0.8,
      });
      setLogoData(dataUrl);
      setLogoPreview(dataUrl);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not read logo.");
    }
  }

  async function onQrChange(file: File | null) {
    setError("");
    setSaved(false);
    if (!file) {
      setQrData("");
      return;
    }
    try {
      const dataUrl = await fileToDataUrl(file, {
        maxSide: 640,
        mime: "image/png",
        quality: 1,
      });
      setQrData(dataUrl);
      setQrPreview(dataUrl);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not read QR image.");
    }
  }

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setSaved(false);
    const form = e.currentTarget;
    const fd = new FormData(form);
    fd.delete("logo");
    fd.delete("qr");
    if (logoData) fd.set("logoDataUrl", logoData);
    if (qrData) fd.set("qrDataUrl", qrData);

    startTransition(async () => {
      try {
        await saveSettings(fd);
        setSaved(true);
        setLogoData("");
        setQrData("");
        router.refresh();
      } catch (err) {
        setError(err instanceof Error ? err.message : "Save failed.");
      }
    });
  }

  return (
    <form onSubmit={onSubmit} className="folio-panel mt-6 space-y-4">
      <label className="block">
        <span className="folio-label">Business name</span>
        <input name="name" defaultValue={b.name} className="folio-input" />
      </label>
      <label className="block">
        <span className="folio-label">Currency</span>
        <input name="currency" defaultValue={b.currency} className="folio-input" />
      </label>
      <div className="grid grid-cols-2 gap-4">
        <label>
          <span className="folio-label">Tax label</span>
          <input
            name="taxLabel"
            defaultValue={b.taxLabel}
            className="folio-input"
          />
        </label>
        <label>
          <span className="folio-label">Tax %</span>
          <input
            name="taxRate"
            type="number"
            step="0.01"
            defaultValue={b.taxRate}
            className="folio-input"
          />
        </label>
      </div>
      <label className="block">
        <span className="folio-label">Default due days</span>
        <input
          name="defaultDueDays"
          type="number"
          defaultValue={b.defaultDueDays}
          className="folio-input"
        />
      </label>
      <label className="block">
        <span className="folio-label">Pay instructions</span>
        <textarea
          name="payInstructions"
          defaultValue={b.payInstructions}
          rows={3}
          className="folio-input"
        />
      </label>
      <label className="block">
        <span className="folio-label">Reminder template</span>
        <textarea
          name="reminderTemplate"
          defaultValue={b.reminderTemplate}
          rows={4}
          className="folio-input"
        />
      </label>
      <label className="block">
        <span className="folio-label">Logo</span>
        <input
          type="file"
          accept="image/*"
          className="block w-full text-sm"
          onChange={(e) => onLogoChange(e.target.files?.[0] ?? null)}
        />
        {logoPreview ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={logoPreview}
            alt=""
            className="mt-3 h-16 w-auto rounded-lg border-2 border-brown bg-surface object-contain p-1"
          />
        ) : null}
      </label>
      <label className="block">
        <span className="folio-label">Payment QR</span>
        <input
          type="file"
          accept="image/*"
          className="block w-full text-sm"
          onChange={(e) => onQrChange(e.target.files?.[0] ?? null)}
        />
        {qrPreview ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={qrPreview}
            alt=""
            className="mt-3 h-28 w-28 rounded-lg border-2 border-brown bg-surface object-contain p-1"
          />
        ) : null}
      </label>
      {error ? (
        <p className="text-sm font-medium text-[#9f1239]" role="alert">
          {error}
        </p>
      ) : null}
      {saved ? (
        <p className="text-sm font-medium text-[#166534]" role="status">
          Settings saved.
        </p>
      ) : null}
      <button className="folio-btn-ink" type="submit" disabled={pending}>
        {pending ? "Saving…" : "Save settings"}
      </button>
    </form>
  );
}
