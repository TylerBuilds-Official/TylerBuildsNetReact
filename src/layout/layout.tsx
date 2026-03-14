import React, {type PropsWithChildren } from "react";
import Navbar from "./navbar";
import Footer from "./footer";
import useScrollReveal from "../hooks/useScrollReveal";

function Layout({ children }: PropsWithChildren) {
  useScrollReveal();

  return (
    <div className="app-root">
      <Navbar />
      <main className="container" role="main">
        {children}
      </main>
      <Footer />
    </div>
  );
}

export default Layout;
