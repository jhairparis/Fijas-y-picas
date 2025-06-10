import Banner from "./components/Banner";
import Features from "./components/Features";
import HeroHome from "./components/HeroHome";
import Newsletter from "./components/Newsletter";

export default function Page() {
  return (
    <>
      <HeroHome />
      <Features />
      <Banner />
      <Newsletter />
    </>
  );
}
