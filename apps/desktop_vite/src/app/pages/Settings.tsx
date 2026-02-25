import { Settings as SettingsIcon, Bell, Lock, User, Palette } from 'lucide-react';
import { useState, useEffect } from 'react';
import { BackButton } from '../components/BackButton';
import { announce } from '../components/ScreenReaderAnnouncer';

const SCREEN_READER_STORAGE_KEY = 'careconnect-screen-reader-enabled';
const VOICE_COMMANDS_STORAGE_KEY = 'careconnect-voice-commands-enabled';
const OPEN_MENU_NAV_IN_NEW_TAB_KEY = 'careconnect-menu-navigation-new-tab';

interface SettingsProps {
  onThemeChange?: (theme: string) => void;
  currentTheme?: string;
}

const AVAILABLE_THEMES = [
  {
    id: 'warm',
    label: 'Warm Care',
    preview: ['#F9E0D8', '#8d4a5f', '#3d1a26'],
  },
  {
    id: 'medical',
    label: 'Medical Blue',
    preview: ['#F1F1F1', '#3d4d66', '#08343D'],
  },
  {
    id: 'dark',
    label: 'Deep Focus Purple',
    preview: ['#1C1122', '#7c48a8', '#F5F5F7'],
  },
] as const;

export function Settings({ onThemeChange, currentTheme = 'warm' }: SettingsProps) {
  const [textScale, setTextScale] = useState<number>(100);
  const [radialMenuScale, setRadialMenuScale] = useState<number>(100);
  const [toolbarIconScale, setToolbarIconScale] = useState<number>(100);
  const [screenReaderEnabled, setScreenReaderEnabled] = useState<boolean>(true);
  const [voiceCommandsEnabled, setVoiceCommandsEnabled] = useState<boolean>(false);
  const [openMenuNavigationInNewTab, setOpenMenuNavigationInNewTab] = useState<boolean>(false);

  // Load toolbar icon scale from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('careconnect-toolbar-icon-scale');
    if (saved) {
      setToolbarIconScale(Number(saved));
    }
  }, []);

  useEffect(() => {
    const saved = localStorage.getItem(SCREEN_READER_STORAGE_KEY);
    if (saved !== null) {
      setScreenReaderEnabled(saved === 'true');
    }
  }, []);

  useEffect(() => {
    const saved = localStorage.getItem(VOICE_COMMANDS_STORAGE_KEY);
    if (saved !== null) {
      setVoiceCommandsEnabled(saved === 'true');
    }
  }, []);

  useEffect(() => {
    const saved = localStorage.getItem(OPEN_MENU_NAV_IN_NEW_TAB_KEY);
    if (saved !== null) {
      setOpenMenuNavigationInNewTab(saved === 'true');
    }
  }, []);

  // Apply text scale to document root
  useEffect(() => {
    document.documentElement.style.setProperty('--text-scale', `${textScale / 100}`);
  }, [textScale]);

  // Apply radial menu scale to document root
  useEffect(() => {
    document.documentElement.style.setProperty('--radial-menu-scale', `${radialMenuScale / 100}`);
  }, [radialMenuScale]);

  // Apply toolbar icon scale to document root and save to localStorage
  useEffect(() => {
    document.documentElement.style.setProperty('--toolbar-icon-scale', `${toolbarIconScale / 100}`);
    localStorage.setItem('careconnect-toolbar-icon-scale', String(toolbarIconScale));
    
    // Dispatch custom event for real-time updates
    window.dispatchEvent(new CustomEvent('toolbar-icon-scale-change', {
      detail: { key: 'careconnect-toolbar-icon-scale', value: toolbarIconScale }
    }));
  }, [toolbarIconScale]);

  useEffect(() => {
    localStorage.setItem(SCREEN_READER_STORAGE_KEY, String(screenReaderEnabled));
    window.dispatchEvent(new CustomEvent('accessibility-setting-change', {
      detail: { key: SCREEN_READER_STORAGE_KEY, value: screenReaderEnabled }
    }));
  }, [screenReaderEnabled]);

  useEffect(() => {
    localStorage.setItem(VOICE_COMMANDS_STORAGE_KEY, String(voiceCommandsEnabled));
    window.dispatchEvent(new CustomEvent('accessibility-setting-change', {
      detail: { key: VOICE_COMMANDS_STORAGE_KEY, value: voiceCommandsEnabled }
    }));
  }, [voiceCommandsEnabled]);

  useEffect(() => {
    localStorage.setItem(OPEN_MENU_NAV_IN_NEW_TAB_KEY, String(openMenuNavigationInNewTab));
  }, [openMenuNavigationInNewTab]);

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
            <SettingsIcon size={24} />
          </div>
          <h1 
            style={{
              fontSize: 'var(--font-size-page)',
              fontWeight: '600',
              color: 'var(--color-text)',
            }}
          >
            Settings & Preferences
          </h1>
        </div>
        <p 
          style={{
            fontSize: 'var(--font-size-body)',
            color: 'var(--color-text-muted)',
          }}
        >
          Customize your CareConnect experience
        </p>
      </div>

      {/* Settings Sections */}
      <div className="flex-1 overflow-y-auto space-y-4">
        {/* Profile Settings */}
        <div
          className="p-5 rounded-lg"
          style={{
            backgroundColor: 'var(--color-surface)',
            border: '1px solid var(--color-border)',
            boxShadow: 'var(--shadow-sm)',
          }}
        >
          <div className="flex items-center gap-3 mb-4">
            <User size={20} style={{ color: 'var(--color-focus)' }} />
            <h2 
              style={{
                fontSize: 'var(--font-size-section)',
                fontWeight: '600',
                color: 'var(--color-text)',
              }}
            >
              Profile Settings
            </h2>
          </div>
          <div className="space-y-3">
            <div>
              <label 
                htmlFor="settings-full-name"
                className="block mb-1.5"
                style={{
                  fontSize: 'var(--font-size-label)',
                  fontWeight: '500',
                  color: 'var(--color-text)',
                }}
              >
                Full Name
              </label>
              <input
                id="settings-full-name"
                type="text"
                defaultValue="Sarah Johnson"
                className="w-full px-3 py-2 rounded outline-none transition-colors"
                style={{
                  backgroundColor: 'var(--input-bg)',
                  border: '2px solid var(--input-border)',
                  color: 'var(--input-text)',
                  fontSize: 'var(--font-size-body)',
                  transition: 'var(--transition-fast)',
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = 'var(--input-border-focus)';
                  e.currentTarget.style.outline = `var(--focus-ring-width) solid var(--focus-ring-color)`;
                  e.currentTarget.style.outlineOffset = 'var(--focus-ring-offset)';
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = 'var(--input-border)';
                  e.currentTarget.style.outline = 'none';
                }}
              />
            </div>
            <div>
              <label 
                htmlFor="settings-email-address"
                className="block mb-1.5"
                style={{
                  fontSize: 'var(--font-size-label)',
                  fontWeight: '500',
                  color: 'var(--color-text)',
                }}
              >
                Email Address
              </label>
              <input
                id="settings-email-address"
                type="email"
                defaultValue="sarah.johnson@careconnect.com"
                className="w-full px-3 py-2 rounded outline-none transition-colors"
                style={{
                  backgroundColor: 'var(--input-bg)',
                  border: '2px solid var(--input-border)',
                  color: 'var(--input-text)',
                  fontSize: 'var(--font-size-body)',
                  transition: 'var(--transition-fast)',
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = 'var(--input-border-focus)';
                  e.currentTarget.style.outline = `var(--focus-ring-width) solid var(--focus-ring-color)`;
                  e.currentTarget.style.outlineOffset = 'var(--focus-ring-offset)';
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = 'var(--input-border)';
                  e.currentTarget.style.outline = 'none';
                }}
              />
            </div>
          </div>
        </div>

        {/* Appearance */}
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
            <h2 
              style={{
                fontSize: 'var(--font-size-section)',
                fontWeight: '600',
                color: 'var(--color-text)',
              }}
            >
              Appearance
            </h2>
          </div>
          
          {/* Text Scale Slider */}
          <div className="mb-5">
            <div className="flex items-center justify-between mb-2">
              <label 
                htmlFor="settings-text-scale"
                className="block"
                style={{
                  fontSize: 'var(--font-size-label)',
                  fontWeight: '500',
                  color: 'var(--color-text)',
                }}
              >
                Text Size
              </label>
              <span 
                style={{
                  fontSize: 'var(--font-size-body)',
                  fontWeight: '600',
                  color: 'var(--color-focus)',
                  minWidth: '48px',
                  textAlign: 'right',
                }}
              >
                {textScale}%
              </span>
            </div>
            
            <input
              id="settings-text-scale"
              type="range"
              min="100"
              max="250"
              step="10"
              value={textScale}
              onChange={(e) => setTextScale(Number(e.target.value))}
              className="w-full h-2 rounded-lg cursor-pointer"
              style={{
                accentColor: 'var(--color-focus)',
                outline: 'none',
              }}
              onFocus={(e) => {
                e.currentTarget.style.outline = `var(--focus-ring-width) solid var(--focus-ring-color)`;
                e.currentTarget.style.outlineOffset = 'var(--focus-ring-offset)';
              }}
              onBlur={(e) => {
                e.currentTarget.style.outline = 'none';
              }}
            />
            
            <div className="flex justify-between mt-1.5">
              <span style={{ fontSize: 'var(--font-size-small)', color: 'var(--color-text-muted)' }}>
                100%
              </span>
              <span style={{ fontSize: 'var(--font-size-small)', color: 'var(--color-text-muted)' }}>
                250%
              </span>
            </div>
          </div>
          
          {/* Radial Menu Scale Slider */}
          <div className="mb-5">
            <div className="flex items-center justify-between mb-2">
              <label 
                htmlFor="settings-radial-menu-scale"
                className="block"
                style={{
                  fontSize: 'var(--font-size-label)',
                  fontWeight: '500',
                  color: 'var(--color-text)',
                }}
              >
                Radial Menu Size
              </label>
              <span 
                style={{
                  fontSize: 'var(--font-size-body)',
                  fontWeight: '600',
                  color: 'var(--color-focus)',
                  minWidth: '48px',
                  textAlign: 'right',
                }}
              >
                {radialMenuScale}%
              </span>
            </div>
            
            <input
              id="settings-radial-menu-scale"
              type="range"
              min="100"
              max="250"
              step="10"
              value={radialMenuScale}
              onChange={(e) => setRadialMenuScale(Number(e.target.value))}
              className="w-full h-2 rounded-lg cursor-pointer"
              style={{
                accentColor: 'var(--color-focus)',
                outline: 'none',
              }}
              onFocus={(e) => {
                e.currentTarget.style.outline = `var(--focus-ring-width) solid var(--focus-ring-color)`;
                e.currentTarget.style.outlineOffset = 'var(--focus-ring-offset)';
              }}
              onBlur={(e) => {
                e.currentTarget.style.outline = 'none';
              }}
            />
            
            <div className="flex justify-between mt-1.5">
              <span style={{ fontSize: 'var(--font-size-small)', color: 'var(--color-text-muted)' }}>
                100%
              </span>
              <span style={{ fontSize: 'var(--font-size-small)', color: 'var(--color-text-muted)' }}>
                250%
              </span>
            </div>
          </div>
          
          {/* Toolbar Icon Scale Slider */}
          <div className="mb-5">
            <div className="flex items-center justify-between mb-2">
              <label 
                htmlFor="settings-toolbar-icon-scale"
                className="block"
                style={{
                  fontSize: 'var(--font-size-label)',
                  fontWeight: '500',
                  color: 'var(--color-text)',
                }}
              >
                Toolbar Icon Size
              </label>
              <span 
                style={{
                  fontSize: 'var(--font-size-body)',
                  fontWeight: '600',
                  color: 'var(--color-focus)',
                  minWidth: '48px',
                  textAlign: 'right',
                }}
              >
                {toolbarIconScale}%
              </span>
            </div>
            
            <input
              id="settings-toolbar-icon-scale"
              type="range"
              min="100"
              max="150"
              step="5"
              value={toolbarIconScale}
              onChange={(e) => setToolbarIconScale(Number(e.target.value))}
              className="w-full h-2 rounded-lg cursor-pointer"
              style={{
                accentColor: 'var(--color-focus)',
                outline: 'none',
              }}
              onFocus={(e) => {
                e.currentTarget.style.outline = `var(--focus-ring-width) solid var(--focus-ring-color)`;
                e.currentTarget.style.outlineOffset = 'var(--focus-ring-offset)';
              }}
              onBlur={(e) => {
                e.currentTarget.style.outline = 'none';
              }}
              aria-label="Toolbar icon size slider from 100% to 150%"
            />
            
            <div className="flex justify-between mt-1.5">
              <span style={{ fontSize: 'var(--font-size-small)', color: 'var(--color-text-muted)' }}>
                100%
              </span>
              <span style={{ fontSize: 'var(--font-size-small)', color: 'var(--color-text-muted)' }}>
                150%
              </span>
            </div>
          </div>

          {/* Choose Theme */}
          <div className="mb-5">
            <label
              className="block mb-2"
              style={{
                fontSize: 'var(--font-size-label)',
                fontWeight: '500',
                color: 'var(--color-text)',
              }}
            >
              Choose Theme
            </label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {AVAILABLE_THEMES.map((theme) => {
                const isSelected = currentTheme === theme.id;
                return (
                  <button
                    key={theme.id}
                    type="button"
                    onClick={() => {
                      onThemeChange?.(theme.id);
                      announce(`Theme changed to ${theme.label}`, 'polite');
                    }}
                    aria-pressed={isSelected}
                    className="p-3 rounded-lg text-left transition-all outline-none"
                    style={{
                      backgroundColor: 'var(--input-bg)',
                      border: isSelected ? '2px solid var(--color-focus)' : '2px solid var(--input-border)',
                      boxShadow: isSelected ? 'var(--shadow-panel)' : 'var(--shadow-sm)',
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.outline = `var(--focus-ring-width) solid var(--focus-ring-color)`;
                      e.currentTarget.style.outlineOffset = 'var(--focus-ring-offset)';
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.outline = 'none';
                    }}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      {theme.preview.map((color, idx) => (
                        <span
                          key={`${theme.id}-${idx}`}
                          className="w-5 h-5 rounded-full"
                          style={{
                            backgroundColor: color,
                            border: '1px solid var(--color-border)',
                          }}
                        />
                      ))}
                    </div>
                    <div
                      style={{
                        fontSize: 'var(--font-size-body)',
                        fontWeight: isSelected ? '600' : '500',
                        color: 'var(--color-text)',
                      }}
                    >
                      {theme.label}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
          
          <p 
            style={{
              fontSize: 'var(--font-size-body)',
              color: 'var(--color-text-muted)',
            }}
          >
            Shortcut: use Alt+T to cycle themes quickly.
          </p>
        </div>

        {/* Accessibility & Voice */}
        <div
          className="p-5 rounded-lg"
          style={{
            backgroundColor: 'var(--color-surface)',
            border: '1px solid var(--color-border)',
            boxShadow: 'var(--shadow-sm)',
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
            Accessibility & Voice
          </h2>

          <div className="space-y-4">
            <label className="flex items-center justify-between gap-4">
              <div>
                <div style={{ fontSize: 'var(--font-size-body)', color: 'var(--color-text)', fontWeight: '500' }}>
                  Enable Screen Reader Announcements
                </div>
                <div style={{ fontSize: 'var(--font-size-small)', color: 'var(--color-text-muted)' }}>
                  Announces important UI changes through live regions.
                </div>
              </div>
              <input
                type="checkbox"
                checked={screenReaderEnabled}
                onChange={(e) => setScreenReaderEnabled(e.target.checked)}
                className="w-5 h-5 rounded cursor-pointer"
                style={{ accentColor: 'var(--color-focus)' }}
                aria-label="Enable or disable screen reader announcements"
              />
            </label>

            <label className="flex items-center justify-between gap-4">
              <div>
                <div style={{ fontSize: 'var(--font-size-body)', color: 'var(--color-text)', fontWeight: '500' }}>
                  Enable Voice Commands
                </div>
                <div style={{ fontSize: 'var(--font-size-small)', color: 'var(--color-text-muted)' }}>
                  Allows voice command features when available.
                </div>
              </div>
              <input
                type="checkbox"
                checked={voiceCommandsEnabled}
                onChange={(e) => setVoiceCommandsEnabled(e.target.checked)}
                className="w-5 h-5 rounded cursor-pointer"
                style={{ accentColor: 'var(--color-focus)' }}
                aria-label="Enable or disable voice commands"
              />
            </label>
          </div>
        </div>

        {/* Navigation Behavior */}
        <div
          className="p-5 rounded-lg"
          style={{
            backgroundColor: 'var(--color-surface)',
            border: '1px solid var(--color-border)',
            boxShadow: 'var(--shadow-sm)',
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
            Navigation Behavior
          </h2>

          <label className="flex items-center justify-between gap-4">
              <div>
                <div style={{ fontSize: 'var(--font-size-body)', color: 'var(--color-text)', fontWeight: '500' }}>
                Open Radial Menu Navigation in New Tabs
                </div>
                <div style={{ fontSize: 'var(--font-size-small)', color: 'var(--color-text-muted)' }}>
                When enabled, selecting a page from the radial menu opens that page in a new tab.
                </div>
              </div>
            <input
              type="checkbox"
              checked={openMenuNavigationInNewTab}
              onChange={(e) => setOpenMenuNavigationInNewTab(e.target.checked)}
              className="w-5 h-5 rounded cursor-pointer"
              style={{ accentColor: 'var(--color-focus)' }}
              aria-label="Enable or disable opening menu navigation in new tabs"
            />
          </label>
        </div>

        {/* Notifications */}
        <div
          className="p-5 rounded-lg"
          style={{
            backgroundColor: 'var(--color-surface)',
            border: '1px solid var(--color-border)',
            boxShadow: 'var(--shadow-sm)',
          }}
        >
          <div className="flex items-center gap-3 mb-4">
            <Bell size={20} style={{ color: 'var(--color-focus)' }} />
            <h2 
              style={{
                fontSize: 'var(--font-size-section)',
                fontWeight: '600',
                color: 'var(--color-text)',
              }}
            >
              Notifications
            </h2>
          </div>
          <div className="space-y-3">
            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                defaultChecked
                className="w-5 h-5 rounded cursor-pointer"
                style={{
                  accentColor: 'var(--color-focus)',
                }}
              />
              <span 
                style={{
                  fontSize: 'var(--font-size-body)',
                  color: 'var(--color-text)',
                }}
              >
                Medication reminders
              </span>
            </label>
            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                defaultChecked
                className="w-5 h-5 rounded cursor-pointer"
                style={{
                  accentColor: 'var(--color-focus)',
                }}
              />
              <span 
                style={{
                  fontSize: 'var(--font-size-body)',
                  color: 'var(--color-text)',
                }}
              >
                Appointment alerts
              </span>
            </label>
            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                className="w-5 h-5 rounded cursor-pointer"
                style={{
                  accentColor: 'var(--color-focus)',
                }}
              />
              <span 
                style={{
                  fontSize: 'var(--font-size-body)',
                  color: 'var(--color-text)',
                }}
              >
                Email notifications
              </span>
            </label>
          </div>
        </div>

        {/* Security */}
        <div
          className="p-5 rounded-lg"
          style={{
            backgroundColor: 'var(--color-surface)',
            border: '1px solid var(--color-border)',
            boxShadow: 'var(--shadow-sm)',
          }}
        >
          <div className="flex items-center gap-3 mb-4">
            <Lock size={20} style={{ color: 'var(--color-focus)' }} />
            <h2 
              style={{
                fontSize: 'var(--font-size-section)',
                fontWeight: '600',
                color: 'var(--color-text)',
              }}
            >
              Security
            </h2>
          </div>
          <button
            className="px-4 py-2 rounded-lg transition-all outline-none"
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
          >
            Change Password
          </button>
        </div>

        {/* Save Button */}
        <div className="pt-4">
          <button
            className="w-full py-3 rounded-lg transition-all outline-none"
            aria-label="Save all settings changes"
            style={{
              backgroundColor: 'var(--btn-primary-bg)',
              color: 'var(--btn-primary-fg)',
              fontSize: 'var(--font-size-body)',
              fontWeight: '500',
              transition: 'var(--transition-medium)',
              boxShadow: 'var(--shadow-sm)',
            }}
            onClick={() => {
              announce('Settings saved successfully', 'polite');
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--btn-primary-hover-bg)';
              e.currentTarget.style.color = 'var(--btn-primary-hover-fg)';
              e.currentTarget.style.boxShadow = 'var(--shadow-panel)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--btn-primary-bg)';
              e.currentTarget.style.color = 'var(--btn-primary-fg)';
              e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
            }}
            onFocus={(e) => {
              e.currentTarget.style.outline = `var(--focus-ring-width) solid var(--focus-ring-color)`;
              e.currentTarget.style.outlineOffset = 'var(--focus-ring-offset)';
            }}
            onBlur={(e) => {
              e.currentTarget.style.outline = 'none';
            }}
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
