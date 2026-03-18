import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';

import '../helpers/pump_app.dart';

void main() {
  testWidgets('register flow advances through all steps and completes', (
    tester,
  ) async {
    await pumpCareConnectApp(tester, initialLocation: '/register');

    expect(find.text('Create Your CareConnect Account'), findsOneWidget);
    expect(find.text('Step 1 of 5'), findsOneWidget);

    ElevatedButton nextButton() =>
        tester.widget<ElevatedButton>(find.widgetWithText(ElevatedButton, 'Next'));

    expect(nextButton().onPressed, isNull);

    await tester.tap(find.text('I provide care and monitor health for patients'));
    await tester.pumpAndSettle();

    expect(nextButton().onPressed, isNotNull);

    await tester.ensureVisible(find.widgetWithText(ElevatedButton, 'Next'));
    await tester.tap(find.widgetWithText(ElevatedButton, 'Next'));
    await tester.pumpAndSettle();

    expect(find.text('Personal Information'), findsOneWidget);
    await tester.enterText(find.bySemanticsLabel('First Name *'), 'Jamie');
    await tester.enterText(find.bySemanticsLabel('Last Name *'), 'Smith');
    await tester.enterText(find.bySemanticsLabel('Date of Birth *'), '01 / 31 / 1975');

    await tester.ensureVisible(find.widgetWithText(ElevatedButton, 'Next'));
    await tester.tap(find.widgetWithText(ElevatedButton, 'Next'));
    await tester.pumpAndSettle();

    expect(find.text('Contact Information'), findsOneWidget);
    await tester.enterText(find.bySemanticsLabel('Phone Number *'), '(555) 222-1111');
    await tester.enterText(find.bySemanticsLabel('Email Address *'), 'jamie@example.com');
    await tester.enterText(find.bySemanticsLabel('Street Address *'), '123 Main Street');
    await tester.enterText(find.bySemanticsLabel('City *'), 'Springfield');
    await tester.enterText(find.bySemanticsLabel('State'), 'IL');
    await tester.enterText(find.bySemanticsLabel('ZIP Code'), '62701');

    await tester.ensureVisible(find.widgetWithText(ElevatedButton, 'Back'));
    await tester.tap(find.widgetWithText(ElevatedButton, 'Back'));
    await tester.pumpAndSettle();
    expect(find.text('Personal Information'), findsOneWidget);

    await tester.ensureVisible(find.widgetWithText(ElevatedButton, 'Next'));
    await tester.tap(find.widgetWithText(ElevatedButton, 'Next'));
    await tester.pumpAndSettle();
    expect(find.text('Contact Information'), findsOneWidget);

    await tester.ensureVisible(find.widgetWithText(ElevatedButton, 'Next'));
    await tester.tap(find.widgetWithText(ElevatedButton, 'Next'));
    await tester.pumpAndSettle();

    expect(find.text('Account Setup Complete!'), findsOneWidget);

    await tester.ensureVisible(find.widgetWithText(ElevatedButton, 'Next'));
    await tester.tap(find.widgetWithText(ElevatedButton, 'Next'));
    await tester.pumpAndSettle();

    expect(find.text('Review'), findsOneWidget);
    expect(find.text('Caregiver'), findsOneWidget);
    expect(find.text('Jamie Smith'), findsOneWidget);
    expect(find.text('01 / 31 / 1975'), findsOneWidget);
    expect(find.text('(555) 222-1111'), findsOneWidget);
    expect(find.text('jamie@example.com'), findsOneWidget);
    expect(find.text('123 Main Street, Springfield IL 62701'), findsOneWidget);

    await tester.ensureVisible(find.widgetWithText(ElevatedButton, 'Complete'));
    await tester.tap(find.widgetWithText(ElevatedButton, 'Complete'));
    await tester.pumpAndSettle();

    expect(find.text('Sign in to your account'), findsOneWidget);
  });

  testWidgets('register back to login works from the first step', (tester) async {
    await pumpCareConnectApp(tester, initialLocation: '/register');

    await tester.ensureVisible(find.widgetWithText(ElevatedButton, 'Back to Login'));
    await tester.tap(find.widgetWithText(ElevatedButton, 'Back to Login'));
    await tester.pumpAndSettle();

    expect(find.text('Sign in to your account'), findsOneWidget);
  });
}
