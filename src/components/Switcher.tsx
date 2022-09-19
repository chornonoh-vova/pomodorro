import React from 'react';
import {
  FieldValues,
  FieldPath,
  UseControllerProps,
  useController,
} from 'react-hook-form';
import { StyleSheet, Switch, Text, View } from 'react-native';

import { useTheme } from '../hooks/useTheme';

const Switcher = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  control,
  title,
  subtitle,
  ...props
}: UseControllerProps<TFieldValues, TName> & {
  title: string;
  subtitle?: string;
}) => {
  const theme = useTheme();

  const {
    field: { ref, value, onChange },
  } = useController<TFieldValues, TName>({
    control,
    ...props,
  });

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

      <Switch ref={ref} value={value} onValueChange={onChange} />
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
