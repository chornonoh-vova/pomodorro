import {
  eachDayOfInterval,
  endOfWeek,
  format,
  startOfWeek,
  startOfMonth,
  endOfMonth,
  startOfYear,
  endOfYear,
  eachMonthOfInterval,
} from 'date-fns';

import { useTheme } from '../hooks/useTheme';
import { Period } from '../types/stat';
import { exhaustiveCheck } from '../types/utils';

import StatBarChart from './StatBarChart';

type StatChartProps = {
  width: number;
  period: Period;
};

const HEIGHT = 350;

const weekData = () => {
  const now = new Date();

  return eachDayOfInterval({
    start: startOfWeek(now),
    end: endOfWeek(now),
  }).map((date) => ({
    value: +(Math.random() * 100).toFixed(0),
    date,
    label: format(date, 'E'),
    description: '',
  }));
};

const monthData = () => {
  const now = new Date();

  return eachDayOfInterval({
    start: startOfMonth(now),
    end: endOfMonth(now),
  }).map((date, index) => ({
    value: +(Math.random() * 100).toFixed(0),
    date,
    label: index === 0 || (index + 1) % 7 === 0 ? format(date, 'd') : '',
    description: '',
  }));
};

const yearData = () => {
  const now = new Date();

  return eachMonthOfInterval({
    start: startOfYear(now),
    end: endOfYear(now),
  }).map((date) => ({
    value: +(Math.random() * 100).toFixed(0),
    date,
    label: format(date, 'MMM'),
    description: '',
  }));
};

const StatChart = ({ width, period }: StatChartProps) => {
  const theme = useTheme();

  const week = weekData();
  const month = monthData();
  const year = yearData();

  switch (period) {
    case Period.WEEK:
      return (
        <StatBarChart
          width={width}
          height={HEIGHT}
          barColor={theme.colors.primaryDarken}
          textColor={theme.colors.text}
          barWidth={32}
          barRadius={6}
          data={week}
        />
      );
    case Period.MONTH:
      return (
        <StatBarChart
          width={width}
          height={HEIGHT}
          barColor={theme.colors.primaryDarken}
          textColor={theme.colors.text}
          data={month}
        />
      );
    case Period.YEAR:
      return (
        <StatBarChart
          width={width}
          height={HEIGHT}
          barColor={theme.colors.primaryDarken}
          textColor={theme.colors.text}
          barWidth={16}
          barRadius={4}
          data={year}
        />
      );
    default:
      exhaustiveCheck(period);
  }
};

export default StatChart;
