import { useEffect, useMemo, useState, type ReactNode } from 'react';
import { useNavigate } from 'react-router';
import {
  Activity,
  AlertCircle,
  Calendar,
  CheckCircle2,
  ChevronRight,
  Clock,
  FileText,
  Pill,
  Plus,
  Users,
  type LucideIcon,
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { ResponsiveDashboardLayout } from '../components/ResponsiveDashboardLayout';

type UserRole = 'patient' | 'caregiver';
type Section =
  | 'overview'
  | 'appointments'
  | 'medications'
  | 'checkins'
  | 'patients'
  | 'medical-data';
type Tone = 'info' | 'success' | 'danger' | 'neutral' | 'warning';

interface Appointment {
  id: string;
  date: string;
  time: string;
  doctor: string;
  type: string;
  status: 'upcoming' | 'completed' | 'cancelled';
}

interface Medication {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  nextDose: string;
  status: 'active' | 'paused';
}

interface CheckIn {
  id: string;
  date: string;
  bloodPressure: string;
  heartRate: string;
  temperature: string;
  notes: string;
}

interface Patient {
  id: string;
  name: string;
  age: number;
  condition: string;
  lastCheckIn: string;
  status: 'stable' | 'needs-attention' | 'critical';
}

const dateFormatter = new Intl.DateTimeFormat('en-US', {
  month: 'long',
  day: 'numeric',
  year: 'numeric',
});

const mockAppointments: Appointment[] = [
  {
    id: '1',
    date: '2026-03-22',
    time: '10:00 AM',
    doctor: 'Dr. Sarah Johnson',
    type: 'General Checkup',
    status: 'upcoming',
  },
  {
    id: '2',
    date: '2026-03-26',
    time: '2:30 PM',
    doctor: 'Dr. Michael Chen',
    type: 'Cardiology',
    status: 'upcoming',
  },
  {
    id: '3',
    date: '2026-03-10',
    time: '9:00 AM',
    doctor: 'Dr. Emily White',
    type: 'Lab Results',
    status: 'completed',
  },
];

const mockMedications: Medication[] = [
  { id: '1', name: 'Lisinopril', dosage: '10mg', frequency: 'Once daily', nextDose: 'Today, 8:00 PM', status: 'active' },
  { id: '2', name: 'Metformin', dosage: '500mg', frequency: 'Twice daily', nextDose: 'Today, 6:00 PM', status: 'active' },
  { id: '3', name: 'Atorvastatin', dosage: '20mg', frequency: 'Once daily', nextDose: 'Tomorrow, 8:00 AM', status: 'active' },
];

const mockCheckIns: CheckIn[] = [
  { id: '1', date: '2026-03-16', bloodPressure: '120/80', heartRate: '72 bpm', temperature: '98.6 F', notes: 'Feeling good, no issues' },
  { id: '2', date: '2026-03-15', bloodPressure: '118/78', heartRate: '70 bpm', temperature: '98.4 F', notes: 'Normal day' },
  { id: '3', date: '2026-03-14', bloodPressure: '122/82', heartRate: '75 bpm', temperature: '98.7 F', notes: 'Slight headache in morning' },
];

const mockPatients: Patient[] = [
  { id: '1', name: 'John Anderson', age: 68, condition: 'Hypertension, Diabetes', lastCheckIn: '2 hours ago', status: 'stable' },
  { id: '2', name: 'Mary Williams', age: 75, condition: 'Heart Disease', lastCheckIn: '1 day ago', status: 'needs-attention' },
  { id: '3', name: 'Robert Davis', age: 82, condition: 'Arthritis', lastCheckIn: '3 hours ago', status: 'stable' },
  { id: '4', name: 'Patricia Brown', age: 70, condition: 'COPD', lastCheckIn: '5 days ago', status: 'needs-attention' },
];

function formatDate(date: string) {
  return dateFormatter.format(new Date(date));
}

function getAppointmentTone(status: Appointment['status']): Tone {
  if (status === 'upcoming') {
    return 'info';
  }

  if (status === 'completed') {
    return 'success';
  }

  return 'neutral';
}

function getPatientTone(status: Patient['status']): Tone {
  if (status === 'stable') {
    return 'success';
  }

  if (status === 'critical') {
    return 'warning';
  }

  return 'danger';
}

function StatusBadge({ tone, children }: { tone: Tone; children: ReactNode }) {
  return (
    <span className="cc-badge" data-tone={tone}>
      {children}
    </span>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
  tone,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
  tone: 'info' | 'secondary' | 'success' | 'danger';
}) {
  return (
    <article className="cc-card dashboard-stat-card">
      <div className="dashboard-stat-card__header">
        <span className="cc-icon-pill" data-tone={tone}>
          <Icon className="cc-icon cc-icon--lg" aria-hidden="true" />
        </span>
        <span className="cc-field-label">{label}</span>
      </div>
      <div className="dashboard-stat-card__value">{value}</div>
    </article>
  );
}

function PageHeader({
  title,
  subtitle,
  actionLabel,
}: {
  title: string;
  subtitle?: string;
  actionLabel?: string;
}) {
  return (
    <header className="dashboard-page__header">
      <div className="cc-stack cc-stack--xs">
        <h2 className="dashboard-page__title">{title}</h2>
        {subtitle ? <p className="dashboard-page__subtitle">{subtitle}</p> : null}
      </div>

      {actionLabel ? (
        <button type="button" className="cc-btn cc-btn--primary dashboard-inline-action">
          <Plus className="cc-icon cc-icon--md" aria-hidden="true" />
          <span>{actionLabel}</span>
        </button>
      ) : null}
    </header>
  );
}

function DataField({ label, value, hero = false }: { label: string; value: string; hero?: boolean }) {
  return (
    <div className="cc-stack cc-stack--xs">
      <p className="cc-field-label">{label}</p>
      <p className={hero ? 'cc-field-value cc-field-value--hero' : 'cc-field-value'}>{value}</p>
    </div>
  );
}

export function Dashboard() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [currentRole, setCurrentRole] = useState<UserRole>(user?.role || 'patient');
  const [currentSection, setCurrentSection] = useState<Section>('overview');
  const [selectedPatientId, setSelectedPatientId] = useState(mockPatients[0]?.id ?? '');

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  useEffect(() => {
    if (user?.role) {
      setCurrentRole(user.role);
    }
  }, [user?.role]);

  const selectedPatient = useMemo(
    () => mockPatients.find((patient) => patient.id === selectedPatientId) ?? mockPatients[0],
    [selectedPatientId],
  );

  const sections = currentRole === 'patient'
    ? [
        { id: 'overview' as const, label: 'Overview', icon: Activity },
        { id: 'appointments' as const, label: 'Appointments', icon: Calendar },
        { id: 'medications' as const, label: 'Medications', icon: Pill },
        { id: 'checkins' as const, label: 'Check-ins', icon: Activity },
      ]
    : [
        { id: 'overview' as const, label: 'Overview', icon: Activity },
        { id: 'patients' as const, label: 'My Patients', icon: Users },
        { id: 'appointments' as const, label: 'Appointments', icon: Calendar },
        { id: 'medical-data' as const, label: 'Medical Data', icon: FileText },
      ];

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const nextAppointment = mockAppointments.find((appointment) => appointment.status === 'upcoming');
  const attentionPatients = mockPatients.filter((patient) => patient.status === 'needs-attention');

  const renderPatientOverview = () => (
    <div className="dashboard-page">
      <PageHeader title={`Welcome back, ${user?.name || 'Patient'}`} subtitle="Here is your care summary for today." />

      <div className="dashboard-grid dashboard-grid--stats">
        <StatCard icon={Calendar} label="Upcoming Appointments" value="2" tone="info" />
        <StatCard icon={Pill} label="Active Medications" value="3" tone="secondary" />
        <StatCard icon={Activity} label="Last Check-in" value="Today" tone="success" />
      </div>

      <section className="cc-card dashboard-panel">
        <h3 className="dashboard-panel__title">Next Appointment</h3>
        {nextAppointment ? (
          <div className="cc-stack cc-stack--md">
            <div className="dashboard-list-item__header">
              <div className="cc-stack cc-stack--xs">
                <h4 className="dashboard-list-item__title">{nextAppointment.type}</h4>
                <p className="dashboard-list-item__text">{nextAppointment.doctor}</p>
              </div>
              <StatusBadge tone={getAppointmentTone(nextAppointment.status)}>
                {nextAppointment.status}
              </StatusBadge>
            </div>

            <div className="dashboard-meta">
              <div className="dashboard-meta__item">
                <Calendar className="cc-icon cc-icon--sm" aria-hidden="true" />
                <span>{formatDate(nextAppointment.date)}</span>
              </div>
              <div className="dashboard-meta__item">
                <Clock className="cc-icon cc-icon--sm" aria-hidden="true" />
                <span>{nextAppointment.time}</span>
              </div>
            </div>
          </div>
        ) : (
          <p className="dashboard-page__subtitle">No upcoming appointments scheduled.</p>
        )}
      </section>

      <section className="cc-stack cc-stack--md">
        <h3 className="dashboard-panel__title">Today&apos;s Medications</h3>
        <div className="dashboard-list">
          {mockMedications.slice(0, 2).map((medication) => (
            <article key={medication.id} className="cc-card dashboard-list-item">
              <div className="dashboard-list-item__row">
                <div className="dashboard-list-item__media">
                  <span className="cc-icon-pill" data-tone="secondary">
                    <Pill className="cc-icon cc-icon--md" aria-hidden="true" />
                  </span>
                  <div className="dashboard-list-item__content">
                    <h4 className="dashboard-list-item__title">{medication.name}</h4>
                    <p className="dashboard-list-item__text">
                      {medication.dosage}, {medication.frequency}
                    </p>
                  </div>
                </div>

                <div className="dashboard-list-item__aside">
                  <p className="cc-field-label">Next dose</p>
                  <p className="cc-field-value">{medication.nextDose}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );

  const renderCaregiverOverview = () => (
    <div className="dashboard-page">
      <PageHeader title="Caregiver Dashboard" subtitle="Track patients who need the most attention." />

      <div className="dashboard-grid dashboard-grid--stats">
        <StatCard icon={Users} label="Total Patients" value="4" tone="info" />
        <StatCard icon={AlertCircle} label="Need Attention" value="2" tone="danger" />
        <StatCard icon={CheckCircle2} label="Stable" value="2" tone="success" />
      </div>

      <section className="cc-stack cc-stack--md">
        <h3 className="dashboard-panel__title">Patients Needing Attention</h3>
        <div className="dashboard-list">
          {attentionPatients.map((patient) => (
            <article key={patient.id} className="cc-card dashboard-list-item">
              <div className="dashboard-list-item__row">
                <div className="dashboard-list-item__media">
                  <span className="cc-avatar cc-avatar--lg">{patient.name.charAt(0)}</span>
                  <div className="dashboard-list-item__content">
                    <h4 className="dashboard-list-item__title">{patient.name}</h4>
                    <p className="dashboard-list-item__text">{patient.condition}</p>
                  </div>
                </div>

                <div className="dashboard-list-item__aside">
                  <p className="cc-field-label">Last check-in</p>
                  <p className="cc-field-value">{patient.lastCheckIn}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );

  const renderAppointments = () => (
    <div className="dashboard-page">
      <PageHeader
        title="Appointments"
        subtitle="Upcoming and completed visits in one place."
        actionLabel="New Appointment"
      />

      <div className="dashboard-list">
        {mockAppointments.map((appointment) => (
          <article key={appointment.id} className="cc-card dashboard-list-item">
            <div className="cc-stack cc-stack--md">
              <div className="dashboard-list-item__header">
                <div className="cc-stack cc-stack--xs">
                  <h4 className="dashboard-list-item__title">{appointment.type}</h4>
                  <p className="dashboard-list-item__text">{appointment.doctor}</p>
                </div>
                <StatusBadge tone={getAppointmentTone(appointment.status)}>
                  {appointment.status}
                </StatusBadge>
              </div>

              <div className="dashboard-meta">
                <div className="dashboard-meta__item">
                  <Calendar className="cc-icon cc-icon--sm" aria-hidden="true" />
                  <span>{formatDate(appointment.date)}</span>
                </div>
                <div className="dashboard-meta__item">
                  <Clock className="cc-icon cc-icon--sm" aria-hidden="true" />
                  <span>{appointment.time}</span>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );

  const renderMedications = () => (
    <div className="dashboard-page">
      <PageHeader
        title="Medications"
        subtitle="Active medications and next dose reminders."
        actionLabel="Add Medication"
      />

      <div className="dashboard-grid dashboard-grid--cards">
        {mockMedications.map((medication) => (
          <article key={medication.id} className="cc-card dashboard-panel">
            <div className="dashboard-list-item__media">
              <span className="cc-icon-pill" data-tone="secondary">
                <Pill className="cc-icon cc-icon--lg" aria-hidden="true" />
              </span>
              <div className="dashboard-list-item__content">
                <h4 className="dashboard-list-item__title">{medication.name}</h4>
                <p className="dashboard-list-item__text">{medication.dosage}</p>
              </div>
            </div>

            <div className="cc-stack cc-stack--md">
              <DataField label="Frequency" value={medication.frequency} />
              <DataField label="Next Dose" value={medication.nextDose} />
            </div>
          </article>
        ))}
      </div>
    </div>
  );

  const renderCheckIns = () => (
    <div className="dashboard-page">
      <PageHeader
        title="Check-ins"
        subtitle="Recent vitals and notes from daily check-ins."
        actionLabel="New Check-in"
      />

      <div className="dashboard-list">
        {mockCheckIns.map((checkIn) => (
          <article key={checkIn.id} className="cc-card dashboard-list-item">
            <div className="cc-stack cc-stack--md">
              <div className="dashboard-list-item__header">
                <h4 className="dashboard-list-item__title">{formatDate(checkIn.date)}</h4>
                <StatusBadge tone="success">Completed</StatusBadge>
              </div>

              <div className="dashboard-field-grid">
                <DataField label="Blood Pressure" value={checkIn.bloodPressure} />
                <DataField label="Heart Rate" value={checkIn.heartRate} />
                <DataField label="Temperature" value={checkIn.temperature} />
              </div>

              {checkIn.notes ? <DataField label="Notes" value={checkIn.notes} /> : null}
            </div>
          </article>
        ))}
      </div>
    </div>
  );

  const renderPatients = () => (
    <div className="dashboard-page">
      <PageHeader
        title="My Patients"
        subtitle="Overview of assigned patients and their current status."
        actionLabel="Add Patient"
      />

      <div className="dashboard-grid dashboard-grid--cards">
        {mockPatients.map((patient) => (
          <article key={patient.id} className="cc-card dashboard-panel">
            <div className="dashboard-list-item__media">
              <span className="cc-avatar cc-avatar--lg">{patient.name.charAt(0)}</span>
              <div className="dashboard-list-item__content">
                <h4 className="dashboard-list-item__title">{patient.name}</h4>
                <p className="dashboard-list-item__text">Age {patient.age}</p>
              </div>
            </div>

            <div className="cc-stack cc-stack--md">
              <DataField label="Conditions" value={patient.condition} />
              <DataField label="Last Check-in" value={patient.lastCheckIn} />

              <div className="dashboard-list-item__header">
                <StatusBadge tone={getPatientTone(patient.status)}>
                  {patient.status.replace('-', ' ')}
                </StatusBadge>
                <button type="button" className="cc-btn cc-btn--ghost cc-btn--icon" aria-label={`Open ${patient.name}`}>
                  <ChevronRight className="cc-icon cc-icon--md" aria-hidden="true" />
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );

  const renderMedicalData = () => (
    <div className="dashboard-page">
      <PageHeader title="Medical Data" subtitle="Review recent vitals, medications, and history." />

      <section className="cc-stack cc-stack--sm">
        <label htmlFor="patient-select" className="cc-field-value">
          Select Patient
        </label>
        <select
          id="patient-select"
          className="cc-select"
          value={selectedPatientId}
          onChange={(event) => setSelectedPatientId(event.target.value)}
        >
          {mockPatients.map((patient) => (
            <option key={patient.id} value={patient.id}>
              {patient.name}
            </option>
          ))}
        </select>
      </section>

      <div className="dashboard-grid dashboard-grid--cards">
        <section className="cc-card dashboard-panel">
          <h3 className="dashboard-panel__title">Recent Vitals</h3>
          <div className="cc-stack cc-stack--md">
            <DataField label="Blood Pressure" value="120/80" hero />
            <DataField label="Heart Rate" value="72 bpm" hero />
            <DataField label="Temperature" value="98.6 F" hero />
          </div>
        </section>

        <section className="cc-card dashboard-panel">
          <h3 className="dashboard-panel__title">Current Medications</h3>
          <div className="dashboard-surface-list">
            {mockMedications.map((medication) => (
              <article key={medication.id} className="dashboard-surface-item">
                <p className="cc-field-value">{`${medication.name} ${medication.dosage}`}</p>
                <p className="cc-field-label">{medication.frequency}</p>
              </article>
            ))}
          </div>
        </section>
      </div>

      <section className="cc-card dashboard-panel">
        <h3 className="dashboard-panel__title">Medical History</h3>
        <div className="dashboard-history-list">
          <article className="dashboard-history-item">
            <div className="dashboard-history-item__top">
              <p className="cc-field-value">{selectedPatient.condition.split(',')[0]?.trim() || 'Type 2 Diabetes'}</p>
              <span className="cc-field-label">Diagnosed: Jan 2020</span>
            </div>
            <p className="dashboard-list-item__text">Managed with medication and diet.</p>
          </article>

          <article className="dashboard-history-item">
            <div className="dashboard-history-item__top">
              <p className="cc-field-value">Hypertension</p>
              <span className="cc-field-label">Diagnosed: Mar 2018</span>
            </div>
            <p className="dashboard-list-item__text">Well controlled with the current medication plan.</p>
          </article>

          <article className="dashboard-history-item">
            <div className="dashboard-history-item__top">
              <p className="cc-field-value">High Cholesterol</p>
              <span className="cc-field-label">Diagnosed: Jun 2019</span>
            </div>
            <p className="dashboard-list-item__text">Managed with statin therapy and regular check-ins.</p>
          </article>
        </div>
      </section>
    </div>
  );

  const renderContent = () => {
    if (currentRole === 'patient') {
      switch (currentSection) {
        case 'appointments':
          return renderAppointments();
        case 'medications':
          return renderMedications();
        case 'checkins':
          return renderCheckIns();
        case 'overview':
        default:
          return renderPatientOverview();
      }
    }

    switch (currentSection) {
      case 'patients':
        return renderPatients();
      case 'appointments':
        return renderAppointments();
      case 'medical-data':
        return renderMedicalData();
      case 'overview':
      default:
        return renderCaregiverOverview();
    }
  };

  if (!user) {
    return null;
  }

  return (
    <ResponsiveDashboardLayout
      user={user}
      currentRole={currentRole}
      setCurrentRole={setCurrentRole}
      setCurrentSection={(section: string) => setCurrentSection(section as Section)}
      currentSection={currentSection}
      sections={sections}
      onLogout={handleLogout}
    >
      {renderContent()}
    </ResponsiveDashboardLayout>
  );
}
