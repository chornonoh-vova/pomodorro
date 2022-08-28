import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

import { useTheme } from '../hooks/useTheme';

type NumberInputProps = {
  title: string;
  subtitle?: string;
  value: number;
  onChange: (value: number) => void;
};

const NumberInput = ({
  title,
  subtitle,
  value,
  onChange,
}: NumberInputProps) => {
  const theme = useTheme();

  const [internalValue, setInternalValue] = useState(value.toString());

  useEffect(() => {
    setInternalValue(value.toString());
  }, [value]);

  useEffect(() => {
    const parsed = parseInt(internalValue, 10);

    if (!isNaN(parsed)) {
      onChange(parsed);
    }
  }, [internalValue, onChange]);

  return (
    <View style={styles.inputWrapper}>
      <View style={styles.inputDescription}>
        <Text style={[{ color: theme.colors.text }, styles.title]}>
          {title}
        </Text>

        <Text style={[{ color: theme.colors.text }, styles.subtitle]}>
          {subtitle}
        </Text>
      </View>

      <TextInput
        style={styles.input}
        value={internalValue}
        onChangeText={setInternalValue}
        keyboardType="numeric"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 8,
  },

  inputDescription: {
    flex: 1,
    flexDirection: 'column',
  },

  input: {
    marginLeft: 16,
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

export default NumberInput;
