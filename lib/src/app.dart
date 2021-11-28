import 'package:flutter/material.dart';

import 'package:flutter_gen/gen_l10n/localizations.dart';

import 'theme.dart';

import 'screens/home.dart';
import 'screens/settings.dart';

class PomodorroApp extends StatelessWidget {
  const PomodorroApp({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      localizationsDelegates: AppLocalizations.localizationsDelegates,
      supportedLocales: AppLocalizations.supportedLocales,
      theme: PomodorroTheme.light,
      darkTheme: PomodorroTheme.dark,
      themeMode: ThemeMode.system,
      initialRoute: 'home',
      routes: {
        'home': (context) => const HomeScreen(),
        'settings': (context) => const SettingsScreen(),
      },
    );
  }
}
