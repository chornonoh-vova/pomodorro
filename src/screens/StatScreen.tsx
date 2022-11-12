import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import {
  ScrollView,
  StyleSheet,
  View,
  useWindowDimensions,
} from 'react-native';
import { useEffect, useState } from 'react';
import { format, parse } from 'date-fns';

import type { TabParamList } from '../types/navigation';
import {
  Period,
  StatBarDataPoint,
  StatDataPoint,
  StatEntry,
} from '../types/stat';
import PeriodSelector from '../components/PeriodSelector';
import StatSummaryCard from '../components/StatSummaryCard';
import StatChart from '../components/StatChart';
import StatModule from '../native/StatModule';

type StatScreenProps = BottomTabScreenProps<TabParamList, 'Stat'>;

const STAT_ENTRY_FORMAT = 'yyyy-MM-dd';
const DAY_DESC_FORMAT = 'MMM dd, yyyy';

const mapStatEntries = ({ duration, date }: StatEntry): StatDataPoint => ({
  value: +(duration / 60).toFixed(2),
  date: parse(date, STAT_ENTRY_FORMAT, new Date()),
});

const mapWeekData = ({ value, date }: StatDataPoint) => ({
  value,
  date,
  label: format(date, 'E'),
  description: format(date, DAY_DESC_FORMAT),
});

const mapMonthData = ({ value, date }: StatDataPoint, index: number) => ({
  value,
  date,
  label: index === 0 || (index + 1) % 7 === 0 ? format(date, 'd') : '',
  description: format(date, DAY_DESC_FORMAT),
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
  const [statEntries, setStatEntries] = useState<StatEntry[]>([]);
  const [statData, setStatData] = useState<StatBarDataPoint[]>([]);

  const [isLoading, setIsLoading] = useState(false);

  const { width } = useWindowDimensions();

  useEffect(() => {
    setIsLoading(true);

    switch (selectedPeriod) {
      case Period.WEEK:
        StatModule.getWeekData().then((entries) => {
          const data = entries.map(mapStatEntries).map(mapWeekData);
          setStatEntries(entries);
          setStatData(data);
          setIsLoading(false);
        });
        break;
      case Period.MONTH:
        StatModule.getMonthData().then((entries) => {
          const data = entries.map(mapStatEntries).map(mapMonthData);
          setStatEntries(entries);
          setStatData(data);
          setIsLoading(false);
        });
        break;
      case Period.YEAR:
        StatModule.getYearData().then((entries) => {
          const data = entries.map(mapStatEntries).map(mapYearData);
          setStatEntries(entries);
          setStatData(data);
          setIsLoading(false);
        });
        break;
    }
  }, [selectedPeriod]);

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

        {!isLoading && (
          <>
            <View style={styles.chartWrapper}>
              <StatChart
                key={`${selectedPeriod}-${width}`}
                width={width - 32}
                height={300}
                barWidth={barWidth[selectedPeriod]}
                data={statData}
              />
            </View>

            {statData.length !== 0 && (
              <StatSummaryCard period={selectedPeriod} data={statEntries} />
            )}
          </>
        )}
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
