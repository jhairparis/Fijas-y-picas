import type { Metadata } from "next";
import { getDictionary } from "@/lib/dictionary";
import type { Locale } from "@/lib/i18n";
import GameContent from "@/components/GameContent";
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

  return generateGamePageMetadata(dict, lang, "/jugar", "jugar");
}

export default async function Game({ params }: PageProps) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  const currentMeta = dict.metadata.pages.jugar;

  const gameSchema = generateGameSchema(
    currentMeta.title,
    currentMeta.description,
    "/jugar",
    lang,
    "general"
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
