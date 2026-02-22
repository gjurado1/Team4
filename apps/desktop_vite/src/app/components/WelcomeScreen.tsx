import { ArrowRight } from 'lucide-react';

interface WelcomeScreenProps {
  onGetStarted: () => void;
}

export function WelcomeScreen({ onGetStarted }: WelcomeScreenProps) {
  return (
    <div 
      className="relative w-full h-full overflow-hidden flex items-center justify-center p-8"
    >
      {/* Center Panel with Overlay */}
      <div 
        className="max-w-2xl w-full rounded-xl shadow-2xl backdrop-blur-sm"
        style={{
          backgroundColor: 'var(--hero-overlay-bg)',
          border: '2px solid var(--hero-overlay-border)',
          boxShadow: 'var(--shadow-modal)',
          padding: 'var(--space-8)',
        }}
      >
        {/* Logo/Brand Area */}
        <div className="text-center mb-8">
          <div 
            className="inline-flex items-center justify-center w-20 h-20 rounded-full mb-6"
            style={{
              backgroundColor: 'var(--btn-primary-bg)',
            }}
          >
            <svg 
              width="40" 
              height="40" 
              viewBox="0 0 40 40" 
              fill="none"
              style={{
                color: 'var(--btn-primary-fg)',
              }}
            >
              <path 
                d="M20 8C13.373 8 8 13.373 8 20C8 26.627 13.373 32 20 32C26.627 32 32 26.627 32 20C32 13.373 26.627 8 20 8ZM20 10C25.546 10 30 14.454 30 20C30 25.546 25.546 30 20 30C14.454 30 10 25.546 10 20C10 14.454 14.454 10 20 10ZM20 14C18.343 14 17 15.343 17 17C17 18.657 18.343 20 20 20C21.657 20 23 18.657 23 17C23 15.343 21.657 14 20 14ZM20 22C16.686 22 14 24.686 14 28H26C26 24.686 23.314 22 20 22Z" 
                fill="currentColor"
              />
            </svg>
          </div>

          <h1 
            className="mb-3"
            style={{
              fontSize: '48px',
              fontWeight: '600',
              color: 'var(--color-text)',
              lineHeight: 'var(--line-height-tight)',
            }}
          >
            CareConnect
          </h1>

          <p 
            className="mb-8"
            style={{
              fontSize: '20px',
              color: 'var(--color-text-muted)',
              lineHeight: 'var(--line-height-base)',
            }}
          >
            Care made clearer. Support that feels close.
          </p>

          <p 
            className="max-w-lg mx-auto mb-10"
            style={{
              fontSize: 'var(--font-size-body)',
              color: 'var(--color-text-muted)',
              lineHeight: 'var(--line-height-base)',
            }}
          >
            A comprehensive desktop application designed to help caregivers manage 
            care plans, medications, appointments, and stay connected with loved ones 
            and healthcare providers.
          </p>
        </div>

        {/* Primary Action */}
        <div className="flex justify-center">
          <button
            onClick={onGetStarted}
            className="group inline-flex items-center gap-3 px-8 py-4 rounded-lg transition-all outline-none"
            style={{
              backgroundColor: 'var(--btn-primary-bg)',
              color: 'var(--btn-primary-fg)',
              fontSize: '16px',
              fontWeight: '500',
              transition: 'var(--transition-medium)',
              boxShadow: 'var(--shadow-panel)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--btn-primary-hover-bg)';
              e.currentTarget.style.color = 'var(--btn-primary-hover-fg)';
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = 'var(--shadow-lg)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--btn-primary-bg)';
              e.currentTarget.style.color = 'var(--btn-primary-fg)';
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'var(--shadow-panel)';
            }}
            onFocus={(e) => {
              e.currentTarget.style.outline = `var(--focus-ring-width) solid var(--focus-ring-color)`;
              e.currentTarget.style.outlineOffset = 'var(--focus-ring-offset)';
            }}
            onBlur={(e) => {
              e.currentTarget.style.outline = 'none';
            }}
            aria-label="Get started with CareConnect"
          >
            <span>Let's Get Started</span>
            <ArrowRight 
              size={20} 
              className="transition-transform group-hover:translate-x-1"
              style={{ transition: 'var(--transition-medium)' }}
            />
          </button>
        </div>

        {/* Accessibility Note */}
        <div 
          className="mt-8 text-center"
          style={{
            fontSize: 'var(--font-size-small)',
            color: 'var(--color-text-muted)',
          }}
        >
          Press <kbd className="px-2 py-1 rounded" style={{ backgroundColor: 'var(--color-panel)', border: '1px solid var(--color-border)' }}>Tab</kbd> to navigate • 
          Press <kbd className="px-2 py-1 rounded mx-1" style={{ backgroundColor: 'var(--color-panel)', border: '1px solid var(--color-border)' }}>Enter</kbd> to select
        </div>
      </div>
    </div>
  );
}