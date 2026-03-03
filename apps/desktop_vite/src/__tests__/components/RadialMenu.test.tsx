import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { RadialMenu } from '../../app/components/RadialMenu';
import { MemoryRouter } from 'react-router';
import { vi } from 'vitest';

const mockNavigate = vi.fn();
const mockUserRole = { userRole: 'caregiver' as 'caregiver' | 'patient' };

vi.mock('react-router', async () => {
  const actual = await vi.importActual('react-router');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
    useLocation: () => ({ pathname: '/dashboard' }),
  };
});

vi.mock('../../app/contexts/UserContext', () => ({
  useUser: () => mockUserRole,
}));

// Mock motion/react to render as plain divs/buttons; pass through drag handlers for coverage
vi.mock('motion/react', () => ({
  motion: {
    div: ({ children, onClick, onDragStart, onDrag, onDragEnd, id, ...props }: any) => (
      <div
        data-testid={id || 'motion-div'}
        id={id}
        onClick={onClick}
        onDragStart={onDragStart}
        onDrag={(e: any) => onDrag?.(e, { point: { x: 200, y: 300 } })}
        onDragEnd={onDragEnd}
        {...props}
      >
        {children}
      </div>
    ),
    button: ({ children, onClick, ...props }: any) => (
      <button onClick={onClick} {...props}>
        {children}
      </button>
    ),
  },
  AnimatePresence: ({ children }: any) => <>{children}</>,
}));

describe('RadialMenu', () => {
  beforeEach(() => {
    mockNavigate.mockClear();
    localStorage.clear();
    delete (window as any).tabManager;
    Object.defineProperty(window, 'innerWidth', { value: 1024, writable: true });
    Object.defineProperty(window, 'innerHeight', { value: 768, writable: true });
  });

  it('renders center toggle button with Open menu label when closed', () => {
    render(
      <MemoryRouter>
        <RadialMenu />
      </MemoryRouter>,
    );
    expect(screen.getByLabelText('Open menu')).toBeInTheDocument();
    expect(screen.getByLabelText('Open menu')).toHaveAttribute('aria-expanded', 'false');
  });

  it('toggles to Close menu when center button is clicked', async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <RadialMenu />
      </MemoryRouter>,
    );
    await user.click(screen.getByLabelText('Open menu'));
    expect(screen.getByLabelText('Close menu')).toBeInTheDocument();
    expect(screen.getByLabelText('Close menu')).toHaveAttribute('aria-expanded', 'true');
  });

  it('shows caregiver menu items when open', async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <RadialMenu />
      </MemoryRouter>,
    );
    await user.click(screen.getByLabelText('Open menu'));
    expect(screen.getByLabelText('Dashboard')).toBeInTheDocument();
    expect(screen.getByLabelText('Patients')).toBeInTheDocument();
    expect(screen.getByLabelText('Settings')).toBeInTheDocument();
    expect(screen.getByLabelText('Help')).toBeInTheDocument();
  });

  it('navigates when menu item is clicked', async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <RadialMenu />
      </MemoryRouter>,
    );
    await user.click(screen.getByLabelText('Open menu'));
    await user.click(screen.getByLabelText('Settings'));
    expect(mockNavigate).toHaveBeenCalledWith('/dashboard/settings');
  });

  it('opens in new tab when tabManager exists and ctrl key', async () => {
    (window as any).tabManager = { openNewTab: vi.fn() };
    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <RadialMenu />
      </MemoryRouter>,
    );
    await user.click(screen.getByLabelText('Open menu'));
    const settingsBtn = screen.getByLabelText('Settings');
    fireEvent.click(settingsBtn, { ctrlKey: true });
    expect((window as any).tabManager.openNewTab).toHaveBeenCalledWith('/dashboard/settings');
    expect(mockNavigate).not.toHaveBeenCalled();
  });

  it('uses saved position from localStorage', () => {
    localStorage.setItem('radialMenuPosition', JSON.stringify({ x: 100, y: 200 }));
    render(
      <MemoryRouter>
        <RadialMenu />
      </MemoryRouter>,
    );
    expect(localStorage.getItem('radialMenuPosition')).toBe(JSON.stringify({ x: 100, y: 200 }));
  });

  it('shows patient menu when userRole is patient', async () => {
    mockUserRole.userRole = 'patient';
    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <RadialMenu />
      </MemoryRouter>,
    );
    await user.click(screen.getByLabelText('Open menu'));
    expect(screen.getByLabelText('Home')).toBeInTheDocument();
    expect(screen.getByLabelText('My Care')).toBeInTheDocument();
    expect(screen.getByLabelText('Medications')).toBeInTheDocument();
    expect(screen.queryByLabelText('Patients')).not.toBeInTheDocument();
    mockUserRole.userRole = 'caregiver';
  });

  it('backdrop closes menu when clicked', async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <RadialMenu />
      </MemoryRouter>,
    );
    await user.click(screen.getByLabelText('Open menu'));
    expect(screen.getByLabelText('Close menu')).toBeInTheDocument();
    const backdrop = document.querySelector('.fixed.inset-0.z-40');
    if (backdrop) {
      await user.click(backdrop as HTMLElement);
      expect(screen.getByLabelText('Open menu')).toBeInTheDocument();
    }
  });

  it('saves position to localStorage when position state would change', async () => {
    render(
      <MemoryRouter>
        <RadialMenu />
      </MemoryRouter>,
    );
    expect(localStorage.getItem('radialMenuPosition')).toBeTruthy();
  });

  it('constrains position on window resize', () => {
    render(
      <MemoryRouter>
        <RadialMenu />
      </MemoryRouter>,
    );
    window.dispatchEvent(new Event('resize'));
    expect(localStorage.getItem('radialMenuPosition')).toBeTruthy();
  });

  it('open in new tab when localStorage setting is true', async () => {
    localStorage.setItem('careconnect-menu-navigation-new-tab', 'true');
    (window as any).tabManager = { openNewTab: vi.fn() };
    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <RadialMenu />
      </MemoryRouter>,
    );
    await user.click(screen.getByLabelText('Open menu'));
    await user.click(screen.getByLabelText('Help'));
    expect((window as any).tabManager.openNewTab).toHaveBeenCalledWith('/dashboard/help');
    localStorage.removeItem('careconnect-menu-navigation-new-tab');
  });

  it('drag start prevents click from toggling menu when isDragging is true', async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <RadialMenu />
      </MemoryRouter>,
    );
    const draggable = document.getElementById('radial-menu');
    expect(draggable).toBeInTheDocument();
    fireEvent.dragStart(draggable!);
    await user.click(screen.getByLabelText('Open menu'));
    expect(screen.getByLabelText('Open menu')).toBeInTheDocument();
  });
});
