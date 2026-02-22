import { HeartPulse, Calendar, Pill, BookOpen, AlertCircle, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router';
import { useUser } from '../../contexts/UserContext';

export function PatientOverview() {
  const navigate = useNavigate();
  const { userName } = useUser();

  const quickStats = [
    { label: 'Medications Today', value: '2 of 3', status: 'pending', icon: Pill },
    { label: 'Next Appointment', value: 'Feb 22', status: 'upcoming', icon: Calendar },
    { label: 'Care Goals', value: '1 of 3', status: 'progress', icon: CheckCircle },
    { label: 'Journal Entries', value: '2 this week', status: 'complete', icon: BookOpen },
  ];

  const todayTasks = [
    { id: 1, task: 'Take evening medication', time: '9:00 PM', completed: false },
    { id: 2, task: 'Complete physical therapy exercises', time: '2:00 PM', completed: false },
    { id: 3, task: 'Record health journal entry', time: 'Anytime', completed: false },
  ];

  const upcomingEvents = [
    { id: 1, title: 'Follow-up with Dr. Johnson', date: 'Feb 22', time: '10:00 AM' },
    { id: 2, title: 'Physical Therapy Session', date: 'Feb 24', time: '2:00 PM' },
  ];

  return (
    <div className="h-full flex flex-col p-6">
      {/* Welcome Header */}
      <div className="mb-8">
        <h1
          className="mb-2"
          style={{
            fontSize: 'var(--font-size-page)',
            fontWeight: '600',
            color: 'var(--color-text)',
          }}
        >
          Welcome back, {userName || 'Patient'}!
        </h1>
        <p
          style={{
            fontSize: 'var(--font-size-body)',
            color: 'var(--color-text-muted)',
          }}
        >
          Here's your health overview for today
        </p>
      </div>

      <div className="flex-1 overflow-y-auto space-y-6">
        {/* Quick Stats */}
        <section
          role="region"
          aria-label="Quick health statistics"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickStats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div
                  key={index}
                  className="p-5 rounded-lg"
                  style={{
                    backgroundColor: 'var(--color-surface)',
                    border: '1px solid var(--color-border)',
                    boxShadow: 'var(--shadow-sm)',
                  }}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div
                      className="p-2 rounded-lg"
                      style={{
                        backgroundColor: 'var(--color-bg)',
                      }}
                    >
                      <Icon size={20} style={{ color: 'var(--color-focus)' }} aria-hidden="true" />
                    </div>
                    <p
                      style={{
                        fontSize: 'var(--font-size-small)',
                        color: 'var(--color-text-muted)',
                        fontWeight: '500',
                      }}
                    >
                      {stat.label}
                    </p>
                  </div>
                  <p
                    style={{
                      fontSize: '28px',
                      fontWeight: '600',
                      color: 'var(--color-text)',
                    }}
                  >
                    {stat.value}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Today's Tasks */}
          <section
            className="p-6 rounded-lg"
            role="region"
            aria-label="Today's tasks"
            style={{
              backgroundColor: 'var(--color-surface)',
              border: '1px solid var(--color-border)',
              boxShadow: 'var(--shadow-sm)',
            }}
          >
            <div className="flex items-center justify-between mb-4">
              <h2
                style={{
                  fontSize: 'var(--font-size-section)',
                  fontWeight: '600',
                  color: 'var(--color-text)',
                }}
              >
                Today's Tasks
              </h2>
              <span
                className="px-3 py-1 rounded-full"
                style={{
                  backgroundColor: 'var(--color-warning-bg)',
                  color: 'var(--color-warning)',
                  fontSize: 'var(--font-size-small)',
                  fontWeight: '500',
                }}
              >
                {todayTasks.filter((t) => !t.completed).length} Pending
              </span>
            </div>

            <div className="space-y-3">
              {todayTasks.map((task) => (
                <div
                  key={task.id}
                  className="flex items-start gap-3 p-3 rounded-lg"
                  style={{
                    backgroundColor: 'var(--color-bg)',
                  }}
                >
                  <div className="pt-0.5">
                    {task.completed ? (
                      <CheckCircle size={20} style={{ color: 'var(--color-success)' }} aria-hidden="true" />
                    ) : (
                      <AlertCircle size={20} style={{ color: 'var(--color-text-muted)' }} aria-hidden="true" />
                    )}
                  </div>
                  <div className="flex-1">
                    <p
                      style={{
                        fontSize: 'var(--font-size-body)',
                        color: task.completed ? 'var(--color-text-muted)' : 'var(--color-text)',
                        textDecoration: task.completed ? 'line-through' : 'none',
                      }}
                    >
                      {task.task}
                    </p>
                    <p
                      className="mt-0.5"
                      style={{
                        fontSize: 'var(--font-size-small)',
                        color: 'var(--color-text-muted)',
                      }}
                    >
                      {task.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => navigate('/dashboard/my-care')}
              className="w-full mt-4 py-2 rounded-lg transition-all outline-none"
              aria-label="View complete care plan"
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
              View Full Care Plan
            </button>
          </section>

          {/* Upcoming Appointments */}
          <section
            className="p-6 rounded-lg"
            role="region"
            aria-label="Upcoming appointments"
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
              Upcoming Appointments
            </h2>

            <div className="space-y-3">
              {upcomingEvents.map((event) => (
                <div
                  key={event.id}
                  className="p-4 rounded-lg"
                  style={{
                    backgroundColor: 'var(--color-bg)',
                    border: '1px solid var(--color-border)',
                  }}
                >
                  <p
                    style={{
                      fontSize: 'var(--font-size-body)',
                      fontWeight: '600',
                      color: 'var(--color-text)',
                    }}
                  >
                    {event.title}
                  </p>
                  <div className="flex items-center gap-4 mt-2">
                    <div className="flex items-center gap-2">
                      <Calendar size={14} style={{ color: 'var(--color-focus)' }} aria-hidden="true" />
                      <span
                        style={{
                          fontSize: 'var(--font-size-small)',
                          color: 'var(--color-text-muted)',
                        }}
                      >
                        {event.date}
                      </span>
                    </div>
                    <span
                      style={{
                        fontSize: 'var(--font-size-small)',
                        color: 'var(--color-text-muted)',
                      }}
                    >
                      {event.time}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => navigate('/dashboard/my-appointments')}
              className="w-full mt-4 py-2 rounded-lg transition-all outline-none"
              aria-label="View all appointments"
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
              View All Appointments
            </button>
          </section>
        </div>

        {/* Quick Actions */}
        <section
          className="p-6 rounded-lg"
          role="region"
          aria-label="Quick actions"
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
            Quick Actions
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button
              onClick={() => navigate('/dashboard/my-medications')}
              className="p-4 rounded-lg transition-all outline-none text-left"
              aria-label="View my medications"
              style={{
                backgroundColor: 'var(--color-bg)',
                border: '1px solid var(--color-border)',
                transition: 'var(--transition-medium)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--color-focus)';
                e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--color-border)';
                e.currentTarget.style.boxShadow = 'none';
              }}
              onFocus={(e) => {
                e.currentTarget.style.outline = `var(--focus-ring-width) solid var(--focus-ring-color)`;
                e.currentTarget.style.outlineOffset = 'var(--focus-ring-offset)';
              }}
              onBlur={(e) => {
                e.currentTarget.style.outline = 'none';
              }}
            >
              <Pill size={24} style={{ color: 'var(--color-focus)', marginBottom: '8px' }} aria-hidden="true" />
              <p
                style={{
                  fontSize: 'var(--font-size-body)',
                  fontWeight: '600',
                  color: 'var(--color-text)',
                }}
              >
                My Medications
              </p>
              <p
                className="mt-1"
                style={{
                  fontSize: 'var(--font-size-small)',
                  color: 'var(--color-text-muted)',
                }}
              >
                View medication schedule
              </p>
            </button>

            <button
              onClick={() => navigate('/dashboard/health-journal')}
              className="p-4 rounded-lg transition-all outline-none text-left"
              aria-label="Open health journal"
              style={{
                backgroundColor: 'var(--color-bg)',
                border: '1px solid var(--color-border)',
                transition: 'var(--transition-medium)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--color-focus)';
                e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--color-border)';
                e.currentTarget.style.boxShadow = 'none';
              }}
              onFocus={(e) => {
                e.currentTarget.style.outline = `var(--focus-ring-width) solid var(--focus-ring-color)`;
                e.currentTarget.style.outlineOffset = 'var(--focus-ring-offset)';
              }}
              onBlur={(e) => {
                e.currentTarget.style.outline = 'none';
              }}
            >
              <BookOpen size={24} style={{ color: 'var(--color-focus)', marginBottom: '8px' }} aria-hidden="true" />
              <p
                style={{
                  fontSize: 'var(--font-size-body)',
                  fontWeight: '600',
                  color: 'var(--color-text)',
                }}
              >
                Health Journal
              </p>
              <p
                className="mt-1"
                style={{
                  fontSize: 'var(--font-size-small)',
                  color: 'var(--color-text-muted)',
                }}
              >
                Track your daily health
              </p>
            </button>

            <button
              onClick={() => navigate('/dashboard/email')}
              className="p-4 rounded-lg transition-all outline-none text-left"
              aria-label="Check messages"
              style={{
                backgroundColor: 'var(--color-bg)',
                border: '1px solid var(--color-border)',
                transition: 'var(--transition-medium)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--color-focus)';
                e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--color-border)';
                e.currentTarget.style.boxShadow = 'none';
              }}
              onFocus={(e) => {
                e.currentTarget.style.outline = `var(--focus-ring-width) solid var(--focus-ring-color)`;
                e.currentTarget.style.outlineOffset = 'var(--focus-ring-offset)';
              }}
              onBlur={(e) => {
                e.currentTarget.style.outline = 'none';
              }}
            >
              <HeartPulse size={24} style={{ color: 'var(--color-focus)', marginBottom: '8px' }} aria-hidden="true" />
              <p
                style={{
                  fontSize: 'var(--font-size-body)',
                  fontWeight: '600',
                  color: 'var(--color-text)',
                }}
              >
                Messages
              </p>
              <p
                className="mt-1"
                style={{
                  fontSize: 'var(--font-size-small)',
                  color: 'var(--color-text-muted)',
                }}
              >
                Connect with care team
              </p>
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
