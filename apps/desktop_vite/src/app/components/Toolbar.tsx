import { 
  Plus, 
  Save, 
  FileText, 
  Calendar, 
  Users, 
  Settings,
  Bell,
  Search,
  LogOut
} from 'lucide-react';
import { useState, useEffect } from 'react';

interface ToolbarProps {
  onLogout?: () => void;
}

export function Toolbar({ onLogout }: ToolbarProps) {
  const [iconSize, setIconSize] = useState<number>(18);

  // Load and apply toolbar icon scale from localStorage
  useEffect(() => {
    const updateIconSize = () => {
      const saved = localStorage.getItem('careconnect-toolbar-icon-scale');
      const scale = saved ? Number(saved) / 100 : 1;
      setIconSize(18 * scale);
    };

    // Initial load
    updateIconSize();

    // Listen for custom storage events (for same-tab updates)
    const handleStorageChange = (e: CustomEvent) => {
      if (e.detail?.key === 'careconnect-toolbar-icon-scale') {
        updateIconSize();
      }
    };

    window.addEventListener('toolbar-icon-scale-change' as any, handleStorageChange as any);
    
    return () => {
      window.removeEventListener('toolbar-icon-scale-change' as any, handleStorageChange as any);
    };
  }, []);

  const toolbarButtons = [
    { icon: Plus, label: 'New', group: 'file' },
    { icon: Save, label: 'Save', group: 'file' },
    { type: 'separator' },
    { icon: FileText, label: 'Care Plans', group: 'nav' },
    { icon: Calendar, label: 'Calendar', group: 'nav' },
    { icon: Users, label: 'Contacts', group: 'nav' },
    { type: 'separator' },
    { icon: Bell, label: 'Reminders', group: 'tools' },
    { icon: Search, label: 'Search', group: 'tools' },
    { type: 'separator' },
    { icon: Settings, label: 'Settings', group: 'system' },
    { icon: LogOut, label: 'Log Out', group: 'system' },
  ];

  return (
    <div
      className="flex items-center gap-1 px-2 py-1.5"
      role="toolbar"
      aria-label="Application toolbar"
      style={{
        backgroundColor: 'var(--toolbar-bg)',
        borderBottom: '1px solid var(--toolbar-border)',
      }}
    >
      {toolbarButtons.map((button: any, idx: number) => {
        if (button.type === 'separator') {
          return (
            <div
              key={idx}
              className="mx-1"
              style={{
                width: '1px',
                height: '24px',
                backgroundColor: 'var(--toolbar-border)',
              }}
            />
          );
        }

        const Icon = button.icon;
        return (
          <button
            key={idx}
            className="p-2 rounded transition-colors outline-none group"
            style={{
              color: 'var(--toolbar-text)',
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
            title={button.label}
            aria-label={button.label}
            onClick={button.label === 'Log Out' ? onLogout : undefined}
          >
            <Icon size={iconSize} />
          </button>
        );
      })}
    </div>
  );
}