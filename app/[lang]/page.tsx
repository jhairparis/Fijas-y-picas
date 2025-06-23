import HeroHome from "@/features/home/components/HeroHome";
import GameInfo from "@/features/home/components/GameInfo";
import Features from "@/features/home/components/Features";
import History from "@/features/home/components/History";
import Banner from "@/features/home/components/Banner";
import { getDictionary } from "@/lib/dictionary";
import type { Locale } from "@/lib/i18n";
import { Metadata } from "next";
import GenMetadata from "@/lib/generate-metadata";

interface PageProps {
  params: Promise<{ lang: Locale }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return GenMetadata(dict, lang, "/");
}

export default async function Page({ params }: PageProps) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return (
    <div className="relative overflow-hidden">
      <span className="fixed inset-0 bg-gradient-to-b from-orange-50 to-amber-50 pointer-events-none -z-10" />

      <HeroHome dict={dict} lang={lang} />
      <GameInfo dict={dict} lang={lang} />
      <Features dict={dict} />
      <History dict={dict} lang={lang} />
      <Banner dict={dict} lang={lang} />
    </div>
  );
}
