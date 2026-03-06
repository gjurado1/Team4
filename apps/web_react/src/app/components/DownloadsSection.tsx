import React from 'react';
import { Download, Monitor, Smartphone, Apple, Chrome } from 'lucide-react';

interface DownloadOption {
  platform: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  version: string;
  size: string;
  link: string;
  badge?: string;
}

const downloadOptions: DownloadOption[] = [
  {
    platform: 'Windows',
    icon: <Monitor size={32} />,
    title: 'CareConnect for Windows',
    description: 'Full-featured desktop application for Windows 10 and Windows 11',
    version: 'Version 2.5.1',
    size: '125 MB',
    link: '#',
    badge: 'Most Popular',
  },
  {
    platform: 'macOS',
    icon: <Apple size={32} />,
    title: 'CareConnect for Mac',
    description: 'Native macOS app with Apple Silicon support and seamless integration',
    version: 'Version 2.5.1',
    size: '98 MB',
    link: '#',
  },
  {
    platform: 'iOS',
    icon: <Apple size={32} />,
    title: 'CareConnect for iPhone',
    description: 'Healthcare on the go with iOS 15+ support and Apple Health integration',
    version: 'Version 3.2.0',
    size: '67 MB',
    link: '#',
    badge: 'App Store',
  },
  {
    platform: 'Android',
    icon: <Chrome size={32} />,
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
    <section
      id="downloads"
      aria-labelledby="downloads-heading"
      style={{
        padding: 'var(--space-10) var(--space-5)',
        background: 'var(--color-bg)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background Gradient Orb */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '600px',
          height: '600px',
          background: 'radial-gradient(circle, rgba(59, 130, 246, 0.1) 0%, transparent 70%)',
          filter: 'blur(80px)',
          pointerEvents: 'none',
        }}
        aria-hidden="true"
      />

      <div
        style={{
          maxWidth: 'var(--container-max-desktop)',
          margin: '0 auto',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {/* Section Header */}
        <div
          style={{
            textAlign: 'center',
            marginBottom: 'var(--space-9)',
          }}
        >
          {/* Icon Badge */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '64px',
              height: '64px',
              background: 'rgba(59, 130, 246, 0.15)',
              border: '1px solid rgba(59, 130, 246, 0.3)',
              borderRadius: 'var(--radius-xl)',
              marginBottom: 'var(--space-5)',
            }}
            aria-hidden="true"
          >
            <Download size={32} style={{ color: 'var(--color-brand-primary)' }} />
          </div>

          <h2
            id="downloads-heading"
            style={{
              fontSize: 'var(--font-size-h1)',
              fontWeight: 800,
              color: 'var(--color-text)',
              marginBottom: 'var(--space-4)',
              lineHeight: 'var(--line-height-tight)',
            }}
          >
            Download CareConnect
            <br />
            <span
              style={{
                background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Everywhere You Need It
            </span>
          </h2>

          <p
            style={{
              fontSize: 'var(--font-size-h3)',
              color: 'var(--color-text-muted)',
              maxWidth: '700px',
              margin: '0 auto',
              lineHeight: 'var(--line-height-base)',
            }}
          >
            Access your healthcare platform on any device. Desktop or mobile, we've got you covered.
          </p>
        </div>

        {/* Downloads Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: 'var(--space-6)',
            marginBottom: 'var(--space-10)',
          }}
          role="list"
        >
          {downloadOptions.map((option, index) => (
            <div
              key={index}
              role="listitem"
              style={{
                padding: 'var(--space-7)',
                background: 'var(--card-bg)',
                border: '1px solid var(--card-border)',
                borderRadius: 'var(--radius-xl)',
                backdropFilter: 'blur(20px)',
                transition: 'all var(--duration-medium) var(--ease-standard)',
                position: 'relative',
                overflow: 'hidden',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'var(--card-hover-bg)';
                e.currentTarget.style.borderColor = 'var(--card-hover-border)';
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'var(--card-bg)';
                e.currentTarget.style.borderColor = 'var(--card-border)';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              {/* Badge */}
              {option.badge && (
                <div
                  style={{
                    position: 'absolute',
                    top: 'var(--space-4)',
                    right: 'var(--space-4)',
                    padding: 'var(--space-1) var(--space-3)',
                    background: 'rgba(59, 130, 246, 0.2)',
                    border: '1px solid rgba(59, 130, 246, 0.4)',
                    borderRadius: 'var(--radius-full)',
                    fontSize: 'var(--font-size-small)',
                    color: 'var(--color-brand-primary)',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                  }}
                >
                  {option.badge}
                </div>
              )}

              {/* Icon */}
              <div
                style={{
                  width: '64px',
                  height: '64px',
                  background: 'rgba(59, 130, 246, 0.1)',
                  border: '1px solid rgba(59, 130, 246, 0.2)',
                  borderRadius: 'var(--radius-lg)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: 'var(--space-5)',
                  color: 'var(--color-brand-primary)',
                }}
                aria-hidden="true"
              >
                {option.icon}
              </div>

              {/* Platform Label */}
              <div
                style={{
                  fontSize: 'var(--font-size-small)',
                  color: 'var(--color-brand-primary)',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                  marginBottom: 'var(--space-2)',
                }}
              >
                {option.platform}
              </div>

              {/* Title */}
              <h3
                style={{
                  fontSize: 'var(--font-size-h3)',
                  fontWeight: 700,
                  color: 'var(--color-text)',
                  marginBottom: 'var(--space-3)',
                  lineHeight: 'var(--line-height-tight)',
                }}
              >
                {option.title}
              </h3>

              {/* Description */}
              <p
                style={{
                  fontSize: 'var(--font-size-body)',
                  color: 'var(--color-text-muted)',
                  lineHeight: 'var(--line-height-base)',
                  marginBottom: 'var(--space-5)',
                }}
              >
                {option.description}
              </p>

              {/* Version & Size */}
              <div
                style={{
                  display: 'flex',
                  gap: 'var(--space-4)',
                  marginBottom: 'var(--space-5)',
                  fontSize: 'var(--font-size-small)',
                  color: 'var(--color-text-secondary)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                  <div
                    style={{
                      width: '4px',
                      height: '4px',
                      background: 'var(--color-brand-primary)',
                      borderRadius: 'var(--radius-full)',
                    }}
                    aria-hidden="true"
                  />
                  <span>{option.version}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                  <div
                    style={{
                      width: '4px',
                      height: '4px',
                      background: 'var(--color-brand-primary)',
                      borderRadius: 'var(--radius-full)',
                    }}
                    aria-hidden="true"
                  />
                  <span>{option.size}</span>
                </div>
              </div>

              {/* Download Button */}
              <a
                href={option.link}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 'var(--space-2)',
                  padding: 'var(--space-4) var(--space-6)',
                  background: 'var(--btn-primary-bg)',
                  color: 'var(--btn-primary-fg)',
                  textDecoration: 'none',
                  borderRadius: 'var(--radius-lg)',
                  fontSize: 'var(--font-size-body)',
                  fontWeight: 700,
                  transition: 'all var(--duration-medium) var(--ease-standard)',
                  letterSpacing: '0.5px',
                  textTransform: 'uppercase',
                  outline: 'none',
                }}
                aria-label={`Download CareConnect for ${option.platform}`}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.05)';
                  e.currentTarget.style.boxShadow = '0 0 30px rgba(59, 130, 246, 0.5)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
                onFocus={(e) => {
                  e.currentTarget.style.outline = '3px solid rgba(255, 255, 255, 0.6)';
                  e.currentTarget.style.outlineOffset = '3px';
                }}
                onBlur={(e) => {
                  e.currentTarget.style.outline = 'none';
                }}
              >
                <Download size={20} aria-hidden="true" />
                Download
              </a>
            </div>
          ))}
        </div>

        {/* Additional Info */}
        <div
          style={{
            textAlign: 'center',
            padding: 'var(--space-6)',
            background: 'rgba(59, 130, 246, 0.05)',
            border: '1px solid rgba(59, 130, 246, 0.15)',
            borderRadius: 'var(--radius-xl)',
          }}
        >
          <p
            style={{
              fontSize: 'var(--font-size-body)',
              color: 'var(--color-text-muted)',
              lineHeight: 'var(--line-height-base)',
              marginBottom: 'var(--space-3)',
            }}
          >
            <strong style={{ color: 'var(--color-text)' }}>System Requirements:</strong> All apps require an active internet connection and CareConnect account.
          </p>
          <p
            style={{
              fontSize: 'var(--font-size-small)',
              color: 'var(--color-text-secondary)',
              lineHeight: 'var(--line-height-base)',
            }}
          >
            Windows 10+, macOS 11+, iOS 15+, Android 9+ • Free updates included • HIPAA compliant • End-to-end encryption
          </p>
        </div>
      </div>
    </section>
  );
}
