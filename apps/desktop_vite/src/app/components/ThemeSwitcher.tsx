import { useEffect, useMemo, useRef } from 'react';
import { Sparkles } from 'lucide-react';

interface ThemeSwitcherProps {
  currentTheme: string;
  onRequestClose: () => void;
}

export function ThemeSwitcher({ currentTheme, onRequestClose }: ThemeSwitcherProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const themes = [
    { 
      id: 'warm', 
      name: 'Warm Care', 
      description: 'Welcoming, comforting atmosphere',
      accent: '#8d4a5f'
    },
    { 
      id: 'medical', 
      name: 'Medical Blue/Teal', 
      description: 'Calm, professional medical tones',
      accent: '#3d4d66'
    },
    { 
      id: 'dark', 
      name: 'Deep Focus Purple', 
      description: 'Low vision dark theme',
      accent: '#7c48a8'
    },
  ];

  const activeTheme = useMemo(
    () => themes.find((theme) => theme.id === currentTheme) ?? themes[0],
    [currentTheme]
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!containerRef.current) return;
      if (!containerRef.current.contains(event.target as Node)) {
        onRequestClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onRequestClose]);

  return (
    <div 
      ref={containerRef}
      className="fixed bottom-20 right-6 z-50 rounded-xl overflow-hidden min-w-72"
      style={{
        backgroundColor: 'var(--color-surface)',
        border: '1px solid var(--color-border)',
        boxShadow: 'var(--shadow-modal)',
        backdropFilter: 'blur(8px)',
      }}
    >
      <div 
        className="px-5 py-3.5 flex items-center gap-2.5"
        style={{
          borderBottom: '1px solid var(--color-border)',
          background: 'linear-gradient(to bottom, var(--color-surface), var(--color-panel))',
        }}
      >
        <Sparkles size={18} style={{ color: 'var(--color-focus)' }} />
        <span 
          style={{
            fontSize: 'var(--font-size-body)',
            fontWeight: '600',
            color: 'var(--color-text)',
          }}
        >
          Theme Updated
        </span>
      </div>

      <div className="px-5 py-4">
        <div
          className="rounded-lg p-3"
          style={{
            border: '1px solid var(--color-border)',
            backgroundColor: 'var(--color-panel)',
          }}
        >
          <div className="flex items-center gap-3">
            <div
              className="w-4 h-4 rounded-full"
              style={{
                backgroundColor: activeTheme.accent,
                boxShadow: `0 0 0 2px var(--color-surface), 0 0 0 4px ${activeTheme.accent}40`,
              }}
            />
            <div>
              <div
                style={{
                  fontSize: 'var(--font-size-body)',
                  fontWeight: '600',
                  color: 'var(--color-text)',
                }}
              >
                {activeTheme.name}
              </div>
              <div
                style={{
                  fontSize: 'var(--font-size-small)',
                  color: 'var(--color-text-muted)',
                }}
              >
                {activeTheme.description}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div 
        className="px-4 py-2.5 text-center"
        style={{
          borderTop: '1px solid var(--color-border)',
          fontSize: 'var(--font-size-small)',
          color: 'var(--color-text-muted)',
          backgroundColor: 'var(--color-panel)',
        }}
      >
        Press <kbd style={{ 
          padding: '2px 6px', 
          borderRadius: '4px', 
          backgroundColor: 'var(--color-bg)',
          border: '1px solid var(--color-border)',
          fontWeight: '500',
        }}>Alt+T</kbd> to cycle themes
      </div>
    </div>
  );
}
