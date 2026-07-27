import Link from "next/link";
import {
  DESKTOP_NAV_PRIMARY,
  HEADER_CTA,
  MOBILE_NAV,
  NAV_ABOUT_DROPDOWN,
  NAV_CONTACT,
  SITE,
} from "@/content/site";

/**
 * Renders `<header class="siteHeader">` with markup structurally identical to the
 * legacy pages. Deliberately a Server Component: the dropdown and mobile menu are
 * native <details>/<summary>, exactly as in the source, so this ships zero JS.
 *
 * Do not add wrapper elements — `.siteHeader` is a flex row whose child order and
 * `margin-right:auto` on `.brand` drive the entire layout.
 */
export function SiteHeader({ variant = "inner" }: { variant?: "home" | "inner" }) {
  const cta = HEADER_CTA[variant];

  return (
    <header className="siteHeader">
      <Link className="brand wordmark" href="/" aria-label="ERRCD Forum home">
        <span>
          <strong>{SITE.wordmark.strong}</strong>
          {SITE.wordmark.rest}
        </span>
        <small>{SITE.tagline}</small>
      </Link>

      <nav className="desktopNav" aria-label="Main navigation">
        {DESKTOP_NAV_PRIMARY.map((link) => (
          <Link key={link.href} href={link.href}>
            {link.label}
          </Link>
        ))}

        <details className="navDropdown">
          <summary>About</summary>
          <div>
            {NAV_ABOUT_DROPDOWN.map((link) => (
              <Link key={link.href} href={link.href}>
                {link.label}
              </Link>
            ))}
          </div>
        </details>

        <Link href={NAV_CONTACT.href}>{NAV_CONTACT.label}</Link>
      </nav>

      <details className="mobileNav">
        <summary aria-label="Open navigation menu">Menu</summary>
        <div>
          {MOBILE_NAV.map((link) => (
            <Link key={link.href} href={link.href}>
              {link.label}
            </Link>
          ))}
        </div>
      </details>

      <Link className="headerCta" href={cta.href}>
        {cta.label}
      </Link>
    </header>
  );
}
