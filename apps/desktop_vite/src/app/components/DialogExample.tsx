import { useState, useEffect, useRef } from 'react';
import { X, AlertTriangle } from 'lucide-react';

/**
 * Example Dialog/Modal Components
 * Demonstrates token-based dialogs with proper focus management
 */

interface DialogProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  actions?: React.ReactNode;
  variant?: 'default' | 'confirmation' | 'destructive';
}

export function Dialog({ isOpen, onClose, title, children, actions, variant = 'default' }: DialogProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  // Focus management
  useEffect(() => {
    if (isOpen) {
      previousFocusRef.current = document.activeElement as HTMLElement;
      // Focus first focusable element in dialog
      setTimeout(() => {
        const firstFocusable = dialogRef.current?.querySelector<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        firstFocusable?.focus();
      }, 100);
    } else {
      // Return focus when dialog closes
      previousFocusRef.current?.focus();
    }
  }, [isOpen]);

  // ESC key handler
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  // Focus trap
  useEffect(() => {
    if (!isOpen) return;

    const handleTab = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;

      const focusableElements = dialogRef.current?.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );

      if (!focusableElements || focusableElements.length === 0) return;

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    };

    window.addEventListener('keydown', handleTab);
    return () => window.removeEventListener('keydown', handleTab);
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40"
        style={{
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
        }}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Dialog */}
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="dialog-title"
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-md rounded-lg"
        style={{
          backgroundColor: 'var(--color-surface)',
          border: variant === 'destructive' ? '2px solid var(--color-error)' : '1px solid var(--color-border)',
          boxShadow: 'var(--shadow-modal)',
        }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between p-6 pb-4"
          style={{
            borderBottom: '1px solid var(--color-border)',
          }}
        >
          <div className="flex items-center gap-3">
            {variant === 'destructive' && (
              <AlertTriangle size={20} style={{ color: 'var(--color-error)' }} />
            )}
            <h2
              id="dialog-title"
              style={{
                fontSize: 'var(--font-size-section)',
                fontWeight: '600',
                color: 'var(--color-text)',
              }}
            >
              {title}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded transition-colors outline-none"
            style={{
              color: 'var(--color-text-muted)',
              transition: 'var(--transition-fast)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--menu-hover-bg)';
              e.currentTarget.style.color = 'var(--color-text)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.color = 'var(--color-text-muted)';
            }}
            onFocus={(e) => {
              e.currentTarget.style.outline = `var(--focus-ring-width) solid var(--focus-ring-color)`;
              e.currentTarget.style.outlineOffset = 'var(--focus-ring-offset)';
            }}
            onBlur={(e) => {
              e.currentTarget.style.outline = 'none';
            }}
            aria-label="Close dialog"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div
          className="p-6"
          style={{
            fontSize: 'var(--font-size-body)',
            color: 'var(--color-text)',
          }}
        >
          {children}
        </div>

        {/* Actions */}
        {actions && (
          <div
            className="flex items-center justify-end gap-3 p-6 pt-4"
            style={{
              borderTop: '1px solid var(--color-border)',
            }}
          >
            {actions}
          </div>
        )}
      </div>
    </>
  );
}

/**
 * Example usage component showing different dialog types
 */
export function DialogExamples() {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [destructiveOpen, setDestructiveOpen] = useState(false);
  const [preferencesOpen, setPreferencesOpen] = useState(false);

  return (
    <div
      className="p-8"
      style={{
        backgroundColor: 'var(--color-bg)',
        fontFamily: 'var(--font-family)',
      }}
    >
      <h1
        className="mb-6"
        style={{
          fontSize: '32px',
          fontWeight: '600',
          color: 'var(--color-text)',
        }}
      >
        Dialog & Modal Examples
      </h1>

      <div className="space-y-4">
        {/* Trigger Buttons */}
        <button
          onClick={() => setConfirmOpen(true)}
          className="px-4 py-2 rounded transition-all outline-none"
          style={{
            backgroundColor: 'var(--btn-primary-bg)',
            color: 'var(--btn-primary-fg)',
            fontSize: 'var(--font-size-body)',
            fontWeight: '500',
            transition: 'var(--transition-fast)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'var(--btn-primary-hover-bg)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'var(--btn-primary-bg)';
          }}
        >
          Show Confirmation Dialog
        </button>

        <button
          onClick={() => setDestructiveOpen(true)}
          className="px-4 py-2 rounded transition-all outline-none ml-3"
          style={{
            backgroundColor: 'var(--btn-danger-bg)',
            color: 'var(--btn-danger-fg)',
            fontSize: 'var(--font-size-body)',
            fontWeight: '500',
            transition: 'var(--transition-fast)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'var(--btn-danger-hover-bg)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'var(--btn-danger-bg)';
          }}
        >
          Show Destructive Dialog
        </button>

        <button
          onClick={() => setPreferencesOpen(true)}
          className="px-4 py-2 rounded transition-all outline-none ml-3"
          style={{
            backgroundColor: 'var(--btn-secondary-bg)',
            color: 'var(--btn-secondary-fg)',
            fontSize: 'var(--font-size-body)',
            fontWeight: '500',
            transition: 'var(--transition-fast)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'var(--btn-secondary-hover-bg)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'var(--btn-secondary-bg)';
          }}
        >
          Show Preferences Dialog
        </button>
      </div>

      {/* Confirmation Dialog */}
      <Dialog
        isOpen={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        title="Save Changes?"
        variant="confirmation"
        actions={
          <>
            <button
              onClick={() => setConfirmOpen(false)}
              className="px-4 py-2 rounded transition-all outline-none"
              style={{
                backgroundColor: 'var(--btn-secondary-bg)',
                color: 'var(--btn-secondary-fg)',
                fontSize: 'var(--font-size-body)',
                transition: 'var(--transition-fast)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--btn-secondary-hover-bg)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--btn-secondary-bg)';
              }}
            >
              Cancel
            </button>
            <button
              onClick={() => {
                console.log('Saved!');
                setConfirmOpen(false);
              }}
              className="px-4 py-2 rounded transition-all outline-none"
              style={{
                backgroundColor: 'var(--btn-primary-bg)',
                color: 'var(--btn-primary-fg)',
                fontSize: 'var(--font-size-body)',
                transition: 'var(--transition-fast)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--btn-primary-hover-bg)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--btn-primary-bg)';
              }}
            >
              Save Changes
            </button>
          </>
        }
      >
        <p style={{ color: 'var(--color-text)' }}>
          You have unsaved changes. Would you like to save them before closing?
        </p>
      </Dialog>

      {/* Destructive Dialog */}
      <Dialog
        isOpen={destructiveOpen}
        onClose={() => setDestructiveOpen(false)}
        title="Delete Care Plan?"
        variant="destructive"
        actions={
          <>
            <button
              onClick={() => setDestructiveOpen(false)}
              className="px-4 py-2 rounded transition-all outline-none"
              style={{
                backgroundColor: 'var(--btn-secondary-bg)',
                color: 'var(--btn-secondary-fg)',
                fontSize: 'var(--font-size-body)',
                transition: 'var(--transition-fast)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--btn-secondary-hover-bg)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--btn-secondary-bg)';
              }}
            >
              Cancel
            </button>
            <button
              onClick={() => {
                console.log('Deleted!');
                setDestructiveOpen(false);
              }}
              className="px-4 py-2 rounded transition-all outline-none"
              style={{
                backgroundColor: 'var(--btn-danger-bg)',
                color: 'var(--btn-danger-fg)',
                fontSize: 'var(--font-size-body)',
                transition: 'var(--transition-fast)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--btn-danger-hover-bg)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--btn-danger-bg)';
              }}
            >
              Delete Permanently
            </button>
          </>
        }
      >
        <p style={{ color: 'var(--color-text)', marginBottom: 'var(--space-3)' }}>
          This action cannot be undone. This will permanently delete the care plan
          "Daily Medication Schedule" and all associated data.
        </p>
        <p
          style={{
            fontSize: 'var(--font-size-small)',
            color: 'var(--color-text-muted)',
          }}
        >
          Last modified: February 15, 2026
        </p>
      </Dialog>

      {/* Preferences Dialog */}
      <Dialog
        isOpen={preferencesOpen}
        onClose={() => setPreferencesOpen(false)}
        title="Preferences"
        actions={
          <>
            <button
              onClick={() => setPreferencesOpen(false)}
              className="px-4 py-2 rounded transition-all outline-none"
              style={{
                backgroundColor: 'var(--btn-secondary-bg)',
                color: 'var(--btn-secondary-fg)',
                fontSize: 'var(--font-size-body)',
                transition: 'var(--transition-fast)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--btn-secondary-hover-bg)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--btn-secondary-bg)';
              }}
            >
              Close
            </button>
            <button
              onClick={() => {
                console.log('Settings saved!');
                setPreferencesOpen(false);
              }}
              className="px-4 py-2 rounded transition-all outline-none"
              style={{
                backgroundColor: 'var(--btn-primary-bg)',
                color: 'var(--btn-primary-fg)',
                fontSize: 'var(--font-size-body)',
                transition: 'var(--transition-fast)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--btn-primary-hover-bg)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--btn-primary-bg)';
              }}
            >
              Save Settings
            </button>
          </>
        }
      >
        <div className="space-y-4">
          <div>
            <label
              htmlFor="pref-notifications"
              className="flex items-center gap-2 cursor-pointer"
            >
              <input
                id="pref-notifications"
                type="checkbox"
                defaultChecked
                style={{
                  accentColor: 'var(--color-focus)',
                }}
              />
              <span style={{ color: 'var(--color-text)', fontSize: 'var(--font-size-body)' }}>
                Enable notifications
              </span>
            </label>
          </div>
          <div>
            <label
              htmlFor="pref-sound"
              className="flex items-center gap-2 cursor-pointer"
            >
              <input
                id="pref-sound"
                type="checkbox"
                defaultChecked
                style={{
                  accentColor: 'var(--color-focus)',
                }}
              />
              <span style={{ color: 'var(--color-text)', fontSize: 'var(--font-size-body)' }}>
                Play notification sounds
              </span>
            </label>
          </div>
          <div>
            <label
              htmlFor="pref-autostart"
              className="flex items-center gap-2 cursor-pointer"
            >
              <input
                id="pref-autostart"
                type="checkbox"
                style={{
                  accentColor: 'var(--color-focus)',
                }}
              />
              <span style={{ color: 'var(--color-text)', fontSize: 'var(--font-size-body)' }}>
                Start on system startup
              </span>
            </label>
          </div>
        </div>
      </Dialog>

      {/* Instructions */}
      <div
        className="mt-8 p-6 rounded-lg"
        style={{
          backgroundColor: 'var(--color-surface)',
          border: '1px solid var(--color-border)',
        }}
      >
        <h2
          className="mb-3"
          style={{
            fontSize: 'var(--font-size-section)',
            fontWeight: '600',
            color: 'var(--color-text)',
          }}
        >
          Dialog Features
        </h2>
        <ul
          className="space-y-2"
          style={{
            fontSize: 'var(--font-size-body)',
            color: 'var(--color-text)',
            listStyleType: 'disc',
            paddingLeft: 'var(--space-5)',
          }}
        >
          <li>Press ESC to close any dialog</li>
          <li>Focus automatically moves to dialog when opened</li>
          <li>Focus returns to trigger button when closed</li>
          <li>Tab/Shift+Tab cycles through dialog elements (focus trap)</li>
          <li>All buttons use token-based hover states</li>
          <li>Destructive variant shows red border</li>
          <li>Backdrop click closes dialog</li>
        </ul>
      </div>
    </div>
  );
}
