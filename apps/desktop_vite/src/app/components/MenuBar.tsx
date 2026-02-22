import { useState, useEffect, useRef } from 'react';
import { ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router';

interface MenuBarProps {
  onThemeChange?: (theme: string) => void;
  currentTheme?: string;
  onLogout?: () => void;
}

export function MenuBar({ onThemeChange, currentTheme, onLogout }: MenuBarProps) {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const menuBarRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const navigateFromMenu = (path: string) => {
    navigate(path);
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuBarRef.current && !menuBarRef.current.contains(event.target as Node)) {
        setActiveMenu(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const menus = {
    File: [
      { label: 'New Care Plan', shortcut: 'Ctrl+N', action: () => navigateFromMenu('/dashboard/my-care') },
      { label: 'Open...', shortcut: 'Ctrl+O', action: () => {} },
      { label: 'Save', shortcut: 'Ctrl+S', action: () => {} },
      { type: 'separator' },
      { label: 'Logout', shortcut: 'Ctrl+L', action: () => onLogout?.() },
      { type: 'separator' },
      { label: 'Exit', shortcut: 'Alt+F4', action: () => window.close() },
    ],
    Edit: [
      { label: 'Undo', shortcut: 'Ctrl+Z', action: () => {} },
      { label: 'Redo', shortcut: 'Ctrl+Y', action: () => {} },
      { type: 'separator' },
      { label: 'Cut', shortcut: 'Ctrl+X', action: () => {} },
      { label: 'Copy', shortcut: 'Ctrl+C', action: () => {} },
      { label: 'Paste', shortcut: 'Ctrl+V', action: () => {} },
    ],
    View: [
      { label: 'Theme', type: 'submenu', items: [
        { label: 'Soft Purple Lavender', action: () => onThemeChange?.('default') },
        { label: 'Blush Pink Rose', action: () => onThemeChange?.('high-contrast') },
        { label: 'Golden Honey', action: () => onThemeChange?.('sepia') },
        { label: 'Medical Blue/Teal', action: () => onThemeChange?.('medical') },
        { label: 'Warm Care', action: () => onThemeChange?.('warm') },
        { label: 'Deep Focus Purple', action: () => onThemeChange?.('dark') },
      ]},
      { type: 'separator' },
      { label: 'Zoom In', shortcut: 'Ctrl++', action: () => {} },
      { label: 'Zoom Out', shortcut: 'Ctrl+-', action: () => {} },
      { label: 'Reset Zoom', shortcut: 'Ctrl+0', action: () => {} },
    ],
    Tools: [
      { label: 'Medication Tracker', action: () => navigateFromMenu('/dashboard/medications') },
      { label: 'Appointment Calendar', action: () => navigateFromMenu('/dashboard/appointments') },
      { label: 'Contact Manager', action: () => navigateFromMenu('/dashboard/patients') },
      { type: 'separator' },
      { label: 'Settings', shortcut: 'Ctrl+,', action: () => navigateFromMenu('/dashboard/settings') },
    ],
    Help: [
      { label: 'Documentation', shortcut: 'F1', action: () => navigateFromMenu('/dashboard/help') },
      { label: 'Keyboard Shortcuts', shortcut: 'Ctrl+/', action: () => navigateFromMenu('/dashboard/shortcuts') },
      { type: 'separator' },
      { label: 'About CareConnect', action: () => {} },
    ],
  };

  return (
    <div 
      className="relative"
      role="menubar"
      aria-label="Main menu"
      style={{
        backgroundColor: 'var(--menu-bg)',
        borderBottom: '1px solid var(--menu-border)',
        fontFamily: 'var(--font-family)',
      }}
      ref={menuBarRef}
    >
      <div className="flex items-center h-8 px-2">
        {Object.keys(menus).map((menuName) => (
          <div 
            key={menuName} 
            className="relative"
          >
            <button
              className="px-3 py-1 rounded transition-colors outline-none"
              role="menuitem"
              aria-haspopup="true"
              aria-expanded={activeMenu === menuName}
              aria-label={`${menuName} menu`}
              style={{
                fontSize: 'var(--font-size-label)',
                color: 'var(--menu-text)',
                backgroundColor: activeMenu === menuName ? 'var(--menu-hover-bg)' : 'transparent',
                transition: 'var(--transition-fast)',
              }}
              onMouseEnter={() => {
                // Only switch menus on hover if a menu is already open
                if (activeMenu !== null) {
                  setActiveMenu(menuName);
                }
              }}
              onClick={() => setActiveMenu(activeMenu === menuName ? null : menuName)}
              onFocus={() => setActiveMenu(menuName)}
              onKeyDown={(e) => {
                if (e.key === 'Escape') setActiveMenu(null);
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setActiveMenu(activeMenu === menuName ? null : menuName);
                }
              }}
            >
              {menuName}
            </button>

            {activeMenu === menuName && (
              <div
                className="absolute top-full left-0 z-50 min-w-[200px] py-1 rounded shadow-lg"
                role="menu"
                aria-label={`${menuName} submenu`}
                style={{
                  backgroundColor: 'var(--menu-bg)',
                  border: '1px solid var(--menu-border)',
                  boxShadow: 'var(--shadow-dropdown)',
                  marginTop: 'var(--space-1)',
                }}
              >
                {menus[menuName as keyof typeof menus].map((item: any, idx: number) => {
                  if (item.type === 'separator') {
                    return (
                      <div
                        key={idx}
                        className="my-1 mx-2"
                        style={{
                          height: '1px',
                          backgroundColor: 'var(--menu-border)',
                        }}
                      />
                    );
                  }

                  return (
                    <button
                      key={idx}
                      className="w-full px-4 py-1.5 text-left flex items-center justify-between transition-colors outline-none"
                      role="menuitem"
                      aria-label={item.shortcut ? `${item.label}, shortcut ${item.shortcut}` : item.label}
                      style={{
                        fontSize: 'var(--font-size-body)',
                        color: 'var(--menu-text)',
                        transition: 'var(--transition-fast)',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = 'var(--menu-hover-bg)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'transparent';
                      }}
                      onClick={() => {
                        item.action?.();
                        setActiveMenu(null);
                      }}
                      onFocus={(e) => {
                        e.currentTarget.style.outline = `var(--focus-ring-width) solid var(--focus-ring-color)`;
                        e.currentTarget.style.outlineOffset = 'var(--focus-ring-offset)';
                      }}
                      onBlur={(e) => {
                        e.currentTarget.style.outline = 'none';
                      }}
                    >
                      <span>{item.label}</span>
                      {item.shortcut && (
                        <span
                          className="ml-8"
                          style={{
                            fontSize: 'var(--font-size-small)',
                            color: 'var(--color-text-muted)',
                          }}
                        >
                          {item.shortcut}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
