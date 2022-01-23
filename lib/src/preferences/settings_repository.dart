import 'package:pomodorro/src/constants.dart';
import 'package:pomodorro/src/repositories/settings_repository.dart';
import 'package:shared_preferences/shared_preferences.dart';

const _autoStartBreaksKey = 'auto_start_breaks';
const _autoStartPomodorosKey = 'auto_start_pomodoros';
const _longBreakIntervalKey = 'long_break_interval';
const _longBreakLengthKey = 'long_break_length';
const _shortBreakLengthKey = 'short_break_length';
const _pomodoroLengthKey = 'pomodoro_length';

class PreferencesSettingsRepository implements SettingsRepository {
  Future<SharedPreferences> get _prefs {
    return SharedPreferences.getInstance();
  }

  Future<bool> _getBoolValue(String key, bool defaultValue) async =>
      (await _prefs).getBool(key) ?? defaultValue;

  Future<int> _getIntValue(String key, int defaultValue) async =>
      (await _prefs).getInt(key) ?? defaultValue;

  Future<void> _setBoolValue(String key, bool value) async =>
      (await _prefs).setBool(key, value);

  Future<void> _setIntValue(String key, int value) async =>
      (await _prefs).setInt(key, value);

  @override
  Future<bool> getAutoStartBreaks() =>
      _getBoolValue(_autoStartBreaksKey, defaultAutoStartBreaks);

  @override
  Future<bool> getAutoStartPomodoros() =>
      _getBoolValue(_autoStartPomodorosKey, defaultAutoStartPomodoros);

  @override
  Future<int> getLongBreakInterval() =>
      _getIntValue(_longBreakIntervalKey, defaultLongBreakInterval);

  @override
  Future<int> getLongBreakLength() =>
      _getIntValue(_longBreakLengthKey, defaultLongBreakLength);

  @override
  Future<int> getPomodoroLength() =>
      _getIntValue(_pomodoroLengthKey, defaultPomodoroLength);

  @override
  Future<int> getShortBreakLength() =>
      _getIntValue(_shortBreakLengthKey, defaultShortBreakLength);

  @override
  Future<void> setAutoStartBreaks(bool value) =>
      _setBoolValue(_autoStartBreaksKey, value);

  @override
  Future<void> setAutoStartPomodoros(bool value) =>
      _setBoolValue(_autoStartPomodorosKey, value);

  @override
  Future<void> setLongBreakInterval(int value) =>
      _setIntValue(_longBreakIntervalKey, value);

  @override
  Future<void> setLongBreakLength(int value) =>
      _setIntValue(_longBreakLengthKey, value);

  @override
  Future<void> setPomodoroLength(int value) =>
      _setIntValue(_pomodoroLengthKey, value);

  @override
  Future<void> setShortBreakLength(int value) =>
      _setIntValue(_shortBreakLengthKey, value);
}
