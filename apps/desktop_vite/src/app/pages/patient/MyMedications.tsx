import { Pill, Clock, CheckCircle, AlertCircle, Info } from 'lucide-react';
import { BackButton } from '../../components/BackButton';
import { useState } from 'react';

export function MyMedications() {
  const [medications] = useState([
    {
      id: 1,
      name: 'Lisinopril',
      dosage: '10mg',
      frequency: 'Once daily',
      time: '9:00 AM',
      taken: true,
      instructions: 'Take with breakfast',
      purpose: 'Blood pressure management',
    },
    {
      id: 2,
      name: 'Metformin',
      dosage: '500mg',
      frequency: 'Twice daily',
      time: '9:00 AM, 6:00 PM',
      taken: true,
      instructions: 'Take with meals',
      purpose: 'Blood sugar control',
    },
    {
      id: 3,
      name: 'Atorvastatin',
      dosage: '20mg',
      frequency: 'Once daily',
      time: '9:00 PM',
      taken: false,
      instructions: 'Take at bedtime',
      purpose: 'Cholesterol management',
    },
  ]);

  return (
    <div className="h-full flex flex-col p-6">
      {/* Back Button */}
      <div className="mb-4">
        <BackButton />
      </div>

      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-4">
          <div
            className="p-3 rounded-lg"
            style={{
              backgroundColor: 'var(--btn-primary-bg)',
              color: 'var(--btn-primary-fg)',
            }}
          >
            <Pill size={24} aria-hidden="true" />
          </div>
          <h1
            style={{
              fontSize: 'var(--font-size-page)',
              fontWeight: '600',
              color: 'var(--color-text)',
            }}
          >
            My Medications
          </h1>
        </div>
        <p
          style={{
            fontSize: 'var(--font-size-body)',
            color: 'var(--color-text-muted)',
          }}
        >
          Track your daily medications and schedules
        </p>
      </div>

      <div className="flex-1 overflow-y-auto">
        {/* Today's Status */}
        <div
          className="p-4 rounded-lg mb-6"
          role="status"
          aria-label="Today's medication status"
          style={{
            backgroundColor: 'var(--color-surface)',
            border: '1px solid var(--color-border)',
          }}
        >
          <div className="flex items-center justify-between">
            <div>
              <p
                style={{
                  fontSize: 'var(--font-size-body)',
                  color: 'var(--color-text)',
                  fontWeight: '500',
                }}
              >
                Today's Progress
              </p>
              <p
                className="mt-1"
                style={{
                  fontSize: 'var(--font-size-small)',
                  color: 'var(--color-text-muted)',
                }}
              >
                {medications.filter((m) => m.taken).length} of {medications.length} medications taken
              </p>
            </div>
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center"
              style={{
                backgroundColor: 'var(--color-bg)',
                border: `3px solid var(--color-focus)`,
              }}
            >
              <span
                style={{
                  fontSize: 'var(--font-size-body)',
                  fontWeight: '600',
                  color: 'var(--color-text)',
                }}
              >
                {Math.round((medications.filter((m) => m.taken).length / medications.length) * 100)}%
              </span>
            </div>
          </div>
        </div>

        {/* Medications List */}
        <div className="space-y-4" role="list" aria-label="Medication list">
          {medications.map((med) => (
            <article
              key={med.id}
              className="p-5 rounded-lg"
              role="listitem"
              style={{
                backgroundColor: 'var(--color-surface)',
                border: '1px solid var(--color-border)',
                boxShadow: 'var(--shadow-sm)',
              }}
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start gap-3">
                  <div className="pt-1">
                    {med.taken ? (
                      <CheckCircle
                        size={24}
                        style={{ color: 'var(--color-success)' }}
                        aria-label="Medication taken"
                      />
                    ) : (
                      <AlertCircle
                        size={24}
                        style={{ color: 'var(--color-warning)' }}
                        aria-label="Medication pending"
                      />
                    )}
                  </div>
                  <div>
                    <h3
                      style={{
                        fontSize: 'var(--font-size-section)',
                        fontWeight: '600',
                        color: 'var(--color-text)',
                      }}
                    >
                      {med.name}
                    </h3>
                    <p
                      style={{
                        fontSize: 'var(--font-size-body)',
                        color: 'var(--color-text-muted)',
                      }}
                    >
                      {med.dosage}
                    </p>
                  </div>
                </div>
                <span
                  className="px-3 py-1 rounded-full"
                  style={{
                    backgroundColor: med.taken ? 'var(--color-success-bg)' : 'var(--color-warning-bg)',
                    color: med.taken ? 'var(--color-success)' : 'var(--color-warning)',
                    fontSize: 'var(--font-size-small)',
                    fontWeight: '500',
                  }}
                >
                  {med.taken ? 'Taken' : 'Pending'}
                </span>
              </div>

              {/* Details Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Clock size={16} style={{ color: 'var(--color-focus)' }} aria-hidden="true" />
                    <p
                      style={{
                        fontSize: 'var(--font-size-small)',
                        color: 'var(--color-text-muted)',
                        fontWeight: '500',
                      }}
                    >
                      Schedule
                    </p>
                  </div>
                  <p
                    style={{
                      fontSize: 'var(--font-size-body)',
                      color: 'var(--color-text)',
                    }}
                  >
                    {med.frequency} at {med.time}
                  </p>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Info size={16} style={{ color: 'var(--color-focus)' }} aria-hidden="true" />
                    <p
                      style={{
                        fontSize: 'var(--font-size-small)',
                        color: 'var(--color-text-muted)',
                        fontWeight: '500',
                      }}
                    >
                      Purpose
                    </p>
                  </div>
                  <p
                    style={{
                      fontSize: 'var(--font-size-body)',
                      color: 'var(--color-text)',
                    }}
                  >
                    {med.purpose}
                  </p>
                </div>
              </div>

              {/* Instructions */}
              <div
                className="mt-4 p-3 rounded-lg"
                style={{
                  backgroundColor: 'var(--color-bg)',
                }}
              >
                <p
                  style={{
                    fontSize: 'var(--font-size-small)',
                    color: 'var(--color-text-muted)',
                    fontWeight: '500',
                  }}
                >
                  Instructions
                </p>
                <p
                  className="mt-1"
                  style={{
                    fontSize: 'var(--font-size-body)',
                    color: 'var(--color-text)',
                  }}
                >
                  {med.instructions}
                </p>
              </div>
            </article>
          ))}
        </div>

        {/* Important Notice */}
        <div
          className="mt-6 p-4 rounded-lg"
          role="note"
          aria-label="Important medication notice"
          style={{
            backgroundColor: 'var(--color-info-bg)',
            border: '1px solid var(--color-info)',
          }}
        >
          <div className="flex gap-3">
            <Info size={20} style={{ color: 'var(--color-info)', flexShrink: 0 }} aria-hidden="true" />
            <div>
              <p
                style={{
                  fontSize: 'var(--font-size-body)',
                  color: 'var(--color-text)',
                  fontWeight: '500',
                }}
              >
                Important Reminder
              </p>
              <p
                className="mt-1"
                style={{
                  fontSize: 'var(--font-size-small)',
                  color: 'var(--color-text-muted)',
                }}
              >
                Never adjust your medication dosage without consulting your healthcare provider. If you miss a dose, contact your care team for guidance.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
