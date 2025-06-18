import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LanguageProvider from "@/components/LanguageProvider";
import { getDictionary } from "@/lib/getDictionary";
import { locales, type Locale } from "@/lib/i18n";
import {
  generateWebsiteSchema,
  generateOrganizationSchema,
} from "@/lib/structured-data";

// Generar parámetros estáticos para todos los locales
export async function generateStaticParams() {
  return locales.map(lang => ({ lang }));
}

// Generar metadata dinámica basada en el locale
export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  const baseUrl = "https://fijasypicas.jhairparis.com";

  const localeMap = {
    es: "es_ES",
    en: "en_US",
    fr: "fr_FR",
  };

  return {
    title: dict.metadata.title,
    description: dict.metadata.description,
    alternates: {
      canonical: lang === "es" ? baseUrl : `${baseUrl}/${lang}`,
      languages: {
        es: baseUrl,
        en: `${baseUrl}/en`,
        fr: `${baseUrl}/fr`,
        "x-default": baseUrl, // Español como idioma por defecto
      },
    },
    openGraph: {
      title: dict.metadata.title,
      description: dict.metadata.description,
      url: lang === "es" ? baseUrl : `${baseUrl}/${lang}`,
      siteName: dict.metadata.openGraph.siteName,
      locale: localeMap[lang],
      type: "website",
      images: [
        {
          url: `${baseUrl}/images/hero-image.png`,
          width: 1200,
          height: 630,
          alt: dict.metadata.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: dict.metadata.title,
      description: dict.metadata.description,
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
  };
}

type LanguageLayoutProps = Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang: Locale }>;
}>;

export default async function LanguageLayout({
  children,
  params,
}: LanguageLayoutProps) {
  const { lang } = await params;

  // Validar que el locale sea válido
  if (!locales.includes(lang)) {
    return <div>Locale no válido</div>;
  }

  // Obtener el diccionario
  const dict = await getDictionary(lang);
  const baseUrl = "https://fijasypicas.jhairparis.com";

  // Generar structured data
  const websiteSchema = generateWebsiteSchema(lang, dict, baseUrl);
  const organizationSchema = generateOrganizationSchema(baseUrl);

  return (
    <LanguageProvider lang={lang}>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema),
        }}
      />

      <Header lang={lang} dict={dict} />
      <main className="flex-grow pt-20">{children}</main>
      <Footer lang={lang} dict={dict} />
    </LanguageProvider>
  );
}
