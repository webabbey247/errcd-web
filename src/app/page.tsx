import type { Metadata } from "next";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { Hero } from "@/components/home/hero";
import {
  AboutIntro,
  AuthorCta,
  ConferenceBand,
  ContactBand,
  Offerings,
  Platforms,
} from "@/components/home/sections";
import { buildPageMetadata, fetchContent } from "@/sanity/lib/content";
import { homePageQuery } from "@/sanity/lib/queries";
import type { HomeContent } from "@/content/home";
import { HOME_FALLBACK } from "@/content/home";

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata("home", homePageQuery);
}

export default async function HomePage() {
  const content = await fetchContent<HomeContent>(homePageQuery, HOME_FALLBACK);

  return (
    <main>
      <SiteHeader variant="home" />
      <Hero content={content} />
      <Platforms content={content} />
      <AboutIntro content={content} />
      <Offerings content={content} />
      <ConferenceBand content={content} />
      <AuthorCta content={content} />
      <ContactBand />
      <SiteFooter />
    </main>
  );
}
