import { MutableRefObject } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { PomodoroService } from './services/PomodoroService';

export const setPomodoroSettings = (
  service: MutableRefObject<PomodoroService>,
) => {
  AsyncStorage.multiGet(
    [
      '@Pomodorro:autoStart',
      '@Pomodorro:cycleCount',
      '@Pomodorro:focusDuration',
      '@Pomodorro:longBreakDuration',
      '@Pomodorro:shortBreakDuration',
    ],
    (errors, result) => {
      if (errors?.length) {
        return;
      }

      const autoStartRaw = result?.[0]?.[1] || null;
      const cycleCountRaw = result?.[1]?.[1] || '';
      const focusDurationRaw = result?.[2]?.[1] || '';
      const longBreakDurationRaw = result?.[3]?.[1] || '';
      const shortBreakDurationRaw = result?.[4]?.[1] || '';

      const autoStart = autoStartRaw === 'true';
      const cycleCount = parseInt(cycleCountRaw, 10);
      const focusDuration = parseInt(focusDurationRaw, 10) * 60;
      const longBreakDuration = parseInt(longBreakDurationRaw, 10) * 60;
      const shortBreakDuration = parseInt(shortBreakDurationRaw, 10) * 60;

      service.current.autoStart = autoStart;

      if (!isNaN(focusDuration)) {
        service.current.focusDuration = focusDuration;
      }

      if (!isNaN(cycleCount)) {
        service.current.cycleCount = cycleCount;
      }

      if (!isNaN(shortBreakDuration)) {
        service.current.shortBreakDuration = shortBreakDuration;
      }

      if (!isNaN(longBreakDuration)) {
        service.current.longBreakDuration = longBreakDuration;
      }
    },
  );
};
