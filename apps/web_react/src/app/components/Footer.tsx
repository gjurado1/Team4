import React from 'react';
import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone, Twitter } from 'lucide-react';

const socialMedia = [
  { icon: Facebook, label: 'Facebook' },
  { icon: Twitter, label: 'Twitter' },
  { icon: Linkedin, label: 'LinkedIn' },
  { icon: Instagram, label: 'Instagram' },
];

const quickLinks = ['About Us', 'Features', 'Pricing', 'Careers', 'Blog'];
const resourceLinks = ['Help Center', 'Documentation', 'Downloads', 'API Reference', 'Privacy Policy'];
const legalLinks = ['Privacy', 'Terms', 'Cookies', 'Accessibility'];

export function Footer() {
  return (
    <footer role="contentinfo" className="site-footer">
      <div className="site-footer__inner">
        <div className="site-footer__grid">
          <div>
            <div className="site-footer__brand">
              <div className="site-footer__brand-mark" aria-hidden="true">
                CC
              </div>
              <span className="site-footer__brand-text">CareConnect</span>
            </div>

            <p className="site-footer__copy">
              Transforming healthcare through technology and compassion.
            </p>

            <nav aria-label="Social media links">
              <div className="site-footer__socials">
                {socialMedia.map(({ icon: Icon, label }) => (
                  <a
                    key={label}
                    href="#"
                    className="site-footer__social-link"
                    aria-label={`Visit our ${label} page`}
                  >
                    <Icon className="cc-icon cc-icon--md" aria-hidden="true" />
                  </a>
                ))}
              </div>
            </nav>
          </div>

          <nav aria-labelledby="footer-quick-links">
            <h3 id="footer-quick-links" className="site-footer__heading">
              Quick Links
            </h3>
            <ul className="site-footer__list">
              {quickLinks.map((link) => (
                <li key={link}>
                  <a href={`#${link.toLowerCase().replace(/\s+/g, '-')}`} className="site-footer__link">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-labelledby="footer-resources">
            <h3 id="footer-resources" className="site-footer__heading">
              Resources
            </h3>
            <ul className="site-footer__list">
              {resourceLinks.map((link) => (
                <li key={link}>
                  <a href={`#${link.toLowerCase().replace(/\s+/g, '-')}`} className="site-footer__link">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h3 className="site-footer__heading">Contact</h3>
            <address className="site-footer__address">
              <ul className="site-footer__contact-list">
                <li className="site-footer__contact-row">
                  <Mail className="site-footer__contact-icon cc-icon cc-icon--md" aria-hidden="true" />
                  <a href="mailto:support@careconnect.com" className="site-footer__contact-link">
                    support@careconnect.com
                  </a>
                </li>
                <li className="site-footer__contact-row">
                  <Phone className="site-footer__contact-icon cc-icon cc-icon--md" aria-hidden="true" />
                  <a href="tel:1-800-227-3435" className="site-footer__contact-link">
                    1-800-CARE-HELP
                  </a>
                </li>
                <li className="site-footer__contact-row">
                  <MapPin className="site-footer__contact-icon cc-icon cc-icon--md" aria-hidden="true" />
                  <span>
                    123 Healthcare Ave
                    <br />
                    San Francisco, CA 94103
                  </span>
                </li>
              </ul>
            </address>
          </div>
        </div>

        <div className="site-footer__bottom">
          <p className="site-footer__copyright">Copyright 2025 CareConnect. All rights reserved.</p>

          <nav aria-label="Legal and policy links">
            <div className="site-footer__meta">
              {legalLinks.map((item) => (
                <a key={item} href={`#${item.toLowerCase()}`} className="site-footer__link">
                  {item}
                </a>
              ))}
            </div>
          </nav>
        </div>
      </div>
    </footer>
  );
}
