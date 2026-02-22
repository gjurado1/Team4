import { useState } from 'react';
import { Search, Command } from 'lucide-react';
import { 
  globalShortcuts, 
  navigationShortcuts, 
  formatShortcut, 
  isMac,
  type KeyboardShortcut 
} from '../hooks/useKeyboardShortcuts';
import { BackButton } from '../components/BackButton';

export function KeyboardShortcuts() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  // Combine all shortcuts for display
  const allShortcuts = [...globalShortcuts, ...navigationShortcuts];

  // Get unique categories
  const categories = ['All', ...new Set(allShortcuts.map(s => s.category))];

  // Filter shortcuts
  const filteredShortcuts = allShortcuts.filter(shortcut => {
    const matchesSearch = 
      shortcut.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      formatShortcut(shortcut).toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === 'All' || shortcut.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  // Group shortcuts by category
  const groupedShortcuts = filteredShortcuts.reduce((acc, shortcut) => {
    if (!acc[shortcut.category]) {
      acc[shortcut.category] = [];
    }
    acc[shortcut.category].push(shortcut);
    return acc;
  }, {} as Record<string, KeyboardShortcut[]>);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div 
      className="h-full overflow-y-auto"
      style={{
        backgroundColor: 'var(--color-bg)',
      }}
    >
      {/* Header - Hide on print */}
      <div 
        className="print:hidden p-6 pb-0"
        style={{
          backgroundColor: 'var(--color-bg)',
        }}
      >
        {/* Back Button */}
        <div className="mb-4">
          <BackButton />
        </div>

        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div 
              className="p-3 rounded-lg"
              style={{
                backgroundColor: 'var(--color-surface)',
                border: '1px solid var(--color-border)',
              }}
            >
              <Command size={24} style={{ color: 'var(--btn-primary-bg)' }} />
            </div>
            <div>
              <h1 
                style={{
                  fontSize: '28px',
                  fontWeight: '600',
                  color: 'var(--color-text)',
                }}
              >
                Keyboard Shortcuts
              </h1>
              <p 
                style={{
                  fontSize: 'var(--font-size-body)',
                  color: 'var(--color-text-muted)',
                }}
              >
                {isMac ? 'macOS' : 'Windows/Linux'} shortcuts for efficient navigation
              </p>
            </div>
          </div>

          <button
            onClick={handlePrint}
            className="flex items-center gap-2 px-4 py-2 rounded-lg transition-all outline-none"
            style={{
              backgroundColor: 'var(--btn-primary-bg)',
              color: 'var(--btn-primary-fg)',
              fontSize: 'var(--font-size-body)',
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
            <Command size={18} />
            Print Reference Card
          </button>
        </div>

        {/* Search and Filter */}
        <div className="flex gap-4 mb-6">
          {/* Search */}
          <div className="flex-1 relative">
            <Search 
              size={18} 
              className="absolute left-3 top-1/2 -translate-y-1/2"
              style={{ color: 'var(--color-text-muted)' }}
            />
            <input
              type="text"
              placeholder="Search shortcuts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg outline-none"
              style={{
                backgroundColor: 'var(--color-surface)',
                border: '1px solid var(--color-border)',
                color: 'var(--color-text)',
                fontSize: 'var(--font-size-body)',
                transition: 'var(--transition-fast)',
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = 'var(--color-focus)';
                e.currentTarget.style.outline = `var(--focus-ring-width) solid var(--focus-ring-color)`;
                e.currentTarget.style.outlineOffset = 'var(--focus-ring-offset)';
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = 'var(--color-border)';
                e.currentTarget.style.outline = 'none';
              }}
            />
          </div>

          {/* Category Filter */}
          <div className="flex gap-2">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className="px-4 py-2 rounded-lg transition-all outline-none"
                style={{
                  backgroundColor: selectedCategory === category 
                    ? 'var(--btn-primary-bg)' 
                    : 'var(--color-surface)',
                  color: selectedCategory === category 
                    ? 'var(--btn-primary-fg)' 
                    : 'var(--color-text)',
                  border: `1px solid ${selectedCategory === category ? 'var(--btn-primary-bg)' : 'var(--color-border)'}`,
                  fontSize: 'var(--font-size-body)',
                  fontWeight: '500',
                  transition: 'var(--transition-fast)',
                }}
                onMouseEnter={(e) => {
                  if (selectedCategory !== category) {
                    e.currentTarget.style.backgroundColor = 'var(--btn-secondary-hover-bg)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (selectedCategory !== category) {
                    e.currentTarget.style.backgroundColor = 'var(--color-surface)';
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
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Shortcuts List */}
      <div className="p-6 pt-0">
        {Object.entries(groupedShortcuts).map(([category, shortcuts]) => (
          <div 
            key={category} 
            className="mb-8 break-inside-avoid"
          >
            <h2 
              className="mb-4 pb-2"
              style={{
                fontSize: 'var(--font-size-section)',
                fontWeight: '600',
                color: 'var(--color-text)',
                borderBottom: '2px solid var(--color-border)',
              }}
            >
              {category}
            </h2>
            
            <div 
              className="rounded-lg overflow-hidden"
              style={{
                backgroundColor: 'var(--color-surface)',
                border: '1px solid var(--color-border)',
                boxShadow: 'var(--shadow-panel)',
              }}
            >
              {shortcuts.map((shortcut, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between px-5 py-3 transition-colors"
                  style={{
                    borderBottom: idx < shortcuts.length - 1 ? '1px solid var(--color-border)' : 'none',
                    transition: 'var(--transition-fast)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'var(--color-panel)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }}
                >
                  <span 
                    style={{
                      fontSize: 'var(--font-size-body)',
                      color: 'var(--color-text)',
                    }}
                  >
                    {shortcut.description}
                  </span>
                  
                  <kbd 
                    className="px-3 py-1.5 rounded font-mono"
                    style={{
                      backgroundColor: 'var(--color-panel)',
                      border: '1px solid var(--color-border)',
                      color: 'var(--color-text)',
                      fontSize: 'var(--font-size-small)',
                      fontWeight: '600',
                      boxShadow: '0 1px 2px rgba(0, 0, 0, 0.1)',
                      minWidth: '80px',
                      textAlign: 'center',
                    }}
                  >
                    {formatShortcut(shortcut)}
                  </kbd>
                </div>
              ))}
            </div>
          </div>
        ))}

        {filteredShortcuts.length === 0 && (
          <div 
            className="text-center py-12 rounded-lg"
            style={{
              backgroundColor: 'var(--color-surface)',
              border: '1px solid var(--color-border)',
            }}
          >
            <p 
              style={{
                fontSize: 'var(--font-size-body)',
                color: 'var(--color-text-muted)',
              }}
            >
              No shortcuts found matching "{searchQuery}"
            </p>
          </div>
        )}
      </div>

      {/* Print-only header */}
      <div className="hidden print:block p-6">
        <h1 
          className="mb-2"
          style={{
            fontSize: '32px',
            fontWeight: '700',
            color: 'var(--color-text)',
          }}
        >
          CareConnect Keyboard Shortcuts
        </h1>
        <p 
          style={{
            fontSize: 'var(--font-size-body)',
            color: 'var(--color-text-muted)',
            marginBottom: '24px',
          }}
        >
          Quick Reference Card - {isMac ? 'macOS' : 'Windows/Linux'} Version
        </p>
      </div>

      {/* Print Styles */}
      <style>{`
        @media print {
          body {
            background: white;
          }
          
          .print\\:hidden {
            display: none !important;
          }
          
          .print\\:block {
            display: block !important;
          }
          
          .break-inside-avoid {
            break-inside: avoid;
            page-break-inside: avoid;
          }
          
          /* Ensure colors print */
          * {
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
        }
      `}</style>
    </div>
  );
}
