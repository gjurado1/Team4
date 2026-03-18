import 'package:flutter_test/flutter_test.dart';

import 'helpers/pump_app.dart';

void main() {
  testWidgets('App boots', (tester) async {
    await pumpCareConnectApp(tester);

    expect(find.text('Sign in to your account'), findsOneWidget);
    expect(find.text('Sign In'), findsWidgets);
  });
}
