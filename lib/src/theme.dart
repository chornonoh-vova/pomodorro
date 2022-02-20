import 'package:flutter/material.dart';

class PomodorroTheme {
  static ThemeData get light {
    return ThemeData(
      brightness: Brightness.light,
      fontFamily: 'ArialRounded',
      visualDensity: VisualDensity.adaptivePlatformDensity,
    );
  }

  static ThemeData get dark {
    return ThemeData(
      brightness: Brightness.dark,
      fontFamily: 'ArialRounded',
      visualDensity: VisualDensity.adaptivePlatformDensity,
    );
  }
}
