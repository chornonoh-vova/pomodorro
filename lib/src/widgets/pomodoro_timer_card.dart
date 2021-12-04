import 'package:flutter/material.dart';

import 'package:pomodorro/src/services/timer.dart';

import 'package:pomodorro/src/widgets/timer_controls.dart';
import 'package:pomodorro/src/widgets/timer_duration.dart';
import 'package:pomodorro/src/widgets/timer_toggle.dart';

class PomodoroTimerCard extends StatefulWidget {
  final int pomodoroLength;
  final int shortBreakLength;
  final int longBreakLength;
  final bool autoStartPomodoros;
  final bool autoStartBreaks;
  final int longBreakInterval;

  const PomodoroTimerCard({
    Key? key,
    required this.pomodoroLength,
    required this.shortBreakLength,
    required this.longBreakLength,
    required this.autoStartPomodoros,
    required this.autoStartBreaks,
    required this.longBreakInterval,
  }) : super(key: key);

  @override
  _PomodoroTimerCardState createState() => _PomodoroTimerCardState();
}

class _PomodoroTimerCardState extends State<PomodoroTimerCard> {
  int _currentInterval = 1;

  final TimerService _timerService = TimerService();

  late TimerStep _currentTimerStep;
  late TimerState _currentTimerState;
  late int _currentSeconds;

  void _onTick(int seconds) {
    setState(() {
      _currentSeconds = seconds;
    });
  }

  void _onStart() {
    _timerService.startTimer();
    _updateTimerState(_timerService.state);
  }

  void _onPause() {
    _timerService.pauseTimer();
    _updateTimerState(_timerService.state);
  }

  void _onContinue() {
    _timerService.continueTimer();
    _updateTimerState(_timerService.state);
  }

  void _onStop() {
    _timerService.stopTimer();
    _updateTimerState(_timerService.state);
    _nextStep();
  }

  void _onComplete() {
    _updateTimerState(_timerService.state);
    _nextStep();
  }

  void _nextStep() {
    switch (_currentTimerStep) {
      case TimerStep.pomodoro:
        if (_currentInterval == widget.longBreakInterval) {
          _updateTimerStep(TimerStep.longBreak);
          _currentInterval = 1;
        } else {
          _updateTimerStep(TimerStep.shortBreak);
          _currentInterval++;
        }

        if (widget.autoStartBreaks) _startTimer();
        break;
      case TimerStep.shortBreak:
        _updateTimerStep(TimerStep.pomodoro);

        if (widget.autoStartPomodoros) _startTimer();
        break;
      case TimerStep.longBreak:
        _updateTimerStep(TimerStep.pomodoro);

        if (widget.autoStartPomodoros) _startTimer();
        break;
    }
  }

  void _onSwitchStep(TimerStep step) {
    _updateTimerStep(step);
  }

  void _updateTimerState(TimerState state) {
    setState(() {
      _currentTimerState = state;
    });
  }

  void _updateTimerStep(TimerStep step) {
    setState(() {
      switch (step) {
        case TimerStep.pomodoro:
          _setupPomodoroTimer();
          break;
        case TimerStep.shortBreak:
          _setupShortBreakTimer();
          break;
        case TimerStep.longBreak:
          _setupLongBreakTimer();
          break;
      }
    });
  }

  void _setupPomodoroTimer() {
    final duration = Duration(minutes: widget.pomodoroLength);

    _currentTimerStep = TimerStep.pomodoro;

    _currentTimerState = TimerState.initial;

    _currentSeconds = duration.inSeconds;

    _timerService.setupTimer(
      duration,
      _onTick,
      _onComplete,
    );
  }

  void _setupShortBreakTimer() {
    final duration = Duration(minutes: widget.shortBreakLength);

    _currentTimerStep = TimerStep.shortBreak;

    _currentTimerState = TimerState.initial;

    _currentSeconds = duration.inSeconds;

    _timerService.setupTimer(
      duration,
      _onTick,
      _onComplete,
    );
  }

  void _setupLongBreakTimer() {
    final duration = Duration(minutes: widget.longBreakLength);

    _currentTimerStep = TimerStep.longBreak;

    _currentTimerState = TimerState.initial;

    _currentSeconds = duration.inSeconds;

    _timerService.setupTimer(
      duration,
      _onTick,
      _onComplete,
    );
  }

  void _startTimer() {
    _timerService.startTimer();
    _updateTimerState(_timerService.state);
  }

  @override
  void initState() {
    super.initState();

    _setupPomodoroTimer();
  }

  @override
  Widget build(BuildContext context) {
    return Card(
      margin: const EdgeInsets.all(16.0),
      child: Container(
        padding: const EdgeInsets.all(12.0),
        child: Column(
          children: [
            TimerToggle(
              timerStep: _currentTimerStep,
              onSwitchStep: _onSwitchStep,
            ),
            TimerDuration(
              duration: Duration(seconds: _currentSeconds),
            ),
            TimerControls(
              state: _currentTimerState,
              onStart: _onStart,
              onPause: _onPause,
              onContinue: _onContinue,
              onStop: _onStop,
            ),
          ],
        ),
      ),
    );
  }
}
