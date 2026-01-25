import 'package:flutter/material.dart';

class AppTheme {
  static const Color bgPrimary = Color(0xFFF5F7FA);
  static const Color bgSurface = Colors.white;
  static const Color textPrimary = Color(0xFF1A2332);
  static const Color textSecondary = Color(0xFF4A5568);
  static const Color border = Color(0xFFCBD5E0);
  static const Color buttonPrimary = Color(0xFF4C6FBC);

  static ThemeData lightTheme = ThemeData(
    scaffoldBackgroundColor: bgPrimary,
    primaryColor: buttonPrimary,
    fontFamily: 'System',
    textTheme: const TextTheme(
      titleLarge: TextStyle(fontSize: 22, fontWeight: FontWeight.w600),
      bodyMedium: TextStyle(fontSize: 16),
    ),
    elevatedButtonTheme: ElevatedButtonThemeData(
      style: ElevatedButton.styleFrom(
        backgroundColor: buttonPrimary,
        foregroundColor: Colors.white,
        minimumSize: const Size.fromHeight(48),
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(8)),
      ),
    ),
  );
}
