import 'package:go_router/go_router.dart';

// Auth
import '../screens/auth/login_screen.dart';
import '../screens/auth/register_screen.dart';
import '../screens/auth/forgot_password_screen.dart';

// Patient
import '../screens/patient/patient_dashboard_screen.dart';
import '../screens/patient/patient_checkin_screen.dart';
import '../screens/patient/patient_list_screen.dart';
import '../screens/patient/symptoms_screen.dart';

// Caregiver
import '../screens/caregiver/caregiver_dashboard_screen.dart';
import '../screens/caregiver/messages_screen.dart';
import '../screens/caregiver/emergency_screen.dart';

// Other
import '../screens/meds/medications_screen.dart';
import '../screens/schedule/schedule_screen.dart';
import '../screens/reports/reports_screen.dart';
import '../screens/profile/profile_screen.dart';
import '../screens/profile/settings_screen.dart';

class Routes {
  static const login = '/login';
  static const register = '/register';
  static const forgotPassword = '/forgot-password';

  static const patientDashboard = '/patient/dashboard';
  static const patientCheckin = '/patient/checkin';
  static const patientList = '/patient/list';
  static const symptoms = '/patient/symptoms';

  static const caregiverDashboard = '/caregiver/dashboard';
  static const messages = '/messages';
  static const emergency = '/emergency';

  static const medications = '/medications';
  static const schedule = '/schedule';
  static const reports = '/reports';

  static const profile = '/profile';
  static const settings = '/settings';
}

class AppRouter {
  static final router = GoRouter(
    initialLocation: Routes.login,
    routes: [
      GoRoute(path: Routes.login, builder: (_, __) => const LoginScreen()),
      GoRoute(path: Routes.register, builder: (_, __) => const RegisterScreen()),
      GoRoute(path: Routes.forgotPassword, builder: (_, __) => const ForgotPasswordScreen()),

      GoRoute(path: Routes.patientDashboard, builder: (_, __) => const PatientDashboardScreen()),
      GoRoute(path: Routes.patientCheckin, builder: (_, __) => const PatientCheckinScreen()),
      GoRoute(path: Routes.patientList, builder: (_, __) => const PatientListScreen()),
      GoRoute(path: Routes.symptoms, builder: (_, __) => const SymptomsScreen()),

      GoRoute(path: Routes.caregiverDashboard, builder: (_, __) => const CaregiverDashboardScreen()),
      GoRoute(path: Routes.messages, builder: (_, __) => const MessagesScreen()),
      GoRoute(path: Routes.emergency, builder: (_, __) => const EmergencyScreen()),

      GoRoute(path: Routes.medications, builder: (_, __) => const MedicationsScreen()),
      GoRoute(path: Routes.schedule, builder: (_, __) => const ScheduleScreen()),
      GoRoute(path: Routes.reports, builder: (_, __) => const ReportsScreen()),

      GoRoute(path: Routes.profile, builder: (_, __) => const ProfileScreen()),
      GoRoute(path: Routes.settings, builder: (_, __) => const SettingsScreen()),
    ],
  );
}
