/**
 * Skip Links Component
 * Provides keyboard users a way to skip repetitive navigation
 * Links become visible when focused
 */
export function SkipLinks() {
  const skipToMain = () => {
    const mainContent = document.getElementById('main-content');
    if (mainContent) {
      mainContent.focus();
      mainContent.scrollIntoView();
    }
  };

  const skipToNav = () => {
    const nav = document.getElementById('radial-menu');
    if (nav) {
      nav.focus();
    }
  };

  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 9999,
      }}
    >
      <a
        href="#main-content"
        onClick={(e) => {
          e.preventDefault();
          skipToMain();
        }}
        className="skip-link"
        style={{
          position: 'absolute',
          left: '-10000px',
          width: '1px',
          height: '1px',
          overflow: 'hidden',
          padding: '12px 24px',
          backgroundColor: 'var(--btn-primary-bg)',
          color: 'var(--btn-primary-fg)',
          fontSize: 'var(--font-size-body)',
          fontWeight: '600',
          borderRadius: '4px',
          textDecoration: 'none',
          transition: 'var(--transition-fast)',
          zIndex: 9999,
        }}
        onFocus={(e) => {
          e.currentTarget.style.position = 'fixed';
          e.currentTarget.style.top = '12px';
          e.currentTarget.style.left = '12px';
          e.currentTarget.style.width = 'auto';
          e.currentTarget.style.height = 'auto';
          e.currentTarget.style.overflow = 'visible';
          e.currentTarget.style.outline = `var(--focus-ring-width) solid var(--focus-ring-color)`;
          e.currentTarget.style.outlineOffset = 'var(--focus-ring-offset)';
        }}
        onBlur={(e) => {
          e.currentTarget.style.position = 'absolute';
          e.currentTarget.style.left = '-10000px';
          e.currentTarget.style.width = '1px';
          e.currentTarget.style.height = '1px';
          e.currentTarget.style.overflow = 'hidden';
          e.currentTarget.style.outline = 'none';
        }}
      >
        Skip to main content
      </a>
      <a
        href="#radial-menu"
        onClick={(e) => {
          e.preventDefault();
          skipToNav();
        }}
        className="skip-link"
        style={{
          position: 'absolute',
          left: '-10000px',
          width: '1px',
          height: '1px',
          overflow: 'hidden',
          padding: '12px 24px',
          backgroundColor: 'var(--btn-primary-bg)',
          color: 'var(--btn-primary-fg)',
          fontSize: 'var(--font-size-body)',
          fontWeight: '600',
          borderRadius: '4px',
          textDecoration: 'none',
          transition: 'var(--transition-fast)',
          zIndex: 9999,
        }}
        onFocus={(e) => {
          e.currentTarget.style.position = 'fixed';
          e.currentTarget.style.top = '52px';
          e.currentTarget.style.left = '12px';
          e.currentTarget.style.width = 'auto';
          e.currentTarget.style.height = 'auto';
          e.currentTarget.style.overflow = 'visible';
          e.currentTarget.style.outline = `var(--focus-ring-width) solid var(--focus-ring-color)`;
          e.currentTarget.style.outlineOffset = 'var(--focus-ring-offset)';
        }}
        onBlur={(e) => {
          e.currentTarget.style.position = 'absolute';
          e.currentTarget.style.left = '-10000px';
          e.currentTarget.style.width = '1px';
          e.currentTarget.style.height = '1px';
          e.currentTarget.style.overflow = 'hidden';
          e.currentTarget.style.outline = 'none';
        }}
      >
        Skip to navigation menu
      </a>
    </div>
  );
}
