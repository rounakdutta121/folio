import Link from "next/link";
import { redirect } from "next/navigation";
import { requireBusiness } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import {
  markAllNotificationsRead,
  markNotificationRead,
} from "@/lib/actions";
import { ensureDueNotifications } from "@/lib/notifications";

export default async function NotificationsPage() {
  const ctx = await requireBusiness();
  if (!ctx) redirect("/enter");

  await ensureDueNotifications(ctx.business.id);

  const notes = await prisma.notification.findMany({
    where: { businessId: ctx.business.id },
    orderBy: { createdAt: "desc" },
    take: 100,
  });

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">
            Notifications
          </h1>
          <p className="mt-1 text-sm text-muted">
            Client actions, payments, and due reminders.
          </p>
        </div>
        {notes.some((n) => !n.readAt) ? (
          <form action={markAllNotificationsRead}>
            <button type="submit" className="folio-btn-ghost">
              Mark all read
            </button>
          </form>
        ) : null}
      </div>

      <div className="folio-panel mt-6 overflow-hidden p-0">
        {notes.length ? (
          <ul className="divide-y divide-brown/30">
            {notes.map((n) => (
              <li key={n.id} className="px-5 py-4">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      {!n.readAt ? (
                        <span className="h-2 w-2 shrink-0 rounded-full bg-accent" />
                      ) : null}
                      <p className="font-medium">{n.title}</p>
                    </div>
                    {n.body ? (
                      <p className="mt-1 text-sm text-muted">{n.body}</p>
                    ) : null}
                    <p className="mt-2 text-xs text-muted">
                      {new Date(n.createdAt).toLocaleString()} · {n.type}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {n.href ? (
                      <Link href={n.href} className="folio-btn-ghost">
                        Open
                      </Link>
                    ) : null}
                    {!n.readAt ? (
                      <form
                        action={async () => {
                          "use server";
                          await markNotificationRead(n.id);
                        }}
                      >
                        <button type="submit" className="folio-btn-ghost">
                          Mark read
                        </button>
                      </form>
                    ) : null}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="px-5 py-12 text-center text-sm text-muted">
            Nothing here yet. Client accepts, payment claims, and due reminders
            will show up live.
          </div>
        )}
      </div>
    </div>
  );
}
