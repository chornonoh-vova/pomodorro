import React, { useEffect, useState } from 'react';
import { StyleSheet, ScrollView, Pressable, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import { RootStackParamList } from '../navigation';
import Switcher from '../components/Switcher';
import NumberInput from '../components/NumberInput';

import { useTheme } from '../hooks/useTheme';
import ErrorMessage from '../components/ErrorMessage';

type SettingsScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'Settings'
>;

const SettingsScreen = ({ navigation }: SettingsScreenProps) => {
  const theme = useTheme();

  const [autoStart, setAutoStart] = useState(false);

  const [focusDuration, setFocusDuration] = useState(25);
  const [shortBreakDuration, setShortBreakDuration] = useState(5);
  const [longBreakDuration, setLongBreakDuration] = useState(15);

  const [cycleCount, setCycleCount] = useState(4);

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
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

        const autoStartSaved = autoStartRaw === 'true';
        const cycleCountSaved = parseInt(cycleCountRaw, 10);
        const focusDurationSaved = parseInt(focusDurationRaw, 10);
        const longBreakDurationSaved = parseInt(longBreakDurationRaw, 10);
        const shortBreakDurationSaved = parseInt(shortBreakDurationRaw, 10);

        setAutoStart(autoStartSaved);

        if (!isNaN(focusDurationSaved)) {
          setFocusDuration(focusDurationSaved);
        }

        if (!isNaN(cycleCountSaved)) {
          setCycleCount(cycleCountSaved);
        }

        if (!isNaN(shortBreakDurationSaved)) {
          setShortBreakDuration(shortBreakDurationSaved);
        }

        if (!isNaN(longBreakDurationSaved)) {
          setLongBreakDuration(longBreakDurationSaved);
        }
      },
    );
  }, []);

  const onSave = () => {
    setSaving(true);

    AsyncStorage.multiSet(
      [
        ['@Pomodorro:autoStart', autoStart.toString()],
        ['@Pomodorro:cycleCount', cycleCount.toString()],
        ['@Pomodorro:focusDuration', focusDuration.toString()],
        ['@Pomodorro:longBreakDuration', longBreakDuration.toString()],
        ['@Pomodorro:shortBreakDuration', shortBreakDuration.toString()],
      ],
      (errors) => {
        if (errors?.length) {
          setError(errors.join('\n'));
        }

        setSaving(false);
        navigation.goBack();
      },
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Switcher
        title="Auto start"
        subtitle="Automatically start next focus or break after previous one ends"
        value={autoStart}
        onChange={setAutoStart}
      />

      <NumberInput
        title="Focus (min)"
        subtitle="Duration of the focus period in minutes"
        value={focusDuration}
        onChange={setFocusDuration}
      />

      <NumberInput
        title="Short break (min)"
        subtitle="Duration of the short break between pomodoros in minutes"
        value={shortBreakDuration}
        onChange={setShortBreakDuration}
      />

      <NumberInput
        title="Long break (min)"
        subtitle="Duration of the long break between cycles in minutes"
        value={longBreakDuration}
        onChange={setLongBreakDuration}
      />

      <NumberInput
        title="Cycle count"
        subtitle="Number of cycles to work before long break"
        value={cycleCount}
        onChange={setCycleCount}
      />

      {error && <ErrorMessage error={error} />}

      <Pressable
        style={({ pressed }) => [
          {
            backgroundColor: pressed
              ? theme.colors.primaryDarken
              : theme.colors.primary,
          },
          styles.save,
        ]}
        disabled={saving}
        onPress={onSave}>
        <Text style={[{ color: theme.colors.onPrimary }, styles.saveText]}>
          Save changes
        </Text>
      </Pressable>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'flex-start',
    marginHorizontal: 8,
    marginVertical: 16,
  },

  save: {
    marginTop: 32,
    borderRadius: 8,
    height: 48,
    justifyContent: 'center',
  },

  saveText: {
    textAlign: 'center',
    fontSize: 18,
  },
});

export default SettingsScreen;
