import React, { useState, useEffect, useRef } from 'react';
import { Search, X, FileText, DollarSign, Download, HelpCircle, Sparkles } from 'lucide-react';
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
  // Features
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
  
  // Pricing
  {
    id: 'pricing-basic',
    title: 'Basic Plan',
    description: 'Free forever - Health records, appointments, and medication reminders',
    category: 'Pricing',
    path: '/#pricing',
    icon: DollarSign,
  },
  {
    id: 'pricing-professional',
    title: 'Professional Plan',
    description: '$29/month - Family sharing, video consultations, and advanced analytics',
    category: 'Pricing',
    path: '/#pricing',
    icon: DollarSign,
  },
  {
    id: 'pricing-enterprise',
    title: 'Enterprise Plan',
    description: 'Custom pricing - Unlimited users, dedicated support, HIPAA compliance',
    category: 'Pricing',
    path: '/#pricing',
    icon: DollarSign,
  },
  
  // Downloads
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
    id: 'download-desktop',
    title: 'Desktop App',
    description: 'Access CareConnect on Windows, macOS, and Linux',
    category: 'Downloads',
    path: '/#downloads',
    icon: Download,
  },
  
  // Resources
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
    id: 'resource-api',
    title: 'API Documentation',
    description: 'Integrate CareConnect with your healthcare systems',
    category: 'Resources',
    path: '/#resources',
    icon: FileText,
  },
  
  // Help
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
  
  // Pages
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
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  // Focus input when modal opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
      setSearchQuery('');
      setResults([]);
      setSelectedIndex(0);
    }
  }, [isOpen]);

  // Handle search
  useEffect(() => {
    if (searchQuery.trim() === '') {
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

  // Handle keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev < results.length - 1 ? prev + 1 : prev));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : 0));
      } else if (e.key === 'Enter' && results.length > 0) {
        e.preventDefault();
        handleResultClick(results[selectedIndex]);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, results, selectedIndex, onClose]);

  const handleResultClick = (result: SearchResult) => {
    if (result.path.startsWith('/#')) {
      // Navigate to home page first, then scroll to section
      if (window.location.pathname !== '/') {
        navigate('/');
        setTimeout(() => {
          window.location.hash = result.path.substring(1);
        }, 100);
      } else {
        window.location.hash = result.path.substring(1);
      }
    } else {
      navigate(result.path);
    }
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(0, 0, 0, 0.8)',
        backdropFilter: 'blur(8px)',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        padding: 'var(--space-8) var(--space-5)',
        paddingTop: 'calc(var(--header-height) + var(--space-8))',
        overflowY: 'auto',
      }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Search"
    >
      <div
        style={{
          width: '100%',
          maxWidth: '700px',
          background: 'var(--card-bg)',
          border: '1px solid var(--card-border)',
          borderRadius: 'var(--radius-xl)',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
          overflow: 'hidden',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--space-4)',
            padding: 'var(--space-5) var(--space-6)',
            borderBottom: '1px solid var(--color-border)',
          }}
        >
          <Search size={24} color="var(--color-text-muted)" />
          <input
            ref={inputRef}
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for features, pricing, help..."
            style={{
              flex: 1,
              background: 'transparent',
              border: 'none',
              outline: 'none',
              fontSize: 'var(--font-size-h3)',
              color: 'var(--color-text)',
              fontWeight: 500,
            }}
            aria-label="Search input"
          />
          <button
            type="button"
            onClick={onClose}
            style={{
              width: '40px',
              height: '40px',
              borderRadius: 'var(--radius-md)',
              background: 'var(--color-surface)',
              border: 'none',
              color: 'var(--color-text-muted)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all var(--duration-fast) var(--ease-standard)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'var(--color-border)';
              e.currentTarget.style.color = 'var(--color-text)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'var(--color-surface)';
              e.currentTarget.style.color = 'var(--color-text-muted)';
            }}
            aria-label="Close search"
          >
            <X size={20} />
          </button>
        </div>

        {/* Search Results */}
        <div
          style={{
            maxHeight: '60vh',
            overflowY: 'auto',
          }}
        >
          {searchQuery.trim() === '' ? (
            // Quick Access
            <div style={{ padding: 'var(--space-6)' }}>
              <h3
                style={{
                  fontSize: 'var(--font-size-small)',
                  fontWeight: 700,
                  color: 'var(--color-text-muted)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                  marginBottom: 'var(--space-4)',
                }}
              >
                Quick Access
              </h3>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 'var(--space-2)',
                }}
              >
                {searchableContent.slice(0, 5).map((item, index) => {
                  const IconComponent = item.icon;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => handleResultClick(item)}
                      style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: 'var(--space-4)',
                        padding: 'var(--space-4)',
                        background: 'transparent',
                        border: 'none',
                        borderRadius: 'var(--radius-md)',
                        cursor: 'pointer',
                        textAlign: 'left',
                        transition: 'all var(--duration-fast) var(--ease-standard)',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'var(--color-surface)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'transparent';
                      }}
                    >
                      <div
                        style={{
                          width: '40px',
                          height: '40px',
                          borderRadius: 'var(--radius-md)',
                          background: 'var(--color-surface)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0,
                        }}
                      >
                        <IconComponent size={20} color="var(--color-brand-primary)" />
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div
                          style={{
                            fontSize: 'var(--font-size-body)',
                            fontWeight: 600,
                            color: 'var(--color-text)',
                            marginBottom: 'var(--space-1)',
                          }}
                        >
                          {item.title}
                        </div>
                        <div
                          style={{
                            fontSize: 'var(--font-size-small)',
                            color: 'var(--color-text-muted)',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                          }}
                        >
                          {item.description}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          ) : results.length > 0 ? (
            // Search Results
            <div style={{ padding: 'var(--space-3)' }}>
              {results.map((item, index) => {
                const IconComponent = item.icon;
                const isSelected = index === selectedIndex;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleResultClick(item)}
                    style={{
                      width: '100%',
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: 'var(--space-4)',
                      padding: 'var(--space-4)',
                      background: isSelected ? 'var(--color-surface)' : 'transparent',
                      border: isSelected ? '2px solid var(--color-brand-primary)' : '2px solid transparent',
                      borderRadius: 'var(--radius-md)',
                      cursor: 'pointer',
                      textAlign: 'left',
                      transition: 'all var(--duration-fast) var(--ease-standard)',
                      marginBottom: 'var(--space-2)',
                    }}
                    onMouseEnter={(e) => {
                      if (!isSelected) {
                        e.currentTarget.style.background = 'var(--color-surface)';
                      }
                      setSelectedIndex(index);
                    }}
                    onMouseLeave={(e) => {
                      if (!isSelected) {
                        e.currentTarget.style.background = 'transparent';
                      }
                    }}
                  >
                    <div
                      style={{
                        width: '48px',
                        height: '48px',
                        borderRadius: 'var(--radius-md)',
                        background: isSelected
                          ? 'var(--btn-primary-bg)'
                          : 'var(--color-surface)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                      }}
                    >
                      <IconComponent
                        size={22}
                        color={isSelected ? 'white' : 'var(--color-brand-primary)'}
                      />
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 'var(--space-2)',
                          marginBottom: 'var(--space-1)',
                        }}
                      >
                        <span
                          style={{
                            fontSize: 'var(--font-size-body)',
                            fontWeight: 600,
                            color: 'var(--color-text)',
                          }}
                        >
                          {item.title}
                        </span>
                        <span
                          style={{
                            fontSize: 'var(--font-size-small)',
                            fontWeight: 600,
                            color: 'var(--color-brand-primary)',
                            padding: '2px 8px',
                            background: 'rgba(59, 130, 246, 0.1)',
                            borderRadius: 'var(--radius-sm)',
                          }}
                        >
                          {item.category}
                        </span>
                      </div>
                      <div
                        style={{
                          fontSize: 'var(--font-size-small)',
                          color: 'var(--color-text-muted)',
                          lineHeight: 'var(--line-height-base)',
                        }}
                      >
                        {item.description}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          ) : (
            // No Results
            <div
              style={{
                padding: 'var(--space-10)',
                textAlign: 'center',
              }}
            >
              <div
                style={{
                  width: '80px',
                  height: '80px',
                  borderRadius: 'var(--radius-full)',
                  background: 'var(--color-surface)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto var(--space-4)',
                }}
              >
                <Search size={40} color="var(--color-text-muted)" />
              </div>
              <h3
                style={{
                  fontSize: 'var(--font-size-h3)',
                  fontWeight: 700,
                  color: 'var(--color-text)',
                  marginBottom: 'var(--space-2)',
                }}
              >
                No results found
              </h3>
              <p
                style={{
                  fontSize: 'var(--font-size-body)',
                  color: 'var(--color-text-muted)',
                }}
              >
                Try searching for features, pricing, or help topics
              </p>
            </div>
          )}
        </div>

        {/* Keyboard Shortcuts */}
        <div
          style={{
            padding: 'var(--space-4) var(--space-6)',
            borderTop: '1px solid var(--color-border)',
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--space-4)',
            fontSize: 'var(--font-size-small)',
            color: 'var(--color-text-muted)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
            <kbd
              style={{
                padding: '4px 8px',
                background: 'var(--color-surface)',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-sm)',
                fontFamily: 'monospace',
                fontSize: '11px',
              }}
            >
              ↑↓
            </kbd>
            <span>Navigate</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
            <kbd
              style={{
                padding: '4px 8px',
                background: 'var(--color-surface)',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-sm)',
                fontFamily: 'monospace',
                fontSize: '11px',
              }}
            >
              Enter
            </kbd>
            <span>Select</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
            <kbd
              style={{
                padding: '4px 8px',
                background: 'var(--color-surface)',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-sm)',
                fontFamily: 'monospace',
                fontSize: '11px',
              }}
            >
              Esc
            </kbd>
            <span>Close</span>
          </div>
        </div>
      </div>
    </div>
  );
}
