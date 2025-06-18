import type { Locale } from "@/lib/i18n";
import type { Dictionary } from "@/lib/types";
import { PUBLIC_URL_ } from "./config";

const baseUrl = PUBLIC_URL_;

export function GameSchemaGeneral(lang: Locale, dict: Dictionary) {
  const now = new Date().toISOString();
  return {
    "@context": "https://schema.org",
    "@type": ["WebApplication", "Game"],
    name: dict.metadata.openGraph.siteName,
    alternateName: dict.structuredData.general.alternateName,
    description: dict.metadata.description,
    disambiguatingDescription:
      dict.structuredData.general.disambiguatingDescription,
    url: `${baseUrl}/${lang}`,
    inLanguage: lang,
    image: `${baseUrl}/logo.svg`,
    applicationCategory: dict.structuredData.general.applicationCategory,
    applicationSubCategory: dict.structuredData.general.applicationSubCategory,
    applicationSuite: dict.structuredData.general.applicationSuite,
    browserRequirements: dict.structuredData.general.browserRequirements,
    availableOnDevice: dict.structuredData.general.availableOnDevice,
    operatingSystem: dict.structuredData.general.operatingSystem,
    softwareVersion: dict.structuredData.general.softwareVersion,
    featureList: dict.structuredData.general.featureList,
    memoryRequirements: dict.structuredData.general.memoryRequirements,
    storageRequirements: dict.structuredData.general.storageRequirements,
    permissions: dict.structuredData.general.permissions,
    releaseNotes: dict.structuredData.general.releaseNotes,
    isAccessibleForFree: dict.structuredData.general.isAccessibleForFree,
    isFamilyFriendly: dict.structuredData.general.isFamilyFriendly,
    keywords:
      typeof dict.metadata.keywords === "string"
        ? dict.metadata.keywords
        : dict.structuredData.general.keywords,
    publisher: {
      "@type": "Organization",
      name: dict.structuredData.organization.name,
      url: baseUrl,
      logo: {
        "@type": "ImageObject",
        url: `${baseUrl}/logo.svg`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${baseUrl}/${lang}`,
    },
    genre: dict.structuredData.general.genre,
    gamePlatform: dict.structuredData.general.gamePlatform,
    playMode: dict.structuredData.general.playMode,
    gameEdition: dict.structuredData.general.gameEdition,
    numberOfPlayers: {
      "@type": "QuantitativeValue",
      minValue: dict.structuredData.general.suggestedMinAge,
      maxValue: dict.structuredData.general.suggestedMaxAge,
      value: dict.structuredData.general.numberOfPlayersValue,
    },
    gameLocation: dict.structuredData.general.gameLocation,
    characterAttribute: dict.structuredData.general.characterAttribute,
    gameItem: dict.structuredData.general.gameItem,
    quest: dict.structuredData.general.quest,
    dateCreated: dict.structuredData.general.dateCreated,
    dateModified: now,
    datePublished: dict.structuredData.general.datePublished,
    license: dict.structuredData.general.license,
    about: {
      "@type": "Thing",
      name: dict.structuredData.general.aboutName,
      description: dict.structuredData.general.aboutDescription,
    },
    abstract: dict.metadata.description,
    contentRating: dict.structuredData.general.contentRating,
    typicalAgeRange: dict.structuredData.general.typicalAgeRange,
    audience: {
      "@type": "Audience",
      audienceType: dict.structuredData.general.audienceType,
      suggestedMinAge: dict.structuredData.general.suggestedMinAge,
      suggestedMaxAge: dict.structuredData.general.suggestedMaxAge,
    },
    educationalUse: dict.structuredData.general.educationalUse,
    teaches: dict.structuredData.general.teaches,
    // Technical properties
    screenshot: dict.structuredData.general.screenshot.map(
      path => `${baseUrl}${path}`
    ),
    fileSize: dict.structuredData.general.fileSize,
    installUrl: `${baseUrl}/${lang}`,
    softwareRequirements: dict.structuredData.general.softwareRequirements,
    processorRequirements: dict.structuredData.general.processorRequirements,
    countriesSupported: dict.structuredData.general.countriesSupported,
    interactivityType: dict.structuredData.general.interactivityType,
    accessibilityFeature: dict.structuredData.general.accessibilityFeature,
    actor: dict.structuredData.general.actor,
    director: dict.structuredData.general.director,
    musicBy: dict.structuredData.general.musicBy,
    cheatCode: dict.structuredData.general.cheatCode,
    gameServer: dict.structuredData.general.gameServer,
    gameTip: dict.structuredData.general.gameTip,
    trailer: dict.structuredData.general.trailer,
    downloadUrl: undefined,
    softwareAddOn: dict.structuredData.general.softwareAddOn,
    softwareHelp: {
      "@type": "WebPage",
      url: `${baseUrl}/${lang}${dict.structuredData.general.softwareHelpPath}`,
      name: dict.structuredData.general.softwareHelpName,
    },
    supportingData: dict.structuredData.general.supportingData,
    countriesNotSupported: dict.structuredData.general.countriesNotSupported,
    aggregateRating: dict.structuredData.general.aggregateRating,
    award: dict.structuredData.general.award,
  };
}

export function generateArticleSchema(
  title: string,
  description: string,
  path: string,
  lang: Locale,
  dict: Dictionary,
  publishedDate?: string,
  modifiedDate?: string
) {
  const now = new Date().toISOString();
  const pubDate = publishedDate || "2023-01-01T00:00:00.000Z";
  const modDate = modifiedDate || now;

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description: description,
    url: `${baseUrl}/${lang}${path}`,
    inLanguage: lang,
    datePublished: pubDate,
    dateModified: modDate,
    author: {
      "@type": "Organization",
      name: dict.structuredData.organization.name,
      url: baseUrl,
    },
    publisher: {
      "@type": "Organization",
      name: dict.structuredData.organization.name,
      url: baseUrl,
      logo: {
        "@type": "ImageObject",
        url: `${baseUrl}/logo.svg`,
        width: 512,
        height: 512,
      },
    },
    image: dict.structuredData.general.screenshot
      .map(path => `${baseUrl}${path}`)
      .concat([`${baseUrl}/logo.svg`]),
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${baseUrl}/${lang}${path}`,
    },
    articleSection: dict.structuredData.article.articleSection,
    wordCount: dict.structuredData.article.wordCount,
    isAccessibleForFree: true,
    about: {
      "@type": "Thing",
      name: dict.structuredData.article.aboutName,
      description: dict.structuredData.article.aboutDescription,
    },
  };
}

export function generateOrganizationSchema(dict: Dictionary) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: dict.structuredData.organization.name,
    url: baseUrl,
    logo: `${baseUrl}/logo.svg`,
    description: dict.structuredData.organization.description,
    sameAs: [
      // Add social media links when available
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: dict.structuredData.organization.contactType,
      availableLanguage: dict.structuredData.organization.availableLanguage,
    },
  };
}

export function generateFAQSchema(
  lang: Locale,
  dict: Dictionary,
  FAQs: Array<{ question: string; answer: string }>,
  path: string
) {
  if (!FAQs || FAQs.length === 0) {
    throw new Error(
      "At least one FAQ question is required for FAQPage structured data"
    );
  }

  FAQs.forEach((faq, index) => {
    if (
      !faq.question ||
      typeof faq.question !== "string" ||
      faq.question.trim() === ""
    ) {
      throw new Error(
        `FAQ item at index ${index} must have a valid question (name property)`
      );
    }
    if (
      !faq.answer ||
      typeof faq.answer !== "string" ||
      faq.answer.trim() === ""
    ) {
      throw new Error(
        `FAQ item at index ${index} must have a valid answer (text property)`
      );
    }
  });

  return {
    "@context": "https://schema.org" as const,
    "@type": "FAQPage" as const,
    mainEntity: FAQs.map(faq => ({
      "@type": "Question" as const,
      name: faq.question.trim(),
      acceptedAnswer: {
        "@type": "Answer" as const,
        text: faq.answer.trim(),
      },
    })),

    url: `${baseUrl}/${lang}/${path}`,
    mainEntityOfPage: {
      "@type": "WebPage" as const,
      "@id": `${baseUrl}/${lang}/${path}`,
    },
    inLanguage: lang,
    about: {
      "@type": "Thing" as const,
      name: dict.structuredData.faq.aboutName,
      description: dict.structuredData.faq.aboutDescription,
    },
    isPartOf: {
      "@type": "WebSite" as const,
      url: baseUrl,
      name: dict.structuredData.faq.websiteName,
    },
  };
}
