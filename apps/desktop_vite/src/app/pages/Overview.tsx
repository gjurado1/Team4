import { 
  Calendar,
  Pill,
  Users,
  FileText,
  Clock,
  Heart,
  TrendingUp,
  AlertCircle,
  Lightbulb,
  X
} from 'lucide-react';
import { BackButton } from '../components/BackButton';
import { useUser } from '../contexts/UserContext';
import { useState } from 'react';

export function Overview() {
  const { userName } = useUser();
  const displayName = userName?.trim() || 'there';
  const [showMenuTip, setShowMenuTip] = useState<boolean>(() => {
    return localStorage.getItem('careconnect-menu-tip-dismissed') !== 'true';
  });

  const upcomingTasks = [
    { time: '9:00 AM', task: 'Morning Medication', type: 'medication', priority: 'high' },
    { time: '10:30 AM', task: 'Doctor Appointment - Dr. Smith', type: 'appointment', priority: 'high' },
    { time: '2:00 PM', task: 'Physical Therapy Session', type: 'appointment', priority: 'medium' },
    { time: '6:00 PM', task: 'Evening Medication', type: 'medication', priority: 'high' },
  ];

  const stats = [
    { label: 'Active Care Plans', value: '3', icon: FileText, color: 'var(--color-focus)' },
    { label: 'This Week Appointments', value: '5', icon: Calendar, color: 'var(--color-warning)' },
    { label: 'Care Contacts', value: '12', icon: Users, color: 'var(--color-success)' },
    { label: 'Medications', value: '8', icon: Pill, color: 'var(--btn-primary-bg)' },
  ];

  return (
    <div 
      className="flex-1 overflow-auto p-6"
      style={{
        backgroundColor: 'var(--color-bg)',
      }}
    >
      {/* Back Button */}
      <div className="mb-4">
        <BackButton />
      </div>

      {/* Header */}
      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <h1 
            className="mb-2"
            style={{
              fontSize: '28px',
              fontWeight: '600',
              color: 'var(--color-text)',
            }}
          >
            Good morning, {displayName}
          </h1>
          <p 
            style={{
              fontSize: 'var(--font-size-body)',
              color: 'var(--color-text-muted)',
            }}
          >
            You have 4 tasks scheduled for today
          </p>
        </div>

        {showMenuTip && (
          <div
            className="max-w-md rounded-lg px-4 py-3"
            style={{
              backgroundColor: 'var(--color-surface)',
              border: '1px solid var(--color-border)',
              boxShadow: 'var(--shadow-sm)',
            }}
            role="status"
            aria-live="polite"
          >
            <div className="flex items-start gap-3">
              <Lightbulb size={18} style={{ color: 'var(--color-focus)', marginTop: '2px' }} />
              <div className="flex-1">
                <div
                  style={{
                    fontSize: 'var(--font-size-label)',
                    fontWeight: '600',
                    color: 'var(--color-text)',
                    marginBottom: '2px',
                  }}
                >
                  Tip
                </div>
                <div
                  style={{
                    fontSize: 'var(--font-size-small)',
                    color: 'var(--color-text-muted)',
                    lineHeight: 1.5,
                  }}
                >
                  The radial MENU button is draggable. Move it anywhere on the screen that works best for you.
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  setShowMenuTip(false);
                  localStorage.setItem('careconnect-menu-tip-dismissed', 'true');
                }}
                className="rounded p-1 outline-none"
                style={{ color: 'var(--color-text-muted)' }}
                aria-label="Dismiss menu tip"
              >
                <X size={14} />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div
              key={idx}
              className="rounded-lg p-5 transition-all"
              style={{
                backgroundColor: 'var(--color-surface)',
                border: '1px solid var(--color-border)',
                boxShadow: 'var(--shadow-sm)',
                transition: 'var(--transition-fast)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = 'var(--shadow-panel)';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <div className="flex items-center justify-between mb-3">
                <div 
                  className="p-2 rounded"
                  style={{
                    backgroundColor: stat.color + '20',
                  }}
                >
                  <Icon size={20} style={{ color: stat.color }} />
                </div>
                <TrendingUp size={16} style={{ color: 'var(--color-success)' }} />
              </div>
              <div 
                className="mb-1"
                style={{
                  fontSize: '24px',
                  fontWeight: '600',
                  color: 'var(--color-text)',
                }}
              >
                {stat.value}
              </div>
              <div 
                style={{
                  fontSize: 'var(--font-size-small)',
                  color: 'var(--color-text-muted)',
                }}
              >
                {stat.label}
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Today's Schedule */}
        <div 
          className="lg:col-span-2 rounded-lg p-6"
          style={{
            backgroundColor: 'var(--color-surface)',
            border: '1px solid var(--color-border)',
            boxShadow: 'var(--shadow-panel)',
          }}
        >
          <div className="flex items-center justify-between mb-5">
            <h2 
              style={{
                fontSize: 'var(--font-size-section)',
                fontWeight: '600',
                color: 'var(--color-text)',
              }}
            >
              Today's Schedule
            </h2>
            <button
              className="px-3 py-1.5 rounded transition-colors outline-none"
              style={{
                backgroundColor: 'var(--btn-secondary-bg)',
                color: 'var(--btn-secondary-fg)',
                fontSize: 'var(--font-size-body)',
                transition: 'var(--transition-fast)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--btn-secondary-hover-bg)';
                e.currentTarget.style.color = 'var(--btn-secondary-hover-fg)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--btn-secondary-bg)';
                e.currentTarget.style.color = 'var(--btn-secondary-fg)';
              }}
            >
              View All
            </button>
          </div>

          <div className="space-y-3">
            {upcomingTasks.map((task, idx) => (
              <div
                key={idx}
                className="flex items-start gap-4 p-4 rounded-lg transition-colors"
                style={{
                  backgroundColor: 'var(--color-panel)',
                  border: '1px solid var(--color-border)',
                  transition: 'var(--transition-fast)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--menu-hover-bg)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--color-panel)';
                }}
              >
                <div 
                  className="flex items-center justify-center w-10 h-10 rounded-full flex-shrink-0"
                  style={{
                    backgroundColor: task.priority === 'high' ? 'var(--color-error)20' : 'var(--color-warning)20',
                  }}
                >
                  {task.type === 'medication' ? (
                    <Pill size={18} style={{ color: task.priority === 'high' ? 'var(--color-error)' : 'var(--color-warning)' }} />
                  ) : (
                    <Calendar size={18} style={{ color: task.priority === 'high' ? 'var(--color-error)' : 'var(--color-warning)' }} />
                  )}
                </div>
                <div className="flex-1">
                  <div 
                    className="mb-1"
                    style={{
                      fontSize: 'var(--font-size-body)',
                      fontWeight: '500',
                      color: 'var(--color-text)',
                    }}
                  >
                    {task.task}
                  </div>
                  <div 
                    className="flex items-center gap-1"
                    style={{
                      fontSize: 'var(--font-size-small)',
                      color: 'var(--color-text-muted)',
                    }}
                  >
                    <Clock size={12} />
                    <span>{task.time}</span>
                  </div>
                </div>
                {task.priority === 'high' && (
                  <AlertCircle size={18} style={{ color: 'var(--color-error)' }} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions & Alerts */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <div 
            className="rounded-lg p-6"
            style={{
              backgroundColor: 'var(--color-surface)',
              border: '1px solid var(--color-border)',
              boxShadow: 'var(--shadow-panel)',
            }}
          >
            <h3 
              className="mb-4"
              style={{
                fontSize: 'var(--font-size-section)',
                fontWeight: '600',
                color: 'var(--color-text)',
              }}
            >
              Quick Actions
            </h3>
            <div className="space-y-2">
              {[
                { label: 'Add Medication', icon: Pill },
                { label: 'Schedule Appointment', icon: Calendar },
                { label: 'Update Care Plan', icon: FileText },
                { label: 'Contact Provider', icon: Users },
              ].map((action, idx) => {
                const Icon = action.icon;
                return (
                  <button
                    key={idx}
                    className="w-full flex items-center gap-3 p-3 rounded-lg transition-colors outline-none text-left"
                    style={{
                      backgroundColor: 'var(--color-panel)',
                      color: 'var(--color-text)',
                      fontSize: 'var(--font-size-body)',
                      transition: 'var(--transition-fast)',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = 'var(--menu-hover-bg)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'var(--color-panel)';
                    }}
                  >
                    <Icon size={18} style={{ color: 'var(--color-text-muted)' }} />
                    <span>{action.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Health Summary */}
          <div 
            className="rounded-lg p-6"
            style={{
              backgroundColor: 'var(--color-surface)',
              border: '1px solid var(--color-border)',
              boxShadow: 'var(--shadow-panel)',
            }}
          >
            <div className="flex items-center gap-2 mb-4">
              <Heart size={20} style={{ color: 'var(--color-error)' }} />
              <h3 
                style={{
                  fontSize: 'var(--font-size-section)',
                  fontWeight: '600',
                  color: 'var(--color-text)',
                }}
              >
                Health Summary
              </h3>
            </div>
            <div className="space-y-3">
              <div>
                <div 
                  className="flex justify-between mb-1"
                  style={{
                    fontSize: 'var(--font-size-small)',
                    color: 'var(--color-text-muted)',
                  }}
                >
                  <span>Medication Adherence</span>
                  <span>92%</span>
                </div>
                <div 
                  className="w-full h-2 rounded-full overflow-hidden"
                  style={{
                    backgroundColor: 'var(--color-panel)',
                  }}
                >
                  <div 
                    className="h-full rounded-full"
                    style={{
                      width: '92%',
                      backgroundColor: 'var(--color-success)',
                    }}
                  />
                </div>
              </div>
              <div>
                <div 
                  className="flex justify-between mb-1"
                  style={{
                    fontSize: 'var(--font-size-small)',
                    color: 'var(--color-text-muted)',
                  }}
                >
                  <span>Appointment Completion</span>
                  <span>100%</span>
                </div>
                <div 
                  className="w-full h-2 rounded-full overflow-hidden"
                  style={{
                    backgroundColor: 'var(--color-panel)',
                  }}
                >
                  <div 
                    className="h-full rounded-full"
                    style={{
                      width: '100%',
                      backgroundColor: 'var(--color-success)',
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
