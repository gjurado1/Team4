import React from 'react';
import { Activity, Shield, Clock, Users, Heart, Zap } from 'lucide-react';

interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const features: Feature[] = [
  {
    icon: <Activity size={32} />,
    title: 'Real-Time Monitoring',
    description: 'Track vital signs and health metrics with advanced AI-powered analytics and instant alerts.',
  },
  {
    icon: <Shield size={32} />,
    title: 'HIPAA Compliant',
    description: 'Enterprise-grade security ensuring your health data is protected with end-to-end encryption.',
  },
  {
    icon: <Clock size={32} />,
    title: '24/7 Care Access',
    description: 'Connect with healthcare professionals anytime, anywhere with our round-the-clock support.',
  },
  {
    icon: <Users size={32} />,
    title: 'Team Collaboration',
    description: 'Seamlessly coordinate care between family members, caregivers, and medical professionals.',
  },
  {
    icon: <Heart size={32} />,
    title: 'Personalized Care',
    description: 'AI-driven care plans tailored to your unique health needs and lifestyle preferences.',
  },
  {
    icon: <Zap size={32} />,
    title: 'Instant Insights',
    description: 'Get actionable health insights and recommendations powered by machine learning.',
  },
];

export function FeaturesSection() {
  return (
    <section
      id="features"
      aria-labelledby="features-heading"
      style={{
        padding: 'var(--space-10) var(--space-5)',
        background: 'var(--color-bg)',
        position: 'relative',
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
            Features
          </div>
          
          <h2
            id="features-heading"
            style={{
              fontSize: 'var(--font-size-h1)',
              fontWeight: 800,
              color: 'var(--color-text)',
              marginBottom: 'var(--space-4)',
              lineHeight: 'var(--line-height-tight)',
            }}
          >
            Everything You Need for
            <br />
            Better Healthcare
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
            Powerful features designed to transform how you manage health and wellness.
          </p>
        </div>

        {/* Features Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: 'var(--space-6)',
          }}
          role="list"
        >
          {features.map((feature, index) => (
            <article
              key={index}
              role="listitem"
              style={{
                padding: 'var(--space-7)',
                background: 'var(--card-bg)',
                border: '1px solid var(--card-border)',
                borderRadius: 'var(--radius-xl)',
                transition: `all var(--duration-medium) var(--ease-standard)`,
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
            >
              <div
                style={{
                  width: '64px',
                  height: '64px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'var(--btn-primary-bg)',
                  borderRadius: 'var(--radius-lg)',
                  marginBottom: 'var(--space-5)',
                  color: 'var(--btn-primary-fg)',
                  boxShadow: 'var(--shadow-glow)',
                }}
                aria-hidden="true"
              >
                {feature.icon}
              </div>
              
              <h3
                style={{
                  fontSize: 'var(--font-size-h3)',
                  fontWeight: 700,
                  color: 'var(--color-text)',
                  marginBottom: 'var(--space-3)',
                }}
              >
                {feature.title}
              </h3>
              
              <p
                style={{
                  fontSize: 'var(--font-size-body)',
                  color: 'var(--color-text-muted)',
                  lineHeight: 'var(--line-height-base)',
                }}
              >
                {feature.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
