import React from "react";

import HeroHome from "../components/HeroHome";
import Features from "../components/Features";
import Banner from "../components/Banner";

function Home() {
  return (
    <>
      <main className="flex-grow">
        <HeroHome />
        <Features />
      </main>
      <Banner />
    </>
  );
}

export default Home;
