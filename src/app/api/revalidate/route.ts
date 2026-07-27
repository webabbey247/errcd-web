import { revalidatePath } from "next/cache";
import { NextResponse, type NextRequest } from "next/server";
import { parseBody } from "next-sanity/webhook";

/**
 * Sanity webhook -> instant revalidation.
 *
 * The ISR window in src/app/layout.tsx (60s) is the backstop; this makes a publish show
 * up immediately. Configure in sanity.io/manage -> API -> Webhooks:
 *   URL:     https://<site>/api/revalidate
 *   Trigger: create / update / delete
 *   Secret:  SANITY_REVALIDATE_SECRET
 *
 * `parseBody` verifies the signature, so an unsigned caller cannot force revalidation.
 * Every content type is a singleton mapped to one route, so the document _type is enough
 * to know what to purge.
 */
const ROUTE_BY_TYPE: Record<string, string> = {
  homePage: "/",
  aboutPage: "/about",
  advisoryBoardPage: "/about/advisory-board",
  servicesPage: "/services",
  languageEditingPage: "/services/language-editing",
  institutionalPublicationsPage: "/services/institutional-publications",
  journalsDirectoryPage: "/south-african-journals",
  conferencePage: "/conference/inpess-2022",
};

export async function POST(request: NextRequest) {
  try {
    const { isValidSignature, body } = await parseBody<{ _type?: string }>(
      request,
      process.env.SANITY_REVALIDATE_SECRET,
    );

    if (!isValidSignature) {
      return new NextResponse("Invalid signature", { status: 401 });
    }

    const type = body?._type;
    if (!type) {
      return new NextResponse("Bad request: missing _type", { status: 400 });
    }

    // siteSettings drives the header and footer, so it invalidates every route.
    const paths =
      type === "siteSettings"
        ? Object.values(ROUTE_BY_TYPE)
        : [ROUTE_BY_TYPE[type]].filter((path): path is string => Boolean(path));

    for (const path of paths) revalidatePath(path);

    return NextResponse.json({ revalidated: paths, type });
  } catch (error) {
    console.error("[revalidate] failed:", error);
    return new NextResponse("Revalidation failed", { status: 500 });
  }
}
