import React from 'react';
import { Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';

export function Footer() {
  const socialMedia = [
    { icon: Facebook, label: 'Facebook' },
    { icon: Twitter, label: 'Twitter' },
    { icon: Linkedin, label: 'LinkedIn' },
    { icon: Instagram, label: 'Instagram' },
  ];

  return (
    <footer
      role="contentinfo"
      style={{
        background: 'rgba(10, 14, 26, 0.95)',
        borderTop: '1px solid var(--color-border)',
        padding: 'var(--space-9) var(--space-5) var(--space-6)',
        marginTop: 'auto',
      }}
    >
      <div
        style={{
          maxWidth: 'var(--container-max-desktop)',
          margin: '0 auto',
        }}
      >
        {/* Footer Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: 'var(--space-8)',
            marginBottom: 'var(--space-8)',
          }}
        >
          {/* Company Info */}
          <div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--space-2)',
                marginBottom: 'var(--space-4)',
              }}
            >
              <div
                style={{
                  width: '40px',
                  height: '40px',
                  background: 'var(--btn-primary-bg)',
                  borderRadius: 'var(--radius-md)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 700,
                  color: 'var(--btn-primary-fg)',
                }}
                aria-hidden="true"
              >
                CC
              </div>
              <span
                style={{
                  fontSize: '1.25rem',
                  fontWeight: 700,
                  color: 'var(--color-text)',
                }}
              >
                CareConnect
              </span>
            </div>
            <p
              style={{
                color: 'var(--color-text-muted)',
                fontSize: 'var(--font-size-body)',
                lineHeight: 'var(--line-height-base)',
                marginBottom: 'var(--space-4)',
              }}
            >
              Transforming healthcare through technology and compassion.
            </p>
            <nav aria-label="Social media links">
              <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
                {socialMedia.map(({ icon: Icon, label }, index) => (
                  <a
                    key={index}
                    href="#"
                    style={{
                      width: '40px',
                      height: '40px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      background: 'var(--color-surface)',
                      border: '1px solid var(--color-border)',
                      borderRadius: 'var(--radius-md)',
                      color: 'var(--color-text)',
                      transition: `all var(--duration-fast) var(--ease-standard)`,
                      textDecoration: 'none',
                      outline: 'none',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'var(--btn-primary-bg)';
                      e.currentTarget.style.transform = 'translateY(-2px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'var(--color-surface)';
                      e.currentTarget.style.transform = 'translateY(0)';
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.outline = '2px solid var(--color-brand-primary)';
                      e.currentTarget.style.outlineOffset = '2px';
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.outline = 'none';
                    }}
                    aria-label={`Visit our ${label} page`}
                  >
                    <Icon size={20} aria-hidden="true" />
                  </a>
                ))}
              </div>
            </nav>
          </div>

          {/* Quick Links */}
          <nav aria-labelledby="footer-quick-links">
            <h3
              id="footer-quick-links"
              style={{
                color: 'var(--color-text)',
                fontSize: 'var(--font-size-body)',
                fontWeight: 700,
                marginBottom: 'var(--space-4)',
              }}
            >
              Quick Links
            </h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {['About Us', 'Features', 'Pricing', 'Careers', 'Blog'].map((link) => (
                <li key={link} style={{ marginBottom: 'var(--space-3)' }}>
                  <a
                    href={`#${link.toLowerCase().replace(' ', '-')}`}
                    style={{
                      color: 'var(--color-text-muted)',
                      textDecoration: 'none',
                      fontSize: 'var(--font-size-body)',
                      transition: `color var(--duration-fast) var(--ease-standard)`,
                      outline: 'none',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = 'var(--color-brand-primary)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = 'var(--color-text-muted)';
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.color = 'var(--color-brand-primary)';
                      e.currentTarget.style.textDecoration = 'underline';
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.color = 'var(--color-text-muted)';
                      e.currentTarget.style.textDecoration = 'none';
                    }}
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Resources */}
          <nav aria-labelledby="footer-resources">
            <h3
              id="footer-resources"
              style={{
                color: 'var(--color-text)',
                fontSize: 'var(--font-size-body)',
                fontWeight: 700,
                marginBottom: 'var(--space-4)',
              }}
            >
              Resources
            </h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {['Help Center', 'Documentation', 'Downloads', 'API Reference', 'Privacy Policy'].map(
                (link) => (
                  <li key={link} style={{ marginBottom: 'var(--space-3)' }}>
                    <a
                      href={`#${link.toLowerCase().replace(' ', '-')}`}
                      style={{
                        color: 'var(--color-text-muted)',
                        textDecoration: 'none',
                        fontSize: 'var(--font-size-body)',
                        transition: `color var(--duration-fast) var(--ease-standard)`,
                        outline: 'none',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = 'var(--color-brand-primary)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = 'var(--color-text-muted)';
                      }}
                      onFocus={(e) => {
                        e.currentTarget.style.color = 'var(--color-brand-primary)';
                        e.currentTarget.style.textDecoration = 'underline';
                      }}
                      onBlur={(e) => {
                        e.currentTarget.style.color = 'var(--color-text-muted)';
                        e.currentTarget.style.textDecoration = 'none';
                      }}
                    >
                      {link}
                    </a>
                  </li>
                )
              )}
            </ul>
          </nav>

          {/* Contact */}
          <div>
            <h3
              id="footer-contact"
              style={{
                color: 'var(--color-text)',
                fontSize: 'var(--font-size-body)',
                fontWeight: 700,
                marginBottom: 'var(--space-4)',
              }}
            >
              Contact
            </h3>
            <address style={{ fontStyle: 'normal' }}>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                <li
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: 'var(--space-3)',
                    marginBottom: 'var(--space-3)',
                  }}
                >
                  <Mail size={20} style={{ color: 'var(--color-brand-primary)', flexShrink: 0 }} aria-hidden="true" />
                  <a
                    href="mailto:support@careconnect.com"
                    style={{
                      color: 'var(--color-text-muted)',
                      fontSize: 'var(--font-size-body)',
                      textDecoration: 'none',
                      outline: 'none',
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.color = 'var(--color-brand-primary)';
                      e.currentTarget.style.textDecoration = 'underline';
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.color = 'var(--color-text-muted)';
                      e.currentTarget.style.textDecoration = 'none';
                    }}
                  >
                    support@careconnect.com
                  </a>
                </li>
                <li
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: 'var(--space-3)',
                    marginBottom: 'var(--space-3)',
                  }}
                >
                  <Phone size={20} style={{ color: 'var(--color-brand-primary)', flexShrink: 0 }} aria-hidden="true" />
                  <a
                    href="tel:1-800-227-3435"
                    style={{
                      color: 'var(--color-text-muted)',
                      fontSize: 'var(--font-size-body)',
                      textDecoration: 'none',
                      outline: 'none',
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.color = 'var(--color-brand-primary)';
                      e.currentTarget.style.textDecoration = 'underline';
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.color = 'var(--color-text-muted)';
                      e.currentTarget.style.textDecoration = 'none';
                    }}
                  >
                    1-800-CARE-HELP
                  </a>
                </li>
                <li
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: 'var(--space-3)',
                  }}
                >
                  <MapPin size={20} style={{ color: 'var(--color-brand-primary)', flexShrink: 0 }} aria-hidden="true" />
                  <span style={{ color: 'var(--color-text-muted)', fontSize: 'var(--font-size-body)' }}>
                    123 Healthcare Ave
                    <br />
                    San Francisco, CA 94103
                  </span>
                </li>
              </ul>
            </address>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          style={{
            paddingTop: 'var(--space-6)',
            borderTop: '1px solid var(--color-border)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 'var(--space-4)',
          }}
        >
          <p
            style={{
              color: 'var(--color-text-muted)',
              fontSize: 'var(--font-size-small)',
              margin: 0,
            }}
          >
            © 2025 CareConnect. All rights reserved.
          </p>
          <nav aria-label="Legal and policy links">
            <div style={{ display: 'flex', gap: 'var(--space-4)', flexWrap: 'wrap' }}>
              {['Privacy', 'Terms', 'Cookies', 'Accessibility'].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  style={{
                    color: 'var(--color-text-muted)',
                    fontSize: 'var(--font-size-small)',
                    textDecoration: 'none',
                    transition: `color var(--duration-fast) var(--ease-standard)`,
                    outline: 'none',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = 'var(--color-brand-primary)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = 'var(--color-text-muted)';
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.color = 'var(--color-brand-primary)';
                    e.currentTarget.style.textDecoration = 'underline';
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.color = 'var(--color-text-muted)';
                    e.currentTarget.style.textDecoration = 'none';
                  }}
                >
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
