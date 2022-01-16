import 'package:flutter/material.dart';

import 'package:pomodorro/src/constants.dart';

import 'package:pomodorro/src/widgets/pomodoro_timer_card.dart';

class HomeScreen extends StatefulWidget {
  const HomeScreen({Key? key}) : super(key: key);

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  // settings
  final int _pomodoroLength = defaultPomodoroLength;
  final int _shortBreakLength = defaultShortBreakLength;
  final int _longBreakLength = defaultLongBreakLength;

  final bool _autoStartPomodoros = defaultAutoStartPomodoros;
  final bool _autoStartBreaks = defaultAutoStartBreaks;

  final int _longBreakInterval = defaultLongBreakInterval;

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
