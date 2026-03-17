import React, { useState } from 'react';
import { ChevronDown, HelpCircle, Mail, MessageCircle, Phone } from 'lucide-react';

const supportOptions = [
  {
    icon: MessageCircle,
    title: 'Live Chat',
    description: 'Chat with our support team in real-time',
    action: 'Start Chat',
  },
  {
    icon: Mail,
    title: 'Email Support',
    description: 'Send us an email and get a response within 24 hours',
    action: 'Send Email',
  },
  {
    icon: Phone,
    title: 'Phone Support',
    description: 'Call us at 1-800-CARE-HELP for premium support',
    action: 'Call Now',
  },
];

const faqs = [
  {
    question: 'How do I get started with CareConnect?',
    answer:
      'Sign up for a free account, complete your profile, and invite your care team members. The onboarding flow guides you through your first care plan and provider connections.',
  },
  {
    question: 'Is my health data secure and HIPAA compliant?',
    answer:
      'Yes. CareConnect uses strong encryption, protects data in transit and at rest, and follows HIPAA-aligned security practices with regular audits.',
  },
  {
    question: 'Can I use CareConnect on my mobile device?',
    answer:
      'Yes. CareConnect is available on iOS and Android, and the web app is responsive for mobile browsers as well.',
  },
  {
    question: 'How much does CareConnect cost?',
    answer:
      'The Basic plan is free forever, premium features begin with the Professional plan, and enterprise pricing is tailored for organizations.',
  },
  {
    question: 'Can I share access with my family members?',
    answer:
      'Yes. You can invite family members, caregivers, and providers with permission controls that define what each person can see and manage.',
  },
  {
    question: 'What kind of support do you offer?',
    answer:
      'We offer email and chat support for all users, with faster response paths and expanded options for premium users.',
  },
];

export function HelpSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="help" aria-labelledby="help-heading" className="marketing-section">
      <div className="marketing-section__inner">
        <div className="marketing-section__header">
          <div className="marketing-section__eyebrow">Support</div>
          <h2 id="help-heading" className="marketing-section__title">
            How Can We Help You?
          </h2>
          <p className="marketing-section__subtitle">
            Get answers to common questions or reach out to our support team.
          </p>
        </div>

        <div className="marketing-grid marketing-grid--support" role="list">
          {supportOptions.map((option) => {
            const Icon = option.icon;

            return (
              <article key={option.title} className="marketing-card" role="listitem">
                <div className="marketing-card__icon" aria-hidden="true">
                  <Icon className="cc-icon cc-icon--xl" />
                </div>
                <h3 className="marketing-card__title">{option.title}</h3>
                <p className="marketing-card__copy">{option.description}</p>
                <button type="button" className="cc-btn cc-btn--secondary">
                  {option.action}
                </button>
              </article>
            );
          })}
        </div>

        <div className="help-section__faq">
          <h3 className="help-section__faq-title">Frequently Asked Questions</h3>

          <div className="help-section__faq-list" role="region" aria-label="Frequently asked questions">
            {faqs.map((faq, index) => (
              <div
                key={faq.question}
                className="help-section__faq-item"
                data-open={openIndex === index}
              >
                <button
                  type="button"
                  className="help-section__faq-question"
                  aria-expanded={openIndex === index}
                  aria-controls={`faq-answer-${index}`}
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                >
                  <span className="help-section__faq-question-copy">
                    <HelpCircle className="help-section__faq-icon cc-icon cc-icon--md" aria-hidden="true" />
                    <span>{faq.question}</span>
                  </span>
                  <ChevronDown className="help-section__faq-chevron cc-icon cc-icon--md" aria-hidden="true" />
                </button>

                {openIndex === index ? (
                  <div id={`faq-answer-${index}`} className="help-section__faq-answer">
                    {faq.answer}
                  </div>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
