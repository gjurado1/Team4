import 'package:flutter/material.dart';

class AppToggleGroup extends StatelessWidget {
  final List<AppToggleGroupItem> items;
  final String selected;
  final ValueChanged<String> onChanged;

  const AppToggleGroup({
    super.key,
    required this.items,
    required this.selected,
    required this.onChanged,
  });

  @override
  Widget build(BuildContext context) {
    return Row(
      mainAxisSize: MainAxisSize.min,
      children: items.map((item) {
        final isSelected = item.value == selected;

        return Expanded(
          child: GestureDetector(
            onTap: () => onChanged(item.value),
            child: Container(
              padding: const EdgeInsets.symmetric(vertical: 10),
              decoration: BoxDecoration(
                color: isSelected ? const Color(0xFF4C6FBC) : Colors.white,
                border: Border.all(color: const Color(0xFFCBD5E0)),
              ),
              child: Center(
                child: Text(
                  item.label,
                  style: TextStyle(
                    fontWeight: FontWeight.w600,
                    color: isSelected ? Colors.white : const Color(0xFF1A2332),
                  ),
                ),
              ),
            ),
          ),
        );
      }).toList(),
    );
  }
}

class AppToggleGroupItem {
  final String value;
  final String label;

  const AppToggleGroupItem({
    required this.value,
    required this.label,
  });
}
