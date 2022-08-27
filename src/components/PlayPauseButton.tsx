import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { useTheme } from '../hooks/useTheme';

import IconPlayerPause from '../assets/icons/player-pause.svg';
import IconPlayerPlay from '../assets/icons/player-play.svg';

type PlayPauseButtonProps = {
  playing: boolean;
  onPlay: () => void;
  onPause: () => void;
};

const PlayPauseButton = ({
  playing,
  onPlay,
  onPause,
}: PlayPauseButtonProps) => {
  const theme = useTheme();

  return (
    <Pressable
      style={[{ backgroundColor: theme.colors.primary }, styles.button]}
      onPress={playing ? onPause : onPlay}>
      {playing ? (
        <IconPlayerPause
          color={theme.colors.onPrimary}
          width={64}
          height={64}
        />
      ) : (
        <IconPlayerPlay color={theme.colors.onPrimary} width={64} height={64} />
      )}
    </Pressable>
  );
};

export const styles = StyleSheet.create({
  button: {
    borderRadius: 30,
    padding: 16,
    margin: 8,
  },
});

export default PlayPauseButton;
