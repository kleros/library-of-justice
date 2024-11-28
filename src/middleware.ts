import createMiddleware from "next-intl/middleware";
import { NextRequest } from "next/server";

import { locales, routing } from "@/i18n/routing";

const handleI18nRouting = createMiddleware(routing);

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const shouldHandle =
    pathname === "/" ||
    new RegExp(`^/(${locales.join("|")})(/.*)?$`).test(pathname);
  if (!shouldHandle) return;

  return handleI18nRouting(request);
}
