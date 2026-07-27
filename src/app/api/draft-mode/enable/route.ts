import { defineEnableDraftMode } from "next-sanity/draft-mode";
import { client } from "@/sanity/lib/client";
import { readToken } from "@/sanity/env";

/**
 * Presentation calls this to turn on draft mode before loading the preview iframe.
 * The token is validated by `defineEnableDraftMode`, so an unauthenticated caller
 * cannot flip the site into draft mode.
 */
export const { GET } = defineEnableDraftMode({
  client: client.withConfig({ token: readToken }),
});
