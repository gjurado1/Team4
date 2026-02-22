import { useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import dashboardImage from '@/assets/bdb7d6b397d2984a1c754912248e17d0f29491e3.png';

interface ScreenReaderOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ScreenReaderOrderModal({ isOpen, onClose }: ScreenReaderOrderModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (isOpen) {
      // Focus the close button when modal opens
      closeButtonRef.current?.focus();
      
      // Prevent body scroll
      document.body.style.overflow = 'hidden';
      
      // Trap focus within modal
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          onClose();
        }
      };
      
      document.addEventListener('keydown', handleKeyDown);
      
      return () => {
        document.body.style.overflow = '';
        document.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const annotations = [
    { id: 1, label: 'Skip to Main Content Link', badgeX: '2%', badgeY: '2%', targetX: '5%', targetY: '3%', description: 'Hidden link, visible on keyboard focus (Tab key)' },
    { id: 2, label: 'Menu Bar', badgeX: '15%', badgeY: '1%', targetX: '15%', targetY: '3%', description: 'File, Edit, View, Tools, Help menus' },
    { id: 3, label: 'Toolbar Icons', badgeX: '2%', badgeY: '6%', targetX: '5%', targetY: '5%', description: 'Quick access buttons with tooltips' },
    { id: 4, label: 'Tab Navigation', badgeX: '30%', badgeY: '7%', targetX: '15%', targetY: '8%', description: 'Dashboard tab (active) with close and add tab buttons' },
    { id: 5, label: 'Back Button', badgeX: '2%', badgeY: '11%', targetX: '5%', targetY: '11.5%', description: 'Navigate to previous page' },
    { id: 6, label: 'Page Heading (H1)', badgeX: '40%', badgeY: '14%', targetX: '15%', targetY: '15%', description: '"Good morning, Sarah" - Main page heading' },
    { id: 7, label: 'Subtitle Text', badgeX: '2%', badgeY: '18%', targetX: '5%', targetY: '18.5%', description: '"You have 4 tasks scheduled for today"' },
    { id: 8, label: 'Stats Cards Region', badgeX: '45%', badgeY: '22%', targetX: '30%', targetY: '25%', description: 'Group: Four stat cards with metrics' },
    { id: 9, label: 'Pending Requests Card', badgeX: '2%', badgeY: '26%', targetX: '8%', targetY: '27%', description: 'Interactive card: 3 Pending Requests' },
    { id: 10, label: 'Upcoming Appointments Card', badgeX: '20%', badgeY: '22%', targetX: '27%', targetY: '27%', description: 'Interactive card: 5 Upcoming Appointments' },
    { id: 11, label: 'Active Patients Card', badgeX: '45%', badgeY: '27%', targetX: '48%', targetY: '27%', description: 'Interactive card: 12 Active Patients' },
    { id: 12, label: 'Documents Card', badgeX: '70%', badgeY: '22%', targetX: '68%', targetY: '27%', description: 'Interactive card: 8 Documents' },
    { id: 13, label: 'Today\'s Schedule Section', badgeX: '30%', badgeY: '33%', targetX: '15%', targetY: '35%', description: 'Section heading with "View All" link' },
    { id: 14, label: 'Schedule List', badgeX: '45%', badgeY: '38%', targetX: '35%', targetY: '42%', description: 'List of 4 appointments with times and icons' },
    { id: 15, label: 'Morning Medication', badgeX: '2%', badgeY: '40%', targetX: '8%', targetY: '42%', description: 'List item: Morning Medication, 8:00 AM' },
    { id: 16, label: 'Doctor Appointment', badgeX: '2%', badgeY: '47%', targetX: '8%', targetY: '48%', description: 'List item: Doctor Appointment - Dr. Smith, 10:00 AM' },
    { id: 17, label: 'Physical Therapy Session', badgeX: '2%', badgeY: '54%', targetX: '8%', targetY: '54%', description: 'List item: Physical Therapy Session, 2:00 PM' },
    { id: 18, label: 'Evening Medication', badgeX: '2%', badgeY: '61%', targetX: '8%', targetY: '60%', description: 'List item: Evening Medication, 6:00 PM' },
    { id: 19, label: 'Quick Actions Sidebar', badgeX: '88%', badgeY: '33%', targetX: '80%', targetY: '35%', description: 'Complementary region with action buttons' },
    { id: 20, label: 'Add Medication Button', badgeX: '88%', badgeY: '38%', targetX: '75%', targetY: '40%', description: 'Button: Add Medication' },
    { id: 21, label: 'Schedule Appointment Button', badgeX: '88%', badgeY: '43%', targetX: '75%', targetY: '44%', description: 'Button: Schedule Appointment' },
    { id: 22, label: 'Update Care Plan Button', badgeX: '88%', badgeY: '48%', targetX: '75%', targetY: '48%', description: 'Button: Update Care Plan' },
    { id: 23, label: 'Contact Provider Button', badgeX: '88%', badgeY: '53%', targetX: '75%', targetY: '52%', description: 'Button: Contact Provider' },
    { id: 24, label: 'Health Summary Section', badgeX: '88%', badgeY: '58%', targetX: '80%', targetY: '58%', description: 'Section with progress bars' },
    { id: 25, label: 'Medication Adherence Bar', badgeX: '88%', badgeY: '63%', targetX: '75%', targetY: '62%', description: 'Progress bar: 92% completion' },
    { id: 26, label: 'Activity Level Bar', badgeX: '88%', badgeY: '68%', targetX: '75%', targetY: '66%', description: 'Progress bar: 78% completion' },
    { id: 27, label: 'Radial Navigation Menu', badgeX: '45%', badgeY: '73%', targetX: '48%', targetY: '70%', description: 'Draggable circular menu button (expandable)' },
    { id: 28, label: 'Status Bar', badgeX: '2%', badgeY: '78%', targetX: '10%', targetY: '77%', description: 'Application status: Connected, Synced 2m ago, Zoom 100%' },
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
      }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="screen-reader-order-title"
    >
      <div
        ref={modalRef}
        className="relative w-full max-w-6xl max-h-[90vh] overflow-auto rounded-lg"
        style={{
          backgroundColor: 'var(--color-bg)',
          border: '2px solid var(--color-border)',
          boxShadow: 'var(--shadow-lg)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          className="sticky top-0 z-10 flex items-center justify-between px-6 py-4"
          style={{
            backgroundColor: 'var(--color-surface)',
            borderBottom: '1px solid var(--color-border)',
          }}
        >
          <h2
            id="screen-reader-order-title"
            style={{
              fontSize: 'var(--font-size-xl)',
              fontWeight: 'var(--font-weight-semibold)',
              color: 'var(--color-text)',
              margin: 0,
            }}
          >
            Screen Reader Reading Order
          </h2>
          <button
            ref={closeButtonRef}
            onClick={onClose}
            className="p-2 rounded transition-all duration-200"
            style={{
              backgroundColor: 'transparent',
              border: 'none',
              color: 'var(--color-text)',
              cursor: 'pointer',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--color-border)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
            }}
            onFocus={(e) => {
              e.currentTarget.style.outline = '2px solid var(--focus-ring)';
              e.currentTarget.style.outlineOffset = '2px';
            }}
            onBlur={(e) => {
              e.currentTarget.style.outline = 'none';
            }}
            aria-label="Close screen reader order diagram"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <p
            className="mb-6"
            style={{
              fontSize: 'var(--font-size-base)',
              color: 'var(--color-text-secondary)',
              lineHeight: 1.6,
            }}
          >
            This diagram shows the logical reading order for screen readers navigating the CareConnect dashboard. 
            Screen readers follow the DOM order, not the visual layout. Numbers indicate the sequence in which 
            elements are announced to users.
          </p>

          {/* Dashboard Mockup with Annotations */}
          <div
            className="relative rounded-lg overflow-hidden"
            style={{
              backgroundColor: 'var(--color-surface)',
              border: '2px solid var(--color-border)',
            }}
          >
            {/* Actual Dashboard Screenshot */}
            <div className="relative w-full">
              <img 
                src={dashboardImage} 
                alt="CareConnect Dashboard with numbered annotations showing screen reader order"
                className="w-full h-auto"
                style={{
                  display: 'block',
                  maxWidth: '100%',
                }}
              />

              {/* Numbered Annotations */}
              {annotations.map((annotation) => (
                <div
                  key={annotation.id}
                  className="absolute group"
                  style={{
                    top: annotation.badgeY,
                    left: annotation.badgeX,
                  }}
                >
                  {/* Number Badge */}
                  <div
                    className="relative flex items-center justify-center w-10 h-10 rounded-full cursor-help transition-all duration-200"
                    style={{
                      backgroundColor: 'var(--btn-primary-bg)',
                      color: 'var(--btn-primary-fg)',
                      fontWeight: 'var(--font-weight-bold)',
                      fontSize: 'var(--font-size-lg)',
                      border: '3px solid var(--color-bg)',
                      boxShadow: 'var(--shadow-lg)',
                    }}
                  >
                    {annotation.id}
                  </div>
                  
                  {/* Tooltip */}
                  <div
                    className="absolute left-full ml-3 top-0 min-w-64 p-3 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10"
                    style={{
                      backgroundColor: 'var(--color-surface)',
                      border: '2px solid var(--btn-primary-bg)',
                      boxShadow: 'var(--shadow-lg)',
                    }}
                  >
                    <div
                      style={{
                        fontSize: 'var(--font-size-sm)',
                        fontWeight: 'var(--font-weight-semibold)',
                        color: 'var(--color-text)',
                        marginBottom: '4px',
                      }}
                    >
                      {annotation.label}
                    </div>
                    <div
                      style={{
                        fontSize: 'var(--font-size-xs)',
                        color: 'var(--color-text-secondary)',
                        lineHeight: 1.4,
                      }}
                    >
                      {annotation.description}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Legend */}
          <div
            className="mt-6 p-4 rounded-lg"
            style={{
              backgroundColor: 'var(--color-info-bg)',
              border: '1px solid var(--color-info)',
            }}
          >
            <h3
              className="mb-3"
              style={{
                fontSize: 'var(--font-size-base)',
                fontWeight: 'var(--font-weight-semibold)',
                color: 'var(--color-info)',
                margin: 0,
              }}
            >
              Reading Order Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {annotations.map((annotation) => (
                <div
                  key={annotation.id}
                  className="flex items-start gap-2"
                  style={{
                    fontSize: 'var(--font-size-sm)',
                    color: 'var(--color-info)',
                  }}
                >
                  <div
                    className="flex items-center justify-center w-6 h-6 rounded-full flex-shrink-0"
                    style={{
                      backgroundColor: 'var(--btn-primary-bg)',
                      color: 'var(--btn-primary-fg)',
                      fontSize: 'var(--font-size-xs)',
                      fontWeight: 'var(--font-weight-bold)',
                    }}
                  >
                    {annotation.id}
                  </div>
                  <div>
                    <strong>{annotation.label}</strong>
                    <br />
                    <span style={{ opacity: 0.9 }}>{annotation.description}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Additional Info */}
          <div
            className="mt-6 p-4 rounded-lg"
            style={{
              backgroundColor: 'var(--color-surface)',
              border: '1px solid var(--color-border)',
            }}
          >
            <h3
              className="mb-3"
              style={{
                fontSize: 'var(--font-size-base)',
                fontWeight: 'var(--font-weight-semibold)',
                color: 'var(--color-text)',
                margin: 0,
              }}
            >
              Accessibility Best Practices Implemented
            </h3>
            <ul
              className="space-y-2 m-0 pl-5"
              style={{
                fontSize: 'var(--font-size-sm)',
                color: 'var(--color-text-secondary)',
                lineHeight: 1.6,
              }}
            >
              <li><strong>Semantic HTML:</strong> Proper use of landmarks (&lt;header&gt;, &lt;nav&gt;, &lt;main&gt;, &lt;footer&gt;)</li>
              <li><strong>Skip Links:</strong> "Skip to main content" link appears first for keyboard users</li>
              <li><strong>Heading Hierarchy:</strong> Logical H1-H6 structure without skipping levels</li>
              <li><strong>ARIA Landmarks:</strong> role="navigation", role="main", role="complementary" for clear regions</li>
              <li><strong>Tab Order:</strong> Follows logical flow from top to bottom, left to right</li>
              <li><strong>Focus Management:</strong> Focus moves to appropriate elements after actions (e.g., opening modals)</li>
              <li><strong>Live Regions:</strong> aria-live announcements for dynamic content updates</li>
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div
          className="sticky bottom-0 flex justify-end px-6 py-4"
          style={{
            backgroundColor: 'var(--color-surface)',
            borderTop: '1px solid var(--color-border)',
          }}
        >
          <button
            onClick={onClose}
            className="px-6 py-2 rounded transition-all duration-200"
            style={{
              backgroundColor: 'var(--btn-primary-bg)',
              color: 'var(--btn-primary-fg)',
              border: 'none',
              fontSize: 'var(--font-size-base)',
              fontWeight: 'var(--font-weight-medium)',
              cursor: 'pointer',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--btn-primary-hover-bg)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--btn-primary-bg)';
            }}
            onFocus={(e) => {
              e.currentTarget.style.outline = '2px solid var(--focus-ring)';
              e.currentTarget.style.outlineOffset = '2px';
            }}
            onBlur={(e) => {
              e.currentTarget.style.outline = 'none';
            }}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
