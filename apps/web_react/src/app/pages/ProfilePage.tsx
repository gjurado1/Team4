import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import {
  ArrowLeft,
  Bell,
  Calendar,
  Check,
  Edit2,
  LogOut,
  Mail,
  Shield,
  User,
  X,
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { ThemeToggle } from '../components/ThemeToggle';

export function ProfilePage() {
  const navigate = useNavigate();
  const { user, logout, updateProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user?.name || '');
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  const handleSave = async () => {
    setIsSaving(true);

    try {
      await updateProfile({ name });
      setIsEditing(false);
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    if (user) {
      setName(user.name);
    }
    setIsEditing(false);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (!user) {
    return null;
  }

  const memberSince = new Date(user.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="profile-page">
      <header className="profile-header">
        <div className="cc-container profile-header__inner">
          <div className="profile-header__group">
            <button type="button" className="cc-btn cc-btn--secondary" onClick={() => navigate('/dashboard')}>
              <ArrowLeft className="cc-icon cc-icon--sm" aria-hidden="true" />
              <span>Back to Dashboard</span>
            </button>

            <button type="button" className="dashboard-brand" onClick={() => navigate('/')} aria-label="CareConnect home">
              <span className="dashboard-brand__mark">CC</span>
              <span className="dashboard-brand__text">CareConnect</span>
            </button>
          </div>

          <div className="profile-header__group">
            <ThemeToggle />
            <button type="button" className="dashboard-icon-button" aria-label="Notifications">
              <Bell className="cc-icon cc-icon--md" aria-hidden="true" />
            </button>
            <div className="dashboard-user-chip">
              <span className="cc-avatar cc-avatar--md">{user.name.charAt(0).toUpperCase()}</span>
              <span className="dashboard-user-chip__name">{user.name}</span>
            </div>
          </div>
        </div>
      </header>

      <div className="profile-content">
        <div className="profile-shell">
          <header className="profile-page__header">
            <h1 className="profile-page__title">My Profile</h1>
            <p className="profile-page__subtitle">Manage your account information and preferences.</p>
          </header>

          <section className="cc-card profile-card">
            <div className="profile-hero">
              <span className="cc-avatar cc-avatar--lg profile-avatar">{user.name.charAt(0).toUpperCase()}</span>
              <div className="cc-stack cc-stack--xs">
                <h2 className="dashboard-page__title">{user.name}</h2>
                <p className="dashboard-page__subtitle">{user.email}</p>
              </div>
            </div>

            <div className="profile-section">
              <div className="profile-section__field">
                <label className="profile-section__label">
                  <User className="cc-icon cc-icon--sm" aria-hidden="true" />
                  <span>Full Name</span>
                </label>

                {isEditing ? (
                  <div className="profile-edit-actions">
                    <input
                      className="auth-input"
                      type="text"
                      value={name}
                      onChange={(event) => setName(event.target.value)}
                    />
                    <button type="button" className="cc-btn cc-btn--primary cc-btn--icon" onClick={handleSave} disabled={isSaving} aria-label="Save changes">
                      <Check className="cc-icon cc-icon--sm" aria-hidden="true" />
                    </button>
                    <button type="button" className="cc-btn cc-btn--secondary cc-btn--icon" onClick={handleCancel} disabled={isSaving} aria-label="Cancel editing">
                      <X className="cc-icon cc-icon--sm" aria-hidden="true" />
                    </button>
                  </div>
                ) : (
                  <div className="profile-section__value">
                    <span className="profile-section__value-text">{user.name}</span>
                    <button type="button" className="cc-btn cc-btn--ghost cc-btn--icon" onClick={() => setIsEditing(true)} aria-label="Edit name">
                      <Edit2 className="cc-icon cc-icon--sm" aria-hidden="true" />
                    </button>
                  </div>
                )}
              </div>

              <div className="profile-section__field">
                <label className="profile-section__label">
                  <Mail className="cc-icon cc-icon--sm" aria-hidden="true" />
                  <span>Email Address</span>
                </label>
                <div className="profile-section__value">
                  <span className="profile-section__value-text">{user.email}</span>
                </div>
              </div>

              <div className="profile-section__field">
                <label className="profile-section__label">
                  <Calendar className="cc-icon cc-icon--sm" aria-hidden="true" />
                  <span>Member Since</span>
                </label>
                <div className="profile-section__value">
                  <span className="profile-section__value-text">{memberSince}</span>
                </div>
              </div>
            </div>
          </section>

          <section className="cc-card profile-card">
            <div className="profile-security__header">
              <Shield className="cc-icon cc-icon--lg" aria-hidden="true" />
              <h3 className="dashboard-panel__title">Security &amp; Privacy</h3>
            </div>
            <p className="profile-security__copy">
              Your data is encrypted and stored securely. CareConnect follows HIPAA-aligned
              practices to protect your health information.
            </p>
            <button type="button" className="cc-btn cc-btn--secondary">
              Change Password
            </button>
          </section>

          <button type="button" className="cc-btn cc-btn--danger-outline cc-btn--wide" onClick={handleLogout}>
            <LogOut className="cc-icon cc-icon--md" aria-hidden="true" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>
    </div>
  );
}
