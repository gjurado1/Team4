import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '../contexts/AuthContext';
import { User, Mail, Calendar, LogOut, Edit2, Check, X, Shield } from 'lucide-react';

export function ProfilePage() {
  const navigate = useNavigate();
  const { user, logout, updateProfile } = useAuth();
  
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user?.name || '');
  const [isSaving, setIsSaving] = useState(false);

  if (!user) {
    navigate('/login');
    return null;
  }

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await updateProfile({ name });
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to update profile:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setName(user.name);
    setIsEditing(false);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'var(--color-bg)',
        paddingTop: 'calc(var(--header-height) + var(--space-8))',
        paddingBottom: 'var(--space-10)',
        paddingLeft: 'var(--space-5)',
        paddingRight: 'var(--space-5)',
      }}
    >
      <div
        style={{
          maxWidth: '800px',
          margin: '0 auto',
        }}
      >
        {/* Header */}
        <div
          style={{
            marginBottom: 'var(--space-8)',
          }}
        >
          <h1
            style={{
              fontSize: 'var(--font-size-h1)',
              fontWeight: 800,
              color: 'var(--color-text)',
              marginBottom: 'var(--space-2)',
            }}
          >
            My Profile
          </h1>
          <p
            style={{
              fontSize: 'var(--font-size-body)',
              color: 'var(--color-text-muted)',
            }}
          >
            Manage your account information and preferences
          </p>
        </div>

        {/* Profile Card */}
        <div
          style={{
            background: 'var(--card-bg)',
            border: '1px solid var(--card-border)',
            borderRadius: 'var(--radius-xl)',
            padding: 'var(--space-8)',
            marginBottom: 'var(--space-6)',
            boxShadow: 'var(--shadow-md)',
          }}
        >
          {/* Avatar Section */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--space-5)',
              marginBottom: 'var(--space-8)',
              paddingBottom: 'var(--space-6)',
              borderBottom: '1px solid var(--color-border)',
            }}
          >
            <div
              style={{
                width: '100px',
                height: '100px',
                borderRadius: 'var(--radius-full)',
                background: 'var(--btn-primary-bg)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '2.5rem',
                fontWeight: 900,
                color: 'var(--btn-primary-fg)',
                boxShadow: '0 0 30px rgba(59, 130, 246, 0.4)',
                flexShrink: 0,
              }}
              aria-hidden="true"
            >
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div style={{ flex: 1 }}>
              <h2
                style={{
                  fontSize: 'var(--font-size-h2)',
                  fontWeight: 700,
                  color: 'var(--color-text)',
                  marginBottom: 'var(--space-2)',
                }}
              >
                {user.name}
              </h2>
              <p
                style={{
                  fontSize: 'var(--font-size-body)',
                  color: 'var(--color-text-muted)',
                }}
              >
                {user.email}
              </p>
            </div>
          </div>

          {/* Profile Information */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--space-5)',
            }}
          >
            {/* Name Field */}
            <div>
              <label
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--space-2)',
                  fontSize: 'var(--font-size-body)',
                  fontWeight: 600,
                  color: 'var(--color-text)',
                  marginBottom: 'var(--space-3)',
                }}
              >
                <User size={18} />
                Full Name
              </label>
              {isEditing ? (
                <div style={{ display: 'flex', gap: 'var(--space-3)', alignItems: 'center' }}>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    style={{
                      flex: 1,
                      padding: 'var(--space-4)',
                      background: 'var(--color-surface)',
                      border: '1px solid var(--color-border)',
                      borderRadius: 'var(--radius-md)',
                      fontSize: 'var(--font-size-body)',
                      color: 'var(--color-text)',
                      outline: 'none',
                      transition: 'all var(--duration-fast) var(--ease-standard)',
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = 'var(--color-brand-primary)';
                      e.currentTarget.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)';
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = 'var(--color-border)';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  />
                  <button
                    type="button"
                    onClick={handleSave}
                    disabled={isSaving}
                    style={{
                      padding: 'var(--space-3)',
                      background: 'var(--btn-primary-bg)',
                      color: 'var(--btn-primary-fg)',
                      border: 'none',
                      borderRadius: 'var(--radius-md)',
                      cursor: isSaving ? 'not-allowed' : 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      opacity: isSaving ? 0.6 : 1,
                    }}
                    aria-label="Save changes"
                  >
                    <Check size={20} />
                  </button>
                  <button
                    type="button"
                    onClick={handleCancel}
                    disabled={isSaving}
                    style={{
                      padding: 'var(--space-3)',
                      background: 'var(--btn-secondary-bg)',
                      color: 'var(--btn-secondary-fg)',
                      border: '1px solid var(--btn-secondary-border)',
                      borderRadius: 'var(--radius-md)',
                      cursor: isSaving ? 'not-allowed' : 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      opacity: isSaving ? 0.6 : 1,
                    }}
                    aria-label="Cancel editing"
                  >
                    <X size={20} />
                  </button>
                </div>
              ) : (
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: 'var(--space-4)',
                    background: 'var(--color-surface)',
                    borderRadius: 'var(--radius-md)',
                  }}
                >
                  <span style={{ fontSize: 'var(--font-size-body)', color: 'var(--color-text)' }}>
                    {user.name}
                  </span>
                  <button
                    type="button"
                    onClick={() => setIsEditing(true)}
                    style={{
                      padding: 'var(--space-2)',
                      background: 'transparent',
                      color: 'var(--color-brand-primary)',
                      border: 'none',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                    }}
                    aria-label="Edit name"
                  >
                    <Edit2 size={18} />
                  </button>
                </div>
              )}
            </div>

            {/* Email Field (Read-only) */}
            <div>
              <label
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--space-2)',
                  fontSize: 'var(--font-size-body)',
                  fontWeight: 600,
                  color: 'var(--color-text)',
                  marginBottom: 'var(--space-3)',
                }}
              >
                <Mail size={18} />
                Email Address
              </label>
              <div
                style={{
                  padding: 'var(--space-4)',
                  background: 'var(--color-surface)',
                  borderRadius: 'var(--radius-md)',
                  fontSize: 'var(--font-size-body)',
                  color: 'var(--color-text)',
                }}
              >
                {user.email}
              </div>
            </div>

            {/* Member Since */}
            <div>
              <label
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--space-2)',
                  fontSize: 'var(--font-size-body)',
                  fontWeight: 600,
                  color: 'var(--color-text)',
                  marginBottom: 'var(--space-3)',
                }}
              >
                <Calendar size={18} />
                Member Since
              </label>
              <div
                style={{
                  padding: 'var(--space-4)',
                  background: 'var(--color-surface)',
                  borderRadius: 'var(--radius-md)',
                  fontSize: 'var(--font-size-body)',
                  color: 'var(--color-text)',
                }}
              >
                {formatDate(user.createdAt)}
              </div>
            </div>
          </div>
        </div>

        {/* Security Section */}
        <div
          style={{
            background: 'var(--card-bg)',
            border: '1px solid var(--card-border)',
            borderRadius: 'var(--radius-xl)',
            padding: 'var(--space-8)',
            marginBottom: 'var(--space-6)',
            boxShadow: 'var(--shadow-md)',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--space-3)',
              marginBottom: 'var(--space-5)',
            }}
          >
            <Shield size={24} color="var(--color-brand-primary)" />
            <h3
              style={{
                fontSize: 'var(--font-size-h3)',
                fontWeight: 700,
                color: 'var(--color-text)',
                margin: 0,
              }}
            >
              Security & Privacy
            </h3>
          </div>
          <p
            style={{
              fontSize: 'var(--font-size-body)',
              color: 'var(--color-text-muted)',
              marginBottom: 'var(--space-5)',
            }}
          >
            Your data is encrypted and stored securely. We follow HIPAA compliance guidelines to protect your health information.
          </p>
          <button
            type="button"
            style={{
              padding: 'var(--space-4) var(--space-6)',
              background: 'var(--btn-secondary-bg)',
              color: 'var(--btn-secondary-fg)',
              border: '1px solid var(--btn-secondary-border)',
              borderRadius: 'var(--radius-md)',
              fontSize: 'var(--font-size-body)',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all var(--duration-fast) var(--ease-standard)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'var(--btn-secondary-hover-bg)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'var(--btn-secondary-bg)';
            }}
          >
            Change Password
          </button>
        </div>

        {/* Logout Button */}
        <button
          type="button"
          onClick={handleLogout}
          style={{
            width: '100%',
            padding: 'var(--space-4)',
            background: 'transparent',
            color: '#ef4444',
            border: '2px solid #ef4444',
            borderRadius: 'var(--radius-md)',
            fontSize: 'var(--font-size-body)',
            fontWeight: 700,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 'var(--space-3)',
            transition: 'all var(--duration-fast) var(--ease-standard)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = '#ef4444';
            e.currentTarget.style.color = 'white';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'transparent';
            e.currentTarget.style.color = '#ef4444';
          }}
        >
          <LogOut size={20} />
          Sign Out
        </button>
      </div>
    </div>
  );
}
