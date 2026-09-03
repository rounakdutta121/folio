"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

type Note = {
  id: string;
  type: string;
  title: string;
  body: string;
  href: string;
  read: boolean;
  createdAt: string;
};

export function NotificationBell() {
  const [open, setOpen] = useState(false);
  const [unread, setUnread] = useState(0);
  const [items, setItems] = useState<Note[]>([]);

  const load = useCallback(async () => {
    try {
      const res = await fetch("/api/live", { cache: "no-store" });
      if (!res.ok) return;
      const data = (await res.json()) as {
        unread: number;
        notifications: Note[];
      };
      setUnread(data.unread);
      setItems(data.notifications);
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    load();
    const id = setInterval(load, 1500);
    return () => clearInterval(id);
  }, [load]);

  useEffect(() => {
    if (!open) return;
    function onDoc(e: MouseEvent) {
      const t = e.target as HTMLElement | null;
      if (t?.closest("[data-notify-root]")) return;
      setOpen(false);
    }
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [open]);

  return (
    <div className="relative" data-notify-root>
      <button
        type="button"
        className="relative grid h-9 w-9 place-items-center rounded-full border-2 border-yellow bg-brown text-yellow hover:bg-accent"
        aria-label="Notifications"
        onClick={() => setOpen((v) => !v)}
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          aria-hidden
        >
          <path d="M15 17h5l-1.4-1.4A2 2 0 0 1 18 14.2V11a6 6 0 1 0-12 0v3.2c0 .5-.2 1-.6 1.4L4 17h5" />
          <path d="M10 17a2 2 0 0 0 4 0" />
        </svg>
        {unread > 0 ? (
          <span className="absolute -right-0.5 -top-0.5 min-w-4 rounded-full bg-accent px-1 text-center text-[0.65rem] font-semibold leading-4 text-white">
            {unread > 9 ? "9+" : unread}
          </span>
        ) : null}
      </button>

      {open ? (
        <div className="folio-panel fixed left-3 right-3 top-[3.75rem] z-40 overflow-hidden p-0 sm:absolute sm:left-auto sm:right-0 sm:top-auto sm:mt-2 sm:w-[min(22rem,calc(100vw-2rem))]">
          <div className="flex items-center justify-between border-b-2 border-brown px-4 py-3">
            <p className="text-sm font-semibold">Notifications</p>
            <Link
              href="/notifications"
              className="text-xs font-bold text-accent hover:underline"
              onClick={() => setOpen(false)}
            >
              View all
            </Link>
          </div>
          <ul className="max-h-80 overflow-y-auto">
            {items.length ? (
              items.map((n) => (
                <li key={n.id} className="border-b border-brown/30 last:border-0">
                  <Link
                    href={n.href || "/notifications"}
                    className="block px-4 py-3 hover:bg-yellow/40"
                    onClick={() => setOpen(false)}
                  >
                    <div className="flex items-start gap-2">
                      {!n.read ? (
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                      ) : (
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0" />
                      )}
                      <div className="min-w-0">
                        <p className="text-sm font-bold text-ink">{n.title}</p>
                        {n.body ? (
                          <p className="mt-0.5 text-xs text-muted">{n.body}</p>
                        ) : null}
                        <p className="mt-1 text-[0.65rem] text-muted">
                          {new Date(n.createdAt).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </Link>
                </li>
              ))
            ) : (
              <li className="px-4 py-8 text-center text-sm text-muted">
                No notifications yet
              </li>
            )}
          </ul>
        </div>
      ) : null}
    </div>
  );
}
