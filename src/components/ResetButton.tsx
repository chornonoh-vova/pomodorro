import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { useTheme } from '../hooks/useTheme';

import IconRotate from '../assets/icons/rotate.svg';

const ResetButton = ({ onReset }: { onReset: () => void }) => {
  const theme = useTheme();

  return (
    <Pressable
      style={[{ backgroundColor: theme.colors.primary }, styles.button]}
      onPress={onReset}>
      <IconRotate color={theme.colors.onPrimary} width={48} height={48} />
    </Pressable>
  );
};

export const styles = StyleSheet.create({
  button: {
    borderRadius: 20,
    padding: 12,
    margin: 8,
  },
});

export default ResetButton;
