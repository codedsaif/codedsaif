import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Single-page site: any unknown path (someone typing /whatever) redirects to the
// home page instead of showing a 404 — there are no other pages. Home, Next
// internals, API routes and static files (anything with a "." extension, e.g.
// favicon.ico / manifest.webmanifest) are excluded by the matcher below.
// (Next 16 renamed the `middleware` convention to `proxy`.)
export function proxy(request: NextRequest) {
  return NextResponse.redirect(new URL("/", request.url));
}

export const config = {
  matcher: ["/((?!_next|api|.*\\.).+)"],
};
