import React from 'react';
import { View, StyleSheet, Pressable } from 'react-native';

import { useTheme } from '../hooks/useTheme';

import IconPlayerPause from '../assets/icons/player-pause.svg';
import IconPlayerPlay from '../assets/icons/player-play.svg';
import IconRotate from '../assets/icons/rotate.svg';
import IconPlayerStop from '../assets/icons/player-stop.svg';

type PlayerActionsProps = {
  playing: boolean;
  onPlay: () => void;
  onPause: () => void;
  onReset: () => void;
  onStop: () => void;
};

const PlayerActions = ({
  playing,
  onPlay,
  onPause,
  onReset,
  onStop,
}: PlayerActionsProps) => {
  const theme = useTheme();

  return (
    <View style={styles.actions}>
      <Pressable
        style={({ pressed }) => [
          {
            backgroundColor: pressed
              ? theme.colors.primaryDarken
              : theme.colors.primary,
          },
          styles.sideButton,
        ]}
        onPress={onReset}>
        <IconRotate color={theme.colors.onPrimary} width={48} height={48} />
      </Pressable>

      <Pressable
        style={({ pressed }) => [
          {
            backgroundColor: pressed
              ? theme.colors.primaryDarken
              : theme.colors.primary,
          },
          styles.centerButton,
        ]}
        onPress={playing ? onPause : onPlay}>
        {playing ? (
          <IconPlayerPause
            color={theme.colors.onPrimary}
            width={64}
            height={64}
          />
        ) : (
          <IconPlayerPlay
            color={theme.colors.onPrimary}
            width={64}
            height={64}
          />
        )}
      </Pressable>

      <Pressable
        style={({ pressed }) => [
          {
            backgroundColor: pressed
              ? theme.colors.primaryDarken
              : theme.colors.primary,
          },
          styles.sideButton,
        ]}
        onPress={onStop}>
        <IconPlayerStop color={theme.colors.onPrimary} width={48} height={48} />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  actions: {
    marginVertical: 32,
    flexDirection: 'row',
    alignItems: 'center',
  },

  centerButton: {
    borderRadius: 30,
    padding: 16,
    margin: 8,
  },

  sideButton: {
    borderRadius: 20,
    padding: 12,
    margin: 8,
  },
});

export default PlayerActions;
