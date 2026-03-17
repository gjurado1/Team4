import React from 'react';
import { Activity, Clock, Heart, Shield, Users, Zap } from 'lucide-react';

const features = [
  {
    icon: Activity,
    title: 'Real-Time Monitoring',
    description:
      'Track vital signs and health metrics with advanced AI-powered analytics and instant alerts.',
  },
  {
    icon: Shield,
    title: 'HIPAA Compliant',
    description:
      'Enterprise-grade security ensuring your health data is protected with end-to-end encryption.',
  },
  {
    icon: Clock,
    title: '24/7 Care Access',
    description:
      'Connect with healthcare professionals anytime, anywhere with our round-the-clock support.',
  },
  {
    icon: Users,
    title: 'Team Collaboration',
    description:
      'Seamlessly coordinate care between family members, caregivers, and medical professionals.',
  },
  {
    icon: Heart,
    title: 'Personalized Care',
    description:
      'AI-driven care plans tailored to your unique health needs and lifestyle preferences.',
  },
  {
    icon: Zap,
    title: 'Instant Insights',
    description:
      'Get actionable health insights and recommendations powered by machine learning.',
  },
];

export function FeaturesSection() {
  return (
    <section id="features" aria-labelledby="features-heading" className="marketing-section">
      <div className="marketing-section__inner">
        <div className="marketing-section__header">
          <div className="marketing-section__eyebrow">Features</div>
          <h2 id="features-heading" className="marketing-section__title">
            Everything You Need for
            <br />
            Better Healthcare
          </h2>
          <p className="marketing-section__subtitle">
            Powerful features designed to transform how you manage health and wellness.
          </p>
        </div>

        <div className="marketing-grid marketing-grid--features" role="list">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <article key={feature.title} className="marketing-card" role="listitem">
                <div className="marketing-card__icon" aria-hidden="true">
                  <Icon className="cc-icon cc-icon--xl" />
                </div>
                <h3 className="marketing-card__title">{feature.title}</h3>
                <p className="marketing-card__copy">{feature.description}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
