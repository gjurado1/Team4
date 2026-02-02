import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:mobile_flutter/pages/emergency_page.dart';
import '../helpers/test_harness.dart';

void main() {
  group('EmergencyPage SOS flow', () {
    // Helper to set a consistent, large screen size for tests
    void setLargeScreen(WidgetTester tester) {
      tester.view.physicalSize = const Size(1080, 2400);
      tester.view.devicePixelRatio = 1.0;
    }

    testWidgets('Tap SOS opens confirm sheet', (tester) async {
      setLargeScreen(tester);
      await tester.pumpWidget(createTestHarness(child: const EmergencyPage()));
      await tester.pumpAndSettle();

      final sosFinder = find.text('SOS');
      await tester.ensureVisible(sosFinder); // Scroll to it
      await tester.tap(sosFinder);
      await tester.pumpAndSettle();

      expect(find.text('Activate Emergency SOS?'), findsOneWidget);
      expect(find.text('Confirm Emergency'), findsOneWidget);
      expect(find.text('Cancel'), findsOneWidget);
    });

    testWidgets('Cancel closes confirm sheet', (tester) async {
      setLargeScreen(tester);
      await tester.pumpWidget(createTestHarness(child: const EmergencyPage()));
      await tester.pumpAndSettle();

      await tester.ensureVisible(find.text('SOS'));
      await tester.tap(find.text('SOS'));
      await tester.pumpAndSettle();

      await tester.tap(find.text('Cancel'));
      await tester.pumpAndSettle();

      expect(find.text('Activate Emergency SOS?'), findsNothing);
    });

    testWidgets('Confirm activates emergency banner', (tester) async {
      setLargeScreen(tester);
      await tester.pumpWidget(createTestHarness(child: const EmergencyPage()));
      await tester.pumpAndSettle();

      await tester.ensureVisible(find.text('SOS'));
      await tester.tap(find.text('SOS'));
      await tester.pumpAndSettle();

      await tester.tap(find.text('Confirm Emergency'));
      await tester.pumpAndSettle();

      expect(find.text('Emergency Activated'), findsOneWidget);
    });

    testWidgets('After activation, tapping SOS again does nothing (no confirm)', (tester) async {
      setLargeScreen(tester);
      await tester.pumpWidget(createTestHarness(child: const EmergencyPage()));
      await tester.pumpAndSettle();

      // Activate once
      await tester.ensureVisible(find.text('SOS'));
      await tester.tap(find.text('SOS'));
      await tester.pumpAndSettle();
      await tester.tap(find.text('Confirm Emergency'));
      await tester.pumpAndSettle();

      // Tap SOS again
      await tester.tap(find.text('SOS'));
      await tester.pumpAndSettle();

      expect(find.text('Activate Emergency SOS?'), findsNothing);
    });

    testWidgets('Call contact button exists (phone icon)', (tester) async {
      setLargeScreen(tester);
      await tester.pumpWidget(createTestHarness(child: const EmergencyPage()));
      await tester.pumpAndSettle();

      // Since phone icons are inside a SliverList, we use dragUntilVisible 
      // to find them if they aren't on screen initially.
      final phoneIcon = find.byIcon(Icons.phone).first;
      
      await tester.dragUntilVisible(
        phoneIcon,
        find.byType(CustomScrollView),
        const Offset(0, -500),
      );
      await tester.pumpAndSettle();

      expect(phoneIcon, findsOneWidget);
    });
  });
}