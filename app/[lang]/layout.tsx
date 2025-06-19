import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LanguageProvider from "@/components/LanguageProvider";
import { getDictionary } from "@/lib/dictionary";
import { locales, type Locale } from "@/lib/i18n";
import { generateOrganizationSchema } from "@/lib/structured-data";

type LanguageLayoutProps = Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang: Locale }>;
}>;

// Generar parámetros estáticos para todos los locales
export async function generateStaticParams() {
  return locales.map(lang => ({ lang }));
}

export default async function LanguageLayout({
  children,
  params,
}: LanguageLayoutProps) {
  const { lang } = await params;

  if (!locales.includes(lang)) return <div>Locale no válido</div>;

  const dict = await getDictionary(lang);

  const organizationSchema = generateOrganizationSchema(dict);

  return (
    <LanguageProvider lang={lang}>
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
