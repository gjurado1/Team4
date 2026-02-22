import { useState } from 'react';
import { 
  Mail, 
  Inbox, 
  Send, 
  File, 
  Trash2, 
  Star, 
  Archive,
  Search,
  Reply,
  ReplyAll,
  Forward,
  MoreVertical,
  Paperclip,
  Calendar,
  User
} from 'lucide-react';
import { BackButton } from '../components/BackButton';

interface EmailMessage {
  id: string;
  from: string;
  fromEmail: string;
  subject: string;
  preview: string;
  body: string;
  date: string;
  time: string;
  read: boolean;
  starred: boolean;
  hasAttachment: boolean;
  category: 'inbox' | 'sent' | 'drafts' | 'trash';
}

const mockEmails: EmailMessage[] = [
  {
    id: '1',
    from: 'Dr. Michael Chen',
    fromEmail: 'michael.chen@hospital.com',
    subject: 'Patient Margaret Smith - Medication Update',
    preview: 'Please note the dosage change for Margaret\'s blood pressure medication...',
    body: 'Dear Care Team,\n\nI wanted to inform you about an important medication adjustment for our patient Margaret Smith.\n\nEffective immediately, please update her Lisinopril dosage from 10mg to 20mg, to be taken once daily in the morning. Her recent blood pressure readings have been consistently elevated, and this adjustment should help bring them into a healthier range.\n\nPlease ensure this change is reflected in her medication chart and that Margaret is informed of the new dosage. Monitor her blood pressure daily for the next week and report any concerns.\n\nThank you for your continued excellent care.\n\nBest regards,\nDr. Michael Chen\nCardiology Department',
    date: 'Mar 15, 2026',
    time: '9:30 AM',
    read: false,
    starred: true,
    hasAttachment: true,
    category: 'inbox'
  },
  {
    id: '2',
    from: 'Sarah Johnson',
    fromEmail: 'sarah.johnson@careconnect.com',
    subject: 'Team Meeting - Weekly Care Coordination',
    preview: 'Reminder: Our weekly team meeting is scheduled for tomorrow at 2:00 PM...',
    body: 'Hi Team,\n\nJust a friendly reminder that our weekly care coordination meeting is scheduled for tomorrow (March 16th) at 2:00 PM in Conference Room B.\n\nAgenda:\n- Patient updates and care plan reviews\n- New admission: Robert Williams\n- Medication reconciliation process improvements\n- Staff scheduling for next week\n\nPlease bring any patient concerns or updates you\'d like to discuss. Looking forward to seeing everyone there!\n\nBest,\nSarah',
    date: 'Mar 15, 2026',
    time: '8:15 AM',
    read: true,
    starred: false,
    hasAttachment: false,
    category: 'inbox'
  },
  {
    id: '3',
    from: 'Pharmacy Department',
    fromEmail: 'pharmacy@healthcenter.com',
    subject: 'Prescription Ready for Pickup - John Davis',
    preview: 'The following prescription is ready for pickup: Metformin 500mg...',
    body: 'Hello,\n\nThis is to notify you that the following prescription for patient John Davis is now ready for pickup:\n\nMedication: Metformin 500mg\nQuantity: 90 tablets\nRefills: 2\nPrescribing Doctor: Dr. Amanda Lee\n\nPlease collect this medication from the pharmacy during business hours (8 AM - 6 PM, Monday-Friday).\n\nIf you have any questions, please contact us at (555) 123-4567.\n\nThank you,\nPharmacy Team',
    date: 'Mar 14, 2026',
    time: '4:45 PM',
    read: true,
    starred: false,
    hasAttachment: false,
    category: 'inbox'
  },
  {
    id: '4',
    from: 'Appointment Scheduler',
    fromEmail: 'scheduler@healthcenter.com',
    subject: 'Appointment Confirmation - Robert Williams',
    preview: 'Confirmed: Physical Therapy appointment on March 18, 2026...',
    body: 'Appointment Confirmation\n\nPatient: Robert Williams\nAppointment Type: Physical Therapy Session\nDate: March 18, 2026\nTime: 10:30 AM\nLocation: Rehabilitation Center, Room 203\nProvider: Jessica Martinez, PT\n\nPlease ensure the patient arrives 15 minutes early to complete any necessary paperwork.\n\nTo reschedule or cancel, please call (555) 987-6543 at least 24 hours in advance.\n\nThank you!',
    date: 'Mar 14, 2026',
    time: '2:20 PM',
    read: true,
    starred: false,
    hasAttachment: true,
    category: 'inbox'
  },
  {
    id: '5',
    from: 'Lab Results',
    fromEmail: 'labs@hospital.com',
    subject: 'Lab Results Available - Margaret Smith',
    preview: 'New laboratory results are available for your review...',
    body: 'Dear Care Provider,\n\nLaboratory results for patient Margaret Smith are now available in the patient portal.\n\nTests Completed:\n- Complete Blood Count (CBC)\n- Comprehensive Metabolic Panel\n- Lipid Panel\n- HbA1c\n\nCollection Date: March 13, 2026\nResults Released: March 14, 2026\n\nPlease review these results and follow up with the patient as needed. All results are within normal ranges except for slightly elevated cholesterol (see attached report).\n\nBest regards,\nLaboratory Services',
    date: 'Mar 14, 2026',
    time: '11:00 AM',
    read: false,
    starred: true,
    hasAttachment: true,
    category: 'inbox'
  }
];

export function Email() {
  const [selectedCategory, setSelectedCategory] = useState<'inbox' | 'sent' | 'drafts' | 'trash'>('inbox');
  const [selectedEmail, setSelectedEmail] = useState<EmailMessage | null>(mockEmails[0]);
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { id: 'inbox', label: 'Inbox', icon: Inbox, count: 5 },
    { id: 'sent', label: 'Sent', icon: Send, count: 0 },
    { id: 'drafts', label: 'Drafts', icon: File, count: 0 },
    { id: 'trash', label: 'Trash', icon: Trash2, count: 0 },
  ];

  const filteredEmails = mockEmails.filter(email => 
    email.category === selectedCategory &&
    (email.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
     email.from.toLowerCase().includes(searchQuery.toLowerCase()) ||
     email.preview.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div 
        className="flex items-center justify-between p-4"
        style={{
          backgroundColor: 'var(--color-surface)',
          borderBottom: '1px solid var(--color-border)',
        }}
      >
        <div className="flex items-center gap-4">
          <BackButton />
          <div className="flex items-center gap-3">
            <div 
              className="p-2.5 rounded-lg"
              style={{
                backgroundColor: 'var(--btn-primary-bg)',
                color: 'var(--btn-primary-fg)',
              }}
            >
              <Mail size={24} />
            </div>
            <h1 
              style={{
                fontSize: 'var(--font-size-page)',
                fontWeight: '600',
                color: 'var(--color-text)',
              }}
            >
              Email
            </h1>
          </div>
        </div>

        {/* Search Bar */}
        <div className="flex items-center gap-2 flex-1 max-w-md mx-8">
          <div 
            className="flex items-center gap-2 flex-1 px-3 py-2 rounded-lg"
            style={{
              backgroundColor: 'var(--input-bg)',
              border: '2px solid var(--input-border)',
            }}
          >
            <Search size={18} style={{ color: 'var(--color-text-muted)' }} />
            <input
              type="text"
              placeholder="Search emails..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 bg-transparent outline-none"
              style={{
                color: 'var(--input-text)',
                fontSize: 'var(--font-size-body)',
              }}
            />
          </div>
        </div>

        {/* Compose Button */}
        <button
          className="px-4 py-2 rounded-lg transition-all outline-none"
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
          Compose
        </button>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar Navigation */}
        <div 
          className="w-56 flex flex-col p-4 overflow-y-auto"
          style={{
            backgroundColor: 'var(--color-surface)',
            borderRight: '1px solid var(--color-border)',
          }}
        >
          <div className="space-y-1">
            {categories.map((category) => {
              const Icon = category.icon;
              const isActive = selectedCategory === category.id;
              
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id as any)}
                  className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg transition-all outline-none"
                  style={{
                    backgroundColor: isActive ? 'var(--btn-primary-bg)' : 'transparent',
                    color: isActive ? 'var(--btn-primary-fg)' : 'var(--color-text)',
                    fontSize: 'var(--font-size-body)',
                    fontWeight: isActive ? '600' : '500',
                    transition: 'var(--transition-medium)',
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.backgroundColor = 'var(--btn-secondary-hover-bg)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.outline = `var(--focus-ring-width) solid var(--focus-ring-color)`;
                    e.currentTarget.style.outlineOffset = 'var(--focus-ring-offset)';
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.outline = 'none';
                  }}
                >
                  <div className="flex items-center gap-3">
                    <Icon size={18} />
                    <span>{category.label}</span>
                  </div>
                  {category.count > 0 && (
                    <span 
                      className="px-2 py-0.5 rounded-full text-xs"
                      style={{
                        backgroundColor: isActive ? 'var(--btn-primary-fg)' : 'var(--color-focus)',
                        color: isActive ? 'var(--btn-primary-bg)' : 'white',
                        fontSize: 'var(--font-size-small)',
                        fontWeight: '600',
                      }}
                    >
                      {category.count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Quick Actions */}
          <div className="mt-6 pt-6" style={{ borderTop: '1px solid var(--color-border)' }}>
            <h3 
              className="px-3 mb-2"
              style={{
                fontSize: 'var(--font-size-small)',
                fontWeight: '600',
                color: 'var(--color-text-muted)',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
              }}
            >
              Quick Actions
            </h3>
            <div className="space-y-1">
              <button
                className="w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all outline-none"
                style={{
                  fontSize: 'var(--font-size-body)',
                  color: 'var(--color-text)',
                  transition: 'var(--transition-medium)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--btn-secondary-hover-bg)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
                onFocus={(e) => {
                  e.currentTarget.style.outline = `var(--focus-ring-width) solid var(--focus-ring-color)`;
                  e.currentTarget.style.outlineOffset = 'var(--focus-ring-offset)';
                }}
                onBlur={(e) => {
                  e.currentTarget.style.outline = 'none';
                }}
              >
                <Star size={16} />
                <span>Starred</span>
              </button>
              <button
                className="w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all outline-none"
                style={{
                  fontSize: 'var(--font-size-body)',
                  color: 'var(--color-text)',
                  transition: 'var(--transition-medium)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--btn-secondary-hover-bg)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
                onFocus={(e) => {
                  e.currentTarget.style.outline = `var(--focus-ring-width) solid var(--focus-ring-color)`;
                  e.currentTarget.style.outlineOffset = 'var(--focus-ring-offset)';
                }}
                onBlur={(e) => {
                  e.currentTarget.style.outline = 'none';
                }}
              >
                <Archive size={16} />
                <span>Archived</span>
              </button>
            </div>
          </div>
        </div>

        {/* Message List */}
        <div 
          className="w-96 flex flex-col overflow-hidden"
          style={{
            backgroundColor: 'var(--color-background)',
            borderRight: '1px solid var(--color-border)',
          }}
        >
          <div 
            className="p-4"
            style={{
              backgroundColor: 'var(--color-surface)',
              borderBottom: '1px solid var(--color-border)',
            }}
          >
            <h2 
              style={{
                fontSize: 'var(--font-size-section)',
                fontWeight: '600',
                color: 'var(--color-text)',
              }}
            >
              {selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)}
            </h2>
            <p 
              style={{
                fontSize: 'var(--font-size-small)',
                color: 'var(--color-text-muted)',
                marginTop: '4px',
              }}
            >
              {filteredEmails.length} {filteredEmails.length === 1 ? 'message' : 'messages'}
            </p>
          </div>

          <div className="flex-1 overflow-y-auto">
            {filteredEmails.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full p-8 text-center">
                <Mail size={48} style={{ color: 'var(--color-text-muted)', opacity: 0.5 }} />
                <p 
                  className="mt-4"
                  style={{
                    fontSize: 'var(--font-size-body)',
                    color: 'var(--color-text-muted)',
                  }}
                >
                  No messages found
                </p>
              </div>
            ) : (
              filteredEmails.map((email) => (
                <button
                  key={email.id}
                  onClick={() => setSelectedEmail(email)}
                  className="w-full text-left p-4 transition-all outline-none"
                  style={{
                    backgroundColor: selectedEmail?.id === email.id ? 'var(--color-surface)' : 'transparent',
                    borderBottom: '1px solid var(--color-border)',
                    transition: 'var(--transition-medium)',
                  }}
                  onMouseEnter={(e) => {
                    if (selectedEmail?.id !== email.id) {
                      e.currentTarget.style.backgroundColor = 'var(--color-surface)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (selectedEmail?.id !== email.id) {
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.outline = `var(--focus-ring-width) solid var(--focus-ring-color)`;
                    e.currentTarget.style.outlineOffset = 'var(--focus-ring-offset)';
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.outline = 'none';
                  }}
                >
                  <div className="flex items-start justify-between mb-1">
                    <div className="flex items-center gap-2 flex-1 min-w-0">
                      <div 
                        className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                        style={{
                          backgroundColor: 'var(--color-focus)',
                          color: 'white',
                          fontSize: 'var(--font-size-small)',
                          fontWeight: '600',
                        }}
                      >
                        {email.from.charAt(0)}
                      </div>
                      <span 
                        className="truncate"
                        style={{
                          fontSize: 'var(--font-size-body)',
                          fontWeight: email.read ? '500' : '600',
                          color: 'var(--color-text)',
                        }}
                      >
                        {email.from}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      {email.starred && <Star size={14} style={{ color: 'var(--color-warning)' }} fill="var(--color-warning)" />}
                      {email.hasAttachment && <Paperclip size={14} style={{ color: 'var(--color-text-muted)' }} />}
                    </div>
                  </div>
                  
                  <h3 
                    className="mb-1 truncate"
                    style={{
                      fontSize: 'var(--font-size-body)',
                      fontWeight: email.read ? '500' : '600',
                      color: 'var(--color-text)',
                    }}
                  >
                    {email.subject}
                  </h3>
                  
                  <p 
                    className="mb-2 truncate"
                    style={{
                      fontSize: 'var(--font-size-small)',
                      color: 'var(--color-text-muted)',
                    }}
                  >
                    {email.preview}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <span 
                      style={{
                        fontSize: 'var(--font-size-small)',
                        color: 'var(--color-text-muted)',
                      }}
                    >
                      {email.date}
                    </span>
                    {!email.read && (
                      <div 
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: 'var(--color-focus)' }}
                      />
                    )}
                  </div>
                </button>
              ))
            )}
          </div>
        </div>

        {/* Reading Pane */}
        <div className="flex-1 flex flex-col overflow-hidden" style={{ backgroundColor: 'var(--color-background)' }}>
          {selectedEmail ? (
            <>
              {/* Email Header */}
              <div 
                className="p-6"
                style={{
                  backgroundColor: 'var(--color-surface)',
                  borderBottom: '1px solid var(--color-border)',
                }}
              >
                <div className="flex items-start justify-between mb-4">
                  <h2 
                    style={{
                      fontSize: 'var(--font-size-section)',
                      fontWeight: '600',
                      color: 'var(--color-text)',
                    }}
                  >
                    {selectedEmail.subject}
                  </h2>
                  <div className="flex items-center gap-2">
                    <button
                      className="p-2 rounded-lg transition-all outline-none"
                      style={{
                        color: selectedEmail.starred ? 'var(--color-warning)' : 'var(--color-text-muted)',
                        transition: 'var(--transition-medium)',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = 'var(--btn-secondary-hover-bg)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'transparent';
                      }}
                      onFocus={(e) => {
                        e.currentTarget.style.outline = `var(--focus-ring-width) solid var(--focus-ring-color)`;
                        e.currentTarget.style.outlineOffset = 'var(--focus-ring-offset)';
                      }}
                      onBlur={(e) => {
                        e.currentTarget.style.outline = 'none';
                      }}
                      aria-label="Star email"
                    >
                      <Star size={20} fill={selectedEmail.starred ? 'var(--color-warning)' : 'none'} />
                    </button>
                    <button
                      className="p-2 rounded-lg transition-all outline-none"
                      style={{
                        color: 'var(--color-text-muted)',
                        transition: 'var(--transition-medium)',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = 'var(--btn-secondary-hover-bg)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'transparent';
                      }}
                      onFocus={(e) => {
                        e.currentTarget.style.outline = `var(--focus-ring-width) solid var(--focus-ring-color)`;
                        e.currentTarget.style.outlineOffset = 'var(--focus-ring-offset)';
                      }}
                      onBlur={(e) => {
                        e.currentTarget.style.outline = 'none';
                      }}
                      aria-label="More options"
                    >
                      <MoreVertical size={20} />
                    </button>
                  </div>
                </div>

                {/* Sender Info */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-10 h-10 rounded-full flex items-center justify-center"
                      style={{
                        backgroundColor: 'var(--color-focus)',
                        color: 'white',
                        fontSize: 'var(--font-size-body)',
                        fontWeight: '600',
                      }}
                    >
                      {selectedEmail.from.charAt(0)}
                    </div>
                    <div>
                      <p 
                        style={{
                          fontSize: 'var(--font-size-body)',
                          fontWeight: '600',
                          color: 'var(--color-text)',
                        }}
                      >
                        {selectedEmail.from}
                      </p>
                      <p 
                        style={{
                          fontSize: 'var(--font-size-small)',
                          color: 'var(--color-text-muted)',
                        }}
                      >
                        {selectedEmail.fromEmail}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p 
                      style={{
                        fontSize: 'var(--font-size-body)',
                        color: 'var(--color-text)',
                      }}
                    >
                      {selectedEmail.date}
                    </p>
                    <p 
                      style={{
                        fontSize: 'var(--font-size-small)',
                        color: 'var(--color-text-muted)',
                      }}
                    >
                      {selectedEmail.time}
                    </p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-2 mt-4">
                  <button
                    className="flex items-center gap-2 px-3 py-2 rounded-lg transition-all outline-none"
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
                    <Reply size={16} />
                    <span>Reply</span>
                  </button>
                  <button
                    className="flex items-center gap-2 px-3 py-2 rounded-lg transition-all outline-none"
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
                    <ReplyAll size={16} />
                    <span>Reply All</span>
                  </button>
                  <button
                    className="flex items-center gap-2 px-3 py-2 rounded-lg transition-all outline-none"
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
                    <Forward size={16} />
                    <span>Forward</span>
                  </button>
                </div>
              </div>

              {/* Email Body */}
              <div className="flex-1 overflow-y-auto p-6">
                <div 
                  className="p-6 rounded-lg"
                  style={{
                    backgroundColor: 'var(--color-surface)',
                    border: '1px solid var(--color-border)',
                  }}
                >
                  <p 
                    style={{
                      fontSize: 'var(--font-size-body)',
                      color: 'var(--color-text)',
                      lineHeight: 'var(--line-height-base)',
                      whiteSpace: 'pre-wrap',
                    }}
                  >
                    {selectedEmail.body}
                  </p>

                  {selectedEmail.hasAttachment && (
                    <div 
                      className="mt-6 pt-6"
                      style={{
                        borderTop: '1px solid var(--color-border)',
                      }}
                    >
                      <h4 
                        className="mb-3"
                        style={{
                          fontSize: 'var(--font-size-body)',
                          fontWeight: '600',
                          color: 'var(--color-text)',
                        }}
                      >
                        Attachments
                      </h4>
                      <div 
                        className="flex items-center gap-3 p-3 rounded-lg"
                        style={{
                          backgroundColor: 'var(--color-background)',
                          border: '1px solid var(--color-border)',
                        }}
                      >
                        <div 
                          className="p-2 rounded"
                          style={{
                            backgroundColor: 'var(--color-focus)',
                            color: 'white',
                          }}
                        >
                          <File size={20} />
                        </div>
                        <div className="flex-1">
                          <p 
                            style={{
                              fontSize: 'var(--font-size-body)',
                              fontWeight: '500',
                              color: 'var(--color-text)',
                            }}
                          >
                            medication-update.pdf
                          </p>
                          <p 
                            style={{
                              fontSize: 'var(--font-size-small)',
                              color: 'var(--color-text-muted)',
                            }}
                          >
                            245 KB
                          </p>
                        </div>
                        <button
                          className="px-3 py-1.5 rounded transition-all outline-none"
                          style={{
                            backgroundColor: 'var(--btn-secondary-bg)',
                            color: 'var(--btn-secondary-fg)',
                            fontSize: 'var(--font-size-small)',
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
                          Download
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <Mail size={64} style={{ color: 'var(--color-text-muted)', opacity: 0.3, margin: '0 auto' }} />
                <p 
                  className="mt-4"
                  style={{
                    fontSize: 'var(--font-size-body)',
                    color: 'var(--color-text-muted)',
                  }}
                >
                  Select a message to read
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}