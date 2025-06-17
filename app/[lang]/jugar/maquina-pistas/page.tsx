import type { Metadata } from "next";
import { getDictionary } from "@/lib/getDictionary";
import GameMode from "@/components/game/GameMode";
import type { Locale } from "@/lib/i18n";
import { generateGamePageMetadataFromDict } from "@/lib/metadata-dict-utils";
import { generateGameSchema } from "@/lib/structured-data";

// Generar metadata para la página Máquina da Pistas
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
    "/jugar/maquina-pistas",
    "maquinaPistas"
  );
}

// Server component that fetches data and passes to client component
export default async function MaquinaPistasPage({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  const baseUrl = "https://fijasypicas.jhairparis.com";
  const currentMeta = dict.metadata.pages.maquinaPistas;
  const gameUrl =
    lang === "es"
      ? `${baseUrl}/jugar/maquina-pistas`
      : `${baseUrl}/${lang}/jugar/maquina-pistas`;

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
      <GameMode modo="hvm" dict={dict} />
    </>
  );
}
