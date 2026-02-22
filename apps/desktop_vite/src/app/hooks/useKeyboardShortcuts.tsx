import { useEffect } from 'react';

export interface KeyboardShortcut {
  key: string;
  ctrl?: boolean;
  alt?: boolean;
  shift?: boolean;
  meta?: boolean; // Cmd on Mac
  action: () => void;
  description: string;
  category: string;
}

// Detect if user is on Mac
export const isMac = typeof window !== 'undefined' && navigator.platform.toUpperCase().indexOf('MAC') >= 0;

// Format shortcut key for display
export function formatShortcut(shortcut: KeyboardShortcut): string {
  const parts: string[] = [];
  
  if (shortcut.ctrl && !isMac) parts.push('Ctrl');
  if (shortcut.meta || (shortcut.ctrl && isMac)) parts.push(isMac ? '⌘' : 'Ctrl');
  if (shortcut.alt) parts.push(isMac ? '⌥' : 'Alt');
  if (shortcut.shift) parts.push(isMac ? '⇧' : 'Shift');
  
  // Format the key
  let keyDisplay = shortcut.key.toUpperCase();
  if (keyDisplay === 'ARROWUP') keyDisplay = '↑';
  if (keyDisplay === 'ARROWDOWN') keyDisplay = '↓';
  if (keyDisplay === 'ARROWLEFT') keyDisplay = '←';
  if (keyDisplay === 'ARROWRIGHT') keyDisplay = '→';
  if (keyDisplay === 'ESCAPE') keyDisplay = 'Esc';
  if (keyDisplay === 'ENTER') keyDisplay = isMac ? '↵' : 'Enter';
  if (keyDisplay === ' ') keyDisplay = 'Space';
  
  parts.push(keyDisplay);
  
  return parts.join(isMac ? '' : '+');
}

export function useKeyboardShortcuts(shortcuts: KeyboardShortcut[], enabled = true) {
  useEffect(() => {
    if (!enabled) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      for (const shortcut of shortcuts) {
        const ctrlKey = isMac ? event.metaKey : event.ctrlKey;
        const metaKey = event.metaKey;
        
        const ctrlMatch = shortcut.ctrl ? ctrlKey : !ctrlKey;
        const altMatch = shortcut.alt ? event.altKey : !event.altKey;
        const shiftMatch = shortcut.shift ? event.shiftKey : !event.shiftKey;
        const metaMatch = shortcut.meta ? metaKey : !metaKey;
        const keyMatch = event.key.toLowerCase() === shortcut.key.toLowerCase();

        if (ctrlMatch && altMatch && shiftMatch && metaMatch && keyMatch) {
          event.preventDefault();
          shortcut.action();
          break;
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [shortcuts, enabled]);
}

// Global shortcuts used throughout the app
export const globalShortcuts: KeyboardShortcut[] = [
  {
    key: 'n',
    ctrl: true,
    action: () => console.log('New Care Plan'),
    description: 'New Care Plan',
    category: 'File',
  },
  {
    key: 'o',
    ctrl: true,
    action: () => console.log('Open'),
    description: 'Open',
    category: 'File',
  },
  {
    key: 's',
    ctrl: true,
    action: () => console.log('Save'),
    description: 'Save',
    category: 'File',
  },
  {
    key: 'p',
    ctrl: true,
    action: () => window.print(),
    description: 'Print',
    category: 'File',
  },
  {
    key: 'l',
    ctrl: true,
    action: () => console.log('Logout'),
    description: 'Logout',
    category: 'File',
  },
  {
    key: 't',
    ctrl: true,
    action: () => console.log('New Tab'),
    description: 'New Tab',
    category: 'Tabs',
  },
  {
    key: 'w',
    ctrl: true,
    action: () => console.log('Close Tab'),
    description: 'Close Tab',
    category: 'Tabs',
  },
  {
    key: 'z',
    ctrl: true,
    action: () => console.log('Undo'),
    description: 'Undo',
    category: 'Edit',
  },
  {
    key: 'y',
    ctrl: true,
    action: () => console.log('Redo'),
    description: 'Redo',
    category: 'Edit',
  },
  {
    key: 'x',
    ctrl: true,
    action: () => console.log('Cut'),
    description: 'Cut',
    category: 'Edit',
  },
  {
    key: 'c',
    ctrl: true,
    action: () => console.log('Copy'),
    description: 'Copy',
    category: 'Edit',
  },
  {
    key: 'v',
    ctrl: true,
    action: () => console.log('Paste'),
    description: 'Paste',
    category: 'Edit',
  },
  {
    key: 'a',
    ctrl: true,
    action: () => console.log('Select All'),
    description: 'Select All',
    category: 'Edit',
  },
  {
    key: 'f',
    ctrl: true,
    action: () => console.log('Find'),
    description: 'Find',
    category: 'Edit',
  },
  {
    key: '=',
    ctrl: true,
    action: () => console.log('Zoom In'),
    description: 'Zoom In',
    category: 'View',
  },
  {
    key: '-',
    ctrl: true,
    action: () => console.log('Zoom Out'),
    description: 'Zoom Out',
    category: 'View',
  },
  {
    key: '0',
    ctrl: true,
    action: () => console.log('Reset Zoom'),
    description: 'Reset Zoom',
    category: 'View',
  },
  {
    key: ',',
    ctrl: true,
    action: () => console.log('Settings'),
    description: 'Settings',
    category: 'Tools',
  },
  {
    key: 'F1',
    action: () => console.log('Help'),
    description: 'Help Documentation',
    category: 'Help',
  },
  {
    key: '/',
    ctrl: true,
    action: () => console.log('Keyboard Shortcuts'),
    description: 'Show Keyboard Shortcuts',
    category: 'Help',
  },
  {
    key: 'Escape',
    action: () => console.log('Close/Cancel'),
    description: 'Close Dialog or Cancel',
    category: 'Navigation',
  },
];

// Navigation-only shortcuts
export const navigationShortcuts: KeyboardShortcut[] = [
  {
    key: 'Tab',
    action: () => {},
    description: 'Move to next element',
    category: 'Navigation',
  },
  {
    key: 'Tab',
    shift: true,
    action: () => {},
    description: 'Move to previous element',
    category: 'Navigation',
  },
  {
    key: 'ArrowUp',
    action: () => {},
    description: 'Navigate up in lists',
    category: 'Navigation',
  },
  {
    key: 'ArrowDown',
    action: () => {},
    description: 'Navigate down in lists',
    category: 'Navigation',
  },
  {
    key: 'ArrowLeft',
    action: () => {},
    description: 'Navigate left or collapse',
    category: 'Navigation',
  },
  {
    key: 'ArrowRight',
    action: () => {},
    description: 'Navigate right or expand',
    category: 'Navigation',
  },
  {
    key: 'Enter',
    action: () => {},
    description: 'Activate or select',
    category: 'Navigation',
  },
  {
    key: ' ',
    action: () => {},
    description: 'Toggle checkboxes',
    category: 'Navigation',
  },
  {
    key: 'Home',
    action: () => {},
    description: 'Go to beginning',
    category: 'Navigation',
  },
  {
    key: 'End',
    action: () => {},
    description: 'Go to end',
    category: 'Navigation',
  },
];