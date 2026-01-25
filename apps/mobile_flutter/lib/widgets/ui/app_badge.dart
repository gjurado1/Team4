import 'package:flutter/material.dart';

enum BadgeVariant { success, warning, error }

class AppBadge extends StatelessWidget {
  final BadgeVariant variant;
  final String text;

  const AppBadge({
    super.key,
    required this.variant,
    required this.text,
  });

  @override
  Widget build(BuildContext context) {
    Color background;
    Color textColor;

    switch (variant) {
      case BadgeVariant.success:
        background = const Color(0xFFC6F6D5); // light green
        textColor = const Color(0xFF2F855A);
        break;
      case BadgeVariant.warning:
        background = const Color(0xFFFEF5E7); // light yellow
        textColor = const Color(0xFFD69E2E);
        break;
      case BadgeVariant.error:
        background = const Color(0xFFFED7D7); // light red
        textColor = const Color(0xFFC53030);
        break;
    }

    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
      decoration: BoxDecoration(
        color: background,
        borderRadius: BorderRadius.circular(999),
      ),
      child: Text(
        text,
        style: TextStyle(
          fontSize: 12,
          fontWeight: FontWeight.w600,
          color: textColor,
        ),
      ),
    );
  }
}
