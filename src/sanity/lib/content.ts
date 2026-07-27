import "server-only";
import { stegaClean } from "next-sanity";
import { isSanityConfigured } from "../env";
import { sanityFetch } from "./live";
import { buildMetadata, PAGE_SEO, type PageSeo } from "@/lib/seo";
import type { Metadata } from "next";

/**
 * Sanity reads with a guaranteed fallback to the typed constants in `src/content/`.
 *
 * Why: the port must build and serve identically with NO Sanity project configured
 * (CHECKLIST.md §3.4 requires 0 structural DOM diffs vs the legacy HTML). This wrapper
 * makes Sanity purely additive — when it is unconfigured, unreachable, or returns an
 * empty singleton, the page renders the same constants it renders today.
 *
 * A failed fetch is logged and swallowed rather than thrown: a CMS outage should not
 * take down a brochure site that already has every string compiled in.
 */
export async function fetchContent<T>(
  query: string,
  fallback: T,
): Promise<T> {
  if (!isSanityConfigured) return fallback;

  try {
    const { data } = await sanityFetch({ query });
    return (data as T | null) ?? fallback;
  } catch (error) {
    console.error(
      `[sanity] query failed, falling back to bundled content: ${
        error instanceof Error ? error.message : String(error)
      }`,
    );
    return fallback;
  }
}

/**
 * Page metadata, preferring Sanity `seo` over the legacy values.
 *
 * Every field is `stegaClean`ed: stega injects invisible characters into strings when
 * draft mode is on, and those would corrupt `<title>`, meta descriptions and canonical
 * URLs — the exact failure mode called out in CHECKLIST.md §4.3.
 */
type SanitySeo = {
  title?: string | null;
  description?: string | null;
  noIndex?: boolean | null;
} | null;

export async function buildPageMetadata(
  key: keyof typeof PAGE_SEO,
  query: string,
): Promise<Metadata> {
  const fallback: PageSeo = PAGE_SEO[key];

  const seo = await fetchContent<SanitySeo>(query, null);
  const clean = (value: string | null | undefined) => {
    const cleaned = stegaClean(value ?? "");
    return typeof cleaned === "string" && cleaned.trim().length > 0
      ? cleaned.trim()
      : undefined;
  };

  const metadata = buildMetadata({
    title: clean(seo?.title) ?? fallback.title,
    description: clean(seo?.description) ?? fallback.description,
    path: fallback.path,
  });

  return seo?.noIndex
    ? { ...metadata, robots: { index: false, follow: false } }
    : metadata;
}
