import { View, StyleSheet, Pressable } from 'react-native';

import { useTheme } from '../hooks/useTheme';

import PauseIcon from '../assets/icons/pause.svg';
import PlayIcon from '../assets/icons/play.svg';
import RestartIcon from '../assets/icons/restart.svg';
import StopIcon from '../assets/icons/stop.svg';

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
        <RestartIcon color={theme.colors.onPrimary} width={48} height={48} />
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
          <PauseIcon color={theme.colors.onPrimary} width={64} height={64} />
        ) : (
          <PlayIcon color={theme.colors.onPrimary} width={64} height={64} />
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
        <StopIcon color={theme.colors.onPrimary} width={48} height={48} />
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
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    padding: 16,
    margin: 8,
  },

  sideButton: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    padding: 12,
    margin: 8,
  },
});

export default PlayerActions;
