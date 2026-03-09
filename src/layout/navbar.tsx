import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import logoUrl from "../assets/TB_logo.png";

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

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
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
