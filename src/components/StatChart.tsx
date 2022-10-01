import { format } from 'date-fns';

import { Period, StatDataPoint } from '../types/stat';

import StatBarChart from './StatBarChart';

type StatChartProps = {
  width: number;
  height: number;
  period: Period;
  data: StatDataPoint[];
};

const getWeekData = (data: StatDataPoint[]) =>
  data.map(({ value, date }) => ({
    value,
    date,
    label: format(date, 'E'),
    description: format(date, 'MMM dd, yyyy'),
  }));

const getMonthData = (data: StatDataPoint[]) =>
  data.map(({ value, date }, index) => ({
    value,
    date,
    label: index === 0 || (index + 1) % 7 === 0 ? format(date, 'd') : '',
    description: format(date, 'MMM dd, yyyy'),
  }));

const getYearData = (data: StatDataPoint[]) =>
  data.map(({ value, date }) => ({
    value,
    date,
    label: format(date, 'MMM'),
    description: format(date, 'MMMM yyyy'),
  }));

const StatChart = ({ width, height, period, data }: StatChartProps) => {
  if (period === Period.WEEK) {
    return (
      <StatBarChart
        width={width}
        height={height}
        barWidth={32}
        barRadius={6}
        data={getWeekData(data)}
      />
    );
  }

  if (period === Period.MONTH) {
    return (
      <StatBarChart width={width} height={height} data={getMonthData(data)} />
    );
  }

  if (period === Period.YEAR) {
    return (
      <StatBarChart
        width={width}
        height={height}
        barWidth={16}
        barRadius={4}
        data={getYearData(data)}
      />
    );
  }

  return null;
};

export default StatChart;
