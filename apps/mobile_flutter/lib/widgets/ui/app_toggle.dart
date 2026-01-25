import 'package:flutter/material.dart';

class AppToggle extends StatelessWidget {
  final String? label;
  final bool checked;
  final ValueChanged<bool> onChanged;
  final bool disabled;

  const AppToggle({
    super.key,
    this.label,
    required this.checked,
    required this.onChanged,
    this.disabled = false,
  });

  @override
  Widget build(BuildContext context) {
    final primaryColor = const Color(0xFF4C6FBC); // --button-primary
    final borderColor = const Color(0xFFCBD5E0); // --border

    return Semantics(
      toggled: checked,
      enabled: !disabled,
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          if (label != null) ...[
            Text(
              label!,
              style: const TextStyle(
                fontWeight: FontWeight.w500,
                color: Color(0xFF1A2332),
              ),
            ),
            const SizedBox(width: 12),
          ],

          GestureDetector(
            onTap: disabled ? null : () => onChanged(!checked),
            child: AnimatedContainer(
              duration: const Duration(milliseconds: 200),
              width: 56,
              height: 32,
              padding: const EdgeInsets.all(4),
              decoration: BoxDecoration(
                borderRadius: BorderRadius.circular(999),
                color: checked ? primaryColor : borderColor,
              ),
              child: Align(
                alignment: checked ? Alignment.centerRight : Alignment.centerLeft,
                child: Container(
                  width: 24,
                  height: 24,
                  decoration: const BoxDecoration(
                    color: Colors.white,
                    shape: BoxShape.circle,
                  ),
                ),
              ),
            ),
          ),
        ],
      ),
    );
  }
}
