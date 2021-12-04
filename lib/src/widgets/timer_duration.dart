import 'package:flutter/material.dart';

class TimerDuration extends StatelessWidget {
  final Duration duration;

  const TimerDuration({
    Key? key,
    required this.duration,
  }) : super(key: key);

  String _twoDigits(num n) => n.toString().padLeft(2, '0');

  String get _durationDisplay {
    final minutes = _twoDigits(duration.inMinutes.remainder(60));
    final seconds = _twoDigits(duration.inSeconds.remainder(60));

    return '$minutes:$seconds';
  }

  @override
  Widget build(BuildContext context) {
    final headline1 = Theme.of(context).textTheme.headline1;

    return Text(_durationDisplay, style: headline1);
  }
}
