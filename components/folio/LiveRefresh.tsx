"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

/** Polls live stamp and refreshes RSC pages when data changes (~1.5s). */
export function LiveRefresh() {
  const router = useRouter();
  const stamp = useRef<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    let timer: ReturnType<typeof setTimeout> | undefined;

    async function tick() {
      try {
        const res = await fetch("/api/live", { cache: "no-store" });
        if (!res.ok) return;
        const data = (await res.json()) as { stamp?: string };
        if (cancelled || !data.stamp) return;
        if (stamp.current === null) {
          stamp.current = data.stamp;
        } else if (stamp.current !== data.stamp) {
          stamp.current = data.stamp;
          router.refresh();
        }
      } catch {
        /* ignore transient errors */
      } finally {
        if (!cancelled) timer = setTimeout(tick, 1500);
      }
    }

    tick();
    return () => {
      cancelled = true;
      if (timer) clearTimeout(timer);
    };
  }, [router]);

  return null;
}
