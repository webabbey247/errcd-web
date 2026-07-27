import type { Metadata } from "next";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { SmartLink } from "@/components/ui/smart-link";
import { JsonLd, breadcrumbSchema } from "@/components/seo/json-ld";
import { buildPageMetadata, fetchContent } from "@/sanity/lib/content";
import { journalsDirectoryPageQuery } from "@/sanity/lib/queries";
import { SITE_URL } from "@/lib/seo";
import { JOURNALS_FALLBACK, type JournalsContent } from "@/content/pages";

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata("southAfricanJournals", journalsDirectoryPageQuery);
}



export default async function SouthAfricanJournalsPage() {
  const content = await fetchContent<JournalsContent>(
    journalsDirectoryPageQuery,
    JOURNALS_FALLBACK,
  );

  const journalListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "South African-based Journals",
    url: `${SITE_URL}/south-african-journals`,
    itemListElement: content.journals.map((journal, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Periodical",
        name: journal.heading,
        alternateName: journal.abbreviation,
        url: journal.href,
        description: journal.text,
        publisher: { "@type": "Organization", name: "ERRCD Forum" },
      },
    })),
  };

  return (
    <main className="directoryPage">
      <SiteHeader />

      <section className="directoryHero">
        <p className="eyebrow">{content.eyebrow}</p>
        <h1>{content.heading}</h1>
        <p>{content.intro}</p>
      </section>

      <section className="journalGrid">
        {content.journals.map((journal) => (
          <SmartLink
            key={journal.abbreviation}
            href={journal.href}
            external
            className="journalCard"
          >
            <div>
              <span>{journal.number}</span>
              <b>{journal.abbreviation}</b>
            </div>
            <h2>{journal.heading}</h2>
            <p>{journal.text}</p>
            <strong>Visit journal ↗</strong>
          </SmartLink>
        ))}
      </section>

      <section className="directoryNote">
        <h2>{content.noteHeading}</h2>
        <p>{content.noteText}</p>
        <SmartLink className="button primary" href={content.noteCtaHref} external>
          {content.noteCtaLabel}
        </SmartLink>
      </section>

      <SiteFooter />

      <JsonLd data={journalListSchema} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "South African-based Journals", path: "/south-african-journals" },
        ])}
      />
    </main>
  );
}
