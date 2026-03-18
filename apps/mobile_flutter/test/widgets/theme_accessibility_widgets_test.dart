import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:mobile_flutter/theme/app_theme_controller.dart';
import 'package:mobile_flutter/theme/app_theme_provider.dart';
import 'package:mobile_flutter/theme/app_theme_scope.dart';
import 'package:mobile_flutter/widgets/accessibility/text_size_control.dart';
import 'package:mobile_flutter/widgets/accessibility/theme_selector.dart';

import '../helpers/test_harness.dart';

void main() {
  group('Theme/accessibility widgets', () {
    testWidgets('ThemeSelector renders options and updates the controller', (
      tester,
    ) async {
      final controller = AppThemeController();

      await tester.pumpWidget(
        createTestHarness(
          controller: controller,
          child: const Scaffold(body: ThemeSelector()),
        ),
      );
      await tester.pumpAndSettle();

      expect(find.text('Soft Blue-Gray'), findsOneWidget);
      expect(find.text('True Dark'), findsOneWidget);
      expect(find.text('Low-Glare Sepia'), findsOneWidget);
      expect(find.text('Active'), findsOneWidget);

      await tester.tap(find.text('True Dark'));
      await tester.pumpAndSettle();

      expect(controller.visionTheme, AppVisionTheme.darkContrast);
      expect(controller.themeMode, ThemeMode.dark);

      await tester.tap(find.text('Low-Glare Sepia'));
      await tester.pumpAndSettle();

      expect(controller.visionTheme, AppVisionTheme.sepia);
      expect(controller.themeMode, ThemeMode.light);
    });

    testWidgets('ThemeSelector supports both narrow and wide layouts', (
      tester,
    ) async {
      tester.view.physicalSize = const Size(1200, 1600);
      tester.view.devicePixelRatio = 1.0;
      addTearDown(tester.view.resetPhysicalSize);

      await tester.pumpWidget(
        createTestHarness(child: const Scaffold(body: ThemeSelector())),
      );
      await tester.pumpAndSettle();

      expect(find.text('Default high contrast'), findsOneWidget);
      expect(find.text('Maximum contrast'), findsOneWidget);
      expect(find.text('Reduced eye strain'), findsOneWidget);
    });

    testWidgets('TextSizeControl updates the text size controller', (
      tester,
    ) async {
      final controller = AppThemeController();

      await tester.pumpWidget(
        createTestHarness(
          controller: controller,
          child: const Scaffold(body: TextSizeControl()),
        ),
      );
      await tester.pumpAndSettle();

      expect(find.text('Normal'), findsOneWidget);
      expect(find.text('Medium'), findsOneWidget);
      expect(find.text('Large'), findsOneWidget);
      expect(find.textContaining('Sample text at current size'), findsOneWidget);

      await tester.tap(find.text('Large'));
      await tester.pumpAndSettle();
      expect(controller.textSizePercent, 200);

      await tester.tap(find.text('Medium'));
      await tester.pumpAndSettle();
      expect(controller.textSizePercent, 150);
    });

    testWidgets('AppThemeScope and AppThemeProvider expose controllers in the tree', (
      tester,
    ) async {
      final scopeController = AppThemeController();
      final providerController = AppThemeController();

      await tester.pumpWidget(
        MaterialApp(
          home: AppThemeProvider(
            controller: providerController,
            child: AppThemeScope(
              controller: scopeController,
              child: Builder(
                builder: (context) {
                  final fromScope = AppThemeScope.of(context);
                  final fromProvider = AppThemeProvider.of(context);
                  return Text(
                    '${identical(fromScope, scopeController)}-${identical(fromProvider, providerController)}',
                  );
                },
              ),
            ),
          ),
        ),
      );

      expect(find.text('true-true'), findsOneWidget);
    });

    testWidgets('AppThemeScope and AppThemeProvider assert when missing', (
      tester,
    ) async {
      await tester.pumpWidget(
        const MaterialApp(home: Scaffold(body: SizedBox.shrink())),
      );

      final element = tester.element(find.byType(SizedBox));

      expect(() => AppThemeScope.of(element), throwsA(isA<AssertionError>()));
      expect(
        () => AppThemeProvider.of(element),
        throwsA(isA<AssertionError>()),
      );
    });
  });
}
