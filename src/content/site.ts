/**
 * Site-wide content: brand, navigation, offices, enquiry addresses, footer.
 *
 * Every string here is transcribed verbatim from the legacy HTML. Shapes mirror the
 * planned Sanity `siteSettings` singleton (CHECKLIST.md §4.2) so the §4 migration
 * swaps the data source without touching a single component.
 */

export const SITE = {
  name: "ERRCD Forum",
  legalName: "Education Research and Rural Community Development Forum",
  tagline: "A premier academic publishing house",
  wordmark: { strong: "ERRCD", rest: " Forum" },
  footerBlurb:
    "Independent academic publishing for authors, institutions and readers worldwide.",
  copyright: "© 2026 ERRCD Forum. Open knowledge, responsibly published.",
  logo: { src: "/assets/errcd-logo.png", alt: "ERRCD Forum" },
} as const;

export type NavLink = {
  href: string;
  label: string;
  external?: boolean;
};

/** Desktop nav: 5 flat links, then the About dropdown, then Contact. */
export const DESKTOP_NAV_PRIMARY: readonly NavLink[] = [
  { href: "/#journals", label: "Journals" },
  { href: "/#books", label: "Books" },
  { href: "/#conference", label: "Conferences" },
  { href: "/#authors", label: "For Authors" },
  { href: "/services", label: "Services" },
];

export const NAV_ABOUT_DROPDOWN: readonly NavLink[] = [
  { href: "/about", label: "About ERRCD Forum" },
  { href: "/about#advisory-board", label: "Mission & Vision" },
  { href: "/about/advisory-board", label: "Advisory Board" },
];

export const NAV_CONTACT: NavLink = { href: "/#contact", label: "Contact" };

/** Mobile nav is a flat 8-item list — not the desktop tree. Order is from source. */
export const MOBILE_NAV: readonly NavLink[] = [
  { href: "/#journals", label: "Journals" },
  { href: "/#books", label: "Books" },
  { href: "/#conference", label: "Conferences" },
  { href: "/#authors", label: "For Authors" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About ERRCD Forum" },
  { href: "/about/advisory-board", label: "Advisory Board" },
  { href: "/#contact", label: "Contact" },
];

/** Home renders the submit CTA; all 7 inner pages render the back-to-home CTA. */
export const HEADER_CTA = {
  home: { href: "/#authors", label: "Submit your work ↗" },
  inner: { href: "/", label: "Back to home ←" },
} as const;

export const EMAILS = {
  info: { address: "info@errcd.com", display: "Info@errcd.com" },
  publisher: { address: "publisher@errcd.com", display: "Publisher@errcd.com" },
  langEditor: { address: "langeditor@errcd.com", display: "LangEditor@errcd.com" },
} as const;

export const OFFICES = [
  {
    country: "United States",
    heading: "United States office",
    lines: ["3333 Preston Rd, Suite 300", "Frisco, TX 75034", "United States"],
    footerLines: ["3333 Preston Rd, Suite 300", "Frisco, TX 75034, United States"],
    postal: {
      streetAddress: "3333 Preston Rd, Suite 300",
      addressLocality: "Frisco",
      addressRegion: "TX",
      postalCode: "75034",
      addressCountry: "US",
    },
  },
  {
    country: "South Africa",
    heading: "South Africa office",
    lines: ["6A Stuarts Street", "Harrismith 9880, Free State", "South Africa"],
    footerLines: ["6A Stuarts Street", "Harrismith 9880, Free State, South Africa"],
    postal: {
      streetAddress: "6A Stuarts Street",
      addressLocality: "Harrismith",
      addressRegion: "Free State",
      postalCode: "9880",
      addressCountry: "ZA",
    },
  },
] as const;

export const FOOTER_COLUMNS = [
  {
    heading: "Explore",
    links: [
      { href: "/#journals", label: "Journals" },
      { href: "/#books", label: "Books" },
      { href: "/#conference", label: "Conferences" },
    ],
  },
  {
    heading: "Publisher",
    links: [
      { href: "/about", label: "About" },
      { href: "/about/advisory-board", label: "Advisory Board" },
      { href: "/services", label: "Services" },
      { href: "/#contact", label: "Contact" },
    ],
  },
] as const;

/** External platforms — also used as `sameAs` in Organization JSON-LD (§5). */
export const EXTERNAL = {
  usJournals: "https://journals.errcd.com/",
  books: "https://books.errcd.com/index.php/books",
  legacyBooks: "https://pubs.ufs.ac.za/index.php/ijgs",
  journalsPlatform: "https://pubs.ufs.ac.za/",
} as const;
