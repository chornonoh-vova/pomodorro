import { ScrollView, StyleSheet, Text, View } from 'react-native';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';

import PlayerActions from '../components/PlayerActions';
import Countdown from '../components/Countdown';
import PomoModule from '../native/PomoModule';
import type { TabParamList } from '../types/navigation';
import { useTheme } from '../hooks/useTheme';
import { usePomoTimer } from '../hooks/usePomoTimer';
import { Orientation, useOrientation } from '../hooks/useOrientation';

type PomoScreenProps = BottomTabScreenProps<TabParamList, 'Pomo'>;

const PomoScreen = (_props: PomoScreenProps) => {
  const theme = useTheme();
  const orientation = useOrientation();

  const { running, time, percent, cycle, cycleCount, cycleDuration, state } =
    usePomoTimer();

  return (
    <ScrollView>
      {cycleDuration !== 0 && (
        <View
          style={[
            styles.container,
            orientation === Orientation.PORTRAIT
              ? styles.containerPortrait
              : styles.containerLandscape,
          ]}>
          <View style={styles.countdown}>
            <Countdown time={time} percent={percent} state={state} />

            <Text style={[{ color: theme.colors.text }, styles.cycleText]}>
              {cycle}/{cycleCount}
            </Text>
          </View>

          <PlayerActions
            playing={running}
            onPlay={() => PomoModule.play()}
            onPause={() => PomoModule.pause()}
            onStop={() => PomoModule.stop()}
            onReset={() => PomoModule.reset()}
          />
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  countdown: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  containerPortrait: {
    flexDirection: 'column',
    marginVertical: 48,
  },

  containerLandscape: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginVertical: 16,
  },

  cycleText: {
    marginTop: 16,
    fontSize: 14,
  },
});

export default PomoScreen;
