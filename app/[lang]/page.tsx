import HeroHome from "@/components/HeroHome";
import GameInfo from "@/components/GameInfo";
import Features from "@/components/Features";
import History from "@/components/History";
import Banner from "@/components/Banner";
import { getDictionary } from "@/lib/getDictionary";
import type { Locale } from "@/lib/i18n";

interface PageProps {
  params: Promise<{ lang: Locale }>;
}

export default async function Page({ params }: PageProps) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return (
    <div className="relative overflow-hidden">
      <div className="fixed inset-0 bg-gradient-to-b from-orange-50 to-amber-50 pointer-events-none -z-10" />

      <HeroHome dict={dict} lang={lang} />
      <GameInfo dict={dict} lang={lang} />
      <Features dict={dict} />
      <History dict={dict} lang={lang} />
      <Banner dict={dict} lang={lang} />
    </div>
  );
}
