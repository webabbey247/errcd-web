import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { presentationTool } from "sanity/presentation";
import { visionTool } from "@sanity/vision";
import { apiVersion, dataset, projectId, studioUrl } from "@/sanity/env";
import { schemaTypes, SINGLETON_TYPES } from "@/sanity/schemas";
import { resolve } from "@/sanity/presentation/resolve";

/**
 * Embedded Studio config, mounted at /studio.
 *
 * Every content type is a singleton (one document per route), so the default document
 * list is replaced with fixed items and create/delete are removed from the actions —
 * an editor duplicating "Home page" would otherwise orphan the live one.
 */
export default defineConfig({
  name: "errcd-forum",
  title: "ERRCD Forum",
  basePath: studioUrl,
  projectId,
  dataset,

  schema: {
    types: schemaTypes,
    // Singletons must not be creatable from the global "new document" menu.
    templates: (templates) =>
      templates.filter(({ schemaType }) => !SINGLETON_TYPES.includes(schemaType)),
  },

  document: {
    actions: (actions, { schemaType }) =>
      SINGLETON_TYPES.includes(schemaType)
        ? actions.filter(({ action }) =>
            ["publish", "discardChanges", "restore"].includes(action ?? ""),
          )
        : actions,
  },

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("ERRCD Forum")
          .items([
            S.listItem()
              .title("Site settings")
              .id("siteSettings")
              .child(S.document().schemaType("siteSettings").documentId("siteSettings")),
            S.divider(),
            ...[
              ["homePage", "Home"],
              ["aboutPage", "About"],
              ["advisoryBoardPage", "Advisory Board"],
              ["servicesPage", "Services"],
              ["languageEditingPage", "Language Editing"],
              ["institutionalPublicationsPage", "Institutional Publications"],
              ["journalsDirectoryPage", "South African Journals"],
              ["conferencePage", "Conference record"],
            ].map(([type, title]) =>
              S.listItem()
                .title(title!)
                .id(type!)
                .child(S.document().schemaType(type!).documentId(type!)),
            ),
          ]),
    }),
    presentationTool({
      resolve,
      previewUrl: {
        previewMode: { enable: "/api/draft-mode/enable" },
      },
    }),
    visionTool({ defaultApiVersion: apiVersion }),
  ],
});
