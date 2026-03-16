import React, {type PropsWithChildren } from "react";
import Navbar from "./navbar";
import Footer from "./footer";
import ChatWidget from "../components/chat/ChatWidget";
import useScrollReveal from "../hooks/useScrollReveal";
import useScrollToTop from "../hooks/useScrollToTop";

function Layout({ children }: PropsWithChildren) {
  useScrollToTop();
  useScrollReveal();

  return (
    <div className="app-root">
      <Navbar />
      <main className="container" role="main">
        {children}
      </main>
      <Footer />
      <ChatWidget />
    </div>
  );
}

export default Layout;
