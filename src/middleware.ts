import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";

import { locales, routing } from "@/i18n/routing";

const handleI18nRouting = createMiddleware(routing);

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const shouldHandle =
    pathname === "/" ||
    new RegExp(`^/(${locales.join("|")})(/.*)?$`).test(pathname);
  if (!shouldHandle) return;

  // Redirect root path to Spanish locale
  if (pathname === "/") {
    return NextResponse.redirect(new URL("/es", request.url));
  }

  return handleI18nRouting(request);
}
