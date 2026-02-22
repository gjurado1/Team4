import { Calendar, Clock, MapPin, Plus } from 'lucide-react';
import { BackButton } from '../components/BackButton';

export function Appointments() {
  const appointments = [
    { 
      id: 1, 
      patient: 'Margaret Thompson', 
      type: 'Home Visit - Checkup',
      date: '2026-02-20',
      time: '10:00 AM',
      duration: '45 min',
      location: '123 Oak Street, Springfield',
      status: 'upcoming' as const
    },
    { 
      id: 2, 
      patient: 'Robert Chen', 
      type: 'Physical Therapy Session',
      date: '2026-02-20',
      time: '02:00 PM',
      duration: '60 min',
      location: 'Care Center - Room 204',
      status: 'upcoming' as const
    },
    { 
      id: 3, 
      patient: 'Maria Garcia', 
      type: 'Cardiology Consultation',
      date: '2026-02-19',
      time: '11:00 AM',
      duration: '30 min',
      location: 'Springfield Medical Center',
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
              <Calendar size={24} />
            </div>
            <h1 
              style={{
                fontSize: 'var(--font-size-page)',
                fontWeight: '600',
                color: 'var(--color-text)',
              }}
            >
              Appointments
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
            Schedule Appointment
          </button>
        </div>

        <p 
          style={{
            fontSize: 'var(--font-size-body)',
            color: 'var(--color-text-muted)',
          }}
        >
          {new Date().toLocaleDateString('en-US', { 
            weekday: 'long', 
            month: 'long', 
            day: 'numeric', 
            year: 'numeric' 
          })}
        </p>
      </div>

      {/* Appointments List */}
      <div className="flex-1 overflow-y-auto space-y-4">
        {appointments.map((appointment) => (
          <div
            key={appointment.id}
            className="p-5 rounded-lg"
            style={{
              backgroundColor: 'var(--color-surface)',
              border: '1px solid var(--color-border)',
              boxShadow: 'var(--shadow-sm)',
            }}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 
                    style={{
                      fontSize: 'var(--font-size-section)',
                      fontWeight: '600',
                      color: 'var(--color-text)',
                    }}
                  >
                    {appointment.type}
                  </h3>
                  <span
                    className="px-2 py-0.5 rounded text-xs"
                    style={{
                      backgroundColor: appointment.status === 'completed' 
                        ? 'var(--color-success-bg)' 
                        : 'var(--color-info-bg)',
                      color: appointment.status === 'completed' 
                        ? 'var(--color-success-fg)' 
                        : 'var(--color-info-fg)',
                    }}
                  >
                    {appointment.status === 'completed' ? 'Completed' : 'Upcoming'}
                  </span>
                </div>
                <p 
                  className="mb-3"
                  style={{
                    fontSize: 'var(--font-size-body)',
                    color: 'var(--color-text)',
                  }}
                >
                  Patient: {appointment.patient}
                </p>
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <Calendar size={16} style={{ color: 'var(--color-text-muted)' }} />
                    <span 
                      style={{
                        fontSize: 'var(--font-size-body)',
                        color: 'var(--color-text-muted)',
                      }}
                    >
                      {new Date(appointment.date).toLocaleDateString('en-US', { 
                        weekday: 'long', 
                        month: 'short', 
                        day: 'numeric', 
                        year: 'numeric' 
                      })}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock size={16} style={{ color: 'var(--color-text-muted)' }} />
                    <span 
                      style={{
                        fontSize: 'var(--font-size-body)',
                        color: 'var(--color-text-muted)',
                      }}
                    >
                      {appointment.time} • {appointment.duration}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin size={16} style={{ color: 'var(--color-text-muted)' }} />
                    <span 
                      style={{
                        fontSize: 'var(--font-size-body)',
                        color: 'var(--color-text-muted)',
                      }}
                    >
                      {appointment.location}
                    </span>
                  </div>
                </div>
              </div>
              {appointment.status === 'upcoming' && (
                <div className="flex gap-2">
                  <button
                    className="px-3 py-2 rounded transition-all outline-none"
                    style={{
                      backgroundColor: 'var(--btn-secondary-bg)',
                      color: 'var(--btn-secondary-fg)',
                      fontSize: 'var(--font-size-small)',
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
                    onFocus={(e) => {
                      e.currentTarget.style.outline = `var(--focus-ring-width) solid var(--focus-ring-color)`;
                      e.currentTarget.style.outlineOffset = 'var(--focus-ring-offset)';
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.outline = 'none';
                    }}
                  >
                    Reschedule
                  </button>
                  <button
                    className="px-3 py-2 rounded transition-all outline-none"
                    style={{
                      backgroundColor: 'var(--btn-primary-bg)',
                      color: 'var(--btn-primary-fg)',
                      fontSize: 'var(--font-size-small)',
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
                    View Details
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}