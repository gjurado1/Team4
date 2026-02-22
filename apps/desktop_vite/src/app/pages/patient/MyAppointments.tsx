import { Calendar, MapPin, Clock, Video, Phone, User } from 'lucide-react';
import { BackButton } from '../../components/BackButton';
import { useState } from 'react';

export function MyAppointments() {
  const [appointments] = useState([
    {
      id: 1,
      title: 'Follow-up with Dr. Johnson',
      date: '2026-02-22',
      time: '10:00 AM',
      duration: '30 min',
      type: 'in-person',
      location: 'Medical Center, Room 304',
      provider: 'Dr. Sarah Johnson',
      specialty: 'Primary Care',
      status: 'upcoming',
    },
    {
      id: 2,
      title: 'Physical Therapy Session',
      date: '2026-02-24',
      time: '2:00 PM',
      duration: '45 min',
      type: 'in-person',
      location: 'Rehabilitation Center',
      provider: 'Michael Chen, PT',
      specialty: 'Physical Therapy',
      status: 'upcoming',
    },
    {
      id: 3,
      title: 'Telehealth Check-in',
      date: '2026-02-26',
      time: '11:00 AM',
      duration: '15 min',
      type: 'video',
      location: 'Video Call',
      provider: 'Nurse Emma Williams',
      specialty: 'Care Coordination',
      status: 'upcoming',
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
            <Calendar size={24} aria-hidden="true" />
          </div>
          <h1
            style={{
              fontSize: 'var(--font-size-page)',
              fontWeight: '600',
              color: 'var(--color-text)',
            }}
          >
            My Appointments
          </h1>
        </div>
        <p
          style={{
            fontSize: 'var(--font-size-body)',
            color: 'var(--color-text-muted)',
          }}
        >
          View and manage your upcoming medical appointments
        </p>
      </div>

      <div className="flex-1 overflow-y-auto">
        {/* Next Appointment Card */}
        <div
          className="p-6 rounded-lg mb-6"
          role="region"
          aria-label="Next appointment"
          style={{
            backgroundColor: 'var(--btn-primary-bg)',
            color: 'var(--btn-primary-fg)',
            boxShadow: 'var(--shadow-panel)',
          }}
        >
          <p
            className="mb-2"
            style={{
              fontSize: 'var(--font-size-small)',
              opacity: 0.9,
              fontWeight: '500',
            }}
          >
            NEXT APPOINTMENT
          </p>
          <h2
            className="mb-3"
            style={{
              fontSize: 'var(--font-size-section)',
              fontWeight: '600',
            }}
          >
            {appointments[0].title}
          </h2>
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2">
              <Calendar size={18} aria-hidden="true" />
              <span style={{ fontSize: 'var(--font-size-body)' }}>
                {new Date(appointments[0].date).toLocaleDateString('en-US', {
                  weekday: 'short',
                  month: 'short',
                  day: 'numeric',
                })}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Clock size={18} aria-hidden="true" />
              <span style={{ fontSize: 'var(--font-size-body)' }}>
                {appointments[0].time}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin size={18} aria-hidden="true" />
              <span style={{ fontSize: 'var(--font-size-body)' }}>
                {appointments[0].location}
              </span>
            </div>
          </div>
        </div>

        {/* All Appointments */}
        <section
          className="space-y-4"
          role="region"
          aria-label="All appointments"
        >
          <h2
            style={{
              fontSize: 'var(--font-size-section)',
              fontWeight: '600',
              color: 'var(--color-text)',
            }}
          >
            Upcoming Appointments
          </h2>

          <div className="space-y-4" role="list">
            {appointments.map((appointment) => (
              <article
                key={appointment.id}
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
                  <div>
                    <h3
                      style={{
                        fontSize: 'var(--font-size-section)',
                        fontWeight: '600',
                        color: 'var(--color-text)',
                      }}
                    >
                      {appointment.title}
                    </h3>
                    <div className="flex items-center gap-2 mt-1">
                      <User size={14} style={{ color: 'var(--color-text-muted)' }} aria-hidden="true" />
                      <p
                        style={{
                          fontSize: 'var(--font-size-body)',
                          color: 'var(--color-text-muted)',
                        }}
                      >
                        {appointment.provider} • {appointment.specialty}
                      </p>
                    </div>
                  </div>
                  <span
                    className="px-3 py-1 rounded-full flex items-center gap-2"
                    style={{
                      backgroundColor: appointment.type === 'video' ? 'var(--color-info-bg)' : 'var(--color-success-bg)',
                      color: appointment.type === 'video' ? 'var(--color-info)' : 'var(--color-success)',
                      fontSize: 'var(--font-size-small)',
                      fontWeight: '500',
                    }}
                  >
                    {appointment.type === 'video' ? (
                      <>
                        <Video size={14} aria-hidden="true" />
                        Video
                      </>
                    ) : (
                      <>
                        <MapPin size={14} aria-hidden="true" />
                        In-Person
                      </>
                    )}
                  </span>
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div
                    className="p-3 rounded-lg"
                    style={{
                      backgroundColor: 'var(--color-bg)',
                    }}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <Calendar size={16} style={{ color: 'var(--color-focus)' }} aria-hidden="true" />
                      <p
                        style={{
                          fontSize: 'var(--font-size-small)',
                          color: 'var(--color-text-muted)',
                          fontWeight: '500',
                        }}
                      >
                        Date
                      </p>
                    </div>
                    <p
                      style={{
                        fontSize: 'var(--font-size-body)',
                        color: 'var(--color-text)',
                      }}
                    >
                      {new Date(appointment.date).toLocaleDateString('en-US', {
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </p>
                  </div>

                  <div
                    className="p-3 rounded-lg"
                    style={{
                      backgroundColor: 'var(--color-bg)',
                    }}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <Clock size={16} style={{ color: 'var(--color-focus)' }} aria-hidden="true" />
                      <p
                        style={{
                          fontSize: 'var(--font-size-small)',
                          color: 'var(--color-text-muted)',
                          fontWeight: '500',
                        }}
                      >
                        Time
                      </p>
                    </div>
                    <p
                      style={{
                        fontSize: 'var(--font-size-body)',
                        color: 'var(--color-text)',
                      }}
                    >
                      {appointment.time} ({appointment.duration})
                    </p>
                  </div>

                  <div
                    className="p-3 rounded-lg"
                    style={{
                      backgroundColor: 'var(--color-bg)',
                    }}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <MapPin size={16} style={{ color: 'var(--color-focus)' }} aria-hidden="true" />
                      <p
                        style={{
                          fontSize: 'var(--font-size-small)',
                          color: 'var(--color-text-muted)',
                          fontWeight: '500',
                        }}
                      >
                        Location
                      </p>
                    </div>
                    <p
                      style={{
                        fontSize: 'var(--font-size-body)',
                        color: 'var(--color-text)',
                      }}
                    >
                      {appointment.location}
                    </p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3 mt-4">
                  {appointment.type === 'video' && (
                    <button
                      className="flex-1 py-2 px-4 rounded-lg transition-all outline-none flex items-center justify-center gap-2"
                      aria-label={`Join video call for ${appointment.title}`}
                      style={{
                        backgroundColor: 'var(--btn-primary-bg)',
                        color: 'var(--btn-primary-fg)',
                        fontSize: 'var(--font-size-body)',
                        fontWeight: '500',
                        transition: 'var(--transition-medium)',
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
                      <Video size={18} aria-hidden="true" />
                      Join Video Call
                    </button>
                  )}
                  <button
                    className="py-2 px-4 rounded-lg transition-all outline-none flex items-center gap-2"
                    aria-label={`Call provider for ${appointment.title}`}
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
                    <Phone size={18} aria-hidden="true" />
                    Contact
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
