import React from "react";
import { Link } from "react-router-dom";

const Footer: React.FC = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <div className="footer-main">
        <div className="container footer-grid">
          <div className="footer-brand">
            <span className="footer-logo-text">TylerBuilds</span>
            <p className="footer-tagline">Custom automation and AI solutions for mid-sized businesses.</p>
          </div>

          <nav className="footer-nav" aria-label="Footer">
            <span className="footer-nav-heading">Pages</span>
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
            <Link to="/projects">Projects</Link>
            <Link to="/guides">Guides</Link>
            <Link to="/contact">Contact</Link>
          </nav>

          <div className="footer-connect">
            <span className="footer-nav-heading">Connect</span>
            <a href="mailto:info@tylerbuilds.net">info@tylerbuilds.net</a>
            <a href="https://portfolio.tylerbuilds.net" target="_blank" rel="noreferrer">Developer Portfolio</a>
            <a href="https://github.com/tylerbuilds-official" target="_blank" rel="noreferrer">GitHub</a>
            <a href="https://www.linkedin.com/in/tyler-emery-15a612396/" target="_blank" rel="noreferrer">LinkedIn</a>
          </div>
        </div>
      </div>

      <div className="footer-bottom-bar">
        <div className="container footer-bottom">
          <p>&copy; {year} TylerBuilds. All rights reserved.</p>
          <p>Spokane, WA</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
