import { useState } from 'react';
import { BackButton } from '../components/BackButton';
import { 
  Users, 
  Pill, 
  Calendar, 
  Settings, 
  HelpCircle, 
  Mail,
  Search,
  Bell,
  Menu,
  X,
  Check,
  AlertCircle,
  Info,
  ChevronDown,
  Plus
} from 'lucide-react';

export function UILibrary() {
  const [checkboxState, setCheckboxState] = useState(false);
  const [radioState, setRadioState] = useState('option1');
  const [switchState, setSwitchState] = useState(false);
  const [selectValue, setSelectValue] = useState('option1');
  const [sliderValue, setSliderValue] = useState(50);

  return (
    <div 
      className="h-full overflow-auto"
      style={{
        backgroundColor: 'var(--color-bg)',
        color: 'var(--color-text)',
      }}
    >
      {/* Header with Back Button */}
      <div 
        className="sticky top-0 z-10 flex items-center gap-4 px-6 py-4"
        style={{
          backgroundColor: 'var(--color-bg)',
          borderBottom: '1px solid var(--color-border)',
        }}
      >
        <BackButton />
        <div>
          <h1 
            className="m-0"
            style={{
              fontSize: 'var(--font-size-2xl)',
              fontWeight: 'var(--font-weight-semibold)',
              color: 'var(--color-text)',
            }}
          >
            UI Component Library
          </h1>
          <p 
            className="m-0 mt-1"
            style={{
              fontSize: 'var(--font-size-sm)',
              color: 'var(--color-text-secondary)',
            }}
          >
            Complete design system showcasing all UI components with tokenized styling
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-6 py-6 max-w-7xl mx-auto">
        
        {/* Typography Section */}
        <section className="mb-12">
          <h2 
            className="mb-6"
            style={{
              fontSize: 'var(--font-size-xl)',
              fontWeight: 'var(--font-weight-semibold)',
              color: 'var(--color-text)',
              paddingBottom: '12px',
              borderBottom: '2px solid var(--color-border)',
            }}
          >
            Typography
          </h2>
          <div className="grid gap-4">
            <div 
              className="p-4 rounded"
              style={{
                backgroundColor: 'var(--color-surface)',
                border: '1px solid var(--color-border)',
              }}
            >
              <h1 style={{ fontSize: 'var(--font-size-3xl)', fontWeight: 'var(--font-weight-bold)', margin: 0 }}>
                Heading 1 - 3XL Bold
              </h1>
              <code className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>
                font-size: var(--font-size-3xl), font-weight: var(--font-weight-bold)
              </code>
            </div>
            
            <div 
              className="p-4 rounded"
              style={{
                backgroundColor: 'var(--color-surface)',
                border: '1px solid var(--color-border)',
              }}
            >
              <h2 style={{ fontSize: 'var(--font-size-2xl)', fontWeight: 'var(--font-weight-semibold)', margin: 0 }}>
                Heading 2 - 2XL Semibold
              </h2>
              <code className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>
                font-size: var(--font-size-2xl), font-weight: var(--font-weight-semibold)
              </code>
            </div>

            <div 
              className="p-4 rounded"
              style={{
                backgroundColor: 'var(--color-surface)',
                border: '1px solid var(--color-border)',
              }}
            >
              <h3 style={{ fontSize: 'var(--font-size-xl)', fontWeight: 'var(--font-weight-semibold)', margin: 0 }}>
                Heading 3 - XL Semibold
              </h3>
              <code className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>
                font-size: var(--font-size-xl), font-weight: var(--font-weight-semibold)
              </code>
            </div>

            <div 
              className="p-4 rounded"
              style={{
                backgroundColor: 'var(--color-surface)',
                border: '1px solid var(--color-border)',
              }}
            >
              <p style={{ fontSize: 'var(--font-size-base)', fontWeight: 'var(--font-weight-normal)', margin: 0 }}>
                Body Text - Base Normal
              </p>
              <code className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>
                font-size: var(--font-size-base), font-weight: var(--font-weight-normal)
              </code>
            </div>

            <div 
              className="p-4 rounded"
              style={{
                backgroundColor: 'var(--color-surface)',
                border: '1px solid var(--color-border)',
              }}
            >
              <p style={{ fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-normal)', margin: 0, color: 'var(--color-text-secondary)' }}>
                Small Text - SM Normal (Secondary)
              </p>
              <code className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>
                font-size: var(--font-size-sm), color: var(--color-text-secondary)
              </code>
            </div>
          </div>
        </section>

        {/* Buttons Section */}
        <section className="mb-12">
          <h2 
            className="mb-6"
            style={{
              fontSize: 'var(--font-size-xl)',
              fontWeight: 'var(--font-weight-semibold)',
              color: 'var(--color-text)',
              paddingBottom: '12px',
              borderBottom: '2px solid var(--color-border)',
            }}
          >
            Buttons
          </h2>
          <div className="grid gap-6">
            
            {/* Primary Button */}
            <div>
              <h3 style={{ fontSize: 'var(--font-size-base)', fontWeight: 'var(--font-weight-medium)', marginBottom: '12px' }}>
                Primary Button
              </h3>
              <div className="flex gap-4 items-center mb-2">
                <button
                  className="px-4 py-2 rounded transition-all duration-200"
                  style={{
                    backgroundColor: 'var(--btn-primary-bg)',
                    color: 'var(--btn-primary-fg)',
                    border: 'none',
                    fontSize: 'var(--font-size-base)',
                    fontWeight: 'var(--font-weight-medium)',
                    cursor: 'pointer',
                    boxShadow: 'var(--shadow-sm)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'var(--btn-primary-hover-bg)';
                    e.currentTarget.style.boxShadow = 'var(--shadow-md)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'var(--btn-primary-bg)';
                    e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.outline = '2px solid var(--focus-ring)';
                    e.currentTarget.style.outlineOffset = '2px';
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.outline = 'none';
                  }}
                >
                  Primary Action
                </button>
                <button
                  className="px-4 py-2 rounded transition-all duration-200"
                  style={{
                    backgroundColor: 'var(--btn-primary-bg)',
                    color: 'var(--btn-primary-fg)',
                    border: 'none',
                    fontSize: 'var(--font-size-base)',
                    fontWeight: 'var(--font-weight-medium)',
                    cursor: 'pointer',
                    boxShadow: 'var(--shadow-sm)',
                    opacity: '0.5',
                  }}
                  disabled
                >
                  Disabled
                </button>
              </div>
              <code className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>
                bg: var(--btn-primary-bg), hover: var(--btn-primary-hover-bg), focus: var(--focus-ring)
              </code>
            </div>

            {/* Secondary Button */}
            <div>
              <h3 style={{ fontSize: 'var(--font-size-base)', fontWeight: 'var(--font-weight-medium)', marginBottom: '12px' }}>
                Secondary Button
              </h3>
              <div className="flex gap-4 items-center mb-2">
                <button
                  className="px-4 py-2 rounded transition-all duration-200"
                  style={{
                    backgroundColor: 'var(--btn-secondary-bg)',
                    color: 'var(--btn-secondary-fg)',
                    border: '1px solid var(--color-border)',
                    fontSize: 'var(--font-size-base)',
                    fontWeight: 'var(--font-weight-medium)',
                    cursor: 'pointer',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'var(--btn-secondary-hover-bg)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'var(--btn-secondary-bg)';
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.outline = '2px solid var(--focus-ring)';
                    e.currentTarget.style.outlineOffset = '2px';
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.outline = 'none';
                  }}
                >
                  Secondary Action
                </button>
                <button
                  className="px-4 py-2 rounded transition-all duration-200"
                  style={{
                    backgroundColor: 'var(--btn-secondary-bg)',
                    color: 'var(--btn-secondary-fg)',
                    border: '1px solid var(--color-border)',
                    fontSize: 'var(--font-size-base)',
                    fontWeight: 'var(--font-weight-medium)',
                    cursor: 'pointer',
                    opacity: '0.5',
                  }}
                  disabled
                >
                  Disabled
                </button>
              </div>
              <code className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>
                bg: var(--btn-secondary-bg), hover: var(--btn-secondary-hover-bg)
              </code>
            </div>

            {/* Danger Button */}
            <div>
              <h3 style={{ fontSize: 'var(--font-size-base)', fontWeight: 'var(--font-weight-medium)', marginBottom: '12px' }}>
                Danger Button
              </h3>
              <div className="flex gap-4 items-center mb-2">
                <button
                  className="px-4 py-2 rounded transition-all duration-200"
                  style={{
                    backgroundColor: 'var(--color-danger)',
                    color: 'white',
                    border: 'none',
                    fontSize: 'var(--font-size-base)',
                    fontWeight: 'var(--font-weight-medium)',
                    cursor: 'pointer',
                    boxShadow: 'var(--shadow-sm)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.filter = 'brightness(0.9)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.filter = 'brightness(1)';
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.outline = '2px solid var(--focus-ring)';
                    e.currentTarget.style.outlineOffset = '2px';
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.outline = 'none';
                  }}
                >
                  Delete Action
                </button>
              </div>
              <code className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>
                bg: var(--color-danger), hover: brightness(0.9)
              </code>
            </div>
          </div>
        </section>

        {/* Form Inputs Section */}
        <section className="mb-12">
          <h2 
            className="mb-6"
            style={{
              fontSize: 'var(--font-size-xl)',
              fontWeight: 'var(--font-weight-semibold)',
              color: 'var(--color-text)',
              paddingBottom: '12px',
              borderBottom: '2px solid var(--color-border)',
            }}
          >
            Form Inputs
          </h2>
          <div className="grid gap-6">
            
            {/* Text Input */}
            <div>
              <label 
                htmlFor="text-input"
                style={{ 
                  display: 'block',
                  fontSize: 'var(--font-size-sm)',
                  fontWeight: 'var(--font-weight-medium)',
                  marginBottom: '8px',
                  color: 'var(--color-text)',
                }}
              >
                Text Input
              </label>
              <input
                id="text-input"
                type="text"
                placeholder="Enter text..."
                className="w-full px-3 py-2 rounded transition-all duration-200"
                style={{
                  backgroundColor: 'var(--input-bg)',
                  color: 'var(--input-fg)',
                  border: '1px solid var(--input-border)',
                  fontSize: 'var(--font-size-base)',
                }}
                onFocus={(e) => {
                  e.currentTarget.style.outline = '2px solid var(--focus-ring)';
                  e.currentTarget.style.outlineOffset = '0px';
                  e.currentTarget.style.borderColor = 'var(--focus-ring)';
                }}
                onBlur={(e) => {
                  e.currentTarget.style.outline = 'none';
                  e.currentTarget.style.borderColor = 'var(--input-border)';
                }}
              />
              <code className="text-xs mt-2 block" style={{ color: 'var(--color-text-secondary)' }}>
                bg: var(--input-bg), border: var(--input-border), focus: var(--focus-ring)
              </code>
            </div>

            {/* Checkbox */}
            <div>
              <label 
                className="flex items-center gap-2 cursor-pointer"
                style={{
                  fontSize: 'var(--font-size-base)',
                  color: 'var(--color-text)',
                }}
              >
                <input
                  type="checkbox"
                  checked={checkboxState}
                  onChange={(e) => setCheckboxState(e.target.checked)}
                  className="w-5 h-5 rounded transition-all duration-200"
                  style={{
                    accentColor: 'var(--btn-primary-bg)',
                    cursor: 'pointer',
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.outline = '2px solid var(--focus-ring)';
                    e.currentTarget.style.outlineOffset = '2px';
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.outline = 'none';
                  }}
                />
                Checkbox Option
              </label>
              <code className="text-xs mt-2 block" style={{ color: 'var(--color-text-secondary)' }}>
                accent-color: var(--btn-primary-bg)
              </code>
            </div>

            {/* Radio Buttons */}
            <div>
              <div style={{ fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-medium)', marginBottom: '8px' }}>
                Radio Buttons
              </div>
              <div className="flex gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="radio-example"
                    value="option1"
                    checked={radioState === 'option1'}
                    onChange={(e) => setRadioState(e.target.value)}
                    className="w-5 h-5"
                    style={{
                      accentColor: 'var(--btn-primary-bg)',
                      cursor: 'pointer',
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.outline = '2px solid var(--focus-ring)';
                      e.currentTarget.style.outlineOffset = '2px';
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.outline = 'none';
                    }}
                  />
                  Option 1
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="radio-example"
                    value="option2"
                    checked={radioState === 'option2'}
                    onChange={(e) => setRadioState(e.target.value)}
                    className="w-5 h-5"
                    style={{
                      accentColor: 'var(--btn-primary-bg)',
                      cursor: 'pointer',
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.outline = '2px solid var(--focus-ring)';
                      e.currentTarget.style.outlineOffset = '2px';
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.outline = 'none';
                    }}
                  />
                  Option 2
                </label>
              </div>
            </div>

            {/* Select Dropdown */}
            <div>
              <label 
                htmlFor="select-input"
                style={{ 
                  display: 'block',
                  fontSize: 'var(--font-size-sm)',
                  fontWeight: 'var(--font-weight-medium)',
                  marginBottom: '8px',
                }}
              >
                Select Dropdown
              </label>
              <select
                id="select-input"
                value={selectValue}
                onChange={(e) => setSelectValue(e.target.value)}
                className="w-full px-3 py-2 rounded transition-all duration-200"
                style={{
                  backgroundColor: 'var(--input-bg)',
                  color: 'var(--input-fg)',
                  border: '1px solid var(--input-border)',
                  fontSize: 'var(--font-size-base)',
                  cursor: 'pointer',
                }}
                onFocus={(e) => {
                  e.currentTarget.style.outline = '2px solid var(--focus-ring)';
                  e.currentTarget.style.outlineOffset = '0px';
                  e.currentTarget.style.borderColor = 'var(--focus-ring)';
                }}
                onBlur={(e) => {
                  e.currentTarget.style.outline = 'none';
                  e.currentTarget.style.borderColor = 'var(--input-border)';
                }}
              >
                <option value="option1">Option 1</option>
                <option value="option2">Option 2</option>
                <option value="option3">Option 3</option>
              </select>
            </div>

            {/* Range Slider */}
            <div>
              <label 
                htmlFor="slider-input"
                style={{ 
                  display: 'block',
                  fontSize: 'var(--font-size-sm)',
                  fontWeight: 'var(--font-weight-medium)',
                  marginBottom: '8px',
                }}
              >
                Range Slider: {sliderValue}
              </label>
              <input
                id="slider-input"
                type="range"
                min="0"
                max="100"
                value={sliderValue}
                onChange={(e) => setSliderValue(Number(e.target.value))}
                className="w-full"
                style={{
                  accentColor: 'var(--btn-primary-bg)',
                  cursor: 'pointer',
                }}
                onFocus={(e) => {
                  e.currentTarget.style.outline = '2px solid var(--focus-ring)';
                  e.currentTarget.style.outlineOffset = '2px';
                }}
                onBlur={(e) => {
                  e.currentTarget.style.outline = 'none';
                }}
              />
            </div>
          </div>
        </section>

        {/* Icons Section */}
        <section className="mb-12">
          <h2 
            className="mb-6"
            style={{
              fontSize: 'var(--font-size-xl)',
              fontWeight: 'var(--font-weight-semibold)',
              color: 'var(--color-text)',
              paddingBottom: '12px',
              borderBottom: '2px solid var(--color-border)',
            }}
          >
            Icons (Lucide React)
          </h2>
          <div 
            className="grid grid-cols-6 gap-4"
          >
            {[
              { Icon: Users, label: 'Users' },
              { Icon: Pill, label: 'Pill' },
              { Icon: Calendar, label: 'Calendar' },
              { Icon: Settings, label: 'Settings' },
              { Icon: HelpCircle, label: 'Help' },
              { Icon: Mail, label: 'Mail' },
              { Icon: Search, label: 'Search' },
              { Icon: Bell, label: 'Bell' },
              { Icon: Menu, label: 'Menu' },
              { Icon: X, label: 'Close' },
              { Icon: Check, label: 'Check' },
              { Icon: AlertCircle, label: 'Alert' },
            ].map(({ Icon, label }) => (
              <div 
                key={label}
                className="flex flex-col items-center gap-2 p-4 rounded"
                style={{
                  backgroundColor: 'var(--color-surface)',
                  border: '1px solid var(--color-border)',
                }}
              >
                <Icon 
                  size={32}
                  style={{ color: 'var(--color-text)' }}
                />
                <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-secondary)' }}>
                  {label}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Cards Section */}
        <section className="mb-12">
          <h2 
            className="mb-6"
            style={{
              fontSize: 'var(--font-size-xl)',
              fontWeight: 'var(--font-weight-semibold)',
              color: 'var(--color-text)',
              paddingBottom: '12px',
              borderBottom: '2px solid var(--color-border)',
            }}
          >
            Cards & Surfaces
          </h2>
          <div className="grid gap-4">
            
            <div 
              className="p-6 rounded transition-all duration-200"
              style={{
                backgroundColor: 'var(--color-surface)',
                border: '1px solid var(--color-border)',
                boxShadow: 'var(--shadow-sm)',
              }}
            >
              <h3 style={{ fontSize: 'var(--font-size-lg)', fontWeight: 'var(--font-weight-semibold)', marginTop: 0 }}>
                Card with Shadow SM
              </h3>
              <p style={{ color: 'var(--color-text-secondary)', margin: 0 }}>
                Uses var(--color-surface) background, var(--color-border) border, and var(--shadow-sm)
              </p>
            </div>

            <div 
              className="p-6 rounded transition-all duration-200"
              style={{
                backgroundColor: 'var(--color-surface)',
                border: '1px solid var(--color-border)',
                boxShadow: 'var(--shadow-md)',
              }}
            >
              <h3 style={{ fontSize: 'var(--font-size-lg)', fontWeight: 'var(--font-weight-semibold)', marginTop: 0 }}>
                Card with Shadow MD
              </h3>
              <p style={{ color: 'var(--color-text-secondary)', margin: 0 }}>
                Uses var(--shadow-md) for more elevation
              </p>
            </div>

            <div 
              className="p-6 rounded transition-all duration-200"
              style={{
                backgroundColor: 'var(--color-surface)',
                border: '1px solid var(--color-border)',
                boxShadow: 'var(--shadow-lg)',
              }}
            >
              <h3 style={{ fontSize: 'var(--font-size-lg)', fontWeight: 'var(--font-weight-semibold)', marginTop: 0 }}>
                Card with Shadow LG
              </h3>
              <p style={{ color: 'var(--color-text-secondary)', margin: 0 }}>
                Uses var(--shadow-lg) for maximum elevation
              </p>
            </div>
          </div>
        </section>

        {/* Alerts/Notifications Section */}
        <section className="mb-12">
          <h2 
            className="mb-6"
            style={{
              fontSize: 'var(--font-size-xl)',
              fontWeight: 'var(--font-weight-semibold)',
              color: 'var(--color-text)',
              paddingBottom: '12px',
              borderBottom: '2px solid var(--color-border)',
            }}
          >
            Alerts & Notifications
          </h2>
          <div className="grid gap-4">
            
            <div 
              className="p-4 rounded flex items-start gap-3"
              style={{
                backgroundColor: 'var(--color-info-bg)',
                border: '1px solid var(--color-info)',
                color: 'var(--color-info)',
              }}
            >
              <Info size={20} />
              <div>
                <div style={{ fontWeight: 'var(--font-weight-semibold)' }}>Information</div>
                <div style={{ fontSize: 'var(--font-size-sm)', opacity: 0.9 }}>
                  Uses var(--color-info-bg) and var(--color-info)
                </div>
              </div>
            </div>

            <div 
              className="p-4 rounded flex items-start gap-3"
              style={{
                backgroundColor: 'var(--color-success-bg)',
                border: '1px solid var(--color-success)',
                color: 'var(--color-success)',
              }}
            >
              <Check size={20} />
              <div>
                <div style={{ fontWeight: 'var(--font-weight-semibold)' }}>Success</div>
                <div style={{ fontSize: 'var(--font-size-sm)', opacity: 0.9 }}>
                  Uses var(--color-success-bg) and var(--color-success)
                </div>
              </div>
            </div>

            <div 
              className="p-4 rounded flex items-start gap-3"
              style={{
                backgroundColor: 'var(--color-warning-bg)',
                border: '1px solid var(--color-warning)',
                color: 'var(--color-warning)',
              }}
            >
              <AlertCircle size={20} />
              <div>
                <div style={{ fontWeight: 'var(--font-weight-semibold)' }}>Warning</div>
                <div style={{ fontSize: 'var(--font-size-sm)', opacity: 0.9 }}>
                  Uses var(--color-warning-bg) and var(--color-warning)
                </div>
              </div>
            </div>

            <div 
              className="p-4 rounded flex items-start gap-3"
              style={{
                backgroundColor: 'var(--color-danger-bg)',
                border: '1px solid var(--color-danger)',
                color: 'var(--color-danger)',
              }}
            >
              <X size={20} />
              <div>
                <div style={{ fontWeight: 'var(--font-weight-semibold)' }}>Danger</div>
                <div style={{ fontSize: 'var(--font-size-sm)', opacity: 0.9 }}>
                  Uses var(--color-danger-bg) and var(--color-danger)
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Color Tokens */}
        <section className="mb-12">
          <h2 
            className="mb-6"
            style={{
              fontSize: 'var(--font-size-xl)',
              fontWeight: 'var(--font-weight-semibold)',
              color: 'var(--color-text)',
              paddingBottom: '12px',
              borderBottom: '2px solid var(--color-border)',
            }}
          >
            Color Tokens
          </h2>
          <div className="grid grid-cols-2 gap-4">
            {[
              { name: '--color-bg', label: 'Background' },
              { name: '--color-surface', label: 'Surface' },
              { name: '--color-text', label: 'Text' },
              { name: '--color-text-secondary', label: 'Text Secondary' },
              { name: '--color-border', label: 'Border' },
              { name: '--btn-primary-bg', label: 'Primary Button' },
              { name: '--color-success', label: 'Success' },
              { name: '--color-warning', label: 'Warning' },
              { name: '--color-danger', label: 'Danger' },
              { name: '--color-info', label: 'Info' },
              { name: '--focus-ring', label: 'Focus Ring' },
              { name: '--toolbar-bg', label: 'Toolbar BG' },
            ].map(({ name, label }) => (
              <div 
                key={name}
                className="flex items-center gap-3 p-3 rounded"
                style={{
                  backgroundColor: 'var(--color-surface)',
                  border: '1px solid var(--color-border)',
                }}
              >
                <div 
                  className="w-12 h-12 rounded"
                  style={{
                    backgroundColor: `var(${name})`,
                    border: '1px solid var(--color-border)',
                  }}
                />
                <div>
                  <div style={{ fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-medium)' }}>
                    {label}
                  </div>
                  <code style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-secondary)' }}>
                    {name}
                  </code>
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}