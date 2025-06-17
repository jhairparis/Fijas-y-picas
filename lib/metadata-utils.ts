import type { Metadata } from "next";
import type { Locale } from "@/lib/i18n";
import type { Dictionary } from "@/lib/types";

// New function that uses dictionary metadata
export function generateMetadataFromDict(
  dict: Dictionary,
  lang: Locale,
  path: string,
  pageKey?: keyof Dictionary["metadata"]["pages"]
): Metadata {
  const baseUrl = "https://fijasypicas.jhairparis.com";

  // Use page-specific metadata if available, otherwise use general metadata
  const pageMetadata =
    pageKey && dict.metadata.pages[pageKey]
      ? dict.metadata.pages[pageKey]
      : {
          title: dict.metadata.title,
          description: dict.metadata.description,
          keywords: dict.metadata.keywords,
        };

  const canonicalUrl =
    lang === "es"
      ? path === ""
        ? baseUrl
        : `${baseUrl}${path}`
      : path === ""
        ? `${baseUrl}/${lang}`
        : `${baseUrl}/${lang}${path}`;

  return {
    title: pageMetadata.title,
    description: pageMetadata.description,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        es: path === "" ? baseUrl : `${baseUrl}${path}`,
        en: path === "" ? `${baseUrl}/en` : `${baseUrl}/en${path}`,
        fr: path === "" ? `${baseUrl}/fr` : `${baseUrl}/fr${path}`,
        "x-default": path === "" ? baseUrl : `${baseUrl}${path}`,
      },
    },
    openGraph: {
      title: pageMetadata.title,
      description: pageMetadata.description,
      url: canonicalUrl,
      siteName: dict.metadata.openGraph.siteName,
      locale: lang === "es" ? "es_ES" : lang === "en" ? "en_US" : "fr_FR",
      type: "website",
      images: [
        {
          url: `${baseUrl}/images/hero-image.png`,
          width: 1200,
          height: 630,
          alt: pageMetadata.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: pageMetadata.title,
      description: pageMetadata.description,
      images: [`${baseUrl}/images/hero-image.png`],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    other: {
      "theme-color": "#1a1a1a",
      "color-scheme": "light dark",
      "format-detection": "telephone=no",
    } as Record<string, string>,
  };
}

// Article metadata using dictionary
export function generateArticleMetadataFromDict(
  dict: Dictionary,
  lang: Locale,
  path: string,
  pageKey: keyof Dictionary["metadata"]["pages"]
): Metadata {
  const baseMetadata = generateMetadataFromDict(dict, lang, path, pageKey);

  return {
    ...baseMetadata,
    openGraph: {
      ...baseMetadata.openGraph,
      type: "article",
    },
  };
}

// Game page metadata using dictionary
export function generateGamePageMetadataFromDict(
  dict: Dictionary,
  lang: Locale,
  path: string,
  pageKey: keyof Dictionary["metadata"]["pages"],
  gameMode?: string
): Metadata {
  const baseMetadata = generateMetadataFromDict(dict, lang, path, pageKey);

  return {
    ...baseMetadata,
    other: {
      "theme-color": "#1a1a1a",
      "color-scheme": "light dark",
      "format-detection": "telephone=no",
      "game-mode": gameMode || "general",
      "application-name": "Fijas y Picas",
    } as Record<string, string>,
  };
}

// Generate JSON-LD for VideoGame schema (specific for games in 2025)
export function generateVideoGameSchema(
  gameName: string,
  gameDescription: string,
  gameUrl: string,
  lang: Locale,
  gameMode: string,
  screenshots?: string[]
) {
  return {
    "@context": "https://schema.org",
    "@type": ["Game", "VideoGame"],
    name: gameName,
    description: gameDescription,
    url: gameUrl,
    inLanguage: lang,
    genre: ["Logic", "Puzzle", "Strategy", "Deduction"],
    gamePlatform: ["Web Browser"],
    applicationCategory: "Game",
    operatingSystem: "Any",
    isAccessibleForFree: true,
    playMode: gameMode,
    numberOfPlayers: gameMode.includes("human") ? "1-2" : "1",
    gameItem: {
      "@type": "Thing",
      name: "Number Guessing",
      description: "Guess the secret number using logic and deduction",
    },
    ...(screenshots && {
      screenshot: screenshots.map(url => ({
        "@type": "ImageObject",
        url,
        encodingFormat: "image/png",
      })),
    }),
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
    },
    audience: {
      "@type": "Audience",
      audienceType: "General Public",
      suggestedMinAge: 8,
    },
  };
}

// Modern accessibility requirements for 2025
export function generateA11yMeta() {
  return {
    "color-scheme": "light dark",
    "theme-color": "#1a1a1a",
    "theme-color-dark": "#ffffff",
    viewport: "width=device-width, initial-scale=1, viewport-fit=cover",
    "format-detection": "telephone=no",
    "mobile-web-app-capable": "yes",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "black-translucent",
  };
}
