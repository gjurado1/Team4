import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';

import '../helpers/pump_app.dart';

void main() {
  testWidgets('forgot password modal can be cancelled and dismissed', (
    tester,
  ) async {
    await pumpCareConnectApp(tester, initialLocation: '/forgot-password');

    expect(find.text('Reset your password'), findsOneWidget);

    await tester.tap(find.widgetWithText(ElevatedButton, 'Reset Password'));
    await tester.pumpAndSettle();

    expect(find.text('Email address'), findsOneWidget);
    expect(find.widgetWithText(ElevatedButton, 'Send Reset Link'), findsOneWidget);

    await tester.tap(find.byIcon(Icons.close));
    await tester.pumpAndSettle();
    expect(find.text('Email address'), findsNothing);

    await tester.tap(find.widgetWithText(ElevatedButton, 'Reset Password'));
    await tester.pumpAndSettle();

    await tester.tap(find.widgetWithText(ElevatedButton, 'Cancel'));
    await tester.pumpAndSettle();

    expect(find.text('Email address'), findsNothing);
  });

  testWidgets('forgot password sends reset link and returns to login', (
    tester,
  ) async {
    await pumpCareConnectApp(tester, initialLocation: '/forgot-password');

    await tester.tap(find.widgetWithText(ElevatedButton, 'Reset Password'));
    await tester.pumpAndSettle();

    ElevatedButton sendButton() => tester.widget<ElevatedButton>(
      find.widgetWithText(ElevatedButton, 'Send Reset Link'),
    );

    expect(sendButton().onPressed, isNull);

    await tester.enterText(find.byType(TextField), 'patient@example.com');
    await tester.pumpAndSettle();

    expect(sendButton().onPressed, isNotNull);

    await tester.tap(find.widgetWithText(ElevatedButton, 'Send Reset Link'));
    await tester.pump();

    expect(
      find.text('Reset link sent! Check your email for instructions.'),
      findsOneWidget,
    );
    expect(
      tester
          .widget<ElevatedButton>(find.widgetWithText(ElevatedButton, 'Cancel'))
          .onPressed,
      isNull,
    );

    await tester.pump(const Duration(seconds: 2));
    await tester.pumpAndSettle();

    expect(find.text('Sign in to your account'), findsOneWidget);
  });
}
