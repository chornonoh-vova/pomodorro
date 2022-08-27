import { useEffect, useRef, useState } from 'react';
import {
  PomodoroCallback,
  PomodoroService,
  PomodoroState,
} from '../services/PomodoroService';

export const usePomodoroTimer = () => {
  const [state, setState] = useState<PomodoroState>('FOCUS');
  const [cycle, setCycle] = useState(1);
  const [running, setRunning] = useState(false);

  const [part, setPart] = useState(1);
  const [countdown, setCountdown] = useState('25:00');

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

      const min = Math.floor(secondCb / 60)
        .toFixed(0)
        .padStart(2, '0');
      const sec = (secondCb % 60).toFixed(0).padStart(2, '0');

      setPart(secondCb / service.current.getCurrentDuration());
      setCountdown(`${min}:${sec}`);

      setRunning(runningCb);
    },
  );

  useEffect(() => {
    service.current.setCallback(callback.current);
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
