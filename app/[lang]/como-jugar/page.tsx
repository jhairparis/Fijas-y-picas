import type { Metadata } from "next";
import { getDictionary } from "@/lib/dictionary";
import type { Locale } from "@/lib/i18n";
import ComoJugarContent from "@/features/content/components/ComoJugarContent";
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
  const currentMeta = dict.metadata.pages.comoJugar;

  // Generate article schema
  const articleSchema = generateArticleSchema(
    currentMeta.title,
    currentMeta.description,
    "/como-jugar",
    lang,
    dict
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
