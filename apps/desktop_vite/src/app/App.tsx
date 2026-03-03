import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { RouterProvider } from 'react-router';
import { WelcomeScreen } from './components/WelcomeScreen';
import { LoginScreen } from './components/LoginScreen';
import { RoleSelection } from './components/RoleSelection';
import { ThemeSwitcher } from './components/ThemeSwitcher';
import { UserProvider, UserRole, useUser } from './contexts/UserContext';
import { createAppRouter } from './routes';
import heroImage from '@/assets/ff29eb30ec23b7646b7d57afe7021fa5bb83de73.png';

declare global {
  interface Window {
    electronAPI?: {
      openFile: () => Promise<{ canceled: boolean; filePath?: string; content?: string }>;
      saveFile: (content: string) => Promise<{ canceled: boolean; filePath?: string }>;
      notify: (title: string, body: string) => Promise<{ shown: boolean }>;
      onMenuCommand: (callback: (command: string) => void) => () => void;
    };
  }
}

type Screen = 'welcome' | 'login' | 'roleselection' | 'dashboard';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('welcome');
  const [theme, setTheme] = useState<'medical' | 'warm' | 'dark'>('warm');
  const [showThemeSwitcher, setShowThemeSwitcher] = useState(false);
  const [userRole, setUserRole] = useState<UserRole>('caregiver');
  const [userName, setUserName] = useState<string>('');
  const [allowedRoles, setAllowedRoles] = useState<UserRole[]>(['caregiver', 'patient']);

  // Apply theme class to document body
  useEffect(() => {
    document.body.className = '';
    if (theme === 'medical') {
      document.body.classList.add('medical');
    } else if (theme === 'warm') {
      document.body.classList.add('warm');
    } else if (theme === 'dark') {
      document.body.classList.add('dark');
    }
  }, [theme]);

  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme as 'medical' | 'warm' | 'dark');
    setShowThemeSwitcher(false);
  };

  const cycleTheme = () => {
    setTheme((current) => {
      if (current === 'warm') return 'medical';
      if (current === 'medical') return 'dark';
      return 'warm';
    });
  };

  const handleGetStarted = () => {
    setCurrentScreen('login');
  };

  const handleBack = () => {
    setCurrentScreen('welcome');
  };

  const handleLogin = (roles: UserRole[]) => {
    setAllowedRoles(roles.length > 0 ? roles : ['caregiver', 'patient']);
    setCurrentScreen('roleselection');
  };

  const handleRoleSelection = (role: UserRole, name: string) => {
    setUserRole(role);
    setUserName(name);
    setCurrentScreen('dashboard');
  };

  const handleLogout = () => {
    // Clear any stored authentication data
    localStorage.removeItem('careconnect-tabs');
    localStorage.removeItem('careconnect-active-tab');
    // Return to login screen
    setCurrentScreen('login');
  };

  // Create router with theme props
  const router = useMemo(
    () => createAppRouter(handleThemeChange, theme, handleLogout),
    [theme]
  );

  useEffect(() => {
    if (!window.electronAPI?.onMenuCommand) return;

    const ensureDashboard = () => {
      setCurrentScreen('dashboard');
    };

    const unsubscribe = window.electronAPI.onMenuCommand(async (command) => {
      switch (command) {
        case 'file:new-care-plan':
          ensureDashboard();
          await router.navigate('/dashboard/medications');
          break;
        case 'file:open': {
          const result = await window.electronAPI?.openFile();
          if (!result?.canceled) {
            await window.electronAPI?.notify('Opened file', result?.filePath ?? 'File loaded');
          }
          break;
        }
        case 'file:save': {
          const payload = JSON.stringify({ theme, userRole, userName }, null, 2);
          const result = await window.electronAPI?.saveFile(payload);
          if (!result?.canceled) {
            await window.electronAPI?.notify('Saved file', result?.filePath ?? 'Saved');
          }
          break;
        }
        case 'app:logout':
          handleLogout();
          break;
        case 'view:settings':
          ensureDashboard();
          await router.navigate('/dashboard/settings');
          break;
        case 'help:docs':
          ensureDashboard();
          await router.navigate('/dashboard/help');
          break;
        case 'help:shortcuts':
          ensureDashboard();
          await router.navigate('/dashboard/shortcuts');
          break;
        case 'help:about':
          await window.electronAPI?.notify('CareConnect Desktop', 'Electron desktop application');
          break;
        default:
          break;
      }
    });

    return () => unsubscribe();
  }, [router, theme, userRole, userName]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // ESC to go back
      if (e.key === 'Escape') {
        if (showThemeSwitcher) {
          setShowThemeSwitcher(false);
        } else if (currentScreen === 'login') {
          setCurrentScreen('welcome');
        }
      }

      // Alt+T cycles themes and shows temporary theme notice
      if (e.altKey && e.key === 't') {
        e.preventDefault();
        cycleTheme();
        setShowThemeSwitcher(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentScreen, showThemeSwitcher]);

  useEffect(() => {
    if (!showThemeSwitcher) return;
    const timer = window.setTimeout(() => {
      setShowThemeSwitcher(false);
    }, 6000);
    return () => window.clearTimeout(timer);
  }, [showThemeSwitcher, theme]);

  // Welcome and Login screens (full window)
  if (currentScreen === 'welcome' || currentScreen === 'login') {
    return (
      <main 
        className="w-screen h-screen overflow-hidden relative"
        style={{
          fontFamily: 'var(--font-family)',
        }}
        aria-label="Authentication"
      >
        {/* Background Image - Always visible */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${heroImage})`,
          }}
        />

        {/* Content Container */}
        <div className="relative w-full h-full flex">
          <AnimatePresence mode="sync">
            {currentScreen === 'welcome' && (
              <motion.div
                key="welcome"
                initial={{ width: '100%' }}
                animate={{ width: '100%' }}
                exit={{ 
                  width: '50%',
                  transition: { 
                    duration: 0.6,
                    ease: [0.4, 0, 0.2, 1]
                  }
                }}
                className="h-full"
              >
                <WelcomeScreen onGetStarted={handleGetStarted} />
              </motion.div>
            )}

            {currentScreen === 'login' && (
              <>
                {/* Left side - scaled down welcome */}
                <motion.div
                  key="welcome-left"
                  initial={{ width: '50%', opacity: 1 }}
                  animate={{ width: '50%', opacity: 1 }}
                  exit={{ 
                    width: 0,
                    opacity: 0,
                    transition: { 
                      duration: 0.4,
                      ease: [0.4, 0, 0.2, 1]
                    }
                  }}
                  className="h-full overflow-hidden"
                >
                  <div className="h-full flex items-center justify-center p-4">
                    <motion.div 
                      initial={{ scale: 1 }}
                      animate={{ scale: 0.5 }}
                      transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
                      className="origin-center"
                    >
                      
                    </motion.div>
                  </div>
                </motion.div>

                {/* Right side - login */}
                <motion.div
                  key="login"
                  initial={{ 
                    width: '50%',
                    x: '100%',
                    opacity: 0
                  }}
                  animate={{ 
                    width: '50%',
                    x: 0,
                    opacity: 1,
                    transition: { 
                      duration: 0.6,
                      ease: [0.4, 0, 0.2, 1]
                    }
                  }}
                  exit={{ 
                    x: '100%',
                    opacity: 0,
                    transition: { 
                      duration: 0.4,
                      ease: [0.4, 0, 0.2, 1]
                    }
                  }}
                  className="h-full flex flex-col"
                  style={{
                    backgroundColor: 'var(--color-bg)',
                  }}
                >
                  {/* CareConnect Title Above Login */}
                  <div className="pt-8 pb-2 text-center">
                    <motion.div className="mx-[0px] my-[-50px] m-[0px] px-[0px] py-[50px]"
                      initial={{ y: -20, opacity: 0 }}
                      animate={{ 
                        y: 100, 
                        opacity: 1,
                        transition: { 
                          delay: 0.3,
                          duration: 0.5,
                          ease: [0.4, 0, 0.2, 1]
                        }
                      }}
                    >
                      <div 
                        className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4"
                        style={{
                          backgroundColor: 'var(--btn-primary-bg)',
                        }}
                      >
                        <svg 
                          width="32" 
                          height="32" 
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
                        style={{
                          fontSize: '36px',
                          fontWeight: '600',
                          color: 'var(--color-text)',
                          lineHeight: 'var(--line-height-tight)',
                        }}
                      >
                        CareConnect
                      </h1>
                    </motion.div>
                  </div>

                  {/* Login Form */}
                  <div className="flex-1 flex items-center justify-center">
                    <LoginScreen onBack={handleBack} onLogin={handleLogin} />
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>
      </main>
    );
  }

  // Role Selection screen (full window)
  if (currentScreen === 'roleselection') {
    return (
      <main 
        className="w-screen h-screen overflow-hidden relative"
        style={{
          fontFamily: 'var(--font-family)',
        }}
        aria-label="Role selection"
      >
        {/* Background Image - Always visible */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${heroImage})`,
          }}
        />

        {/* Content Container */}
        <div className="relative w-full h-full flex">
          <AnimatePresence mode="sync">
            {/* Left side - scaled down welcome */}
            <motion.div
              key="welcome-left"
              initial={{ width: '50%', opacity: 1 }}
              animate={{ width: '50%', opacity: 1 }}
              exit={{ 
                width: 0,
                opacity: 0,
                transition: { 
                  duration: 0.4,
                  ease: [0.4, 0, 0.2, 1]
                }
              }}
              className="h-full overflow-hidden"
            >
              <div className="h-full flex items-center justify-center p-4">
                <motion.div 
                  initial={{ scale: 1 }}
                  animate={{ scale: 0.5 }}
                  transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
                  className="origin-center"
                >
                  
                </motion.div>
              </div>
            </motion.div>

            {/* Right side - role selection */}
            <motion.div
              key="roleselection"
              initial={{ 
                width: '50%',
                x: '100%',
                opacity: 0
              }}
              animate={{ 
                width: '50%',
                x: 0,
                opacity: 1,
                transition: { 
                  duration: 0.6,
                  ease: [0.4, 0, 0.2, 1]
                }
              }}
              exit={{ 
                x: '100%',
                opacity: 0,
                transition: { 
                  duration: 0.4,
                  ease: [0.4, 0, 0.2, 1]
                }
              }}
              className="h-full flex flex-col"
              style={{
                backgroundColor: 'var(--color-bg)',
              }}
            >
              {/* CareConnect Title Above Role Selection */}
              <div className="pt-8 pb-2 text-center">
                <motion.div className="mx-[0px] my-[-50px] m-[0px] px-[0px] py-[50px]"
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ 
                    y: 130, 
                    opacity: 1,
                    transition: { 
                      delay: 0.3,
                      duration: 0.5,
                      ease: [0.4, 0, 0.2, 1]
                    }
                  }}
                >
                  <div 
                    className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4"
                    style={{
                      backgroundColor: 'var(--btn-primary-bg)',
                    }}
                  >
                    <svg 
                      width="32" 
                      height="32" 
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
                    style={{
                      fontSize: '36px',
                      fontWeight: '600',
                      color: 'var(--color-text)',
                      lineHeight: 'var(--line-height-tight)',
                    }}
                  >
                    CareConnect
                  </h1>
                </motion.div>
              </div>

              {/* Role Selection Form */}
              <div className="flex-1 flex items-center justify-center">
                <RoleSelection onRoleSelect={handleRoleSelection} allowedRoles={allowedRoles} />
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    );
  }

  // Dashboard screen (with menu bar, toolbar, status bar)
  return (
    <UserProvider>
      <motion.div
        key="dashboard"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
        className="w-screen h-screen"
      >
        <AppWithUser
          role={userRole}
          name={userName}
          router={router}
          showThemeSwitcher={showThemeSwitcher}
          handleThemeChange={handleThemeChange}
          handleCloseThemeSwitcher={() => setShowThemeSwitcher(false)}
          theme={theme}
        />
      </motion.div>
    </UserProvider>
  );
}

// Separate component to use the useUser hook
function AppWithUser({ role, name, router, showThemeSwitcher, handleThemeChange, handleCloseThemeSwitcher, theme }: {
  role: UserRole;
  name: string;
  router: any;
  showThemeSwitcher: boolean;
  handleThemeChange: (theme: string) => void;
  handleCloseThemeSwitcher: () => void;
  theme: string;
}) {
  const { setUserRole, setUserName } = useUser();

  // Set user role and name on mount
  useEffect(() => {
    setUserRole(role);
    setUserName(name);
  }, [role, name, setUserRole, setUserName]);

  return (
    <>
      <RouterProvider router={router} />
      {showThemeSwitcher && (
        <ThemeSwitcher
          onRequestClose={handleCloseThemeSwitcher}
          currentTheme={theme}
        />
      )}
    </>
  );
}
