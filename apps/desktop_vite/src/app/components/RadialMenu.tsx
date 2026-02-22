import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Users, Pill, Calendar, Settings, HelpCircle, Menu, X, LayoutDashboard, Mail, HeartPulse, FileText, BookOpen, Palette, Eye } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router';
import { useUser } from '../contexts/UserContext';

const OPEN_MENU_NAV_IN_NEW_TAB_KEY = 'careconnect-menu-navigation-new-tab';

interface MenuButton {
  id: string;
  label: string;
  icon: React.ElementType;
  path: string;
  angle: number;
  role?: 'caregiver' | 'patient' | 'both';
}

export function RadialMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { userRole } = useUser();
  const constraintsRef = useRef<HTMLDivElement>(null);
  
  // Load saved position from localStorage or use default
  const getSavedPosition = () => {
    const saved = localStorage.getItem('radialMenuPosition');
    if (saved) {
      return JSON.parse(saved);
    }
    // Default position (bottom-right with some padding)
    return { 
      x: window.innerWidth - 120, 
      y: window.innerHeight - 120 
    };
  };

  const [position, setPosition] = useState(getSavedPosition);

  // Save position to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('radialMenuPosition', JSON.stringify(position));
  }, [position]);

  // Update position on window resize to keep button visible
  useEffect(() => {
    const handleResize = () => {
      setPosition((prev) => ({
        x: Math.min(Math.max(60, prev.x), window.innerWidth - 60),
        y: Math.min(Math.max(60, prev.y), window.innerHeight - 60),
      }));
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Role-specific menus
  const menuButtons = useMemo<MenuButton[]>(() => {
    if (userRole === 'patient') {
      return [
        { id: 'patient-overview', label: 'Home', icon: LayoutDashboard, path: '/dashboard/patient-overview', angle: 0 },
        { id: 'my-care', label: 'My Care', icon: FileText, path: '/dashboard/my-care', angle: 51.43 },
        { id: 'my-medications', label: 'Medications', icon: Pill, path: '/dashboard/my-medications', angle: 102.86 },
        { id: 'my-appointments', label: 'Appointments', icon: Calendar, path: '/dashboard/my-appointments', angle: 154.29 },
        { id: 'health-journal', label: 'Health Journal', icon: BookOpen, path: '/dashboard/health-journal', angle: 205.71 },
        { id: 'email', label: 'Messages', icon: Mail, path: '/dashboard/email', angle: 257.14 },
        { id: 'settings', label: 'Settings', icon: Settings, path: '/dashboard/settings', angle: 308.57 },
      ];
    } else {
      // Caregiver menu
      return [
        { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, path: '/dashboard', angle: 0 },
        { id: 'patients', label: 'Patients', icon: Users, path: '/dashboard/patients', angle: 51.43 },
        { id: 'email', label: 'Email', icon: Mail, path: '/dashboard/email', angle: 102.86 },
        { id: 'medications', label: 'Medications', icon: Pill, path: '/dashboard/medications', angle: 154.29 },
        { id: 'appointments', label: 'Appointments', icon: Calendar, path: '/dashboard/appointments', angle: 205.71 },
        { id: 'settings', label: 'Settings', icon: Settings, path: '/dashboard/settings', angle: 257.14 },
        { id: 'help', label: 'Help', icon: HelpCircle, path: '/dashboard/help', angle: 308.57 },
      ];
    }
  }, [userRole]);

  const handleMenuClick = (path: string, event?: React.MouseEvent) => {
    const openInNewTabByDefault = localStorage.getItem(OPEN_MENU_NAV_IN_NEW_TAB_KEY) === 'true';
    const openInNewTabWithModifier = Boolean(event && (event.ctrlKey || event.metaKey));

    // Setting applies specifically to radial menu navigation.
    if (openInNewTabByDefault || openInNewTabWithModifier) {
      if ((window as any).tabManager) {
        (window as any).tabManager.openNewTab(path);
      }
    } else {
      navigate(path);
    }
    setIsOpen(false);
  };

  const handleClick = () => {
    // Only toggle if not dragging
    if (!isDragging) {
      setIsOpen(!isOpen);
    }
  };

  const handleDragStart = () => {
    setIsDragging(true);
  };

  const handleDrag = (event: any, info: any) => {
    // Update position in real-time during drag
    setPosition({
      x: info.point.x,
      y: info.point.y,
    });
  };

  const handleDragEnd = () => {
    // Small delay to prevent click from firing
    setTimeout(() => {
      setIsDragging(false);
    }, 100);
  };

  // Use CSS variable for scaling - multiply base values by scale
  const getScaledValue = (baseValue: number) => {
    const scale = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--radial-menu-scale') || '1');
    return baseValue * scale;
  };

  const radius = getScaledValue(140); // Distance from center button
  const buttonSize = getScaledValue(64); // 64px = w-16 h-16
  const centerButtonSize = getScaledValue(80); // 80px = w-20 h-20
  const iconSize = getScaledValue(24);

  return (
    <>
      {/* Full-screen drag constraints */}
      <div 
        ref={constraintsRef} 
        className="fixed inset-0 pointer-events-none" 
        style={{ zIndex: -1 }}
      />

      {/* Draggable container */}
      <motion.div 
        className="fixed z-50 pointer-events-auto"
        id="radial-menu"
        role="navigation"
        aria-label="Radial navigation menu"
        style={{
          left: 0,
          top: 0,
          x: position.x,
          y: position.y,
          width: 0,
          height: 0,
        }}
        drag
        dragMomentum={false}
        dragElastic={0}
        dragConstraints={constraintsRef}
        onDragStart={handleDragStart}
        onDrag={handleDrag}
        onDragEnd={handleDragEnd}
      >
        {/* Menu Buttons */}
        <AnimatePresence>
          {isOpen && menuButtons.map((button, index) => {
            const Icon = button.icon;
            const angleRad = (button.angle * Math.PI) / 180;
            const x = Math.cos(angleRad) * radius;
            const y = Math.sin(angleRad) * radius;
            const isActive = location.pathname === button.path;

            return (
              <motion.div
                key={button.id}
                initial={{ scale: 0, x: 0, y: 0, opacity: 0 }}
                animate={{ 
                  scale: 1, 
                  x, 
                  y, 
                  opacity: 1,
                  transition: { 
                    delay: index * 0.05,
                    duration: 0.3,
                    ease: [0.4, 0, 0.2, 1]
                  }
                }}
                exit={{ 
                  scale: 0, 
                  x: 0, 
                  y: 0, 
                  opacity: 0,
                  transition: { 
                    delay: (menuButtons.length - index) * 0.03,
                    duration: 0.2
                  }
                }}
                className="absolute"
                style={{
                  left: `${-buttonSize / 2}px`,
                  top: `${-buttonSize / 2}px`,
                }}
              >
                <div className="relative flex flex-col items-center">
                  {/* Menu Button */}
                  <button
                    onClick={(e) => handleMenuClick(button.path, e)}
                    className="rounded-full flex items-center justify-center transition-all outline-none"
                    style={{
                      width: `${buttonSize}px`,
                      height: `${buttonSize}px`,
                      backgroundColor: isActive ? 'var(--btn-primary-bg)' : 'var(--color-surface)',
                      border: `2px solid ${isActive ? 'var(--btn-primary-bg)' : 'var(--color-border)'}`,
                      color: isActive ? 'var(--btn-primary-fg)' : 'var(--color-text)',
                      boxShadow: 'var(--shadow-panel)',
                      transition: 'var(--transition-medium)',
                    }}
                    onMouseEnter={(e) => {
                      if (!isActive) {
                        e.currentTarget.style.backgroundColor = 'var(--btn-secondary-hover-bg)';
                        e.currentTarget.style.borderColor = 'var(--color-focus)';
                        e.currentTarget.style.transform = 'scale(1.1)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive) {
                        e.currentTarget.style.backgroundColor = 'var(--color-surface)';
                        e.currentTarget.style.borderColor = 'var(--color-border)';
                        e.currentTarget.style.transform = 'scale(1)';
                      }
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.outline = `var(--focus-ring-width) solid var(--focus-ring-color)`;
                      e.currentTarget.style.outlineOffset = 'var(--focus-ring-offset)';
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.outline = 'none';
                    }}
                    aria-label={button.label}
                  >
                    <Icon size={iconSize} />
                  </button>

                  {/* Label below button */}
                  <motion.div
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 + 0.15 }}
                    className="mt-2 px-2.5 py-1 rounded-md whitespace-nowrap"
                    style={{
                      backgroundColor: 'var(--color-surface)',
                      border: '1px solid var(--color-border)',
                      boxShadow: 'var(--shadow-sm)',
                      fontSize: 'var(--font-size-small)',
                      fontWeight: '500',
                      color: 'var(--color-text)',
                      pointerEvents: 'none',
                    }}
                  >
                    {button.label}
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>

        {/* Center Menu Toggle Button */}
        <motion.button
          onClick={handleClick}
          className="absolute rounded-full flex items-center justify-center outline-none"
          style={{
            width: `${centerButtonSize}px`,
            height: `${centerButtonSize}px`,
            backgroundColor: 'var(--btn-primary-bg)',
            color: 'var(--btn-primary-fg)',
            boxShadow: 'var(--shadow-modal)',
            transition: 'var(--transition-medium)',
            cursor: isDragging ? 'grabbing' : 'grab',
            left: `${-centerButtonSize / 2}px`,
            top: `${-centerButtonSize / 2}px`,
          }}
          whileHover={{ scale: isDragging ? 1 : 1.1 }}
          whileTap={{ scale: 0.95 }}
          onMouseEnter={(e) => {
            if (!isDragging) {
              e.currentTarget.style.backgroundColor = 'var(--btn-primary-hover-bg)';
              e.currentTarget.style.color = 'var(--btn-primary-hover-fg)';
            }
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
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isOpen}
        >
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <X size={32} />
              </motion.div>
            ) : (
              <motion.div
                key="menu"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="flex flex-col items-center"
              >
                <Menu size={28} />
                <span 
                  className="text-xs mt-0.5"
                  style={{
                    fontSize: '10px',
                    fontWeight: '600',
                  }}
                >
                  MENU
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </motion.div>

      {/* Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 z-40"
            style={{
              backgroundColor: 'rgba(0, 0, 0, 0.3)',
              backdropFilter: 'blur(2px)',
            }}
          />
        )}
      </AnimatePresence>
    </>
  );
}
