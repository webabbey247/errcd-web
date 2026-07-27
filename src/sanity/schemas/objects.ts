import { defineField, defineType } from "sanity";

/**
 * Reusable objects. Note what is deliberately ABSENT: any colour, hex, spacing or
 * font field. Design tokens live in globals.css only (CHECKLIST.md §4.2) — exposing
 * them to editors is how "exact color tokens" gets lost. Where a card has a visual
 * variant it is a constrained enum mapping to an existing CSS class, never a value.
 */

export const seo = defineType({
  name: "seo",
  title: "SEO",
  type: "object",
  options: { collapsible: true, collapsed: true },
  fields: [
    defineField({
      name: "title",
      title: "Meta title",
      type: "string",
      description:
        "Leave blank to keep the current indexed title. Changing it may affect rankings.",
      validation: (rule) => rule.max(70).warning("Titles over ~70 chars get truncated."),
    }),
    defineField({
      name: "description",
      title: "Meta description",
      type: "text",
      rows: 3,
      validation: (rule) =>
        rule.max(160).warning("Descriptions over ~160 chars get truncated."),
    }),
    defineField({
      name: "ogImage",
      title: "Social share image",
      type: "image",
      description:
        "Optional. Falls back to the generated brand card if left empty (1200x630).",
    }),
    defineField({
      name: "noIndex",
      title: "Hide from search engines",
      type: "boolean",
      initialValue: false,
    }),
  ],
});

export const ctaButton = defineType({
  name: "ctaButton",
  title: "Button",
  type: "object",
  fields: [
    defineField({
      name: "label",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "href",
      title: "Link",
      type: "string",
      description: "Internal path (/about), anchor (#authors), URL, or mailto:",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "variant",
      type: "string",
      options: { list: ["primary", "secondary"], layout: "radio" },
      initialValue: "primary",
      validation: (rule) => rule.required(),
    }),
  ],
});

export const navLink = defineType({
  name: "navLink",
  title: "Navigation link",
  type: "object",
  fields: [
    defineField({ name: "label", type: "string", validation: (r) => r.required() }),
    defineField({ name: "href", type: "string", validation: (r) => r.required() }),
  ],
  preview: { select: { title: "label", subtitle: "href" } },
});

/** Numbered editorial card — `01 / Heading / body`. Used by most grids on the site. */
export const numberedCard = defineType({
  name: "numberedCard",
  title: "Numbered card",
  type: "object",
  fields: [
    defineField({
      name: "number",
      type: "string",
      description: 'Two digits, e.g. "01". Rendered verbatim.',
      validation: (rule) =>
        rule.required().regex(/^\d{2}$/, { name: "two digits" }),
    }),
    defineField({ name: "heading", type: "string", validation: (r) => r.required() }),
    defineField({ name: "text", type: "text", rows: 3, validation: (r) => r.required() }),
  ],
  preview: { select: { title: "heading", subtitle: "number" } },
});

/** Numbered card that is also a link (service directory, service grid). */
export const numberedLinkCard = defineType({
  name: "numberedLinkCard",
  title: "Numbered link card",
  type: "object",
  fields: [
    defineField({
      name: "number",
      type: "string",
      validation: (rule) => rule.required().regex(/^\d{2}$/, { name: "two digits" }),
    }),
    defineField({ name: "heading", type: "string", validation: (r) => r.required() }),
    defineField({ name: "text", type: "text", rows: 3, validation: (r) => r.required() }),
    defineField({ name: "href", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "external",
      type: "boolean",
      description: "Opens in a new tab with rel=noopener noreferrer.",
      initialValue: false,
    }),
  ],
  preview: { select: { title: "heading", subtitle: "number" } },
});

export const platformCard = defineType({
  name: "platformCard",
  title: "Platform card",
  type: "object",
  fields: [
    defineField({ name: "heading", type: "string", validation: (r) => r.required() }),
    defineField({ name: "text", type: "text", rows: 2, validation: (r) => r.required() }),
    defineField({ name: "href", type: "string", validation: (r) => r.required() }),
    defineField({ name: "external", type: "boolean", initialValue: false }),
    defineField({ name: "cta", title: "Link text", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "variant",
      title: "Accent",
      type: "string",
      description:
        "Maps to an existing CSS class — controls the hover accent only, not a colour value.",
      options: { list: ["blue", "navy", "burgundy"], layout: "radio" },
      validation: (rule) => rule.required(),
    }),
  ],
  preview: { select: { title: "heading", subtitle: "variant" } },
});

export const journal = defineType({
  name: "journal",
  title: "Journal",
  type: "object",
  fields: [
    defineField({
      name: "number",
      type: "string",
      validation: (rule) => rule.required().regex(/^\d{2}$/, { name: "two digits" }),
    }),
    defineField({
      name: "abbreviation",
      type: "string",
      description: 'e.g. "IJER"',
      validation: (r) => r.required(),
    }),
    defineField({ name: "heading", title: "Full title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "text", type: "text", rows: 3, validation: (r) => r.required() }),
    defineField({ name: "href", title: "Journal URL", type: "url", validation: (r) => r.required() }),
  ],
  preview: { select: { title: "heading", subtitle: "abbreviation" } },
});

export const boardMember = defineType({
  name: "boardMember",
  title: "Board member",
  type: "object",
  fields: [
    defineField({
      name: "number",
      type: "string",
      validation: (rule) => rule.required().regex(/^\d{2}$/, { name: "two digits" }),
    }),
    defineField({ name: "name", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "affiliation",
      type: "string",
      description: "Institution and country, e.g. “University of the Free State, South Africa”",
      validation: (r) => r.required(),
    }),
  ],
  preview: { select: { title: "name", subtitle: "affiliation" } },
});

export const office = defineType({
  name: "office",
  title: "Office",
  type: "object",
  fields: [
    defineField({ name: "country", type: "string", validation: (r) => r.required() }),
    defineField({ name: "heading", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "lines",
      title: "Address lines (contact band)",
      type: "array",
      of: [{ type: "string" }],
      validation: (r) => r.required().min(1),
    }),
    defineField({
      name: "footerLines",
      title: "Address lines (footer, more compact)",
      type: "array",
      of: [{ type: "string" }],
      validation: (r) => r.required().min(1),
    }),
  ],
  preview: { select: { title: "country", subtitle: "heading" } },
});

export const objectSchemas = [
  seo,
  ctaButton,
  navLink,
  numberedCard,
  numberedLinkCard,
  platformCard,
  journal,
  boardMember,
  office,
];
