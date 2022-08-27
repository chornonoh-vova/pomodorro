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

  focusDuration = 25 * 60; // 25 minutes
  cycleCount = 4;
  shortBreakDuration = 5 * 60; // 5 minutes
  longBreakDuration = 15 * 60; // 25 minutes

  state: PomodoroState = 'FOCUS';

  currentSecond = 0;
  currentCycle = 1;
  running = false;

  timeoutId?: number;

  callback?: PomodoroCallback;

  private constructor() {}

  setCallback(callback: PomodoroCallback) {
    this.callback = callback;
  }

  getCurrentDuration() {
    switch (this.state) {
      case 'FOCUS':
        return this.focusDuration;
      case 'SHORT_BREAK':
        return this.shortBreakDuration;
      case 'LONG_BREAK':
        return this.longBreakDuration;
    }
  }

  transitionToNext() {
    switch (this.state) {
      case 'FOCUS':
        if (this.currentCycle < this.cycleCount) {
          this.state = 'SHORT_BREAK';
        } else {
          this.state = 'LONG_BREAK';
        }
        break;
      case 'SHORT_BREAK':
        this.currentCycle += 1;
        this.state = 'FOCUS';
        break;
      case 'LONG_BREAK':
        this.state = 'FOCUS';
        this.currentCycle = 1;
        break;
    }
  }

  play() {
    if (this.running) {
      return;
    }

    this.running = true;

    this.callback?.({
      state: this.state,
      cycle: this.currentCycle,
      second: this.getCurrentDuration() - this.currentSecond,
      running: this.running,
    });

    BackgroundTimer.runBackgroundTimer(() => {
      this.currentSecond += 1;

      if (this.currentSecond > this.getCurrentDuration()) {
        this.transitionToNext();
        this.currentSecond = 0;
      }

      this.callback?.({
        state: this.state,
        cycle: this.currentCycle,
        second: this.getCurrentDuration() - this.currentSecond,
        running: this.running,
      });
    }, 1000);
  }

  pause() {
    this.running = false;
    BackgroundTimer.stopBackgroundTimer();

    this.callback?.({
      state: this.state,
      cycle: this.currentCycle,
      second: this.getCurrentDuration() - this.currentSecond,
      running: this.running,
    });
  }

  stop() {
    this.running = false;
    BackgroundTimer.stopBackgroundTimer();
    this.currentSecond = 0;

    this.callback?.({
      state: this.state,
      cycle: this.currentCycle,
      second: this.getCurrentDuration() - this.currentSecond,
      running: this.running,
    });
  }

  reset() {
    this.running = false;
    BackgroundTimer.stopBackgroundTimer();
    this.currentSecond = 0;
    this.currentCycle = 1;
    this.state = 'FOCUS';

    this.callback?.({
      state: this.state,
      cycle: this.currentCycle,
      second: this.getCurrentDuration() - this.currentSecond,
      running: this.running,
    });
  }
}
