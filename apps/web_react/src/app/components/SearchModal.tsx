import React, { useCallback, useEffect, useRef, useState } from 'react';
import { DollarSign, Download, FileText, HelpCircle, Search, Sparkles, X } from 'lucide-react';
import { useNavigate } from 'react-router';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface SearchResult {
  id: string;
  title: string;
  description: string;
  category: string;
  path: string;
  icon: React.ElementType;
}

const searchableContent: SearchResult[] = [
  {
    id: 'feature-health-records',
    title: 'Health Records Management',
    description: 'Securely store and access your complete medical history in one place',
    category: 'Features',
    path: '/#features',
    icon: FileText,
  },
  {
    id: 'feature-appointments',
    title: 'Smart Appointment Scheduling',
    description: 'Never miss an appointment with intelligent reminders and calendar sync',
    category: 'Features',
    path: '/#features',
    icon: FileText,
  },
  {
    id: 'feature-telemedicine',
    title: 'Telemedicine Integration',
    description: 'Connect with healthcare providers through secure video consultations',
    category: 'Features',
    path: '/#features',
    icon: FileText,
  },
  {
    id: 'pricing-basic',
    title: 'Basic Plan',
    description: 'Free forever with health records, appointments, and medication reminders',
    category: 'Pricing',
    path: '/#pricing',
    icon: DollarSign,
  },
  {
    id: 'pricing-professional',
    title: 'Professional Plan',
    description: 'Family sharing, video consultations, and advanced analytics',
    category: 'Pricing',
    path: '/#pricing',
    icon: DollarSign,
  },
  {
    id: 'pricing-enterprise',
    title: 'Enterprise Plan',
    description: 'Unlimited users, dedicated support, and compliance tools',
    category: 'Pricing',
    path: '/#pricing',
    icon: DollarSign,
  },
  {
    id: 'download-ios',
    title: 'iOS App',
    description: 'Download CareConnect for iPhone and iPad from the App Store',
    category: 'Downloads',
    path: '/#downloads',
    icon: Download,
  },
  {
    id: 'download-android',
    title: 'Android App',
    description: 'Get CareConnect on your Android device from Google Play',
    category: 'Downloads',
    path: '/#downloads',
    icon: Download,
  },
  {
    id: 'resource-getting-started',
    title: 'Getting Started Guide',
    description: 'Learn the basics and set up your account in minutes',
    category: 'Resources',
    path: '/#resources',
    icon: FileText,
  },
  {
    id: 'resource-security',
    title: 'Security Best Practices',
    description: 'Keep your health data safe with our security guidelines',
    category: 'Resources',
    path: '/#resources',
    icon: FileText,
  },
  {
    id: 'help-faq',
    title: 'Frequently Asked Questions',
    description: 'Find answers to common questions about CareConnect',
    category: 'Help',
    path: '/#help',
    icon: HelpCircle,
  },
  {
    id: 'help-support',
    title: 'Contact Support',
    description: 'Get help from our dedicated support team',
    category: 'Help',
    path: '/#help',
    icon: HelpCircle,
  },
  {
    id: 'page-profile',
    title: 'My Profile',
    description: 'Manage your account information and preferences',
    category: 'Account',
    path: '/profile',
    icon: Sparkles,
  },
  {
    id: 'page-cart',
    title: 'Shopping Cart',
    description: 'Review and purchase your subscription plan',
    category: 'Account',
    path: '/cart',
    icon: Sparkles,
  },
];

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    setSearchQuery('');
    setResults([]);
    setSelectedIndex(0);

    const timer = window.setTimeout(() => inputRef.current?.focus(), 75);
    return () => window.clearTimeout(timer);
  }, [isOpen]);

  useEffect(() => {
    if (!searchQuery.trim()) {
      setResults([]);
      setSelectedIndex(0);
      return;
    }

    const query = searchQuery.toLowerCase();
    const filtered = searchableContent.filter(
      (item) =>
        item.title.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query)
    );

    setResults(filtered);
    setSelectedIndex(0);
  }, [searchQuery]);

  const handleResultClick = useCallback((result: SearchResult) => {
    if (result.path.startsWith('/#')) {
      if (window.location.pathname !== '/') {
        navigate('/');
        window.setTimeout(() => {
          window.location.hash = result.path.substring(1);
        }, 100);
      } else {
        window.location.hash = result.path.substring(1);
      }
    } else {
      navigate(result.path);
    }

    onClose();
  }, [navigate, onClose]);

  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }

      if (event.key === 'ArrowDown') {
        event.preventDefault();
        setSelectedIndex((prev) => Math.min(prev + 1, results.length - 1));
      }

      if (event.key === 'ArrowUp') {
        event.preventDefault();
        setSelectedIndex((prev) => Math.max(prev - 1, 0));
      }

      if (event.key === 'Enter' && results[selectedIndex]) {
        event.preventDefault();
        handleResultClick(results[selectedIndex]);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleResultClick, isOpen, onClose, results, selectedIndex]);

  if (!isOpen) {
    return null;
  }

  const quickResults = searchableContent.slice(0, 5);

  return (
    <div className="search-modal" onClick={onClose} role="dialog" aria-modal="true" aria-label="Search">
      <div className="search-modal__dialog" onClick={(event) => event.stopPropagation()}>
        <div className="search-modal__header">
          <Search className="search-modal__header-icon cc-icon cc-icon--lg" aria-hidden="true" />
          <input
            ref={inputRef}
            type="text"
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            className="search-modal__input"
            placeholder="Search for features, pricing, help..."
            aria-label="Search input"
          />
          <button type="button" className="site-nav__icon-button" onClick={onClose} aria-label="Close search">
            <X className="cc-icon cc-icon--md" aria-hidden="true" />
          </button>
        </div>

        <div className="search-modal__body">
          {!searchQuery.trim() ? (
            <div className="search-modal__section">
              <h3 className="search-modal__label">Quick Access</h3>
              <div className="search-modal__quick-list">
                {quickResults.map((item) => {
                  const Icon = item.icon;

                  return (
                    <button
                      key={item.id}
                      type="button"
                      className="search-modal__result"
                      onClick={() => handleResultClick(item)}
                    >
                      <span className="search-modal__result-icon" aria-hidden="true">
                        <Icon className="cc-icon cc-icon--md" />
                      </span>
                      <span className="search-modal__result-copy">
                        <span className="search-modal__result-title">{item.title}</span>
                        <span className="search-modal__result-description">{item.description}</span>
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          ) : results.length > 0 ? (
            <div className="search-modal__results">
              {results.map((item, index) => {
                const Icon = item.icon;

                return (
                  <button
                    key={item.id}
                    type="button"
                    className="search-modal__result"
                    data-selected={selectedIndex === index}
                    onClick={() => handleResultClick(item)}
                    onMouseEnter={() => setSelectedIndex(index)}
                  >
                    <span className="search-modal__result-icon" aria-hidden="true">
                      <Icon className="cc-icon cc-icon--md" />
                    </span>
                    <span className="search-modal__result-copy">
                      <span className="search-modal__result-title-row">
                        <span className="search-modal__result-title">{item.title}</span>
                        <span className="search-modal__result-pill">{item.category}</span>
                      </span>
                      <span className="search-modal__result-description">{item.description}</span>
                    </span>
                  </button>
                );
              })}
            </div>
          ) : (
            <div className="search-modal__empty">
              <div className="search-modal__empty-icon" aria-hidden="true">
                <Search className="cc-icon cc-icon--xl" />
              </div>
              <h3 className="search-modal__empty-title">No results found</h3>
              <p className="search-modal__empty-copy">Try searching for features, pricing, or help topics.</p>
            </div>
          )}
        </div>

        <div className="search-modal__footer">
          <div className="search-modal__shortcut">
            <kbd className="search-modal__kbd">Up/Down</kbd>
            <span>Navigate</span>
          </div>
          <div className="search-modal__shortcut">
            <kbd className="search-modal__kbd">Enter</kbd>
            <span>Select</span>
          </div>
          <div className="search-modal__shortcut">
            <kbd className="search-modal__kbd">Esc</kbd>
            <span>Close</span>
          </div>
        </div>
      </div>
    </div>
  );
}
