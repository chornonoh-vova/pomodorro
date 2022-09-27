import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import {
  ScrollView,
  StyleSheet,
  View,
  useWindowDimensions,
} from 'react-native';
import { useState } from 'react';

import type { TabParamList } from '../types/navigation';
import { Period } from '../types/stat';
import StatChart from '../components/StatChart';
import PeriodSelector from '../components/PeriodSelector';

type StatScreenProps = BottomTabScreenProps<TabParamList, 'Stat'>;

const StatScreen = (_props: StatScreenProps) => {
  const [selectedPeriod, setSelectedPeriod] = useState(Period.WEEK);

  const { width } = useWindowDimensions();

  return (
    <ScrollView>
      <View style={styles.container}>
        <PeriodSelector
          periods={[
            { value: Period.WEEK, label: 'Week' },
            { value: Period.MONTH, label: 'Month' },
            { value: Period.YEAR, label: 'Year' },
          ]}
          selectedPeriod={selectedPeriod}
          setSelectedPeriod={setSelectedPeriod}
        />

        <View style={styles.chartWrapper}>
          <StatChart
            key={`${selectedPeriod}-${width}`}
            width={width - 32}
            height={300}
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

  chartWrapper: {
    marginVertical: 32,
  },
});

export default StatScreen;
