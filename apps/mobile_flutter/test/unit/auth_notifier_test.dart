import 'package:flutter_test/flutter_test.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
// Ensure this path matches your project structure
import 'package:mobile_flutter/providers/auth_provider.dart';

void main() {
  test('User logs in successfully', () async {
    // 1. Create the container where our providers live
    final container = ProviderContainer();

    // 2. Access the notifier
    final notifier = container.read(authProvider.notifier);

    // 3. Await the login call 
    // (Assuming login() returns a Future. If not, remove 'await')
    // await notifier.login();
    await notifier.login();

    // 4. Read the state AFTER the operation completes
    final state = container.read(authProvider);
    
    // 5. Verify the result
    expect(state.isLoggedIn, true);
    
    // Clean up the container
    container.dispose();
  });
}