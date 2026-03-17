import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  ChevronRight,
  DollarSign,
  Download,
  FileText,
  HelpCircle,
  Menu,
  Search,
  ShoppingCart,
  Sparkles,
  User,
  X,
} from 'lucide-react';
import { useLocation, useNavigate } from 'react-router';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';
import { ThemeToggle } from './ThemeToggle';

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

const navItems = [
  { id: 'home', label: 'Home' },
  { id: 'features', label: 'Features' },
  { id: 'pricing', label: 'Pricing' },
  { id: 'downloads', label: 'Downloads' },
  { id: 'resources', label: 'Resources' },
  { id: 'help', label: 'Help' },
];

const searchableContent: SearchResult[] = [
  {
    id: 'feature-health-records',
    title: 'Health Records Management',
    description: 'Securely store and access your complete medical history',
    category: 'Features',
    path: '/#features',
    icon: FileText,
  },
  {
    id: 'feature-appointments',
    title: 'Smart Appointment Scheduling',
    description: 'Never miss an appointment with intelligent reminders',
    category: 'Features',
    path: '/#features',
    icon: FileText,
  },
  {
    id: 'feature-telemedicine',
    title: 'Telemedicine Integration',
    description: 'Connect with healthcare providers through video',
    category: 'Features',
    path: '/#features',
    icon: FileText,
  },
  {
    id: 'pricing-basic',
    title: 'Basic Plan',
    description: 'Free forever with health records and appointments',
    category: 'Pricing',
    path: '/#pricing',
    icon: DollarSign,
  },
  {
    id: 'pricing-professional',
    title: 'Professional Plan',
    description: 'Family sharing and video consultations',
    category: 'Pricing',
    path: '/#pricing',
    icon: DollarSign,
  },
  {
    id: 'pricing-enterprise',
    title: 'Enterprise Plan',
    description: 'Custom pricing for organizations',
    category: 'Pricing',
    path: '/#pricing',
    icon: DollarSign,
  },
  {
    id: 'download-ios',
    title: 'iOS App',
    description: 'Download CareConnect for iPhone and iPad',
    category: 'Downloads',
    path: '/#downloads',
    icon: Download,
  },
  {
    id: 'download-android',
    title: 'Android App',
    description: 'Get CareConnect on your Android device',
    category: 'Downloads',
    path: '/#downloads',
    icon: Download,
  },
  {
    id: 'resource-getting-started',
    title: 'Getting Started Guide',
    description: 'Learn the basics and set up your account',
    category: 'Resources',
    path: '/#resources',
    icon: FileText,
  },
  {
    id: 'resource-security',
    title: 'Security Best Practices',
    description: 'Keep your health data safe',
    category: 'Resources',
    path: '/#resources',
    icon: FileText,
  },
  {
    id: 'help-faq',
    title: 'Frequently Asked Questions',
    description: 'Find answers to common questions',
    category: 'Help',
    path: '/#help',
    icon: HelpCircle,
  },
  {
    id: 'help-support',
    title: 'Contact Support',
    description: 'Get help from our team',
    category: 'Help',
    path: '/#help',
    icon: HelpCircle,
  },
  {
    id: 'page-profile',
    title: 'My Profile',
    description: 'Manage your account',
    category: 'Account',
    path: '/profile',
    icon: Sparkles,
  },
  {
    id: 'page-cart',
    title: 'Shopping Cart',
    description: 'Review your subscription',
    category: 'Account',
    path: '/cart',
    icon: Sparkles,
  },
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
  const [activeSection, setActiveSection] = useState('home');
  const searchInputRef = useRef<HTMLInputElement>(null);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isSearchOpen) {
      setSearchQuery('');
      setSearchResults([]);
      setSelectedIndex(0);
      return;
    }

    const timer = window.setTimeout(() => searchInputRef.current?.focus(), 75);
    return () => window.clearTimeout(timer);
  }, [isSearchOpen]);

  useEffect(() => {
    if (!searchQuery.trim()) {
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

  useEffect(() => {
    if (!isSearchOpen) {
      return undefined;
    }

    const handleClickOutside = (event: MouseEvent) => {
      if (searchContainerRef.current?.contains(event.target as Node)) {
        return;
      }
      setIsSearchOpen(false);
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isSearchOpen]);

  const handleSectionNavigation = useCallback((sectionId: string) => {
    setIsMenuOpen(false);
    setIsSearchOpen(false);
    setActiveSection(sectionId);

    if (location.pathname !== '/') {
      navigate('/');
      window.setTimeout(() => {
        window.location.hash = `#${sectionId}`;
      }, 100);
      return;
    }

    window.location.hash = `#${sectionId}`;
  }, [location.pathname, navigate]);

  const handleResultClick = useCallback((result: SearchResult) => {
    if (result.path.startsWith('/#')) {
      const sectionId = result.path.replace('/#', '');
      handleSectionNavigation(sectionId);
    } else {
      setIsMenuOpen(false);
      setIsSearchOpen(false);
      navigate(result.path);
    }
  }, [handleSectionNavigation, navigate]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsSearchOpen(false);
        setIsMenuOpen(false);
        return;
      }

      if (!isSearchOpen) {
        return;
      }

      if (event.key === 'ArrowDown') {
        event.preventDefault();
        setSelectedIndex((prev) => Math.min(prev + 1, searchResults.length - 1));
      }

      if (event.key === 'ArrowUp') {
        event.preventDefault();
        setSelectedIndex((prev) => Math.max(prev - 1, 0));
      }

      if (event.key === 'Enter' && searchResults[selectedIndex]) {
        event.preventDefault();
        handleResultClick(searchResults[selectedIndex]);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleResultClick, isSearchOpen, searchResults, selectedIndex]);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  useEffect(() => {
    if (location.pathname !== '/') {
      return undefined;
    }

    const sections = navItems.map((item) => item.id);

    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      for (let index = sections.length - 1; index >= 0; index -= 1) {
        const sectionId = sections[index];
        const element = document.getElementById(sectionId);

        if (element && scrollPosition >= element.offsetTop) {
          setActiveSection(sectionId);
          return;
        }
      }

      setActiveSection('home');
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);

  return (
    <header className="site-nav" data-theme-variant={theme} role="banner">
      <nav className="site-nav__inner" aria-label="Main navigation">
        <button type="button" className="site-nav__brand" onClick={() => navigate('/')} aria-label="CareConnect home">
          <span className="site-nav__brand-mark" aria-hidden="true">
            CC
          </span>
          <span className="site-nav__brand-text">CareConnect</span>
        </button>

        {isSearchOpen ? (
          <div ref={searchContainerRef} className="site-nav__search">
            <div className="site-nav__search-inner">
              <div className="site-nav__search-frame">
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  className="site-nav__search-field"
                  placeholder="Search features, pricing, help..."
                  aria-label="Search features, pricing, and help"
                />

                {searchQuery ? (
                  <div className="site-nav__search-dropdown">
                    {searchResults.length > 0 ? (
                      searchResults.map((result, index) => {
                        const Icon = result.icon;

                        return (
                          <button
                            key={result.id}
                            type="button"
                            className="site-nav__search-result"
                            data-selected={selectedIndex === index}
                            onClick={() => handleResultClick(result)}
                            onMouseEnter={() => setSelectedIndex(index)}
                          >
                            <span className="site-nav__search-result-icon" aria-hidden="true">
                              <Icon className="cc-icon cc-icon--md" />
                            </span>
                            <span className="site-nav__search-result-copy">
                              <span className="site-nav__search-result-title-row">
                                <span className="site-nav__search-result-title">{result.title}</span>
                                <span className="site-nav__search-result-category">{result.category}</span>
                              </span>
                              <span className="site-nav__search-result-description">
                                {result.description}
                              </span>
                            </span>
                          </button>
                        );
                      })
                    ) : (
                      <p className="site-nav__search-empty">No results found for &quot;{searchQuery}&quot;</p>
                    )}
                  </div>
                ) : null}
              </div>

              <button
                type="button"
                className="site-nav__search-close"
                onClick={() => setIsSearchOpen(false)}
                aria-label="Close search"
              >
                <X className="cc-icon cc-icon--md" aria-hidden="true" />
              </button>
            </div>
          </div>
        ) : null}

        <div className="site-nav__actions">
          <div className="site-nav__desktop" data-hidden={isSearchOpen}>
            {navItems.map((item) => (
              <button
                key={item.id}
                type="button"
                className="site-nav__link"
                data-active={activeSection === item.id}
                aria-current={activeSection === item.id ? 'page' : undefined}
                onClick={() => handleSectionNavigation(item.id)}
              >
                {item.label}
              </button>
            ))}
          </div>

          <ThemeToggle />

          <button
            type="button"
            className="site-nav__icon-button"
            data-active={isSearchOpen}
            data-mobile-hidden="true"
            onClick={() => setIsSearchOpen((prev) => !prev)}
            aria-label={isSearchOpen ? 'Close search' : 'Open search'}
          >
            <Search className="cc-icon cc-icon--md" aria-hidden="true" />
          </button>

          <button
            type="button"
            className="site-nav__icon-button site-nav__cart-button"
            data-mobile-hidden="true"
            onClick={() => navigate('/cart')}
            aria-label={`Shopping cart with ${getTotalItems()} items`}
          >
            <ShoppingCart className="cc-icon cc-icon--md" aria-hidden="true" />
            {getTotalItems() > 0 ? <span className="site-nav__badge">{getTotalItems()}</span> : null}
          </button>

          <button
            type="button"
            className="site-nav__icon-button"
            data-mobile-hidden="true"
            onClick={() => navigate(isAuthenticated ? '/profile' : '/login')}
            aria-label={isAuthenticated ? 'User profile' : 'Sign in'}
          >
            <User className="cc-icon cc-icon--md" aria-hidden="true" />
          </button>

          <button
            type="button"
            className="site-nav__menu-button"
            onClick={() => setIsMenuOpen((prev) => !prev)}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {isMenuOpen ? (
              <X className="cc-icon cc-icon--lg" aria-hidden="true" />
            ) : (
              <Menu className="cc-icon cc-icon--lg" aria-hidden="true" />
            )}
          </button>
        </div>
      </nav>

      {isMenuOpen ? (
        <div id="mobile-menu" className="site-nav__drawer" role="dialog" aria-modal="true" aria-label="Mobile navigation menu">
          <nav className="site-nav__drawer-nav" aria-label="Mobile navigation">
            {navItems.map((item) => (
              <button
                key={item.id}
                type="button"
                className="site-nav__drawer-link"
                onClick={() => handleSectionNavigation(item.id)}
              >
                <span>{item.label}</span>
                <ChevronRight className="cc-icon cc-icon--lg" aria-hidden="true" />
              </button>
            ))}
          </nav>
        </div>
      ) : null}
    </header>
  );
}
