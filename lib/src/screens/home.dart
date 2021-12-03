import 'package:flutter/material.dart';
import 'package:pomodorro/src/constants.dart';

import 'package:pomodorro/src/widgets/pomodoro_timers.dart';

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
          PomodoroTimers(
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
