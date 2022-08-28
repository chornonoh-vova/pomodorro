import BackgroundTimer from 'react-native-background-timer';

export type PomodoroState = 'FOCUS' | 'SHORT_BREAK' | 'LONG_BREAK';

export type PomodoroCallback = (args: {
  state: PomodoroState;
  cycle: number;
  second: number;
  running: boolean;
}) => void;

export class PomodoroService {
  private static instance: PomodoroService;

  public static getInstance() {
    if (!PomodoroService.instance) {
      PomodoroService.instance = new PomodoroService();
    }

    return PomodoroService.instance;
  }

  private _state: PomodoroState = 'FOCUS';

  private _currentSecond = 0;
  private _currentCycle = 1;
  private _running = false;

  private _intervalId?: number;

  private _callback?: PomodoroCallback;

  private _autoStart = false;

  private _focusDuration = 25 * 60; // 25 minutes
  private _cycleCount = 4;
  private _shortBreakDuration = 5 * 60; // 5 minutes
  private _longBreakDuration = 15 * 60; // 25 minutes

  set callback(val: PomodoroCallback) {
    this._callback = val;

    this.invokeCallback();
  }

  get autoStart() {
    return this._autoStart;
  }

  set autoStart(val: boolean) {
    this._autoStart = val;
    this.invokeCallback();
  }

  get focusDuration() {
    return this._focusDuration;
  }

  set focusDuration(val: number) {
    this._focusDuration = val;
    this.invokeCallback();
  }

  get cycleCount() {
    return this._cycleCount;
  }

  set cycleCount(val: number) {
    this._cycleCount = val;
    this.invokeCallback();
  }

  get shortBreakDuration() {
    return this._shortBreakDuration;
  }

  set shortBreakDuration(val: number) {
    this._shortBreakDuration = val;
    this.invokeCallback();
  }

  get longBreakDuration() {
    return this._longBreakDuration;
  }

  set longBreakDuration(val: number) {
    this._longBreakDuration = val;
    this.invokeCallback();
  }

  private constructor() {}

  getCurrentDuration() {
    switch (this._state) {
      case 'FOCUS':
        return this._focusDuration;
      case 'SHORT_BREAK':
        return this._shortBreakDuration;
      case 'LONG_BREAK':
        return this._longBreakDuration;
    }
  }

  private transitionToNext() {
    switch (this._state) {
      case 'FOCUS':
        if (this._currentCycle < this._cycleCount) {
          this._state = 'SHORT_BREAK';
        } else {
          this._state = 'LONG_BREAK';
        }
        break;
      case 'SHORT_BREAK':
        this._currentCycle += 1;
        this._state = 'FOCUS';
        break;
      case 'LONG_BREAK':
        this._state = 'FOCUS';
        this._currentCycle = 1;
        break;
    }
  }

  private invokeCallback() {
    this._callback?.({
      state: this._state,
      cycle: this._currentCycle,
      second: this.getCurrentDuration() - this._currentSecond,
      running: this._running,
    });
  }

  play() {
    if (this._running) {
      return;
    }

    this._running = true;

    this.invokeCallback();

    this._intervalId = BackgroundTimer.setInterval(() => {
      this._currentSecond += 1;

      if (this._currentSecond > this.getCurrentDuration()) {
        this.transitionToNext();
        this._currentSecond = 0;

        if (!this._autoStart) {
          this.pause();
        }
      }

      this.invokeCallback();
    }, 1000);
  }

  pause() {
    this._running = false;

    BackgroundTimer.clearInterval(this._intervalId!);

    this.invokeCallback();
  }

  stop() {
    this._running = false;
    this._currentSecond = 0;

    BackgroundTimer.clearInterval(this._intervalId!);

    this.invokeCallback();
  }

  reset() {
    this._running = false;
    this._currentSecond = 0;
    this._currentCycle = 1;
    this._state = 'FOCUS';

    BackgroundTimer.clearInterval(this._intervalId!);

    this.invokeCallback();
  }
}
