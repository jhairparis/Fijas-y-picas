import type { Metadata } from "next";
import { getDictionary } from "@/lib/dictionary";
import type { Locale } from "@/lib/i18n";
import FAQContent from "@/features/content/components/FAQContent";
import { generateArticleMetadata } from "@/lib/generate-metadata";
import { generateFAQSchema } from "@/lib/structured-data";

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

  const faqs: { question: string; answer: string }[] = [];

  if (dict.faq) {
    for (const key of Object.keys(dict.faq)) {
      if (key !== "title" && key !== "subtitle" && key !== "description") {
        const value = dict.faq[key as keyof typeof dict.faq];

        if (
          typeof value === "object" &&
          value !== null &&
          typeof value.question === "string" &&
          typeof value.answer === "string"
        ) {
          faqs.push({
            question: value.question,
            answer: value.answer,
          });
        }
      }
    }
  }

  const faqSchema = generateFAQSchema(lang, dict, faqs, `/faq`);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema),
        }}
      />
      <FAQContent lang={lang} dict={dict} faqData={faqs} />
    </>
  );
}
