import 'dart:async';

import 'package:flutter/material.dart';

import 'package:flutter_gen/gen_l10n/localizations.dart';

class CountdownTimer extends StatefulWidget {
  final Duration duration;

  final Function? onStart;
  final Function? onPause;
  final Function? onStop;
  final Function? onComplete;

  const CountdownTimer({
    Key? key,
    required this.duration,
    this.onStart,
    this.onPause,
    this.onStop,
    this.onComplete,
  }) : super(key: key);

  @override
  _CountdownTimerState createState() => _CountdownTimerState();
}

enum _TimerState {
  initial,
  started,
  paused,
}

class _CountdownTimerState extends State<CountdownTimer> {
  static const _interval = Duration(seconds: 1);

  int _timerCounter = 0;
  _TimerState _timerState = _TimerState.initial;
  late Timer _timer;

  void _resetCounter() {
    setState(() {
      _timerCounter = widget.duration.inSeconds;
    });
  }

  void _initTimer() {
    _timer = Timer.periodic(_interval, (timer) {
      if (_timerCounter > 0) {
        setState(() {
          _timerCounter--;
        });
      } else {
        _completeTimer();
      }
    });
  }

  void _resetTimer() {
    _timer.cancel();
  }

  void startTimer() {
    _resetCounter();
    _initTimer();
    setState(() {
      _timerState = _TimerState.started;
    });
    widget.onStart!();
  }

  void _pauseTimer() {
    _resetTimer();
    setState(() {
      _timerState = _TimerState.paused;
    });
    widget.onPause!();
  }

  void _continueTimer() {
    _initTimer();
    setState(() {
      _timerState = _TimerState.started;
    });
  }

  void _resetAll() {
    _resetTimer();
    _resetCounter();
    setState(() {
      _timerState = _TimerState.initial;
    });
  }

  void _completeTimer() {
    _resetAll();
    widget.onComplete!();
  }

  void _stopTimer() {
    _resetAll();
    widget.onStop!();
  }

  String get _timerDisplay {
    final duration = Duration(seconds: _timerCounter);

    String twoDigits(num n) => n.toString().padLeft(2, '0');

    final minutes = twoDigits(duration.inMinutes.remainder(60));
    final seconds = twoDigits(duration.inSeconds.remainder(60));

    return '$minutes:$seconds';
  }

  @override
  void initState() {
    super.initState();
    _timerCounter = widget.duration.inSeconds;
  }

  @override
  Widget build(BuildContext context) {
    final headline1 = Theme.of(context).textTheme.headline1;

    return Column(
      mainAxisAlignment: MainAxisAlignment.center,
      children: [
        Container(
          margin: const EdgeInsets.symmetric(vertical: 32, horizontal: 16),
          child: Text(_timerDisplay, style: headline1),
        ),
        Row(
          mainAxisAlignment: MainAxisAlignment.center,
          children: _buildActions(context),
        ),
      ],
    );
  }

  List<Widget> _buildActions(BuildContext context) {
    final localizations = AppLocalizations.of(context)!;
    final theme = Theme.of(context);

    final btnStyle = ElevatedButton.styleFrom(
      textStyle: theme.textTheme.button?.copyWith(fontSize: 24),
      padding: const EdgeInsets.symmetric(vertical: 10, horizontal: 16),
    );

    final startBtn = Container(
      margin: const EdgeInsets.all(4),
      child: ElevatedButton(
        onPressed: startTimer,
        child: Text(localizations.start),
        style: btnStyle,
      ),
    );

    final pauseBtn = Container(
      margin: const EdgeInsets.all(4),
      child: ElevatedButton(
        onPressed: _pauseTimer,
        child: Text(localizations.stop),
        style: btnStyle,
      ),
    );

    final continueBtn = Container(
      margin: const EdgeInsets.all(4),
      child: ElevatedButton(
        onPressed: _continueTimer,
        child: Text(localizations.start),
        style: btnStyle,
      ),
    );

    final skipBtn = Container(
      margin: const EdgeInsets.all(4),
      child: ElevatedButton.icon(
        onPressed: _stopTimer,
        label: Text(localizations.skip),
        icon: const Icon(Icons.skip_next_rounded, size: 32),
        style: btnStyle,
      ),
    );

    switch (_timerState) {
      case _TimerState.initial:
        return [startBtn];
      case _TimerState.started:
        return [pauseBtn, skipBtn];
      case _TimerState.paused:
        return [continueBtn, skipBtn];
    }
  }
}
