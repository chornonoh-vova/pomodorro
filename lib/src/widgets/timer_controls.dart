import 'package:flutter/material.dart';

import 'package:pomodorro/src/services/timer.dart';

class TimerControls extends StatelessWidget {
  final TimerState state;

  final void Function()? onStart;
  final void Function()? onPause;
  final void Function()? onContinue;
  final void Function()? onStop;

  const TimerControls({
    Key? key,
    required this.state,
    this.onStart,
    this.onPause,
    this.onContinue,
    this.onStop,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Row(
      mainAxisAlignment: MainAxisAlignment.center,
      children: _buildActions(context),
    );
  }

  List<Widget> _buildActions(BuildContext context) {
    final startBtn = Container(
      margin: const EdgeInsets.all(8),
      child: IconButton(
        onPressed: onStart,
        icon: const Icon(Icons.play_arrow_rounded),
        iconSize: 48.0,
      ),
    );

    final pauseBtn = Container(
      margin: const EdgeInsets.all(8),
      child: IconButton(
        onPressed: onPause,
        icon: const Icon(Icons.pause_rounded),
        iconSize: 48.0,
      ),
    );

    final continueBtn = Container(
      margin: const EdgeInsets.all(8),
      child: IconButton(
        onPressed: onContinue,
        icon: const Icon(Icons.play_arrow_rounded),
        iconSize: 48.0,
      ),
    );

    final skipBtn = Container(
      margin: const EdgeInsets.all(8),
      child: IconButton(
        onPressed: onStop,
        icon: const Icon(Icons.skip_next_rounded),
        iconSize: 48.0,
      ),
    );

    switch (state) {
      case TimerState.initial:
        return [startBtn];
      case TimerState.started:
        return [pauseBtn, skipBtn];
      case TimerState.paused:
        return [continueBtn, skipBtn];
    }
  }
}
