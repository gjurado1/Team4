import React from 'react';
import { BookOpen, Video, FileText, Download, ExternalLink } from 'lucide-react';

interface Resource {
  icon: React.ReactNode;
  title: string;
  description: string;
  type: string;
  link: string;
}

const resources: Resource[] = [
  {
    icon: <BookOpen size={28} />,
    title: 'Getting Started Guide',
    description: 'Learn the basics of CareConnect and how to set up your account in minutes.',
    type: 'Guide',
    link: '#',
  },
  {
    icon: <Video size={28} />,
    title: 'Video Tutorials',
    description: 'Watch step-by-step tutorials on using key features and best practices.',
    type: 'Video',
    link: '#',
  },
  {
    icon: <FileText size={28} />,
    title: 'Documentation',
    description: 'Complete technical documentation and API reference for developers.',
    type: 'Docs',
    link: '#',
  },
  {
    icon: <Download size={28} />,
    title: 'Mobile Apps',
    description: 'Download our iOS and Android apps for healthcare on the go.',
    type: 'Apps',
    link: '#',
  },
  {
    icon: <BookOpen size={28} />,
    title: 'Care Best Practices',
    description: 'Expert advice on caregiving, health management, and wellness tips.',
    type: 'Articles',
    link: '#',
  },
  {
    icon: <FileText size={28} />,
    title: 'Compliance & Security',
    description: 'Learn about our HIPAA compliance, security measures, and privacy policies.',
    type: 'Legal',
    link: '#',
  },
];

export function ResourcesSection() {
  return (
    <section
      id="resources"
      aria-labelledby="resources-heading"
      style={{
        padding: 'var(--space-10) var(--space-5)',
        background: 'var(--color-bg)',
      }}
    >
      <div
        style={{
          maxWidth: 'var(--container-max-desktop)',
          margin: '0 auto',
        }}
      >
        {/* Section Header */}
        <div
          style={{
            textAlign: 'center',
            marginBottom: 'var(--space-9)',
          }}
        >
          <div
            style={{
              display: 'inline-block',
              padding: 'var(--space-2) var(--space-4)',
              background: 'var(--color-surface)',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-full)',
              marginBottom: 'var(--space-4)',
              fontSize: 'var(--font-size-small)',
              color: 'var(--color-brand-primary)',
              fontWeight: 600,
              letterSpacing: 'var(--letter-spacing-wide)',
              textTransform: 'uppercase',
            }}
          >
            Resources
          </div>

          <h2
            id="resources-heading"
            style={{
              fontSize: 'var(--font-size-h1)',
              fontWeight: 800,
              color: 'var(--color-text)',
              marginBottom: 'var(--space-4)',
              lineHeight: 'var(--line-height-tight)',
            }}
          >
            Everything You Need
            <br />
            to Get Started
          </h2>

          <p
            style={{
              fontSize: 'var(--font-size-h3)',
              color: 'var(--color-text-muted)',
              maxWidth: '600px',
              margin: '0 auto',
              lineHeight: 'var(--line-height-base)',
            }}
          >
            Explore our comprehensive library of guides, tutorials, and documentation.
          </p>
        </div>

        {/* Resources Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: 'var(--space-6)',
          }}
          role="list"
        >
          {resources.map((resource, index) => (
            <a
              key={index}
              href={resource.link}
              role="listitem"
              style={{
                padding: 'var(--space-6)',
                background: 'var(--card-bg)',
                border: '1px solid var(--card-border)',
                borderRadius: 'var(--radius-xl)',
                textDecoration: 'none',
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--space-4)',
                transition: `all var(--duration-medium) var(--ease-standard)`,
                cursor: 'pointer',
                position: 'relative',
                outline: 'none',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'var(--card-hover-bg)';
                e.currentTarget.style.borderColor = 'var(--card-hover-border)';
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = 'var(--shadow-lg)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'var(--card-bg)';
                e.currentTarget.style.borderColor = 'var(--card-border)';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
              onFocus={(e) => {
                e.currentTarget.style.outline = '3px solid var(--color-brand-primary)';
                e.currentTarget.style.outlineOffset = '2px';
              }}
              onBlur={(e) => {
                e.currentTarget.style.outline = 'none';
              }}
              aria-label={`${resource.title}: ${resource.description}`}
            >
              {/* Type Badge */}
              <div
                style={{
                  position: 'absolute',
                  top: 'var(--space-4)',
                  right: 'var(--space-4)',
                  padding: 'var(--space-1) var(--space-3)',
                  background: 'rgba(59, 130, 246, 0.15)',
                  border: '1px solid rgba(59, 130, 246, 0.3)',
                  borderRadius: 'var(--radius-full)',
                  fontSize: 'var(--font-size-small)',
                  color: 'var(--color-brand-primary)',
                  fontWeight: 600,
                }}
                aria-label={`Resource type: ${resource.type}`}
              >
                {resource.type}
              </div>

              <div
                style={{
                  width: '56px',
                  height: '56px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'var(--btn-primary-bg)',
                  borderRadius: 'var(--radius-lg)',
                  color: 'var(--btn-primary-fg)',
                }}
                aria-hidden="true"
              >
                {resource.icon}
              </div>

              <div>
                <h3
                  style={{
                    fontSize: 'var(--font-size-h3)',
                    fontWeight: 700,
                    color: 'var(--color-text)',
                    marginBottom: 'var(--space-2)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 'var(--space-2)',
                  }}
                >
                  {resource.title}
                  <ExternalLink size={16} style={{ color: 'var(--color-text-muted)' }} aria-hidden="true" />
                </h3>

                <p
                  style={{
                    fontSize: 'var(--font-size-body)',
                    color: 'var(--color-text-muted)',
                    lineHeight: 'var(--line-height-base)',
                  }}
                >
                  {resource.description}
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
