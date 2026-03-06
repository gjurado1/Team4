import React, { useState } from 'react';
import { MessageCircle, Mail, Phone, ChevronDown, HelpCircle, Headphones } from 'lucide-react';

interface FAQ {
  question: string;
  answer: string;
}

const faqs: FAQ[] = [
  {
    question: 'How do I get started with CareConnect?',
    answer: 'Getting started is easy! Simply sign up for a free account, complete your profile, and invite your care team members. Our onboarding wizard will guide you through setting up your first care plan and connecting with healthcare providers.',
  },
  {
    question: 'Is my health data secure and HIPAA compliant?',
    answer: 'Absolutely. CareConnect is fully HIPAA compliant and uses bank-level encryption to protect your data. All information is encrypted in transit and at rest, and we undergo regular third-party security audits to ensure the highest standards of data protection.',
  },
  {
    question: 'Can I use CareConnect on my mobile device?',
    answer: 'Yes! CareConnect is available on iOS and Android devices. Download our mobile app from the App Store or Google Play, or use our fully responsive web application on any mobile browser.',
  },
  {
    question: 'How much does CareConnect cost?',
    answer: 'We offer flexible pricing plans to suit different needs. Our Basic plan is free forever, with premium features available starting at $9.99/month. Enterprise plans are available for healthcare organizations. Visit our pricing page for detailed information.',
  },
  {
    question: 'Can I share access with my family members?',
    answer: 'Yes! CareConnect is designed for collaborative care. You can invite family members, caregivers, and healthcare providers to join your care team with customizable permission levels to control what information each member can access.',
  },
  {
    question: 'What kind of support do you offer?',
    answer: 'We provide 24/7 customer support via email and chat. Premium users get access to phone support and priority response times. We also have an extensive knowledge base, video tutorials, and a community forum.',
  },
];

export function HelpSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section
      id="help"
      aria-labelledby="help-heading"
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
            Support
          </div>

          <h2
            id="help-heading"
            style={{
              fontSize: 'var(--font-size-h1)',
              fontWeight: 800,
              color: 'var(--color-text)',
              marginBottom: 'var(--space-4)',
              lineHeight: 'var(--line-height-tight)',
            }}
          >
            How Can We Help You?
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
            Get answers to common questions or reach out to our support team.
          </p>
        </div>

        {/* Support Options */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 'var(--space-5)',
            marginBottom: 'var(--space-10)',
          }}
          role="list"
        >
          {[
            {
              icon: <MessageCircle size={32} />,
              title: 'Live Chat',
              description: 'Chat with our support team in real-time',
              action: 'Start Chat',
            },
            {
              icon: <Mail size={32} />,
              title: 'Email Support',
              description: 'Send us an email and get a response within 24 hours',
              action: 'Send Email',
            },
            {
              icon: <Phone size={32} />,
              title: 'Phone Support',
              description: 'Call us at 1-800-CARE-HELP (Premium users)',
              action: 'Call Now',
            },
          ].map((option, index) => (
            <article
              key={index}
              role="listitem"
              style={{
                padding: 'var(--space-6)',
                background: 'var(--card-bg)',
                border: '1px solid var(--card-border)',
                borderRadius: 'var(--radius-xl)',
                textAlign: 'center',
                transition: `all var(--duration-medium) var(--ease-standard)`,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'var(--card-hover-bg)';
                e.currentTarget.style.borderColor = 'var(--card-hover-border)';
                e.currentTarget.style.transform = 'translateY(-4px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'var(--card-bg)';
                e.currentTarget.style.borderColor = 'var(--card-border)';
                e.currentTarget.style.transform = 'translateY(0)';
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
                  margin: '0 auto var(--space-4)',
                  color: 'var(--btn-primary-fg)',
                }}
                aria-hidden="true"
              >
                {option.icon}
              </div>

              <h3
                style={{
                  fontSize: 'var(--font-size-h3)',
                  fontWeight: 700,
                  color: 'var(--color-text)',
                  marginBottom: 'var(--space-2)',
                }}
              >
                {option.title}
              </h3>

              <p
                style={{
                  fontSize: 'var(--font-size-body)',
                  color: 'var(--color-text-muted)',
                  marginBottom: 'var(--space-4)',
                  lineHeight: 'var(--line-height-base)',
                }}
              >
                {option.description}
              </p>

              <button
                type="button"
                style={{
                  padding: 'var(--space-3) var(--space-5)',
                  background: 'var(--btn-secondary-bg)',
                  color: 'var(--btn-secondary-fg)',
                  border: '1px solid var(--btn-secondary-border)',
                  borderRadius: 'var(--radius-md)',
                  fontSize: 'var(--font-size-body)',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: `all var(--duration-fast) var(--ease-standard)`,
                  outline: 'none',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'var(--btn-secondary-hover-bg)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'var(--btn-secondary-bg)';
                }}
                onFocus={(e) => {
                  e.currentTarget.style.outline = '3px solid var(--color-brand-primary)';
                  e.currentTarget.style.outlineOffset = '2px';
                }}
                onBlur={(e) => {
                  e.currentTarget.style.outline = 'none';
                }}
                aria-label={`${option.action} for ${option.title}`}
              >
                {option.action}
              </button>
            </article>
          ))}
        </div>

        {/* FAQ Section */}
        <div>
          <h3
            id="faq-heading"
            style={{
              fontSize: 'var(--font-size-h2)',
              fontWeight: 800,
              color: 'var(--color-text)',
              marginBottom: 'var(--space-6)',
              textAlign: 'center',
            }}
          >
            Frequently Asked Questions
          </h3>

          <div
            style={{
              maxWidth: '800px',
              margin: '0 auto',
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--space-3)',
            }}
            role="region"
            aria-labelledby="faq-heading"
          >
            {faqs.map((faq, index) => (
              <div
                key={index}
                style={{
                  background: 'var(--card-bg)',
                  border: '1px solid var(--card-border)',
                  borderRadius: 'var(--radius-lg)',
                  overflow: 'hidden',
                  transition: `all var(--duration-medium) var(--ease-standard)`,
                }}
              >
                <button
                  type="button"
                  style={{
                    width: '100%',
                    padding: 'var(--space-5)',
                    background: 'transparent',
                    border: 'none',
                    color: 'var(--color-text)',
                    fontSize: 'var(--font-size-body)',
                    fontWeight: 600,
                    textAlign: 'left',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: 'var(--space-3)',
                    outline: 'none',
                  }}
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  aria-expanded={openIndex === index}
                  aria-controls={`faq-answer-${index}`}
                  onFocus={(e) => {
                    e.currentTarget.style.outline = '3px solid var(--color-brand-primary)';
                    e.currentTarget.style.outlineOffset = '-3px';
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.outline = 'none';
                  }}
                >
                  <span style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                    <HelpCircle size={20} style={{ color: 'var(--color-brand-primary)', flexShrink: 0 }} aria-hidden="true" />
                    {faq.question}
                  </span>
                  <ChevronDown
                    size={20}
                    style={{
                      transform: openIndex === index ? 'rotate(180deg)' : 'rotate(0deg)',
                      transition: `transform var(--duration-fast) var(--ease-standard)`,
                      flexShrink: 0,
                    }}
                    aria-hidden="true"
                  />
                </button>

                {openIndex === index && (
                  <div
                    id={`faq-answer-${index}`}
                    role="region"
                    aria-labelledby={`faq-question-${index}`}
                    style={{
                      padding: '0 var(--space-5) var(--space-5)',
                      color: 'var(--color-text-muted)',
                      fontSize: 'var(--font-size-body)',
                      lineHeight: 'var(--line-height-base)',
                      animation: 'fadeIn var(--duration-medium) var(--ease-standard)',
                    }}
                  >
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
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
