import { useState } from 'react';
import { motion } from 'motion/react';
import { HeartPulse, Users, ArrowRight } from 'lucide-react';
import { UserRole } from '../contexts/UserContext';

interface RoleSelectionProps {
  onRoleSelect: (role: UserRole, name: string) => void;
  onBack?: () => void;
  allowedRoles?: UserRole[];
}

export function RoleSelection({ onRoleSelect, onBack, allowedRoles = ['caregiver', 'patient'] }: RoleSelectionProps) {
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  const [name, setName] = useState('');
  const [showNameInput, setShowNameInput] = useState(false);

  const handleRoleClick = (role: UserRole) => {
    setSelectedRole(role);
    setShowNameInput(true);
  };

  const handleContinue = () => {
    if (selectedRole && name.trim()) {
      onRoleSelect(selectedRole, name.trim());
    }
  };

  const handleBack = () => {
    setShowNameInput(false);
    setSelectedRole(null);
    setName('');
    if (onBack) {
      onBack();
    }
  };

  return (
    <div
      className="w-full h-full flex items-center justify-center"
      style={{
        backgroundColor: 'var(--color-bg)',
        fontFamily: 'var(--font-family)',
      }}
    >
      <div className="w-full max-w-4xl px-8">
        {!showNameInput ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Header */}
            <div className="text-center mb-12">
              <h1
                className="mb-4"
                style={{
                  fontSize: '48px',
                  fontWeight: '600',
                  color: 'var(--color-text)',
                }}
              >
                Welcome to CareConnect
              </h1>
              <p
                style={{
                  fontSize: 'var(--font-size-section)',
                  color: 'var(--color-text)',
                }}
              >
                How will you be using the app today?
              </p>
            </div>

            {/* Role Cards */}
            <div className={`grid grid-cols-1 ${allowedRoles.length > 1 ? 'md:grid-cols-2' : 'max-w-xl mx-auto'} gap-8`}>
              {/* Caregiver Card */}
              {allowedRoles.includes('caregiver') && (
                <motion.button
                  onClick={() => handleRoleClick('caregiver')}
                  className="p-8 rounded-2xl transition-all outline-none text-left"
                  aria-label="Sign in as Caregiver"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  style={{
                    backgroundColor: 'var(--color-surface)',
                    border: '2px solid var(--color-border)',
                    boxShadow: 'var(--shadow-panel)',
                    transition: 'var(--transition-medium)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'var(--color-focus)';
                    e.currentTarget.style.boxShadow = 'var(--shadow-hover)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'var(--color-border)';
                    e.currentTarget.style.boxShadow = 'var(--shadow-panel)';
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.outline = `var(--focus-ring-width) solid var(--focus-ring-color)`;
                    e.currentTarget.style.outlineOffset = 'var(--focus-ring-offset)';
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.outline = 'none';
                  }}
                >
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center mb-6"
                    style={{
                      backgroundColor: 'var(--btn-primary-bg)',
                      color: 'var(--btn-primary-fg)',
                    }}
                  >
                    <Users size={32} />
                  </div>
                  <h2
                    className="mb-3"
                    style={{
                      fontSize: 'var(--font-size-section)',
                      fontWeight: '600',
                      color: 'var(--color-text)',
                    }}
                  >
                    I'm a Caregiver
                  </h2>
                  <p
                    style={{
                      fontSize: 'var(--font-size-body)',
                      color: 'var(--color-text)',
                      lineHeight: '1.6',
                    }}
                  >
                    Manage patient care plans, medications, appointments, and coordinate with healthcare teams.
                  </p>
                  <div
                    className="mt-6 flex items-center gap-2"
                    style={{
                      color: 'var(--color-text)',
                      fontSize: 'var(--font-size-body)',
                      fontWeight: '500',
                    }}
                  >
                    Continue as Caregiver
                    <ArrowRight size={20} />
                  </div>
                </motion.button>
              )}

              {/* Patient Card */}
              {allowedRoles.includes('patient') && (
                <motion.button
                  onClick={() => handleRoleClick('patient')}
                  className="p-8 rounded-2xl transition-all outline-none text-left"
                  aria-label="Sign in as Patient"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  style={{
                    backgroundColor: 'var(--color-surface)',
                    border: '2px solid var(--color-border)',
                    boxShadow: 'var(--shadow-panel)',
                    transition: 'var(--transition-medium)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'var(--color-focus)';
                    e.currentTarget.style.boxShadow = 'var(--shadow-hover)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'var(--color-border)';
                    e.currentTarget.style.boxShadow = 'var(--shadow-panel)';
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.outline = `var(--focus-ring-width) solid var(--focus-ring-color)`;
                    e.currentTarget.style.outlineOffset = 'var(--focus-ring-offset)';
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.outline = 'none';
                  }}
                >
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center mb-6"
                    style={{
                      backgroundColor: 'var(--btn-primary-bg)',
                      color: 'var(--btn-primary-fg)',
                    }}
                  >
                    <HeartPulse size={32} />
                  </div>
                  <h2
                    className="mb-3"
                    style={{
                      fontSize: 'var(--font-size-section)',
                      fontWeight: '600',
                      color: 'var(--color-text)',
                    }}
                  >
                    I'm a Patient
                  </h2>
                  <p
                    style={{
                      fontSize: 'var(--font-size-body)',
                      color: 'var(--color-text)',
                      lineHeight: '1.6',
                    }}
                  >
                    View your care plan, track medications, manage appointments, and communicate with your care team.
                  </p>
                  <div
                    className="mt-6 flex items-center gap-2"
                    style={{
                      color: 'var(--color-text)',
                      fontSize: 'var(--font-size-body)',
                      fontWeight: '500',
                    }}
                  >
                    Continue as Patient
                    <ArrowRight size={20} />
                  </div>
                </motion.button>
              )}
            </div>
            {allowedRoles.length === 0 && (
              <div
                className="mx-auto mt-6 max-w-xl p-6 rounded-xl text-center"
                style={{
                  backgroundColor: 'var(--color-surface)',
                  border: '1px solid var(--color-border)',
                  color: 'var(--color-text-muted)',
                }}
              >
                No roles are available for this account. Please contact support.
              </div>
            )}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-md mx-auto"
          >
            {/* Name Input */}
            <div className="text-center mb-8">
              <h2
                className="mb-4"
                style={{
                  fontSize: 'var(--font-size-page)',
                  fontWeight: '600',
                  color: 'var(--color-text)',
                }}
              >
                What's your name?
              </h2>
              <p
                style={{
                  fontSize: 'var(--font-size-body)',
                  color: 'var(--color-text-muted)',
                }}
              >
                We'll use this to personalize your experience
              </p>
            </div>

            <div
              className="p-8 rounded-2xl"
              style={{
                backgroundColor: 'var(--color-surface)',
                border: '1px solid var(--color-border)',
                boxShadow: 'var(--shadow-panel)',
              }}
            >
              <label
                htmlFor="name-input"
                style={{
                  display: 'block',
                  fontSize: 'var(--font-size-label)',
                  color: 'var(--color-text)',
                  fontWeight: '500',
                  marginBottom: '8px',
                }}
              >
                Your Name
              </label>
              <input
                id="name-input"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                autoFocus
                className="w-full px-4 py-3 rounded-lg outline-none transition-all"
                aria-label="Enter your name"
                style={{
                  backgroundColor: 'var(--color-bg)',
                  border: '1px solid var(--color-border)',
                  color: 'var(--color-text)',
                  fontSize: 'var(--font-size-body)',
                  transition: 'var(--transition-fast)',
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = 'var(--color-focus)';
                  e.currentTarget.style.outline = `var(--focus-ring-width) solid var(--focus-ring-color)`;
                  e.currentTarget.style.outlineOffset = 'var(--focus-ring-offset)';
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = 'var(--color-border)';
                  e.currentTarget.style.outline = 'none';
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && name.trim()) {
                    handleContinue();
                  }
                }}
              />

              <div className="flex gap-3 mt-6">
                <button
                  onClick={handleBack}
                  className="flex-1 py-3 rounded-lg transition-all outline-none"
                  aria-label="Go back to role selection"
                  style={{
                    backgroundColor: 'var(--btn-secondary-bg)',
                    color: 'var(--btn-secondary-fg)',
                    fontSize: 'var(--font-size-body)',
                    fontWeight: '500',
                    transition: 'var(--transition-medium)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'var(--btn-secondary-hover-bg)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'var(--btn-secondary-bg)';
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.outline = `var(--focus-ring-width) solid var(--focus-ring-color)`;
                    e.currentTarget.style.outlineOffset = 'var(--focus-ring-offset)';
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.outline = 'none';
                  }}
                >
                  Back
                </button>
                <button
                  onClick={handleContinue}
                  disabled={!name.trim()}
                  className="flex-1 py-3 rounded-lg transition-all outline-none flex items-center justify-center gap-2"
                  aria-label="Continue to dashboard"
                  style={{
                    backgroundColor: name.trim() ? 'var(--btn-primary-bg)' : 'var(--color-border)',
                    color: name.trim() ? 'var(--btn-primary-fg)' : 'var(--color-text-muted)',
                    fontSize: 'var(--font-size-body)',
                    fontWeight: '500',
                    transition: 'var(--transition-medium)',
                    cursor: name.trim() ? 'pointer' : 'not-allowed',
                  }}
                  onMouseEnter={(e) => {
                    if (name.trim()) {
                      e.currentTarget.style.backgroundColor = 'var(--btn-primary-hover-bg)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (name.trim()) {
                      e.currentTarget.style.backgroundColor = 'var(--btn-primary-bg)';
                    }
                  }}
                  onFocus={(e) => {
                    if (name.trim()) {
                      e.currentTarget.style.outline = `var(--focus-ring-width) solid var(--focus-ring-color)`;
                      e.currentTarget.style.outlineOffset = 'var(--focus-ring-offset)';
                    }
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.outline = 'none';
                  }}
                >
                  Continue
                  <ArrowRight size={20} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
