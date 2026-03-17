import { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';

export function ThemeToggle() {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.toggle('dark', savedTheme === 'dark');
      return;
    }

    if (prefersDark) {
      setTheme('dark');
      document.documentElement.classList.add('dark');
      return;
    }

    setTheme('light');
    document.documentElement.classList.remove('dark');
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    document.documentElement.classList.toggle('dark', nextTheme === 'dark');
    localStorage.setItem('theme', nextTheme);
  };

  if (!mounted) {
    return <div className="theme-toggle__placeholder" aria-hidden="true" />;
  }

  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      <span className="theme-toggle__icon-stack">
        <span className="theme-toggle__icon" data-active={theme === 'light'} aria-hidden="true">
          <Sun className="cc-icon cc-icon--lg" />
        </span>
        <span className="theme-toggle__icon" data-active={theme === 'dark'} aria-hidden="true">
          <Moon className="cc-icon cc-icon--lg" />
        </span>
      </span>
    </button>
  );
}
