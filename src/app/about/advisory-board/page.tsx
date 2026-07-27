import type { Metadata } from "next";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { InnerHero, ProseSection } from "@/components/shared/inner";
import { JsonLd, breadcrumbSchema } from "@/components/seo/json-ld";
import { buildPageMetadata, fetchContent } from "@/sanity/lib/content";
import { advisoryBoardPageQuery } from "@/sanity/lib/queries";
import { SITE_URL } from "@/lib/seo";
import { BOARD_FALLBACK, type BoardContent } from "@/content/pages";

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata("advisoryBoard", advisoryBoardPageQuery);
}



export default async function AdvisoryBoardPage() {
  const content = await fetchContent<BoardContent>(
    advisoryBoardPageQuery,
    BOARD_FALLBACK,
  );

  const boardSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "ERRCD Forum Advisory Board",
    url: `${SITE_URL}/about/advisory-board`,
    itemListElement: content.members.map((member, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Person",
        name: member.name,
        affiliation: { "@type": "Organization", name: member.affiliation },
      },
    })),
  };

  return (
    <main>
      <SiteHeader />

      <InnerHero
        modifier="boardHero"
        eyebrow={content.eyebrow}
        heading={content.heading}
        text={content.intro}
      />

      <section className="boardGrid" id="advisory-board">
        {content.members.map((member) => (
          <article key={member.number}>
            <span>{member.number}</span>
            <h2>{member.name}</h2>
            <p>{member.affiliation}</p>
          </article>
        ))}
      </section>

      <ProseSection
        className="boardRole"
        eyebrow={content.roleEyebrow}
        heading={content.roleHeading}
        paragraphs={content.roleParagraphs}
      />

      <SiteFooter />

      <JsonLd data={boardSchema} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "About ERRCD Forum", path: "/about" },
          { name: "Advisory Board", path: "/about/advisory-board" },
        ])}
      />
    </main>
  );
}
