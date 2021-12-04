import 'dart:async';

enum TimerState {
  initial,
  started,
  paused,
}

enum TimerStep {
  pomodoro,
  shortBreak,
  longBreak,
}

class TimerService {
  final Duration interval;
  TimerState state = TimerState.initial;
  late Timer _timer;

  late int _currentTimer;
  void Function(int)? _onTick;
  void Function()? _onComplete;

  TimerService({
    this.interval = const Duration(seconds: 1),
  });

  void _initTimer(
    Duration duration,
    void Function(int)? onTick,
    void Function()? onComplete,
  ) {
    _currentTimer = duration.inSeconds;

    _onTick = onTick;
    _onComplete = onComplete;
  }

  void _resetTimer() {
    _currentTimer = 0;
    _onTick = null;
    _onComplete = null;
  }

  void _startTimer() {
    _timer = Timer.periodic(interval, (timer) {
      if (_currentTimer > 0) {
        _currentTimer--;
        _onTick!(_currentTimer);
      } else {
        stopTimer();

        _onComplete!();
      }
    });
  }

  /// Setup timer initial state with specified [duration]
  ///
  /// [onTick] callback will be called on each timer's invocation
  ///
  /// [onComplete] callback will be called when internal counter reaches zero
  void setupTimer(
    Duration duration,
    void Function(int)? onTick,
    void Function()? onComplete,
  ) {
    _initTimer(duration, onTick, onComplete);

    state = TimerState.initial;
  }

  /// Starts current timer
  ///
  /// can be paused by calling [pauseTimer]
  ///
  /// and stopped by calling [stopTimer]
  void startTimer() {
    _startTimer();

    state = TimerState.started;
  }

  /// Pauses current timer, can be continued after by calling [continueTimer]
  void pauseTimer() {
    _timer.cancel();

    state = TimerState.paused;
  }

  /// Continues current timer
  void continueTimer() {
    _startTimer();

    state = TimerState.started;
  }

  /// Stops current timer, can only be restarted after by calling [setupTimer]
  /// and then [startTimer]
  void stopTimer() {
    _timer.cancel();
    _resetTimer();

    state = TimerState.initial;
  }
}
