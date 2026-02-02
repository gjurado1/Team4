import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../models/auth_state.dart';

class AuthNotifier extends StateNotifier<AuthState> {
  AuthNotifier() : super(AuthState(isLoggedIn: false));

  Future<void> login() async {
    // Simulate an async login operation (e.g., network request)
    
    state = state.copyWith(isLoggedIn: true);
  }

  void logout() {
    state = state.copyWith(isLoggedIn: false);
  }
}

final authProvider =
    StateNotifierProvider<AuthNotifier, AuthState>(
  (ref) => AuthNotifier(),
);
