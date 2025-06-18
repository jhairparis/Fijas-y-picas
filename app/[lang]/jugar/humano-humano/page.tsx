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
    "/jugar/humano-humano",
    "humanoHumano"
  );
}

export default async function HumanoHumanoPage({ params }: PageProps) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  const currentMeta = dict.metadata.pages.humanoHumano;

  const gameSchema = generateGameSchema(
    currentMeta.title,
    currentMeta.description,
    "/jugar/humano-humano",
    lang,
    "humanoHumano"
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
