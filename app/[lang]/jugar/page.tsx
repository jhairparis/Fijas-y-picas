import React from "react";
import type { Metadata } from "next";
import { getDictionary } from "@/lib/getDictionary";
import type { Locale } from "@/lib/i18n";
import GameContent from "@/components/GameContent";
import { generateGamePageMetadataFromDict } from "@/lib/metadata-dict-utils";
import { generateGameSchema } from "@/lib/structured-data";

interface PageProps {
  params: Promise<{ lang: Locale }>;
}

// Generar metadata para la página Jugar
export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  return generateGamePageMetadataFromDict(dict, lang, "/jugar", "jugar");
}

export default async function Game({ params }: PageProps) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  const baseUrl = "https://fijasypicas.jhairparis.com";
  const currentMeta = dict.metadata.pages.jugar;
  const gameUrl =
    lang === "es" ? `${baseUrl}/jugar` : `${baseUrl}/${lang}/jugar`;

  // Generate game schema for the main game page
  const gameSchema = generateGameSchema(
    currentMeta.title,
    currentMeta.description,
    gameUrl,
    lang
  );

  return (
    <>
      {/* Game page JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(gameSchema),
        }}
      />
      <GameContent lang={lang} dict={dict} />
    </>
  );
}
