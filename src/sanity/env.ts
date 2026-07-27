/**
 * Sanity environment.
 *
 * The site must build and serve correctly with NO Sanity credentials configured —
 * that is what keeps the "0 structural DOM diffs vs legacy" gate (CHECKLIST.md §3.4)
 * green and lets the port deploy before the dataset exists. Every read goes through
 * `src/sanity/lib/content.ts`, which falls back to the typed constants in
 * `src/content/` whenever `isSanityConfigured` is false.
 */

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "";
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? "2026-07-01";

/** Server-only. Viewer scope. Required for Live queries and Presentation. */
export const readToken = process.env.SANITY_API_READ_TOKEN ?? "";

/** True only when a project id is present — gates every Sanity code path. */
export const isSanityConfigured = projectId.length > 0;

export const studioUrl = "/studio";
