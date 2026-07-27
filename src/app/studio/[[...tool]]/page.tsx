import { notFound } from "next/navigation";
import { isSanityConfigured } from "@/sanity/env";
import { StudioClient } from "./studio-client";

export const dynamic = "force-static";

export { metadata, viewport } from "next-sanity/studio";

/**
 * Embedded Studio at /studio. 404s when no Sanity project is configured so the route
 * does not render a broken shell on a deployment that has not been connected yet.
 * Excluded from indexing by src/app/robots.ts.
 */
export default function StudioPage() {
  if (!isSanityConfigured) notFound();
  return <StudioClient />;
}
