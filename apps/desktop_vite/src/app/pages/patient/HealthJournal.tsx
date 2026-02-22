import { BookOpen, Plus, TrendingUp, Activity, Heart } from 'lucide-react';
import { BackButton } from '../../components/BackButton';
import { useState } from 'react';

export function HealthJournal() {
  const [journalEntries] = useState([
    {
      id: 1,
      date: '2026-02-19',
      time: '8:30 AM',
      mood: 'Good',
      energy: 7,
      pain: 2,
      notes: 'Slept well last night. Feeling energized this morning. Completed morning exercises.',
      vitals: {
        bloodPressure: '120/80',
        heartRate: 72,
        weight: 165,
      },
    },
    {
      id: 2,
      date: '2026-02-18',
      time: '9:15 AM',
      mood: 'Fair',
      energy: 5,
      pain: 4,
      notes: 'Some knee pain during physical therapy. Took medication as prescribed.',
      vitals: {
        bloodPressure: '122/82',
        heartRate: 75,
        weight: 166,
      },
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
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div
              className="p-3 rounded-lg"
              style={{
                backgroundColor: 'var(--btn-primary-bg)',
                color: 'var(--btn-primary-fg)',
              }}
            >
              <BookOpen size={24} aria-hidden="true" />
            </div>
            <h1
              style={{
                fontSize: 'var(--font-size-page)',
                fontWeight: '600',
                color: 'var(--color-text)',
              }}
            >
              Health Journal
            </h1>
          </div>
          <button
            className="px-4 py-2 rounded-lg transition-all outline-none inline-flex items-center gap-2"
            aria-label="Add new journal entry"
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
            <Plus size={20} aria-hidden="true" />
            New Entry
          </button>
        </div>
        <p
          style={{
            fontSize: 'var(--font-size-body)',
            color: 'var(--color-text-muted)',
          }}
        >
          Track your daily health, mood, and well-being
        </p>
      </div>

      <div className="flex-1 overflow-y-auto space-y-6">
        {/* Health Trends */}
        <section
          className="p-6 rounded-lg"
          role="region"
          aria-label="Health trends summary"
          style={{
            backgroundColor: 'var(--color-surface)',
            border: '1px solid var(--color-border)',
            boxShadow: 'var(--shadow-sm)',
          }}
        >
          <div className="flex items-center gap-3 mb-4">
            <TrendingUp size={20} style={{ color: 'var(--color-focus)' }} aria-hidden="true" />
            <h2
              style={{
                fontSize: 'var(--font-size-section)',
                fontWeight: '600',
                color: 'var(--color-text)',
              }}
            >
              This Week's Trends
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div
              className="p-4 rounded-lg"
              style={{
                backgroundColor: 'var(--color-bg)',
                border: '1px solid var(--color-border)',
              }}
            >
              <div className="flex items-center gap-2 mb-2">
                <Activity size={18} style={{ color: 'var(--color-focus)' }} aria-hidden="true" />
                <p
                  style={{
                    fontSize: 'var(--font-size-small)',
                    color: 'var(--color-text-muted)',
                    fontWeight: '500',
                  }}
                >
                  Average Energy
                </p>
              </div>
              <p
                style={{
                  fontSize: '32px',
                  fontWeight: '600',
                  color: 'var(--color-text)',
                }}
              >
                6.2
                <span
                  style={{
                    fontSize: 'var(--font-size-body)',
                    color: 'var(--color-text-muted)',
                    fontWeight: '400',
                  }}
                >
                  /10
                </span>
              </p>
            </div>

            <div
              className="p-4 rounded-lg"
              style={{
                backgroundColor: 'var(--color-bg)',
                border: '1px solid var(--color-border)',
              }}
            >
              <div className="flex items-center gap-2 mb-2">
                <Heart size={18} style={{ color: 'var(--color-success)' }} aria-hidden="true" />
                <p
                  style={{
                    fontSize: 'var(--font-size-small)',
                    color: 'var(--color-text-muted)',
                    fontWeight: '500',
                  }}
                >
                  Avg Heart Rate
                </p>
              </div>
              <p
                style={{
                  fontSize: '32px',
                  fontWeight: '600',
                  color: 'var(--color-text)',
                }}
              >
                73
                <span
                  style={{
                    fontSize: 'var(--font-size-body)',
                    color: 'var(--color-text-muted)',
                    fontWeight: '400',
                  }}
                >
                  bpm
                </span>
              </p>
            </div>

            <div
              className="p-4 rounded-lg"
              style={{
                backgroundColor: 'var(--color-bg)',
                border: '1px solid var(--color-border)',
              }}
            >
              <div className="flex items-center gap-2 mb-2">
                <Activity size={18} style={{ color: 'var(--color-warning)' }} aria-hidden="true" />
                <p
                  style={{
                    fontSize: 'var(--font-size-small)',
                    color: 'var(--color-text-muted)',
                    fontWeight: '500',
                  }}
                >
                  Average Pain
                </p>
              </div>
              <p
                style={{
                  fontSize: '32px',
                  fontWeight: '600',
                  color: 'var(--color-text)',
                }}
              >
                3.1
                <span
                  style={{
                    fontSize: 'var(--font-size-body)',
                    color: 'var(--color-text-muted)',
                    fontWeight: '400',
                  }}
                >
                  /10
                </span>
              </p>
            </div>
          </div>
        </section>

        {/* Journal Entries */}
        <section
          className="space-y-4"
          role="region"
          aria-label="Journal entries"
        >
          <h2
            style={{
              fontSize: 'var(--font-size-section)',
              fontWeight: '600',
              color: 'var(--color-text)',
            }}
          >
            Recent Entries
          </h2>

          {journalEntries.map((entry) => (
            <article
              key={entry.id}
              className="p-5 rounded-lg"
              style={{
                backgroundColor: 'var(--color-surface)',
                border: '1px solid var(--color-border)',
                boxShadow: 'var(--shadow-sm)',
              }}
            >
              {/* Date Header */}
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p
                    style={{
                      fontSize: 'var(--font-size-body)',
                      fontWeight: '600',
                      color: 'var(--color-text)',
                    }}
                  >
                    {new Date(entry.date).toLocaleDateString('en-US', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </p>
                  <p
                    style={{
                      fontSize: 'var(--font-size-small)',
                      color: 'var(--color-text-muted)',
                    }}
                  >
                    {entry.time}
                  </p>
                </div>
                <span
                  className="px-3 py-1 rounded-full"
                  style={{
                    backgroundColor: 'var(--color-success-bg)',
                    color: 'var(--color-success)',
                    fontSize: 'var(--font-size-small)',
                    fontWeight: '500',
                  }}
                >
                  {entry.mood}
                </span>
              </div>

              {/* Metrics */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                <div
                  className="p-3 rounded-lg"
                  style={{
                    backgroundColor: 'var(--color-bg)',
                  }}
                >
                  <p
                    style={{
                      fontSize: 'var(--font-size-small)',
                      color: 'var(--color-text-muted)',
                    }}
                  >
                    Energy Level
                  </p>
                  <p
                    style={{
                      fontSize: 'var(--font-size-section)',
                      fontWeight: '600',
                      color: 'var(--color-text)',
                    }}
                  >
                    {entry.energy}/10
                  </p>
                </div>
                <div
                  className="p-3 rounded-lg"
                  style={{
                    backgroundColor: 'var(--color-bg)',
                  }}
                >
                  <p
                    style={{
                      fontSize: 'var(--font-size-small)',
                      color: 'var(--color-text-muted)',
                    }}
                  >
                    Pain Level
                  </p>
                  <p
                    style={{
                      fontSize: 'var(--font-size-section)',
                      fontWeight: '600',
                      color: 'var(--color-text)',
                    }}
                  >
                    {entry.pain}/10
                  </p>
                </div>
                <div
                  className="p-3 rounded-lg col-span-2 md:col-span-1"
                  style={{
                    backgroundColor: 'var(--color-bg)',
                  }}
                >
                  <p
                    style={{
                      fontSize: 'var(--font-size-small)',
                      color: 'var(--color-text-muted)',
                    }}
                  >
                    Blood Pressure
                  </p>
                  <p
                    style={{
                      fontSize: 'var(--font-size-section)',
                      fontWeight: '600',
                      color: 'var(--color-text)',
                    }}
                  >
                    {entry.vitals.bloodPressure}
                  </p>
                </div>
              </div>

              {/* Notes */}
              <div
                className="p-4 rounded-lg"
                style={{
                  backgroundColor: 'var(--color-bg)',
                }}
              >
                <p
                  className="mb-2"
                  style={{
                    fontSize: 'var(--font-size-small)',
                    color: 'var(--color-text-muted)',
                    fontWeight: '500',
                  }}
                >
                  Notes
                </p>
                <p
                  style={{
                    fontSize: 'var(--font-size-body)',
                    color: 'var(--color-text)',
                    lineHeight: '1.6',
                  }}
                >
                  {entry.notes}
                </p>
              </div>
            </article>
          ))}
        </section>
      </div>
    </div>
  );
}
