import React from 'react';
import { BookOpen, Download, ExternalLink, FileText, Video } from 'lucide-react';

const resources = [
  {
    icon: BookOpen,
    title: 'Getting Started Guide',
    description: 'Learn the basics of CareConnect and how to set up your account in minutes.',
    type: 'Guide',
    link: '#',
  },
  {
    icon: Video,
    title: 'Video Tutorials',
    description: 'Watch step-by-step tutorials on using key features and best practices.',
    type: 'Video',
    link: '#',
  },
  {
    icon: FileText,
    title: 'Documentation',
    description: 'Complete technical documentation and API reference for developers.',
    type: 'Docs',
    link: '#',
  },
  {
    icon: Download,
    title: 'Mobile Apps',
    description: 'Download our iOS and Android apps for healthcare on the go.',
    type: 'Apps',
    link: '#',
  },
  {
    icon: BookOpen,
    title: 'Care Best Practices',
    description: 'Expert advice on caregiving, health management, and wellness tips.',
    type: 'Articles',
    link: '#',
  },
  {
    icon: FileText,
    title: 'Compliance and Security',
    description: 'Learn about our HIPAA compliance, security measures, and privacy policies.',
    type: 'Legal',
    link: '#',
  },
];

export function ResourcesSection() {
  return (
    <section id="resources" aria-labelledby="resources-heading" className="marketing-section">
      <div className="marketing-section__inner">
        <div className="marketing-section__header">
          <div className="marketing-section__eyebrow">Resources</div>
          <h2 id="resources-heading" className="marketing-section__title">
            Everything You Need
            <br />
            to Get Started
          </h2>
          <p className="marketing-section__subtitle">
            Explore our comprehensive library of guides, tutorials, and documentation.
          </p>
        </div>

        <div className="marketing-grid marketing-grid--resources" role="list">
          {resources.map((resource) => {
            const Icon = resource.icon;

            return (
              <a
                key={resource.title}
                href={resource.link}
                className="marketing-card resources-card"
                role="listitem"
                aria-label={`${resource.title}: ${resource.description}`}
              >
                <div className="resources-card__badge" aria-label={`Resource type: ${resource.type}`}>
                  {resource.type}
                </div>

                <div className="marketing-card__icon" aria-hidden="true">
                  <Icon className="cc-icon cc-icon--lg" />
                </div>

                <div>
                  <div className="resources-card__title-row">
                    <h3 className="marketing-card__title">{resource.title}</h3>
                    <ExternalLink className="resources-card__external cc-icon cc-icon--sm" aria-hidden="true" />
                  </div>
                  <p className="marketing-card__copy">{resource.description}</p>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
