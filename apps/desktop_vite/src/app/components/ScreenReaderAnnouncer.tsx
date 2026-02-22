import { useEffect, useState } from 'react';

const SCREEN_READER_STORAGE_KEY = 'careconnect-screen-reader-enabled';

/**
 * Screen Reader Announcer Component
 * Provides a live region for announcing dynamic changes to screen reader users
 */
export function ScreenReaderAnnouncer() {
  const [announcement, setAnnouncement] = useState('');
  const [politeness, setPoliteness] = useState<'polite' | 'assertive'>('polite');
  const [isScreenReaderEnabled, setIsScreenReaderEnabled] = useState<boolean>(() => {
    const saved = localStorage.getItem(SCREEN_READER_STORAGE_KEY);
    return saved === null ? true : saved === 'true';
  });

  useEffect(() => {
    // Listen for announcement events
    const handleAnnouncement = (event: CustomEvent) => {
      if (!isScreenReaderEnabled) return;
      const { message, priority = 'polite' } = event.detail;
      setPoliteness(priority);
      setAnnouncement(message);
      
      // Clear announcement after it's been read
      setTimeout(() => setAnnouncement(''), 1000);
    };

    const handleSettingsChange = (event: Event) => {
      const customEvent = event as CustomEvent;
      if (customEvent.detail?.key !== SCREEN_READER_STORAGE_KEY) return;
      setIsScreenReaderEnabled(Boolean(customEvent.detail?.value));
      setAnnouncement('');
    };

    window.addEventListener('screen-reader-announce' as any, handleAnnouncement as any);
    window.addEventListener('accessibility-setting-change' as any, handleSettingsChange as any);
    
    return () => {
      window.removeEventListener('screen-reader-announce' as any, handleAnnouncement as any);
      window.removeEventListener('accessibility-setting-change' as any, handleSettingsChange as any);
    };
  }, [isScreenReaderEnabled]);

  return (
    <div
      role="status"
      aria-live={isScreenReaderEnabled ? politeness : 'off'}
      aria-atomic="true"
      className="sr-only"
      style={{
        position: 'absolute',
        left: '-10000px',
        width: '1px',
        height: '1px',
        overflow: 'hidden',
      }}
    >
      {announcement}
    </div>
  );
}

/**
 * Utility function to announce messages to screen readers
 * @param message - The message to announce
 * @param priority - 'polite' (default) or 'assertive' for urgent announcements
 */
export function announce(message: string, priority: 'polite' | 'assertive' = 'polite') {
  const isEnabled = localStorage.getItem(SCREEN_READER_STORAGE_KEY);
  if (isEnabled === 'false') return;

  window.dispatchEvent(new CustomEvent('screen-reader-announce', {
    detail: { message, priority }
  }));
}
