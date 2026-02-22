import { useParams, useNavigate } from 'react-router';
import { User, Phone, Mail, MapPin, Calendar, Activity, Pill, FileText, ArrowLeft, ExternalLink } from 'lucide-react';
import { useEffect } from 'react';
import { BackButton } from '../components/BackButton';

// Mock patient data
const mockPatients: Record<string, any> = {
  '1': {
    id: '1',
    name: 'Margaret Smith',
    age: 78,
    gender: 'Female',
    phone: '(555) 123-4567',
    email: 'margaret.smith@email.com',
    address: '123 Maple Street, Apt 4B, Springfield, IL 62701',
    admissionDate: 'January 15, 2026',
    conditions: ['Hypertension', 'Type 2 Diabetes', 'Osteoarthritis'],
    medications: [
      { name: 'Lisinopril', dosage: '20mg', frequency: 'Once daily' },
      { name: 'Metformin', dosage: '500mg', frequency: 'Twice daily' },
      { name: 'Ibuprofen', dosage: '200mg', frequency: 'As needed' },
    ],
    allergies: ['Penicillin', 'Sulfa drugs'],
    primaryPhysician: 'Dr. Michael Chen',
    emergencyContact: {
      name: 'John Smith (Son)',
      phone: '(555) 987-6543',
      relationship: 'Son'
    },
    recentVitals: {
      bloodPressure: '142/88',
      heartRate: '76 bpm',
      temperature: '98.4°F',
      weight: '165 lbs',
      lastUpdated: 'Mar 15, 2026 9:30 AM'
    },
    notes: 'Patient is responding well to recent medication adjustments. Continue monitoring blood pressure daily. Remind about physical therapy appointment on Thursday.'
  },
  '2': {
    id: '2',
    name: 'Robert Williams',
    age: 82,
    gender: 'Male',
    phone: '(555) 234-5678',
    email: 'robert.w@email.com',
    address: '456 Oak Avenue, Springfield, IL 62702',
    admissionDate: 'March 1, 2026',
    conditions: ['Congestive Heart Failure', 'COPD', 'Dementia (Early Stage)'],
    medications: [
      { name: 'Furosemide', dosage: '40mg', frequency: 'Once daily' },
      { name: 'Albuterol', dosage: '90mcg', frequency: 'As needed' },
      { name: 'Donepezil', dosage: '5mg', frequency: 'Once daily at bedtime' },
    ],
    allergies: ['None known'],
    primaryPhysician: 'Dr. Amanda Lee',
    emergencyContact: {
      name: 'Sarah Williams (Daughter)',
      phone: '(555) 876-5432',
      relationship: 'Daughter'
    },
    recentVitals: {
      bloodPressure: '128/82',
      heartRate: '82 bpm',
      temperature: '98.1°F',
      weight: '178 lbs',
      lastUpdated: 'Mar 15, 2026 8:15 AM'
    },
    notes: 'New admission. Family reports increased confusion in evenings. Scheduled for cognitive assessment next week. Monitor fluid intake closely due to CHF.'
  },
  '3': {
    id: '3',
    name: 'John Davis',
    age: 65,
    gender: 'Male',
    phone: '(555) 345-6789',
    email: 'jdavis@email.com',
    address: '789 Pine Road, Springfield, IL 62703',
    admissionDate: 'February 10, 2026',
    conditions: ['Type 2 Diabetes', 'Peripheral Neuropathy', 'Mild Depression'],
    medications: [
      { name: 'Metformin', dosage: '1000mg', frequency: 'Twice daily with meals' },
      { name: 'Gabapentin', dosage: '300mg', frequency: 'Three times daily' },
      { name: 'Sertraline', dosage: '50mg', frequency: 'Once daily' },
    ],
    allergies: ['Latex'],
    primaryPhysician: 'Dr. Sarah Martinez',
    emergencyContact: {
      name: 'Emily Davis (Wife)',
      phone: '(555) 765-4321',
      relationship: 'Spouse'
    },
    recentVitals: {
      bloodPressure: '135/85',
      heartRate: '72 bpm',
      temperature: '98.6°F',
      weight: '192 lbs',
      lastUpdated: 'Mar 15, 2026 7:45 AM'
    },
    notes: 'Blood sugar levels improving with current regimen. Reports decreased neuropathy pain. Follow up with podiatry scheduled for next month.'
  }
};

export function PatientDetail() {
  const { patientId } = useParams<{ patientId: string }>();
  const navigate = useNavigate();
  const patient = patientId ? mockPatients[patientId] : null;

  // Update tab title when patient loads
  useEffect(() => {
    if (patient && (window as any).tabManager) {
      (window as any).tabManager.updateActiveTabTitle(`Patient: ${patient.name}`);
    }
  }, [patient]);

  if (!patient) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-center">
          <User size={64} style={{ color: 'var(--color-text-muted)', opacity: 0.3, margin: '0 auto' }} />
          <p 
            className="mt-4"
            style={{
              fontSize: 'var(--font-size-body)',
              color: 'var(--color-text-muted)',
            }}
          >
            Patient not found
          </p>
          <button
            onClick={() => navigate('/dashboard/patients')}
            className="mt-4 px-4 py-2 rounded-lg transition-all outline-none"
            style={{
              backgroundColor: 'var(--btn-primary-bg)',
              color: 'var(--btn-primary-fg)',
              fontSize: 'var(--font-size-body)',
              fontWeight: '500',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--btn-primary-hover-bg)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--btn-primary-bg)';
            }}
          >
            Back to Patient List
          </button>
        </div>
      </div>
    );
  }

  const openPatientInNewTab = (id: string) => {
    if ((window as any).tabManager) {
      (window as any).tabManager.openNewTab(`/dashboard/patients/${id}`);
    }
  };

  return (
    <div className="h-full flex flex-col overflow-auto">
      {/* Header */}
      <div 
        className="sticky top-0 z-10 p-6"
        style={{
          backgroundColor: 'var(--color-surface)',
          borderBottom: '1px solid var(--color-border)',
        }}
      >
        <div className="flex items-center justify-between mb-4">
          <BackButton label="Back to Patient List" onClick={() => navigate('/dashboard/patients')} />

          <button
            className="px-4 py-2 rounded-lg transition-all outline-none"
            style={{
              backgroundColor: 'var(--btn-primary-bg)',
              color: 'var(--btn-primary-fg)',
              fontSize: 'var(--font-size-body)',
              fontWeight: '500',
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
            onBlur={(e) => {
              e.currentTarget.style.outline = 'none';
            }}
          >
            Edit Patient Info
          </button>
        </div>

        {/* Patient Header */}
        <div className="flex items-start gap-4">
          <div 
            className="w-20 h-20 rounded-full flex items-center justify-center flex-shrink-0"
            style={{
              backgroundColor: 'var(--color-focus)',
              color: 'white',
              fontSize: 'var(--font-size-page)',
              fontWeight: '600',
            }}
          >
            {patient.name.split(' ').map((n: string) => n[0]).join('')}
          </div>
          <div className="flex-1">
            <h1 
              style={{
                fontSize: 'var(--font-size-page)',
                fontWeight: '600',
                color: 'var(--color-text)',
                marginBottom: '8px',
              }}
            >
              {patient.name}
            </h1>
            <div className="flex flex-wrap gap-4">
              <span 
                style={{
                  fontSize: 'var(--font-size-body)',
                  color: 'var(--color-text-muted)',
                }}
              >
                {patient.age} years old • {patient.gender}
              </span>
              <span 
                style={{
                  fontSize: 'var(--font-size-body)',
                  color: 'var(--color-text-muted)',
                }}
              >
                Admitted: {patient.admissionDate}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Contact Information */}
          <div 
            className="p-6 rounded-lg"
            style={{
              backgroundColor: 'var(--color-surface)',
              border: '1px solid var(--color-border)',
              boxShadow: 'var(--shadow-sm)',
            }}
          >
            <h2 
              className="mb-4"
              style={{
                fontSize: 'var(--font-size-section)',
                fontWeight: '600',
                color: 'var(--color-text)',
              }}
            >
              Contact Information
            </h2>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Phone size={18} style={{ color: 'var(--color-focus)' }} />
                <span style={{ fontSize: 'var(--font-size-body)', color: 'var(--color-text)' }}>
                  {patient.phone}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Mail size={18} style={{ color: 'var(--color-focus)' }} />
                <span style={{ fontSize: 'var(--font-size-body)', color: 'var(--color-text)' }}>
                  {patient.email}
                </span>
              </div>
              <div className="flex items-start gap-3">
                <MapPin size={18} style={{ color: 'var(--color-focus)', marginTop: '2px' }} />
                <span style={{ fontSize: 'var(--font-size-body)', color: 'var(--color-text)' }}>
                  {patient.address}
                </span>
              </div>
            </div>
          </div>

          {/* Emergency Contact */}
          <div 
            className="p-6 rounded-lg"
            style={{
              backgroundColor: 'var(--color-surface)',
              border: '1px solid var(--color-border)',
              boxShadow: 'var(--shadow-sm)',
            }}
          >
            <h2 
              className="mb-4"
              style={{
                fontSize: 'var(--font-size-section)',
                fontWeight: '600',
                color: 'var(--color-text)',
              }}
            >
              Emergency Contact
            </h2>
            <div className="space-y-2">
              <p style={{ fontSize: 'var(--font-size-body)', color: 'var(--color-text)', fontWeight: '600' }}>
                {patient.emergencyContact.name}
              </p>
              <p style={{ fontSize: 'var(--font-size-body)', color: 'var(--color-text-muted)' }}>
                {patient.emergencyContact.relationship}
              </p>
              <div className="flex items-center gap-2 mt-2">
                <Phone size={16} style={{ color: 'var(--color-focus)' }} />
                <span style={{ fontSize: 'var(--font-size-body)', color: 'var(--color-text)' }}>
                  {patient.emergencyContact.phone}
                </span>
              </div>
            </div>
          </div>

          {/* Recent Vitals */}
          <div 
            className="p-6 rounded-lg"
            style={{
              backgroundColor: 'var(--color-surface)',
              border: '1px solid var(--color-border)',
              boxShadow: 'var(--shadow-sm)',
            }}
          >
            <div className="flex items-center gap-2 mb-4">
              <Activity size={20} style={{ color: 'var(--color-focus)' }} />
              <h2 
                style={{
                  fontSize: 'var(--font-size-section)',
                  fontWeight: '600',
                  color: 'var(--color-text)',
                }}
              >
                Recent Vitals
              </h2>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p style={{ fontSize: 'var(--font-size-small)', color: 'var(--color-text-muted)' }}>
                  Blood Pressure
                </p>
                <p style={{ fontSize: 'var(--font-size-body)', color: 'var(--color-text)', fontWeight: '600' }}>
                  {patient.recentVitals.bloodPressure}
                </p>
              </div>
              <div>
                <p style={{ fontSize: 'var(--font-size-small)', color: 'var(--color-text-muted)' }}>
                  Heart Rate
                </p>
                <p style={{ fontSize: 'var(--font-size-body)', color: 'var(--color-text)', fontWeight: '600' }}>
                  {patient.recentVitals.heartRate}
                </p>
              </div>
              <div>
                <p style={{ fontSize: 'var(--font-size-small)', color: 'var(--color-text-muted)' }}>
                  Temperature
                </p>
                <p style={{ fontSize: 'var(--font-size-body)', color: 'var(--color-text)', fontWeight: '600' }}>
                  {patient.recentVitals.temperature}
                </p>
              </div>
              <div>
                <p style={{ fontSize: 'var(--font-size-small)', color: 'var(--color-text-muted)' }}>
                  Weight
                </p>
                <p style={{ fontSize: 'var(--font-size-body)', color: 'var(--color-text)', fontWeight: '600' }}>
                  {patient.recentVitals.weight}
                </p>
              </div>
            </div>
            <p 
              className="mt-4"
              style={{ fontSize: 'var(--font-size-small)', color: 'var(--color-text-muted)' }}
            >
              Last updated: {patient.recentVitals.lastUpdated}
            </p>
          </div>

          {/* Medical Conditions */}
          <div 
            className="p-6 rounded-lg"
            style={{
              backgroundColor: 'var(--color-surface)',
              border: '1px solid var(--color-border)',
              boxShadow: 'var(--shadow-sm)',
            }}
          >
            <h2 
              className="mb-4"
              style={{
                fontSize: 'var(--font-size-section)',
                fontWeight: '600',
                color: 'var(--color-text)',
              }}
            >
              Medical Conditions
            </h2>
            <ul className="space-y-2">
              {patient.conditions.map((condition: string, index: number) => (
                <li 
                  key={index}
                  className="flex items-center gap-2"
                  style={{
                    fontSize: 'var(--font-size-body)',
                    color: 'var(--color-text)',
                  }}
                >
                  <div 
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ backgroundColor: 'var(--color-focus)' }}
                  />
                  {condition}
                </li>
              ))}
            </ul>

            <div className="mt-4 pt-4" style={{ borderTop: '1px solid var(--color-border)' }}>
              <h3 
                className="mb-2"
                style={{
                  fontSize: 'var(--font-size-body)',
                  fontWeight: '600',
                  color: 'var(--color-text)',
                }}
              >
                Allergies
              </h3>
              <div className="flex flex-wrap gap-2">
                {patient.allergies.map((allergy: string, index: number) => (
                  <span 
                    key={index}
                    className="px-3 py-1 rounded-full"
                    style={{
                      backgroundColor: 'var(--color-danger-bg)',
                      color: 'var(--color-danger)',
                      fontSize: 'var(--font-size-small)',
                      fontWeight: '500',
                    }}
                  >
                    {allergy}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Medications */}
          <div 
            className="p-6 rounded-lg lg:col-span-2"
            style={{
              backgroundColor: 'var(--color-surface)',
              border: '1px solid var(--color-border)',
              boxShadow: 'var(--shadow-sm)',
            }}
          >
            <div className="flex items-center gap-2 mb-4">
              <Pill size={20} style={{ color: 'var(--color-focus)' }} />
              <h2 
                style={{
                  fontSize: 'var(--font-size-section)',
                  fontWeight: '600',
                  color: 'var(--color-text)',
                }}
              >
                Current Medications
              </h2>
            </div>
            <div className="space-y-3">
              {patient.medications.map((med: any, index: number) => (
                <div 
                  key={index}
                  className="p-4 rounded-lg flex items-center justify-between"
                  style={{
                    backgroundColor: 'var(--color-background)',
                    border: '1px solid var(--color-border)',
                  }}
                >
                  <div>
                    <p 
                      style={{
                        fontSize: 'var(--font-size-body)',
                        fontWeight: '600',
                        color: 'var(--color-text)',
                      }}
                    >
                      {med.name}
                    </p>
                    <p style={{ fontSize: 'var(--font-size-small)', color: 'var(--color-text-muted)' }}>
                      {med.dosage} • {med.frequency}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Care Notes */}
          <div 
            className="p-6 rounded-lg lg:col-span-2"
            style={{
              backgroundColor: 'var(--color-surface)',
              border: '1px solid var(--color-border)',
              boxShadow: 'var(--shadow-sm)',
            }}
          >
            <div className="flex items-center gap-2 mb-4">
              <FileText size={20} style={{ color: 'var(--color-focus)' }} />
              <h2 
                style={{
                  fontSize: 'var(--font-size-section)',
                  fontWeight: '600',
                  color: 'var(--color-text)',
                }}
              >
                Care Notes
              </h2>
            </div>
            <p 
              style={{
                fontSize: 'var(--font-size-body)',
                color: 'var(--color-text)',
                lineHeight: 'var(--line-height-base)',
              }}
            >
              {patient.notes}
            </p>
          </div>

          {/* Quick Links to Other Patients */}
          <div 
            className="p-6 rounded-lg lg:col-span-2"
            style={{
              backgroundColor: 'var(--color-surface)',
              border: '1px solid var(--color-border)',
              boxShadow: 'var(--shadow-sm)',
            }}
          >
            <h2 
              className="mb-4"
              style={{
                fontSize: 'var(--font-size-section)',
                fontWeight: '600',
                color: 'var(--color-text)',
              }}
            >
              Open Another Patient (Demo)
            </h2>
            <p 
              className="mb-4"
              style={{
                fontSize: 'var(--font-size-body)',
                color: 'var(--color-text-muted)',
              }}
            >
              Click to open other patient records in new tabs:
            </p>
            <div className="flex flex-wrap gap-3">
              {Object.values(mockPatients)
                .filter((p: any) => p.id !== patient.id)
                .map((otherPatient: any) => (
                  <button
                    key={otherPatient.id}
                    onClick={() => openPatientInNewTab(otherPatient.id)}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg transition-all outline-none"
                    style={{
                      backgroundColor: 'var(--btn-secondary-bg)',
                      color: 'var(--btn-secondary-fg)',
                      fontSize: 'var(--font-size-body)',
                      fontWeight: '500',
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
                    <ExternalLink size={16} />
                    <span>{otherPatient.name}</span>
                  </button>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}