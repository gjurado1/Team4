# CareConnect Desktop - Token-Based Design System

## Overview

CareConnect is a desktop-optimized caregiver application built with React and a comprehensive token-based design system. **All styling uses CSS variables (design tokens) - no hard-coded colors, sizes, or interactive states.**

## Core Design Principles

1. **100% Token-Based**: Every color, shadow, radius, spacing, typography, and interaction property references a CSS variable
2. **Theme-Ready**: Three complete themes with full token mapping
3. **Accessibility First**: Visible focus states, keyboard navigation, screen reader support
4. **Desktop Optimized**: Menu bars, toolbars, status bars, keyboard shortcuts

---

## Token Categories

### Color Tokens

#### Surface & Background
- `--color-bg` - Application background
- `--color-surface` - Primary surface (cards, panels)
- `--color-panel` - Nested/secondary panels
- `--color-border` - Borders and dividers

#### Text
- `--color-text` - Primary text
- `--color-text-muted` - Secondary/muted text

#### Status Colors
- `--color-focus` - Focus rings, primary actions
- `--color-success` - Success states
- `--color-warning` - Warning states
- `--color-error` - Error states

---

### Button Tokens

#### Primary Button
- `--btn-primary-bg` - Default background
- `--btn-primary-fg` - Default text color
- `--btn-primary-hover-bg` - Hover background ⚠️ **MUST CHANGE on hover**
- `--btn-primary-hover-fg` - Hover text color
- `--btn-primary-active-bg` - Active/pressed state

#### Secondary Button
- `--btn-secondary-bg`
- `--btn-secondary-fg`
- `--btn-secondary-hover-bg` ⚠️ **MUST CHANGE on hover**
- `--btn-secondary-hover-fg`

#### Destructive Button
- `--btn-danger-bg`
- `--btn-danger-fg`
- `--btn-danger-hover-bg` ⚠️ **MUST CHANGE on hover**
- `--btn-danger-hover-fg`

#### Disabled State
- `--btn-disabled-bg`
- `--btn-disabled-fg`

---

### Menu/Toolbar Tokens

#### Menu Bar
- `--menu-bg` - Menu bar background
- `--menu-hover-bg` - Menu item hover
- `--menu-active-bg` - Active menu item
- `--menu-text` - Menu text color
- `--menu-border` - Menu borders

#### Toolbar
- `--toolbar-bg`
- `--toolbar-hover-bg`
- `--toolbar-border`

#### Context Menu
- `--context-bg`
- `--context-hover-bg`
- `--context-border`

---

### Typography Tokens

- `--font-family` - System font stack
- `--font-size-window-title` - 14px (window chrome)
- `--font-size-section` - 18px (section headings)
- `--font-size-body` - 14px (standard body text)
- `--font-size-label` - 13px (form labels)
- `--font-size-small` - 12px (captions, hints)
- `--line-height-base` - 1.5
- `--line-height-tight` - 1.3

---

### Spacing Tokens

- `--space-1` - 4px
- `--space-2` - 8px
- `--space-3` - 12px
- `--space-4` - 16px
- `--space-5` - 24px
- `--space-6` - 32px
- `--space-7` - 48px
- `--space-8` - 64px

---

### Radius Tokens

- `--radius-sm` - 4px
- `--radius-md` - 6px
- `--radius-lg` - 8px
- `--radius-xl` - 12px

---

### Elevation/Shadow Tokens

- `--shadow-sm` - Subtle elevation
- `--shadow-panel` - Standard card/panel
- `--shadow-dropdown` - Dropdown menus
- `--shadow-modal` - Modal dialogs
- `--shadow-lg` - Large elevation

---

### Interaction Tokens

- `--focus-ring-width` - 2px
- `--focus-ring-offset` - 2px
- `--focus-ring-color` - Focus ring color
- `--transition-fast` - 150ms ease-in-out
- `--transition-medium` - 300ms ease-in-out
- `--transition-slow` - 500ms ease-in-out

---

### Input Tokens

- `--input-bg` - Input field background
- `--input-border` - Default border
- `--input-border-focus` - Focus border
- `--input-text` - Input text color
- `--input-placeholder` - Placeholder text

---

### Status Bar Tokens

- `--status-bg`
- `--status-border`
- `--status-text`

---

### Hero/Welcome Tokens

- `--hero-overlay-bg` - Welcome screen overlay
- `--hero-overlay-border` - Welcome panel border

---

## Theme Variants

### Theme C: Soft Blue Gray High Contrast (Default)
- **Use Case**: General use, balanced contrast
- **Background**: Light blue-gray (#f5f7fa)
- **Primary**: Blue (#3b82f6)
- **Activation**: Default (no class needed)

### Theme A: True Dark High Contrast
- **Use Case**: Low vision, night use, WCAG AAA compliance
- **Background**: Pure black (#000000)
- **Primary**: Light blue (#60a5fa)
- **Activation**: Add `.high-contrast` class to `<body>`

### Theme B: Low Glare Sepia
- **Use Case**: Reduced eye strain, dyslexia support
- **Background**: Warm beige (#f5f0e8)
- **Primary**: Brown (#a67c52)
- **Activation**: Add `.sepia` class to `<body>`

---

## Usage Examples

### ✅ Correct: Token-Based Button

```jsx
<button
  style={{
    backgroundColor: 'var(--btn-primary-bg)',
    color: 'var(--btn-primary-fg)',
    fontSize: 'var(--font-size-body)',
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
  Click Me
</button>
```

### ❌ Incorrect: Hard-Coded Values

```jsx
// DON'T DO THIS!
<button
  style={{
    backgroundColor: '#3b82f6',  // ❌ Hard-coded color
    color: '#ffffff',            // ❌ Hard-coded color
    fontSize: '14px',            // ❌ Hard-coded size
  }}
  onMouseEnter={(e) => {
    e.currentTarget.style.backgroundColor = '#2563eb'; // ❌ Hard-coded hover
  }}
>
  Click Me
</button>
```

---

## Interactive State Requirements

### All Buttons MUST:
1. Change `backgroundColor` on hover (using hover tokens)
2. Show visible focus ring (using focus tokens)
3. Support keyboard navigation (Tab, Enter, Space)
4. Use transition tokens for smooth state changes

### All Inputs MUST:
1. Change border color on focus
2. Show visible focus ring
3. Support keyboard navigation
4. Include accessible labels

---

## Keyboard Shortcuts

### Navigation
- `Tab` / `Shift+Tab` - Move between focusable elements
- `Enter` - Activate focused element
- `Esc` - Go back / Close dialog
- `Space` - Toggle / Select

### File Operations
- `Ctrl+N` - New care plan
- `Ctrl+S` - Save
- `Ctrl+O` - Open

### View
- `Ctrl++` / `Ctrl+-` - Zoom in/out
- `Ctrl+0` - Reset zoom
- `Alt+T` - Switch theme

### Help
- `F1` - Help documentation
- `Ctrl+/` - Show keyboard shortcuts

**Note**: On macOS, use `Cmd ⌘` instead of `Ctrl`

---

## Accessibility Features

### Keyboard Navigation
- ✅ 100% keyboard accessible - all features work without a mouse
- ✅ Visible focus indicators on all interactive elements
- ✅ Logical tab order
- ✅ Skip to main content links

### Screen Readers
- ✅ ARIA labels on all complex components
- ✅ Semantic HTML structure
- ✅ Form labels properly associated
- ✅ Status messages announced

### Visual Accessibility
- ✅ High contrast themes (WCAG AAA)
- ✅ Supports browser zoom to 400%
- ✅ No color-only information
- ✅ Focus ring width: 2px minimum

### Motion
- ✅ Respects `prefers-reduced-motion`
- ✅ Animations use token durations
- ✅ Can disable animations in settings

---

## Component Library

See `/src/app/components/ComponentLibrary.tsx` for:
- Button states (primary, secondary, destructive, disabled)
- Input fields (text, password, search, error)
- Panels and cards
- Typography scale
- Status indicators

---

## File Structure

```
/src/
├── styles/
│   └── theme.css          # Complete token system (3 themes)
├── app/
│   ├── App.tsx            # Main app with theme switching
│   └── components/
│       ├── WelcomeScreen.tsx      # Hero welcome screen
│       ├── LoginScreen.tsx        # Animated login
│       ├── Dashboard.tsx          # Main dashboard
│       ├── MenuBar.tsx            # Desktop menu bar
│       ├── Toolbar.tsx            # Icon toolbar
│       ├── StatusBar.tsx          # Bottom status bar
│       ├── ComponentLibrary.tsx   # Token showcase
│       └── KeyboardShortcuts.tsx  # Printable reference
```

---

## Animation Specifications

### Welcome → Login Transition
- **Duration**: 500ms (var(--transition-medium))
- **Easing**: Cubic bezier [0.4, 0, 0.2, 1]
- **Motion**: Welcome slides left (-40%), Login slides in from right (+100%)
- **Accessibility**: Respects `prefers-reduced-motion`

### Button Hover
- **Duration**: 150ms (var(--transition-fast))
- **Properties**: backgroundColor, color, transform

---

## Design System Benefits

1. **Instant Theme Switching**: Change one class, entire app updates
2. **Consistent Experience**: All components use same token values
3. **Easy Maintenance**: Update token once, affects all components
4. **Accessibility**: Built-in high contrast and low glare options
5. **Low Vision Support**: Large clickable areas, clear focus states
6. **Customizable**: Users can override tokens for personal needs

---

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

---

## Future Enhancements

- [ ] User-customizable token overrides
- [ ] Additional theme variants (blue-light filter, warm/cool)
- [ ] Font size scaling (125%, 150%, 200%)
- [ ] Token-based spacing presets
- [ ] Print stylesheet with tokens

---

## Contributing

When adding new components:

1. ✅ Use tokens exclusively - no hard-coded values
2. ✅ Add hover states with color changes
3. ✅ Add visible focus states
4. ✅ Support keyboard navigation
5. ✅ Test in all 3 themes
6. ✅ Include ARIA labels
7. ✅ Document keyboard shortcuts

---

## Questions?

Press `F1` in the app for help or `Ctrl+/` for keyboard shortcuts reference.
