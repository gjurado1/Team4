import { useEffect, useState, type ReactNode } from 'react';
import {
  Bell,
  Eye,
  Globe,
  Mail,
  Moon,
  Shield,
  Smartphone,
  Type,
  Volume2,
  type LucideIcon,
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { ResponsiveSettingsLayout } from '../components/ResponsiveSettingsLayout';
import { ThemeToggle } from '../components/ThemeToggle';
import { applyReducedMotion, applyTextSize, type TextSizeOption } from '../utils/accessibility';

interface SettingsState {
  textSize: TextSizeOption;
  screenReader: boolean;
  highContrast: boolean;
  reducedMotion: boolean;
  dataCollection: boolean;
  analytics: boolean;
  personalization: boolean;
  emailNotifications: boolean;
  smsNotifications: boolean;
  pushNotifications: boolean;
  appointmentReminders: boolean;
  medicationReminders: boolean;
  language: string;
  timezone: string;
}

type SettingsSectionId = 'accessibility' | 'privacy' | 'notifications' | 'general';

const defaultSettings: SettingsState = {
  textSize: 'medium',
  screenReader: false,
  highContrast: false,
  reducedMotion: false,
  dataCollection: true,
  analytics: true,
  personalization: true,
  emailNotifications: true,
  smsNotifications: false,
  pushNotifications: true,
  appointmentReminders: true,
  medicationReminders: true,
  language: 'en-US',
  timezone: 'America/New_York',
};

function SettingToggle({
  icon: Icon,
  title,
  description,
  checked,
  onToggle,
}: {
  icon?: LucideIcon;
  title: string;
  description: string;
  checked: boolean;
  onToggle: () => void;
}) {
  return (
    <article className="settings-card">
      <div className="settings-card__row">
        <div>
          {Icon ? (
            <div className="settings-card__header">
              <Icon className="cc-icon cc-icon--md" aria-hidden="true" />
              <h3 className="settings-card__title">{title}</h3>
            </div>
          ) : (
            <h3 className="settings-card__title">{title}</h3>
          )}
          <p className="settings-card__text">{description}</p>
        </div>

        <button
          type="button"
          className="settings-toggle"
          data-checked={checked}
          onClick={onToggle}
          aria-pressed={checked}
          aria-label={`${title} ${checked ? 'on' : 'off'}`}
        >
          <span className="settings-toggle__thumb" aria-hidden="true" />
        </button>
      </div>
    </article>
  );
}

function SettingsAlert({ icon: Icon, title, children }: { icon: LucideIcon; title: string; children: ReactNode }) {
  return (
    <div className="settings-alert">
      <Icon className="cc-icon cc-icon--lg" aria-hidden="true" />
      <div>
        <h3 className="settings-card__title">{title}</h3>
        <p className="settings-card__text">{children}</p>
      </div>
    </div>
  );
}

export function SettingsPage() {
  const { user } = useAuth();
  const [settings, setSettings] = useState<SettingsState>(defaultSettings);
  const [saved, setSaved] = useState(false);
  const [activeSection, setActiveSection] = useState<SettingsSectionId>('accessibility');

  useEffect(() => {
    const stored = localStorage.getItem('careconnect-settings');
    if (!stored) {
      return;
    }

    try {
      setSettings(JSON.parse(stored));
    } catch {
      // Ignore malformed local settings and keep defaults.
    }
  }, []);

  useEffect(() => {
    applyTextSize(settings.textSize);
  }, [settings.textSize]);

  useEffect(() => {
    applyReducedMotion(settings.reducedMotion);
  }, [settings.reducedMotion]);

  const updateSetting = <K extends keyof SettingsState>(key: K, value: SettingsState[K]) => {
    setSettings((previous) => ({ ...previous, [key]: value }));
  };

  const handleSaveSettings = () => {
    localStorage.setItem('careconnect-settings', JSON.stringify(settings));
    setSaved(true);
    window.setTimeout(() => setSaved(false), 3000);
  };

  if (!user) {
    return null;
  }

  const sections = [
    { id: 'accessibility' as const, label: 'Accessibility', icon: Eye },
    { id: 'privacy' as const, label: 'Privacy & Data', icon: Shield },
    { id: 'notifications' as const, label: 'Notifications', icon: Bell },
    { id: 'general' as const, label: 'General', icon: Globe },
  ];

  const accessibilityContent = (
    <div className="settings-section">
      <div>
        <div className="settings-card__header">
          <Type className="cc-icon cc-icon--md" aria-hidden="true" />
          <h3 className="settings-card__title">Text Size</h3>
        </div>
        <p className="settings-card__text">
          Adjust text size for better readability across the app.
        </p>
      </div>

      <div className="settings-option-grid">
        {(['small', 'medium', 'large', 'extra-large'] as const).map((size) => (
          <button
            key={size}
            type="button"
            className="settings-option"
            data-active={settings.textSize === size}
            onClick={() => updateSetting('textSize', size)}
          >
            {size.replace('-', ' ')}
          </button>
        ))}
      </div>

      <p className="settings-section__intro">
        Current size: {settings.textSize === 'extra-large' ? 'Extra Large (22px)' : settings.textSize === 'large' ? 'Large (20px)' : settings.textSize === 'medium' ? 'Medium (18px)' : 'Small (14px)'}
      </p>

      <SettingToggle
        icon={Volume2}
        title="Screen Reader Mode"
        description="Enable enhanced compatibility with screen readers and assistive technologies."
        checked={settings.screenReader}
        onToggle={() => updateSetting('screenReader', !settings.screenReader)}
      />

      <SettingToggle
        icon={Eye}
        title="High Contrast Mode"
        description="Increase contrast between text and background for better visibility."
        checked={settings.highContrast}
        onToggle={() => updateSetting('highContrast', !settings.highContrast)}
      />

      <SettingToggle
        icon={Moon}
        title="Reduce Motion"
        description="Minimize animations and transitions that may cause discomfort."
        checked={settings.reducedMotion}
        onToggle={() => updateSetting('reducedMotion', !settings.reducedMotion)}
      />
    </div>
  );

  const privacyContent = (
    <div className="settings-section">
      <SettingsAlert icon={Shield} title="Your Privacy Matters">
        Control how your data is collected and used. You can opt out of data collection at any time.
      </SettingsAlert>

      <SettingToggle
        title="User Data Collection"
        description="Allow CareConnect to collect usage data to improve our services and your experience."
        checked={settings.dataCollection}
        onToggle={() => updateSetting('dataCollection', !settings.dataCollection)}
      />

      <SettingToggle
        title="Analytics & Performance"
        description="Help us understand how you use CareConnect to improve performance and features."
        checked={settings.analytics}
        onToggle={() => updateSetting('analytics', !settings.analytics)}
      />

      <SettingToggle
        title="Personalization"
        description="Allow personalized recommendations and content based on your health data and preferences."
        checked={settings.personalization}
        onToggle={() => updateSetting('personalization', !settings.personalization)}
      />
    </div>
  );

  const notificationsContent = (
    <div className="settings-section">
      <p className="settings-section__intro">
        Choose how you want to receive notifications and reminders.
      </p>

      <SettingToggle
        icon={Mail}
        title="Email Notifications"
        description="Receive updates and reminders via email."
        checked={settings.emailNotifications}
        onToggle={() => updateSetting('emailNotifications', !settings.emailNotifications)}
      />

      <SettingToggle
        icon={Smartphone}
        title="SMS Notifications"
        description="Get text messages for important updates."
        checked={settings.smsNotifications}
        onToggle={() => updateSetting('smsNotifications', !settings.smsNotifications)}
      />

      <SettingToggle
        icon={Bell}
        title="Push Notifications"
        description="Receive notifications directly in your browser."
        checked={settings.pushNotifications}
        onToggle={() => updateSetting('pushNotifications', !settings.pushNotifications)}
      />

      <div className="cc-divider" />

      <SettingToggle
        title="Appointment Reminders"
        description="Get reminders before your scheduled appointments."
        checked={settings.appointmentReminders}
        onToggle={() => updateSetting('appointmentReminders', !settings.appointmentReminders)}
      />

      <SettingToggle
        title="Medication Reminders"
        description="Never miss a dose with medication reminders."
        checked={settings.medicationReminders}
        onToggle={() => updateSetting('medicationReminders', !settings.medicationReminders)}
      />
    </div>
  );

  const generalContent = (
    <div className="settings-section">
      <div>
        <label htmlFor="language" className="settings-card__title">
          Language
        </label>
        <p className="settings-card__text">Choose your preferred language for the interface.</p>
        <select
          id="language"
          className="cc-select"
          value={settings.language}
          onChange={(event) => updateSetting('language', event.target.value)}
        >
          <option value="en-US">English (US)</option>
          <option value="en-GB">English (UK)</option>
          <option value="es-ES">Spanish</option>
          <option value="fr-FR">French</option>
          <option value="de-DE">German</option>
          <option value="it-IT">Italian</option>
          <option value="pt-PT">Portuguese</option>
          <option value="zh-CN">Chinese (Simplified)</option>
          <option value="ja-JP">Japanese</option>
        </select>
      </div>

      <div>
        <label htmlFor="timezone" className="settings-card__title">
          Timezone
        </label>
        <p className="settings-card__text">Set your timezone for accurate appointment scheduling.</p>
        <select
          id="timezone"
          className="cc-select"
          value={settings.timezone}
          onChange={(event) => updateSetting('timezone', event.target.value)}
        >
          <option value="America/New_York">Eastern Time (ET)</option>
          <option value="America/Chicago">Central Time (CT)</option>
          <option value="America/Denver">Mountain Time (MT)</option>
          <option value="America/Los_Angeles">Pacific Time (PT)</option>
          <option value="America/Anchorage">Alaska Time (AKT)</option>
          <option value="Pacific/Honolulu">Hawaii Time (HT)</option>
          <option value="Europe/London">London (GMT)</option>
          <option value="Europe/Paris">Paris (CET)</option>
          <option value="Asia/Tokyo">Tokyo (JST)</option>
          <option value="Australia/Sydney">Sydney (AEST)</option>
        </select>
      </div>

      <div className="settings-card">
        <div className="settings-card__row">
          <div>
            <h3 className="settings-card__title">Theme</h3>
            <p className="settings-card__text">Choose between light and dark mode.</p>
          </div>
          <ThemeToggle />
        </div>
      </div>
    </div>
  );

  const contentBySection: Record<SettingsSectionId, ReactNode> = {
    accessibility: accessibilityContent,
    privacy: privacyContent,
    notifications: notificationsContent,
    general: generalContent,
  };

  return (
    <ResponsiveSettingsLayout
      user={user}
      activeSection={activeSection}
      setActiveSection={setActiveSection}
      sections={sections}
      content={contentBySection[activeSection]}
      handleSaveSettings={handleSaveSettings}
      saved={saved}
    />
  );
}
