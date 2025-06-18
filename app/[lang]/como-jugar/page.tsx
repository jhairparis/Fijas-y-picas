import type { Metadata } from "next";
import { getDictionary } from "@/lib/dictionary";
import type { Locale } from "@/lib/i18n";
import ComoJugarContent from "@/components/ComoJugarContent";
import { generateArticleMetadata } from "@/lib/generate-metadata";
import { generateArticleSchema } from "@/lib/structured-data";

interface PageProps {
  params: Promise<{ lang: Locale }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { lang } = await params;

  const dict = await getDictionary(lang);

  return generateArticleMetadata(dict, lang, "/como-jugar", "comoJugar");
}

export default async function ComoJugar({ params }: PageProps) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  const baseUrl = "https://fijasypicas.jhairparis.com";
  const currentMeta = dict.metadata.pages.comoJugar;
  const articleUrl =
    lang === "es" ? `${baseUrl}/como-jugar` : `${baseUrl}/${lang}/como-jugar`;

  // Generate article schema
  const articleSchema = generateArticleSchema(
    currentMeta.title,
    currentMeta.description,
    articleUrl,
    lang
  );

  return (
    <>
      {/* Article JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleSchema),
        }}
      />
      <ComoJugarContent lang={lang} dict={dict} />
    </>
  );
}
