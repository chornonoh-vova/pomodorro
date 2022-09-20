import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import { PomoState } from '../types/pomo';

import PlayerActions from '../components/PlayerActions';
import Countdown from '../components/Countdown';

import PomoModule from '../native/PomoModule';
import SettingsModule from '../native/SettingsModule';

import { RootStackParamList } from '../navigation';

import { useTheme } from '../hooks/useTheme';
import { usePomoTimer } from '../hooks/usePomoTimer';
import { Orientation, useOrientation } from '../hooks/useOrientation';

type MainScreenProps = NativeStackScreenProps<RootStackParamList, 'Main'>;

export default function MainScreen({ navigation }: MainScreenProps) {
  const theme = useTheme();
  const orientation = useOrientation();

  const [cycleDuration, setCycleDuration] = useState(0);
  const [cycleCount, setCycleCount] = useState(4);

  const { running, time, percent, cycle, state } = usePomoTimer(
    cycleDuration,
    setCycleDuration,
  );

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      Promise.all([
        SettingsModule.getFocusDuration(),
        SettingsModule.getShortBreakDuration(),
        SettingsModule.getLongBreakDuration(),
      ]).then(([focusDuration, shortBreakDuration, longBreakDuration]) => {
        switch (state) {
          case PomoState.FOCUS:
            setCycleDuration(focusDuration);
            break;
          case PomoState.SHORT_BREAK:
            setCycleDuration(shortBreakDuration);
            break;
          case PomoState.LONG_BREAK:
            setCycleDuration(longBreakDuration);
            break;
        }
      });

      SettingsModule.getCycleCount().then((cycleCountVal) =>
        setCycleCount(cycleCountVal),
      );
    });

    return unsubscribe;
  }, [navigation, state]);

  return (
    <View
      style={[
        styles.root,
        styles.container,
        orientation === Orientation.PORTRAIT
          ? styles.containerPortrait
          : styles.containerLandscape,
      ]}>
      <View style={styles.container}>
        <Countdown time={time} percent={percent} state={state} />

        <Text style={[{ color: theme.colors.text }, styles.cycleText]}>
          {cycle}/{cycleCount}
        </Text>
      </View>

      <PlayerActions
        playing={running}
        onPlay={() => PomoModule.play()}
        onPause={() => PomoModule.pause()}
        onStop={() => PomoModule.stop()}
        onReset={() => PomoModule.reset()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },

  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  containerPortrait: {
    flexDirection: 'column',
  },

  containerLandscape: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },

  cycleText: {
    marginTop: 16,
    fontSize: 14,
  },
});
