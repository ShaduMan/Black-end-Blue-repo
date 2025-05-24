import React from 'react';
import './Footer.css';

// Import icons from react-icons (you can install it via npm/yarn if not installed)
// npm install react-icons
import { FaInstagram, FaPinterestP, FaWhatsapp } from 'react-icons/fa';

export const Footer = () => {
  return (
    <footer className='footer'>
      <div className="footer-container">

        <div className="footer-logo-section">
          {/* Replace logo image with text or SVG if you want */}
          <h2 className="footer-brand-name">CampusMarket</h2>
        </div>

        <ul className="footer-links">
          <li><a href="#company">Company</a></li>
          <li><a href="#products">Products</a></li>
          <li><a href="#offers">Offers</a></li>
          <li><a href="#about-us">About Us</a></li>
          <li><a href="#contact-us">Contact Us</a></li>
        </ul>

        <div className="footer-social-icons">
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="footer-icon-link">
            <FaInstagram size={24} />
          </a>
          <a href="https://pinterest.com" target="_blank" rel="noopener noreferrer" className="footer-icon-link">
            <FaPinterestP size={24} />
          </a>
          <a href="https://whatsapp.com" target="_blank" rel="noopener noreferrer" className="footer-icon-link">
            <FaWhatsapp size={24} />
          </a>
        </div>

      </div>

      <div className="footer-copy-right">
        <hr />
        <p>© {new Date().getFullYear()} CampusMarket. All rights reserved.</p>
      </div>
    </footer>
  );
};
