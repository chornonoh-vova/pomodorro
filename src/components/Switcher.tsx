import React from 'react';
import { StyleSheet, Switch, Text, View } from 'react-native';

import { useTheme } from '../hooks/useTheme';

type SwitcherProps = {
  title: string;
  subtitle?: string;
  value: boolean;
  onChange: (value: boolean) => void;
};

const Switcher = ({ title, subtitle, value, onChange }: SwitcherProps) => {
  const theme = useTheme();

  return (
    <View style={styles.switcherWrapper}>
      <View style={styles.switcherDescription}>
        <Text style={[{ color: theme.colors.text }, styles.title]}>
          {title}
        </Text>

        <Text style={[{ color: theme.colors.text }, styles.subtitle]}>
          {subtitle}
        </Text>
      </View>

      <Switch
        thumbColor={theme.colors.primaryDarken}
        trackColor={{
          true: theme.colors.primary,
        }}
        value={value}
        onValueChange={onChange}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  switcherWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 8,
  },

  switcherDescription: {
    flex: 1,
    flexDirection: 'column',
  },

  title: {
    fontSize: 16,
    fontWeight: '600',
  },

  subtitle: {
    fontSize: 14,
    fontWeight: 'normal',
  },
});

export default Switcher;
