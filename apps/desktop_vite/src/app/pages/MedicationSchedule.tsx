import { Pill, Clock, Plus } from 'lucide-react';
import { BackButton } from '../components/BackButton';

export function MedicationSchedule() {
  const medications = [
    { 
      id: 1, 
      patient: 'Margaret Thompson', 
      medication: 'Metformin', 
      dosage: '500mg', 
      time: '08:00 AM',
      frequency: 'Daily',
      status: 'scheduled' as const
    },
    { 
      id: 2, 
      patient: 'Margaret Thompson', 
      medication: 'Lisinopril', 
      dosage: '10mg', 
      time: '08:00 AM',
      frequency: 'Daily',
      status: 'completed' as const
    },
    { 
      id: 3, 
      patient: 'Robert Chen', 
      medication: 'Pain Relief', 
      dosage: '400mg', 
      time: '12:00 PM',
      frequency: 'As needed',
      status: 'scheduled' as const
    },
    { 
      id: 4, 
      patient: 'Maria Garcia', 
      medication: 'Aspirin', 
      dosage: '81mg', 
      time: '09:00 AM',
      frequency: 'Daily',
      status: 'completed' as const
    },
  ];

  return (
    <div className="h-full flex flex-col p-6">
      {/* Back Button */}
      <div className="mb-4">
        <BackButton />
      </div>

      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div 
              className="p-3 rounded-lg"
              style={{
                backgroundColor: 'var(--btn-primary-bg)',
                color: 'var(--btn-primary-fg)',
              }}
            >
              <Pill size={24} />
            </div>
            <h1 
              style={{
                fontSize: 'var(--font-size-page)',
                fontWeight: '600',
                color: 'var(--color-text)',
              }}
            >
              Medication Schedule
            </h1>
          </div>
          <button
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg transition-all outline-none"
            style={{
              backgroundColor: 'var(--btn-primary-bg)',
              color: 'var(--btn-primary-fg)',
              fontSize: 'var(--font-size-body)',
              fontWeight: '500',
              transition: 'var(--transition-medium)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--btn-primary-hover-bg)';
              e.currentTarget.style.color = 'var(--btn-primary-hover-fg)';
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
          >
            <Plus size={18} />
            Add Medication
          </button>
        </div>

        <p 
          style={{
            fontSize: 'var(--font-size-body)',
            color: 'var(--color-text-muted)',
          }}
        >
          Today's Schedule • {new Date().toLocaleDateString('en-US', { 
            weekday: 'long', 
            month: 'long', 
            day: 'numeric', 
            year: 'numeric' 
          })}
        </p>
      </div>

      {/* Medication List */}
      <div className="flex-1 overflow-y-auto space-y-3">
        {medications.map((med) => (
          <div
            key={med.id}
            className="p-4 rounded-lg"
            style={{
              backgroundColor: 'var(--color-surface)',
              border: '1px solid var(--color-border)',
              boxShadow: 'var(--shadow-sm)',
            }}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 
                    style={{
                      fontSize: 'var(--font-size-section)',
                      fontWeight: '600',
                      color: 'var(--color-text)',
                    }}
                  >
                    {med.medication}
                  </h3>
                  <span
                    className="px-2 py-0.5 rounded text-xs"
                    style={{
                      backgroundColor: med.status === 'completed' 
                        ? 'var(--color-success-bg)' 
                        : 'var(--color-warning-bg)',
                      color: med.status === 'completed' 
                        ? 'var(--color-success-fg)' 
                        : 'var(--color-warning-fg)',
                    }}
                  >
                    {med.status === 'completed' ? 'Completed' : 'Scheduled'}
                  </span>
                </div>
                <p 
                  className="mb-1"
                  style={{
                    fontSize: 'var(--font-size-body)',
                    color: 'var(--color-text-muted)',
                  }}
                >
                  Patient: {med.patient}
                </p>
                <div className="flex items-center gap-4">
                  <span 
                    className="flex items-center gap-1.5"
                    style={{
                      fontSize: 'var(--font-size-body)',
                      color: 'var(--color-text-muted)',
                    }}
                  >
                    <Clock size={14} />
                    {med.time}
                  </span>
                  <span 
                    style={{
                      fontSize: 'var(--font-size-body)',
                      color: 'var(--color-text-muted)',
                    }}
                  >
                    Dosage: {med.dosage}
                  </span>
                  <span 
                    style={{
                      fontSize: 'var(--font-size-body)',
                      color: 'var(--color-text-muted)',
                    }}
                  >
                    {med.frequency}
                  </span>
                </div>
              </div>
              {med.status === 'scheduled' && (
                <button
                  className="px-4 py-2 rounded-lg transition-all outline-none"
                  style={{
                    backgroundColor: 'var(--btn-primary-bg)',
                    color: 'var(--btn-primary-fg)',
                    fontSize: 'var(--font-size-small)',
                    fontWeight: '500',
                    transition: 'var(--transition-fast)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'var(--btn-primary-hover-bg)';
                    e.currentTarget.style.color = 'var(--btn-primary-hover-fg)';
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
                >
                  Mark Complete
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}