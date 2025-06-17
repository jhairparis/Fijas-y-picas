import { NextResponse, type NextRequest } from "next/server";
import { locales, getLocale } from "./lib/i18n";
import { generateSecurityHeaders } from "./lib/seo-2025-utils";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip static files and special Next.js paths
  if (
    pathname.startsWith("/_next/") ||
    pathname.startsWith("/api/") ||
    pathname.includes(".") ||
    pathname === "/favicon.ico" ||
    pathname === "/robots.txt" ||
    pathname === "/sitemap.xml" ||
    pathname.startsWith("/images/") ||
    pathname.startsWith("/static/") ||
    pathname.match(/\.(ico|png|jpg|jpeg|gif|svg|css|js|woff|woff2|ttf|eot)$/)
  ) {
    const response = NextResponse.next();
    // Add security headers to static resources too
    const securityHeaders = generateSecurityHeaders();
    Object.entries(securityHeaders).forEach(([key, value]) => {
      response.headers.set(key, value);
    });
    return response;
  }

  // Skip if already has locale
  const pathnameHasLocale = locales.some(
    locale => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) {
    // Add security headers for localized routes
    const response = NextResponse.next();
    const securityHeaders = generateSecurityHeaders();
    Object.entries(securityHeaders).forEach(([key, value]) => {
      response.headers.set(key, value);
    });
    return response;
  }

  // Skip root path - let it be handled by the root route
  if (pathname === "/") {
    const locale = getLocale(request);
    const response = NextResponse.redirect(new URL(`/${locale}`, request.url));
    const securityHeaders = generateSecurityHeaders();
    Object.entries(securityHeaders).forEach(([key, value]) => {
      response.headers.set(key, value);
    });
    return response;
  }

  // For other paths, add locale prefix
  const locale = getLocale(request);
  const newUrl = new URL(`/${locale}${pathname}`, request.url);
  newUrl.search = request.nextUrl.search;

  const response = NextResponse.redirect(newUrl);
  const securityHeaders = generateSecurityHeaders();
  Object.entries(securityHeaders).forEach(([key, value]) => {
    response.headers.set(key, value);
  });
  return response;
}

export const config = {
  // Matcher para excluir rutas internas y archivos estáticos
  matcher: [
    /*
     * Hacer match con todas las rutas excepto:
     * - api routes (que comienzan con /api)
     * - _next/static (archivos estáticos)
     * - _next/image (optimización de imágenes)
     * - favicon.ico, favicon.svg, sitemap.xml, robots.txt
     * - archivos con extensión (como .svg, .png, etc.)
     * - carpeta images y static
     */
    "/((?!api|_next/static|_next/image|favicon\\.ico|favicon\\.svg|sitemap\\.xml|robots\\.txt|images|static|.*\\.(?:ico|png|jpg|jpeg|gif|svg|css|js|woff|woff2|ttf|eot)$).*)",
  ],
};
