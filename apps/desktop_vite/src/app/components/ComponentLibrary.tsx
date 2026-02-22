import { useState } from 'react';
import { Save, Trash2, Plus, CheckCircle } from 'lucide-react';

/**
 * CareConnect Desktop Component Library
 * Demonstrates all token-driven UI components with states
 */
export function ComponentLibrary() {
  const [inputValue, setInputValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div 
      className="p-8 space-y-12 overflow-auto"
      style={{
        backgroundColor: 'var(--color-bg)',
        fontFamily: 'var(--font-family)',
      }}
    >
      <h1 
        style={{
          fontSize: '32px',
          fontWeight: '600',
          color: 'var(--color-text)',
          marginBottom: 'var(--space-3)',
        }}
      >
        CareConnect Component Library
      </h1>
      <p 
        style={{
          fontSize: 'var(--font-size-body)',
          color: 'var(--color-text-muted)',
          marginBottom: 'var(--space-6)',
        }}
      >
        All components use design tokens - no hard-coded values
      </p>

      {/* A) BUTTONS */}
      <section>
        <h2 
          className="mb-4"
          style={{
            fontSize: 'var(--font-size-section)',
            fontWeight: '600',
            color: 'var(--color-text)',
          }}
        >
          A) Buttons
        </h2>
        
        <div 
          className="p-6 rounded-lg space-y-4"
          style={{
            backgroundColor: 'var(--color-surface)',
            border: '1px solid var(--color-border)',
          }}
        >
          {/* Primary Buttons */}
          <div>
            <h3 
              className="mb-3"
              style={{
                fontSize: 'var(--font-size-body)',
                fontWeight: '500',
                color: 'var(--color-text)',
              }}
            >
              Primary Button States
            </h3>
            <div className="flex flex-wrap gap-3">
              <button
                className="px-4 py-2 rounded transition-all outline-none"
                style={{
                  backgroundColor: 'var(--btn-primary-bg)',
                  color: 'var(--btn-primary-fg)',
                  fontSize: 'var(--font-size-body)',
                  fontWeight: '500',
                  transition: 'var(--transition-fast)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--btn-primary-hover-bg)';
                  e.currentTarget.style.color = 'var(--btn-primary-hover-fg)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--btn-primary-bg)';
                  e.currentTarget.style.color = 'var(--btn-primary-fg)';
                }}
                onFocus={(e) => {
                  e.currentTarget.style.outline = `var(--focus-ring-width) solid var(--focus-ring-color)`;
                  e.currentTarget.style.outlineOffset = 'var(--focus-ring-offset)';
                }}
                onBlur={(e) => {
                  e.currentTarget.style.outline = 'none';
                }}
              >
                Primary Button
              </button>

              <button
                className="inline-flex items-center gap-2 px-4 py-2 rounded transition-all outline-none"
                style={{
                  backgroundColor: 'var(--btn-primary-bg)',
                  color: 'var(--btn-primary-fg)',
                  fontSize: 'var(--font-size-body)',
                  fontWeight: '500',
                  transition: 'var(--transition-fast)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--btn-primary-hover-bg)';
                  e.currentTarget.style.color = 'var(--btn-primary-hover-fg)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--btn-primary-bg)';
                  e.currentTarget.style.color = 'var(--btn-primary-fg)';
                }}
                onFocus={(e) => {
                  e.currentTarget.style.outline = `var(--focus-ring-width) solid var(--focus-ring-color)`;
                  e.currentTarget.style.outlineOffset = 'var(--focus-ring-offset)';
                }}
                onBlur={(e) => {
                  e.currentTarget.style.outline = 'none';
                }}
              >
                <Save size={16} />
                <span>With Icon</span>
              </button>
            </div>
          </div>

          {/* Secondary Buttons */}
          <div>
            <h3 
              className="mb-3"
              style={{
                fontSize: 'var(--font-size-body)',
                fontWeight: '500',
                color: 'var(--color-text)',
              }}
            >
              Secondary Button States
            </h3>
            <div className="flex flex-wrap gap-3">
              <button
                className="px-4 py-2 rounded transition-all outline-none"
                style={{
                  backgroundColor: 'var(--btn-secondary-bg)',
                  color: 'var(--btn-secondary-fg)',
                  fontSize: 'var(--font-size-body)',
                  fontWeight: '500',
                  transition: 'var(--transition-fast)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--btn-secondary-hover-bg)';
                  e.currentTarget.style.color = 'var(--btn-secondary-hover-fg)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--btn-secondary-bg)';
                  e.currentTarget.style.color = 'var(--btn-secondary-fg)';
                }}
                onFocus={(e) => {
                  e.currentTarget.style.outline = `var(--focus-ring-width) solid var(--focus-ring-color)`;
                  e.currentTarget.style.outlineOffset = 'var(--focus-ring-offset)';
                }}
                onBlur={(e) => {
                  e.currentTarget.style.outline = 'none';
                }}
              >
                Secondary Button
              </button>
            </div>
          </div>

          {/* Destructive Buttons */}
          <div>
            <h3 
              className="mb-3"
              style={{
                fontSize: 'var(--font-size-body)',
                fontWeight: '500',
                color: 'var(--color-text)',
              }}
            >
              Destructive Button States
            </h3>
            <div className="flex flex-wrap gap-3">
              <button
                className="inline-flex items-center gap-2 px-4 py-2 rounded transition-all outline-none"
                style={{
                  backgroundColor: 'var(--btn-danger-bg)',
                  color: 'var(--btn-danger-fg)',
                  fontSize: 'var(--font-size-body)',
                  fontWeight: '500',
                  transition: 'var(--transition-fast)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--btn-danger-hover-bg)';
                  e.currentTarget.style.color = 'var(--btn-danger-hover-fg)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--btn-danger-bg)';
                  e.currentTarget.style.color = 'var(--btn-danger-fg)';
                }}
                onFocus={(e) => {
                  e.currentTarget.style.outline = `var(--focus-ring-width) solid var(--focus-ring-color)`;
                  e.currentTarget.style.outlineOffset = 'var(--focus-ring-offset)';
                }}
                onBlur={(e) => {
                  e.currentTarget.style.outline = 'none';
                }}
              >
                <Trash2 size={16} />
                <span>Delete</span>
              </button>
            </div>
          </div>

          {/* Disabled Button */}
          <div>
            <h3 
              className="mb-3"
              style={{
                fontSize: 'var(--font-size-body)',
                fontWeight: '500',
                color: 'var(--color-text)',
              }}
            >
              Disabled State
            </h3>
            <button
              disabled
              className="px-4 py-2 rounded cursor-not-allowed"
              style={{
                backgroundColor: 'var(--btn-disabled-bg)',
                color: 'var(--btn-disabled-fg)',
                fontSize: 'var(--font-size-body)',
                fontWeight: '500',
              }}
            >
              Disabled Button
            </button>
          </div>
        </div>
      </section>

      {/* B) INPUTS */}
      <section>
        <h2 
          className="mb-4"
          style={{
            fontSize: 'var(--font-size-section)',
            fontWeight: '600',
            color: 'var(--color-text)',
          }}
        >
          B) Input Fields
        </h2>
        
        <div 
          className="p-6 rounded-lg space-y-6"
          style={{
            backgroundColor: 'var(--color-surface)',
            border: '1px solid var(--color-border)',
          }}
        >
          {/* Text Input */}
          <div className="max-w-md">
            <label 
              htmlFor="demo-text"
              className="block mb-2"
              style={{
                fontSize: 'var(--font-size-label)',
                fontWeight: '500',
                color: 'var(--color-text)',
              }}
            >
              Text Input (Hover & Focus States)
            </label>
            <input
              id="demo-text"
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Type something..."
              className="w-full px-4 py-2.5 rounded outline-none transition-colors"
              style={{
                backgroundColor: 'var(--input-bg)',
                border: '2px solid var(--input-border)',
                color: 'var(--input-text)',
                fontSize: 'var(--font-size-body)',
                transition: 'var(--transition-fast)',
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = 'var(--input-border-focus)';
                e.currentTarget.style.outline = `var(--focus-ring-width) solid var(--focus-ring-color)`;
                e.currentTarget.style.outlineOffset = 'var(--focus-ring-offset)';
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = 'var(--input-border)';
                e.currentTarget.style.outline = 'none';
              }}
            />
          </div>

          {/* Password Input */}
          <div className="max-w-md">
            <label 
              htmlFor="demo-password"
              className="block mb-2"
              style={{
                fontSize: 'var(--font-size-label)',
                fontWeight: '500',
                color: 'var(--color-text)',
              }}
            >
              Password Input (with reveal)
            </label>
            <div className="relative">
              <input
                id="demo-password"
                type={showPassword ? 'text' : 'password'}
                value={passwordValue}
                onChange={(e) => setPasswordValue(e.target.value)}
                placeholder="Enter password"
                className="w-full px-4 py-2.5 pr-12 rounded outline-none transition-colors"
                style={{
                  backgroundColor: 'var(--input-bg)',
                  border: '2px solid var(--input-border)',
                  color: 'var(--input-text)',
                  fontSize: 'var(--font-size-body)',
                  transition: 'var(--transition-fast)',
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = 'var(--input-border-focus)';
                  e.currentTarget.style.outline = `var(--focus-ring-width) solid var(--focus-ring-color)`;
                  e.currentTarget.style.outlineOffset = 'var(--focus-ring-offset)';
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = 'var(--input-border)';
                  e.currentTarget.style.outline = 'none';
                }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 px-2 py-1"
                style={{
                  color: 'var(--color-text-muted)',
                }}
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
          </div>

          {/* Search Input */}
          <div className="max-w-md">
            <label 
              htmlFor="demo-search"
              className="block mb-2"
              style={{
                fontSize: 'var(--font-size-label)',
                fontWeight: '500',
                color: 'var(--color-text)',
              }}
            >
              Search Field
            </label>
            <input
              id="demo-search"
              type="search"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="Search..."
              className="w-full px-4 py-2.5 rounded outline-none transition-colors"
              style={{
                backgroundColor: 'var(--input-bg)',
                border: '2px solid var(--input-border)',
                color: 'var(--input-text)',
                fontSize: 'var(--font-size-body)',
                transition: 'var(--transition-fast)',
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = 'var(--input-border-focus)';
                e.currentTarget.style.outline = `var(--focus-ring-width) solid var(--focus-ring-color)`;
                e.currentTarget.style.outlineOffset = 'var(--focus-ring-offset)';
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = 'var(--input-border)';
                e.currentTarget.style.outline = 'none';
              }}
            />
          </div>

          {/* Error State */}
          <div className="max-w-md">
            <label 
              htmlFor="demo-error"
              className="block mb-2"
              style={{
                fontSize: 'var(--font-size-label)',
                fontWeight: '500',
                color: 'var(--color-text)',
              }}
            >
              Input with Error
            </label>
            <input
              id="demo-error"
              type="text"
              placeholder="Invalid input"
              className="w-full px-4 py-2.5 rounded outline-none"
              style={{
                backgroundColor: 'var(--input-bg)',
                border: '2px solid var(--color-error)',
                color: 'var(--input-text)',
                fontSize: 'var(--font-size-body)',
              }}
            />
            <p 
              className="mt-1"
              style={{
                fontSize: 'var(--font-size-small)',
                color: 'var(--color-error)',
              }}
            >
              This field is required
            </p>
          </div>
        </div>
      </section>

      {/* C) PANELS */}
      <section>
        <h2 
          className="mb-4"
          style={{
            fontSize: 'var(--font-size-section)',
            fontWeight: '600',
            color: 'var(--color-text)',
          }}
        >
          C) Panels & Cards
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div 
            className="p-6 rounded-lg"
            style={{
              backgroundColor: 'var(--color-surface)',
              border: '1px solid var(--color-border)',
              boxShadow: 'var(--shadow-panel)',
            }}
          >
            <h3 
              className="mb-2"
              style={{
                fontSize: 'var(--font-size-body)',
                fontWeight: '500',
                color: 'var(--color-text)',
              }}
            >
              Standard Panel
            </h3>
            <p 
              style={{
                fontSize: 'var(--font-size-body)',
                color: 'var(--color-text-muted)',
              }}
            >
              Uses --color-surface, --color-border, and --shadow-panel tokens
            </p>
          </div>

          <div 
            className="p-6 rounded-lg"
            style={{
              backgroundColor: 'var(--color-panel)',
              border: '1px solid var(--color-border)',
            }}
          >
            <h3 
              className="mb-2"
              style={{
                fontSize: 'var(--font-size-body)',
                fontWeight: '500',
                color: 'var(--color-text)',
              }}
            >
              Nested Panel
            </h3>
            <p 
              style={{
                fontSize: 'var(--font-size-body)',
                color: 'var(--color-text-muted)',
              }}
            >
              Uses --color-panel for subtle background variation
            </p>
          </div>
        </div>
      </section>

      {/* Typography Scale */}
      <section>
        <h2 
          className="mb-4"
          style={{
            fontSize: 'var(--font-size-section)',
            fontWeight: '600',
            color: 'var(--color-text)',
          }}
        >
          D) Typography Scale
        </h2>
        
        <div 
          className="p-6 rounded-lg space-y-3"
          style={{
            backgroundColor: 'var(--color-surface)',
            border: '1px solid var(--color-border)',
          }}
        >
          <div>
            <span 
              style={{
                fontSize: 'var(--font-size-section)',
                fontWeight: '600',
                color: 'var(--color-text)',
              }}
            >
              Section Heading
            </span>
            <span 
              className="ml-3"
              style={{
                fontSize: 'var(--font-size-small)',
                color: 'var(--color-text-muted)',
              }}
            >
              --font-size-section (18px)
            </span>
          </div>
          
          <div>
            <span 
              style={{
                fontSize: 'var(--font-size-body)',
                color: 'var(--color-text)',
              }}
            >
              Body Text
            </span>
            <span 
              className="ml-3"
              style={{
                fontSize: 'var(--font-size-small)',
                color: 'var(--color-text-muted)',
              }}
            >
              --font-size-body (14px)
            </span>
          </div>

          <div>
            <span 
              style={{
                fontSize: 'var(--font-size-label)',
                color: 'var(--color-text)',
              }}
            >
              Label Text
            </span>
            <span 
              className="ml-3"
              style={{
                fontSize: 'var(--font-size-small)',
                color: 'var(--color-text-muted)',
              }}
            >
              --font-size-label (13px)
            </span>
          </div>

          <div>
            <span 
              style={{
                fontSize: 'var(--font-size-small)',
                color: 'var(--color-text-muted)',
              }}
            >
              Small/Caption Text - --font-size-small (12px)
            </span>
          </div>
        </div>
      </section>

      {/* Status Indicators */}
      <section>
        <h2 
          className="mb-4"
          style={{
            fontSize: 'var(--font-size-section)',
            fontWeight: '600',
            color: 'var(--color-text)',
          }}
        >
          E) Status Colors
        </h2>
        
        <div 
          className="p-6 rounded-lg"
          style={{
            backgroundColor: 'var(--color-surface)',
            border: '1px solid var(--color-border)',
          }}
        >
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2">
              <CheckCircle size={20} style={{ color: 'var(--color-success)' }} />
              <span style={{ color: 'var(--color-text)' }}>Success</span>
            </div>
            <div className="flex items-center gap-2">
              <div 
                className="w-5 h-5 rounded-full"
                style={{ backgroundColor: 'var(--color-warning)' }}
              />
              <span style={{ color: 'var(--color-text)' }}>Warning</span>
            </div>
            <div className="flex items-center gap-2">
              <div 
                className="w-5 h-5 rounded-full"
                style={{ backgroundColor: 'var(--color-error)' }}
              />
              <span style={{ color: 'var(--color-text)' }}>Error</span>
            </div>
            <div className="flex items-center gap-2">
              <div 
                className="w-5 h-5 rounded-full"
                style={{ backgroundColor: 'var(--color-focus)' }}
              />
              <span style={{ color: 'var(--color-text)' }}>Focus/Info</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
