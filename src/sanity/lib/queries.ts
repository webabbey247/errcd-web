import { defineQuery } from "next-sanity";

/**
 * GROQ queries, one per route plus site settings. `defineQuery` marks them for
 * `sanity typegen generate`, which emits typed results into sanity.types.ts.
 *
 * Each singleton is fetched by `_type` with `[0]` rather than by a fixed `_id`, so the
 * seed script does not need to reserve ids and an editor cannot orphan a page by
 * duplicating it.
 */

export const siteSettingsQuery = defineQuery(`
  *[_type == "siteSettings"][0]{
    wordmarkStrong, wordmarkRest, tagline, footerBlurb, copyright,
    desktopNavPrimary[]{label, href},
    aboutDropdown[]{label, href},
    mobileNav[]{label, href},
    offices[]{country, heading, lines, footerLines},
    emailInfo, emailPublisher, emailLangEditor
  }
`);

export const homePageQuery = defineQuery(`
  *[_type == "homePage"][0]{
    seo,
    heroEyebrow, heroHeading, heroText,
    platforms[]{heading, text, href, external, cta, variant},
    aboutEyebrow, aboutHeading, aboutName, aboutParagraphs,
    aboutScope[]{number, heading, text},
    missionVision[]{eyebrow, heading},
    serviceCards[]{number, heading, text, href, external},
    conferenceBadge, conferenceHeading, conferenceText,
    authorLinks[]{kicker, heading, cta, href, external}
  }
`);

export const aboutPageQuery = defineQuery(`
  *[_type == "aboutPage"][0]{
    seo, eyebrow, heading, intro,
    narrativeEyebrow, narrativeHeading, narrativeParagraphs,
    missionPanel[]{eyebrow, heading},
    publishListHeading, publishList,
    partnersHeading, partnersText,
    partnersActions[]{label, href, variant}
  }
`);

export const advisoryBoardPageQuery = defineQuery(`
  *[_type == "advisoryBoardPage"][0]{
    seo, eyebrow, heading, intro,
    members[]{number, name, affiliation},
    roleEyebrow, roleHeading, roleParagraphs
  }
`);

export const servicesPageQuery = defineQuery(`
  *[_type == "servicesPage"][0]{
    seo, eyebrow, heading, intro,
    directory[]{number, heading, text, href, external},
    contactEyebrow, contactHeading, contactText
  }
`);

export const languageEditingPageQuery = defineQuery(`
  *[_type == "languageEditingPage"][0]{
    seo, eyebrow, heading, intro, heroCtaLabel,
    services[]{number, heading, text},
    stepsHeading,
    steps[]{number, title, text},
    supportBand[]{eyebrow, heading, text},
    contactHeading, contactText
  }
`);

export const institutionalPublicationsPageQuery = defineQuery(`
  *[_type == "institutionalPublicationsPage"][0]{
    seo, eyebrow, heading, intro,
    publications[]{number, heading, text},
    supportEyebrow, supportHeading, supportParagraphs,
    contactHeading, contactText
  }
`);

export const journalsDirectoryPageQuery = defineQuery(`
  *[_type == "journalsDirectoryPage"][0]{
    seo, eyebrow, heading, intro,
    journals[]{number, abbreviation, heading, text, href},
    noteHeading, noteText, noteCtaLabel, noteCtaHref
  }
`);

export const conferencePageQuery = defineQuery(`
  *[_type == "conferencePage"][0]{
    seo, eyebrow, heading,
    facts[]{label, value},
    introEyebrow, introHeading, introParagraphs,
    themes[]{number, heading},
    topics,
    calendar[]{date, event},
    futureEyebrow, futureHeading, futureText, futureCtaLabel
  }
`);
