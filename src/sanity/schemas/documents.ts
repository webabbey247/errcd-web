import { defineField, defineType } from "sanity";

/**
 * One document per route, plus a siteSettings singleton.
 *
 * CRITICAL — the `.length(n)` rules below are LAYOUT CONSTRAINTS, not style choices.
 * globals.css uses fixed grid-template-columns with :nth-child border logic, so adding
 * or removing an item silently breaks the row borders. See CHECKLIST.md §4.2 for the
 * full mapping. Do not relax them without changing the CSS.
 */

const seoField = defineField({ name: "seo", type: "seo" });

const eyebrow = (description?: string) =>
  defineField({
    name: "eyebrow",
    type: "string",
    description: description ?? "Small uppercase label above the heading.",
    validation: (rule) => rule.required(),
  });

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site settings",
  type: "document",
  groups: [
    { name: "brand", title: "Brand" },
    { name: "nav", title: "Navigation" },
    { name: "contact", title: "Contact" },
    { name: "footer", title: "Footer" },
  ],
  fields: [
    defineField({ name: "wordmarkStrong", title: "Wordmark (bold part)", type: "string", group: "brand", initialValue: "ERRCD", validation: (r) => r.required() }),
    defineField({ name: "wordmarkRest", title: "Wordmark (rest)", type: "string", group: "brand", initialValue: " Forum", validation: (r) => r.required() }),
    defineField({ name: "tagline", type: "string", group: "brand", validation: (r) => r.required() }),
    defineField({ name: "footerBlurb", type: "text", rows: 2, group: "footer", validation: (r) => r.required() }),
    defineField({ name: "copyright", type: "string", group: "footer", validation: (r) => r.required() }),

    defineField({
      name: "desktopNavPrimary",
      title: "Desktop nav — links before the About dropdown",
      type: "array",
      of: [{ type: "navLink" }],
      group: "nav",
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: "aboutDropdown",
      title: "About dropdown items",
      type: "array",
      of: [{ type: "navLink" }],
      group: "nav",
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: "mobileNav",
      title: "Mobile nav (flat list)",
      type: "array",
      of: [{ type: "navLink" }],
      group: "nav",
      validation: (rule) => rule.required().min(1),
    }),

    defineField({
      name: "offices",
      type: "array",
      of: [{ type: "office" }],
      group: "contact",
      description: "Exactly 2 — `.contactDetails` is a 3-column grid (2 offices + emails).",
      validation: (rule) => rule.length(2),
    }),
    defineField({ name: "emailInfo", title: "General enquiries email", type: "string", group: "contact", validation: (r) => r.required() }),
    defineField({ name: "emailPublisher", title: "Publishing email", type: "string", group: "contact", validation: (r) => r.required() }),
    defineField({ name: "emailLangEditor", title: "Language editing email", type: "string", group: "contact", validation: (r) => r.required() }),
  ],
  preview: { prepare: () => ({ title: "Site settings" }) },
});

export const homePage = defineType({
  name: "homePage",
  title: "Home page",
  type: "document",
  fields: [
    seoField,
    defineField({ name: "heroEyebrow", type: "string", validation: (r) => r.required() }),
    defineField({ name: "heroHeading", type: "text", rows: 2, validation: (r) => r.required() }),
    defineField({ name: "heroText", type: "text", rows: 3, validation: (r) => r.required() }),
    defineField({
      name: "platforms",
      type: "array",
      of: [{ type: "platformCard" }],
      description: "Exactly 4 — `.platforms` is a 4-column grid.",
      validation: (rule) => rule.length(4),
    }),
    defineField({ name: "aboutEyebrow", type: "string", validation: (r) => r.required() }),
    defineField({ name: "aboutHeading", type: "text", rows: 2, validation: (r) => r.required() }),
    defineField({ name: "aboutName", title: "Legal name strapline", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "aboutParagraphs",
      type: "array",
      of: [{ type: "text" }],
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: "aboutScope",
      title: "Scope cards",
      type: "array",
      of: [{ type: "numberedCard" }],
      description: "Exactly 4 — `.aboutScope` is a 4-column grid.",
      validation: (rule) => rule.length(4),
    }),
    defineField({
      name: "missionVision",
      type: "array",
      of: [
        {
          type: "object",
          name: "missionVisionItem",
          fields: [
            defineField({ name: "eyebrow", type: "string", validation: (r) => r.required() }),
            defineField({ name: "heading", type: "text", rows: 3, validation: (r) => r.required() }),
          ],
          preview: { select: { title: "eyebrow", subtitle: "heading" } },
        },
      ],
      description: "Exactly 2 — mission and vision sit side by side.",
      validation: (rule) => rule.length(2),
    }),
    defineField({
      name: "serviceCards",
      type: "array",
      of: [{ type: "numberedLinkCard" }],
      description: "Exactly 6 — `.serviceCard` uses nth-child(3n) border logic.",
      validation: (rule) => rule.length(6),
    }),
    defineField({ name: "conferenceBadge", type: "string", validation: (r) => r.required() }),
    defineField({ name: "conferenceHeading", type: "text", rows: 2, validation: (r) => r.required() }),
    defineField({ name: "conferenceText", type: "text", rows: 4, validation: (r) => r.required() }),
    defineField({
      name: "authorLinks",
      type: "array",
      of: [
        {
          type: "object",
          name: "authorLink",
          fields: [
            defineField({ name: "kicker", type: "string", validation: (r) => r.required() }),
            defineField({ name: "heading", type: "string", validation: (r) => r.required() }),
            defineField({ name: "cta", type: "string", validation: (r) => r.required() }),
            defineField({ name: "href", type: "string", validation: (r) => r.required() }),
            defineField({ name: "external", type: "boolean", initialValue: false }),
          ],
          preview: { select: { title: "heading", subtitle: "kicker" } },
        },
      ],
      description: "Exactly 3 — `.authorLinks` is a 3-column grid.",
      validation: (rule) => rule.length(3),
    }),
  ],
  preview: { prepare: () => ({ title: "Home page" }) },
});

export const aboutPage = defineType({
  name: "aboutPage",
  title: "About page",
  type: "document",
  fields: [
    seoField,
    eyebrow(),
    defineField({ name: "heading", type: "text", rows: 2, validation: (r) => r.required() }),
    defineField({ name: "intro", type: "text", rows: 3, validation: (r) => r.required() }),
    defineField({ name: "narrativeEyebrow", type: "string", validation: (r) => r.required() }),
    defineField({ name: "narrativeHeading", type: "text", rows: 2, validation: (r) => r.required() }),
    defineField({
      name: "narrativeParagraphs",
      type: "array",
      of: [{ type: "text" }],
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: "missionPanel",
      type: "array",
      of: [
        {
          type: "object",
          name: "panelItem",
          fields: [
            defineField({ name: "eyebrow", type: "string", validation: (r) => r.required() }),
            defineField({ name: "heading", type: "text", rows: 3, validation: (r) => r.required() }),
          ],
          preview: { select: { title: "eyebrow" } },
        },
      ],
      description: "Exactly 2 — `.missionPanel` is a 2-column split.",
      validation: (rule) => rule.length(2),
    }),
    defineField({ name: "publishListHeading", type: "text", rows: 2, validation: (r) => r.required() }),
    defineField({
      name: "publishList",
      type: "array",
      of: [{ type: "string" }],
      validation: (rule) => rule.required().min(1),
    }),
    defineField({ name: "partnersHeading", type: "text", rows: 2, validation: (r) => r.required() }),
    defineField({ name: "partnersText", type: "text", rows: 4, validation: (r) => r.required() }),
    defineField({
      name: "partnersActions",
      type: "array",
      of: [{ type: "ctaButton" }],
      validation: (rule) => rule.length(2),
    }),
  ],
  preview: { prepare: () => ({ title: "About page" }) },
});

export const advisoryBoardPage = defineType({
  name: "advisoryBoardPage",
  title: "Advisory Board page",
  type: "document",
  fields: [
    seoField,
    eyebrow(),
    defineField({ name: "heading", type: "string", validation: (r) => r.required() }),
    defineField({ name: "intro", type: "text", rows: 3, validation: (r) => r.required() }),
    defineField({
      name: "members",
      type: "array",
      of: [{ type: "boardMember" }],
      description:
        "`.boardGrid` is a 3-column grid; a count that is not a multiple of 3 leaves a ragged last row (currently 11, which is intentional).",
      validation: (rule) => rule.required().min(1),
    }),
    defineField({ name: "roleEyebrow", type: "string", validation: (r) => r.required() }),
    defineField({ name: "roleHeading", type: "text", rows: 2, validation: (r) => r.required() }),
    defineField({
      name: "roleParagraphs",
      type: "array",
      of: [{ type: "text" }],
      validation: (rule) => rule.required().min(1),
    }),
  ],
  preview: { prepare: () => ({ title: "Advisory Board page" }) },
});

export const servicesPage = defineType({
  name: "servicesPage",
  title: "Services page",
  type: "document",
  fields: [
    seoField,
    eyebrow(),
    defineField({ name: "heading", type: "text", rows: 2, validation: (r) => r.required() }),
    defineField({ name: "intro", type: "text", rows: 3, validation: (r) => r.required() }),
    defineField({
      name: "directory",
      type: "array",
      of: [{ type: "numberedLinkCard" }],
      description: "Exactly 6 — `.serviceDirectory` is a 3-column grid.",
      validation: (rule) => rule.length(6),
    }),
    defineField({ name: "contactEyebrow", type: "string", validation: (r) => r.required() }),
    defineField({ name: "contactHeading", type: "string", validation: (r) => r.required() }),
    defineField({ name: "contactText", type: "text", rows: 3, validation: (r) => r.required() }),
  ],
  preview: { prepare: () => ({ title: "Services page" }) },
});

export const languageEditingPage = defineType({
  name: "languageEditingPage",
  title: "Language Editing page",
  type: "document",
  fields: [
    seoField,
    eyebrow(),
    defineField({ name: "heading", type: "text", rows: 2, validation: (r) => r.required() }),
    defineField({ name: "intro", type: "text", rows: 3, validation: (r) => r.required() }),
    defineField({ name: "heroCtaLabel", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "services",
      type: "array",
      of: [{ type: "numberedCard" }],
      description: "Exactly 6 — `.editingGrid` is a 3-column grid.",
      validation: (rule) => rule.length(6),
    }),
    defineField({ name: "stepsHeading", type: "text", rows: 2, validation: (r) => r.required() }),
    defineField({
      name: "steps",
      type: "array",
      of: [
        {
          type: "object",
          name: "step",
          fields: [
            defineField({ name: "number", type: "string", validation: (r) => r.required() }),
            defineField({ name: "title", type: "string", validation: (r) => r.required() }),
            defineField({ name: "text", type: "text", rows: 2, validation: (r) => r.required() }),
          ],
          preview: { select: { title: "title", subtitle: "number" } },
        },
      ],
      description: "Exactly 3 submission steps.",
      validation: (rule) => rule.length(3),
    }),
    defineField({
      name: "supportBand",
      type: "array",
      of: [
        {
          type: "object",
          name: "supportItem",
          fields: [
            defineField({ name: "eyebrow", type: "string", validation: (r) => r.required() }),
            defineField({ name: "heading", type: "string", validation: (r) => r.required() }),
            defineField({ name: "text", type: "text", rows: 3, validation: (r) => r.required() }),
          ],
          preview: { select: { title: "heading" } },
        },
      ],
      description: "Exactly 2 — `.supportBand` is a 2-column split.",
      validation: (rule) => rule.length(2),
    }),
    defineField({ name: "contactHeading", type: "string", validation: (r) => r.required() }),
    defineField({ name: "contactText", type: "text", rows: 2, validation: (r) => r.required() }),
  ],
  preview: { prepare: () => ({ title: "Language Editing page" }) },
});

export const institutionalPublicationsPage = defineType({
  name: "institutionalPublicationsPage",
  title: "Institutional Publications page",
  type: "document",
  fields: [
    seoField,
    eyebrow(),
    defineField({ name: "heading", type: "text", rows: 2, validation: (r) => r.required() }),
    defineField({ name: "intro", type: "text", rows: 3, validation: (r) => r.required() }),
    defineField({
      name: "publications",
      type: "array",
      of: [{ type: "numberedCard" }],
      description: "Exactly 4 — `.institutionalGrid` is a 2-column grid.",
      validation: (rule) => rule.length(4),
    }),
    defineField({ name: "supportEyebrow", type: "string", validation: (r) => r.required() }),
    defineField({ name: "supportHeading", type: "text", rows: 2, validation: (r) => r.required() }),
    defineField({
      name: "supportParagraphs",
      type: "array",
      of: [{ type: "text" }],
      validation: (rule) => rule.required().min(1),
    }),
    defineField({ name: "contactHeading", type: "string", validation: (r) => r.required() }),
    defineField({ name: "contactText", type: "text", rows: 3, validation: (r) => r.required() }),
  ],
  preview: { prepare: () => ({ title: "Institutional Publications page" }) },
});

export const journalsDirectoryPage = defineType({
  name: "journalsDirectoryPage",
  title: "South African Journals page",
  type: "document",
  fields: [
    seoField,
    eyebrow(),
    defineField({ name: "heading", type: "string", validation: (r) => r.required() }),
    defineField({ name: "intro", type: "text", rows: 3, validation: (r) => r.required() }),
    defineField({
      name: "journals",
      type: "array",
      of: [{ type: "journal" }],
      description: "Exactly 4 — `.journalGrid` is a 2x2 grid with nth-child borders.",
      validation: (rule) => rule.length(4),
    }),
    defineField({ name: "noteHeading", type: "string", validation: (r) => r.required() }),
    defineField({ name: "noteText", type: "text", rows: 3, validation: (r) => r.required() }),
    defineField({ name: "noteCtaLabel", type: "string", validation: (r) => r.required() }),
    defineField({ name: "noteCtaHref", type: "url", validation: (r) => r.required() }),
  ],
  preview: { prepare: () => ({ title: "South African Journals page" }) },
});

export const conferencePage = defineType({
  name: "conferencePage",
  title: "Conference record page",
  type: "document",
  fields: [
    seoField,
    eyebrow(),
    defineField({ name: "heading", type: "text", rows: 3, validation: (r) => r.required() }),
    defineField({
      name: "facts",
      type: "array",
      of: [
        {
          type: "object",
          name: "fact",
          fields: [
            defineField({ name: "label", type: "string", validation: (r) => r.required() }),
            defineField({ name: "value", type: "string", validation: (r) => r.required() }),
          ],
          preview: { select: { title: "value", subtitle: "label" } },
        },
      ],
      description: "Exactly 3 — `.recordFacts` is a 3-up row.",
      validation: (rule) => rule.length(3),
    }),
    defineField({ name: "introEyebrow", type: "string", validation: (r) => r.required() }),
    defineField({ name: "introHeading", type: "text", rows: 2, validation: (r) => r.required() }),
    defineField({
      name: "introParagraphs",
      type: "array",
      of: [{ type: "text" }],
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: "themes",
      type: "array",
      of: [
        {
          type: "object",
          name: "theme",
          fields: [
            defineField({ name: "number", type: "string", validation: (r) => r.required() }),
            defineField({ name: "heading", type: "text", rows: 2, validation: (r) => r.required() }),
          ],
          preview: { select: { title: "heading", subtitle: "number" } },
        },
      ],
      description: "Exactly 2 — `.themes` is a 2-column split.",
      validation: (rule) => rule.length(2),
    }),
    defineField({
      name: "topics",
      type: "array",
      of: [{ type: "string" }],
      description:
        "`.topicGrid` is a 3-column grid — keep the count a multiple of 3 so the row borders stay clean (currently 24).",
      validation: (rule) =>
        rule.required().custom((topics) =>
          !topics || topics.length % 3 === 0
            ? true
            : "Use a multiple of 3 so the topic grid borders line up.",
        ),
    }),
    defineField({
      name: "calendar",
      type: "array",
      of: [
        {
          type: "object",
          name: "calendarRow",
          fields: [
            defineField({ name: "date", type: "string", validation: (r) => r.required() }),
            defineField({ name: "event", type: "string", validation: (r) => r.required() }),
          ],
          preview: { select: { title: "event", subtitle: "date" } },
        },
      ],
      validation: (rule) => rule.required().min(1),
    }),
    defineField({ name: "futureEyebrow", type: "string", validation: (r) => r.required() }),
    defineField({ name: "futureHeading", type: "string", validation: (r) => r.required() }),
    defineField({ name: "futureText", type: "text", rows: 3, validation: (r) => r.required() }),
    defineField({ name: "futureCtaLabel", type: "string", validation: (r) => r.required() }),
  ],
  preview: { prepare: () => ({ title: "Conference record page" }) },
});

export const documentSchemas = [
  siteSettings,
  homePage,
  aboutPage,
  advisoryBoardPage,
  servicesPage,
  languageEditingPage,
  institutionalPublicationsPage,
  journalsDirectoryPage,
  conferencePage,
];

/**
 * Singletons — one document each, surfaced as fixed items in the Studio structure.
 * Widened to `string[]`: the inferred literal union would reject the arbitrary
 * `schemaType` strings that Sanity's template/action callbacks pass in.
 */
export const SINGLETON_TYPES: string[] = documentSchemas.map(
  (schema) => schema.name,
);
