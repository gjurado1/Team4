import { ReactNode } from 'react';

interface VisuallyHiddenProps {
  children: ReactNode;
}

/**
 * VisuallyHidden Component
 * Hides content visually but keeps it accessible to screen readers
 * Used for providing additional context to assistive technologies
 */
export function VisuallyHidden({ children }: VisuallyHiddenProps) {
  return (
    <span
      className="sr-only"
      style={{
        position: 'absolute',
        left: '-10000px',
        width: '1px',
        height: '1px',
        overflow: 'hidden',
        clip: 'rect(0, 0, 0, 0)',
        whiteSpace: 'nowrap',
      }}
    >
      {children}
    </span>
  );
}
