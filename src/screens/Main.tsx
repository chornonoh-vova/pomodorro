import React, { useLayoutEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import HeaderButton from '../components/HeaderButton';
import PlayPauseButton from '../components/PlayPauseButton';
import StopButton from '../components/StopButton';
import ResetButton from '../components/ResetButton';
import Countdown from '../components/Countdown';

import { RootStackParamList } from '../navigation';

import { usePomodoroTimer } from '../hooks/usePomodoroTimer';

import IconInfoCircle from '../assets/icons/info-circle.svg';
import IconSettings from '../assets/icons/settings.svg';
import { useTheme } from '../hooks/useTheme';

type MainScreenProps = NativeStackScreenProps<RootStackParamList, 'Main'>;

const MainScreen = ({ navigation }: MainScreenProps) => {
  const theme = useTheme();
  const { state, cycle, countdown, part, running, service } =
    usePomodoroTimer();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => {
        return (
          <HeaderButton onPress={() => navigation.navigate('About')}>
            <IconInfoCircle color={theme.colors.text} width={24} height={24} />
          </HeaderButton>
        );
      },
      headerRight: () => {
        return (
          <HeaderButton onPress={() => navigation.navigate('Settings')}>
            <IconSettings color={theme.colors.text} width={24} height={24} />
          </HeaderButton>
        );
      },
    });
  }, [navigation, theme]);

  return (
    <View style={styles.container}>
      <Countdown time={countdown} part={part} state={state} />

      <Text style={[{ color: theme.colors.text }, styles.cycleText]}>
        {cycle}/{service.current.cycleCount}
      </Text>

      <View style={styles.actions}>
        <ResetButton onReset={() => service.current.reset()} />

        <PlayPauseButton
          playing={running}
          onPlay={() => service.current.play()}
          onPause={() => service.current.pause()}
        />

        <StopButton onStop={() => service.current.stop()} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  cycleText: {
    marginTop: 16,
    fontSize: 14,
  },

  actions: {
    marginVertical: 32,
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default MainScreen;
