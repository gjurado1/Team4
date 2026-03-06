import React, { useState, useEffect } from 'react';
import { ArrowRight, Activity, Heart, Shield, TrendingUp } from 'lucide-react';

interface HeroSectionProps {
  backgroundImage: string;
}

export function HeroSection({ backgroundImage }: HeroSectionProps) {
  const [selectedMetric, setSelectedMetric] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSelectedMetric((prev) => (prev + 1) % 4);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const metrics = [
    { icon: Activity, label: 'Heart Rate', value: '72', unit: 'BPM', status: 'optimal' },
    { icon: Heart, label: 'Blood Pressure', value: '120/80', unit: 'mmHg', status: 'optimal' },
    { icon: Shield, label: 'Health Score', value: '94', unit: '%', status: 'excellent' },
    { icon: TrendingUp, label: 'Activity', value: '8.5K', unit: 'steps', status: 'active' },
  ];

  return (
    <section
      id="home"
      aria-label="Hero section"
      style={{
        position: 'relative',
        minHeight: 'calc(100vh - var(--header-height))',
        marginTop: 'var(--header-height)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        background: 'var(--color-bg)',
      }}
    >
      {/* Animated Background Grid */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(59, 130, 246, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59, 130, 246, 0.03) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
          opacity: 0.5,
        }}
        aria-hidden="true"
      />

      {/* Gradient Orbs */}
      <div
        style={{
          position: 'absolute',
          top: '10%',
          left: '10%',
          width: '500px',
          height: '500px',
          background: 'radial-gradient(circle, rgba(59, 130, 246, 0.15) 0%, transparent 70%)',
          filter: 'blur(60px)',
          animation: 'float 8s ease-in-out infinite',
        }}
        aria-hidden="true"
      />
      <div
        style={{
          position: 'absolute',
          bottom: '10%',
          right: '10%',
          width: '400px',
          height: '400px',
          background: 'radial-gradient(circle, rgba(139, 92, 246, 0.15) 0%, transparent 70%)',
          filter: 'blur(60px)',
          animation: 'float 10s ease-in-out infinite reverse',
        }}
        aria-hidden="true"
      />

      {/* Main Content */}
      <div
        style={{
          position: 'relative',
          zIndex: 10,
          maxWidth: 'var(--container-max-desktop)',
          margin: '0 auto',
          padding: `var(--space-8) var(--space-5)`,
          width: '100%',
          display: 'grid',
          gridTemplateColumns: '1fr',
          gap: 'var(--space-8)',
          alignItems: 'center',
        }}
        className="hero-grid"
      >
        {/* Left Side - Content */}
        <div style={{ maxWidth: '650px' }}>
          {/* Vertical Label */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 'var(--space-2)',
              marginBottom: 'var(--space-6)',
              animation: 'slideInLeft 0.6s var(--ease-emphasized)',
            }}
          >
            <div
              style={{
                width: '4px',
                height: '24px',
                background: 'var(--btn-primary-bg)',
                borderRadius: 'var(--radius-full)',
              }}
              aria-hidden="true"
            />
            <span
              style={{
                fontSize: 'var(--font-size-small)',
                color: 'var(--color-brand-primary)',
                fontWeight: 700,
                letterSpacing: 'var(--letter-spacing-wide)',
                textTransform: 'uppercase',
              }}
            >
              Next-Gen Healthcare Platform
            </span>
          </div>

          {/* Hero Title */}
          <h1
            style={{
              fontSize: 'clamp(3rem, 8vw, 6rem)',
              fontWeight: 900,
              lineHeight: '1.1',
              letterSpacing: '-0.03em',
              marginBottom: 'var(--space-5)',
              animation: 'slideInLeft 0.8s var(--ease-emphasized)',
            }}
          >
            <span
              style={{
                display: 'block',
                color: 'var(--color-text)',
              }}
            >
              HEALTH
            </span>
            <span
              style={{
                display: 'block',
                background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              REIMAGINED
            </span>
            <span
              style={{
                display: 'block',
                color: 'var(--color-text)',
              }}
            >
              2025
            </span>
          </h1>

          {/* Subtitle */}
          <p
            style={{
              fontSize: 'var(--font-size-h3)',
              color: 'var(--color-text-muted)',
              lineHeight: '1.6',
              marginBottom: 'var(--space-8)',
              animation: 'slideInLeft 1s var(--ease-emphasized)',
            }}
          >
            AI-powered health monitoring with real-time insights.
            <br />
            Your wellness, redefined.
          </p>

          {/* CTA Buttons */}
          <div
            style={{
              display: 'flex',
              gap: 'var(--space-4)',
              flexWrap: 'wrap',
              animation: 'slideInLeft 1.2s var(--ease-emphasized)',
              marginBottom: 'var(--space-8)',
            }}
          >
            <button
              type="button"
              style={{
                padding: 'var(--space-4) var(--space-7)',
                background: 'var(--btn-primary-bg)',
                color: 'var(--btn-primary-fg)',
                border: 'none',
                borderRadius: 'var(--radius-lg)',
                fontSize: 'var(--font-size-body)',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--space-2)',
                transition: `all var(--duration-medium) var(--ease-standard)`,
                boxShadow: '0 0 40px rgba(59, 130, 246, 0.4)',
                outline: 'none',
                letterSpacing: '0.5px',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-3px) scale(1.02)';
                e.currentTarget.style.boxShadow = '0 0 60px rgba(59, 130, 246, 0.6)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                e.currentTarget.style.boxShadow = '0 0 40px rgba(59, 130, 246, 0.4)';
              }}
              onFocus={(e) => {
                e.currentTarget.style.outline = '3px solid rgba(255, 255, 255, 0.6)';
                e.currentTarget.style.outlineOffset = '3px';
              }}
              onBlur={(e) => {
                e.currentTarget.style.outline = 'none';
              }}
              aria-label="Start your journey with CareConnect"
            >
              START YOUR JOURNEY
              <ArrowRight size={20} aria-hidden="true" />
            </button>

            <button
              type="button"
              style={{
                padding: 'var(--space-4) var(--space-7)',
                background: 'transparent',
                color: 'var(--color-text)',
                border: '2px solid rgba(255, 255, 255, 0.2)',
                borderRadius: 'var(--radius-lg)',
                fontSize: 'var(--font-size-body)',
                fontWeight: 700,
                cursor: 'pointer',
                backdropFilter: 'blur(12px)',
                transition: `all var(--duration-medium) var(--ease-standard)`,
                outline: 'none',
                letterSpacing: '0.5px',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.4)';
                e.currentTarget.style.transform = 'translateY(-3px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
              onFocus={(e) => {
                e.currentTarget.style.outline = '3px solid rgba(255, 255, 255, 0.6)';
                e.currentTarget.style.outlineOffset = '3px';
              }}
              onBlur={(e) => {
                e.currentTarget.style.outline = 'none';
              }}
              aria-label="Watch demo video"
            >
              WATCH DEMO
            </button>
          </div>

          {/* Quick Stats */}
          <div
            style={{
              display: 'flex',
              gap: 'var(--space-6)',
              flexWrap: 'wrap',
              animation: 'slideInLeft 1.4s var(--ease-emphasized)',
            }}
          >
            {['50K+ Users', '99.9% Uptime', '24/7 Support'].map((stat, index) => (
              <div key={index} style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                <div
                  style={{
                    width: '8px',
                    height: '8px',
                    background: 'var(--color-brand-primary)',
                    borderRadius: 'var(--radius-full)',
                    boxShadow: '0 0 10px rgba(59, 130, 246, 0.6)',
                  }}
                  aria-hidden="true"
                />
                <span
                  style={{
                    fontSize: 'var(--font-size-small)',
                    color: 'var(--color-text-muted)',
                    fontWeight: 600,
                  }}
                >
                  {stat}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side - Interactive Metrics Display */}
        <div
          style={{
            position: 'relative',
            animation: 'slideInRight 1s var(--ease-emphasized)',
          }}
          className="metrics-container"
        >
          {/* Main Display Card */}
          <div
            style={{
              background: 'rgba(255, 255, 255, 0.03)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: 'var(--radius-xl)',
              padding: 'var(--space-8)',
              backdropFilter: 'blur(20px)',
              boxShadow: '0 25px 50px rgba(0, 0, 0, 0.5)',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {/* Glow effect */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '1px',
                background: 'linear-gradient(90deg, transparent, rgba(59, 130, 246, 0.5), transparent)',
              }}
              aria-hidden="true"
            />

            {/* Metric Selectors */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: 'var(--space-3)',
                marginBottom: 'var(--space-6)',
              }}
              role="tablist"
              aria-label="Health metrics"
            >
              {metrics.map((metric, index) => {
                const Icon = metric.icon;
                return (
                  <button
                    key={index}
                    type="button"
                    role="tab"
                    aria-selected={selectedMetric === index}
                    aria-controls={`metric-panel-${index}`}
                    onClick={() => setSelectedMetric(index)}
                    style={{
                      padding: 'var(--space-3)',
                      background: selectedMetric === index 
                        ? 'rgba(59, 130, 246, 0.15)' 
                        : 'transparent',
                      border: selectedMetric === index 
                        ? '1px solid rgba(59, 130, 246, 0.4)' 
                        : '1px solid rgba(255, 255, 255, 0.1)',
                      borderRadius: 'var(--radius-md)',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 'var(--space-2)',
                      outline: 'none',
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.outline = '2px solid var(--color-brand-primary)';
                      e.currentTarget.style.outlineOffset = '2px';
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.outline = 'none';
                    }}
                  >
                    <Icon 
                      size={16} 
                      style={{ 
                        color: selectedMetric === index 
                          ? 'var(--color-brand-primary)' 
                          : 'var(--color-text-muted)' 
                      }} 
                      aria-hidden="true"
                    />
                    <span
                      style={{
                        fontSize: 'var(--font-size-small)',
                        color: selectedMetric === index 
                          ? 'var(--color-text)' 
                          : 'var(--color-text-muted)',
                        fontWeight: 600,
                      }}
                    >
                      {metric.label}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Main Metric Display */}
            <div
              id={`metric-panel-${selectedMetric}`}
              role="tabpanel"
              style={{
                textAlign: 'center',
                padding: 'var(--space-6) 0',
              }}
            >
              <div
                style={{
                  fontSize: 'clamp(3rem, 10vw, 5rem)',
                  fontWeight: 900,
                  color: 'var(--color-text)',
                  lineHeight: 1,
                  marginBottom: 'var(--space-2)',
                  animation: 'scaleIn 0.4s var(--ease-emphasized)',
                }}
              >
                {metrics[selectedMetric].value}
              </div>
              <div
                style={{
                  fontSize: 'var(--font-size-body)',
                  color: 'var(--color-text-muted)',
                  textTransform: 'uppercase',
                  letterSpacing: '2px',
                  marginBottom: 'var(--space-4)',
                }}
              >
                {metrics[selectedMetric].unit}
              </div>
              <div
                style={{
                  display: 'inline-block',
                  padding: 'var(--space-2) var(--space-4)',
                  background: 'rgba(16, 185, 129, 0.15)',
                  border: '1px solid rgba(16, 185, 129, 0.3)',
                  borderRadius: 'var(--radius-full)',
                  fontSize: 'var(--font-size-small)',
                  color: '#10b981',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                }}
              >
                {metrics[selectedMetric].status}
              </div>
            </div>

            {/* Progress Indicators */}
            <div
              style={{
                display: 'flex',
                gap: 'var(--space-2)',
                justifyContent: 'center',
                marginTop: 'var(--space-6)',
              }}
              aria-hidden="true"
            >
              {metrics.map((_, index) => (
                <div
                  key={index}
                  style={{
                    width: selectedMetric === index ? '24px' : '8px',
                    height: '4px',
                    background: selectedMetric === index 
                      ? 'var(--color-brand-primary)' 
                      : 'rgba(255, 255, 255, 0.2)',
                    borderRadius: 'var(--radius-full)',
                    transition: 'all 0.3s ease',
                  }}
                />
              ))}
            </div>
          </div>

          {/* Floating Mini Cards */}
          <div
            style={{
              position: 'absolute',
              top: '-20px',
              right: '-20px',
              padding: 'var(--space-4)',
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              borderRadius: 'var(--radius-lg)',
              backdropFilter: 'blur(20px)',
              animation: 'float 3s ease-in-out infinite',
            }}
            aria-hidden="true"
          >
            <Activity size={24} style={{ color: 'var(--color-brand-primary)' }} />
          </div>

          <div
            style={{
              position: 'absolute',
              bottom: '-20px',
              left: '-20px',
              padding: 'var(--space-4)',
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              borderRadius: 'var(--radius-lg)',
              backdropFilter: 'blur(20px)',
              animation: 'float 4s ease-in-out infinite reverse',
            }}
            aria-hidden="true"
          >
            <Heart size={24} style={{ color: '#ef4444' }} />
          </div>
        </div>
      </div>

      {/* Vertical Label on Right Edge */}
      <div
        style={{
          position: 'absolute',
          right: 'var(--space-6)',
          top: '50%',
          transform: 'translateY(-50%) rotate(90deg)',
          transformOrigin: 'center',
          fontSize: 'var(--font-size-small)',
          color: 'var(--color-text-muted)',
          fontWeight: 700,
          letterSpacing: '3px',
          textTransform: 'uppercase',
          whiteSpace: 'nowrap',
        }}
        className="vertical-label"
        aria-hidden="true"
      >
        TRUSTED HEALTHCARE INNOVATION
      </div>

      <style>{`
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.8);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @media (min-width: 1024px) {
          .hero-grid {
            grid-template-columns: 1fr 1fr !important;
          }
        }

        @media (max-width: 1023px) {
          .metrics-container {
            max-width: 500px;
            margin: 0 auto;
          }
          .vertical-label {
            display: none;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </section>
  );
}
