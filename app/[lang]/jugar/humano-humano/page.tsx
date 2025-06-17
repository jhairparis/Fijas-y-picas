import type { Metadata } from "next";
import { getDictionary } from "@/lib/getDictionary";
import GameMode from "@/components/game/GameMode";
import type { Locale } from "@/lib/i18n";
import { generateGamePageMetadataFromDict } from "@/lib/metadata-dict-utils";
import { generateGameSchema } from "@/lib/structured-data";

// Generar metadata para la página Humano vs Humano
export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  return generateGamePageMetadataFromDict(
    dict,
    lang,
    "/jugar/humano-humano",
    "humanoHumano"
  );
}

// Server component that fetches data and passes to client component
export default async function HumanoHumanoPage({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  const baseUrl = "https://fijasypicas.jhairparis.com";
  const currentMeta = dict.metadata.pages.humanoHumano;
  const gameUrl =
    lang === "es"
      ? `${baseUrl}/jugar/humano-humano`
      : `${baseUrl}/${lang}/jugar/humano-humano`;

  // Generate game schema
  const gameSchema = generateGameSchema(
    currentMeta.title,
    currentMeta.description,
    gameUrl,
    lang
  );

  return (
    <>
      {/* Game-specific JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(gameSchema),
        }}
      />
      <GameMode modo="hvh" dict={dict} />
    </>
  );
}
