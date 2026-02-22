# CareConnect Desktop Application

A comprehensive desktop-optimized caregiver application built with React, featuring a fully tokenized design system, animated transitions, and extensive accessibility support.

## 🎯 Project Overview

CareConnect is a low-vision friendly desktop application designed to help caregivers manage care plans, medications, appointments, and stay connected with loved ones and healthcare providers. The application prioritizes accessibility, keyboard navigation, and visual clarity through a completely token-based design system.

## ✨ Key Features

### 🎨 100% Token-Based Design System
- **Zero hard-coded values** - all colors, sizes, shadows, and interactions use CSS variables
- **Three complete themes**: Default (Soft Blue Gray), High Contrast Dark, Low Glare Sepia
- **Instant theme switching** - change themes in real-time via View menu or Alt+T
- All tokens documented in `/CARECONNECT_TOKENS.md`

### 🖥️ Desktop-Optimized UI
- **Menu bar** with File, Edit, View, Tools, Help menus
- **Toolbar** with quick action icons
- **Status bar** showing connection status, sync time, zoom level, keyboard hints
- **Responsive layouts** for 1024px, 1440px, and 1920px widths
- Context menus with hover highlights

### ✨ Animated Welcome → Login Flow
- Beautiful hero welcome screen with family healthcare imagery
- Smooth parallax-style transition to login (500ms, respects reduced motion)
- Animated dashboard entrance
- All animations use design token durations

### ♿ Accessibility First
- **100% keyboard navigable** - every feature works without a mouse
- **Visible focus indicators** on all interactive elements (2px rings)
- **Screen reader compatible** - ARIA labels, semantic HTML
- **High contrast themes** - WCAG AAA compliant options
- **Zoom support** - tested up to 400% browser zoom
- **Reduced motion** - respects `prefers-reduced-motion` preference

### ⌨️ Comprehensive Keyboard Shortcuts
- **Tab/Shift+Tab** - Navigate between elements
- **Ctrl+S** - Save
- **Ctrl+N** - New care plan
- **Ctrl+/** - Show keyboard shortcuts reference
- **Ctrl++/Ctrl+-** - Zoom in/out
- **Alt+T** - Switch theme
- **F1** - Help documentation
- **Esc** - Go back / Close dialog

Full reference available in-app and at `/src/app/components/KeyboardShortcuts.tsx`

## 🚀 Getting Started

### Run the Application
```bash
npm install
npm run dev
```

### Switch Themes
1. In the app: Click **View** → **Theme** → Select your preference
2. Via keyboard: Alt+T (cycles through themes)
3. Programmatically: Add class to `<body>`: `.high-contrast` or `.sepia`

## 📁 Project Structure

```
/src/
├── styles/
│   └── theme.css                    # Complete token system (440+ lines)
│
├── app/
│   ├── App.tsx                      # Main app with theme switching & routing
│   │
│   └── components/
│       ├── WelcomeScreen.tsx        # Hero welcome screen
│       ├── LoginScreen.tsx          # Animated login with form
│       ├── Dashboard.tsx            # Main dashboard with stats & tasks
│       │
│       ├── MenuBar.tsx              # Desktop menu bar (File/Edit/View/Tools/Help)
│       ├── Toolbar.tsx              # Icon toolbar with quick actions
│       ├── StatusBar.tsx            # Bottom status bar
│       │
│       ├── ComponentLibrary.tsx    # Token showcase & examples
│       ├── KeyboardShortcuts.tsx   # Printable reference card
│       └── DialogExample.tsx       # Modal dialogs with focus management
│
├── CARECONNECT_TOKENS.md           # Complete token documentation
└── README.md                        # This file
```

## 🎨 Design Token Categories

### Color Tokens
- Surface & Background: `--color-bg`, `--color-surface`, `--color-panel`
- Text: `--color-text`, `--color-text-muted`
- Status: `--color-success`, `--color-warning`, `--color-error`, `--color-focus`

### Button Tokens (with mandatory hover states)
- Primary: `--btn-primary-bg`, `--btn-primary-hover-bg` ⚠️
- Secondary: `--btn-secondary-bg`, `--btn-secondary-hover-bg` ⚠️
- Destructive: `--btn-danger-bg`, `--btn-danger-hover-bg` ⚠️
- Disabled: `--btn-disabled-bg`

### Menu/Toolbar Tokens
- `--menu-bg`, `--menu-hover-bg`, `--menu-active-bg`
- `--toolbar-bg`, `--toolbar-hover-bg`
- `--context-bg`, `--context-hover-bg`

### Typography Tokens
- `--font-family` - System font stack
- `--font-size-section` (18px), `--font-size-body` (14px), `--font-size-label` (13px), `--font-size-small` (12px)

### Spacing Tokens
- `--space-1` through `--space-8` (4px to 64px)

### Interaction Tokens
- `--focus-ring-width`, `--focus-ring-color`, `--focus-ring-offset`
- `--transition-fast` (150ms), `--transition-medium` (300ms), `--transition-slow` (500ms)

**See `/CARECONNECT_TOKENS.md` for complete token reference**

## 🎭 Theme Variants

### Theme C: Soft Blue Gray High Contrast (Default)
- Light, professional appearance
- Primary color: Blue (#3b82f6)
- Best for general use

### Theme A: True Dark High Contrast
- Pure black background (#000000)
- Light blue accents (#60a5fa)
- WCAG AAA compliant
- Best for low vision, night use

### Theme B: Low Glare Sepia
- Warm beige tones (#f5f0e8)
- Brown accents (#a67c52)
- Reduced eye strain
- Best for dyslexia support, prolonged use

## 🧩 Component Examples

### ✅ Correct: Token-Based Button

```tsx
<button
  style={{
    backgroundColor: 'var(--btn-primary-bg)',
    color: 'var(--btn-primary-fg)',
    transition: 'var(--transition-fast)',
  }}
  onMouseEnter={(e) => {
    e.currentTarget.style.backgroundColor = 'var(--btn-primary-hover-bg)';
  }}
  onMouseLeave={(e) => {
    e.currentTarget.style.backgroundColor = 'var(--btn-primary-bg)';
  }}
  onFocus={(e) => {
    e.currentTarget.style.outline = `var(--focus-ring-width) solid var(--focus-ring-color)`;
    e.currentTarget.style.outlineOffset = 'var(--focus-ring-offset)';
  }}
>
  Click Me
</button>
```

### ❌ Incorrect: Hard-Coded Values
```tsx
// DON'T DO THIS!
<button style={{ backgroundColor: '#3b82f6', color: '#fff' }}>
  Click Me
</button>
```

## 📊 Dashboard Features

- **Stats Overview**: Active care plans, appointments, contacts, medications
- **Today's Schedule**: Time-based task list with priority indicators
- **Quick Actions**: Fast access to common tasks
- **Health Summary**: Progress bars for medication adherence and appointments
- All interactive with proper hover states and keyboard navigation

## 🔐 Login & Authentication

- Email and password inputs with proper labels
- Show/hide password toggle
- Visible focus states on all fields
- "Forgot password" link
- Back navigation via ESC key or visible button
- Tab order: Email → Password → Show/Hide → Forgot Password → Sign In

## 📱 Responsive Behavior

- **1024px**: Sidebar collapses, toolbar uses overflow menu
- **1440px**: Standard layout (recommended)
- **1920px**: Expanded with optional secondary panels

## 🎬 Animation Specifications

### Welcome → Login Transition
- **Duration**: 500ms (`var(--transition-medium)`)
- **Easing**: Cubic bezier [0.4, 0, 0.2, 1]
- **Effect**: Welcome slides left (-40%), Login slides in from right (+100%)
- **Accessibility**: Automatically disabled if user has `prefers-reduced-motion`

### Button Interactions
- **Duration**: 150ms (`var(--transition-fast)`)
- **Properties**: backgroundColor, color, transform
- **Requirement**: ALL buttons MUST change color on hover

## 🧪 Testing Checklist

- [x] All components use tokens exclusively
- [x] All buttons have visible hover states
- [x] All interactive elements show focus rings
- [x] Tab order is logical throughout
- [x] Esc key closes dialogs and goes back
- [x] Enter/Space activate focused elements
- [x] Works in all 3 themes
- [x] Zoom to 400% maintains layout
- [x] Screen reader announces all controls
- [x] Keyboard shortcuts don't conflict with browser/OS

## 🛠️ Tech Stack

- **React 18.3.1** - UI framework
- **Motion** - Smooth animations with reduced-motion support
- **Tailwind CSS v4** - Utility-first styling (enhanced with tokens)
- **Lucide React** - Icon system
- **TypeScript** - Type safety
- **Vite** - Build tool

## 📚 Documentation

- **Token System**: `/CARECONNECT_TOKENS.md` - Complete design token reference
- **Components**: `/src/app/components/ComponentLibrary.tsx` - Interactive examples
- **Keyboard Shortcuts**: `/src/app/components/KeyboardShortcuts.tsx` - Printable reference
- **README**: This file - Project overview

## 🎯 Design Principles

1. **Token-First**: Never hard-code visual properties
2. **Accessible by Default**: Every feature keyboard navigable
3. **Clear Feedback**: Visible hover and focus states on all interactive elements
4. **Consistent**: Same tokens = same behavior everywhere
5. **Themeable**: One class change updates entire app
6. **Low Vision Friendly**: High contrast options, large clickable areas

## 🔜 Future Enhancements

- [ ] User-customizable token overrides (e.g., "Make text 20% larger")
- [ ] Additional themes (blue-light filter, warm/cool variants)
- [ ] Font size scaling presets (125%, 150%, 200%)
- [ ] Print-optimized stylesheets
- [ ] Offline mode support
- [ ] Multi-language support

## 💡 Tips for Developers

### Adding New Components
1. ✅ Use tokens exclusively - no hard-coded values
2. ✅ Add hover states with color changes (mandatory for buttons)
3. ✅ Add visible focus states with rings
4. ✅ Support keyboard navigation (Tab, Enter, Space, Esc)
5. ✅ Test in all 3 themes
6. ✅ Include ARIA labels for complex components
7. ✅ Document new keyboard shortcuts

### Theme Switching Logic
```tsx
// In your component
useEffect(() => {
  document.body.className = ''; // Reset
  if (theme === 'high-contrast') {
    document.body.classList.add('high-contrast');
  } else if (theme === 'sepia') {
    document.body.classList.add('sepia');
  }
}, [theme]);
```

## 🙏 Accessibility Standards

- WCAG 2.1 Level AA minimum
- WCAG 2.1 Level AAA for high contrast theme
- Focus visible on all interactive elements
- Semantic HTML throughout
- ARIA labels on complex widgets
- Keyboard navigation required for all features
- Screen reader testing with NVDA, JAWS, VoiceOver

## 📝 License

This is a demonstration project for a desktop caregiver application with comprehensive token-based design system.

---

**Press F1 in the application for help, or Ctrl+/ for keyboard shortcuts reference.**
