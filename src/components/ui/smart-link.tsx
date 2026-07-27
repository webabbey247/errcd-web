import Link from "next/link";

/**
 * Renders an internal `next/link` or a plain external anchor with the same class and
 * children, so callers stay declarative without changing the emitted DOM.
 *
 * External links get `rel="noopener noreferrer"` — the legacy markup only had
 * `noreferrer`; adding `noopener` is a security fix with no visual effect.
 */
export function SmartLink({
  href,
  external = false,
  className,
  children,
  ...rest
}: {
  href: string;
  external?: boolean;
  className?: string;
  children: React.ReactNode;
} & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href">) {
  if (external || href.startsWith("mailto:")) {
    return (
      <a
        href={href}
        className={className}
        {...(external
          ? { target: "_blank", rel: "noopener noreferrer" }
          : {})}
        {...rest}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={className} {...rest}>
      {children}
    </Link>
  );
}
