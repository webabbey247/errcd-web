import type { NextConfig } from "next";

/**
 * The legacy site was served from cPanel with an .htaccess that did extensionless
 * rewriting (`RewriteRule ^(.+?)/?$ $1.html`). That means up to three URL shapes may
 * be indexed for every route: `/about`, `/about.html`, `/about/index.html`.
 * Every non-canonical shape gets a permanent (308) redirect so link equity transfers.
 */
const ROUTES = [
  "about",
  "about/advisory-board",
  "services",
  "services/language-editing",
  "services/institutional-publications",
  "south-african-journals",
  "conference/inpess-2022",
] as const;

const nextConfig: NextConfig = {
  reactStrictMode: true,
  trailingSlash: false,
  poweredByHeader: false,

  // A stray lockfile in the home directory makes Next infer the wrong workspace root.
  turbopack: { root: __dirname },

  images: {
    remotePatterns: [{ protocol: "https", hostname: "cdn.sanity.io" }],
  },

  async redirects() {
    return [
      { source: "/index.html", destination: "/", permanent: true },
      ...ROUTES.flatMap((route) => [
        { source: `/${route}.html`, destination: `/${route}`, permanent: true },
        { source: `/${route}/index.html`, destination: `/${route}`, permanent: true },
      ]),
    ];
  },
};

export default nextConfig;
