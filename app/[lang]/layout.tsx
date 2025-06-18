import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LanguageProvider from "@/components/LanguageProvider";
import { getDictionary } from "@/lib/dictionary";
import { locales, type Locale } from "@/lib/i18n";
import {
  generateWebsiteSchema,
  generateOrganizationSchema,
} from "@/lib/structured-data";
import GenMetadata from "@/lib/generate-metadata";

interface Props_ {
  params: Promise<{ lang: Locale }>;
}

// Generar parámetros estáticos para todos los locales
export async function generateStaticParams() {
  return locales.map(lang => ({ lang }));
}

export async function generateMetadata({ params }: Props_): Promise<Metadata> {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return GenMetadata(dict, lang, "/");
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
