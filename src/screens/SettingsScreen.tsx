import { useCallback, useEffect, useState } from 'react';
import { StyleSheet, ScrollView, Pressable, Text, View } from 'react-native';
import { useForm } from 'react-hook-form';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';

import type { TabParamList } from '../types/navigation';

import Switcher from '../components/Switcher';
import NumberInput from '../components/NumberInput';

import SettingsModule from '../native/SettingsModule';

import { useTheme } from '../hooks/useTheme';

type SettingsScreenProps = BottomTabScreenProps<TabParamList, 'Settings'>;

type SettingsFormData = {
  autoStart: boolean;
  focusDuration: number;
  shortBreakDuration: number;
  longBreakDuration: number;
  cycleCount: number;
};

const SettingsScreen = ({ navigation }: SettingsScreenProps) => {
  const theme = useTheme();

  const [saving, setSaving] = useState(false);

  const { control, setValue, handleSubmit } = useForm<SettingsFormData>({
    defaultValues: {
      autoStart: false,
      focusDuration: 25,
      shortBreakDuration: 5,
      longBreakDuration: 15,
      cycleCount: 4,
    },
  });

  useEffect(() => {
    SettingsModule.getAll().then((settings) => {
      setValue('autoStart', settings.autoStart);
      setValue('focusDuration', settings.focusDuration / 60);
      setValue('shortBreakDuration', settings.shortBreakDuration / 60);
      setValue('longBreakDuration', settings.longBreakDuration / 60);
      setValue('cycleCount', settings.cycleCount);
    });
  }, [setValue]);

  const onSave = useCallback(
    (data: SettingsFormData) => {
      setSaving(true);

      SettingsModule.setAll({
        autoStart: data.autoStart,
        focusDuration: data.focusDuration * 60,
        shortBreakDuration: data.shortBreakDuration * 60,
        longBreakDuration: data.longBreakDuration * 60,
        cycleCount: data.cycleCount,
      }).then(() => {
        setSaving(false);
        navigation.goBack();
      });
    },
    [navigation],
  );

  return (
    <ScrollView>
      <View style={styles.container}>
        <Switcher
          control={control}
          name="autoStart"
          title="Auto start"
          subtitle="Automatically start next focus or break after previous one ends"
        />

        <NumberInput
          control={control}
          name="focusDuration"
          title="Focus (min)"
          subtitle="Duration of the focus period in minutes"
          rules={{
            required: 'Focus duration is required',
            min: {
              value: 5,
              message: 'Minimal focus duration is 5 minutes',
            },
            max: {
              value: 180,
              message: 'Maximum focus duration is 180 minutes',
            },
          }}
        />

        <NumberInput
          control={control}
          name="shortBreakDuration"
          title="Short break (min)"
          subtitle="Duration of the short break between pomodoros in minutes"
          rules={{
            required: 'Short break duration is required',
            min: {
              value: 1,
              message: 'Minimal short break duration is 1 minute',
            },
            max: {
              value: 60,
              message: 'Maximum short break duration is 60 minutes',
            },
          }}
        />

        <NumberInput
          control={control}
          name="longBreakDuration"
          title="Long break (min)"
          subtitle="Duration of the long break between cycles in minutes"
          rules={{
            required: 'Long break duration is required',
            min: {
              value: 1,
              message: 'Minimal long break duration is 1 minute',
            },
            max: {
              value: 60,
              message: 'Maximum long break duration is 60 minutes',
            },
          }}
        />

        <NumberInput
          control={control}
          name="cycleCount"
          title="Cycle count"
          subtitle="Number of cycles to work before long break"
          rules={{
            required: 'Cycle count is required',
            min: {
              value: 1,
              message: 'Minimal cycle count is 1 minute',
            },
            max: {
              value: 60,
              message: 'Maximum cycle count is 60 minutes',
            },
          }}
        />

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
          onPress={handleSubmit(onSave)}>
          <Text style={[{ color: theme.colors.onPrimary }, styles.saveText]}>
            Save changes
          </Text>
        </Pressable>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'flex-start',
    marginVertical: 16,
    marginHorizontal: 20,
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
