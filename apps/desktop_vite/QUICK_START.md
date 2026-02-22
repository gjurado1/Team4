# CareConnect - Quick Start Guide

## 🚀 First Run

```bash
npm install
npm run dev
```

The application will open to the **Welcome Screen**.

## 🎯 Navigation Flow

### 1. Welcome Screen (Hero)
- Beautiful family healthcare background image
- Large "CareConnect" title
- Primary call-to-action: "Let's Get Started"
- **Press Tab** to focus the button, **Enter** to proceed

### 2. Animated Transition
- Watch the smooth slide animation (500ms)
- Welcome screen slides left
- Login screen slides in from right
- Respects your `prefers-reduced-motion` setting

### 3. Login Screen
- Email and password fields
- Show/hide password toggle
- "Back" button returns to welcome (or press **Esc**)
- Press **Enter** to log in (demo - any credentials work)

### 4. Dashboard
- Full desktop interface appears:
  - **Menu Bar** at top (File, Edit, View, Tools, Help)
  - **Toolbar** with icon buttons
  - **Main Content** with stats and schedule
  - **Status Bar** at bottom

## ⌨️ Essential Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| **Tab** | Navigate forward |
| **Shift+Tab** | Navigate backward |
| **Enter** | Activate focused element |
| **Esc** | Go back / Close dialog |
| **Alt+T** | Open theme switcher |
| **F1** | Help (placeholder) |
| **Ctrl+/** | Keyboard shortcuts (placeholder) |

## 🎨 Try the Themes

### Method 1: Menu Bar
1. Click **View** → **Theme**
2. Choose from:
   - Default (Soft Blue)
   - High Contrast Dark
   - Low Glare Sepia

### Method 2: Keyboard
1. Press **Alt+T**
2. Theme switcher panel appears
3. Arrow keys + Enter to select
4. Or press **Alt+T** repeatedly to cycle

### Method 3: Direct Class
Add to `<body>` element:
- `.high-contrast` - Dark theme
- `.sepia` - Sepia theme
- Remove class for default

## 🧩 Component Showcase

The application includes several hidden demo pages:

### Component Library (not in main flow)
See `/src/app/components/ComponentLibrary.tsx`
- All button states (primary, secondary, destructive, disabled)
- Input fields (text, password, search, error)
- Panels and cards
- Typography scale
- Status colors

### Dialog Examples (not in main flow)
See `/src/app/components/DialogExample.tsx`
- Confirmation dialog
- Destructive dialog (delete warning)
- Preferences dialog
- Focus management and keyboard navigation

### Keyboard Shortcuts Reference (not in main flow)
See `/src/app/components/KeyboardShortcuts.tsx`
- Complete shortcut reference
- Accessibility notes
- Printable reference card

## 🎭 Theme Comparison

### Default (Soft Blue Gray)
- **Background**: Light blue-gray (#f5f7fa)
- **Primary**: Blue (#3b82f6)
- **Use**: General use, professional appearance
- **Contrast**: WCAG AA

### High Contrast Dark
- **Background**: Pure black (#000000)
- **Primary**: Light blue (#60a5fa)
- **Use**: Low vision, night use, high contrast preference
- **Contrast**: WCAG AAA

### Low Glare Sepia
- **Background**: Warm beige (#f5f0e8)
- **Primary**: Brown (#a67c52)
- **Use**: Reduced eye strain, dyslexia support, prolonged use
- **Contrast**: WCAG AA

## ✅ What to Test

### Accessibility Features
1. **Keyboard Navigation**
   - Can you reach every button with Tab?
   - Do you see visible focus rings?
   - Does Enter/Space activate buttons?

2. **Theme Switching**
   - Try all 3 themes
   - Notice how ALL colors update instantly
   - Check button hover states in each theme

3. **Animations**
   - Watch Welcome → Login transition
   - Notice button hover effects
   - Try enabling "Reduce Motion" in your OS

4. **Screen Reader** (optional)
   - Enable your screen reader (NVDA, JAWS, VoiceOver)
   - Navigate with keyboard
   - Listen for ARIA labels and announcements

### Design Token Verification
1. Open DevTools
2. Inspect any button
3. Notice styles like: `backgroundColor: var(--btn-primary-bg)`
4. Change theme - see CSS variables update
5. **No hard-coded colors anywhere!**

## 🔍 Code Highlights

### Token Usage Example
```tsx
// ✅ CORRECT - All components use this pattern
<button
  style={{
    backgroundColor: 'var(--btn-primary-bg)',
    color: 'var(--btn-primary-fg)',
  }}
  onMouseEnter={(e) => {
    e.currentTarget.style.backgroundColor = 'var(--btn-primary-hover-bg)';
  }}
  onMouseLeave={(e) => {
    e.currentTarget.style.backgroundColor = 'var(--btn-primary-bg)';
  }}
>
  Click Me
</button>
```

### Focus Ring Example
```tsx
onFocus={(e) => {
  e.currentTarget.style.outline = `var(--focus-ring-width) solid var(--focus-ring-color)`;
  e.currentTarget.style.outlineOffset = 'var(--focus-ring-offset)';
}}
onBlur={(e) => {
  e.currentTarget.style.outline = 'none';
}}
```

## 📊 Main Dashboard Features

### Stats Overview (Top Row)
- Active Care Plans: 3
- This Week Appointments: 5
- Care Contacts: 12
- Medications: 8

### Today's Schedule
- Time-based task list
- Medication and appointment icons
- Priority indicators (high priority = red)
- Hover effects on each task

### Quick Actions (Right Sidebar)
- Add Medication
- Schedule Appointment
- Update Care Plan
- Contact Provider

### Health Summary
- Medication Adherence: 92% (progress bar)
- Appointment Completion: 100% (progress bar)

## 🎯 Feature Checklist

- [x] Fully token-based (zero hard-coded values)
- [x] Three complete themes
- [x] Animated welcome → login flow
- [x] Desktop menu bar with dropdowns
- [x] Toolbar with icon buttons
- [x] Status bar with info
- [x] Dashboard with real data
- [x] All buttons change color on hover
- [x] Visible focus rings (2px blue)
- [x] Keyboard navigation throughout
- [x] ESC key support
- [x] Tab order is logical
- [x] ARIA labels present
- [x] Reduced motion support
- [x] Screen reader friendly

## 🐛 Troubleshooting

### Theme not changing?
- Check browser console for errors
- Make sure class is being applied to `<body>`
- Try hard refresh (Ctrl+Shift+R)

### Focus rings not showing?
- Press Tab (don't click with mouse)
- Focus rings only appear on keyboard navigation
- Check if browser is overriding outline styles

### Animation not smooth?
- Check if "Reduce Motion" is enabled in OS
- Animations automatically disable with this setting
- Try different browser

## 📚 Documentation

- **Full Token Reference**: `/CARECONNECT_TOKENS.md`
- **Project README**: `/README.md`
- **This Guide**: `/QUICK_START.md`

## 💡 Pro Tips

1. **Use keyboard to explore** - Tab through everything
2. **Try all three themes** - See how tokens make it effortless
3. **Inspect the code** - Notice var() everywhere
4. **Check hover states** - Every button responds
5. **Test zoom** - Browser zoom to 200-400% works perfectly

## 🎓 Learning Points

### Why Tokens?
- **One source of truth** - Change a token, update everywhere
- **Theme switching** - Change body class, entire app updates
- **Consistency** - Same token = same value everywhere
- **Maintainability** - Easy to update design system

### Why Desktop UI?
- **Menu bars** - Familiar desktop pattern
- **Toolbars** - Quick access to common actions
- **Status bars** - System information and hints
- **Keyboard shortcuts** - Power user efficiency

### Why Accessibility?
- **Inclusive** - Works for everyone, including low vision
- **Legal requirement** - WCAG compliance
- **Better UX** - Keyboard navigation benefits all users
- **Right thing to do** - Technology should be accessible

---

**Ready to explore? Run `npm run dev` and press Tab to start your journey!** 🚀
