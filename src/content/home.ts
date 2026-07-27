import { EXTERNAL } from "./site";

/**
 * Home page content.
 *
 * `HomeContent` mirrors the shape returned by `homePageQuery` exactly, and
 * `HOME_FALLBACK` holds the legacy copy transcribed verbatim. When Sanity is
 * unconfigured or unreachable, the fallback renders and output is byte-identical to
 * the legacy HTML — that is what keeps the §3.4 DOM-parity gate green.
 *
 * Fixed chrome labels that an editor should never change (button captions, "Learn
 * more →", section eyebrows tied to anchor ids) stay in HOME_STATIC below rather than
 * becoming CMS fields.
 */

export type PlatformCard = {
  heading: string;
  text: string;
  href: string;
  external: boolean;
  cta: string;
  variant: "blue" | "navy" | "burgundy";
};

export type NumberedCard = { number: string; heading: string; text: string };

export type NumberedLinkCard = NumberedCard & { href: string; external: boolean };

export type HomeContent = {
  heroEyebrow: string;
  heroHeading: string;
  heroText: string;
  platforms: PlatformCard[];
  aboutEyebrow: string;
  aboutHeading: string;
  aboutName: string;
  aboutParagraphs: string[];
  aboutScope: NumberedCard[];
  missionVision: { eyebrow: string; heading: string }[];
  serviceCards: NumberedLinkCard[];
  conferenceBadge: string;
  conferenceHeading: string;
  conferenceText: string;
  authorLinks: {
    kicker: string;
    heading: string;
    cta: string;
    href: string;
    external: boolean;
  }[];
};

export const HOME_FALLBACK: HomeContent = {
  heroEyebrow: "Independent · Peer-reviewed · Open access",
  heroHeading: "Publishing research that moves knowledge forward.",
  heroText:
    "ERRCD Forum publishes open-access journals, academic books and conference proceedings for researchers, educators and institutions worldwide.",

  platforms: [
    {
      variant: "blue",
      href: EXTERNAL.usJournals,
      external: true,
      heading: "U.S.-based Journals",
      text: "Explore ERRCD journals published through our United States platform.",
      cta: "Visit platform",
    },
    {
      variant: "navy",
      href: "/south-african-journals",
      external: false,
      heading: "South African-based Journals",
      text: "View the four ERRCD journals hosted on the South African platform.",
      cta: "View journals",
    },
    {
      variant: "burgundy",
      href: EXTERNAL.books,
      external: true,
      heading: "Our Books",
      text: "Discover open-access books, edited volumes, monographs and proceedings.",
      cta: "Visit platform",
    },
    {
      variant: "blue",
      href: EXTERNAL.legacyBooks,
      external: true,
      heading: "Legacy Book Platform",
      text: "Browse books and proceedings published on our former platform.",
      cta: "Visit platform",
    },
  ],

  aboutEyebrow: "About ERRCD Forum",
  aboutHeading:
    "An independent academic publishing house for ideas without boundaries.",
  aboutName: "Education Research and Rural Community Development Forum",
  aboutParagraphs: [
    "ERRCD Forum is a premier, independent and privately owned academic publishing house founded through the collective vision and experience of scholars, editors and researchers. We provide a professional home for peer-reviewed journals, scholarly books, monographs, edited collections, conference proceedings, seminar books, workshop publications and other academic works.",
    "Our publishing programme is multidisciplinary and international. It welcomes significant scholarship across education, the humanities and social sciences, business and management, law and public policy, health sciences, science, engineering and technology, as well as research that crosses disciplinary boundaries.",
    "Our name reflects a founding commitment to knowledge in the service of development and inclusion. That commitment continues to guide our work, while our publishing programme remains open to authors, institutions, disciplines and perspectives from every part of the world.",
  ],

  aboutScope: [
    {
      number: "01",
      heading: "Editorial quality",
      text: "Rigorous peer review, responsible editorial practice and professional production support credible scholarly communication.",
    },
    {
      number: "02",
      heading: "Open knowledge",
      text: "We promote broad, barrier-free access so that significant research can reach scholars, practitioners and communities worldwide.",
    },
    {
      number: "03",
      heading: "Publishing breadth",
      text: "Our programme brings together journals, books, proceedings and specialist academic publications across fields and formats.",
    },
    {
      number: "04",
      heading: "Lasting scholarship",
      text: "Persistent identification, discoverability and appropriate digital-preservation practices support long-term scholarly access.",
    },
  ],

  missionVision: [
    {
      eyebrow: "Our mission",
      heading:
        "To advance global knowledge through ethical, accessible and high-quality academic publishing.",
    },
    {
      eyebrow: "Our vision",
      heading:
        "To become a leading independent scholarly publisher recognised for excellence, integrity, accessibility and research impact.",
    },
  ],

  serviceCards: [
    {
      number: "01",
      href: "/#journals",
      external: false,
      heading: "Academic journals",
      text: "Rigorous, peer-reviewed periodicals supporting interdisciplinary research and informed debate.",
    },
    {
      number: "02",
      href: EXTERNAL.books,
      external: true,
      heading: "Books & monographs",
      text: "Open-access scholarly books, edited collections and research monographs for worldwide readership.",
    },
    {
      number: "03",
      href: "/#conference",
      external: false,
      heading: "Conference proceedings",
      text: "Professional publication and dissemination of conference scholarship for institutions and associations.",
    },
    {
      number: "04",
      href: "/services/institutional-publications",
      external: false,
      heading: "Seminar books",
      text: "Curated publications that preserve invited papers, lectures and scholarly contributions from academic seminars.",
    },
    {
      number: "05",
      href: "/services/institutional-publications",
      external: false,
      heading: "Workshop publications",
      text: "Edited workshop reports, training materials, manuals and thematic collections prepared for lasting use.",
    },
    {
      number: "06",
      href: "/services/language-editing",
      external: false,
      heading: "Author services",
      text: "Language editing, proofreading, formatting and publication-readiness support delivered by academic specialists.",
    },
  ],

  conferenceBadge: "Past conference · 2022",
  conferenceHeading:
    "International Conference of New Perspectives in Education and Social Sciences",
  conferenceText:
    "INPESS 2022 was jointly organised by the OpenED Network and ERRCD Forum as a fully virtual international meeting on 23–24 November 2022. It brought together researchers, practitioners and graduate students to discuss new perspectives in education and the social sciences.",

  authorLinks: [
    {
      href: "/south-african-journals",
      external: false,
      kicker: "Journal submissions",
      heading: "South African-based Journals",
      cta: "View four journals →",
    },
    {
      href: EXTERNAL.usJournals,
      external: true,
      kicker: "Journal submissions",
      heading: "U.S.-based Journals",
      cta: "Visit platform ↗",
    },
    {
      href: EXTERNAL.books,
      external: true,
      kicker: "Book publishing",
      heading: "Books & Proceedings",
      cta: "Visit platform ↗",
    },
  ],
};

/** Fixed chrome — deliberately NOT editable, since these are tied to anchors/layout. */
export const HOME_STATIC = {
  heroActions: [
    { href: "#journals", label: "Explore publications", variant: "primary" },
    { href: "#authors", label: "Publish with ERRCD", variant: "secondary" },
  ],
  aboutActions: [
    { href: "/about", label: "Read our full story →" },
    { href: "/about/advisory-board", label: "Meet the Advisory Board →" },
  ],
  offeringsEyebrow: "What we publish and support",
  offeringsHeading: "Scholarly publishing with purpose",
  offeringsLink: { href: "/services", label: "View all services →" },
  serviceCardCta: "Learn more →",
  conferenceEyebrow: "Conferences",
  conferenceMeta: [
    { label: "Format", value: "Virtual conference" },
    { label: "Publication", value: "Full papers considered for proceedings" },
  ],
  conferenceLink: {
    href: "/conference/inpess-2022",
    label: "View complete conference record →",
  },
  authorCtaEyebrow: "For authors and editors",
  authorCtaHeading: "Bring your next scholarly work to a wider audience.",
  authorCtaText:
    "Choose the appropriate publishing destination for your journal article, book proposal, proceedings or other scholarly publication.",
  contactEyebrow: "Contact ERRCD Forum",
  contactHeading: "Publishing across two locations, serving authors worldwide.",
} as const;
