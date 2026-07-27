import type { Metadata } from "next";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { InnerHero, ServiceContact } from "@/components/shared/inner";
import { SmartLink } from "@/components/ui/smart-link";
import { JsonLd, breadcrumbSchema } from "@/components/seo/json-ld";
import { EMAILS } from "@/content/site";
import { buildPageMetadata, fetchContent } from "@/sanity/lib/content";
import { servicesPageQuery } from "@/sanity/lib/queries";
import { SERVICES_FALLBACK, type ServicesContent } from "@/content/pages";

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata("services", servicesPageQuery);
}



export default async function ServicesPage() {
  const content = await fetchContent<ServicesContent>(
    servicesPageQuery,
    SERVICES_FALLBACK,
  );

  return (
    <main>
      <SiteHeader />

      <InnerHero
        eyebrow={content.eyebrow}
        heading={content.heading}
        text={content.intro}
      />

      <section className="serviceDirectory">
        {content.directory.map((service) => (
          <SmartLink
            key={service.number}
            href={service.href}
            external={service.external}
          >
            <span>{service.number}</span>
            <h2>{service.heading}</h2>
            <p>{service.text}</p>
            <strong>View service →</strong>
          </SmartLink>
        ))}
      </section>

      <ServiceContact
        eyebrow={content.contactEyebrow}
        heading={content.contactHeading}
        text={content.contactText}
        cta={{
          href: `mailto:${EMAILS.publisher.address}`,
          label: `${EMAILS.publisher.display} →`,
        }}
      />

      <SiteFooter />

      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Publishing and Author Services", path: "/services" },
        ])}
      />
    </main>
  );
}
