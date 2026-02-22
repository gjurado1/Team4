import { Users, Plus, Search, ExternalLink } from 'lucide-react';
import { useNavigate } from 'react-router';
import { BackButton } from '../components/BackButton';

export function PatientList() {
  const navigate = useNavigate();
  
  const patients = [
    { id: '1', name: 'Margaret Smith', age: 78, condition: 'Diabetes Management', lastVisit: '2026-02-17' },
    { id: '2', name: 'Robert Williams', age: 82, condition: 'Post-Surgery Care', lastVisit: '2026-02-18' },
    { id: '3', name: 'John Davis', age: 65, condition: 'Heart Disease', lastVisit: '2026-02-19' },
  ];

  const handlePatientClick = (patientId: string, event: React.MouseEvent) => {
    // If Ctrl/Cmd is held, open in new tab
    if (event.ctrlKey || event.metaKey) {
      if ((window as any).tabManager) {
        (window as any).tabManager.openNewTab(`/dashboard/patients/${patientId}`);
      }
    } else {
      navigate(`/dashboard/patients/${patientId}`);
    }
  };

  const openPatientInNewTab = (patientId: string, event: React.MouseEvent) => {
    event.stopPropagation();
    if ((window as any).tabManager) {
      (window as any).tabManager.openNewTab(`/dashboard/patients/${patientId}`);
    }
  };

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
              <Users size={24} />
            </div>
            <h1 
              style={{
                fontSize: 'var(--font-size-page)',
                fontWeight: '600',
                color: 'var(--color-text)',
              }}
            >
              Patient List
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
            Add Patient
          </button>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search 
            size={18} 
            className="absolute left-3 top-1/2 -translate-y-1/2"
            style={{ color: 'var(--color-text-muted)' }}
          />
          <input
            type="search"
            placeholder="Search patients by name or condition..."
            className="w-full pl-10 pr-4 py-2.5 rounded-lg outline-none transition-colors"
            style={{
              backgroundColor: 'var(--input-bg)',
              border: '2px solid var(--input-border)',
              color: 'var(--input-text)',
              fontSize: 'var(--font-size-body)',
              transition: 'var(--transition-fast)',
            }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = 'var(--input-border-focus)';
              e.currentTarget.style.outline = `var(--focus-ring-width) solid var(--focus-ring-color)`;
              e.currentTarget.style.outlineOffset = 'var(--focus-ring-offset)';
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = 'var(--input-border)';
              e.currentTarget.style.outline = 'none';
            }}
          />
        </div>
      </div>

      {/* Patient Cards */}
      <div className="flex-1 overflow-y-auto space-y-4">
        {patients.map((patient) => (
          <div
            key={patient.id}
            className="p-4 rounded-lg transition-all cursor-pointer"
            style={{
              backgroundColor: 'var(--color-surface)',
              border: '1px solid var(--color-border)',
              boxShadow: 'var(--shadow-sm)',
              transition: 'var(--transition-medium)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = 'var(--shadow-panel)';
              e.currentTarget.style.borderColor = 'var(--color-focus)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
              e.currentTarget.style.borderColor = 'var(--color-border)';
            }}
            onClick={(e) => handlePatientClick(patient.id, e)}
          >
            <div className="flex items-start justify-between">
              <div>
                <h3 
                  className="mb-1"
                  style={{
                    fontSize: 'var(--font-size-section)',
                    fontWeight: '600',
                    color: 'var(--color-text)',
                  }}
                >
                  {patient.name}
                </h3>
                <p 
                  className="mb-2"
                  style={{
                    fontSize: 'var(--font-size-body)',
                    color: 'var(--color-text-muted)',
                  }}
                >
                  Age: {patient.age} • {patient.condition}
                </p>
                <p 
                  style={{
                    fontSize: 'var(--font-size-small)',
                    color: 'var(--color-text-muted)',
                  }}
                >
                  Last Visit: {new Date(patient.lastVisit).toLocaleDateString('en-US', { 
                    month: 'short', 
                    day: 'numeric', 
                    year: 'numeric' 
                  })}
                </p>
              </div>
              <button
                className="px-3 py-1.5 rounded transition-all outline-none"
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
                onClick={(e) => openPatientInNewTab(patient.id, e)}
              >
                <ExternalLink size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}