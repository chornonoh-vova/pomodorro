import { useTheme } from '../hooks/useTheme';
import React, { useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { PomodoroState } from '../services/PomodoroService';

import ProgressCircle from './ProgressCircle';

type CountdownProps = {
  time: string;
  part: number;
  state: PomodoroState;
};

const Countdown = ({ time, part, state }: CountdownProps) => {
  const theme = useTheme();

  const subtitle = useMemo(() => {
    switch (state) {
      case 'FOCUS':
        return 'Time to focus!';
      case 'SHORT_BREAK':
        return 'Short break';
      case 'LONG_BREAK':
        return 'Long break';
    }
  }, [state]);

  return (
    <View style={styles.container}>
      <View style={styles.timeWrapper}>
        <ProgressCircle
          value={part * 100}
          width={200}
          height={200}
          color={theme.colors.primary}
        />

        <Text style={[{ color: theme.colors.text }, styles.time]}>{time}</Text>
      </View>

      <Text style={[{ color: theme.colors.text }, styles.subtitle]}>
        {subtitle}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },

  timeWrapper: {
    position: 'relative',

    width: 200,
    height: 200,

    alignItems: 'center',
    justifyContent: 'center',
  },

  time: {
    fontSize: 48,

    textAlign: 'center',
    textAlignVertical: 'center',
  },

  subtitle: {
    fontSize: 18,
  },
});

export default Countdown;
