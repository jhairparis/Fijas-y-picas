import { NextResponse, type NextRequest } from "next/server";
import { locales } from "./lib/i18n";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Redirige URLs con múltiples slashes consecutivos a una versión limpia
  if (pathname.includes("//")) {
    const clean = pathname.replace(/\/{2,}/g, "/");
    const url = request.nextUrl.clone();
    url.pathname = clean;
    return NextResponse.redirect(url, 301);
  }

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
    return NextResponse.next();
  }

  // Skip if already has locale
  const pathnameHasLocale = locales.some(
    locale => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) {
    return NextResponse.next();
  }

  // Skip root path - always redirect to Spanish (stable redirect for SEO)
  if (pathname === "/") {
    return NextResponse.redirect(new URL("/es", request.url), 301);
  }

  // For other paths, add locale prefix with permanent redirect (301)
  // This handles old URLs without locale prefix that should be permanently redirected
  // Always redirect to Spanish as the default locale for SEO consistency
  const newUrl = new URL(`/es${pathname}`, request.url);
  newUrl.search = request.nextUrl.search;

  return NextResponse.redirect(newUrl, 301);
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
