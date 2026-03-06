import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, Search, User, ChevronRight, ShoppingCart, FileText, DollarSign, Download, HelpCircle, Sparkles } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router';
import { ThemeToggle } from './ThemeToggle';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';

interface NavigationProps {
  theme?: string;
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
  { id: 'feature-health-records', title: 'Health Records Management', description: 'Securely store and access your complete medical history', category: 'Features', path: '/#features', icon: FileText },
  { id: 'feature-appointments', title: 'Smart Appointment Scheduling', description: 'Never miss an appointment with intelligent reminders', category: 'Features', path: '/#features', icon: FileText },
  { id: 'feature-telemedicine', title: 'Telemedicine Integration', description: 'Connect with healthcare providers through video', category: 'Features', path: '/#features', icon: FileText },
  // Pricing
  { id: 'pricing-basic', title: 'Basic Plan', description: 'Free forever - Health records and appointments', category: 'Pricing', path: '/#pricing', icon: DollarSign },
  { id: 'pricing-professional', title: 'Professional Plan', description: '$29/month - Family sharing and video consultations', category: 'Pricing', path: '/#pricing', icon: DollarSign },
  { id: 'pricing-enterprise', title: 'Enterprise Plan', description: 'Custom pricing - Unlimited users and HIPAA compliance', category: 'Pricing', path: '/#pricing', icon: DollarSign },
  // Downloads
  { id: 'download-ios', title: 'iOS App', description: 'Download for iPhone and iPad', category: 'Downloads', path: '/#downloads', icon: Download },
  { id: 'download-android', title: 'Android App', description: 'Get on Android device', category: 'Downloads', path: '/#downloads', icon: Download },
  // Resources
  { id: 'resource-getting-started', title: 'Getting Started Guide', description: 'Learn the basics and set up your account', category: 'Resources', path: '/#resources', icon: FileText },
  { id: 'resource-security', title: 'Security Best Practices', description: 'Keep your health data safe', category: 'Resources', path: '/#resources', icon: FileText },
  // Help
  { id: 'help-faq', title: 'FAQ', description: 'Find answers to common questions', category: 'Help', path: '/#help', icon: HelpCircle },
  { id: 'help-support', title: 'Contact Support', description: 'Get help from our team', category: 'Help', path: '/#help', icon: HelpCircle },
  // Pages
  { id: 'page-profile', title: 'My Profile', description: 'Manage your account', category: 'Account', path: '/profile', icon: Sparkles },
  { id: 'page-cart', title: 'Shopping Cart', description: 'Review your subscription', category: 'Account', path: '/cart', icon: Sparkles },
];

export function Navigation({ theme = 'dark' }: NavigationProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated } = useAuth();
  const { getTotalItems } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const [activeSection, setActiveSection] = useState('home');
  const [underlineStyle, setUnderlineStyle] = useState({ left: 0, width: 0 });
  const navLinksRef = useRef<{ [key: string]: HTMLAnchorElement | null }>({});

  // Focus input when search opens
  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => searchInputRef.current?.focus(), 100);
    } else {
      setSearchQuery('');
      setSearchResults([]);
      setSelectedIndex(0);
    }
  }, [isSearchOpen]);

  // Handle search
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setSearchResults([]);
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

    setSearchResults(filtered);
    setSelectedIndex(0);
  }, [searchQuery]);

  // Click outside to close search
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setIsSearchOpen(false);
      }
    };

    if (isSearchOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isSearchOpen]);

  // Keyboard navigation
  useEffect(() => {
    if (!isSearchOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsSearchOpen(false);
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev < searchResults.length - 1 ? prev + 1 : prev));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : 0));
      } else if (e.key === 'Enter' && searchResults.length > 0) {
        e.preventDefault();
        handleResultClick(searchResults[selectedIndex]);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isSearchOpen, searchResults, selectedIndex]);

  const handleResultClick = (result: SearchResult) => {
    if (result.path.startsWith('/#')) {
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
    setIsSearchOpen(false);
  };

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isMenuOpen]);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  useEffect(() => {
    const timer = setTimeout(() => {
      const homeLink = navLinksRef.current['home'];
      if (homeLink) {
        const rect = homeLink.getBoundingClientRect();
        const navContainer = homeLink.parentElement;
        if (navContainer) {
          const containerRect = navContainer.getBoundingClientRect();
          setUnderlineStyle({
            left: rect.left - containerRect.left,
            width: rect.width,
          });
        }
      }
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const sections = ['home', 'features', 'pricing', 'downloads', 'resources', 'help'];
    
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 3;
      for (let i = sections.length - 1; i >= 0; i--) {
        const sectionId = sections[i];
        const element = document.getElementById(sectionId);
        if (element) {
          const { offsetTop } = element;
          if (scrollPosition >= offsetTop) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const activeLink = navLinksRef.current[activeSection];
    if (activeLink) {
      const rect = activeLink.getBoundingClientRect();
      const navContainer = activeLink.parentElement;
      if (navContainer) {
        const containerRect = navContainer.getBoundingClientRect();
        setUnderlineStyle({
          left: rect.left - containerRect.left,
          width: rect.width,
        });
      }
    }
  }, [activeSection]);

  const navItems = [
    { id: 'home', label: 'HOME' },
    { id: 'features', label: 'FEATURES' },
    { id: 'pricing', label: 'PRICING' },
    { id: 'downloads', label: 'DOWNLOADS' },
    { id: 'resources', label: 'RESOURCES' },
    { id: 'help', label: 'HELP' },
  ];

  return (
    <header 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: 'var(--header-height)',
        background: 'var(--nav-bg)',
        backdropFilter: 'blur(20px)',
        zIndex: 1000,
        borderBottom: '1px solid var(--nav-border)',
        transition: 'background-color 0.3s ease, border-color 0.3s ease',
      }}
      role="banner"
    >
      <nav 
        style={{
          maxWidth: 'var(--container-max-desktop)',
          margin: '0 auto',
          padding: '0 var(--space-6)',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          position: 'relative',
        }}
        role="navigation"
        aria-label="Main navigation"
      >
        {/* Logo */}
        <button
          onClick={() => navigate('/')}
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: 'var(--space-3)',
            textDecoration: 'none',
            flex: '0 0 auto',
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            padding: 0,
            zIndex: 2,
          }}
          aria-label="CareConnect home"
        >
          <div 
            style={{
              width: '56px',
              height: '56px',
              background: 'var(--btn-primary-bg)',
              borderRadius: 'var(--radius-md)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 900,
              fontSize: '1.5rem',
              color: 'var(--btn-primary-fg)',
              boxShadow: '0 0 24px rgba(59, 130, 246, 0.5)',
            }}
            aria-hidden="true"
          >
            CC
          </div>
          <span 
            style={{
              fontSize: '1.75rem',
              fontWeight: 900,
              color: 'var(--nav-fg)',
              letterSpacing: '-0.02em',
            }}
            className="logo-text"
          >
            CareConnect
          </span>
        </button>

        {/* Right Side */}
        <div 
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: 'var(--space-8)',
            flex: '0 0 auto',
            zIndex: 2,
          }}
        >
          {/* Desktop Navigation Links */}
          <div 
            style={{
              display: 'none',
              gap: 'var(--space-7)',
              alignItems: 'center',
              position: 'relative',
              opacity: isSearchOpen ? 0 : 1,
              pointerEvents: isSearchOpen ? 'none' : 'auto',
              transition: 'opacity 0.3s ease',
            }}
            className="desktop-nav"
          >
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                ref={(el) => (navLinksRef.current[item.id] = el)}
                style={{
                  color: activeSection === item.id ? 'var(--color-text)' : 'var(--color-text-muted)',
                  textDecoration: 'none',
                  transition: `color var(--duration-fast) var(--ease-standard)`,
                  fontSize: 'var(--font-size-small)',
                  fontWeight: 700,
                  letterSpacing: '1.5px',
                  textTransform: 'uppercase',
                  outline: 'none',
                  position: 'relative',
                  padding: 'var(--space-2) 0',
                }}
                aria-current={activeSection === item.id ? 'page' : undefined}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = 'var(--color-text)';
                }}
                onMouseLeave={(e) => {
                  if (activeSection !== item.id) {
                    e.currentTarget.style.color = 'var(--color-text-muted)';
                  }
                }}
                onFocus={(e) => {
                  e.currentTarget.style.color = 'var(--color-text)';
                  e.currentTarget.style.outline = '2px solid var(--color-brand-primary)';
                  e.currentTarget.style.outlineOffset = '4px';
                }}
                onBlur={(e) => {
                  if (activeSection !== item.id) {
                    e.currentTarget.style.color = 'var(--color-text-muted)';
                  }
                  e.currentTarget.style.outline = 'none';
                }}
              >
                {item.label}
              </a>
            ))}
            
            {/* Animated Underline */}
            <div
              style={{
                position: 'absolute',
                bottom: '-8px',
                left: `${underlineStyle.left}px`,
                width: `${underlineStyle.width}px`,
                height: '3px',
                background: 'linear-gradient(90deg, #3b82f6 0%, #8b5cf6 100%)',
                borderRadius: '2px',
                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                boxShadow: '0 0 10px rgba(59, 130, 246, 0.6)',
              }}
              aria-hidden="true"
            />
          </div>

          {/* Centered Expanding Search Bar - Overlays nav links */}
          {isSearchOpen && (
            <div
              ref={searchContainerRef}
              style={{
                position: 'absolute',
                left: '50%',
                transform: 'translateX(-50%)',
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--space-3)',
                width: '600px',
                maxWidth: 'calc(100vw - 400px)',
                height: '48px',
                zIndex: 10,
                animation: 'expandSearch 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              }}
              className="search-bar-expanded"
            >
              <div style={{ flex: 1, position: 'relative' }}>
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search features, pricing, help..."
                  style={{
                    width: '100%',
                    padding: 'var(--space-3) var(--space-4)',
                    background: 'var(--color-surface)',
                    border: '1px solid var(--color-border)',
                    borderRadius: 'var(--radius-full)',
                    fontSize: 'var(--font-size-body)',
                    color: 'var(--color-text)',
                    outline: 'none',
                    transition: 'all var(--duration-fast) var(--ease-standard)',
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = 'var(--color-brand-primary)';
                    e.currentTarget.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1), 0 4px 20px rgba(0, 0, 0, 0.15)';
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = 'var(--color-border)';
                    e.currentTarget.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
                  }}
                />

                {/* Search Results Dropdown */}
                {searchQuery && searchResults.length > 0 && (
                  <div
                    style={{
                      position: 'absolute',
                      top: 'calc(100% + var(--space-2))',
                      left: 0,
                      right: 0,
                      maxHeight: '400px',
                      overflowY: 'auto',
                      background: 'var(--card-bg)',
                      border: '1px solid var(--card-border)',
                      borderRadius: 'var(--radius-lg)',
                      boxShadow: 'var(--shadow-lg)',
                      padding: 'var(--space-2)',
                      zIndex: 1000,
                    }}
                  >
                    {searchResults.map((result, index) => {
                      const IconComponent = result.icon;
                      const isSelected = index === selectedIndex;
                      return (
                        <button
                          key={result.id}
                          type="button"
                          onClick={() => handleResultClick(result)}
                          style={{
                            width: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            gap: 'var(--space-3)',
                            padding: 'var(--space-3)',
                            background: isSelected ? 'var(--color-surface)' : 'transparent',
                            border: 'none',
                            borderRadius: 'var(--radius-md)',
                            cursor: 'pointer',
                            textAlign: 'left',
                            transition: 'all var(--duration-fast) var(--ease-standard)',
                          }}
                          onMouseEnter={() => setSelectedIndex(index)}
                        >
                          <div
                            style={{
                              width: '36px',
                              height: '36px',
                              borderRadius: 'var(--radius-md)',
                              background: 'var(--color-surface)',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              flexShrink: 0,
                            }}
                          >
                            <IconComponent size={18} color="var(--color-brand-primary)" />
                          </div>
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <div
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 'var(--space-2)',
                                marginBottom: '2px',
                              }}
                            >
                              <span
                                style={{
                                  fontSize: 'var(--font-size-body)',
                                  fontWeight: 600,
                                  color: 'var(--color-text)',
                                }}
                              >
                                {result.title}
                              </span>
                              <span
                                style={{
                                  fontSize: 'var(--font-size-small)',
                                  fontWeight: 600,
                                  color: 'var(--color-brand-primary)',
                                  padding: '2px 6px',
                                  background: 'rgba(59, 130, 246, 0.1)',
                                  borderRadius: 'var(--radius-sm)',
                                }}
                              >
                                {result.category}
                              </span>
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
                              {result.description}
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                )}

                {/* No Results */}
                {searchQuery && searchResults.length === 0 && (
                  <div
                    style={{
                      position: 'absolute',
                      top: 'calc(100% + var(--space-2))',
                      left: 0,
                      right: 0,
                      background: 'var(--card-bg)',
                      border: '1px solid var(--card-border)',
                      borderRadius: 'var(--radius-lg)',
                      boxShadow: 'var(--shadow-lg)',
                      padding: 'var(--space-6)',
                      textAlign: 'center',
                    }}
                  >
                    <p
                      style={{
                        fontSize: 'var(--font-size-body)',
                        color: 'var(--color-text-muted)',
                        margin: 0,
                      }}
                    >
                      No results found for "{searchQuery}"
                    </p>
                  </div>
                )}
              </div>

              {/* Close button inside search bar */}
              <button
                type="button"
                onClick={() => setIsSearchOpen(false)}
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: 'var(--radius-full)',
                  background: 'var(--btn-primary-bg)',
                  border: 'none',
                  color: 'var(--btn-primary-fg)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: `all var(--duration-fast) var(--ease-standard)`,
                  outline: 'none',
                  flexShrink: 0,
                  boxShadow: '0 0 20px rgba(59, 130, 246, 0.5)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.05)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                }}
                onFocus={(e) => {
                  e.currentTarget.style.outline = '2px solid var(--color-brand-primary)';
                  e.currentTarget.style.outlineOffset = '2px';
                }}
                onBlur={(e) => {
                  e.currentTarget.style.outline = 'none';
                }}
                aria-label="Close search"
              >
                <X size={22} aria-hidden="true" />
              </button>
            </div>
          )}

          {/* Icon Buttons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
            <ThemeToggle />

            {/* Search Icon Button */}
            <button
              type="button"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              style={{
                width: '48px',
                height: '48px',
                borderRadius: 'var(--radius-full)',
                background: isSearchOpen ? 'var(--btn-primary-bg)' : 'rgba(255, 255, 255, 0.1)',
                border: 'none',
                color: isSearchOpen ? 'var(--btn-primary-fg)' : 'var(--nav-fg)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: `all var(--duration-fast) var(--ease-standard)`,
                outline: 'none',
                flexShrink: 0,
                boxShadow: isSearchOpen ? '0 0 20px rgba(59, 130, 246, 0.5)' : 'none',
              }}
              className="icon-button"
              onMouseEnter={(e) => {
                if (!isSearchOpen) {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }
              }}
              onMouseLeave={(e) => {
                if (!isSearchOpen) {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }
              }}
              onFocus={(e) => {
                e.currentTarget.style.outline = '2px solid var(--color-brand-primary)';
                e.currentTarget.style.outlineOffset = '2px';
              }}
              onBlur={(e) => {
                e.currentTarget.style.outline = 'none';
              }}
              aria-label={isSearchOpen ? 'Close search' : 'Open search'}
            >
              <Search size={22} aria-hidden="true" />
            </button>

            <button
              type="button"
              onClick={() => navigate('/cart')}
              style={{
                width: '48px',
                height: '48px',
                borderRadius: 'var(--radius-full)',
                background: 'rgba(255, 255, 255, 0.1)',
                border: 'none',
                color: 'var(--nav-fg)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: `all var(--duration-fast) var(--ease-standard)`,
                outline: 'none',
                position: 'relative',
              }}
              className="icon-button"
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
              onFocus={(e) => {
                e.currentTarget.style.outline = '2px solid var(--color-brand-primary)';
                e.currentTarget.style.outlineOffset = '2px';
              }}
              onBlur={(e) => {
                e.currentTarget.style.outline = 'none';
              }}
              aria-label={`Shopping cart with ${getTotalItems()} items`}
            >
              <ShoppingCart size={22} aria-hidden="true" />
              {getTotalItems() > 0 && (
                <div
                  style={{
                    position: 'absolute',
                    top: '-4px',
                    right: '-4px',
                    width: '20px',
                    height: '20px',
                    borderRadius: 'var(--radius-full)',
                    background: '#ef4444',
                    color: 'white',
                    fontSize: '11px',
                    fontWeight: 700,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 2px 8px rgba(239, 68, 68, 0.4)',
                  }}
                  aria-hidden="true"
                >
                  {getTotalItems()}
                </div>
              )}
            </button>
            
            <button
              type="button"
              onClick={() => navigate(isAuthenticated ? '/profile' : '/login')}
              style={{
                width: '48px',
                height: '48px',
                borderRadius: 'var(--radius-full)',
                background: 'rgba(255, 255, 255, 0.1)',
                border: 'none',
                color: 'var(--nav-fg)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: `all var(--duration-fast) var(--ease-standard)`,
                outline: 'none',
              }}
              className="icon-button"
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
              onFocus={(e) => {
                e.currentTarget.style.outline = '2px solid var(--color-brand-primary)';
                e.currentTarget.style.outlineOffset = '2px';
              }}
              onBlur={(e) => {
                e.currentTarget.style.outline = 'none';
              }}
              aria-label={isAuthenticated ? 'User profile' : 'Sign in'}
            >
              <User size={22} aria-hidden="true" />
            </button>

            <button
              type="button"
              style={{
                width: '48px',
                height: '48px',
                borderRadius: 'var(--radius-md)',
                background: 'rgba(255, 255, 255, 0.1)',
                border: 'none',
                color: 'var(--nav-fg)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                outline: 'none',
              }}
              className="mobile-menu-btn"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
              onFocus={(e) => {
                e.currentTarget.style.outline = '2px solid var(--color-brand-primary)';
                e.currentTarget.style.outlineOffset = '2px';
              }}
              onBlur={(e) => {
                e.currentTarget.style.outline = 'none';
              }}
            >
              {isMenuOpen ? <X size={24} aria-hidden="true" /> : <Menu size={24} aria-hidden="true" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Drawer */}
      {isMenuOpen && (
        <div
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation menu"
          style={{
            position: 'fixed',
            top: 'var(--header-height)',
            left: 0,
            right: 0,
            height: `calc(100vh - var(--header-height))`,
            backgroundColor: 'var(--color-bg)',
            padding: '32px 20px',
            zIndex: 999,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-evenly',
          }}
        >
          <nav aria-label="Mobile navigation">
            {['Home', 'Features', 'Pricing', 'Downloads', 'Resources', 'Help'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                style={{
                  padding: '24px',
                  color: 'var(--color-text)',
                  textDecoration: 'none',
                  borderRadius: '16px',
                  backgroundColor: 'rgba(59, 130, 246, 0.15)',
                  border: '2px solid rgba(59, 130, 246, 0.3)',
                  fontSize: '22px',
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  height: '90px',
                  transition: 'all 0.2s ease',
                  marginBottom: 'var(--space-4)',
                  outline: 'none',
                }}
                onClick={() => setIsMenuOpen(false)}
                onFocus={(e) => {
                  e.currentTarget.style.outline = '3px solid var(--color-brand-primary)';
                  e.currentTarget.style.outlineOffset = '2px';
                }}
                onBlur={(e) => {
                  e.currentTarget.style.outline = 'none';
                }}
              >
                <span>{item}</span>
                <ChevronRight size={28} strokeWidth={3} color="var(--color-text)" aria-hidden="true" />
              </a>
            ))}
          </nav>
        </div>
      )}

      <style>{`
        @media (min-width: 1024px) {
          .desktop-nav {
            display: flex !important;
          }
          .mobile-menu-btn {
            display: none !important;
          }
        }

        @media (max-width: 1023px) {
          .desktop-nav {
            display: none !important;
          }
          .logo-text {
            display: none;
          }
          .search-container {
            width: ${isSearchOpen ? '300px' : '48px'} !important;
          }
        }

        @media (max-width: 768px) {
          .other-icons .icon-button:not(.mobile-menu-btn) {
            display: none !important;
          }
          .search-container {
            width: ${isSearchOpen ? '200px' : '48px'} !important;
          }
        }

        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes expandSearch {
          from {
            width: 48px;
          }
          to {
            width: 600px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </header>
  );
}