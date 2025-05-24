import React from 'react';
import './Footer.css';
import { FaInstagram, FaPinterestP, FaWhatsapp } from 'react-icons/fa';

const footerLinks = [
  // { label: '', href: '#company' },
  { label: 'Products', href: '#product' },
  { label: 'Apply ', href: '#apply' },
  { label: 'About Us', href: '#about-us' },
  { label: 'Contact Us', href: '#contact-us' },
];

const socialLinks = [
  // { icon: FaInstagram, href: 'https://instagram.com', label: 'Instagram' },
  // { icon: FaPinterestP, href: 'https://pinterest.com', label: 'Pinterest' },
  { icon: FaWhatsapp, href: 'https://whatsapp.com', label: 'WhatsApp' },
];

export const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">

        <div className="footer-logo-section" aria-label="Brand name">
          <h2 className="footer-brand-name">CampusMarket</h2>
        </div>

        <nav className="footer-nav" aria-label="Footer navigation">
          <ul className="footer-links">
            {footerLinks.map(({ label, href }) => (
              <li key={label}>
                <a href={href} className="footer-link">{label}</a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="footer-social-icons" aria-label="Social media links">
          {socialLinks.map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="footer-icon-link"
            >
              <Icon size={24} />
            </a>
          ))}
        </div>

      </div>

      <div className="footer-copy-right">
        <hr />
        <p>© {new Date().getFullYear()} Black-end Blue. All rights reserved.</p>
      </div>
    </footer>
  );
};
