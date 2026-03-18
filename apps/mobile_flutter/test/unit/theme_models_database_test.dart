import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:mobile_flutter/models/auth_state.dart';
import 'package:mobile_flutter/models/user.dart';
import 'package:mobile_flutter/services/database_helper.dart';
import 'package:mobile_flutter/theme/app_colors.dart';
import 'package:mobile_flutter/theme/app_text_styles.dart';
import 'package:mobile_flutter/theme/app_theme.dart';
import 'package:mobile_flutter/theme/app_theme_controller.dart';
import 'package:path/path.dart' as p;
import 'package:shared_preferences/shared_preferences.dart';
import 'package:sqflite_common_ffi/sqflite_ffi.dart';

void main() {
  TestWidgetsFlutterBinding.ensureInitialized();

  group('Theme and model helpers', () {
    test('AuthState copyWith updates login state', () {
      final state = AuthState(isLoggedIn: false);
      final next = state.copyWith(isLoggedIn: true);

      expect(next.isLoggedIn, isTrue);
      expect(state.isLoggedIn, isFalse);
    });

    test('User converts to and from map', () {
      final user = User(id: 7, username: 'alice', password: 'secret');
      final map = user.toMap();
      final restored = User.fromMap(map);

      expect(map['id'], 7);
      expect(map['username'], 'alice');
      expect(map['password'], 'secret');
      expect(restored.id, 7);
      expect(restored.username, 'alice');
      expect(restored.password, 'secret');
    });

    test('AppTextStyles uses theme colors and fallback fonts', () {
      final textTheme = AppTextStyles.textTheme(AppColors.light);

      expect(textTheme.headlineLarge?.color, AppColors.light.textPrimary);
      expect(textTheme.bodyMedium?.color, AppColors.light.textSecondary);
      expect(
        textTheme.bodySmall?.fontFamilyFallback,
        AppTextStyles.fontFamilyFallback,
      );
    });

    test('AppTheme creates light, dark contrast, and sepia themes', () {
      final light = AppTheme.light();
      final dark = AppTheme.darkContrast();
      final sepia = AppTheme.sepia();

      expect(light.brightness, Brightness.light);
      expect(dark.brightness, Brightness.dark);
      expect(sepia.scaffoldBackgroundColor, AppColors.sepia.bgPrimary);
      expect(light.cardTheme.color, AppColors.light.bgSurface);
      expect(dark.colorScheme.primary, AppColors.darkContrast.buttonPrimary);
    });
  });

  group('AppThemeController', () {
    test('loads persisted values from SharedPreferences', () async {
      SharedPreferences.setMockInitialValues({
        'careconnect-theme': ThemeMode.dark.index,
        'careconnect-textsize': 1.2,
        'careconnect-vision-theme': AppVisionTheme.sepia.index,
        'careconnect-enhanced-focus': false,
        'careconnect-large-touch': false,
        'careconnect-screen-reader': true,
      });

      final controller = AppThemeController();
      await controller.loadFromPrefs();

      expect(controller.themeMode, ThemeMode.dark);
      expect(controller.textScaleFactor, 1.2);
      expect(controller.visionTheme, AppVisionTheme.sepia);
      expect(controller.enhancedFocus, isFalse);
      expect(controller.largeTouchTargets, isFalse);
      expect(controller.screenReaderSupport, isTrue);
    });

    test('updates settings, persists them, and exposes matching themes', () async {
      SharedPreferences.setMockInitialValues({});
      final controller = AppThemeController();

      controller.setThemeMode(ThemeMode.light);
      controller.setTextScale(1.1);
      controller.setVisionTheme(AppVisionTheme.darkContrast);
      controller.setTextSizePercent(200);
      controller.setEnhancedFocus(false);
      controller.setLargeTouchTargets(false);
      controller.setScreenReaderSupport(true);

      await Future<void>.delayed(const Duration(milliseconds: 10));

      final prefs = await SharedPreferences.getInstance();
      expect(controller.textSizePercent, 200);
      expect(controller.textScaleFactor, 2.0);
      expect(controller.lightTheme.brightness, Brightness.light);
      expect(controller.darkTheme.colorScheme.surface, Colors.black);
      expect(prefs.getInt('careconnect-theme'), ThemeMode.light.index);
      expect(prefs.getDouble('careconnect-textsize'), 2.0);
      expect(prefs.getInt('careconnect-text-percent'), 200);
      expect(
        prefs.getInt('careconnect-vision-theme'),
        AppVisionTheme.darkContrast.index,
      );
      expect(prefs.getBool('careconnect-enhanced-focus'), isFalse);
      expect(prefs.getBool('careconnect-large-touch'), isFalse);
      expect(prefs.getBool('careconnect-screen-reader'), isTrue);
    });
  });

  group('DatabaseHelper', () {
    setUpAll(() async {
      sqfliteFfiInit();
      databaseFactory = databaseFactoryFfi;
    });

    setUp(() async {
      await DatabaseHelper.instance.resetForTest();
      final dbPath = await getDatabasesPath();
      await deleteDatabase(p.join(dbPath, 'app_database.db'));
    });

    test('seeds admin user and supports successful and failed login', () async {
      final admin = await DatabaseHelper.instance.login('admin', 'password123');
      final missing = await DatabaseHelper.instance.login('admin', 'wrong');

      expect(admin, isNotNull);
      expect(admin?.username, 'admin');
      expect(missing, isNull);
    });

    test('creates a user and can log in with it', () async {
      final id = await DatabaseHelper.instance.createUser(
        User(username: 'newpatient', password: 'pw123456'),
      );
      final user = await DatabaseHelper.instance.login('newpatient', 'pw123456');

      expect(id, greaterThan(0));
      expect(user, isNotNull);
      expect(user?.username, 'newpatient');
    });

    test('resetForTest clears the cached database connection', () async {
      final first = await DatabaseHelper.instance.database;
      await DatabaseHelper.instance.resetForTest();
      final second = await DatabaseHelper.instance.database;

      expect(identical(first, second), isFalse);
    });
  });
}
