import { describe, expect, it, vi } from 'vitest';

const createBrowserRouterMock = vi.fn((config) => ({ config }));

vi.mock('react-router', () => ({
  createBrowserRouter: (...args: unknown[]) => createBrowserRouterMock(...args),
  Navigate: (props: { to: string; replace?: boolean }) => <div data-testid="navigate" {...props} />,
}));

vi.mock('../../app/components/DashboardLayout', () => ({
  DashboardLayout: (props: { currentTheme?: string }) => <div data-testid="layout">{props.currentTheme}</div>,
}));

vi.mock('../../app/pages/Overview', () => ({ Overview: () => <div>Overview</div> }));
vi.mock('../../app/pages/PatientList', () => ({ PatientList: () => <div>PatientList</div> }));
vi.mock('../../app/pages/PatientDetail', () => ({ PatientDetail: () => <div>PatientDetail</div> }));
vi.mock('../../app/pages/MedicationSchedule', () => ({ MedicationSchedule: () => <div>MedicationSchedule</div> }));
vi.mock('../../app/pages/Appointments', () => ({ Appointments: () => <div>Appointments</div> }));
vi.mock('../../app/pages/Settings', () => ({ Settings: () => <div>Settings</div> }));
vi.mock('../../app/pages/Help', () => ({ Help: () => <div>Help</div> }));
vi.mock('../../app/pages/KeyboardShortcuts', () => ({ KeyboardShortcuts: () => <div>KeyboardShortcuts</div> }));
vi.mock('../../app/pages/Email', () => ({ Email: () => <div>Email</div> }));
vi.mock('../../app/pages/UILibrary', () => ({ UILibrary: () => <div>UILibrary</div> }));
vi.mock('../../app/pages/AccessibilityAnnotations', () => ({
  AccessibilityAnnotations: () => <div>AccessibilityAnnotations</div>,
}));
vi.mock('../../app/pages/patient/PatientOverview', () => ({ PatientOverview: () => <div>PatientOverview</div> }));
vi.mock('../../app/pages/patient/MyCare', () => ({ MyCare: () => <div>MyCare</div> }));
vi.mock('../../app/pages/patient/MyMedications', () => ({ MyMedications: () => <div>MyMedications</div> }));
vi.mock('../../app/pages/patient/MyAppointments', () => ({ MyAppointments: () => <div>MyAppointments</div> }));
vi.mock('../../app/pages/patient/HealthJournal', () => ({ HealthJournal: () => <div>HealthJournal</div> }));

describe('createAppRouter', () => {
  it('builds the dashboard and fallback route tree', async () => {
    const { createAppRouter } = await import('../../app/routes');
    const onThemeChange = vi.fn();
    const onLogout = vi.fn();

    const router = createAppRouter(onThemeChange, 'dark', onLogout) as { config: any[] };

    expect(createBrowserRouterMock).toHaveBeenCalledTimes(1);
    expect(router.config).toHaveLength(2);

    const [dashboardRoute, fallbackRoute] = router.config;
    expect(dashboardRoute.path).toBe('/dashboard');
    expect(dashboardRoute.element.props.currentTheme).toBe('dark');
    expect(dashboardRoute.element.props.onThemeChange).toBe(onThemeChange);
    expect(dashboardRoute.element.props.onLogout).toBe(onLogout);

    const childPaths = dashboardRoute.children.map((child: { path?: string; index?: boolean }) =>
      child.index ? 'index' : child.path
    );

    expect(childPaths).toEqual([
      'index',
      'patients',
      'patients/:patientId',
      'medications',
      'appointments',
      'patient-overview',
      'my-care',
      'my-medications',
      'my-appointments',
      'health-journal',
      'settings',
      'help',
      'shortcuts',
      'email',
      'ui-library',
      'accessibility-annotations',
    ]);

    expect(fallbackRoute.path).toBe('*');
    expect(fallbackRoute.element.props.to).toBe('/dashboard');
    expect(fallbackRoute.element.props.replace).toBe(true);
  });
});
