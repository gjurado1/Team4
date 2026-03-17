import React, { useEffect, useState } from 'react';
import { Activity, ArrowRight, Heart, Shield, TrendingUp } from 'lucide-react';

const metrics = [
  {
    icon: Activity,
    label: 'Heart Rate',
    value: '72',
    unit: 'BPM',
    status: 'Optimal',
    tone: 'success',
  },
  {
    icon: Heart,
    label: 'Blood Pressure',
    value: '120/80',
    unit: 'mmHg',
    status: 'Optimal',
    tone: 'success',
  },
  {
    icon: Shield,
    label: 'Health Score',
    value: '94',
    unit: 'Percent',
    status: 'Excellent',
    tone: 'success',
  },
  {
    icon: TrendingUp,
    label: 'Activity',
    value: '8.5K',
    unit: 'Steps',
    status: 'Active',
    tone: 'info',
  },
] as const;

const quickStats = ['50K+ Users', '99.9% Uptime', '24/7 Support'];

export function HeroSection() {
  const [selectedMetric, setSelectedMetric] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setSelectedMetric((prev) => (prev + 1) % metrics.length);
    }, 3000);

    return () => window.clearInterval(interval);
  }, []);

  const currentMetric = metrics[selectedMetric];

  return (
    <section id="home" aria-label="Hero section" className="hero-section">
      <div className="app-ambient-grid" aria-hidden="true" />
      <div className="app-orb app-orb--primary" aria-hidden="true" />
      <div className="app-orb app-orb--secondary" aria-hidden="true" />

      <div className="hero-section__inner">
        <div className="hero-section__content">
          <div className="hero-section__eyebrow">
            <div className="hero-section__eyebrow-bar" aria-hidden="true" />
            <span className="hero-section__eyebrow-text">Next-Gen Healthcare Platform</span>
          </div>

          <h1 className="hero-section__title">
            <span className="hero-section__title-line">HEALTH</span>
            <span className="hero-section__title-line hero-section__title-line--gradient">
              REIMAGINED
            </span>
            <span className="hero-section__title-line">2025</span>
          </h1>

          <p className="hero-section__subtitle">
            AI-powered health monitoring with real-time insights.
            <br />
            Your wellness, redefined.
          </p>

          <div className="hero-section__actions">
            <button
              type="button"
              className="cc-btn cc-btn--primary hero-section__button"
              aria-label="Start your journey with CareConnect"
            >
              START YOUR JOURNEY
              <ArrowRight className="cc-icon cc-icon--md" aria-hidden="true" />
            </button>

            <button
              type="button"
              className="cc-btn hero-section__button hero-section__button--secondary"
              aria-label="Watch demo video"
            >
              WATCH DEMO
            </button>
          </div>

          <div className="hero-section__stats">
            {quickStats.map((stat) => (
              <div key={stat} className="hero-section__stat">
                <span className="hero-section__stat-dot" aria-hidden="true" />
                <span className="hero-section__stat-text">{stat}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="hero-section__panel">
          <div className="hero-section__metrics">
            <div className="hero-section__metric-grid" role="tablist" aria-label="Health metrics">
              {metrics.map((metric, index) => {
                const Icon = metric.icon;

                return (
                  <button
                    key={metric.label}
                    type="button"
                    role="tab"
                    className="hero-section__metric-button"
                    data-active={selectedMetric === index}
                    aria-selected={selectedMetric === index}
                    aria-controls={`metric-panel-${index}`}
                    onClick={() => setSelectedMetric(index)}
                  >
                    <Icon className="hero-section__metric-icon cc-icon cc-icon--sm" aria-hidden="true" />
                    <span className="hero-section__metric-label">{metric.label}</span>
                  </button>
                );
              })}
            </div>

            <div
              id={`metric-panel-${selectedMetric}`}
              role="tabpanel"
              className="hero-section__metric-display"
            >
              <p className="hero-section__metric-value">{currentMetric.value}</p>
              <p className="hero-section__metric-unit">{currentMetric.unit}</p>
              <span className="hero-section__metric-status" data-tone={currentMetric.tone}>
                {currentMetric.status}
              </span>
            </div>

            <div className="hero-section__progress" aria-hidden="true">
              {metrics.map((metric, index) => (
                <span
                  key={metric.label}
                  className="hero-section__progress-dot"
                  data-active={selectedMetric === index}
                />
              ))}
            </div>
          </div>

          <div
            className="hero-section__mini-card hero-section__mini-card--top hero-section__mini-card--primary"
            aria-hidden="true"
          >
            <Activity className="cc-icon cc-icon--lg" />
          </div>

          <div
            className="hero-section__mini-card hero-section__mini-card--bottom hero-section__mini-card--danger"
            aria-hidden="true"
          >
            <Heart className="cc-icon cc-icon--lg" />
          </div>
        </div>
      </div>

      <div className="hero-section__edge-label" aria-hidden="true">
        TRUSTED HEALTHCARE INNOVATION
      </div>
    </section>
  );
}
