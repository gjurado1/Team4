import 'package:flutter/material.dart';
import '../../theme/app_theme_scope.dart';

class AppTextarea extends StatelessWidget {
  final TextEditingController? controller;
  final String? hintText;
  final int minLines;
  final int maxLines;
  final ValueChanged<String>? onChanged;

  const AppTextarea({
    super.key,
    this.controller,
    this.hintText,
    this.minLines = 3,
    this.maxLines = 8,
    this.onChanged,
  });

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final themeController = AppThemeScope.of(context);
    final borderWidth = themeController.enhancedFocus ? 3.0 : 2.0;
    final minTouchSize = themeController.largeTouchTargets ? 56.0 : 48.0;

    return TextField(
      controller: controller,
      minLines: minLines,
      maxLines: maxLines,
      onChanged: onChanged,
      decoration: InputDecoration(
        hintText: hintText,
        filled: true,
        fillColor: theme.colorScheme.surface,
        contentPadding: const EdgeInsets.symmetric(horizontal: 14, vertical: 14),
        constraints: BoxConstraints(minHeight: minTouchSize),
        enabledBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(8),
          borderSide: BorderSide(color: theme.dividerColor, width: borderWidth),
        ),
        focusedBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(8),
          borderSide: BorderSide(color: theme.colorScheme.primary, width: borderWidth),
        ),
      ),
    );
  }
}
