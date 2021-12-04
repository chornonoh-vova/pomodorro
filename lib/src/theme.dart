import 'package:flutter/material.dart';

import 'utils/colors.dart';

class PomodorroTheme {
  static const Color _primaryColor = Color(0xFFCA3C32);
  static const Color _secondaryColor = Color(0xFF3F6C33);

  static final ColorScheme _lightColorScheme = ColorScheme(
    primary: const Color(0xFFCA3C32),
    primaryVariant: const Color(0xFF92000b),
    secondary: const Color(0xFF3F6C33),
    secondaryVariant: const Color(0xFF12410a),
    background: const Color(0xFFEA9D9A),
    error: Colors.yellow[700]!,
    surface: const Color(0xffffffff),
    onPrimary: const Color(0xffffffff),
    onSecondary: const Color(0xffffffff),
    onBackground: const Color(0xff000000),
    onSurface: const Color(0xff000000),
    onError: const Color(0xff000000),
    brightness: Brightness.light,
  );

  static final ColorScheme _darkColorScheme = ColorScheme.fromSwatch(
    primarySwatch: generateMaterialColor(_primaryColor),
    accentColor: _secondaryColor,
    brightness: Brightness.dark,
  );

  static const _appBarTheme = AppBarTheme(
    elevation: 0,
  );

  static const TextTheme _textTheme = TextTheme(
    headline1: TextStyle(
      fontFamily: 'ArialRounded',
      fontSize: 96,
      fontWeight: FontWeight.w300,
      letterSpacing: -1.5,
    ),
    headline2: TextStyle(
      fontFamily: 'ArialRounded',
      fontSize: 60,
      fontWeight: FontWeight.w300,
      letterSpacing: -0.5,
    ),
    headline3: TextStyle(
      fontFamily: 'ArialRounded',
      fontSize: 48,
      fontWeight: FontWeight.w400,
    ),
    headline4: TextStyle(
      fontFamily: 'ArialRounded',
      fontSize: 34,
      fontWeight: FontWeight.w400,
      letterSpacing: 0.25,
    ),
    headline5: TextStyle(
      fontFamily: 'ArialRounded',
      fontSize: 24,
      fontWeight: FontWeight.w400,
    ),
    headline6: TextStyle(
      fontFamily: 'ArialRounded',
      fontSize: 20,
      fontWeight: FontWeight.w500,
      letterSpacing: 0.15,
    ),
    subtitle1: TextStyle(
      fontFamily: 'ArialRounded',
      fontSize: 16,
      fontWeight: FontWeight.w400,
      letterSpacing: 0.15,
    ),
    subtitle2: TextStyle(
      fontFamily: 'ArialRounded',
      fontSize: 14,
      fontWeight: FontWeight.w500,
      letterSpacing: 0.1,
    ),
    bodyText1: TextStyle(
      fontFamily: 'ArialRounded',
      fontSize: 16,
      fontWeight: FontWeight.w400,
      letterSpacing: 0.5,
    ),
    bodyText2: TextStyle(
      fontFamily: 'ArialRounded',
      fontSize: 14,
      fontWeight: FontWeight.w400,
      letterSpacing: 0.25,
    ),
    button: TextStyle(
      fontFamily: 'ArialRounded',
      fontSize: 16,
      fontWeight: FontWeight.w500,
      letterSpacing: 1.25,
    ),
    caption: TextStyle(
      fontFamily: 'ArialRounded',
      fontSize: 12,
      fontWeight: FontWeight.w400,
      letterSpacing: 0.4,
    ),
    overline: TextStyle(
      fontFamily: 'ArialRounded',
      fontSize: 10,
      fontWeight: FontWeight.w400,
      letterSpacing: 1.5,
    ),
  );

  static ThemeData get light {
    return ThemeData(
      brightness: Brightness.light,
      colorScheme: _lightColorScheme,
      primaryColor: _primaryColor,
      appBarTheme: _appBarTheme,
      textTheme: _textTheme,
      fontFamily: 'ArialRounded',
    );
  }

  static ThemeData get dark {
    return ThemeData(
      brightness: Brightness.dark,
      colorScheme: _darkColorScheme,
      primaryColor: _primaryColor,
      appBarTheme: _appBarTheme,
      textTheme: _textTheme,
      fontFamily: 'ArialRounded',
    );
  }
}
