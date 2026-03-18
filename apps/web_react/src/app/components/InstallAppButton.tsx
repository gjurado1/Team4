import { Download } from 'lucide-react';
import { usePwaInstall } from '../contexts/PwaInstallContext';

interface InstallAppButtonProps {
  variant?: 'button' | 'icon' | 'wide';
  className?: string;
}

export function InstallAppButton({
  variant = 'button',
  className = '',
}: InstallAppButtonProps) {
  const { isInstallAvailable, isInstallPromptOpen, promptInstall } = usePwaInstall();

  if (!isInstallAvailable) {
    return null;
  }

  if (variant === 'icon') {
    return (
      <button
        type="button"
        className={className}
        onClick={() => void promptInstall()}
        disabled={isInstallPromptOpen}
        aria-label="Install CareConnect app"
        title="Install CareConnect"
      >
        <Download className="cc-icon cc-icon--md" aria-hidden="true" />
      </button>
    );
  }

  const buttonClassName = [
    'install-app-button',
    'cc-btn',
    'cc-btn--secondary',
    variant === 'wide' ? 'cc-btn--wide' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button
      type="button"
      className={buttonClassName}
      onClick={() => void promptInstall()}
      disabled={isInstallPromptOpen}
    >
      <Download className="cc-icon cc-icon--md" aria-hidden="true" />
      <span>{isInstallPromptOpen ? 'Opening Install Prompt...' : 'Install App'}</span>
    </button>
  );
}
