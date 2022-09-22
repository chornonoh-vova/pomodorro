import { ContributionGraph } from 'react-native-chart-kit';
import {
  endOfYear,
  differenceInDays,
  differenceInWeeks,
  startOfYear,
} from 'date-fns';
import { ScrollView } from 'react-native';

import { useTheme } from '../hooks/useTheme';

type YearStatChartProps = {
  height: number;
  data: { date: string; count: number }[];
};

const SQUARE_SIZE = 20;
const GUTTER_SIZE = 2;

const YearStatChart = ({ height, data }: YearStatChartProps) => {
  const theme = useTheme();

  const now = new Date();

  const start = startOfYear(now);
  const end = endOfYear(now);

  const numWeeks = differenceInWeeks(end, start) + 1;
  const numDays = differenceInDays(end, start) + 1;

  return (
    <ScrollView horizontal>
      <ContributionGraph
        chartConfig={{
          backgroundColor: theme.colors.primaryDarken,
          backgroundGradientFrom: theme.colors.background,
          backgroundGradientFromOpacity: 1,
          backgroundGradientTo: theme.colors.background,
          backgroundGradientToOpacity: 1,
          color: (opacity = 1) => `rgba(11, 92, 221, ${opacity})`,
          labelColor: () => theme.colors.text,
        }}
        endDate={end}
        numDays={numDays}
        values={data}
        squareSize={SQUARE_SIZE}
        gutterSize={GUTTER_SIZE}
        width={numWeeks * (SQUARE_SIZE + GUTTER_SIZE) + 48}
        height={height}
        tooltipDataAttrs={() => ({})}
      />
    </ScrollView>
  );
};

export default YearStatChart;
