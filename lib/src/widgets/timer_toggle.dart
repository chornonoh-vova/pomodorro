import 'package:flutter/material.dart';

import 'package:flutter_gen/gen_l10n/localizations.dart';

import 'package:pomodorro/src/services/timer.dart';

class TimerToggle extends StatelessWidget {
  final TimerStep timerStep;
  final void Function(TimerStep) onSwitchStep;

  final List<TimerStep> timers;

  List<bool> get _isSelected => timers.map((e) => e == timerStep).toList();

  const TimerToggle({
    Key? key,
    required this.timerStep,
    required this.onSwitchStep,
    this.timers = const [
      TimerStep.pomodoro,
      TimerStep.shortBreak,
      TimerStep.longBreak,
    ],
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final localizations = AppLocalizations.of(context)!;

    return ToggleButtons(
      isSelected: _isSelected,
      selectedBorderColor: theme.primaryColor,
      borderRadius: BorderRadius.circular(8.0),
      constraints: const BoxConstraints(minHeight: 36.0),
      onPressed: (index) {
        onSwitchStep(timers[index]);
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
}
