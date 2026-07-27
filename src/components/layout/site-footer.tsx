import { Fragment } from "react";
import Image from "next/image";
import Link from "next/link";
import { EMAILS, FOOTER_COLUMNS, OFFICES, SITE } from "@/content/site";

/**
 * `<footer>` is a 5-column grid. `.copyright{grid-column:1/-1}` requires it to be a
 * DIRECT grid child, and `footer>div:not(.footerBrand)` / `footer>div` rules target
 * direct children only — so no wrapper elements may be introduced here.
 *
 * The logo is inverted to white by CSS (`filter:brightness(0) invert(1)`); the width
 * and height below match the computed CSS box (210x76, overriding the earlier 230x90
 * declaration) so `next/image` reserves identical space and CLS stays at zero.
 */
export function SiteFooter() {
  return (
    <footer>
      <div className="footerBrand">
        <Image
          src={SITE.logo.src}
          alt={SITE.logo.alt}
          width={210}
          height={76}
          sizes="210px"
        />
        <p>{SITE.footerBlurb}</p>
      </div>

      {FOOTER_COLUMNS.map((column) => (
        <div className="footerColumn" key={column.heading}>
          <b>{column.heading}</b>
          {column.links.map((link) => (
            <Link key={link.href} href={link.href}>
              {link.label}
            </Link>
          ))}
        </div>
      ))}

      <div className="footerColumn footerContact">
        <b>Enquiries</b>
        {Object.values(EMAILS).map((email) => (
          <a key={email.address} href={`mailto:${email.address}`}>
            {email.display}
          </a>
        ))}
      </div>

      <div className="footerOffices">
        <b>Offices</b>
        {OFFICES.map((office) => (
          <address key={office.country}>
            <strong>{office.country}</strong>
            {/* Single <span> with <br/> separators, matching source exactly —
                nesting spans here would double-match `.footerOffices span`. */}
            <span>
              {office.footerLines.map((line, index) => (
                <Fragment key={line}>
                  {index > 0 && <br />}
                  {line}
                </Fragment>
              ))}
            </span>
          </address>
        ))}
      </div>

      <p className="copyright">{SITE.copyright}</p>
    </footer>
  );
}
