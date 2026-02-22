/**
 * Keyboard Shortcuts Reference Card
 * Printable reference for all keyboard shortcuts
 */

export function KeyboardShortcuts() {
  const shortcuts = [
    {
      category: 'File Operations',
      items: [
        { keys: ['Ctrl', 'N'], action: 'New Care Plan' },
        { keys: ['Ctrl', 'O'], action: 'Open' },
        { keys: ['Ctrl', 'S'], action: 'Save' },
        { keys: ['Ctrl', 'P'], action: 'Print' },
        { keys: ['Alt', 'F4'], action: 'Exit Application' },
      ]
    },
    {
      category: 'Edit',
      items: [
        { keys: ['Ctrl', 'Z'], action: 'Undo' },
        { keys: ['Ctrl', 'Y'], action: 'Redo' },
        { keys: ['Ctrl', 'X'], action: 'Cut' },
        { keys: ['Ctrl', 'C'], action: 'Copy' },
        { keys: ['Ctrl', 'V'], action: 'Paste' },
      ]
    },
    {
      category: 'Navigation',
      items: [
        { keys: ['Tab'], action: 'Move to next focusable element' },
        { keys: ['Shift', 'Tab'], action: 'Move to previous element' },
        { keys: ['Esc'], action: 'Go back / Close dialog' },
        { keys: ['Enter'], action: 'Activate focused element' },
        { keys: ['Space'], action: 'Toggle checkbox / Select' },
      ]
    },
    {
      category: 'View',
      items: [
        { keys: ['Ctrl', '+'], action: 'Zoom In' },
        { keys: ['Ctrl', '-'], action: 'Zoom Out' },
        { keys: ['Ctrl', '0'], action: 'Reset Zoom' },
        { keys: ['F11'], action: 'Fullscreen' },
      ]
    },
    {
      category: 'Tools',
      items: [
        { keys: ['Ctrl', ','], action: 'Settings' },
        { keys: ['Ctrl', 'F'], action: 'Search' },
        { keys: ['Ctrl', 'M'], action: 'Medication Tracker' },
        { keys: ['Ctrl', 'K'], action: 'Calendar' },
      ]
    },
    {
      category: 'Help & Accessibility',
      items: [
        { keys: ['F1'], action: 'Help Documentation' },
        { keys: ['Ctrl', '/'], action: 'Show Keyboard Shortcuts' },
        { keys: ['Alt', 'T'], action: 'Switch Theme' },
        { keys: ['Ctrl', 'H'], action: 'High Contrast Mode' },
      ]
    },
  ];

  return (
    <div 
      className="p-8 overflow-auto"
      style={{
        backgroundColor: 'var(--color-bg)',
        fontFamily: 'var(--font-family)',
        minHeight: '100vh',
      }}
    >
      {/* Header */}
      <div 
        className="max-w-4xl mx-auto mb-8 pb-6"
        style={{
          borderBottom: '2px solid var(--color-border)',
        }}
      >
        <h1 
          className="mb-2"
          style={{
            fontSize: '32px',
            fontWeight: '600',
            color: 'var(--color-text)',
          }}
        >
          CareConnect Keyboard Shortcuts
        </h1>
        <p 
          style={{
            fontSize: 'var(--font-size-body)',
            color: 'var(--color-text-muted)',
          }}
        >
          Quick reference guide for keyboard navigation and shortcuts
        </p>
        <p 
          className="mt-2"
          style={{
            fontSize: 'var(--font-size-small)',
            color: 'var(--color-text-muted)',
          }}
        >
          Note: On macOS, use Cmd ⌘ instead of Ctrl
        </p>
      </div>

      {/* Shortcuts Grid */}
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        {shortcuts.map((section, idx) => (
          <div
            key={idx}
            className="rounded-lg p-6"
            style={{
              backgroundColor: 'var(--color-surface)',
              border: '1px solid var(--color-border)',
              boxShadow: 'var(--shadow-panel)',
            }}
          >
            <h2 
              className="mb-4 pb-2"
              style={{
                fontSize: 'var(--font-size-section)',
                fontWeight: '600',
                color: 'var(--color-text)',
                borderBottom: '1px solid var(--color-border)',
              }}
            >
              {section.category}
            </h2>

            <div className="space-y-3">
              {section.items.map((item, itemIdx) => (
                <div 
                  key={itemIdx}
                  className="flex items-center justify-between gap-4"
                >
                  <span 
                    style={{
                      fontSize: 'var(--font-size-body)',
                      color: 'var(--color-text)',
                    }}
                  >
                    {item.action}
                  </span>
                  <div className="flex items-center gap-1 flex-shrink-0">
                    {item.keys.map((key, keyIdx) => (
                      <span key={keyIdx} className="flex items-center">
                        <kbd
                          className="px-2 py-1 rounded"
                          style={{
                            backgroundColor: 'var(--color-panel)',
                            border: '1px solid var(--color-border)',
                            fontSize: 'var(--font-size-small)',
                            fontWeight: '500',
                            color: 'var(--color-text)',
                            fontFamily: 'monospace',
                            boxShadow: 'var(--shadow-sm)',
                          }}
                        >
                          {key}
                        </kbd>
                        {keyIdx < item.keys.length - 1 && (
                          <span 
                            className="mx-1"
                            style={{
                              color: 'var(--color-text-muted)',
                              fontSize: 'var(--font-size-small)',
                            }}
                          >
                            +
                          </span>
                        )}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Accessibility Notes */}
      <div 
        className="max-w-4xl mx-auto mt-8 p-6 rounded-lg"
        style={{
          backgroundColor: 'var(--color-surface)',
          border: '1px solid var(--color-border)',
          boxShadow: 'var(--shadow-panel)',
        }}
      >
        <h2 
          className="mb-4"
          style={{
            fontSize: 'var(--font-size-section)',
            fontWeight: '600',
            color: 'var(--color-text)',
          }}
        >
          Accessibility Features
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
          <li>All interactive elements are keyboard accessible</li>
          <li>Visible focus indicators on all focusable elements</li>
          <li>Screen reader compatible (NVDA, JAWS, VoiceOver tested)</li>
          <li>High contrast themes available (Alt+T to switch)</li>
          <li>Supports browser zoom up to 400%</li>
          <li>Reduced motion preferences respected</li>
          <li>ARIA labels on all complex components</li>
        </ul>
      </div>

      {/* Print Button */}
      <div className="max-w-4xl mx-auto mt-6 text-center">
        <button
          onClick={() => window.print()}
          className="px-6 py-3 rounded-lg transition-all outline-none"
          style={{
            backgroundColor: 'var(--btn-primary-bg)',
            color: 'var(--btn-primary-fg)',
            fontSize: 'var(--font-size-body)',
            fontWeight: '500',
            transition: 'var(--transition-fast)',
            boxShadow: 'var(--shadow-sm)',
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
          Print Reference Card (Ctrl+P)
        </button>
      </div>

      {/* Print Styles */}
      <style>{`
        @media print {
          body {
            background: white !important;
          }
          button {
            display: none;
          }
        }
      `}</style>
    </div>
  );
}
