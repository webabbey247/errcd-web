import type { Metadata } from "next";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { InnerHero, ProseSection } from "@/components/shared/inner";
import { JsonLd, breadcrumbSchema } from "@/components/seo/json-ld";
import { buildPageMetadata, fetchContent } from "@/sanity/lib/content";
import { aboutPageQuery } from "@/sanity/lib/queries";
import { ABOUT_FALLBACK, type AboutContent } from "@/content/pages";

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata("about", aboutPageQuery);
}



export default async function AboutPage() {
  const content = await fetchContent<AboutContent>(aboutPageQuery, ABOUT_FALLBACK);

  return (
    <main>
      <SiteHeader />

      <InnerHero
        eyebrow={content.eyebrow}
        heading={content.heading}
        text={content.intro}
      />

      <ProseSection
        className="aboutNarrative"
        eyebrow={content.narrativeEyebrow}
        heading={content.narrativeHeading}
        paragraphs={content.narrativeParagraphs}
      />

      <section className="missionPanel">
        {content.missionPanel.map((item) => (
          <article key={item.eyebrow}>
            <p className="eyebrow">{item.eyebrow}</p>
            <h2>{item.heading}</h2>
          </article>
        ))}
      </section>

      <section className="publishList">
        <div>
          <p className="eyebrow">What we publish</p>
          <h2>{content.publishListHeading}</h2>
        </div>
        <div>
          {content.publishList.map((item) => (
            <p key={item}>
              {item}
              <span>→</span>
            </p>
          ))}
        </div>
      </section>

      <section className="aboutPartners">
        <p className="eyebrow">Institutional collaboration</p>
        <h2>{content.partnersHeading}</h2>
        <p>{content.partnersText}</p>
        <div className="actions">
          {content.partnersActions.map((action) => (
            <a
              key={action.href}
              className={`button ${action.variant}`}
              href={action.href}
            >
              {action.label}
            </a>
          ))}
        </div>
      </section>

      <SiteFooter />

      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "About ERRCD Forum", path: "/about" },
        ])}
      />
    </main>
  );
}
