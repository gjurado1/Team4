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

  /// THE MISSING PIECE: Loads saved values from the phone's storage
  Future<void> loadFromPrefs() async {
    final prefs = await SharedPreferences.getInstance();
    
    // 1. Load Theme Mode (System = 0, Light = 1, Dark = 2)
    final savedThemeIndex = prefs.getInt('careconnect-theme') ?? 0;
    themeMode = ThemeMode.values[savedThemeIndex];

    // 2. Load Text Scale
    textScaleFactor = prefs.getDouble('careconnect-textsize') ?? 1.0;
    
    // 3. (Optional) Load Vision Theme enum if you use it for custom colors
    final savedVisionIndex = prefs.getInt('careconnect-vision-theme') ?? 0;
    visionTheme = AppVisionTheme.values[savedVisionIndex];

    notifyListeners(); // Tells main.dart to rebuild the app with these values
  }

  void setThemeMode(ThemeMode mode) async {
    themeMode = mode;
    notifyListeners();
    
    // Persist the choice
    final prefs = await SharedPreferences.getInstance();
    await prefs.setInt('careconnect-theme', mode.index);
  }

  void setTextScale(double value) async {
    textScaleFactor = value;
    notifyListeners();
    
    // Persist the choice
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