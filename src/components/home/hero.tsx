import { HOME_STATIC, type HomeContent } from "@/content/home";

/**
 * `.hero` is a 59%/41% grid. `.heroCopy:before` draws the burgundy rule and
 * `.heroCopy>*` shifts every child right by 38px — so children must stay direct.
 */
export function Hero({ content }: { content: HomeContent }) {
  return (
    <section className="hero" id="top">
      <div className="heroCopy">
        <p className="eyebrow">{content.heroEyebrow}</p>
        <h1>{content.heroHeading}</h1>
        <p className="heroText">{content.heroText}</p>
        <div className="actions">
          {HOME_STATIC.heroActions.map((action) => (
            <a
              key={action.href}
              className={`button ${action.variant}`}
              href={action.href}
            >
              {action.label} <span>→</span>
            </a>
          ))}
        </div>
      </div>
      <PublishingArt />
    </section>
  );
}

/**
 * Purely decorative editorial collage, `aria-hidden` as in the source. Every fill is
 * driven by CSS and must not be inlined:
 *   .editorialSheet #fff / rotate(3deg)      .journalIssue  #18324b / rotate(-5deg)
 *   .bookCoverOne   #d47b55 / rotate(2deg)   .bookCoverTwo  #f4f7f8 / rotate(7deg)
 * The word "PUBLISHING" comes from `.publishingArt:before`, not from markup.
 *
 * Not CMS-driven by design — it is presentation, not content.
 */
function PublishingArt() {
  return (
    <div className="heroArt publishingArt" aria-hidden="true">
      <div className="editorialSheet">
        <span>PEER-REVIEWED PUBLISHING</span>
        {/* 8 hairline rules */}
        {Array.from({ length: 8 }, (_, index) => (
          <i key={index} />
        ))}
      </div>
      <div className="journalIssue">
        <small>ERRCD FORUM</small>
        <b>INTERDISCIPLINARY</b>
        <strong>JOURNALS</strong>
        <span>OPEN ACCESS · BACK COVER</span>
      </div>
      <div className="cover bookCoverOne">
        <small>ERRCD FORUM BOOKS</small>
        <b>
          RESEARCH
          <br />
          WITHOUT
          <br />
          BOUNDARIES
        </b>
        <span>OPEN MONOGRAPH</span>
      </div>
      <div className="cover bookCoverTwo">
        <small>NEW PERSPECTIVES</small>
        <b>
          KNOWLEDGE
          <br />
          FOR CHANGE
        </b>
        <span>EDITED COLLECTION</span>
      </div>
    </div>
  );
}
