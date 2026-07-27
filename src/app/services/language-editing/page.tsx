import type { Metadata } from "next";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { EditingGrid, InnerHero, ServiceContact } from "@/components/shared/inner";
import { JsonLd, breadcrumbSchema } from "@/components/seo/json-ld";
import { EMAILS } from "@/content/site";
import { buildPageMetadata, fetchContent } from "@/sanity/lib/content";
import { languageEditingPageQuery } from "@/sanity/lib/queries";
import { LANGUAGE_EDITING_FALLBACK, type LanguageEditingContent } from "@/content/pages";

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata("languageEditing", languageEditingPageQuery);
}



export default async function LanguageEditingPage() {
  const content = await fetchContent<LanguageEditingContent>(
    languageEditingPageQuery,
    LANGUAGE_EDITING_FALLBACK,
  );

  const [stepOne, stepTwo] = content.steps;

  return (
    <main>
      <SiteHeader />

      <InnerHero
        modifier="editingHero"
        eyebrow={content.eyebrow}
        heading={content.heading}
        text={content.intro}
        cta={{
          href: `mailto:${EMAILS.langEditor.address}?subject=Language%20editing%20enquiry`,
          label: content.heroCtaLabel,
        }}
      />

      <EditingGrid items={content.services} />

      <section className="submissionSteps">
        <div>
          <p className="eyebrow">How to request service</p>
          <h2>{content.stepsHeading}</h2>
        </div>
        <ol>
          <li>
            <span>{stepOne?.number}</span>
            <p>
              <b>{stepOne?.title}</b>
              {stepOne?.text}
            </p>
          </li>
          <li>
            <span>{stepTwo?.number}</span>
            <p>
              <b>{stepTwo?.title}</b>
              {stepTwo?.text}
            </p>
          </li>
          <li>
            <span>03</span>
            <p>
              <b>Email the team</b>Send the materials to{" "}
              <a href={`mailto:${EMAILS.langEditor.address}`}>
                {EMAILS.langEditor.display}
              </a>{" "}
              for assessment and a quotation.
            </p>
          </li>
        </ol>
      </section>

      <section className="supportBand" id="production">
        <div>
          <p className="eyebrow">{content.supportBand[0]?.eyebrow}</p>
          <h2>{content.supportBand[0]?.heading}</h2>
          <p>{content.supportBand[0]?.text}</p>
        </div>
        <div id="publication-support">
          <p className="eyebrow">{content.supportBand[1]?.eyebrow}</p>
          <h2>{content.supportBand[1]?.heading}</h2>
          <p>{content.supportBand[1]?.text}</p>
        </div>
      </section>

      <ServiceContact
        eyebrow="Language-editing enquiries"
        heading={content.contactHeading}
        text={content.contactText}
        cta={{
          href: `mailto:${EMAILS.langEditor.address}`,
          label: `${EMAILS.langEditor.display} →`,
        }}
      />

      <SiteFooter />

      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Publishing and Author Services", path: "/services" },
          { name: "Language Editing Services", path: "/services/language-editing" },
        ])}
      />
    </main>
  );
}
