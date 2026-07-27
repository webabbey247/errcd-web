import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId, studioUrl } from "../env";

/**
 * `useCdn: false` because all reads go through `sanityFetch` (Live), which manages its
 * own caching and revalidation — the CDN would serve stale content to Presentation.
 *
 * `stega` embeds invisible click-to-edit metadata into strings when draft mode is on.
 * Any string used in an href, a `<title>`, or JSON-LD MUST be passed through
 * `stegaClean()` first — see `src/sanity/lib/content.ts`.
 */
export const client = createClient({
  // `createClient` throws at module evaluation on an empty projectId, which would break
  // the build for any deployment that has not connected Sanity yet. A placeholder keeps
  // the module inert — `isSanityConfigured` gates every actual request, so no call is
  // ever made with it. See src/sanity/lib/content.ts.
  projectId: projectId || "placeholder",
  dataset,
  apiVersion,
  useCdn: false,
  perspective: "published",
  stega: { studioUrl },
});
