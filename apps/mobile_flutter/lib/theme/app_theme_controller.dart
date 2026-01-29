import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';

enum AppVisionTheme { defaultTheme, darkContrast, sepia }

class AppThemeController extends ChangeNotifier {
  AppVisionTheme visionTheme = AppVisionTheme.defaultTheme;
  double textScaleFactor = 1.0;
  final double minTextScale = 0.9;
  final double maxTextScale = 1.3;
  final int textScaleDivisions = 4;
  int textSizePercent = 100;
  ThemeMode themeMode = ThemeMode.system;

  /// Computed property that returns the actual ThemeData to use
  ThemeData get currentTheme {
    // Check for Sepia first
    if (visionTheme == AppVisionTheme.sepia) {
      return ThemeData(
        useMaterial3: true,
        brightness: Brightness.light,
        scaffoldBackgroundColor: const Color(0xFFF4F1E8),
        cardColor: const Color(0xFFEAE6D8),
        colorScheme: ColorScheme.fromSeed(
          seedColor: const Color(0xFF8B6F47),
          surface: const Color(0xFFF4F1E8),
          onSurface: const Color(0xFF433422),
          primary: const Color(0xFF8B6F47),
        ),
        textTheme: const TextTheme(
          bodyLarge: TextStyle(color: Color(0xFF433422)),
          bodyMedium: TextStyle(color: Color(0xFF433422)),
          titleLarge: TextStyle(color: Color(0xFF433422)),
        ),
        // Ensures app bar matches sepia tones
        appBarTheme: const AppBarTheme(
          backgroundColor: Color(0xFFF4F1E8),
          foregroundColor: Color(0xFF433422),
          elevation: 0,
        ),
      );
    }

    // Standard logic: Return Dark or Light based on themeMode
    if (themeMode == ThemeMode.dark) {
      return ThemeData.dark(useMaterial3: true);
    }
    return ThemeData.light(useMaterial3: true);
  }

  /// Loads saved values from the phone's storage
  Future<void> loadFromPrefs() async {
    final prefs = await SharedPreferences.getInstance();
    
    final savedThemeIndex = prefs.getInt('careconnect-theme') ?? 0;
    themeMode = ThemeMode.values[savedThemeIndex];

    textScaleFactor = prefs.getDouble('careconnect-textsize') ?? 1.0;
    
    final savedVisionIndex = prefs.getInt('careconnect-vision-theme') ?? 0;
    visionTheme = AppVisionTheme.values[savedVisionIndex];

    notifyListeners(); 
  }

  void setThemeMode(ThemeMode mode) async {
    themeMode = mode;
    notifyListeners();
    
    final prefs = await SharedPreferences.getInstance();
    await prefs.setInt('careconnect-theme', mode.index);
  }

  void setTextScale(double value) async {
    textScaleFactor = value;
    notifyListeners();
    
    final prefs = await SharedPreferences.getInstance();
    await prefs.setDouble('careconnect-textsize', value);
  }

  void setVisionTheme(AppVisionTheme t) async {
    visionTheme = t;
    notifyListeners();
    
    final prefs = await SharedPreferences.getInstance();
    await prefs.setInt('careconnect-vision-theme', t.index);
  }

  void setTextSizePercent(int p) {
    textSizePercent = p;
    notifyListeners();
  }
}