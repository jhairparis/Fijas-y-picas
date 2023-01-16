import React from "react";
import Footer from "./Footer";
import Header from "./Header";
import { Outlet, useOutlet } from "react-router-dom";
import Home from "../pages/Home";

const Layout = () => {
  const out = useOutlet();

  return (
    <>
      <div className="flex flex-col min-h-screen overflow-hidden">
        <Header />
        {out !== null ? (
          <div className="pt-32">
            <Outlet />
          </div>
        ) : (
          <Home />
        )}
        <Footer />
      </div>
    </>
  );
};

export default Layout;
