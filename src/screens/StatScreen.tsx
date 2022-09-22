import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { Picker } from '@react-native-picker/picker';
import {
  ScrollView,
  StyleSheet,
  View,
  useWindowDimensions,
} from 'react-native';
import { useState } from 'react';

import type { TabParamList } from '../types/navigation';
import { Period } from '../types/stat';
import { useTheme } from '../hooks/useTheme';
import StatChart from '../components/StatChart';

type StatScreenProps = BottomTabScreenProps<TabParamList, 'Stat'>;

const StatScreen = (_props: StatScreenProps) => {
  const theme = useTheme();
  const [selectedPeriod, setSelectedPeriod] = useState(Period.WEEK);

  const { width } = useWindowDimensions();

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={[{ borderColor: theme.colors.border }, styles.period]}>
          <Picker
            selectedValue={selectedPeriod}
            onValueChange={(period) => setSelectedPeriod(period)}>
            <Picker.Item label="Week" value={Period.WEEK} />
            <Picker.Item label="Month" value={Period.MONTH} />
            <Picker.Item label="Year" value={Period.YEAR} />
          </Picker>
        </View>

        <View style={styles.chartWrapper}>
          <StatChart
            key={`${selectedPeriod}-${width}`}
            width={width - 32}
            period={selectedPeriod}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 16,
  },

  period: {
    borderRadius: 6,
    borderWidth: 2,
  },

  chartWrapper: {
    marginVertical: 32,
  },
});

export default StatScreen;
