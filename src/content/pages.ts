import { EMAILS, EXTERNAL, OFFICES, SITE } from "./site";
import {
  DESKTOP_NAV_PRIMARY,
  MOBILE_NAV,
  NAV_ABOUT_DROPDOWN,
} from "./site";
import type { NumberedCard, NumberedLinkCard } from "./home";

/**
 * Inner-page content: types matching each GROQ query's shape, plus the legacy copy as
 * the fallback used when Sanity is unconfigured.
 *
 * These live here rather than inside the page files so `scripts/seed.ts` can import
 * them without pulling React or server-only modules into a plain Node process —
 * and, more importantly, so the seeded dataset and the fallback can never diverge.
 */

export type AboutContent = {
  eyebrow: string;
  heading: string;
  intro: string;
  narrativeEyebrow: string;
  narrativeHeading: string;
  narrativeParagraphs: string[];
  missionPanel: { eyebrow: string; heading: string }[];
  publishListHeading: string;
  publishList: string[];
  partnersHeading: string;
  partnersText: string;
  partnersActions: { label: string; href: string; variant: string }[];
};

export const ABOUT_FALLBACK: AboutContent = {
  eyebrow: "About ERRCD Forum",
  heading: "Independent publishing for knowledge without boundaries.",
  intro:
    "ERRCD Forum is a private, independent academic publishing house committed to ethical scholarly publishing and the global dissemination of credible, peer-reviewed research.",
  narrativeEyebrow: "Who we are",
  narrativeHeading:
    "A professional home for authors, institutions and scholarly communities.",
  narrativeParagraphs: [
    "Established through the collective vision of experienced academics and publishing professionals, ERRCD Forum publishes open-access journals, scholarly books, edited volumes, monographs, proceedings and other academic outputs across disciplines.",
    "Our programme welcomes research across education, the humanities and social sciences, business and management, law and public policy, health sciences, science, engineering and technology, as well as interdisciplinary work. Our historic name—Education Research and Rural Community Development Forum—reflects our founding commitment to knowledge in the service of development and inclusion; it does not limit our disciplinary or geographical scope.",
    "Every publication is supported by structured editorial processes appropriate to its format, including screening, independent peer review, copyediting, production and final publication. We collaborate with qualified editors, reviewers and subject specialists to uphold international scholarly and ethical standards.",
  ],
  missionPanel: [
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
  publishListHeading: "One publishing house, multiple scholarly formats.",
  publishList: [
    "Peer-reviewed academic journals",
    "Scholarly books, edited volumes and monographs",
    "Conference proceedings",
    "Research reports and commissioned publications",
    "Seminar books and workshop publications",
    "Institutional and collaborative research outputs",
  ],
  partnersHeading: "Publishing partnerships built around quality and reach.",
  partnersText:
    "ERRCD Forum works with universities, research institutes, professional associations and conference organisers to publish proceedings, special issues, institutional outputs and commissioned academic works. These collaborations increase the visibility, impact and accessibility of scholarly contributions.",
  partnersActions: [
    {
      label: "Meet the Advisory Board →",
      href: "/about/advisory-board",
      variant: "primary",
    },
    { label: "Explore publishing services →", href: "/services", variant: "secondary" },
  ],
};

export type BoardContent = {
  eyebrow: string;
  heading: string;
  intro: string;
  members: { number: string; name: string; affiliation: string }[];
  roleEyebrow: string;
  roleHeading: string;
  roleParagraphs: string[];
};

export const BOARD_FALLBACK: BoardContent = {
  eyebrow: "About ERRCD Forum",
  heading: "Advisory Board",
  intro:
    "Distinguished scholars from diverse disciplines and international contexts provide strategic scholarly guidance and support ERRCD Forum’s commitment to editorial independence, integrity and quality.",
  members: [
    { number: "01", name: "Prof. Akin Lucas Ogunlade", affiliation: "AU Washington, United States" },
    { number: "02", name: "Prof. A. O. Tom Ashafa", affiliation: "University of the Free State, South Africa" },
    { number: "03", name: "Prof. Cias T. Tsotetsi", affiliation: "University of the Free State, South Africa" },
    { number: "04", name: "Prof. Haastrup T. Ekundayo", affiliation: "Ekiti State University, Nigeria" },
    { number: "05", name: "Prof. Bunmi Omodan", affiliation: "ARPS Institute, United States" },
    { number: "06", name: "Prof. Nontyatyambo Dastile", affiliation: "Walter Sisulu University, South Africa" },
    { number: "07", name: "Prof. Hieronimus Canggung Darong", affiliation: "Catholic University of St. Paul Ruteng, Indonesia" },
    { number: "08", name: "Prof. Olugbenga A. Ige", affiliation: "The National Research Institute, Papua New Guinea" },
    { number: "09", name: "Prof. Bekithemba Dube", affiliation: "Central University of Technology, South Africa" },
    { number: "10", name: "Prof. Chitja Twala", affiliation: "University of South Africa, South Africa" },
    { number: "11", name: "Prof. Emmanuel Olusola Adu", affiliation: "Ball State University, United States" },
  ],
  roleEyebrow: "Role of the board",
  roleHeading: "Independent guidance for a credible publishing programme.",
  roleParagraphs: [
    "Board members advise on the scholarly direction and development of the publishing programme; promote rigorous, fair and independent peer review; and safeguard publication ethics, academic integrity and editorial quality.",
    "They help identify qualified reviewers and subject specialists, support emerging areas of scholarship and strengthen the international visibility of the publishing house. Editorial assignments are made according to disciplinary expertise, institutional independence and conflict-of-interest safeguards.",
  ],
};

export type ServicesContent = {
  eyebrow: string;
  heading: string;
  intro: string;
  directory: NumberedLinkCard[];
  contactEyebrow: string;
  contactHeading: string;
  contactText: string;
};

export const SERVICES_FALLBACK: ServicesContent = {
  eyebrow: "Publishing and author services",
  heading: "Professional support across the scholarly publishing journey.",
  intro:
    "ERRCD Forum supports individual authors, editors, institutions, associations and conference organisers with publishing, editorial and production services appropriate to each project.",
  directory: [
    {
      number: "01",
      href: "/#journals",
      external: false,
      heading: "Journal publishing",
      text: "Peer-reviewed, open-access journal publishing supported by editorial screening, review and production workflows.",
    },
    {
      number: "02",
      href: EXTERNAL.books,
      external: true,
      heading: "Books and monographs",
      text: "Publishing for scholarly books, edited collections, monographs and open-access proceedings.",
    },
    {
      number: "03",
      href: "/services/institutional-publications",
      external: false,
      heading: "Proceedings and special publications",
      text: "Publication support for conferences, seminars, workshops, associations and institutional research programmes.",
    },
    {
      number: "04",
      href: "/services/language-editing",
      external: false,
      heading: "Language editing",
      text: "Academic language editing, proofreading, copyediting, reference alignment and publication-readiness support.",
    },
    {
      number: "05",
      href: "/services/language-editing#production",
      external: false,
      heading: "Formatting and production",
      text: "Manuscript formatting, interior layout, typesetting, cover coordination and preparation of publication files.",
    },
    {
      number: "06",
      href: "/services/language-editing#publication-support",
      external: false,
      heading: "Metadata and dissemination",
      text: "Metadata preparation, DOI and ISBN coordination where applicable, online hosting and discoverability support.",
    },
  ],
  contactEyebrow: "Discuss a project",
  contactHeading: "Not sure which service you need?",
  contactText:
    "Send a short description of your manuscript, publication or institutional project. We will direct it to the appropriate publishing or editorial pathway.",
};

export type LanguageEditingContent = {
  eyebrow: string;
  heading: string;
  intro: string;
  heroCtaLabel: string;
  services: NumberedCard[];
  stepsHeading: string;
  steps: { number: string; title: string; text: string }[];
  supportBand: { eyebrow: string; heading: string; text: string }[];
  contactHeading: string;
  contactText: string;
};

export const LANGUAGE_EDITING_FALLBACK: LanguageEditingContent = {
  eyebrow: "ERRCDF Language Editing Services",
  heading: "Clearer academic writing, carefully prepared for its intended audience.",
  intro:
    "Professional academic language support for journal articles, book chapters, theses, dissertations, reports, proposals and other scholarly manuscripts.",
  heroCtaLabel: "Submit or request a quotation →",
  services: [
    {
      number: "01",
      heading: "Language editing",
      text: "Improvement of grammar, syntax, clarity, academic tone and readability while respecting the author’s intended meaning and disciplinary voice.",
    },
    {
      number: "02",
      heading: "Copyediting",
      text: "Detailed correction of consistency, punctuation, terminology, headings, tables, captions and style requirements.",
    },
    {
      number: "03",
      heading: "Proofreading",
      text: "Final-stage review for typographical, grammatical and formatting errors before submission or publication.",
    },
    {
      number: "04",
      heading: "Reference alignment",
      text: "Checking correspondence between in-text citations and reference lists, plus alignment with a required referencing style.",
    },
    {
      number: "05",
      heading: "Academic formatting",
      text: "Formatting of headings, tables, figures, references and manuscript structure to meet journal, publisher or institutional requirements.",
    },
    {
      number: "06",
      heading: "Publication readiness",
      text: "A final editorial assessment identifying language, presentation and submission-readiness issues that may affect evaluation.",
    },
  ],
  stepsHeading: "Send your work directly to the language-editing team.",
  steps: [
    {
      number: "01",
      title: "Prepare your files",
      text: "Attach the editable manuscript and any relevant journal, publisher or institutional guidelines.",
    },
    {
      number: "02",
      title: "Describe your needs",
      text: "State the service required, referencing style, intended destination and preferred completion date.",
    },
    // Step 03 embeds a mailto link mid-sentence; the page renders it as a special case.
    { number: "03", title: "Email the team", text: "" },
  ],
  supportBand: [
    {
      eyebrow: "Related author support",
      heading: "Formatting and production assistance",
      text: "Projects may also require manuscript formatting, typesetting, interior-layout preparation, cover coordination, figure and table preparation, or conversion into publication-ready files.",
    },
    {
      eyebrow: "Publication support",
      heading: "Metadata, identifiers and dissemination",
      text: "For publishing projects managed by ERRCD Forum, support may include metadata preparation, DOI and ISBN coordination where applicable, open-access hosting, digital preservation and dissemination.",
    },
  ],
  contactHeading: "Ready to submit your manuscript?",
  contactText:
    "Email the editable file and your requirements to the dedicated service address.",
};

export type InstitutionalContent = {
  eyebrow: string;
  heading: string;
  intro: string;
  publications: NumberedCard[];
  supportEyebrow: string;
  supportHeading: string;
  supportParagraphs: string[];
  contactHeading: string;
  contactText: string;
};

export const INSTITUTIONAL_FALLBACK: InstitutionalContent = {
  eyebrow: "Institutional publishing",
  heading: "From scholarly event to lasting publication.",
  intro:
    "ERRCD Forum works with universities, research institutes, professional associations and event organisers to turn conferences, seminars, workshops and commissioned research into credible, accessible publications.",
  publications: [
    {
      number: "01",
      heading: "Conference proceedings",
      text: "Peer-reviewed or editorially reviewed collections that preserve and disseminate papers presented at academic conferences.",
    },
    {
      number: "02",
      heading: "Seminar books",
      text: "Curated volumes bringing together invited lectures, position papers, keynote contributions and seminar scholarship.",
    },
    {
      number: "03",
      heading: "Workshop publications",
      text: "Edited reports, manuals, training materials, working papers and thematic collections produced from workshops.",
    },
    {
      number: "04",
      heading: "Special and commissioned works",
      text: "Institutional research outputs, special issues, policy reports and publications developed for universities, associations or research programmes.",
    },
  ],
  supportEyebrow: "Project support",
  supportHeading: "A coordinated editorial and production pathway.",
  supportParagraphs: [
    "Depending on the project, support can include call and submission planning, editorial screening, reviewer coordination, language and copyediting, formatting, typesetting, cover and interior production, metadata preparation, identifiers, open-access hosting and dissemination.",
    "Each project is scoped according to its scholarly purpose, editorial requirements, schedule and expected outputs.",
  ],
  contactHeading: "Tell us about your planned publication.",
  contactText:
    "Include the project type, approximate number of contributions, proposed schedule and expected publication format.",
};

export type JournalsContent = {
  eyebrow: string;
  heading: string;
  intro: string;
  journals: {
    number: string;
    abbreviation: string;
    heading: string;
    text: string;
    href: string;
  }[];
  noteHeading: string;
  noteText: string;
  noteCtaLabel: string;
  noteCtaHref: string;
};

export const JOURNALS_FALLBACK: JournalsContent = {
  eyebrow: "ERRCD Journal Portfolio",
  heading: "South African-based Journals",
  intro:
    "Four peer-reviewed, open-access journals published by ERRCD Forum and hosted through the University of the Free State publications platform.",
  journals: [
    {
      number: "01",
      abbreviation: "IJER",
      href: "https://pubs.ufs.ac.za/index.php/ijer",
      heading: "Interdisciplinary Journal of Education Research",
      text: "Peer-reviewed interdisciplinary research across primary, secondary and higher education, with no geographical or methodological limitations.",
    },
    {
      number: "02",
      abbreviation: "IJRCS",
      href: "https://pubs.ufs.ac.za/index.php/ijrcs",
      heading: "Interdisciplinary Journal of Rural and Community Studies",
      text: "Research on rural development, community studies, public policy, sustainability, emancipation and self-reliance.",
    },
    {
      number: "03",
      abbreviation: "IJSS",
      href: "https://pubs.ufs.ac.za/index.php/ijss",
      heading: "Interdisciplinary Journal of Sociality Studies",
      text: "Empirical, conceptual and theoretical scholarship addressing social development, relationships, justice and human-centred innovation.",
    },
    {
      number: "04",
      abbreviation: "IJMS",
      href: "https://pubs.ufs.ac.za/index.php/ijms",
      heading: "Interdisciplinary Journal of Management Sciences",
      text: "Interdisciplinary management research connecting theory, practice, innovation and complex organisational challenges.",
    },
  ],
  noteHeading: "Ready to submit?",
  noteText:
    "Open the journal that best matches your manuscript, review its focus and author guidelines, and use its submission system.",
  noteCtaLabel: "Open journals platform ↗",
  noteCtaHref: EXTERNAL.journalsPlatform,
};

export type ConferenceContent = {
  eyebrow: string;
  heading: string;
  facts: { label: string; value: string }[];
  introEyebrow: string;
  introHeading: string;
  introParagraphs: string[];
  themes: { number: string; heading: string }[];
  topics: string[];
  calendar: { date: string; event: string }[];
  futureEyebrow: string;
  futureHeading: string;
  futureText: string;
  futureCtaLabel: string;
};

export const CONFERENCE_FALLBACK: ConferenceContent = {
  eyebrow: "Conference archive · 2022",
  heading:
    "International Conference of New Perspectives in Education and Social Sciences",
  facts: [
    { label: "Short title", value: "INPESS 2022" },
    { label: "Date", value: "23–24 November 2022" },
    { label: "Format", value: "Fully virtual" },
  ],
  introEyebrow: "About the conference",
  introHeading: "A meeting for international exchange and scholarly dialogue.",
  introParagraphs: [
    "INPESS 2022 was jointly organised by OpenED Network, Turkey, and the Education Research and Rural Community Development Forum, South Africa. It brought together researchers, experts, graduate students and practitioners from different countries to share ideas and discuss theoretical and practical issues in education and the social sciences.",
    "Participants submitted proposals through the conference system. Following acceptance for presentation, authors could upload full-text papers for consideration for publication in the conference proceedings book.",
  ],
  themes: [
    {
      number: "01",
      heading:
        "New challenges and perspectives in education in the post-COVID-19 world",
    },
    { number: "02", heading: "Rethinking social sciences in the post-COVID-19 world" },
  ],
  topics: [
    "Research methodology in educational and social sciences",
    "Social sciences and technology",
    "Education, culture and societies",
    "Ethical issues in education and social research",
    "Poverty, social inequalities and education",
    "Race and gender in education",
    "Democracy and human rights education",
    "Arts and humanity education",
    "Media literacy education",
    "Social sciences education",
    "Higher education studies",
    "Curriculum and instruction",
    "Educational psychology and counselling",
    "Educational administration, management and leadership",
    "Educational planning and policies",
    "Educational technology",
    "Environmental crises and education",
    "Health education",
    "Human capital development in education",
    "Indigenous knowledge education",
    "Language learning and teaching",
    "STEM education",
    "Measurement and evaluation in education",
    "Vocational and technical education",
  ],
  calendar: [
    { date: "15 September 2022", event: "Proposal submission deadline" },
    { date: "30 September 2022", event: "Early registration fee payment deadline" },
    { date: "30 October 2022", event: "Late registration fee payment deadline" },
    { date: "15 November 2022", event: "Listener registration deadline" },
    { date: "18 November 2022", event: "Full-text submission deadline" },
    { date: "23–24 November 2022", event: "Conference dates" },
  ],
  futureEyebrow: "Future conferences",
  futureHeading: "New conference details will be announced here.",
  futureText:
    "ERRCD Forum continues to support scholarly exchange through conferences, seminars and workshops. Future calls, dates and participation information will be published on this website.",
  futureCtaLabel: "Conference enquiry →",
};

/** siteSettings seed — mirrors the `siteSettings` document shape. */
export const SITE_SETTINGS_FALLBACK = {
  wordmarkStrong: SITE.wordmark.strong,
  wordmarkRest: SITE.wordmark.rest,
  tagline: SITE.tagline,
  footerBlurb: SITE.footerBlurb,
  copyright: SITE.copyright,
  desktopNavPrimary: DESKTOP_NAV_PRIMARY.map(({ label, href }) => ({ label, href })),
  aboutDropdown: NAV_ABOUT_DROPDOWN.map(({ label, href }) => ({ label, href })),
  // MOBILE_NAV is already the full flat list, Contact included.
  mobileNav: MOBILE_NAV.map(({ label, href }) => ({ label, href })),
  offices: OFFICES.map((office) => ({
    country: office.country,
    heading: office.heading,
    lines: [...office.lines],
    footerLines: [...office.footerLines],
  })),
  emailInfo: EMAILS.info.address,
  emailPublisher: EMAILS.publisher.address,
  emailLangEditor: EMAILS.langEditor.address,
};
