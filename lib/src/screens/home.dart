import 'package:flutter/material.dart';
import 'package:get_it/get_it.dart';

import 'package:pomodorro/src/constants.dart';
import 'package:pomodorro/src/repositories/settings_repository.dart';

import 'package:pomodorro/src/widgets/pomodoro_timer_card.dart';

class HomeScreen extends StatefulWidget {
  const HomeScreen({Key? key}) : super(key: key);

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  // settings
  int _pomodoroLength = defaultPomodoroLength;
  int _shortBreakLength = defaultShortBreakLength;
  int _longBreakLength = defaultLongBreakLength;

  bool _autoStartPomodoros = defaultAutoStartPomodoros;
  bool _autoStartBreaks = defaultAutoStartBreaks;

  int _longBreakInterval = defaultLongBreakInterval;

  Future<void> _loadSettings() async {
    final settings = GetIt.I.get<SettingsRepository>();

    Future.wait([
      settings.getPomodoroLength(),
      settings.getShortBreakLength(),
      settings.getLongBreakLength(),
      settings.getAutoStartPomodoros(),
      settings.getAutoStartBreaks(),
      settings.getLongBreakInterval(),
    ]).then((values) {
      setState(() {
        _pomodoroLength = values[0] as int;
        _shortBreakLength = values[1] as int;
        _longBreakLength = values[2] as int;

        _autoStartPomodoros = values[3] as bool;
        _autoStartBreaks = values[4] as bool;

        _longBreakInterval = values[5] as int;
      });
    });
  }

  @override
  void initState() {
    _loadSettings();
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        actions: [
          IconButton(
            onPressed: () => Navigator.pushNamed(context, 'settings'),
            icon: const Icon(Icons.settings),
          ),
        ],
        title: const Text('Pomodorro'),
      ),
      body: Column(
        children: [
          PomodoroTimerCard(
            pomodoroLength: _pomodoroLength,
            shortBreakLength: _shortBreakLength,
            longBreakLength: _longBreakLength,
            autoStartPomodoros: _autoStartPomodoros,
            autoStartBreaks: _autoStartBreaks,
            longBreakInterval: _longBreakInterval,
          ),
        ],
      ),
    );
  }
}
