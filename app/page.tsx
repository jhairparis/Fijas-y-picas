import HeroHome from "@/components/HeroHome";
import GameInfo from "@/components/GameInfo";
import Features from "@/components/Features";
import Banner from "@/components/Banner";

export default function Page() {
  return (
    <div className="relative overflow-hidden">
      <div className="fixed inset-0 bg-gradient-to-b from-orange-50 to-amber-50 pointer-events-none -z-10" />

      <HeroHome />
      <GameInfo />
      <Features />
      <Banner />
    </div>
  );
}
