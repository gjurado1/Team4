import { Wifi, Database } from 'lucide-react';

interface StatusBarProps {
  zoom?: number;
}

export function StatusBar({ zoom = 100 }: StatusBarProps) {
  return (
    <div
      className="flex items-center justify-between px-3 py-1"
      role="status"
      aria-label="Application status bar"
      style={{
        backgroundColor: 'var(--status-bg)',
        borderTop: '1px solid var(--status-border)',
        fontSize: 'var(--font-size-small)',
        color: 'var(--status-text)',
        height: '24px',
      }}
    >
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1.5" aria-label="Connection status">
          <Wifi size={12} aria-hidden="true" />
          <span>Connected</span>
        </div>
        <div className="flex items-center gap-1.5" aria-label="Sync status">
          <Database size={12} aria-hidden="true" />
          <span>Synced 2m ago</span>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <span
            style={{
              color: 'var(--color-text-muted)',
              fontSize: 'var(--font-size-small)',
            }}
            aria-label="Keyboard shortcuts hint"
          >
            Press F1 for help • Ctrl+/ for shortcuts
          </span>
        </div>
        <button
          className="px-2 py-0.5 rounded hover:bg-opacity-10 transition-colors outline-none"
          aria-label={`Zoom level ${zoom} percent`}
          style={{
            backgroundColor: 'transparent',
            transition: 'var(--transition-fast)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'var(--toolbar-hover-bg)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
          }}
          onFocus={(e) => {
            e.currentTarget.style.outline = `var(--focus-ring-width) solid var(--focus-ring-color)`;
            e.currentTarget.style.outlineOffset = 'var(--focus-ring-offset)';
          }}
          onBlur={(e) => {
            e.currentTarget.style.outline = 'none';
          }}
        >
          Zoom {zoom}%
        </button>
      </div>
    </div>
  );
}