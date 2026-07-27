import type { MetadataRoute } from "next";
import { PAGE_SEO, SITE_URL } from "@/lib/seo";

/** All 8 routes are static — there are no dynamic segments to enumerate. */
export default function sitemap(): MetadataRoute.Sitemap {
  const priorities: Record<string, number> = {
    "/": 1,
    "/about": 0.8,
    "/services": 0.8,
    "/south-african-journals": 0.8,
  };

  return Object.values(PAGE_SEO).map((page) => ({
    url: `${SITE_URL}${page.path === "/" ? "" : page.path}`,
    changeFrequency: "monthly" as const,
    priority: priorities[page.path] ?? 0.6,
  }));
}
