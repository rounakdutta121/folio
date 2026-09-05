import type { MetadataRoute } from "next";
import { allPosts } from "@/lib/blog";
import { absoluteUrl } from "@/lib/site";
import { sitemapPaths } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = sitemapPaths.map((path) => ({
    url: absoluteUrl(path || "/"),
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority:
      path === ""
        ? 1
        : path === "/privacy" || path === "/terms"
          ? 0.4
          : path.startsWith("/for/") ||
              path.startsWith("/compare/") ||
              path === "/upi-qr-invoice" ||
              path === "/pricing" ||
              path === "/faq"
            ? 0.85
            : 0.8,
  }));

  const posts = allPosts().map((p) => ({
    url: absoluteUrl(`/blog/${p.slug}`),
    lastModified: new Date(p.date),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...posts];
}
