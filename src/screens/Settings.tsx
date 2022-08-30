import React, { useEffect, useMemo, useState } from 'react';
import { StyleSheet, ScrollView, Pressable, Text } from 'react-native';

import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import type { RootStackParamList } from '../navigation';

import Switcher from '../components/Switcher';
import NumberInput from '../components/NumberInput';
import ErrorMessage from '../components/ErrorMessage';

import SettingsModule from '../native/SettingsModule';

import { useTheme } from '../hooks/useTheme';

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

  useEffect(() => {
    Promise.all([
      SettingsModule.getAutoStart(),
      SettingsModule.getFocusDuration(),
      SettingsModule.getShortBreakDuration(),
      SettingsModule.getLongBreakDuration(),
      SettingsModule.getCycleCount(),
    ]).then(
      ([
        autoStartVal,
        focusDurationVal,
        shortBreakDurationVal,
        longBreakDurationVal,
        cycleCountVal,
      ]) => {
        setAutoStart(autoStartVal);
        setFocusDuration(focusDurationVal / 60);
        setShortBreakDuration(shortBreakDurationVal / 60);
        setLongBreakDuration(longBreakDurationVal / 60);
        setCycleCount(cycleCountVal);
      },
    );
  }, []);

  const errors = useMemo(() => {
    let result = [];

    if (focusDuration <= 0) {
      result.push('Focus time must be greater than 0');
    }

    if (shortBreakDuration <= 0) {
      result.push('Short break time must be greater than 0');
    }

    if (longBreakDuration <= 0) {
      result.push('Long break time must be greater than 0');
    }

    if (shortBreakDuration >= longBreakDuration) {
      result.push('Short break time must be less than long break time');
    }

    if (longBreakDuration >= focusDuration) {
      result.push('Long break time must be less than focus time');
    }

    return result;
  }, [focusDuration, longBreakDuration, shortBreakDuration]);

  const onSave = () => {
    setSaving(true);

    Promise.all([
      SettingsModule.setAutoStart(autoStart),
      SettingsModule.setFocusDuration(focusDuration * 60),
      SettingsModule.setShortBreakDuration(shortBreakDuration * 60),
      SettingsModule.setLongBreakDuration(longBreakDuration * 60),
      SettingsModule.setCycleCount(cycleCount),
    ]).then(() => {
      setSaving(false);
      navigation.goBack();
    });
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

      {errors.length !== 0 && <ErrorMessage error={errors.join('\n')} />}

      <Pressable
        style={({ pressed }) => [
          {
            backgroundColor: pressed
              ? theme.colors.primaryDarken
              : theme.colors.primary,
          },
          styles.save,
        ]}
        disabled={errors.length !== 0 || saving}
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
