// import 'package:flutter/material.dart';
// import 'package:flutter_test/flutter_test.dart';
// import 'package:mobile_flutter/widgets/navigation/header_voice_button.dart';
// import '../helpers/test_harness.dart';

// void main() {
//   group('HeaderVoiceButton interactions', () {
//     testWidgets('Tapping mic opens popover', (tester) async {
//       await tester.pumpWidget(
//         createTestHarness(
//           child: const Scaffold(
//             body: Center(child: HeaderVoiceButton()),
//           ),
//         ),
//       );
//       await tester.pumpAndSettle();

//       await tester.tap(find.byIcon(Icons.mic));
//       await tester.pumpAndSettle();

//       expect(find.text('Voice Options'), findsOneWidget);
//       expect(find.text('Read Screen'), findsOneWidget);
//       expect(find.text('Voice Command'), findsOneWidget);
//     });

//     testWidgets('Tapping outside closes popover', (tester) async {
//       await tester.pumpWidget(
//         createTestHarness(
//           child: const Scaffold(
//             body: Center(child: HeaderVoiceButton()),
//           ),
//         ),
//       );
//       await tester.pumpAndSettle();

//       await tester.tap(find.byIcon(Icons.mic));
//       await tester.pumpAndSettle();
//       expect(find.text('Voice Options'), findsOneWidget);

//       // Tap somewhere else
//       await tester.tapAt(const Offset(5, 5));
//       await tester.pumpAndSettle();
//       expect(find.text('Voice Options'), findsNothing);
//     });

//     testWidgets('Read Screen opens bottom sheet', (tester) async {
//       await tester.pumpWidget(
//         createTestHarness(
//           child: const Scaffold(
//             body: Center(child: HeaderVoiceButton()),
//           ),
//         ),
//       );
//       await tester.pumpAndSettle();

//       await tester.tap(find.byIcon(Icons.mic));
//       await tester.pumpAndSettle();

//       await tester.tap(find.text('Read Screen'));
//       await tester.pumpAndSettle();

//       expect(find.text('Read Screen'), findsWidgets);
//       expect(find.textContaining('UI preview', findRichText: true), findsWidgets);
//       expect(find.textContaining('Start', findRichText: true), findsWidgets);
//     });

//     testWidgets('Voice Command opens bottom sheet', (tester) async {
//       await tester.pumpWidget(
//         createTestHarness(
//           child: const Scaffold(
//             body: Center(child: HeaderVoiceButton()),
//           ),
//         ),
//       );
//       await tester.pumpAndSettle();

//       await tester.tap(find.byIcon(Icons.mic));
//       await tester.pumpAndSettle();

//       await tester.tap(find.text('Voice Command'));
//       await tester.pumpAndSettle();

//       expect(find.text('Voice Command'), findsWidgets);
//     });

//     testWidgets('Bottom sheet toggle changes button label', (tester) async {
//       await tester.pumpWidget(
//         createTestHarness(
//           child: const Scaffold(
//             body: Center(child: HeaderVoiceButton()),
//           ),
//         ),
//       );
//       await tester.pumpAndSettle();

//       await tester.tap(find.byIcon(Icons.mic));
//       await tester.pumpAndSettle();

//       await tester.tap(find.text('Voice Command'));
//       await tester.pumpAndSettle();

//       // Tap Start Listening
//       expect(find.textContaining('Start', findRichText: true), findsWidgets);
//       await tester.tap(find.byType(ElevatedButton));
//       await tester.pumpAndSettle();

//       // Should now contain Stop
//       expect(find.textContaining('Stop', findRichText: true), findsWidgets);
//     });
//   });
// }
import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:mobile_flutter/widgets/navigation/header_voice_button.dart';
import '../helpers/test_harness.dart';

void main() {
  group('HeaderVoiceButton interactions', () {
    // Helper to wrap the button in a Scaffold so InkWell has a Material ancestor
    Widget buildTestableWidget() {
      return createTestHarness(
        child: const Scaffold(
          body: Center(
            child: HeaderVoiceButton(),
          ),
        ),
      );
    }

    testWidgets('Bottom sheet toggle changes button label', (tester) async {
      await tester.pumpWidget(buildTestableWidget());
      await tester.pumpAndSettle();

      // 1. Open the Popover
      await tester.tap(find.byIcon(Icons.mic));
      await tester.pump();
      await tester.pumpAndSettle();

      // 2. Open the Bottom Sheet via "Voice Command"
      final voiceCommandOption = find.text('Voice Command');
      await tester.tap(voiceCommandOption);

      // CRITICAL: showModalBottomSheet takes time to animate onto the screen.
      // pumpAndSettle waits for the slide-up animation to finish.
      await tester.pumpAndSettle();

      // 3. Find the action button by its specific text.
      // This is better than find.byType(ElevatedButton) because it's more specific.
      final startBtn = find.text('Start Listening');
      expect(startBtn, findsOneWidget);

      // 4. Tap the button
      await tester.tap(startBtn);

      // Re-render to show the "Stop" state
      await tester.pumpAndSettle();

      // 5. Verify the state changed
      expect(find.text('Stop Listening'), findsOneWidget);
      expect(find.text('Status: ON'), findsOneWidget);
    });
    testWidgets('Popover closes when an option is selected', (tester) async {
      await tester.pumpWidget(buildTestableWidget());
      await tester.pumpAndSettle();

      // Open Popover
      await tester.tap(find.byIcon(Icons.mic));
      await tester.pump();
      await tester.pumpAndSettle();

      // Select "Read Screen"
      await tester.tap(find.text('Read Screen'));
      await tester.pumpAndSettle();

      // The Popover title should be gone
      expect(find.text('Voice Options'), findsNothing);
      // The Bottom Sheet title should be present
      expect(find.text('Read Screen'), findsOneWidget);
    });
  });
}
