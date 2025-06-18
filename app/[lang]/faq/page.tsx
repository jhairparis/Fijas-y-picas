import type { Metadata } from "next";
import { getDictionary } from "@/lib/dictionary";
import type { Locale } from "@/lib/i18n";
import FAQContent from "@/components/FAQContent";
import { generateFAQSchemaFromDictionary } from "@/lib/structured-data";
import { generateArticleMetadata } from "@/lib/generate-metadata";
import { PUBLIC_URL_ } from "@/lib/config";

interface PageProps {
  params: Promise<{ lang: Locale }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return generateArticleMetadata(dict, lang, "/faq", "faq");
}

export default async function PreguntasFrecuentes({ params }: PageProps) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  // Generate FAQ schema from dictionary data
  const faqSchema = generateFAQSchemaFromDictionary(
    dict,
    lang,
    `${PUBLIC_URL_}/${lang}/faq`
  );

  return (
    <>
      {/* FAQ JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema),
        }}
      />
      <FAQContent lang={lang} dict={dict} />
    </>
  );
}
