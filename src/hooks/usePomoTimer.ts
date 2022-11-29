import { useCallback, useMemo, useState } from 'react';
import { NativeEventEmitter } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

import { PomoState } from '../types/pomo';
import PomoModule from '../native/PomoModule';
import SettingsModule from '../native/SettingsModule';

const formatTime = (second: number) => {
  const min = Math.floor(second / 60)
    .toFixed(0)
    .padStart(2, '0');

  const sec = Math.floor(second % 60)
    .toFixed(0)
    .padStart(2, '0');

  return `${min}:${sec}`;
};

type UpdateEvent = {
  currentCycle: number;
  currentCycleDuration: number;
  currentSecond: number;
  currentState: PomoState;
  timerRunning: boolean;
};

export const usePomoTimer = () => {
  const [running, setRunning] = useState(false);
  const [cycle, setCycle] = useState(1);
  const [cycleCount, setCycleCount] = useState(4);
  const [cycleDuration, setCycleDuration] = useState(0);
  const [second, setSecond] = useState(0);
  const [state, setState] = useState<PomoState>(PomoState.FOCUS);

  const time = useMemo(
    () => formatTime(cycleDuration - second),
    [second, cycleDuration],
  );

  const percent = useMemo(
    () =>
      cycleDuration ? ((cycleDuration - second) / cycleDuration) * 100 : 100,
    [second, cycleDuration],
  );

  const focusEffectCb = useCallback(() => {
    SettingsModule.getAll().then((settings) => {
      switch (state) {
        case PomoState.FOCUS:
          setCycleDuration(settings.focusDuration);
          break;
        case PomoState.SHORT_BREAK:
          setCycleDuration(settings.shortBreakDuration);
          break;
        case PomoState.LONG_BREAK:
          setCycleDuration(settings.longBreakDuration);
          break;
      }

      setCycleCount(settings.cycleCount);
    });

    const eventEmitter = new NativeEventEmitter(PomoModule);

    const eventListener = eventEmitter.addListener(
      'update',
      (event: UpdateEvent) => {
        setRunning(event.timerRunning);
        setCycle(event.currentCycle);
        setCycleDuration(event.currentCycleDuration);
        setSecond(event.currentSecond);
        setState(event.currentState);
      },
    );

    return () => {
      eventListener.remove();
    };
  }, [state]);

  useFocusEffect(focusEffectCb);

  return {
    running,
    time,
    percent,
    cycle,
    cycleCount,
    cycleDuration,
    state,
  };
};
