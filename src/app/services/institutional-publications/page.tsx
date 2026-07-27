import type { Metadata } from "next";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import {
  EditingGrid,
  InnerHero,
  ProseSection,
  ServiceContact,
} from "@/components/shared/inner";
import { JsonLd, breadcrumbSchema } from "@/components/seo/json-ld";
import { EMAILS } from "@/content/site";
import { buildPageMetadata, fetchContent } from "@/sanity/lib/content";
import { institutionalPublicationsPageQuery } from "@/sanity/lib/queries";
import { INSTITUTIONAL_FALLBACK, type InstitutionalContent } from "@/content/pages";

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata(
    "institutionalPublications",
    institutionalPublicationsPageQuery,
  );
}



export default async function InstitutionalPublicationsPage() {
  const content = await fetchContent<InstitutionalContent>(
    institutionalPublicationsPageQuery,
    INSTITUTIONAL_FALLBACK,
  );

  return (
    <main>
      <SiteHeader />

      <InnerHero
        eyebrow={content.eyebrow}
        heading={content.heading}
        text={content.intro}
      />

      <EditingGrid items={content.publications} modifier="institutionalGrid" />

      <ProseSection
        className="boardRole"
        eyebrow={content.supportEyebrow}
        heading={content.supportHeading}
        paragraphs={content.supportParagraphs}
      />

      <ServiceContact
        eyebrow="Institutional enquiries"
        heading={content.contactHeading}
        text={content.contactText}
        cta={{
          href: `mailto:${EMAILS.publisher.address}`,
          label: `${EMAILS.publisher.display} →`,
        }}
      />

      <SiteFooter />

      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Publishing and Author Services", path: "/services" },
          {
            name: "Institutional Publications",
            path: "/services/institutional-publications",
          },
        ])}
      />
    </main>
  );
}
