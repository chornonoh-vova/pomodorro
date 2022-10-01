import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import {
  ScrollView,
  StyleSheet,
  View,
  useWindowDimensions,
} from 'react-native';
import { useEffect, useState } from 'react';
import { eachDayOfInterval, eachMonthOfInterval, sub } from 'date-fns';

import type { TabParamList } from '../types/navigation';
import { Period, StatDataPoint } from '../types/stat';
import StatChart from '../components/StatChart';
import PeriodSelector from '../components/PeriodSelector';

type StatScreenProps = BottomTabScreenProps<TabParamList, 'Stat'>;

const StatScreen = (_props: StatScreenProps) => {
  const [selectedPeriod, setSelectedPeriod] = useState(Period.WEEK);
  const [statData, setStatData] = useState<StatDataPoint[]>([]);

  const { width } = useWindowDimensions();

  useEffect(() => {
    const now = new Date();

    if (selectedPeriod === Period.WEEK) {
      setStatData(
        eachDayOfInterval({
          start: sub(now, { weeks: 1 }),
          end: now,
        }).map((date) => ({
          value: +(Math.random() * 100).toFixed(0),
          date,
        })),
      );
    } else if (selectedPeriod === Period.MONTH) {
      setStatData(
        eachDayOfInterval({
          start: sub(now, { months: 1 }),
          end: now,
        }).map((date) => ({
          value: +(Math.random() * 100).toFixed(0),
          date,
        })),
      );
    } else if (selectedPeriod === Period.YEAR) {
      setStatData(
        eachMonthOfInterval({
          start: sub(now, { years: 1 }),
          end: now,
        }).map((date) => ({
          value: +(Math.random() * 100).toFixed(0),
          date,
        })),
      );
    }
  }, [selectedPeriod, setStatData]);

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
            data={statData}
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
