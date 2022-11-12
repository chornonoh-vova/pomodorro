import { useEffect, useMemo, useState } from 'react';
import { NativeEventEmitter } from 'react-native';

import { PomoState } from '../types/pomo';
import PomoModule from '../native/PomoModule';

const getTime = (second: number) => {
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

export const usePomoTimer = (
  cycleDuration: number,
  setCycleDuration: (val: number) => void,
) => {
  const [running, setRunning] = useState(false);
  const [cycle, setCycle] = useState(1);
  const [second, setSecond] = useState(0);
  const [state, setState] = useState<PomoState>(PomoState.FOCUS);

  const time = useMemo(
    () => getTime(cycleDuration - second),
    [second, cycleDuration],
  );

  const percent = useMemo(
    () =>
      cycleDuration ? ((cycleDuration - second) / cycleDuration) * 100 : 100,
    [second, cycleDuration],
  );

  useEffect(() => {
    const setup = () => PomoModule.bind();

    const teardown = () => PomoModule.unbind();

    setup()
      .then((result) => {
        console.info('Bind setup result:', result);
      })
      .catch((reason) => {
        console.error('Bind setup error:', reason);
      });

    return () => {
      teardown()
        .then((result) => {
          console.info('Bind teardown result:', result);
        })
        .catch((reason) => {
          console.error('Bind teardown error:', reason);
        });
    };
  }, []);

  useEffect(() => {
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

    return () => eventListener.remove();
  }, [setCycleDuration]);

  return {
    running,
    time,
    percent,
    cycle,
    state,
  };
};
