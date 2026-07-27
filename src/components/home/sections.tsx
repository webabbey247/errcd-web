import { Fragment } from "react";
import { HOME_STATIC, type HomeContent } from "@/content/home";
import { EMAILS, OFFICES } from "@/content/site";
import { SmartLink } from "@/components/ui/smart-link";

type Props = { content: HomeContent };

/**
 * `.platforms` carries `id="journals"`; the `#books` anchor is a separate absolutely
 * positioned span (`.anchorTarget`) inside it, so both hash links land on this band.
 */
export function Platforms({ content }: Props) {
  return (
    <section className="platforms" id="journals" aria-label="Publishing platforms">
      <span id="books" className="anchorTarget" aria-hidden="true" />
      {content.platforms.map((platform) => (
        <SmartLink
          key={platform.heading}
          className={`platform ${platform.variant}`}
          href={platform.href}
          external={platform.external}
        >
          <h2>{platform.heading}</h2>
          <p>{platform.text}</p>
          <span className="visit">
            {platform.cta} <b>↗</b>
          </span>
        </SmartLink>
      ))}
    </section>
  );
}

/**
 * `.intro` is a 2-column grid; `.aboutScope`, `.missionVision` and `.aboutActions`
 * each span the full row via `grid-column:1/-1`, so they must be direct children.
 */
export function AboutIntro({ content }: Props) {
  return (
    <section className="intro" id="about">
      <div className="aboutLead">
        <p className="eyebrow">{content.aboutEyebrow}</p>
        <h2>{content.aboutHeading}</h2>
        <p className="aboutName">{content.aboutName}</p>
      </div>

      <div className="introText">
        {content.aboutParagraphs.map((paragraph) => (
          <p key={paragraph.slice(0, 40)}>{paragraph}</p>
        ))}
      </div>

      <div className="aboutScope">
        {content.aboutScope.map((item) => (
          <article key={item.number}>
            <span>{item.number}</span>
            <h3>{item.heading}</h3>
            <p>{item.text}</p>
          </article>
        ))}
      </div>

      <div className="missionVision">
        {content.missionVision.map((item) => (
          <article key={item.eyebrow}>
            <p className="eyebrow">{item.eyebrow}</p>
            <h3>{item.heading}</h3>
          </article>
        ))}
      </div>

      <div className="aboutActions">
        {HOME_STATIC.aboutActions.map((action) => (
          <SmartLink key={action.href} className="textLink" href={action.href}>
            {action.label}
          </SmartLink>
        ))}
      </div>
    </section>
  );
}

export function Offerings({ content }: Props) {
  return (
    <section className="offerings" id="services">
      <div className="sectionHead">
        <div>
          <p className="eyebrow">{HOME_STATIC.offeringsEyebrow}</p>
          <h2>{HOME_STATIC.offeringsHeading}</h2>
        </div>
        <SmartLink className="textLink" href={HOME_STATIC.offeringsLink.href}>
          {HOME_STATIC.offeringsLink.label}
        </SmartLink>
      </div>

      <div className="serviceGrid">
        {content.serviceCards.map((card) => (
          <SmartLink
            key={card.number}
            className="serviceCard"
            href={card.href}
            external={card.external}
          >
            <span>{card.number}</span>
            <h3>{card.heading}</h3>
            <p>{card.text}</p>
            <strong>{HOME_STATIC.serviceCardCta}</strong>
          </SmartLink>
        ))}
      </div>
    </section>
  );
}

export function ConferenceBand({ content }: Props) {
  return (
    <section className="conference" id="conference">
      <div className="conferenceLabel">
        <p className="eyebrow">{HOME_STATIC.conferenceEyebrow}</p>
        <span>{content.conferenceBadge}</span>
      </div>
      <div className="conferenceMain">
        <h2>{content.conferenceHeading}</h2>
        <p>{content.conferenceText}</p>
        <div className="conferenceMeta">
          {HOME_STATIC.conferenceMeta.map((item) => (
            <span key={item.label}>
              <b>{item.label}</b> {item.value}
            </span>
          ))}
        </div>
        <SmartLink className="textLink" href={HOME_STATIC.conferenceLink.href}>
          {HOME_STATIC.conferenceLink.label}
        </SmartLink>
      </div>
    </section>
  );
}

export function AuthorCta({ content }: Props) {
  return (
    <section className="authorCta" id="authors">
      <p className="eyebrow">{HOME_STATIC.authorCtaEyebrow}</p>
      <h2>{HOME_STATIC.authorCtaHeading}</h2>
      <p>{HOME_STATIC.authorCtaText}</p>
      <div className="authorLinks">
        {content.authorLinks.map((link) => (
          <SmartLink key={link.heading} href={link.href} external={link.external}>
            <small>{link.kicker}</small>
            <strong>{link.heading}</strong>
            <span>{link.cta}</span>
          </SmartLink>
        ))}
      </div>
    </section>
  );
}

const CONTACT_EMAILS = [
  { label: "General enquiries", email: EMAILS.info },
  { label: "Publishing/book enquiries", email: EMAILS.publisher },
  { label: "Language editing", email: EMAILS.langEditor },
] as const;

/** Offices and enquiry addresses come from siteSettings, not the home document. */
export function ContactBand() {
  return (
    <section className="contactBand" id="contact">
      <div>
        <p className="eyebrow">{HOME_STATIC.contactEyebrow}</p>
        <h2>{HOME_STATIC.contactHeading}</h2>
      </div>
      <div className="contactDetails">
        {OFFICES.map((office) => (
          <article key={office.country}>
            <b>{office.heading}</b>
            <address>
              {office.lines.map((line, index) => (
                <Fragment key={line}>
                  {index > 0 && <br />}
                  {line}
                </Fragment>
              ))}
            </address>
          </article>
        ))}
        <article>
          <b>Email enquiries</b>
          {CONTACT_EMAILS.map(({ label, email }) => (
            <a key={email.address} href={`mailto:${email.address}`}>
              <span>{label}</span>
              {email.display} ✉
            </a>
          ))}
        </article>
      </div>
    </section>
  );
}
