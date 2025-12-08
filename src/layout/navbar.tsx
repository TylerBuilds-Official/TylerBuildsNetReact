import React from "react";
import { Link, NavLink } from "react-router-dom";
import logoUrl from "../assets/TB_logo.svg";

const Navbar: React.FC = () => {
  return (
    <header className="navbar">
      <div className="container nav-inner">
        <Link to="/" className="brand" aria-label="Tyler Builds home">
          <img className="brand-logo" src={logoUrl} alt="" aria-hidden="true" />
          <span>Tyler Builds</span>
        </Link>
        <nav className="nav-links" aria-label="Primary">
          <NavLink to="/" end className={({ isActive }) => isActive ? "active" : undefined}>Home</NavLink>
          <NavLink to="/about" className={({ isActive }) => isActive ? "active" : undefined}>About</NavLink>
          <NavLink to="/projects" className={({ isActive }) => isActive ? "active" : undefined}>Projects</NavLink>
          <NavLink to="/guides" className={({ isActive }) => isActive ? "active" : undefined}>Guides</NavLink>
          <NavLink to="/contact" className={({ isActive }) => isActive ? "active" : undefined}>Contact</NavLink>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
