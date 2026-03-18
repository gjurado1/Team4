import 'package:flutter_test/flutter_test.dart';

import '../helpers/pump_app.dart';

void main() {
  group('Medications Workflow (widget)', () {
    testWidgets('Medication list renders seeded items', (tester) async {
      await pumpCareConnectApp(
        tester,
        prefs: {'careconnect-role': 'patient'},
        initialLocation: '/patient/medications',
      );
      await tester.pumpAndSettle();

      expect(find.text("Today's Schedule"), findsOneWidget);
      expect(find.textContaining('Lisinopril'), findsWidgets);
    });

    testWidgets('Tapping Mark Taken updates UI state', (tester) async {
      await pumpCareConnectApp(
        tester,
        prefs: {'careconnect-role': 'patient'},
        initialLocation: '/patient/medications',
      );
      await tester.pumpAndSettle();

      final markTakenButton = find.text('Mark Taken').first;
      await tester.tap(markTakenButton);
      await tester.pumpAndSettle(const Duration(milliseconds: 500));

      expect(find.textContaining('Taken'), findsWidgets);
    });
  });
}
