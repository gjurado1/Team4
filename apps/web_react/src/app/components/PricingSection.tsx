import React from 'react';
import { Check, Zap, Shield, Crown } from 'lucide-react';
import { useNavigate } from 'react-router';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';

export function PricingSection() {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth();

  const plans = [
    {
      name: 'Basic',
      icon: Zap,
      price: '0',
      period: 'Forever Free',
      description: 'Perfect for individuals getting started with digital health management',
      features: [
        'Health records storage',
        'Appointment scheduling',
        'Medication reminders',
        'Basic health metrics',
        'Secure messaging',
        'Mobile app access',
      ],
      cta: 'Get Started',
      highlighted: false,
      ariaLabel: 'Basic plan - Free forever',
    },
    {
      name: 'Professional',
      icon: Shield,
      price: '29',
      period: 'per month',
      description: 'Advanced features for comprehensive health monitoring and family care',
      features: [
        'Everything in Basic',
        'Family account sharing (up to 5)',
        'Advanced health analytics',
        'Video consultations',
        'Priority support',
        'Custom health reports',
        'API integrations',
        'Export health data',
      ],
      cta: 'Start Free Trial',
      highlighted: true,
      badge: 'Most Popular',
      ariaLabel: 'Professional plan - $29 per month, most popular',
    },
    {
      name: 'Enterprise',
      icon: Crown,
      price: 'Custom',
      period: 'Contact Sales',
      description: 'Tailored solutions for healthcare organizations and large teams',
      features: [
        'Everything in Professional',
        'Unlimited users',
        'Dedicated account manager',
        'Custom integrations',
        'HIPAA compliance support',
        'Advanced security features',
        'SLA guarantee',
        'White-label options',
      ],
      cta: 'Contact Sales',
      highlighted: false,
      ariaLabel: 'Enterprise plan - Custom pricing',
    },
  ];

  return (
    <section
      id="pricing"
      aria-labelledby="pricing-heading"
      style={{
        padding: 'var(--space-10) var(--space-5)',
        background: 'var(--color-bg)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background Gradient */}
      <div
        style={{
          position: 'absolute',
          top: '0',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '800px',
          height: '800px',
          background: 'radial-gradient(circle, rgba(59, 130, 246, 0.15), transparent 70%)',
          pointerEvents: 'none',
          opacity: 0.6,
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
            marginBottom: 'var(--space-8)',
            maxWidth: '800px',
            margin: '0 auto var(--space-8) auto',
          }}
        >
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 'var(--space-2)',
              padding: 'var(--space-2) var(--space-4)',
              background: 'var(--color-surface)',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-full)',
              marginBottom: 'var(--space-4)',
              fontSize: 'var(--font-size-small)',
              color: 'var(--color-text)',
              fontWeight: 600,
            }}
            role="status"
            aria-label="Simple and transparent pricing"
          >
            💰 Simple & Transparent Pricing
          </div>

          <h2
            id="pricing-heading"
            style={{
              fontSize: 'var(--font-size-h1)',
              fontWeight: 800,
              color: 'var(--color-text)',
              marginBottom: 'var(--space-4)',
              lineHeight: 'var(--line-height-tight)',
            }}
          >
            Choose Your{' '}
            <span
              style={{
                background: 'var(--btn-primary-bg)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Perfect Plan
            </span>
          </h2>

          <p
            style={{
              fontSize: 'var(--font-size-body)',
              color: 'var(--color-text-muted)',
              lineHeight: 'var(--line-height-base)',
            }}
          >
            Start free and scale as you grow. All plans include 24/7 support and secure data encryption.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr',
            gap: 'var(--space-6)',
            marginBottom: 'var(--space-8)',
          }}
          className="pricing-grid"
        >
          {plans.map((plan, index) => {
            const IconComponent = plan.icon;
            return (
              <article
                key={index}
                style={{
                  background: plan.highlighted
                    ? 'linear-gradient(135deg, rgba(59, 130, 246, 0.15), rgba(139, 92, 246, 0.15))'
                    : 'var(--card-bg)',
                  border: plan.highlighted
                    ? '2px solid var(--color-brand-primary)'
                    : '1px solid var(--card-border)',
                  borderRadius: 'var(--radius-xl)',
                  padding: 'var(--space-7)',
                  position: 'relative',
                  transition: `all var(--duration-medium) var(--ease-standard)`,
                  boxShadow: plan.highlighted ? 'var(--shadow-glow)' : 'var(--shadow-md)',
                  display: 'flex',
                  flexDirection: 'column',
                }}
                className="pricing-card"
                aria-label={plan.ariaLabel}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-8px)';
                  e.currentTarget.style.boxShadow = plan.highlighted
                    ? 'var(--shadow-glow-hover)'
                    : 'var(--shadow-lg)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = plan.highlighted ? 'var(--shadow-glow)' : 'var(--shadow-md)';
                }}
              >
                {/* Popular Badge */}
                {plan.badge && (
                  <div
                    style={{
                      position: 'absolute',
                      top: '-12px',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      padding: 'var(--space-2) var(--space-4)',
                      background: 'var(--btn-primary-bg)',
                      color: 'var(--btn-primary-fg)',
                      borderRadius: 'var(--radius-full)',
                      fontSize: 'var(--font-size-small)',
                      fontWeight: 700,
                      boxShadow: 'var(--shadow-md)',
                      whiteSpace: 'nowrap',
                    }}
                    role="status"
                    aria-label="Most popular plan"
                  >
                    ⭐ {plan.badge}
                  </div>
                )}

                {/* Plan Icon & Name */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 'var(--space-3)',
                    marginBottom: 'var(--space-4)',
                  }}
                >
                  <div
                    style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: 'var(--radius-lg)',
                      background: plan.highlighted
                        ? 'var(--btn-primary-bg)'
                        : 'var(--color-surface)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: plan.highlighted ? 'var(--btn-primary-fg)' : 'var(--color-brand-primary)',
                    }}
                    aria-hidden="true"
                  >
                    <IconComponent size={24} />
                  </div>
                  <h3
                    style={{
                      fontSize: 'var(--font-size-h3)',
                      fontWeight: 700,
                      color: 'var(--color-text)',
                      margin: 0,
                    }}
                  >
                    {plan.name}
                  </h3>
                </div>

                {/* Price */}
                <div style={{ marginBottom: 'var(--space-4)' }}>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'baseline',
                      gap: 'var(--space-2)',
                      marginBottom: 'var(--space-1)',
                    }}
                  >
                    {plan.price !== 'Custom' && (
                      <span
                        style={{
                          fontSize: 'var(--font-size-small)',
                          color: 'var(--color-text-muted)',
                          fontWeight: 600,
                        }}
                      >
                        $
                      </span>
                    )}
                    <span
                      style={{
                        fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
                        fontWeight: 900,
                        color: 'var(--color-text)',
                        lineHeight: 1,
                      }}
                    >
                      {plan.price}
                    </span>
                  </div>
                  <p
                    style={{
                      fontSize: 'var(--font-size-small)',
                      color: 'var(--color-text-muted)',
                      margin: 0,
                    }}
                  >
                    {plan.period}
                  </p>
                </div>

                {/* Description */}
                <p
                  style={{
                    fontSize: 'var(--font-size-body)',
                    color: 'var(--color-text-muted)',
                    lineHeight: 'var(--line-height-base)',
                    marginBottom: 'var(--space-5)',
                  }}
                >
                  {plan.description}
                </p>

                {/* CTA Button */}
                <button
                  type="button"
                  style={{
                    width: '100%',
                    padding: 'var(--space-4) var(--space-6)',
                    background: plan.highlighted ? 'var(--btn-primary-bg)' : 'var(--btn-secondary-bg)',
                    color: plan.highlighted ? 'var(--btn-primary-fg)' : 'var(--btn-secondary-fg)',
                    border: plan.highlighted ? 'none' : '1px solid var(--btn-secondary-border)',
                    borderRadius: 'var(--radius-lg)',
                    fontSize: 'var(--font-size-body)',
                    fontWeight: 700,
                    cursor: 'pointer',
                    transition: `all var(--duration-fast) var(--ease-standard)`,
                    marginBottom: 'var(--space-6)',
                    outline: 'none',
                  }}
                  className="pricing-cta"
                  onMouseEnter={(e) => {
                    if (plan.highlighted) {
                      e.currentTarget.style.background = 'var(--btn-primary-hover-bg)';
                      e.currentTarget.style.boxShadow = 'var(--shadow-glow-hover)';
                    } else {
                      e.currentTarget.style.background = 'var(--btn-secondary-hover-bg)';
                    }
                    e.currentTarget.style.transform = 'scale(1.02)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = plan.highlighted
                      ? 'var(--btn-primary-bg)'
                      : 'var(--btn-secondary-bg)';
                    e.currentTarget.style.boxShadow = 'none';
                    e.currentTarget.style.transform = 'scale(1)';
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.outline = '3px solid var(--color-brand-primary)';
                    e.currentTarget.style.outlineOffset = '2px';
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.outline = 'none';
                  }}
                  aria-label={`${plan.cta} for ${plan.name} plan`}
                  onClick={() => {
                    if (plan.name === 'Basic') {
                      navigate('/signup');
                    } else if (plan.name === 'Professional') {
                      if (isAuthenticated) {
                        addToCart({
                          id: `plan_${plan.name.toLowerCase()}`,
                          planName: plan.name,
                          price: plan.price,
                          period: plan.period,
                          description: plan.description,
                          features: plan.features,
                        });
                        navigate('/cart');
                      } else {
                        navigate('/signup');
                      }
                    } else if (plan.name === 'Enterprise') {
                      // For Enterprise, navigate to help section
                      window.location.href = '#help';
                    }
                  }}
                >
                  {plan.cta}
                </button>

                {/* Features List */}
                <div style={{ flex: 1 }}>
                  <h4
                    style={{
                      fontSize: 'var(--font-size-small)',
                      fontWeight: 700,
                      color: 'var(--color-text)',
                      marginBottom: 'var(--space-4)',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px',
                    }}
                  >
                    What's Included
                  </h4>
                  <ul
                    style={{
                      listStyle: 'none',
                      padding: 0,
                      margin: 0,
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 'var(--space-3)',
                    }}
                    aria-label={`${plan.name} plan features`}
                  >
                    {plan.features.map((feature, featureIndex) => (
                      <li
                        key={featureIndex}
                        style={{
                          display: 'flex',
                          alignItems: 'flex-start',
                          gap: 'var(--space-3)',
                          fontSize: 'var(--font-size-body)',
                          color: 'var(--color-text-muted)',
                        }}
                      >
                        <div
                          style={{
                            width: '20px',
                            height: '20px',
                            borderRadius: 'var(--radius-full)',
                            background: plan.highlighted
                              ? 'var(--btn-primary-bg)'
                              : 'var(--color-surface)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0,
                            marginTop: '2px',
                          }}
                          aria-hidden="true"
                        >
                          <Check
                            size={12}
                            strokeWidth={3}
                            color={plan.highlighted ? 'white' : 'var(--color-brand-primary)'}
                          />
                        </div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            );
          })}
        </div>

        {/* Bottom Note */}
        <div
          style={{
            textAlign: 'center',
            padding: 'var(--space-6)',
            background: 'var(--color-surface)',
            border: '1px solid var(--color-border)',
            borderRadius: 'var(--radius-xl)',
          }}
        >
          <p
            style={{
              fontSize: 'var(--font-size-body)',
              color: 'var(--color-text-muted)',
              margin: 0,
              lineHeight: 'var(--line-height-base)',
            }}
          >
            <strong style={{ color: 'var(--color-text)' }}>All plans include:</strong> 256-bit
            encryption, HIPAA compliance, automatic backups, and a 30-day money-back guarantee.{' '}
            <a
              href="#help"
              style={{
                color: 'var(--color-brand-primary)',
                textDecoration: 'none',
                fontWeight: 600,
                transition: 'color var(--duration-fast) var(--ease-standard)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = 'var(--color-link-hover)';
                e.currentTarget.style.textDecoration = 'underline';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = 'var(--color-brand-primary)';
                e.currentTarget.style.textDecoration = 'none';
              }}
            >
              Questions? Contact us
            </a>
          </p>
        </div>
      </div>

      <style>{`
        @media (min-width: 768px) {
          .pricing-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        
        @media (min-width: 1024px) {
          .pricing-grid {
            grid-template-columns: repeat(3, 1fr) !important;
          }
        }

        .pricing-card:focus-within {
          outline: 2px solid var(--color-brand-primary);
          outline-offset: 4px;
        }
      `}</style>
    </section>
  );
}