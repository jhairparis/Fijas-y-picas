import type { Metadata } from "next";
import type { Locale } from "@/lib/i18n";
import type { Dictionary } from "@/lib/types";
import { PUBLIC_URL_ } from "./config";

export default function generateMetadata(
  dict: Dictionary,
  lang: Locale,
  path: string,
  pageKey?: keyof Dictionary["metadata"]["pages"]
): Metadata {
  let pageMetadata;

  if (pageKey && dict.metadata.pages[pageKey]) {
    pageMetadata = dict.metadata.pages[pageKey];
  } else {
    pageMetadata = {
      title: dict.metadata.title,
      description: dict.metadata.description,
      keywords: dict.metadata.keywords,
    };
    console.warn(`Metadata for page key "${pageKey}" not found in dictionary.`);
  }

  const localeMap = {
    es: "es_ES",
    en: "en_US",
    fr: "fr_FR",
  };

  const canonicalUrl = path === "" ? `/${lang}` : `/${lang}${path}`;

  return {
    title: pageMetadata.title,
    description: pageMetadata.description,
    metadataBase: new URL(PUBLIC_URL_),

    alternates: {
      canonical: canonicalUrl,
      languages: {
        es: path === "" ? `/es` : `/es${path}`,
        en: path === "" ? `/en` : `/en${path}`,
        fr: path === "" ? `/fr` : `/fr${path}`,
        "x-default": path === "" ? "/" : `/${path}`,
      },
    },
    openGraph: {
      title: pageMetadata.title,
      description: pageMetadata.description,
      url: canonicalUrl,
      siteName: dict.metadata.openGraph.siteName,
      locale: localeMap[lang] || "es_ES",
      type: "website",
      // images: [
      //   {
      //     url: `${baseUrl}/images/hero-image.png`,
      //     width: 1200,
      //     height: 630,
      //     alt: pageMetadata.title,
      //   },
      // ],
    },
    twitter: {
      card: "summary_large_image",
      title: pageMetadata.title,
      description: pageMetadata.description,
      // images: [`${baseUrl}/images/hero-image.png`],
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

export function generateArticleMetadata(
  dict: Dictionary,
  lang: Locale,
  path: string,
  pageKey: keyof Dictionary["metadata"]["pages"]
): Metadata {
  const baseMetadata = generateMetadata(dict, lang, path, pageKey);

  return {
    ...baseMetadata,
    openGraph: {
      ...baseMetadata.openGraph,
      type: "article",
    },
  };
}

export function generateGamePageMetadata(
  dict: Dictionary,
  lang: Locale,
  path: string,
  pageKey: keyof Dictionary["metadata"]["pages"],
  gameMode?: string
): Metadata {
  const baseMetadata = generateMetadata(dict, lang, path, pageKey);

  return {
    ...baseMetadata,
    other: {
      "game-mode": gameMode || "general",
      "application-name": "Fijas y Picas",
    } as Record<string, string>,
  };
}
