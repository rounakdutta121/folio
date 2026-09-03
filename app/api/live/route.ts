import { NextResponse } from "next/server";
import { getSessionUserId } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import {
  ensureDueNotifications,
  liveStamp,
} from "@/lib/notifications";

export const dynamic = "force-dynamic";

const dueCheckAt = new Map<string, number>();

export async function GET() {
  const userId = await getSessionUserId();
  if (!userId) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: { business: true },
  });
  if (!user?.business) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const businessId = user.business.id;
  const last = dueCheckAt.get(businessId) || 0;
  if (Date.now() - last > 60_000) {
    dueCheckAt.set(businessId, Date.now());
    await ensureDueNotifications(businessId);
  }

  const [stamp, unread, recent] = await Promise.all([
    liveStamp(businessId),
    prisma.notification.count({
      where: { businessId, readAt: null },
    }),
    prisma.notification.findMany({
      where: { businessId },
      orderBy: { createdAt: "desc" },
      take: 8,
    }),
  ]);

  return NextResponse.json(
    {
      stamp,
      unread,
      notifications: recent.map((n) => ({
        id: n.id,
        type: n.type,
        title: n.title,
        body: n.body,
        href: n.href,
        read: Boolean(n.readAt),
        createdAt: n.createdAt.toISOString(),
      })),
    },
    {
      headers: {
        "Cache-Control": "no-store",
      },
    },
  );
}
