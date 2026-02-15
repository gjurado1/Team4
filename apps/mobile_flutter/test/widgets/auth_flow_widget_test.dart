import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:path/path.dart' as p;
import 'package:sqflite/sqflite.dart';
import 'package:sqflite_common_ffi/sqflite_ffi.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:mobile_flutter/services/database_helper.dart';

import '../helpers/pump_app.dart';

void main() {
  setUpAll(() async {
    sqfliteFfiInit();
    databaseFactory = databaseFactoryFfi;
    await DatabaseHelper.instance.resetForTest();
    final dbPath = await getDatabasesPath();
    await deleteDatabase(p.join(dbPath, 'app_database.db'));
  });

  group('Auth Flow (widget)', () {
    testWidgets('Login page renders core UI', (tester) async {
      await pumpCareConnectApp(tester);
      expect(find.text('Sign In'), findsWidgets);
      expect(find.byType(TextField), findsNWidgets(2));
      expect(find.widgetWithText(ElevatedButton, 'Sign In'), findsOneWidget);
      expect(find.textContaining('Patient Account'), findsOneWidget);
      expect(find.textContaining('Caregiver Account'), findsOneWidget);
    });

    testWidgets('Empty submit shows validation error', (tester) async {
      await pumpCareConnectApp(tester);
      await tester.tap(find.widgetWithText(ElevatedButton, 'Sign In'));
      await tester.pumpAndSettle();
      expect(find.text('Please enter both username and password.'), findsOneWidget);
    });

    testWidgets('Caregiver demo tile navigates to caregiver dashboard', (tester) async {
      await pumpCareConnectApp(tester);
      final caregiverTile = find.textContaining('Caregiver Account').first;
      await tester.ensureVisible(caregiverTile);
      await tester.pumpAndSettle();
      await tester.tap(caregiverTile);
      await tester.pumpAndSettle();
      expect(find.text('Welcome back'), findsOneWidget);
    });

    testWidgets('Patient demo tile navigates to patient dashboard', (tester) async {
      await pumpCareConnectApp(tester);
      final patientTile = find.textContaining('Patient Account').first;
      await tester.ensureVisible(patientTile);
      await tester.pumpAndSettle();
      await tester.tap(patientTile);
      await tester.pumpAndSettle();
      expect(find.text('Hello, Sarah'), findsOneWidget);
      expect(find.text('Daily Check-In'), findsOneWidget);
    });

    testWidgets('Role is stored in SharedPreferences after caregiver demo login', (tester) async {
      await pumpCareConnectApp(tester);
      final caregiverTile = find.textContaining('Caregiver Account').first;
      await tester.ensureVisible(caregiverTile);
      await tester.pumpAndSettle();
      await tester.tap(caregiverTile);
      await tester.pumpAndSettle();
      final prefs = await SharedPreferences.getInstance();
      expect(prefs.getString('careconnect-role'), equals('caregiver'));
    });

    testWidgets('Role is stored in SharedPreferences after patient demo login', (tester) async {
      await pumpCareConnectApp(tester);
      final patientTile = find.textContaining('Patient Account').first;
      await tester.ensureVisible(patientTile);
      await tester.pumpAndSettle();
      await tester.tap(patientTile);
      await tester.pumpAndSettle();
      final prefs = await SharedPreferences.getInstance();
      expect(prefs.getString('careconnect-role'), equals('patient'));
    });

    testWidgets('Invalid credentials show error', (tester) async {
      await pumpCareConnectApp(tester);
      await tester.enterText(find.byType(TextField).at(0), 'not-a-user');
      await tester.enterText(find.byType(TextField).at(1), 'wrong-password');
      await tester.tap(find.widgetWithText(ElevatedButton, 'Sign In'));
      await tester.runAsync(() async {
        await Future<void>.delayed(const Duration(milliseconds: 100));
      });
      await tester.pumpAndSettle();
      expect(find.text('Invalid username or password. Please try again.'), findsOneWidget);
    });

    testWidgets('Database credentials route to caregiver dashboard', (tester) async {
      await pumpCareConnectApp(tester);
      await tester.enterText(find.byType(TextField).at(0), 'admin');
      await tester.enterText(find.byType(TextField).at(1), 'password123');
      await tester.tap(find.widgetWithText(ElevatedButton, 'Sign In'));
      await tester.runAsync(() async {
        await Future<void>.delayed(const Duration(milliseconds: 100));
      });
      await tester.pumpAndSettle();
      expect(find.text('Welcome back'), findsOneWidget);
      final prefs = await SharedPreferences.getInstance();
      expect(prefs.getString('careconnect-role'), equals('caregiver'));
    });

    testWidgets('Unknown route falls back to Login page', (tester) async {
      final router = await pumpCareConnectApp(tester);
      router.go('/this-route-does-not-exist');
      await tester.pumpAndSettle();
      expect(find.text('Sign In'), findsWidgets);
    });
  });
}
