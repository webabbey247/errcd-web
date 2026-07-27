import { defineLive } from "next-sanity/live";
import { client } from "./client";
import { readToken } from "../env";

/**
 * `sanityFetch` + `<SanityLive />` give the Presentation tool live updates without a
 * manual reload. Both tokens are the same viewer-scope read token: the server token
 * fetches drafts during SSR, the browser token opens the live-update event stream.
 *
 * NOTE: never fetch page content with the raw `client` — that bypasses Live entirely
 * and Presentation will appear frozen (CHECKLIST.md §4.3).
 */
export const { sanityFetch, SanityLive } = defineLive({
  client,
  serverToken: readToken,
  browserToken: readToken,
});
