import { defineLocations, type PresentationPluginOptions } from "sanity/presentation";

/**
 * documentLocations — maps each singleton to the route it renders.
 *
 * Without this, Presentation's "Open preview" only ever opens `/` regardless of which
 * document is selected (CHECKLIST.md §4.3 flags this as the most-skipped step). All 8
 * routes are static, so each mapping is a constant path.
 */
const singleton = (title: string, href: string) =>
  defineLocations({
    message: `This document is shown at ${href}`,
    locations: [{ title, href }],
  });

export const resolve: PresentationPluginOptions["resolve"] = {
  locations: {
    siteSettings: defineLocations({
      message: "The header and footer appear on every page.",
      locations: [
        { title: "Home", href: "/" },
        { title: "About", href: "/about" },
        { title: "Services", href: "/services" },
      ],
    }),
    homePage: singleton("Home", "/"),
    aboutPage: singleton("About ERRCD Forum", "/about"),
    advisoryBoardPage: singleton("Advisory Board", "/about/advisory-board"),
    servicesPage: singleton("Publishing and Author Services", "/services"),
    languageEditingPage: singleton(
      "Language Editing Services",
      "/services/language-editing",
    ),
    institutionalPublicationsPage: singleton(
      "Institutional Publications",
      "/services/institutional-publications",
    ),
    journalsDirectoryPage: singleton(
      "South African-based Journals",
      "/south-african-journals",
    ),
    conferencePage: singleton(
      "INPESS 2022 Conference Archive",
      "/conference/inpess-2022",
    ),
  },
};
