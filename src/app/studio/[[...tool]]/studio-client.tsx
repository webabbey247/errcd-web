"use client";

import { NextStudio } from "next-sanity/studio";
import config from "../../../../sanity.config";

/**
 * The Studio must live in the CLIENT graph.
 *
 * `sanity/structure` pulls in a chunk that does `import useSWR from "swr"`, and swr's
 * `react-server` export condition has no default export — so importing sanity.config
 * from a Server Component fails the Turbopack build with
 * "Export default doesn't exist in target module". Keeping the config import behind
 * "use client" resolves swr through its browser condition instead.
 */
export function StudioClient() {
  return <NextStudio config={config} />;
}
