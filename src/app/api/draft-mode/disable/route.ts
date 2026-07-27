import { draftMode } from "next/headers";
import { NextResponse } from "next/server";

/** Manual escape hatch — leaves draft mode and returns to the published site. */
export async function GET(request: Request) {
  const draft = await draftMode();
  draft.disable();
  return NextResponse.redirect(new URL("/", request.url));
}
