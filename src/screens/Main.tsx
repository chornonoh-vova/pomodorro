import React, { useEffect, useLayoutEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import HeaderButton from '../components/HeaderButton';
import PlayerActions from '../components/PlayerActions';
import Countdown from '../components/Countdown';

import { RootStackParamList } from '../navigation';

import { useTheme } from '../hooks/useTheme';
import { usePomodoroTimer } from '../hooks/usePomodoroTimer';

import IconInfoCircle from '../assets/icons/info-circle.svg';
import IconSettings from '../assets/icons/settings.svg';
import { setPomodoroSettings } from '../utils';

type MainScreenProps = NativeStackScreenProps<RootStackParamList, 'Main'>;

const MainScreen = ({ navigation }: MainScreenProps) => {
  const theme = useTheme();

  const { state, cycle, countdown, part, running, service } =
    usePomodoroTimer();

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setPomodoroSettings(service);
    });

    return unsubscribe;
  }, [navigation, service]);

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

      <PlayerActions
        playing={running}
        onPlay={() => service.current.play()}
        onPause={() => service.current.pause()}
        onReset={() => service.current.reset()}
        onStop={() => service.current.stop()}
      />
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
});

export default MainScreen;
