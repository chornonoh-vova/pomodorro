import 'package:flutter/material.dart';

import 'utils/colors.dart';

class PomodorroTheme {
  static const Color _primaryColor = Color(0xffd95550);

  static final MaterialColor _primarySwatch =
      generateMaterialColor(_primaryColor);

  static const _appBarTheme = AppBarTheme(
    elevation: 0,
  );

  static const TextTheme _lightTextTheme = TextTheme(
    bodyText1: TextStyle(
      fontFamily: 'ArialRounded',
      fontSize: 16.0,
      fontWeight: FontWeight.w700,
      color: Colors.black,
    ),
  );

  static const TextTheme _darkTextTheme = TextTheme(
    bodyText1: TextStyle(
      fontFamily: 'ArialRounded',
      fontSize: 16.0,
      fontWeight: FontWeight.w700,
      color: Colors.white,
    ),
  );

  static ThemeData get light {
    return ThemeData(
      brightness: Brightness.light,
      primaryColor: _primaryColor,
      splashColor: _primaryColor,
      primarySwatch: _primarySwatch,
      appBarTheme: _appBarTheme,
      textTheme: _lightTextTheme,
      fontFamily: 'ArialRounded',
    );
  }

  static ThemeData get dark {
    return ThemeData(
      brightness: Brightness.dark,
      primaryColor: _primaryColor,
      splashColor: _primaryColor,
      primarySwatch: _primarySwatch,
      appBarTheme: _appBarTheme,
      textTheme: _darkTextTheme,
      fontFamily: 'ArialRounded',
    );
  }
}
