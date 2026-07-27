import { SmartLink } from "@/components/ui/smart-link";

/**
 * Shared inner-page primitives. Each mirrors a legacy section exactly.
 * `modifier` appends the variant class the source uses (`boardHero`, `editingHero`,
 * `institutionalGrid`) — those classes flip border and column rules in globals.css.
 */

export function InnerHero({
  eyebrow,
  heading,
  text,
  modifier,
  cta,
}: {
  eyebrow: string;
  heading: string;
  text: string;
  modifier?: string;
  cta?: { href: string; label: string };
}) {
  return (
    <section className={modifier ? `innerHero ${modifier}` : "innerHero"}>
      <p className="eyebrow">{eyebrow}</p>
      <h1>{heading}</h1>
      <p>{text}</p>
      {cta ? (
        <a className="button primary" href={cta.href}>
          {cta.label}
        </a>
      ) : null}
    </section>
  );
}

/**
 * The `.aboutNarrative` / `.boardRole` / `.publishList` trio share one CSS rule
 * (a `1fr 1.35fr` grid). `className` selects which of the three a page renders.
 */
export function ProseSection({
  className,
  eyebrow,
  heading,
  paragraphs,
}: {
  className: "aboutNarrative" | "boardRole";
  eyebrow: string;
  heading: string;
  paragraphs: readonly string[];
}) {
  return (
    <section className={className}>
      <div>
        <p className="eyebrow">{eyebrow}</p>
        <h2>{heading}</h2>
      </div>
      <div className="prose">
        {paragraphs.map((paragraph) => (
          <p key={paragraph.slice(0, 40)}>{paragraph}</p>
        ))}
      </div>
    </section>
  );
}

export function ServiceContact({
  eyebrow,
  heading,
  text,
  cta,
}: {
  eyebrow: string;
  heading: string;
  text: string;
  cta: { href: string; label: string };
}) {
  return (
    <section className="serviceContact">
      <p className="eyebrow">{eyebrow}</p>
      <h2>{heading}</h2>
      <p>{text}</p>
      <SmartLink className="button primary" href={cta.href}>
        {cta.label}
      </SmartLink>
    </section>
  );
}

/**
 * Numbered card grid shared by `.editingGrid` (6 items) and its `.institutionalGrid`
 * variant (4 items). The variant flips `nth-child(3n)` borders to `nth-child(2n)`.
 */
export function EditingGrid({
  items,
  modifier,
}: {
  items: readonly { number: string; heading: string; text: string }[];
  modifier?: string;
}) {
  return (
    <section className={modifier ? `editingGrid ${modifier}` : "editingGrid"}>
      {items.map((item) => (
        <article key={item.number}>
          <span>{item.number}</span>
          <h2>{item.heading}</h2>
          <p>{item.text}</p>
        </article>
      ))}
    </section>
  );
}
