import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => setMobileMenuOpen(!isMobileMenuOpen);

  return (
    <header className="navbar">
      <div className="container">
        {/* Logo */}
        <h1>CampusMarket</h1>

        {/* Navigation Links */}
        <nav className={`nav-links ${isMobileMenuOpen ? "active" : ""}`}>
          <Link to="/" onClick={() => setMobileMenuOpen(false)}>Home</Link> {/* ✅ Home link added */}
          <a href="/producthome" onClick={() => setMobileMenuOpen(false)}>Features</a>
          <a href="" onClick={() => setMobileMenuOpen(false)}>Join</a>
          <a href="#contact" onClick={() => setMobileMenuOpen(false)}>Contact</a>
        </nav>

        {/* Right side container: Cart + Mobile Menu Button */}
        <div className="right-items">
          <Link
            to="/cart"
            className="cart-link"
            onClick={() => setMobileMenuOpen(false)}
          >
            🛒 Cart
          </Link>

          <button
            className="mobile-menu-btn"
            onClick={toggleMobileMenu}
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? "✖" : "☰"}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
