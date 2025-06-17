import type { Locale } from "@/lib/i18n";
import type { Dictionary } from "@/lib/types";

// Diccionarios dinámicos
const dictionaries = {
  es: () =>
    import("@/dictionaries/es.json").then(
      module => module.default as Dictionary
    ),
  en: () =>
    import("@/dictionaries/en.json").then(
      module => module.default as Dictionary
    ),
  fr: () =>
    import("@/dictionaries/fr.json").then(
      module => module.default as Dictionary
    ),
};

export const getDictionary = async (locale: Locale): Promise<Dictionary> => {
  if (!dictionaries[locale]) {
    console.warn(
      `Dictionary for locale "${locale}" not found, falling back to Spanish`
    );
    return dictionaries.es();
  }
  return dictionaries[locale]();
};
