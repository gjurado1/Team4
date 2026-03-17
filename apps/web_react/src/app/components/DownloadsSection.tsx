import React from 'react';
import { Apple, Chrome, Download, Monitor } from 'lucide-react';

const downloadOptions = [
  {
    platform: 'Windows',
    icon: Monitor,
    title: 'CareConnect for Windows',
    description: 'Full-featured desktop application for Windows 10 and Windows 11',
    version: 'Version 2.5.1',
    size: '125 MB',
    link: '#',
    badge: 'Most Popular',
  },
  {
    platform: 'macOS',
    icon: Apple,
    title: 'CareConnect for Mac',
    description: 'Native macOS app with Apple Silicon support and seamless integration',
    version: 'Version 2.5.1',
    size: '98 MB',
    link: '#',
  },
  {
    platform: 'iOS',
    icon: Apple,
    title: 'CareConnect for iPhone',
    description: 'Healthcare on the go with iOS 15+ support and Apple Health integration',
    version: 'Version 3.2.0',
    size: '67 MB',
    link: '#',
    badge: 'App Store',
  },
  {
    platform: 'Android',
    icon: Chrome,
    title: 'CareConnect for Android',
    description: 'Optimized for Android 9+ with Google Fit integration and Material Design',
    version: 'Version 3.1.8',
    size: '54 MB',
    link: '#',
    badge: 'Google Play',
  },
];

export function DownloadsSection() {
  return (
    <section id="downloads" aria-labelledby="downloads-heading" className="marketing-section">
      <div className="downloads-section__orb" aria-hidden="true" />

      <div className="marketing-section__inner">
        <div className="marketing-section__header">
          <div className="downloads-section__icon-badge" aria-hidden="true">
            <Download className="cc-icon cc-icon--xl" />
          </div>
          <h2 id="downloads-heading" className="marketing-section__title">
            Download CareConnect
            <br />
            <span className="marketing-section__title-accent">Everywhere You Need It</span>
          </h2>
          <p className="marketing-section__subtitle">
            Access your healthcare platform on any device. Desktop or mobile, we&apos;ve got you covered.
          </p>
        </div>

        <div className="marketing-grid marketing-grid--downloads" role="list">
          {downloadOptions.map((option) => {
            const Icon = option.icon;

            return (
              <article key={option.title} className="marketing-card downloads-card" role="listitem">
                {option.badge ? <div className="downloads-card__badge">{option.badge}</div> : null}

                <div className="marketing-card__icon marketing-card__icon--soft" aria-hidden="true">
                  <Icon className="cc-icon cc-icon--xl" />
                </div>

                <p className="marketing-card__eyebrow">{option.platform}</p>
                <h3 className="marketing-card__title">{option.title}</h3>
                <p className="marketing-card__copy">{option.description}</p>

                <div className="downloads-card__meta">
                  <div className="downloads-card__meta-item">
                    <span className="downloads-card__meta-dot" aria-hidden="true" />
                    <span>{option.version}</span>
                  </div>
                  <div className="downloads-card__meta-item">
                    <span className="downloads-card__meta-dot" aria-hidden="true" />
                    <span>{option.size}</span>
                  </div>
                </div>

                <a
                  href={option.link}
                  className="cc-btn cc-btn--primary downloads-card__button"
                  aria-label={`Download CareConnect for ${option.platform}`}
                >
                  <Download className="cc-icon cc-icon--md" aria-hidden="true" />
                  Download
                </a>
              </article>
            );
          })}
        </div>

        <div className="downloads-section__note">
          <p className="downloads-section__note-text">
            <strong className="downloads-section__note-strong">System Requirements:</strong> All apps require
            an active internet connection and CareConnect account.
          </p>
          <p className="downloads-section__note-meta">
            Windows 10+, macOS 11+, iOS 15+, Android 9+, free updates included, HIPAA compliant,
            end-to-end encryption.
          </p>
        </div>
      </div>
    </section>
  );
}
