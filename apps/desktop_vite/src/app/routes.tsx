import { createBrowserRouter, Navigate } from 'react-router';
import { DashboardLayout } from './components/DashboardLayout';
import { Overview } from './pages/Overview';
import { PatientList } from './pages/PatientList';
import { PatientDetail } from './pages/PatientDetail';
import { MedicationSchedule } from './pages/MedicationSchedule';
import { Appointments } from './pages/Appointments';
import { Settings } from './pages/Settings';
import { Help } from './pages/Help';
import { KeyboardShortcuts } from './pages/KeyboardShortcuts';
import { Email } from './pages/Email';
import { UILibrary } from './pages/UILibrary';
import { AccessibilityAnnotations } from './pages/AccessibilityAnnotations';
// Patient pages
import { PatientOverview } from './pages/patient/PatientOverview';
import { MyCare } from './pages/patient/MyCare';
import { MyMedications } from './pages/patient/MyMedications';
import { MyAppointments } from './pages/patient/MyAppointments';
import { HealthJournal } from './pages/patient/HealthJournal';

export function createAppRouter(onThemeChange?: (theme: string) => void, currentTheme?: string, onLogout?: () => void) {
  return createBrowserRouter([
    {
      path: '/dashboard',
      element: <DashboardLayout onThemeChange={onThemeChange} currentTheme={currentTheme} onLogout={onLogout} />,
      children: [
        {
          index: true,
          element: <Overview />,
        },
        // Caregiver routes
        {
          path: 'patients',
          element: <PatientList />,
        },
        {
          path: 'patients/:patientId',
          element: <PatientDetail />,
        },
        {
          path: 'medications',
          element: <MedicationSchedule />,
        },
        {
          path: 'appointments',
          element: <Appointments />,
        },
        // Patient routes
        {
          path: 'patient-overview',
          element: <PatientOverview />,
        },
        {
          path: 'my-care',
          element: <MyCare />,
        },
        {
          path: 'my-medications',
          element: <MyMedications />,
        },
        {
          path: 'my-appointments',
          element: <MyAppointments />,
        },
        {
          path: 'health-journal',
          element: <HealthJournal />,
        },
        // Shared routes
        {
          path: 'settings',
          element: <Settings onThemeChange={onThemeChange} currentTheme={currentTheme} />,
        },
        {
          path: 'help',
          element: <Help />,
        },
        {
          path: 'shortcuts',
          element: <KeyboardShortcuts />,
        },
        {
          path: 'email',
          element: <Email />,
        },
        {
          path: 'ui-library',
          element: <UILibrary />,
        },
        {
          path: 'accessibility-annotations',
          element: <AccessibilityAnnotations />,
        },
      ],
    },
    {
      path: '*',
      element: <Navigate to="/dashboard" replace />,
    },
  ]);
}
