import { HelpCircle, Keyboard, Book, Mail, ExternalLink, Eye, Palette } from 'lucide-react';
import { useNavigate } from 'react-router';
import { BackButton } from '../components/BackButton';

export function Help() {
  const navigate = useNavigate();

  const shortcuts = [
    { keys: 'Alt + T', description: 'Toggle theme switcher' },
    { keys: 'Ctrl + /', description: 'Keyboard shortcuts' },
    { keys: 'F1', description: 'Help documentation' },
    { keys: 'Esc', description: 'Close dialog or go back' },
  ];

  return (
    <div className="h-full flex flex-col p-6">
      {/* Back Button */}
      <div className="mb-4">
        <BackButton />
      </div>

      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-4">
          <div 
            className="p-3 rounded-lg"
            style={{
              backgroundColor: 'var(--btn-primary-bg)',
              color: 'var(--btn-primary-fg)',
            }}
          >
            <HelpCircle size={24} />
          </div>
          <h1 
            style={{
              fontSize: 'var(--font-size-page)',
              fontWeight: '600',
              color: 'var(--color-text)',
            }}
          >
            Help & Support
          </h1>
        </div>
        <p 
          style={{
            fontSize: 'var(--font-size-body)',
            color: 'var(--color-text-muted)',
          }}
        >
          Get assistance and learn more about CareConnect
        </p>
      </div>

      {/* Help Sections */}
      <div className="flex-1 overflow-y-auto space-y-4">
        {/* Keyboard Shortcuts */}
        <div
          className="p-5 rounded-lg"
          style={{
            backgroundColor: 'var(--color-surface)',
            border: '1px solid var(--color-border)',
            boxShadow: 'var(--shadow-sm)',
          }}
        >
          <div className="flex items-center gap-3 mb-4">
            <Keyboard size={20} style={{ color: 'var(--color-focus)' }} />
            <h3 
              style={{
                fontSize: 'var(--font-size-section)',
                fontWeight: '600',
                color: 'var(--color-text)',
              }}
            >
              Keyboard Shortcuts
            </h3>
          </div>
          <p 
            className="mb-3"
            style={{
              fontSize: 'var(--font-size-body)',
              color: 'var(--color-text-muted)',
            }}
          >
            Navigate faster with keyboard shortcuts. View the complete reference guide with all available shortcuts.
          </p>
          <button
            onClick={() => navigate('/dashboard/shortcuts')}
            className="mb-4 px-4 py-2 rounded-lg transition-all outline-none inline-flex items-center gap-2"
            style={{
              backgroundColor: 'var(--btn-primary-bg)',
              color: 'var(--btn-primary-fg)',
              fontSize: 'var(--font-size-body)',
              fontWeight: '500',
              transition: 'var(--transition-medium)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--btn-primary-hover-bg)';
              e.currentTarget.style.color = 'var(--btn-primary-hover-fg)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--btn-primary-bg)';
              e.currentTarget.style.color = 'var(--btn-primary-fg)';
            }}
            onFocus={(e) => {
              e.currentTarget.style.outline = `var(--focus-ring-width) solid var(--focus-ring-color)`;
              e.currentTarget.style.outlineOffset = 'var(--focus-ring-offset)';
            }}
            onBlur={(e) => {
              e.currentTarget.style.outline = 'none';
            }}
          >
            <Keyboard size={18} />
            View All Shortcuts
          </button>
          <div className="space-y-2">
            {shortcuts.map((shortcut, index) => (
              <div 
                key={index}
                className="flex items-center justify-between py-2"
                style={{
                  borderBottom: index < shortcuts.length - 1 ? '1px solid var(--color-border)' : 'none',
                }}
              >
                <span 
                  style={{
                    fontSize: 'var(--font-size-body)',
                    color: 'var(--color-text)',
                  }}
                >
                  {shortcut.description}
                </span>
                <kbd 
                  className="px-2 py-1 rounded"
                  style={{
                    backgroundColor: 'var(--color-bg)',
                    border: '1px solid var(--color-border)',
                    fontSize: 'var(--font-size-small)',
                    fontFamily: 'monospace',
                    color: 'var(--color-text)',
                  }}
                >
                  {shortcut.keys}
                </kbd>
              </div>
            ))}
          </div>
        </div>

        {/* Accessibility Features */}
        <div
          className="p-5 rounded-lg"
          style={{
            backgroundColor: 'var(--color-surface)',
            border: '1px solid var(--color-border)',
            boxShadow: 'var(--shadow-sm)',
          }}
        >
          <div className="flex items-center gap-3 mb-4">
            <Eye size={20} style={{ color: 'var(--color-focus)' }} />
            <h3 
              style={{
                fontSize: 'var(--font-size-section)',
                fontWeight: '600',
                color: 'var(--color-text)',
              }}
            >
              Accessibility Features
            </h3>
          </div>
          <p 
            className="mb-4"
            style={{
              fontSize: 'var(--font-size-body)',
              color: 'var(--color-text-muted)',
            }}
          >
            CareConnect is designed with accessibility in mind, ensuring all users can navigate and interact with the application effectively.
          </p>
          <ul className="space-y-3">
            <li style={{ fontSize: 'var(--font-size-body)', color: 'var(--color-text)' }}>
              <strong>Screen Reader Support:</strong> Full ARIA labels, roles, and landmarks for NVDA, JAWS, and VoiceOver compatibility
            </li>
            <li style={{ fontSize: 'var(--font-size-body)', color: 'var(--color-text)' }}>
              <strong>Keyboard Navigation:</strong> Complete keyboard-only navigation with visible focus indicators (Tab, Shift+Tab, Enter, Escape)
            </li>
            <li style={{ fontSize: 'var(--font-size-body)', color: 'var(--color-text)' }}>
              <strong>Skip Links:</strong> Press Tab on page load to access "Skip to main content" and "Skip to navigation" links
            </li>
            <li style={{ fontSize: 'var(--font-size-body)', color: 'var(--color-text)' }}>
              <strong>Adjustable Text Size:</strong> Scale text from 100% to 250% in Settings → Appearance
            </li>
            <li style={{ fontSize: 'var(--font-size-body)', color: 'var(--color-text)' }}>
              <strong>Adjustable UI Elements:</strong> Resize radial menu (100-250%) and toolbar icons (100-150%) in Settings
            </li>
            <li style={{ fontSize: 'var(--font-size-body)', color: 'var(--color-text)' }}>
              <strong>High Contrast Themes:</strong> Multiple theme options with WCAG-compliant color contrast ratios (4.5:1 for text, 3:1 for UI)
            </li>
            <li style={{ fontSize: 'var(--font-size-body)', color: 'var(--color-text)' }}>
              <strong>Focus Management:</strong> Clear focus indicators with customizable focus rings on all interactive elements
            </li>
            <li style={{ fontSize: 'var(--font-size-body)', color: 'var(--color-text)' }}>
              <strong>Live Regions:</strong> Screen reader announcements for dynamic content changes and important actions
            </li>
          </ul>
          <button
            onClick={() => navigate('/dashboard/settings')}
            className="mt-4 px-4 py-2 rounded-lg transition-all outline-none inline-flex items-center gap-2"
            style={{
              backgroundColor: 'var(--btn-secondary-bg)',
              color: 'var(--btn-secondary-fg)',
              fontSize: 'var(--font-size-body)',
              fontWeight: '500',
              transition: 'var(--transition-medium)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--btn-secondary-hover-bg)';
              e.currentTarget.style.color = 'var(--btn-secondary-hover-fg)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--btn-secondary-bg)';
              e.currentTarget.style.color = 'var(--btn-secondary-fg)';
            }}
            onFocus={(e) => {
              e.currentTarget.style.outline = `var(--focus-ring-width) solid var(--focus-ring-color)`;
              e.currentTarget.style.outlineOffset = 'var(--focus-ring-offset)';
            }}
            onBlur={(e) => {
              e.currentTarget.style.outline = 'none';
            }}
            aria-label="Go to Settings to adjust accessibility features"
          >
            <Eye size={18} />
            Adjust Accessibility Settings
          </button>
          <button
            onClick={() => navigate('/dashboard/accessibility-annotations')}
            className="mt-3 px-4 py-2 rounded-lg transition-all outline-none inline-flex items-center gap-2"
            style={{
              backgroundColor: 'var(--btn-primary-bg)',
              color: 'var(--btn-primary-fg)',
              fontSize: 'var(--font-size-body)',
              fontWeight: '500',
              transition: 'var(--transition-medium)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--btn-primary-hover-bg)';
              e.currentTarget.style.color = 'var(--btn-primary-hover-fg)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--btn-primary-bg)';
              e.currentTarget.style.color = 'var(--btn-primary-fg)';
            }}
            onFocus={(e) => {
              e.currentTarget.style.outline = `var(--focus-ring-width) solid var(--focus-ring-color)`;
              e.currentTarget.style.outlineOffset = 'var(--focus-ring-offset)';
            }}
            onBlur={(e) => {
              e.currentTarget.style.outline = 'none';
            }}
            aria-label="View detailed accessibility compliance documentation"
          >
            <Eye size={18} />
            View WCAG Compliance Documentation
          </button>
        </div>

        {/* UI Component Library */}
        <div
          className="p-5 rounded-lg"
          style={{
            backgroundColor: 'var(--color-surface)',
            border: '1px solid var(--color-border)',
            boxShadow: 'var(--shadow-sm)',
          }}
        >
          <div className="flex items-center gap-3 mb-4">
            <Palette size={20} style={{ color: 'var(--color-focus)' }} />
            <h3 
              style={{
                fontSize: 'var(--font-size-section)',
                fontWeight: '600',
                color: 'var(--color-text)',
              }}
            >
              UI Component Library
            </h3>
          </div>
          <p 
            className="mb-4"
            style={{
              fontSize: 'var(--font-size-body)',
              color: 'var(--color-text-muted)',
            }}
          >
            Explore the complete design system with all UI components, typography, colors, and styling tokens used throughout CareConnect.
          </p>
          <button
            onClick={() => navigate('/dashboard/ui-library')}
            className="px-4 py-2 rounded-lg transition-all outline-none inline-flex items-center gap-2"
            style={{
              backgroundColor: 'var(--btn-primary-bg)',
              color: 'var(--btn-primary-fg)',
              fontSize: 'var(--font-size-body)',
              fontWeight: '500',
              transition: 'var(--transition-medium)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--btn-primary-hover-bg)';
              e.currentTarget.style.color = 'var(--btn-primary-hover-fg)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--btn-primary-bg)';
              e.currentTarget.style.color = 'var(--btn-primary-fg)';
            }}
            onFocus={(e) => {
              e.currentTarget.style.outline = `var(--focus-ring-width) solid var(--focus-ring-color)`;
              e.currentTarget.style.outlineOffset = 'var(--focus-ring-offset)';
            }}
            onBlur={(e) => {
              e.currentTarget.style.outline = 'none';
            }}
            aria-label="View the complete UI component library"
          >
            <Palette size={18} />
            View Component Library
          </button>
        </div>

        {/* Documentation */}
        <div
          className="p-5 rounded-lg"
          style={{
            backgroundColor: 'var(--color-surface)',
            border: '1px solid var(--color-border)',
            boxShadow: 'var(--shadow-sm)',
          }}
        >
          <div className="flex items-center gap-3 mb-4">
            <Book size={20} style={{ color: 'var(--color-focus)' }} />
            <h3 
              style={{
                fontSize: 'var(--font-size-section)',
                fontWeight: '600',
                color: 'var(--color-text)',
              }}
            >
              Documentation
            </h3>
          </div>
          <ul className="space-y-2">
            <li>
              <a
                href="#"
                className="inline-flex items-center gap-2 transition-colors outline-none"
                style={{
                  fontSize: 'var(--font-size-body)',
                  color: 'var(--color-focus)',
                  transition: 'var(--transition-fast)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.textDecoration = 'underline';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.textDecoration = 'none';
                }}
                onFocus={(e) => {
                  e.currentTarget.style.outline = `var(--focus-ring-width) solid var(--focus-ring-color)`;
                  e.currentTarget.style.outlineOffset = 'var(--focus-ring-offset)';
                }}
                onBlur={(e) => {
                  e.currentTarget.style.outline = 'none';
                }}
              >
                Getting Started Guide
                <ExternalLink size={14} />
              </a>
            </li>
            <li>
              <a
                href="#"
                className="inline-flex items-center gap-2 transition-colors outline-none"
                style={{
                  fontSize: 'var(--font-size-body)',
                  color: 'var(--color-focus)',
                  transition: 'var(--transition-fast)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.textDecoration = 'underline';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.textDecoration = 'none';
                }}
                onFocus={(e) => {
                  e.currentTarget.style.outline = `var(--focus-ring-width) solid var(--focus-ring-color)`;
                  e.currentTarget.style.outlineOffset = 'var(--focus-ring-offset)';
                }}
                onBlur={(e) => {
                  e.currentTarget.style.outline = 'none';
                }}
              >
                User Manual
                <ExternalLink size={14} />
              </a>
            </li>
            <li>
              <a
                href="#"
                className="inline-flex items-center gap-2 transition-colors outline-none"
                style={{
                  fontSize: 'var(--font-size-body)',
                  color: 'var(--color-focus)',
                  transition: 'var(--transition-fast)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.textDecoration = 'underline';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.textDecoration = 'none';
                }}
                onFocus={(e) => {
                  e.currentTarget.style.outline = `var(--focus-ring-width) solid var(--focus-ring-color)`;
                  e.currentTarget.style.outlineOffset = 'var(--focus-ring-offset)';
                }}
                onBlur={(e) => {
                  e.currentTarget.style.outline = 'none';
                }}
              >
                Accessibility Features
                <ExternalLink size={14} />
              </a>
            </li>
          </ul>
        </div>

        {/* Contact Support */}
        <div
          className="p-5 rounded-lg"
          style={{
            backgroundColor: 'var(--color-surface)',
            border: '1px solid var(--color-border)',
            boxShadow: 'var(--shadow-sm)',
          }}
        >
          <div className="flex items-center gap-3 mb-4">
            <Mail size={20} style={{ color: 'var(--color-focus)' }} />
            <h3 
              style={{
                fontSize: 'var(--font-size-section)',
                fontWeight: '600',
                color: 'var(--color-text)',
              }}
            >
              Contact Support
            </h3>
          </div>
          <p 
            className="mb-4"
            style={{
              fontSize: 'var(--font-size-body)',
              color: 'var(--color-text-muted)',
            }}
          >
            Need help? Our support team is here for you.
          </p>
          <div className="space-y-2">
            <p 
              style={{
                fontSize: 'var(--font-size-body)',
                color: 'var(--color-text)',
              }}
            >
              <strong>Email:</strong> support@careconnect.com
            </p>
            <p 
              style={{
                fontSize: 'var(--font-size-body)',
                color: 'var(--color-text)',
              }}
            >
              <strong>Phone:</strong> 1-800-CARE-123
            </p>
            <p 
              style={{
                fontSize: 'var(--font-size-body)',
                color: 'var(--color-text)',
              }}
            >
              <strong>Hours:</strong> Monday - Friday, 8AM - 8PM EST
            </p>
          </div>
          <button
            className="mt-4 px-4 py-2 rounded-lg transition-all outline-none"
            style={{
              backgroundColor: 'var(--btn-primary-bg)',
              color: 'var(--btn-primary-fg)',
              fontSize: 'var(--font-size-body)',
              fontWeight: '500',
              transition: 'var(--transition-medium)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--btn-primary-hover-bg)';
              e.currentTarget.style.color = 'var(--btn-primary-hover-fg)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--btn-primary-bg)';
              e.currentTarget.style.color = 'var(--btn-primary-fg)';
            }}
            onFocus={(e) => {
              e.currentTarget.style.outline = `var(--focus-ring-width) solid var(--focus-ring-color)`;
              e.currentTarget.style.outlineOffset = 'var(--focus-ring-offset)';
            }}
            onBlur={(e) => {
              e.currentTarget.style.outline = 'none';
            }}
          >
            Send Feedback
          </button>
        </div>

        {/* About */}
        <div
          className="p-5 rounded-lg"
          style={{
            backgroundColor: 'var(--color-surface)',
            border: '1px solid var(--color-border)',
            boxShadow: 'var(--shadow-sm)',
          }}
        >
          <h3 
            className="mb-2"
            style={{
              fontSize: 'var(--font-size-section)',
              fontWeight: '600',
              color: 'var(--color-text)',
            }}
          >
            About CareConnect
          </h3>
          <p 
            className="mb-2"
            style={{
              fontSize: 'var(--font-size-body)',
              color: 'var(--color-text-muted)',
            }}
          >
            Version 1.0.0
          </p>
          <p 
            style={{
              fontSize: 'var(--font-size-body)',
              color: 'var(--color-text-muted)',
            }}
          >
            CareConnect is designed to help caregivers provide the best possible care for their patients with intuitive tools and accessibility features.
          </p>
        </div>
      </div>
    </div>
  );
}