import { FileText, Clock, User, CheckCircle, AlertCircle } from 'lucide-react';
import { BackButton } from '../../components/BackButton';

export function MyCare() {
  const careGoals = [
    { id: 1, goal: 'Take morning medications by 9 AM', status: 'completed', dueTime: '9:00 AM' },
    { id: 2, goal: 'Complete physical therapy exercises', status: 'pending', dueTime: '2:00 PM' },
    { id: 3, goal: 'Evening walk for 15 minutes', status: 'pending', dueTime: '6:00 PM' },
  ];

  const careTeam = [
    { name: 'Dr. Sarah Johnson', role: 'Primary Physician', contact: 'sjohnson@hospital.com' },
    { name: 'Michael Chen', role: 'Physical Therapist', contact: 'mchen@therapy.com' },
    { name: 'Emma Williams', role: 'Primary Caregiver', contact: 'emma.w@careconnect.com' },
  ];

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
            <FileText size={24} aria-hidden="true" />
          </div>
          <h1
            style={{
              fontSize: 'var(--font-size-page)',
              fontWeight: '600',
              color: 'var(--color-text)',
            }}
          >
            My Care Plan
          </h1>
        </div>
        <p
          style={{
            fontSize: 'var(--font-size-body)',
            color: 'var(--color-text-muted)',
          }}
        >
          Your personalized care plan and daily goals
        </p>
      </div>

      <div className="flex-1 overflow-y-auto space-y-6">
        {/* Today's Goals */}
        <section
          className="p-6 rounded-lg"
          role="region"
          aria-label="Today's care goals"
          style={{
            backgroundColor: 'var(--color-surface)',
            border: '1px solid var(--color-border)',
            boxShadow: 'var(--shadow-sm)',
          }}
        >
          <div className="flex items-center gap-3 mb-4">
            <Clock size={20} style={{ color: 'var(--color-focus)' }} aria-hidden="true" />
            <h2
              style={{
                fontSize: 'var(--font-size-section)',
                fontWeight: '600',
                color: 'var(--color-text)',
              }}
            >
              Today's Goals
            </h2>
          </div>

          <div className="space-y-3">
            {careGoals.map((goal) => (
              <div
                key={goal.id}
                className="flex items-start gap-3 p-4 rounded-lg"
                style={{
                  backgroundColor: 'var(--color-bg)',
                  border: '1px solid var(--color-border)',
                }}
              >
                <div className="pt-0.5">
                  {goal.status === 'completed' ? (
                    <CheckCircle
                      size={20}
                      style={{ color: 'var(--color-success)' }}
                      aria-label="Completed"
                    />
                  ) : (
                    <AlertCircle
                      size={20}
                      style={{ color: 'var(--color-text-muted)' }}
                      aria-label="Pending"
                    />
                  )}
                </div>
                <div className="flex-1">
                  <p
                    style={{
                      fontSize: 'var(--font-size-body)',
                      color: goal.status === 'completed' ? 'var(--color-text-muted)' : 'var(--color-text)',
                      textDecoration: goal.status === 'completed' ? 'line-through' : 'none',
                    }}
                  >
                    {goal.goal}
                  </p>
                  <p
                    className="mt-1"
                    style={{
                      fontSize: 'var(--font-size-small)',
                      color: 'var(--color-text-muted)',
                    }}
                  >
                    Due: {goal.dueTime}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Care Team */}
        <section
          className="p-6 rounded-lg"
          role="region"
          aria-label="Your care team"
          style={{
            backgroundColor: 'var(--color-surface)',
            border: '1px solid var(--color-border)',
            boxShadow: 'var(--shadow-sm)',
          }}
        >
          <div className="flex items-center gap-3 mb-4">
            <User size={20} style={{ color: 'var(--color-focus)' }} aria-hidden="true" />
            <h2
              style={{
                fontSize: 'var(--font-size-section)',
                fontWeight: '600',
                color: 'var(--color-text)',
              }}
            >
              Your Care Team
            </h2>
          </div>

          <div className="space-y-3">
            {careTeam.map((member, index) => (
              <div
                key={index}
                className="p-4 rounded-lg"
                style={{
                  backgroundColor: 'var(--color-bg)',
                  border: '1px solid var(--color-border)',
                }}
              >
                <h3
                  style={{
                    fontSize: 'var(--font-size-body)',
                    fontWeight: '600',
                    color: 'var(--color-text)',
                  }}
                >
                  {member.name}
                </h3>
                <p
                  className="mt-1"
                  style={{
                    fontSize: 'var(--font-size-body)',
                    color: 'var(--color-text-muted)',
                  }}
                >
                  {member.role}
                </p>
                <a
                  href={`mailto:${member.contact}`}
                  className="mt-2 inline-block outline-none"
                  aria-label={`Email ${member.name}`}
                  style={{
                    fontSize: 'var(--font-size-small)',
                    color: 'var(--color-focus)',
                    transition: 'var(--transition-fast)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.textDecoration = 'underline';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.textDecoration = 'none';
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.outline = `var(--focus-ring-width) solid var(--focus-ring-color)`;
                    e.currentTarget.style.outlineOffset = 'var(--focus-ring-offset)';
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.outline = 'none';
                  }}
                >
                  {member.contact}
                </a>
              </div>
            ))}
          </div>
        </section>

        {/* Care Instructions */}
        <section
          className="p-6 rounded-lg"
          role="region"
          aria-label="Care instructions"
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
            Important Care Instructions
          </h2>
          <ul className="space-y-3">
            <li
              style={{
                fontSize: 'var(--font-size-body)',
                color: 'var(--color-text)',
                paddingLeft: '24px',
                position: 'relative',
              }}
            >
              <span
                style={{
                  position: 'absolute',
                  left: 0,
                  color: 'var(--color-focus)',
                }}
              >
                •
              </span>
              Take all medications with food to avoid stomach upset
            </li>
            <li
              style={{
                fontSize: 'var(--font-size-body)',
                color: 'var(--color-text)',
                paddingLeft: '24px',
                position: 'relative',
              }}
            >
              <span
                style={{
                  position: 'absolute',
                  left: 0,
                  color: 'var(--color-focus)',
                }}
              >
                •
              </span>
              Monitor blood pressure daily before morning medication
            </li>
            <li
              style={{
                fontSize: 'var(--font-size-body)',
                color: 'var(--color-text)',
                paddingLeft: '24px',
                position: 'relative',
              }}
            >
              <span
                style={{
                  position: 'absolute',
                  left: 0,
                  color: 'var(--color-focus)',
                }}
              >
                •
              </span>
              Contact your care team if you experience dizziness or fatigue
            </li>
            <li
              style={{
                fontSize: 'var(--font-size-body)',
                color: 'var(--color-text)',
                paddingLeft: '24px',
                position: 'relative',
              }}
            >
              <span
                style={{
                  position: 'absolute',
                  left: 0,
                  color: 'var(--color-focus)',
                }}
              >
                •
              </span>
              Stay hydrated - aim for 8 glasses of water per day
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
}
