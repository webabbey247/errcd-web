import { stegaClean } from "next-sanity";
import { EMAILS, EXTERNAL, OFFICES, SITE } from "@/content/site";
import { SITE_URL } from "@/lib/seo";

/**
 * Renders a JSON-LD block.
 *
 * `stegaClean` is applied to the whole payload because some schemas (Advisory Board
 * Person entries, journal ItemList) are built from Sanity content, and in draft mode
 * stega injects invisible characters into every string. Those would end up inside the
 * structured data and break parsing for crawlers — the failure mode called out in
 * CHECKLIST.md §4.3. Cleaning here covers every caller rather than each page.
 */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(stegaClean(data)) }}
    />
  );
}

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${SITE_URL}/#organization`,
  name: SITE.name,
  legalName: SITE.legalName,
  url: SITE_URL,
  logo: `${SITE_URL}${SITE.logo.src}`,
  description:
    "ERRCD Forum publishes open-access journals, academic books, proceedings and other scholarly publications.",
  address: OFFICES.map((office) => ({
    "@type": "PostalAddress",
    ...office.postal,
  })),
  contactPoint: [
    {
      "@type": "ContactPoint",
      contactType: "General enquiries",
      email: EMAILS.info.address,
    },
    {
      "@type": "ContactPoint",
      contactType: "Publishing and book enquiries",
      email: EMAILS.publisher.address,
    },
    {
      "@type": "ContactPoint",
      contactType: "Language editing",
      email: EMAILS.langEditor.address,
    },
  ],
  sameAs: [EXTERNAL.usJournals, EXTERNAL.books, EXTERNAL.journalsPlatform],
};

export function breadcrumbSchema(
  trail: readonly { name: string; path: string }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: `${SITE_URL}${crumb.path}`,
    })),
  };
}
