import { match } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";

// Configuración de locales
export const locales = ["es", "en", "fr"] as const;
export const defaultLocale = "es" as const;

export type Locale = (typeof locales)[number];

// Función para obtener el locale preferido del usuario
export function getLocale(request: Request): string {
  // Obtener el Accept-Language header
  const acceptLanguage = request.headers.get("Accept-Language") ?? "";

  // Si no hay header de idioma, usar español por defecto
  if (!acceptLanguage) {
    return defaultLocale;
  }

  const headers = { "accept-language": acceptLanguage };

  // Obtener los idiomas preferidos del navegador
  const languages = new Negotiator({ headers }).languages();

  // Si el usuario tiene español en sus preferencias (aunque no sea el primero), usar español
  if (languages.some(lang => lang.toLowerCase().startsWith("es"))) {
    return defaultLocale;
  }

  // Solo si el usuario NO tiene español en sus preferencias, usar otro idioma
  return match(languages, locales, defaultLocale);
}

// Función para validar si un locale es soportado
export function isValidLocale(locale: string): locale is Locale {
  return locales.includes(locale as Locale);
}
