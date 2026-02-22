import { Outlet } from 'react-router';
import { MenuBar } from './MenuBar';
import { Toolbar } from './Toolbar';
import { StatusBar } from './StatusBar';
import { RadialMenu } from './RadialMenu';
import { TabManager } from './TabManager';
import { SkipLinks } from './SkipLinks';
import { ScreenReaderAnnouncer } from './ScreenReaderAnnouncer';
import { useNavigate } from 'react-router';
import { useKeyboardShortcuts, globalShortcuts } from '../hooks/useKeyboardShortcuts';

interface DashboardLayoutProps {
  onThemeChange?: (theme: string) => void;
  currentTheme?: string;
  onLogout?: () => void;
}

export function DashboardLayout({ onThemeChange, currentTheme, onLogout }: DashboardLayoutProps) {
  const navigate = useNavigate();

  // Override shortcut actions to use actual navigation
  const activeShortcuts = globalShortcuts.map(shortcut => ({
    ...shortcut,
    action: () => {
      // Map shortcuts to actual actions
      if (shortcut.key === 'p' && shortcut.ctrl) {
        window.print();
      } else if (shortcut.key === 't' && shortcut.ctrl) {
        // New Tab
        if ((window as any).tabManager) {
          (window as any).tabManager.openNewTab('/dashboard');
        }
      } else if (shortcut.key === 'w' && shortcut.ctrl) {
        // Close Tab
        if ((window as any).tabManager) {
          const activeTabId = (window as any).tabManager.getActiveTabId();
          (window as any).tabManager.closeTab(activeTabId);
        }
      } else if (shortcut.key === '/' && shortcut.ctrl) {
        navigate('/dashboard/shortcuts');
      } else if (shortcut.key === ',' && shortcut.ctrl) {
        navigate('/dashboard/settings');
      } else if (shortcut.key === 'l' && shortcut.ctrl) {
        // Logout
        onLogout?.();
      } else if (shortcut.key === 'F1') {
        navigate('/dashboard/help');
      } else {
        // For other shortcuts, just log for now
        console.log(`Shortcut triggered: ${shortcut.description}`);
      }
    }
  }));

  // Activate keyboard shortcuts
  useKeyboardShortcuts(activeShortcuts);

  return (
    <div 
      className="w-screen h-screen flex flex-col overflow-hidden"
      style={{
        fontFamily: 'var(--font-family)',
        backgroundColor: 'var(--color-bg)',
      }}
    >
      {/* Skip Links for Keyboard Navigation */}
      <SkipLinks />
      
      {/* Screen Reader Announcer */}
      <ScreenReaderAnnouncer />
      
      <MenuBar onThemeChange={onThemeChange} currentTheme={currentTheme} onLogout={onLogout} />
      <Toolbar onLogout={onLogout} />
      
      <div 
        className="flex-1 overflow-hidden flex flex-col relative" 
        id="main-content" 
        tabIndex={-1}
        role="main"
        aria-label="Main content area"
      >
        {/* Tab Manager with Page Content */}
        <TabManager />

        {/* Radial Menu */}
        <RadialMenu />
      </div>

      <StatusBar zoom={100} />
    </div>
  );
}