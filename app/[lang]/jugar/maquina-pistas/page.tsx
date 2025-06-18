import type { Metadata } from "next";
import { getDictionary } from "@/lib/dictionary";
import GameMode from "@/components/game/GameMode";
import type { Locale } from "@/lib/i18n";
import { generateGamePageMetadata } from "@/lib/generate-metadata";
import { generateGameSchema } from "@/lib/structured-data";

interface PageProps {
  params: Promise<{ lang: Locale }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { lang } = await params;

  const dict = await getDictionary(lang);

  return generateGamePageMetadata(
    dict,
    lang,
    "/jugar/maquina-pistas",
    "maquinaPistas"
  );
}

export default async function MaquinaPistasPage({ params }: PageProps) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  const currentMeta = dict.metadata.pages.maquinaPistas;

  const gameSchema = generateGameSchema(
    currentMeta.title,
    currentMeta.description,
    "/jugar/maquina-pistas",
    lang,
    "maquinaPistas"
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
