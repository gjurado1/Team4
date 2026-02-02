import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:go_router/go_router.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:mobile_flutter/router/app_router.dart';
import 'package:mobile_flutter/theme/app_theme_controller.dart';
import 'package:mobile_flutter/theme/app_theme_scope.dart';

void main() {
  // We declare this here so the test can talk to it directly
  late GoRouter router;

  Future<Widget> buildApp(String role) async {
    SharedPreferences.setMockInitialValues({
      'careconnect-role': role,
    });

    final controller = AppThemeController();
    // Initialize the router here
    router = buildRouter();

    return ProviderScope(
      child: AppThemeScope(
        controller: controller,
        child: MaterialApp.router(
          routerConfig: router,
        ),
      ),
    );
  }

  testWidgets('Caregiver routes build', (tester) async {
    final app = await buildApp('caregiver');
    await tester.pumpWidget(app);
    await tester.pumpAndSettle();

    final routes = [
      '/caregiver/dashboard',
      '/caregiver/patients',
      '/caregiver/schedule',
      '/messages',
      '/profile',
      '/settings',
      '/emergency',
    ];

    for (final r in routes) {
      router.go(r); // Talk directly to the router variable
      await tester.pumpAndSettle();
      expect(find.byType(Scaffold), findsWidgets, reason: 'Failed on route: $r');
    }
  });

  testWidgets('Patient routes build', (tester) async {
    final app = await buildApp('patient');
    await tester.pumpWidget(app);
    await tester.pumpAndSettle();

    final routes = [
      '/patient/dashboard',
      '/patient/checkin',
      '/patient/symptoms',
      '/patient/medications',
      '/patient/reports',
      '/messages',
      '/profile',
      '/settings',
      '/emergency',
    ];

    for (final r in routes) {
      router.go(r); // Talk directly to the router variable
      await tester.pumpAndSettle();
      expect(find.byType(Scaffold), findsWidgets, reason: 'Failed on route: $r');
    }
  });
}