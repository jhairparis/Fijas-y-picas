import type { Locale } from "@/lib/i18n";
import type { Dictionary } from "@/lib/types";

export function generateWebsiteSchema(
  lang: Locale,
  dict: Dictionary,
  baseUrl: string
) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: dict.metadata.openGraph.siteName,
    description: dict.metadata.description,
    url: lang === "es" ? baseUrl : `${baseUrl}/${lang}`,
    inLanguage: lang,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${baseUrl}/search?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
    mainEntity: {
      "@type": "Game",
      name: dict.metadata.openGraph.siteName,
      description: dict.metadata.description,
      url: lang === "es" ? baseUrl : `${baseUrl}/${lang}`,
      genre: ["Logic", "Puzzle", "Strategy"],
      gamePlatform: ["Web Browser"],
      applicationCategory: "Game",
      operatingSystem: "Any",
      isAccessibleForFree: true,
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
        availability: "https://schema.org/InStock",
      },
    },
  };
}

export function generateGameSchema(
  gameName: string,
  gameDescription: string,
  gameUrl: string,
  lang: Locale,
  gameMode: string,
  screenshots?: string[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "Game",
    name: gameName,
    description: gameDescription,
    url: gameUrl,
    inLanguage: lang,
    genre: ["Logic", "Puzzle", "Strategy", "Deduction"],
    gamePlatform: ["Web Browser"],
    applicationCategory: "Game",
    operatingSystem: "Any",
    isAccessibleForFree: true,
    numberOfPlayers: gameMode.includes("human") ? "1-2" : "1",
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

export function generateArticleSchema(
  title: string,
  description: string,
  url: string,
  lang: Locale,
  publishedDate?: string,
  modifiedDate?: string
) {
  const now = new Date().toISOString();
  const pubDate = publishedDate || now;
  const modDate = modifiedDate || now;

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description: description,
    url: url,
    inLanguage: lang,
    datePublished: pubDate,
    dateModified: modDate,
    author: {
      "@type": "Organization",
      name: "Fijas y Picas",
      url: "https://fijasypicas.jhairparis.com",
    },
    publisher: {
      "@type": "Organization",
      name: "Fijas y Picas",
      url: "https://fijasypicas.jhairparis.com",
      logo: {
        "@type": "ImageObject",
        url: "https://fijasypicas.jhairparis.com/logo.svg",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
  };
}

export function generateBreadcrumbSchema(
  breadcrumbs: Array<{ name: string; url: string }>
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbs.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function generateOrganizationSchema(baseUrl: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Fijas y Picas",
    url: baseUrl,
    logo: `${baseUrl}/logo.svg`,
    description: "Classic logic and deduction game online",
    sameAs: [
      // Add social media links when available
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      availableLanguage: ["Spanish", "English", "French"],
    },
  };
}

// New function for FAQ Schema (recommended for 2025)
export function generateFAQSchema(
  faqs: Array<{ question: string; answer: string }>
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map(faq => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

// New function for HowTo Schema (great for tutorial pages)
export function generateHowToSchema(
  name: string,
  description: string,
  steps: Array<{ name: string; text: string }>,
  lang: Locale
) {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: name,
    description: description,
    inLanguage: lang,
    step: steps.map((step, index) => ({
      "@type": "HowToStep",
      position: index + 1,
      name: step.name,
      text: step.text,
    })),
    totalTime: "PT5M", // 5 minutes estimated
    supply: [], // No supplies needed
    tool: ["Web Browser"],
  };
}
