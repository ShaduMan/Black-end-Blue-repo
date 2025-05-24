import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isDashboardOpen, setDashboardOpen] = useState(false); // New state

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
    setDashboardOpen(false); // Close dashboard when toggling mobile menu
  };

  // Toggle dashboard dropdown on click (for mobile)
  const toggleDashboard = () => setDashboardOpen(!isDashboardOpen);

  return (
    <header className="navbar">
      <div className="container">
        {/* Logo */}
        <h1>CampusMarket</h1>

        {/* Navigation Links */}
        <nav className={`nav-links ${isMobileMenuOpen ? "active" : ""}`}>
          <Link to="/" onClick={() => setMobileMenuOpen(false)}>Home</Link>
          <a href="/producthome" onClick={() => setMobileMenuOpen(false)}>Features</a>
          <a href="" onClick={() => setMobileMenuOpen(false)}>Join</a>
          <a href="#contact" onClick={() => setMobileMenuOpen(false)}>Contact</a>
        </nav>

        {/* Right side container: Cart + Dashboard + Mobile Menu Button */}
        <div className="right-items">
          <Link
            to="/cart"
            className="cart-link"
            onClick={() => setMobileMenuOpen(false)}
          >
            🛒 Cart
          </Link>

          {/* Dashboard dropdown */}
          <div 
            className="dashboard-menu" 
            onClick={toggleDashboard} 
            aria-haspopup="true" 
            aria-expanded={isDashboardOpen}
            tabIndex={0} // for keyboard accessibility
            onKeyDown={e => {
              if (e.key === 'Enter' || e.key === ' ') toggleDashboard();
            }}
          >
            <span className="dashboard-label">Dashboard ▼</span>
            <div className={`dropdown-content ${isDashboardOpen ? "active" : ""}`}>
              <Link to="/dashboard/create" onClick={() => {setMobileMenuOpen(false); setDashboardOpen(false);}}>
                Create Dashboard
              </Link>
              <Link to="/dashboard/view" onClick={() => {setMobileMenuOpen(false); setDashboardOpen(false);}}>
                View Dashboard
              </Link>
            </div>
          </div>

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
