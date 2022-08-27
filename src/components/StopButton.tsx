import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { useTheme } from '../hooks/useTheme';

import IconPlayerStop from '../assets/icons/player-stop.svg';

const StopButton = ({ onStop }: { onStop: () => void }) => {
  const theme = useTheme();

  return (
    <Pressable
      style={[{ backgroundColor: theme.colors.primary }, styles.button]}
      onPress={onStop}>
      <IconPlayerStop color={theme.colors.onPrimary} width={48} height={48} />
    </Pressable>
  );
};

export const styles = StyleSheet.create({
  button: {
    backgroundColor: '#4287f5',
    borderRadius: 20,
    padding: 12,
    margin: 8,
  },
});

export default StopButton;
