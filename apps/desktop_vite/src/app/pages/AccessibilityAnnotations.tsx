import { BackButton } from '../components/BackButton';
import { ScreenReaderOrderModal } from '../components/ScreenReaderOrderModal';
import { 
  Check,
  Eye,
  Keyboard,
  Monitor,
  Volume2,
  MousePointer,
  Contrast,
  Type,
  Focus,
  Image
} from 'lucide-react';
import { useState } from 'react';

export function AccessibilityAnnotations() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div 
      className="h-full overflow-auto"
      style={{
        backgroundColor: 'var(--color-bg)',
        color: 'var(--color-text)',
      }}
    >
      {/* Header with Back Button */}
      <div 
        className="sticky top-0 z-10 flex items-center gap-4 px-6 py-4"
        style={{
          backgroundColor: 'var(--color-bg)',
          borderBottom: '1px solid var(--color-border)',
        }}
      >
        <BackButton />
        <div>
          <h1 
            className="m-0"
            style={{
              fontSize: 'var(--font-size-2xl)',
              fontWeight: 'var(--font-weight-semibold)',
              color: 'var(--color-text)',
            }}
          >
            Accessibility Annotations
          </h1>
          <p 
            className="m-0 mt-1"
            style={{
              fontSize: 'var(--font-size-sm)',
              color: 'var(--color-text-secondary)',
            }}
          >
            WCAG 2.1 AA compliance documentation and accessibility features
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-6 py-6 max-w-7xl mx-auto">
        
        {/* Overview Section */}
        <section className="mb-12">
          <div 
            className="p-6 rounded"
            style={{
              backgroundColor: 'var(--color-success-bg)',
              border: '2px solid var(--color-success)',
            }}
          >
            <div className="flex items-start gap-4">
              <Check 
                size={32}
                style={{ color: 'var(--color-success)', flexShrink: 0 }}
              />
              <div>
                <h2 
                  className="mt-0 mb-3"
                  style={{
                    fontSize: 'var(--font-size-xl)',
                    fontWeight: 'var(--font-weight-semibold)',
                    color: 'var(--color-success)',
                  }}
                >
                  WCAG 2.1 Level AA Compliant
                </h2>
                <p style={{ margin: 0, color: 'var(--color-success)', lineHeight: 1.6 }}>
                  CareConnect meets Web Content Accessibility Guidelines (WCAG) 2.1 Level AA standards, 
                  ensuring the application is accessible to users with diverse abilities including visual, 
                  auditory, motor, and cognitive disabilities.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Key Accessibility Features */}
        <section className="mb-12">
          <h2 
            className="mb-6"
            style={{
              fontSize: 'var(--font-size-xl)',
              fontWeight: 'var(--font-weight-semibold)',
              color: 'var(--color-text)',
              paddingBottom: '12px',
              borderBottom: '2px solid var(--color-border)',
            }}
          >
            Key Accessibility Features
          </h2>
          
          <div className="grid gap-4">
            
            {/* Keyboard Navigation */}
            <div 
              className="p-6 rounded"
              style={{
                backgroundColor: 'var(--color-surface)',
                border: '1px solid var(--color-border)',
                boxShadow: 'var(--shadow-sm)',
              }}
            >
              <div className="flex items-start gap-4">
                <div 
                  className="p-3 rounded"
                  style={{
                    backgroundColor: 'var(--btn-primary-bg)',
                  }}
                >
                  <Keyboard 
                    size={24}
                    style={{ color: 'var(--btn-primary-fg)' }}
                  />
                </div>
                <div className="flex-1">
                  <h3 
                    className="mt-0 mb-2"
                    style={{
                      fontSize: 'var(--font-size-lg)',
                      fontWeight: 'var(--font-weight-semibold)',
                    }}
                  >
                    Complete Keyboard Navigation
                  </h3>
                  <p style={{ color: 'var(--color-text-secondary)', marginBottom: '12px' }}>
                    All interactive elements are fully accessible via keyboard without requiring a mouse.
                  </p>
                  <ul style={{ margin: 0, paddingLeft: '20px', color: 'var(--color-text-secondary)' }}>
                    <li><strong>Tab/Shift+Tab:</strong> Navigate between focusable elements</li>
                    <li><strong>Enter/Space:</strong> Activate buttons and controls</li>
                    <li><strong>Arrow Keys:</strong> Navigate within menus and lists</li>
                    <li><strong>Escape:</strong> Close dialogs and cancel operations</li>
                    <li><strong>Alt+T:</strong> Toggle theme switcher</li>
                    <li><strong>Ctrl+K:</strong> Open keyboard shortcuts reference</li>
                  </ul>
                  <div 
                    className="mt-4 px-3 py-2 rounded inline-block"
                    style={{
                      backgroundColor: 'var(--color-info-bg)',
                      color: 'var(--color-info)',
                      fontSize: 'var(--font-size-sm)',
                      fontWeight: 'var(--font-weight-medium)',
                    }}
                  >
                    ✓ WCAG 2.1.1 (Level A) - Keyboard Accessible
                  </div>
                </div>
              </div>
            </div>

            {/* Focus Indicators */}
            <div 
              className="p-6 rounded"
              style={{
                backgroundColor: 'var(--color-surface)',
                border: '1px solid var(--color-border)',
                boxShadow: 'var(--shadow-sm)',
              }}
            >
              <div className="flex items-start gap-4">
                <div 
                  className="p-3 rounded"
                  style={{
                    backgroundColor: 'var(--btn-primary-bg)',
                  }}
                >
                  <Focus 
                    size={24}
                    style={{ color: 'var(--btn-primary-fg)' }}
                  />
                </div>
                <div className="flex-1">
                  <h3 
                    className="mt-0 mb-2"
                    style={{
                      fontSize: 'var(--font-size-lg)',
                      fontWeight: 'var(--font-weight-semibold)',
                    }}
                  >
                    Visible Focus Indicators
                  </h3>
                  <p style={{ color: 'var(--color-text-secondary)', marginBottom: '12px' }}>
                    All focusable elements display a clear 2px outline using the theme's focus ring color.
                  </p>
                  <div className="flex gap-3 mb-4">
                    <button
                      className="px-4 py-2 rounded"
                      style={{
                        backgroundColor: 'var(--btn-primary-bg)',
                        color: 'var(--btn-primary-fg)',
                        border: 'none',
                        cursor: 'pointer',
                      }}
                      onFocus={(e) => {
                        e.currentTarget.style.outline = '2px solid var(--focus-ring)';
                        e.currentTarget.style.outlineOffset = '2px';
                      }}
                      onBlur={(e) => {
                        e.currentTarget.style.outline = 'none';
                      }}
                    >
                      Tab to Focus Me
                    </button>
                    <input
                      type="text"
                      placeholder="Or focus this input"
                      className="px-3 py-2 rounded"
                      style={{
                        backgroundColor: 'var(--input-bg)',
                        color: 'var(--input-fg)',
                        border: '1px solid var(--input-border)',
                      }}
                      onFocus={(e) => {
                        e.currentTarget.style.outline = '2px solid var(--focus-ring)';
                        e.currentTarget.style.outlineOffset = '0px';
                      }}
                      onBlur={(e) => {
                        e.currentTarget.style.outline = 'none';
                      }}
                    />
                  </div>
                  <div 
                    className="mt-4 px-3 py-2 rounded inline-block"
                    style={{
                      backgroundColor: 'var(--color-info-bg)',
                      color: 'var(--color-info)',
                      fontSize: 'var(--font-size-sm)',
                      fontWeight: 'var(--font-weight-medium)',
                    }}
                  >
                    ✓ WCAG 2.4.7 (Level AA) - Focus Visible
                  </div>
                </div>
              </div>
            </div>

            {/* Screen Reader Support */}
            <div 
              className="p-6 rounded"
              style={{
                backgroundColor: 'var(--color-surface)',
                border: '1px solid var(--color-border)',
                boxShadow: 'var(--shadow-sm)',
              }}
            >
              <div className="flex items-start gap-4">
                <div 
                  className="p-3 rounded"
                  style={{
                    backgroundColor: 'var(--btn-primary-bg)',
                  }}
                >
                  <Volume2 
                    size={24}
                    style={{ color: 'var(--btn-primary-fg)' }}
                  />
                </div>
                <div className="flex-1">
                  <h3 
                    className="mt-0 mb-2"
                    style={{
                      fontSize: 'var(--font-size-lg)',
                      fontWeight: 'var(--font-weight-semibold)',
                    }}
                  >
                    Screen Reader Compatible
                  </h3>
                  <p style={{ color: 'var(--color-text-secondary)', marginBottom: '12px' }}>
                    Comprehensive ARIA labels, roles, and live regions for assistive technology.
                  </p>
                  <ul style={{ margin: 0, paddingLeft: '20px', color: 'var(--color-text-secondary)' }}>
                    <li><strong>Semantic HTML:</strong> Proper heading hierarchy (h1-h6)</li>
                    <li><strong>ARIA Labels:</strong> Descriptive labels for all interactive elements</li>
                    <li><strong>ARIA Live Regions:</strong> Dynamic content updates announced</li>
                    <li><strong>Alt Text:</strong> All images include descriptive alternative text</li>
                    <li><strong>Form Labels:</strong> All inputs properly associated with labels</li>
                    <li><strong>Skip Links:</strong> Allow bypassing repetitive navigation</li>
                  </ul>
                  <div 
                    className="mt-4 px-3 py-2 rounded inline-block"
                    style={{
                      backgroundColor: 'var(--color-info-bg)',
                      color: 'var(--color-info)',
                      fontSize: 'var(--font-size-sm)',
                      fontWeight: 'var(--font-weight-medium)',
                    }}
                  >
                    ✓ WCAG 4.1.2 (Level A) - Name, Role, Value
                  </div>
                </div>
              </div>
            </div>

            {/* Color Contrast */}
            <div 
              className="p-6 rounded"
              style={{
                backgroundColor: 'var(--color-surface)',
                border: '1px solid var(--color-border)',
                boxShadow: 'var(--shadow-sm)',
              }}
            >
              <div className="flex items-start gap-4">
                <div 
                  className="p-3 rounded"
                  style={{
                    backgroundColor: 'var(--btn-primary-bg)',
                  }}
                >
                  <Contrast 
                    size={24}
                    style={{ color: 'var(--btn-primary-fg)' }}
                  />
                </div>
                <div className="flex-1">
                  <h3 
                    className="mt-0 mb-2"
                    style={{
                      fontSize: 'var(--font-size-lg)',
                      fontWeight: 'var(--font-weight-semibold)',
                    }}
                  >
                    WCAG Contrast Ratios
                  </h3>
                  <p style={{ color: 'var(--color-text-secondary)', marginBottom: '12px' }}>
                    All text meets or exceeds required contrast ratios for readability.
                  </p>
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div 
                      className="p-3 rounded"
                      style={{
                        backgroundColor: 'var(--color-bg)',
                        border: '1px solid var(--color-border)',
                      }}
                    >
                      <div style={{ fontSize: 'var(--font-size-base)', fontWeight: 'var(--font-weight-semibold)', marginBottom: '4px' }}>
                        Normal Text
                      </div>
                      <div style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)' }}>
                        Minimum 4.5:1 ratio
                      </div>
                    </div>
                    <div 
                      className="p-3 rounded"
                      style={{
                        backgroundColor: 'var(--color-bg)',
                        border: '1px solid var(--color-border)',
                      }}
                    >
                      <div style={{ fontSize: 'var(--font-size-lg)', fontWeight: 'var(--font-weight-semibold)', marginBottom: '4px' }}>
                        Large Text
                      </div>
                      <div style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)' }}>
                        Minimum 3:1 ratio
                      </div>
                    </div>
                  </div>
                  <div 
                    className="px-3 py-2 rounded inline-block"
                    style={{
                      backgroundColor: 'var(--color-info-bg)',
                      color: 'var(--color-info)',
                      fontSize: 'var(--font-size-sm)',
                      fontWeight: 'var(--font-weight-medium)',
                    }}
                  >
                    ✓ WCAG 1.4.3 (Level AA) - Contrast (Minimum)
                  </div>
                </div>
              </div>
            </div>

            {/* Text Resizing */}
            <div 
              className="p-6 rounded"
              style={{
                backgroundColor: 'var(--color-surface)',
                border: '1px solid var(--color-border)',
                boxShadow: 'var(--shadow-sm)',
              }}
            >
              <div className="flex items-start gap-4">
                <div 
                  className="p-3 rounded"
                  style={{
                    backgroundColor: 'var(--btn-primary-bg)',
                  }}
                >
                  <Type 
                    size={24}
                    style={{ color: 'var(--btn-primary-fg)' }}
                  />
                </div>
                <div className="flex-1">
                  <h3 
                    className="mt-0 mb-2"
                    style={{
                      fontSize: 'var(--font-size-lg)',
                      fontWeight: 'var(--font-weight-semibold)',
                    }}
                  >
                    Scalable Typography
                  </h3>
                  <p style={{ color: 'var(--color-text-secondary)', marginBottom: '12px' }}>
                    Text can be resized up to 200% without loss of content or functionality.
                  </p>
                  <ul style={{ margin: 0, paddingLeft: '20px', color: 'var(--color-text-secondary)' }}>
                    <li>Uses relative units (rem, em) instead of fixed pixels</li>
                    <li>Respects user's browser text size preferences</li>
                    <li>Layouts adapt gracefully to larger text sizes</li>
                    <li>No horizontal scrolling required when zoomed</li>
                  </ul>
                  <div 
                    className="mt-4 px-3 py-2 rounded inline-block"
                    style={{
                      backgroundColor: 'var(--color-info-bg)',
                      color: 'var(--color-info)',
                      fontSize: 'var(--font-size-sm)',
                      fontWeight: 'var(--font-weight-medium)',
                    }}
                  >
                    ✓ WCAG 1.4.4 (Level AA) - Resize Text
                  </div>
                </div>
              </div>
            </div>

            {/* Interactive Element States */}
            <div 
              className="p-6 rounded"
              style={{
                backgroundColor: 'var(--color-surface)',
                border: '1px solid var(--color-border)',
                boxShadow: 'var(--shadow-sm)',
              }}
            >
              <div className="flex items-start gap-4">
                <div 
                  className="p-3 rounded"
                  style={{
                    backgroundColor: 'var(--btn-primary-bg)',
                  }}
                >
                  <MousePointer 
                    size={24}
                    style={{ color: 'var(--btn-primary-fg)' }}
                  />
                </div>
                <div className="flex-1">
                  <h3 
                    className="mt-0 mb-2"
                    style={{
                      fontSize: 'var(--font-size-lg)',
                      fontWeight: 'var(--font-weight-semibold)',
                    }}
                  >
                    Clear Interactive States
                  </h3>
                  <p style={{ color: 'var(--color-text-secondary)', marginBottom: '12px' }}>
                    All buttons and interactive elements have visible hover, focus, and active states.
                  </p>
                  <div className="flex gap-3 mb-4">
                    <div className="flex flex-col gap-2">
                      <button
                        className="px-4 py-2 rounded transition-all duration-200"
                        style={{
                          backgroundColor: 'var(--btn-primary-bg)',
                          color: 'var(--btn-primary-fg)',
                          border: 'none',
                          cursor: 'pointer',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = 'var(--btn-primary-hover-bg)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = 'var(--btn-primary-bg)';
                        }}
                      >
                        Hover Me
                      </button>
                      <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-secondary)', textAlign: 'center' }}>
                        Hover State
                      </span>
                    </div>
                    <div className="flex flex-col gap-2">
                      <button
                        className="px-4 py-2 rounded"
                        style={{
                          backgroundColor: 'var(--btn-primary-bg)',
                          color: 'var(--btn-primary-fg)',
                          border: 'none',
                          cursor: 'pointer',
                          outline: '2px solid var(--focus-ring)',
                          outlineOffset: '2px',
                        }}
                      >
                        Focused
                      </button>
                      <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-secondary)', textAlign: 'center' }}>
                        Focus State
                      </span>
                    </div>
                    <div className="flex flex-col gap-2">
                      <button
                        className="px-4 py-2 rounded"
                        style={{
                          backgroundColor: 'var(--btn-primary-bg)',
                          color: 'var(--btn-primary-fg)',
                          border: 'none',
                          cursor: 'not-allowed',
                          opacity: '0.5',
                        }}
                        disabled
                      >
                        Disabled
                      </button>
                      <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-secondary)', textAlign: 'center' }}>
                        Disabled State
                      </span>
                    </div>
                  </div>
                  <div 
                    className="px-3 py-2 rounded inline-block"
                    style={{
                      backgroundColor: 'var(--color-info-bg)',
                      color: 'var(--color-info)',
                      fontSize: 'var(--font-size-sm)',
                      fontWeight: 'var(--font-weight-medium)',
                    }}
                  >
                    ✓ WCAG 1.4.1 (Level A) - Use of Color
                  </div>
                </div>
              </div>
            </div>

            {/* Low Vision Support */}
            <div 
              className="p-6 rounded"
              style={{
                backgroundColor: 'var(--color-surface)',
                border: '1px solid var(--color-border)',
                boxShadow: 'var(--shadow-sm)',
              }}
            >
              <div className="flex items-start gap-4">
                <div 
                  className="p-3 rounded"
                  style={{
                    backgroundColor: 'var(--btn-primary-bg)',
                  }}
                >
                  <Eye 
                    size={24}
                    style={{ color: 'var(--btn-primary-fg)' }}
                  />
                </div>
                <div className="flex-1">
                  <h3 
                    className="mt-0 mb-2"
                    style={{
                      fontSize: 'var(--font-size-lg)',
                      fontWeight: 'var(--font-weight-semibold)',
                    }}
                  >
                    Low Vision Friendly
                  </h3>
                  <p style={{ color: 'var(--color-text-secondary)', marginBottom: '12px' }}>
                    Multiple theme options to support users with different visual needs.
                  </p>
                  <ul style={{ margin: 0, paddingLeft: '20px', color: 'var(--color-text-secondary)' }}>
                    <li><strong>Warm Theme:</strong> Soft, comfortable colors for extended use</li>
                    <li><strong>Medical Theme:</strong> High contrast blue and white clinical interface</li>
                    <li><strong>Dark Theme:</strong> Reduced eye strain in low-light environments</li>
                    <li>Large touch targets (minimum 44x44px)</li>
                    <li>Generous spacing and padding</li>
                    <li>Clear visual hierarchy</li>
                  </ul>
                  <div 
                    className="mt-4 px-3 py-2 rounded inline-block"
                    style={{
                      backgroundColor: 'var(--color-info-bg)',
                      color: 'var(--color-info)',
                      fontSize: 'var(--font-size-sm)',
                      fontWeight: 'var(--font-weight-medium)',
                    }}
                  >
                    ✓ WCAG 1.4.11 (Level AA) - Non-text Contrast
                  </div>
                </div>
              </div>
            </div>

            {/* Responsive Design */}
            <div 
              className="p-6 rounded"
              style={{
                backgroundColor: 'var(--color-surface)',
                border: '1px solid var(--color-border)',
                boxShadow: 'var(--shadow-sm)',
              }}
            >
              <div className="flex items-start gap-4">
                <div 
                  className="p-3 rounded"
                  style={{
                    backgroundColor: 'var(--btn-primary-bg)',
                  }}
                >
                  <Monitor 
                    size={24}
                    style={{ color: 'var(--btn-primary-fg)' }}
                  />
                </div>
                <div className="flex-1">
                  <h3 
                    className="mt-0 mb-2"
                    style={{
                      fontSize: 'var(--font-size-lg)',
                      fontWeight: 'var(--font-weight-semibold)',
                    }}
                  >
                    Responsive & Adaptive
                  </h3>
                  <p style={{ color: 'var(--color-text-secondary)', marginBottom: '12px' }}>
                    Interface adapts to different screen sizes and orientations.
                  </p>
                  <ul style={{ margin: 0, paddingLeft: '20px', color: 'var(--color-text-secondary)' }}>
                    <li>Mobile-friendly layouts</li>
                    <li>Touch-optimized controls</li>
                    <li>Flexible grid systems</li>
                    <li>No loss of functionality on small screens</li>
                  </ul>
                  <div 
                    className="mt-4 px-3 py-2 rounded inline-block"
                    style={{
                      backgroundColor: 'var(--color-info-bg)',
                      color: 'var(--color-info)',
                      fontSize: 'var(--font-size-sm)',
                      fontWeight: 'var(--font-weight-medium)',
                    }}
                  >
                    ✓ WCAG 1.4.10 (Level AA) - Reflow
                  </div>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* WCAG Compliance Checklist */}
        <section className="mb-12">
          <h2 
            className="mb-6"
            style={{
              fontSize: 'var(--font-size-xl)',
              fontWeight: 'var(--font-weight-semibold)',
              color: 'var(--color-text)',
              paddingBottom: '12px',
              borderBottom: '2px solid var(--color-border)',
            }}
          >
            WCAG 2.1 Level AA Compliance Checklist
          </h2>
          
          {/* Screen Reader Order Button */}
          <div className="mb-6">
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-6 py-3 rounded transition-all duration-200 inline-flex items-center gap-3"
              style={{
                backgroundColor: 'var(--btn-primary-bg)',
                color: 'var(--btn-primary-fg)',
                border: 'none',
                fontSize: 'var(--font-size-base)',
                fontWeight: 'var(--font-weight-medium)',
                cursor: 'pointer',
                boxShadow: 'var(--shadow-md)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--btn-primary-hover-bg)';
                e.currentTarget.style.boxShadow = 'var(--shadow-lg)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--btn-primary-bg)';
                e.currentTarget.style.boxShadow = 'var(--shadow-md)';
              }}
              onFocus={(e) => {
                e.currentTarget.style.outline = '2px solid var(--focus-ring)';
                e.currentTarget.style.outlineOffset = '2px';
              }}
              onBlur={(e) => {
                e.currentTarget.style.outline = 'none';
              }}
              aria-label="View screen reader reading order diagram for the dashboard"
            >
              <Image size={20} />
              View Screen Reader Order Diagram
            </button>
            <p 
              className="mt-2"
              style={{
                fontSize: 'var(--font-size-sm)',
                color: 'var(--color-text-secondary)',
                marginBottom: 0,
              }}
            >
              See how screen readers traverse the dashboard interface with numbered annotations
            </p>
          </div>
          
          <div 
            className="p-6 rounded"
            style={{
              backgroundColor: 'var(--color-surface)',
              border: '1px solid var(--color-border)',
            }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { code: '1.1.1', name: 'Non-text Content', level: 'A' },
                { code: '1.3.1', name: 'Info and Relationships', level: 'A' },
                { code: '1.4.1', name: 'Use of Color', level: 'A' },
                { code: '1.4.3', name: 'Contrast (Minimum)', level: 'AA' },
                { code: '1.4.4', name: 'Resize Text', level: 'AA' },
                { code: '1.4.10', name: 'Reflow', level: 'AA' },
                { code: '1.4.11', name: 'Non-text Contrast', level: 'AA' },
                { code: '2.1.1', name: 'Keyboard', level: 'A' },
                { code: '2.1.2', name: 'No Keyboard Trap', level: 'A' },
                { code: '2.4.3', name: 'Focus Order', level: 'A' },
                { code: '2.4.6', name: 'Headings and Labels', level: 'AA' },
                { code: '2.4.7', name: 'Focus Visible', level: 'AA' },
                { code: '3.2.3', name: 'Consistent Navigation', level: 'AA' },
                { code: '3.2.4', name: 'Consistent Identification', level: 'AA' },
                { code: '3.3.1', name: 'Error Identification', level: 'A' },
                { code: '3.3.2', name: 'Labels or Instructions', level: 'A' },
                { code: '4.1.2', name: 'Name, Role, Value', level: 'A' },
                { code: '4.1.3', name: 'Status Messages', level: 'AA' },
              ].map(({ code, name, level }) => (
                <div 
                  key={code}
                  className="flex items-center gap-3 p-3 rounded"
                  style={{
                    backgroundColor: 'var(--color-success-bg)',
                    border: '1px solid var(--color-success)',
                  }}
                >
                  <Check 
                    size={20}
                    style={{ color: 'var(--color-success)', flexShrink: 0 }}
                  />
                  <div className="flex-1">
                    <div style={{ fontWeight: 'var(--font-weight-medium)', color: 'var(--color-success)' }}>
                      {code} - {name}
                    </div>
                    <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-success)', opacity: 0.8 }}>
                      Level {level}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testing & Validation */}
        <section className="mb-12">
          <h2 
            className="mb-6"
            style={{
              fontSize: 'var(--font-size-xl)',
              fontWeight: 'var(--font-weight-semibold)',
              color: 'var(--color-text)',
              paddingBottom: '12px',
              borderBottom: '2px solid var(--color-border)',
            }}
          >
            Testing & Validation
          </h2>
          
          <div 
            className="p-6 rounded"
            style={{
              backgroundColor: 'var(--color-surface)',
              border: '1px solid var(--color-border)',
            }}
          >
            <h3 style={{ marginTop: 0, fontSize: 'var(--font-size-lg)', fontWeight: 'var(--font-weight-semibold)' }}>
              Recommended Testing Tools
            </h3>
            <ul style={{ color: 'var(--color-text-secondary)', lineHeight: 1.8 }}>
              <li><strong>WAVE (Web Accessibility Evaluation Tool):</strong> Browser extension for accessibility testing</li>
              <li><strong>axe DevTools:</strong> Automated accessibility testing in browser DevTools</li>
              <li><strong>NVDA/JAWS:</strong> Screen reader testing on Windows</li>
              <li><strong>VoiceOver:</strong> Screen reader testing on macOS/iOS</li>
              <li><strong>Lighthouse:</strong> Built-in Chrome DevTools accessibility audit</li>
              <li><strong>Keyboard Navigation:</strong> Test all functionality without a mouse</li>
              <li><strong>Color Contrast Analyzer:</strong> Verify WCAG contrast ratios</li>
            </ul>
          </div>
        </section>

      </div>

      {/* Screen Reader Order Modal */}
      <ScreenReaderOrderModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </div>
  );
}