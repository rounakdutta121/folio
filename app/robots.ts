import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/desk",
        "/clients",
        "/quotes",
        "/invoices",
        "/settings",
        "/notifications",
        "/api/",
        "/enter",
      ],
    },
    sitemap: absoluteUrl("/sitemap.xml"),
  };
}
