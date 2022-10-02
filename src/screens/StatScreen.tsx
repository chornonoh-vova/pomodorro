import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import {
  ScrollView,
  StyleSheet,
  View,
  useWindowDimensions,
} from 'react-native';
import { useEffect, useState } from 'react';
import { eachDayOfInterval, eachMonthOfInterval, format, sub } from 'date-fns';

import type { TabParamList } from '../types/navigation';
import { Period, StatBarDataPoint, StatDataPoint } from '../types/stat';
import PeriodSelector from '../components/PeriodSelector';
import StatSummaryCard from '../components/StatSummaryCard';
import StatChart from '../components/StatChart';

type StatScreenProps = BottomTabScreenProps<TabParamList, 'Stat'>;

const mapGenerateData = (date: Date) => ({
  value: +(Math.random() * 100).toFixed(2),
  date,
});

const mapWeekData = ({ value, date }: StatDataPoint) => ({
  value,
  date,
  label: format(date, 'E'),
  description: format(date, 'MMM dd, yyyy'),
});

const mapMonthData = ({ value, date }: StatDataPoint, index: number) => ({
  value,
  date,
  label: index === 0 || (index + 1) % 7 === 0 ? format(date, 'd') : '',
  description: format(date, 'MMM dd, yyyy'),
});

const mapYearData = ({ value, date }: StatDataPoint) => ({
  value,
  date,
  label: format(date, 'MMM'),
  description: format(date, 'MMMM yyyy'),
});

const barWidth = {
  [Period.WEEK]: 32,
  [Period.MONTH]: 10,
  [Period.YEAR]: 24,
};

const StatScreen = (_props: StatScreenProps) => {
  const [selectedPeriod, setSelectedPeriod] = useState(Period.WEEK);
  const [statData, setStatData] = useState<StatBarDataPoint[]>([]);

  const { width } = useWindowDimensions();

  useEffect(() => {
    const now = new Date();

    switch (selectedPeriod) {
      case Period.WEEK:
        setStatData(
          eachDayOfInterval({
            start: sub(now, { weeks: 1 }),
            end: now,
          })
            .map(mapGenerateData)
            .map(mapWeekData),
        );
        break;
      case Period.MONTH:
        setStatData(
          eachDayOfInterval({
            start: sub(now, { months: 1 }),
            end: now,
          })
            .map(mapGenerateData)
            .map(mapMonthData),
        );
        break;
      case Period.YEAR:
        setStatData(
          eachMonthOfInterval({
            start: sub(now, { years: 1 }),
            end: now,
          })
            .map(mapGenerateData)
            .map(mapYearData),
        );
        break;
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
            barWidth={barWidth[selectedPeriod]}
            data={statData}
          />
        </View>

        <StatSummaryCard period={selectedPeriod} data={statData} />
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
