import 'package:flutter/material.dart';

enum SpinnerSize { sm, md, lg }

class AppSpinner extends StatelessWidget {
  final SpinnerSize size;
  final Color color;

  const AppSpinner({
    super.key,
    this.size = SpinnerSize.md,
    this.color = const Color(0xFF4C6FBC), // --button-primary
  });

  double get dimension {
    switch (size) {
      case SpinnerSize.sm:
        return 16;
      case SpinnerSize.md:
        return 32;
      case SpinnerSize.lg:
        return 48;
    }
  }

  double get strokeWidth {
    switch (size) {
      case SpinnerSize.sm:
        return 2;
      case SpinnerSize.md:
        return 3;
      case SpinnerSize.lg:
        return 4;
    }
  }

  @override
  Widget build(BuildContext context) {
    return Semantics(
      label: "Loading",
      child: SizedBox(
        width: dimension,
        height: dimension,
        child: CircularProgressIndicator(
          strokeWidth: strokeWidth,
          valueColor: AlwaysStoppedAnimation<Color>(color),
        ),
      ),
    );
  }
}
