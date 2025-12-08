import React from "react";

const Footer: React.FC = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <p>© {year} Tyler Builds. All rights reserved.</p>
        <div className="socials">
          <a href="https://github.com/tylerbuilds-official" target="_blank" rel="noreferrer">GitHub</a>
          <a href="https://www.linkedin.com/in/tyler-emery-15a612396/" target="_blank" rel="noreferrer">LinkedIn</a>
          <a href="mailto:info@tylerbuilds.net">Email</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
