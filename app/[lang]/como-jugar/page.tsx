import React from "react";
import type { Metadata } from "next";
import { getDictionary } from "@/lib/getDictionary";
import type { Locale } from "@/lib/i18n";
import ComoJugarContent from "@/components/ComoJugarContent";
import { generateArticleMetadataFromDict } from "@/lib/metadata-dict-utils";
import { generateArticleSchema } from "@/lib/structured-data";

interface PageProps {
  params: Promise<{ lang: Locale }>;
}

// Generar metadata para la página Como Jugar
export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  return generateArticleMetadataFromDict(
    dict,
    lang,
    "/como-jugar",
    "comoJugar"
  );
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
