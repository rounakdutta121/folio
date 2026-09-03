import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/desk", "/clients", "/quotes", "/invoices", "/settings", "/notifications", "/api/"],
    },
    sitemap: absoluteUrl("/sitemap.xml"),
  };
}
