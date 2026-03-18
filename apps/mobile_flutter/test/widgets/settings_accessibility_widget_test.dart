import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:shared_preferences/shared_preferences.dart';
import '../helpers/pump_app.dart';

Future<void> _openExpansionTileByTitle(WidgetTester tester, String title) async {
  final tileFinder = find.text(title);

  expect(tileFinder, findsAtLeastNWidgets(1),
      reason: 'No widget found with exact text: "$title"');

  final target = tileFinder.first;

  await tester.scrollUntilVisible(
    target,
    150.0,
    maxScrolls: 30,
    duration: const Duration(milliseconds: 60),
  );

  await tester.pumpAndSettle(const Duration(milliseconds: 300));

  await tester.tap(target, warnIfMissed: false);
  await tester.pumpAndSettle(const Duration(milliseconds: 800));
}

Future<void> _expandAccessibilityTiles(WidgetTester tester) async {
  await tester.pumpAndSettle(const Duration(milliseconds: 200));
  await _openExpansionTileByTitle(tester, 'Vision Theme');
  await tester.pumpAndSettle(const Duration(milliseconds: 400));
  await _openExpansionTileByTitle(tester, 'Text Size');
  await tester.pumpAndSettle(const Duration(milliseconds: 400));
  await _openExpansionTileByTitle(tester, 'Voice Features');
  await tester.pumpAndSettle(const Duration(milliseconds: 400));
}

void main() {
  group('Settings + Accessibility (widget)', () {
    testWidgets('Settings page renders and contains accessibility widgets', (tester) async {
      await pumpCareConnectApp(
        tester,
        prefs: {'careconnect-role': 'caregiver'},
        initialLocation: '/settings',
      );

      await _expandAccessibilityTiles(tester);

      expect(find.text('Settings'), findsWidgets);
      // Text size section
      expect(find.text('Text Size'), findsWidgets);
      expect(find.text('Adjust font size'), findsOneWidget);
      expect(find.textContaining('Sample text at current size'), findsOneWidget);

      // Voice section labels
      expect(find.text('Voice Features'), findsOneWidget);
      expect(find.text('Read Aloud'), findsOneWidget);
      expect(find.text('Voice Commands'), findsOneWidget);
    });

    testWidgets('Read Aloud toggle can be tapped and persists to SharedPreferences', (tester) async {
      SharedPreferences.setMockInitialValues({'careconnect-role': 'caregiver'});

      await pumpCareConnectApp(
        tester,
        prefs: {'careconnect-role': 'caregiver'},
        initialLocation: '/settings',
      );

      await _expandAccessibilityTiles(tester);

      final targetFinder = find.byType(Switch).first;

      expect(targetFinder, findsOneWidget,
          reason: 'Could not identify the Read Aloud interactive element');

      await tester.ensureVisible(targetFinder);
      await tester.pumpAndSettle();
      await tester.tap(targetFinder, warnIfMissed: false);
      await tester.pumpAndSettle(const Duration(milliseconds: 1000));

      final prefs = await SharedPreferences.getInstance();
      
      final readAloudValue = prefs.getBool('careconnect-read-aloud') ??
                             prefs.getBool('read_aloud_enabled') ??
                             prefs.getBool('readAloud');

      expect(readAloudValue, isNotNull,
          reason: 'No read-aloud preference was saved to SharedPreferences');
    });

    testWidgets('Voice Commands toggle exists', (tester) async {
      await pumpCareConnectApp(
        tester,
        prefs: {'careconnect-role': 'caregiver'},
        initialLocation: '/settings',
      );

      await _expandAccessibilityTiles(tester);

      final voiceCommandsLabel = find.text('Voice Commands');
      expect(voiceCommandsLabel, findsOneWidget, reason: 'Missing Voice Commands label');
      
      expect(find.byType(Switch).at(1), findsOneWidget,
          reason: 'No switch found for "Voice Commands"');
    });

    testWidgets('Back button exists and can be tapped without crashing', (tester) async {
      await pumpCareConnectApp(
        tester,
        prefs: {'careconnect-role': 'caregiver'},
        initialLocation: '/settings',
      );

      expect(find.byTooltip('Back'), findsOneWidget);

      await tester.tap(find.byTooltip('Back'), warnIfMissed: false);
      await tester.pumpAndSettle();

      expect(tester.takeException(), isNull,
          reason: 'Exception thrown after tapping back button');
    });
  });
}
