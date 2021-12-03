import 'package:flutter/material.dart';

import 'package:flutter_gen/gen_l10n/localizations.dart';

import 'countdown_timer.dart';

class PomodoroTimers extends StatefulWidget {
  final int pomodoroLength;
  final int shortBreakLength;
  final int longBreakLength;
  final bool autoStartPomodoros;
  final bool autoStartBreaks;
  final int longBreakInterval;

  const PomodoroTimers({
    Key? key,
    required this.pomodoroLength,
    required this.shortBreakLength,
    required this.longBreakLength,
    required this.autoStartPomodoros,
    required this.autoStartBreaks,
    required this.longBreakInterval,
  }) : super(key: key);

  @override
  _PomodoroTimersState createState() => _PomodoroTimersState();
}

enum _TimerStep {
  pomodoro,
  shortBreak,
  longBreak,
}

class _PomodoroTimersState extends State<PomodoroTimers> {
  final _timers = [
    _TimerStep.pomodoro,
    _TimerStep.shortBreak,
    _TimerStep.longBreak,
  ];

  int _currentInterval = 1;

  // current timer
  _TimerStep _currentTimer = _TimerStep.pomodoro;

  List<bool> get _isSelected => _timers.map((e) => e == _currentTimer).toList();

  Widget _buildToggle(BuildContext context) {
    final localizations = AppLocalizations.of(context)!;

    return ToggleButtons(
      isSelected: _isSelected,
      borderRadius: BorderRadius.circular(4.0),
      constraints: const BoxConstraints(minHeight: 36.0),
      onPressed: (index) {
        setState(() {
          _currentTimer = _timers[index];
        });
      },
      children: [
        Padding(
          padding: const EdgeInsets.symmetric(horizontal: 16.0),
          child: Text(localizations.pomodoro),
        ),
        Padding(
          padding: const EdgeInsets.symmetric(horizontal: 16.0),
          child: Text(localizations.shortBreak),
        ),
        Padding(
          padding: const EdgeInsets.symmetric(horizontal: 16.0),
          child: Text(localizations.longBreak),
        ),
      ],
    );
  }

  static const _pomodoroKey = ValueKey(_TimerStep.pomodoro);
  static const _shortBreakKey = ValueKey(_TimerStep.shortBreak);
  static const _longBreakKey = ValueKey(_TimerStep.longBreak);

  void _pomodoroTimerNext() {
    setState(() {
      _currentTimer = _TimerStep.shortBreak;
    });
  }

  void _shortBreakTimerNext() {
    setState(() {
      _currentInterval++;
      if (_currentInterval == widget.longBreakInterval) {
        _currentTimer = _TimerStep.longBreak;
      } else {
        _currentTimer = _TimerStep.pomodoro;
      }
    });
  }

  void _longBreakTimerNext() {
    setState(() {
      _currentTimer = _TimerStep.pomodoro;
      _currentInterval = 1;
    });
  }

  Widget _buildPomodoroTimer(BuildContext context) {
    return CountdownTimer(
      key: _pomodoroKey,
      duration: Duration(minutes: widget.pomodoroLength),
      onStart: () => print('pomodoro on start'),
      onPause: () => print('pomodoro on pause'),
      onStop: () {
        _pomodoroTimerNext();
      },
      onComplete: () {
        _pomodoroTimerNext();
      },
    );
  }

  Widget _buildShortBreakTimer(BuildContext context) {
    return CountdownTimer(
      key: _shortBreakKey,
      duration: Duration(minutes: widget.shortBreakLength),
      onStart: () => print('shortBreak on start'),
      onPause: () => print('shortBreak on pause'),
      onStop: () {
        _shortBreakTimerNext();
      },
      onComplete: () {
        _shortBreakTimerNext();
      },
    );
  }

  Widget _buildLongBreakTimer(BuildContext context) {
    return CountdownTimer(
      key: _longBreakKey,
      duration: Duration(minutes: widget.longBreakLength),
      onStart: () => print('longBreak on start'),
      onPause: () => print('longBreak on pause'),
      onStop: () {
        _longBreakTimerNext();
      },
      onComplete: () {
        _longBreakTimerNext();
      },
    );
  }

  Widget _buildContent(BuildContext context) {
    switch (_currentTimer) {
      case _TimerStep.pomodoro:
        return _buildPomodoroTimer(context);
      case _TimerStep.shortBreak:
        return _buildShortBreakTimer(context);
      case _TimerStep.longBreak:
        return _buildLongBreakTimer(context);
    }
  }

  @override
  Widget build(BuildContext context) {
    return Card(
      margin: const EdgeInsets.all(16),
      child: Container(
        padding: const EdgeInsets.symmetric(vertical: 16),
        child: Column(
          children: [
            _buildToggle(context),
            _buildContent(context),
          ],
        ),
      ),
    );
  }
}
