import { StyleSheet } from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import type { ChartData } from 'react-native-chart-kit/dist/HelperTypes';

import { useTheme } from '../hooks/useTheme';

type WeekAndMonthStatChartProps = {
  width: number;
  height: number;
  data: ChartData;
};

const WeekAndMonthStatChart = ({
  width,
  height,
  data,
}: WeekAndMonthStatChartProps) => {
  const theme = useTheme();

  return (
    <BarChart
      style={styles.chart}
      chartConfig={{
        backgroundColor: theme.colors.primaryDarken,
        backgroundGradientFrom: theme.colors.background,
        backgroundGradientFromOpacity: 1,
        backgroundGradientTo: theme.colors.background,
        backgroundGradientToOpacity: 1,
        fillShadowGradientFrom: theme.colors.primaryDarken,
        fillShadowGradientFromOpacity: 1,
        fillShadowGradientTo: theme.colors.primary,
        fillShadowGradientToOpacity: 0.25,
        color: (opacity = 1) => `rgba(11, 92, 221, ${opacity})`,
        labelColor: () => theme.colors.text,
        barRadius: 2,
        barPercentage: 0.5,
        decimalPlaces: 0,
      }}
      withInnerLines={false}
      showBarTops={false}
      showValuesOnTopOfBars
      fromZero
      width={width}
      height={height}
      data={data}
      yAxisLabel=""
      yAxisSuffix=" m"
    />
  );
};

const styles = StyleSheet.create({
  chart: {
    paddingRight: 48,
  },
});

export default WeekAndMonthStatChart;
