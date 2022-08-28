import { useEffect, useRef, useState } from 'react';
import {
  PomodoroCallback,
  PomodoroService,
  PomodoroState,
} from '../services/PomodoroService';

const getCountdown = (seconds: number) => {
  const min = Math.floor(seconds / 60)
    .toFixed(0)
    .padStart(2, '0');
  const sec = (seconds % 60).toFixed(0).padStart(2, '0');

  return `${min}:${sec}`;
};

export const usePomodoroTimer = () => {
  const [state, setState] = useState<PomodoroState>('FOCUS');
  const [cycle, setCycle] = useState(1);
  const [running, setRunning] = useState(false);

  const [part, setPart] = useState(1);
  const [countdown, setCountdown] = useState('');

  const service = useRef(PomodoroService.getInstance());

  const callback = useRef<PomodoroCallback>(
    ({
      state: stateCb,
      cycle: cycleCb,
      second: secondCb,
      running: runningCb,
    }) => {
      setState(stateCb);
      setCycle(cycleCb);

      setPart(secondCb / service.current.getCurrentDuration());
      setCountdown(getCountdown(secondCb));

      setRunning(runningCb);
    },
  );

  useEffect(() => {
    service.current.callback = callback.current;
  }, []);

  return {
    state,
    cycle,
    part,
    countdown,

    running,

    service,
  };
};
