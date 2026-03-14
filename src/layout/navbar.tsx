import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import logoUrl from "../assets/TB_logo.png";

const SunIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="5" />
    <line x1="12" y1="1" x2="12" y2="3" />
    <line x1="12" y1="21" x2="12" y2="23" />
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
    <line x1="1" y1="12" x2="3" y2="12" />
    <line x1="21" y1="12" x2="23" y2="12" />
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
  </svg>
);

const MoonIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
  </svg>
);

const AutoIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
    <line x1="8" y1="21" x2="16" y2="21" />
    <line x1="12" y1="17" x2="12" y2="21" />
  </svg>
);

const LABELS = { auto: "System", light: "Light", dark: "Dark" } as const;

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme, cycle } = useTheme();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  const icon = theme === "light" ? <SunIcon /> : theme === "dark" ? <MoonIcon /> : <AutoIcon />;

  return (
    <header className="navbar">
      <div className="container nav-inner">
        <Link to="/" className="brand" aria-label="Tyler Builds home">
          <img className="brand-logo" src={logoUrl} alt="" aria-hidden="true" />
          <span>TylerBuilds</span>
        </Link>

        {/* Hamburger button - only visible on mobile */}
        <button 
          className="hamburger" 
          onClick={toggleMenu}
          aria-label="Toggle navigation menu"
          aria-expanded={isMenuOpen}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        {/* Navigation links */}
        <nav 
          className={`nav-links ${isMenuOpen ? 'nav-open' : ''}`} 
          aria-label="Primary"
        >
          <NavLink to="/" end className={({ isActive }) => isActive ? "active" : undefined} onClick={closeMenu}>Home</NavLink>
          <NavLink to="/about" className={({ isActive }) => isActive ? "active" : undefined} onClick={closeMenu}>About</NavLink>
          <NavLink to="/projects" className={({ isActive }) => isActive ? "active" : undefined} onClick={closeMenu}>Projects</NavLink>
          <NavLink to="/guides" className={({ isActive }) => isActive ? "active" : undefined} onClick={closeMenu}>Guides</NavLink>
          <NavLink to="/contact" className={({ isActive }) => isActive ? "active" : undefined} onClick={closeMenu}>Contact</NavLink>

          <button
            className="theme-toggle"
            onClick={cycle}
            aria-label={`Theme: ${LABELS[theme]}. Click to switch.`}
            title={LABELS[theme]}
          >
            {icon}
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
