"use client";

import { useState } from "react";

type LineRow = {
  id: string;
  description: string;
  qty: number;
  rate: number;
};

function newRow(
  partial?: Partial<Omit<LineRow, "id">>,
): LineRow {
  return {
    id: crypto.randomUUID(),
    description: partial?.description ?? "",
    qty: partial?.qty ?? 1,
    rate: partial?.rate ?? 0,
  };
}

export function LineEditor({
  initial,
}: {
  initial?: { description: string; qty: number; rate: number }[];
}) {
  const [rows, setRows] = useState<LineRow[]>(() =>
    initial?.length
      ? initial.map((row) => newRow(row))
      : [newRow()],
  );

  function removeRow(id: string) {
    setRows((current) => {
      if (current.length <= 1) return current;
      return current.filter((row) => row.id !== id);
    });
  }

  return (
    <div className="space-y-3">
      <div className="hidden grid-cols-[1fr_5rem_8rem_2.5rem] gap-2 text-sm text-muted sm:grid">
        <span>Description</span>
        <span className="text-right">Qty</span>
        <span className="text-right">Rate</span>
        <span className="sr-only">Remove</span>
      </div>
      {rows.map((row, i) => (
        <div
          key={row.id}
          className="space-y-2 rounded-lg border-2 border-brown/40 bg-surface/50 p-2 sm:grid sm:grid-cols-[1fr_5rem_8rem_2.5rem] sm:items-center sm:space-y-0 sm:border-0 sm:bg-transparent sm:p-0"
        >
          <input
            name="description"
            required={i === 0}
            defaultValue={row.description}
            placeholder="Description"
            className="folio-input"
          />
          <div className="grid grid-cols-[1fr_1fr_auto] gap-2 sm:contents">
            <label className="sm:contents">
              <span className="mb-1 block text-xs font-semibold text-brown sm:hidden">
                Qty
              </span>
              <input
                name="qty"
                type="number"
                step="0.01"
                min="0"
                defaultValue={row.qty}
                className="folio-input text-right"
              />
            </label>
            <label className="sm:contents">
              <span className="mb-1 block text-xs font-semibold text-brown sm:hidden">
                Rate
              </span>
              <input
                name="rate"
                type="number"
                step="0.01"
                min="0"
                defaultValue={row.rate}
                className="folio-input text-right"
              />
            </label>
            <button
              type="button"
              className="self-end rounded-md px-2 py-1.5 text-sm font-bold text-danger hover:bg-yellow disabled:cursor-not-allowed disabled:opacity-40 sm:self-center sm:justify-self-center"
              onClick={() => removeRow(row.id)}
              disabled={rows.length <= 1}
              title={rows.length <= 1 ? "Keep at least one line" : "Delete line"}
              aria-label="Delete line"
            >
              ×
            </button>
          </div>
        </div>
      ))}
      <button
        type="button"
        className="text-sm font-semibold text-accent hover:underline"
        onClick={() => setRows((r) => [...r, newRow()])}
      >
        + Add line
      </button>
    </div>
  );
}
