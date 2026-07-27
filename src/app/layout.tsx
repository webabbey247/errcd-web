import type { Metadata } from "next";
import { draftMode } from "next/headers";
import { VisualEditing } from "next-sanity/visual-editing";
import { JsonLd, organizationSchema } from "@/components/seo/json-ld";
import { SanityLive } from "@/sanity/lib/live";
import { isSanityConfigured } from "@/sanity/env";
import { SITE_URL } from "@/lib/seo";
import "./globals.css";

/**
 * No `next/font` here by design. The legacy site uses only system stacks —
 * Georgia/"Times New Roman" for headings and Arial/Helvetica for body — declared in
 * globals.css. Introducing a webfont would break the "exact fonts" requirement.
 */
/**
 * ISR window, inherited by every route below this layout.
 *
 * Without it the pages are fully static and prerendered at build time, so publishing in
 * Sanity would never reach the live site — an editor would publish and see nothing
 * change. 60s is the backstop; `/api/revalidate` makes edits appear immediately when the
 * Sanity webhook is configured.
 */
export const revalidate = 60;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "ERRCD Forum Publishing",
    template: "%s | ERRCD Forum",
  },
  description:
    "ERRCD Forum publishes open-access journals, academic books, proceedings and other scholarly publications.",
  applicationName: "ERRCD Forum",
  authors: [{ name: "ERRCD Forum" }],
  robots: { index: true, follow: true },
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  // Draft mode is only reachable via the token-validated /api/draft-mode/enable route.
  const isDraft = isSanityConfigured && (await draftMode()).isEnabled;

  return (
    <html lang="en">
      <body>
        {children}
        <JsonLd data={organizationSchema} />
        {/* Live-update stream for Presentation. No-ops when Sanity is unconfigured. */}
        {isSanityConfigured ? <SanityLive /> : null}
        {isDraft ? <VisualEditing /> : null}
      </body>
    </html>
  );
}
