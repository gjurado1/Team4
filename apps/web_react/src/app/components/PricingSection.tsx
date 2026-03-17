import React from 'react';
import { Check, Crown, Shield, Zap } from 'lucide-react';
import { useNavigate } from 'react-router';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';

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
    ariaLabel: 'Basic plan free forever',
  },
  {
    name: 'Professional',
    icon: Shield,
    price: '29',
    period: 'per month',
    description: 'Advanced features for comprehensive health monitoring and family care',
    features: [
      'Everything in Basic',
      'Family account sharing up to 5 users',
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
    ariaLabel: 'Professional plan 29 dollars per month',
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
    ariaLabel: 'Enterprise plan custom pricing',
  },
] as const;

export function PricingSection() {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth();

  const handlePlanClick = (planName: string, price: string, period: string, description: string, features: readonly string[]) => {
    if (planName === 'Basic') {
      navigate('/signup');
      return;
    }

    if (planName === 'Professional') {
      if (!isAuthenticated) {
        navigate('/signup');
        return;
      }

      addToCart({
        id: `plan_${planName.toLowerCase()}`,
        planName,
        price,
        period,
        description,
        features: [...features],
      });
      navigate('/cart');
      return;
    }

    window.location.hash = '#help';
  };

  return (
    <section id="pricing" aria-labelledby="pricing-heading" className="marketing-section">
      <div className="pricing-section__orb" aria-hidden="true" />

      <div className="marketing-section__inner">
        <div className="marketing-section__header">
          <div className="marketing-section__eyebrow">Simple and Transparent Pricing</div>
          <h2 id="pricing-heading" className="marketing-section__title">
            Choose Your <span className="marketing-section__title-accent">Perfect Plan</span>
          </h2>
          <p className="marketing-section__subtitle">
            Start free and scale as you grow. All plans include 24/7 support and secure data encryption.
          </p>
        </div>

        <div className="pricing-grid">
          {plans.map((plan) => {
            const Icon = plan.icon;

            return (
              <article
                key={plan.name}
                className="pricing-card"
                data-highlighted={plan.highlighted}
                aria-label={plan.ariaLabel}
              >
                {plan.badge ? <div className="pricing-card__badge">{plan.badge}</div> : null}

                <div className="pricing-card__header">
                  <div className="pricing-card__icon" aria-hidden="true">
                    <Icon className="cc-icon cc-icon--lg" />
                  </div>
                  <h3 className="pricing-card__name">{plan.name}</h3>
                </div>

                <div className="pricing-card__price-wrap">
                  <div className="pricing-card__price">
                    {plan.price === 'Custom' ? null : <span className="pricing-card__currency">$</span>}
                    <span className="pricing-card__amount">{plan.price}</span>
                  </div>
                  <span className="pricing-card__period">{plan.period}</span>
                </div>

                <p className="pricing-card__description">{plan.description}</p>

                <button
                  type="button"
                  className={`cc-btn ${plan.highlighted ? 'cc-btn--primary' : 'cc-btn--secondary'} pricing-card__cta`}
                  data-highlighted={plan.highlighted}
                  aria-label={`${plan.cta} for ${plan.name} plan`}
                  onClick={() =>
                    handlePlanClick(plan.name, plan.price, plan.period, plan.description, plan.features)
                  }
                >
                  {plan.cta}
                </button>

                <div>
                  <h4 className="pricing-card__features-title">What&apos;s Included</h4>
                  <ul className="pricing-card__features" aria-label={`${plan.name} plan features`}>
                    {plan.features.map((feature) => (
                      <li key={feature} className="pricing-card__feature">
                        <span className="pricing-card__feature-icon" aria-hidden="true">
                          <Check className="cc-icon cc-icon--sm" />
                        </span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            );
          })}
        </div>

        <div className="pricing-section__note">
          <p className="pricing-section__note-text">
            <strong className="pricing-section__note-strong">All plans include:</strong> 256-bit encryption,
            HIPAA compliance, automatic backups, and a 30-day money-back guarantee.{' '}
            <a href="#help" className="pricing-section__note-link">
              Questions? Contact us
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
