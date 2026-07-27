import type { Metadata } from "next";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { JsonLd, breadcrumbSchema } from "@/components/seo/json-ld";
import { EMAILS } from "@/content/site";
import { buildPageMetadata, fetchContent } from "@/sanity/lib/content";
import { conferencePageQuery } from "@/sanity/lib/queries";
import { SITE_URL } from "@/lib/seo";
import { CONFERENCE_FALLBACK, type ConferenceContent } from "@/content/pages";

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata("inpess2022", conferencePageQuery);
}



const eventSchema = {
  "@context": "https://schema.org",
  "@type": "Event",
  name: "International Conference of New Perspectives in Education and Social Sciences",
  alternateName: "INPESS 2022",
  url: `${SITE_URL}/conference/inpess-2022`,
  startDate: "2022-11-23",
  endDate: "2022-11-24",
  eventStatus: "https://schema.org/EventScheduled",
  eventAttendanceMode: "https://schema.org/OnlineEventAttendanceMode",
  location: {
    "@type": "VirtualLocation",
    url: `${SITE_URL}/conference/inpess-2022`,
  },
  description:
    "INPESS 2022 was jointly organised by OpenED Network, Turkey, and the Education Research and Rural Community Development Forum, South Africa, as a fully virtual international meeting.",
  organizer: [
    { "@type": "Organization", name: "OpenED Network" },
    { "@type": "Organization", name: "ERRCD Forum" },
  ],
};

export default async function Inpess2022Page() {
  const content = await fetchContent<ConferenceContent>(
    conferencePageQuery,
    CONFERENCE_FALLBACK,
  );

  return (
    <main className="conferencePage">
      <SiteHeader />

      <section className="conferenceRecordHero">
        <p className="eyebrow">{content.eyebrow}</p>
        <h1>{content.heading}</h1>
        <div className="recordFacts">
          {content.facts.map((fact) => (
            <span key={fact.label}>
              <b>{fact.label}</b>
              {fact.value}
            </span>
          ))}
        </div>
      </section>

      <section className="recordIntro">
        <div>
          <p className="eyebrow">{content.introEyebrow}</p>
          <h2>{content.introHeading}</h2>
        </div>
        <div>
          {content.introParagraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 40)}>{paragraph}</p>
          ))}
        </div>
      </section>

      <section className="themes">
        <p className="eyebrow">Main themes</p>
        <div>
          {content.themes.map((theme) => (
            <article key={theme.number}>
              <span>{theme.number}</span>
              <h2>{theme.heading}</h2>
            </article>
          ))}
        </div>
      </section>

      <section className="topicSection">
        <p className="eyebrow">Additional conference topics</p>
        <div className="topicGrid">
          {content.topics.map((topic, index) => (
            <div key={topic}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <p>{topic}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="calendarSection">
        <div>
          <p className="eyebrow">Conference calendar</p>
          <h2>Important dates</h2>
        </div>
        <div className="calendarRows">
          {content.calendar.map((row) => (
            <p key={row.date}>
              <b>{row.date}</b>
              <span>{row.event}</span>
            </p>
          ))}
        </div>
      </section>

      <section className="futureConference">
        <p className="eyebrow">{content.futureEyebrow}</p>
        <h2>{content.futureHeading}</h2>
        <p>{content.futureText}</p>
        <a className="button primary" href={`mailto:${EMAILS.info.address}`}>
          {content.futureCtaLabel}
        </a>
      </section>

      <SiteFooter />

      <JsonLd data={eventSchema} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "INPESS 2022 Conference Archive", path: "/conference/inpess-2022" },
        ])}
      />
    </main>
  );
}
