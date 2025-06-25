import { MetadataRoute } from "next";
import { locales } from "@/lib/i18n";
import { PUBLIC_URL_ } from "@/lib/config";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = PUBLIC_URL_;

  // Define las rutas principales de tu aplicación
  const routes = [
    "", // página principal
    "/jugar",
    "/jugar/humano-humano",
    "/jugar/maquina-adivina",
    "/jugar/maquina-pistas",
    "/como-jugar",
    "/faq",
  ];

  // Prioridades específicas por tipo de página
  const priorities: Record<string, number> = {
    "": 1.0, // página principal
    "/jugar": 0.9,
    "/como-jugar": 0.8,
    "/faq": 0.8,
    "/jugar/humano-humano": 0.7,
    "/jugar/maquina-adivina": 0.7,
    "/jugar/maquina-pistas": 0.7,
  };

  // Genera URLs para cada idioma y cada ruta
  const sitemapEntries: MetadataRoute.Sitemap = [];

  locales.forEach(locale => {
    routes.forEach(route => {
      // Genera las alternativas de idioma para cada ruta
      const alternates: Record<string, string> = {};

      locales.forEach(altLocale => {
        alternates[altLocale] = `${baseUrl}/${altLocale}${route}`;
      });

      // Agrega x-default apuntando a español (página real de fallback)
      alternates["x-default"] = `${baseUrl}/es${route}`;

      // URL principal para este locale y ruta
      const mainUrl = `${baseUrl}/${locale}${route}`;

      sitemapEntries.push({
        url: mainUrl,
        lastModified: new Date("2025-06-25"),
        changeFrequency: route === "" ? "weekly" : "monthly",
        priority: priorities[route] || 0.6,
        alternates: {
          languages: alternates,
        },
      });
    });
  });

  return sitemapEntries;
}
