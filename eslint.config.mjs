import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";

/**
 * eslint-config-next 16 ships native flat configs on its subpath exports, so they are
 * imported directly. Routing them through FlatCompat throws "Converting circular
 * structure to JSON".
 */
const config = [
  {
    // The legacy static site is kept in-tree as the reference for the port.
    ignores: [
      ".next/**",
      "node_modules/**",
      "ERRCD-Forum-cPanel-Ready (1)/**",
      "about/**",
      "services/**",
      "conference/**",
      "south-african-journals/**",
      "assets/**",
    ],
  },
  ...nextCoreWebVitals,
  ...nextTypescript,
];

export default config;
