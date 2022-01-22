import 'package:pomodorro/src/preferences/settings_repository.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:test/test.dart';

import 'package:pomodorro/src/repositories/settings_repository.dart';

void main() {
  group('PreferencesSettingsRepository', () {
    late final SettingsRepository settings;
    late final SharedPreferences prefs;

    setUpAll(() async {
      settings = PreferencesSettingsRepository();

      SharedPreferences.setMockInitialValues({
        'auto_start_breaks': true,
        'auto_start_pomodoros': true,
        'long_break_interval': 5,
        'long_break_length': 15,
        'short_break_length': 5,
        'pomodoro_length': 25,
      });

      prefs = await SharedPreferences.getInstance();
    });

    test('Should get & set pomodoro length setting', () async {
      expect(await settings.getPomodoroLength(), 25);

      await settings.setPomodoroLength(30);

      expect(prefs.getInt('pomodoro_length'), 30);
    });

    test('Should get & set short break length setting', () async {
      expect(await settings.getShortBreakLength(), 5);

      await settings.setShortBreakLength(30);

      expect(prefs.getInt('short_break_length'), 30);
    });

    test('Should get & set long break length setting', () async {
      expect(await settings.getLongBreakLength(), 15);

      await settings.setLongBreakLength(30);

      expect(prefs.getInt('long_break_length'), 30);
    });

    test('Should get & set long break interval setting', () async {
      expect(await settings.getLongBreakInterval(), 5);

      await settings.setLongBreakInterval(30);

      expect(prefs.getInt('long_break_interval'), 30);
    });

    test('Should get & set auto start pomodoros setting', () async {
      expect(await settings.getAutoStartPomodoros(), true);

      await settings.setAutoStartPomodoros(false);

      expect(prefs.getBool('auto_start_pomodoros'), false);
    });

    test('Should get & set auto start breaks setting', () async {
      expect(await settings.getAutoStartBreaks(), true);

      await settings.setAutoStartBreaks(false);

      expect(prefs.getBool('auto_start_breaks'), false);
    });
  });
}
