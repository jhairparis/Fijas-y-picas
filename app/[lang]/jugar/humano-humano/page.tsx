import type { Metadata } from "next";
import { getDictionary } from "@/lib/dictionary";
import GameMode from "@/features/game/components/GameMode";
import type { Locale } from "@/lib/i18n";
import { generateGamePageMetadata } from "@/lib/generate-metadata";

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

  return <GameMode modo="hvh" dict={dict} lang={lang} />;
}
