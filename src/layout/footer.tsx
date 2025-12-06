import React from "react";

const Footer: React.FC = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <p>© {year} Tyler Builds. All rights reserved.</p>
        <div className="socials">
          <a href="https://github.com/tylerbuilds" target="_blank" rel="noreferrer">GitHub</a>
          <a href="https://www.linkedin.com/in/tylerbuilds" target="_blank" rel="noreferrer">LinkedIn</a>
          <a href="mailto:hello@tylerbuilds.net">Email</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
