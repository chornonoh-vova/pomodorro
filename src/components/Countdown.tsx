import { useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useTheme } from '../hooks/useTheme';

import { PomoState } from '../types/pomo';

import ProgressCircle from './ProgressCircle';

type CountdownProps = {
  time: string;
  percent: number;
  state: PomoState;
};

const Countdown = ({ time, percent, state }: CountdownProps) => {
  const theme = useTheme();

  const subtitle = useMemo(() => {
    switch (state) {
      case PomoState.FOCUS:
        return 'Time to focus!';
      case PomoState.SHORT_BREAK:
        return 'Short break';
      case PomoState.LONG_BREAK:
        return 'Long break';
    }
  }, [state]);

  return (
    <View style={styles.container}>
      <View style={styles.timeWrapper}>
        <ProgressCircle
          value={percent}
          width={250}
          height={250}
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

    width: 250,
    height: 250,

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
