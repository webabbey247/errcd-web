/**
 * Seeds the Sanity dataset with the exact copy currently on the live site.
 *
 *   NEXT_PUBLIC_SANITY_PROJECT_ID=... SANITY_API_WRITE_TOKEN=... npx tsx scripts/seed.ts
 *
 * Documents are imported from `src/content/` — the same objects the app uses as its
 * offline fallback — so the seeded dataset and the bundled copy can never diverge.
 *
 * Each document uses a fixed `_id` matching its `_type`, so re-running is idempotent
 * (createOrReplace) and the Studio structure in sanity.config.ts addresses each
 * singleton by that id.
 *
 * After seeding, re-run the DOM-parity check — Sanity-sourced pages must still be
 * structurally identical to the legacy HTML (CHECKLIST.md §4.3).
 */
import { createClient } from "@sanity/client";
import { HOME_FALLBACK } from "../src/content/home";
import {
  ABOUT_FALLBACK,
  BOARD_FALLBACK,
  CONFERENCE_FALLBACK,
  INSTITUTIONAL_FALLBACK,
  JOURNALS_FALLBACK,
  LANGUAGE_EDITING_FALLBACK,
  SERVICES_FALLBACK,
  SITE_SETTINGS_FALLBACK,
} from "../src/content/pages";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
const token = process.env.SANITY_API_WRITE_TOKEN;

if (!projectId) throw new Error("NEXT_PUBLIC_SANITY_PROJECT_ID is required");
if (!token) throw new Error("SANITY_API_WRITE_TOKEN is required");

const client = createClient({
  projectId,
  dataset,
  token,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? "2026-07-01",
  useCdn: false,
});

/**
 * Explicitly typed: the documents are heterogeneous, and TypeScript would otherwise
 * infer the array element type from the first entry and reject every other shape.
 */
type SeedDocument = { _id: string; _type: string } & Record<string, unknown>;

const documents: SeedDocument[] = [
  { _id: "siteSettings", _type: "siteSettings", ...SITE_SETTINGS_FALLBACK },
  { _id: "homePage", _type: "homePage", ...HOME_FALLBACK },
  { _id: "aboutPage", _type: "aboutPage", ...ABOUT_FALLBACK },
  { _id: "advisoryBoardPage", _type: "advisoryBoardPage", ...BOARD_FALLBACK },
  { _id: "servicesPage", _type: "servicesPage", ...SERVICES_FALLBACK },
  {
    _id: "languageEditingPage",
    _type: "languageEditingPage",
    ...LANGUAGE_EDITING_FALLBACK,
  },
  {
    _id: "institutionalPublicationsPage",
    _type: "institutionalPublicationsPage",
    ...INSTITUTIONAL_FALLBACK,
  },
  {
    _id: "journalsDirectoryPage",
    _type: "journalsDirectoryPage",
    ...JOURNALS_FALLBACK,
  },
  { _id: "conferencePage", _type: "conferencePage", ...CONFERENCE_FALLBACK },
];

async function seed() {
  const tx = client.transaction();
  for (const doc of documents) tx.createOrReplace(doc);
  await tx.commit();
  console.log(`Seeded ${documents.length} documents into ${projectId}/${dataset}.`);
  console.log("Next: re-run the DOM-parity check to confirm 0 structural diffs.");
}

seed().catch((error) => {
  console.error("Seed failed:", error);
  process.exit(1);
});
