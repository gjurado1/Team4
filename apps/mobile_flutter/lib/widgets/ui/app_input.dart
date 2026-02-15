import 'package:flutter/material.dart';
import '../../theme/app_theme_scope.dart';

class AppInput extends StatelessWidget {
  final String? label;
  final String? hintText;
  final TextEditingController? controller;
  final bool obscureText;
  final TextInputType? keyboardType;
  final TextInputAction? textInputAction;
  final ValueChanged<String>? onChanged;
  final ValueChanged<String>? onSubmitted;
  final TextAlign textAlign;
  // 🔽 ADD THESE
  final Widget? prefix;
  final Widget? suffix;

  const AppInput({
    super.key,
    this.label,
    this.hintText,
    this.controller,
    this.obscureText = false,
    this.keyboardType,
    this.textInputAction,
    this.onChanged,
    this.onSubmitted,
    this.prefix,
    this.suffix,
    this.textAlign = TextAlign.start,
  });

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final themeController = AppThemeScope.of(context);
    final borderWidth = themeController.enhancedFocus ? 3.0 : 2.0;
    final minTouchSize = themeController.largeTouchTargets ? 56.0 : 48.0;
    final semanticLabel = label ?? hintText ?? 'Input field';

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        if (label != null) ...[
          Text(
            label!,
            style: theme.textTheme.bodySmall?.copyWith(fontWeight: FontWeight.w600),
          ),
          const SizedBox(height: 6),
        ],

        Semantics(
          textField: true,
          label: semanticLabel,
          child: TextField(
            controller: controller,
            obscureText: obscureText,
            keyboardType: keyboardType,
            textInputAction: textInputAction,
            onChanged: onChanged,
            onSubmitted: onSubmitted,
            textAlign: textAlign,
            decoration: InputDecoration(
              hintText: hintText,
              prefixIcon: prefix,
              suffixIcon: suffix,
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
          ),
        ),
      ],
    );
  }
}
