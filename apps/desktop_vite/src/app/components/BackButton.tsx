import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router';

interface BackButtonProps {
  label?: string;
  onClick?: () => void;
}

export function BackButton({ label = 'Back', onClick }: BackButtonProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      navigate(-1);
    }
  };

  return (
    <button
      onClick={handleClick}
      className="inline-flex items-center gap-2 px-3 py-2 rounded-lg transition-all outline-none"
      style={{
        color: 'var(--color-text)',
        fontSize: 'var(--font-size-body)',
        fontWeight: '500',
        transition: 'var(--transition-medium)',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = 'var(--btn-secondary-hover-bg)';
        e.currentTarget.style.color = 'var(--color-focus)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = 'transparent';
        e.currentTarget.style.color = 'var(--color-text)';
      }}
      onFocus={(e) => {
        e.currentTarget.style.outline = `var(--focus-ring-width) solid var(--focus-ring-color)`;
        e.currentTarget.style.outlineOffset = 'var(--focus-ring-offset)';
      }}
      onBlur={(e) => {
        e.currentTarget.style.outline = 'none';
      }}
      aria-label={label}
    >
      <ArrowLeft size={20} />
      <span>{label}</span>
    </button>
  );
}
