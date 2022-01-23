abstract class SettingsRepository {
  Future<int> getPomodoroLength();
  Future<int> getShortBreakLength();
  Future<int> getLongBreakLength();

  Future<bool> getAutoStartPomodoros();
  Future<bool> getAutoStartBreaks();

  Future<int> getLongBreakInterval();

  Future<void> setPomodoroLength(int value);
  Future<void> setShortBreakLength(int value);
  Future<void> setLongBreakLength(int value);

  Future<void> setAutoStartPomodoros(bool value);
  Future<void> setAutoStartBreaks(bool value);

  Future<void> setLongBreakInterval(int value);
}
