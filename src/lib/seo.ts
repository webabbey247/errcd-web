import type { Metadata } from "next";

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? "https://errcd.com";

/**
 * Shared metadata builder — the single place title/description/canonical/OG logic
 * lives (CHECKLIST.md §5). Every route's `generateMetadata` goes through here.
 *
 * `title` is passed through as `absolute` because 6 of the 8 legacy titles already
 * end in "| ERRCD Forum". Routing them through the root template would double the
 * suffix, and these titles may already be indexed — they must not change.
 */
export type PageSeo = {
  title: string;
  description: string;
  path: string;
  ogImage?: string;
};

export function buildMetadata({
  title,
  description,
  path,
  ogImage,
}: PageSeo): Metadata {
  const canonical = path === "/" ? "/" : path;
  const images = ogImage ? [{ url: ogImage }] : undefined;

  return {
    title: { absolute: title },
    description,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: "ERRCD Forum",
      locale: "en_US",
      type: "website",
      ...(images ? { images } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      ...(images ? { images } : {}),
    },
  };
}

/** Route -> legacy <title>/<meta description>, transcribed verbatim from source. */
export const PAGE_SEO = {
  home: {
    title: "ERRCD Forum Publishing",
    description:
      "ERRCD Forum publishes open-access journals, academic books, proceedings and other scholarly publications.",
    path: "/",
  },
  about: {
    title: "About ERRCD Forum",
    description:
      "About ERRCD Forum, its mission, vision, publishing programme and institutional partnerships.",
    path: "/about",
  },
  advisoryBoard: {
    title: "Advisory Board | ERRCD Forum",
    description: "International Advisory Board of ERRCD Forum.",
    path: "/about/advisory-board",
  },
  services: {
    title: "Publishing and Author Services | ERRCD Forum",
    description:
      "Publishing, editorial, production and author services offered by ERRCD Forum.",
    path: "/services",
  },
  languageEditing: {
    title: "Language Editing Services | ERRCD Forum",
    description:
      "Academic language editing, copyediting, proofreading, formatting and publication-readiness support.",
    path: "/services/language-editing",
  },
  institutionalPublications: {
    title: "Institutional Publications | ERRCD Forum",
    description:
      "Publishing support for proceedings, seminars, workshops and commissioned scholarly works.",
    path: "/services/institutional-publications",
  },
  southAfricanJournals: {
    title: "South African-based Journals | ERRCD Forum",
    description:
      "Directory of ERRCD Forum journals hosted on the South African platform.",
    path: "/south-african-journals",
  },
  inpess2022: {
    title: "INPESS 2022 Conference Archive | ERRCD Forum",
    description:
      "Archive of the 2022 International Conference of New Perspectives in Education and Social Sciences.",
    path: "/conference/inpess-2022",
  },
} as const satisfies Record<string, PageSeo>;
