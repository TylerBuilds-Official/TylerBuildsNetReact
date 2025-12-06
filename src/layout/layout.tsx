import React, {type PropsWithChildren } from "react";
import Navbar from "./navbar";
import Footer from "./footer";

function Layout({ children }: PropsWithChildren) {
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
