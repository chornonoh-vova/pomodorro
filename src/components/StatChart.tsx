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

import { Period } from '../types/stat';

import StatBarChart from './StatBarChart';

type StatChartProps = {
  width: number;
  height: number;
  period: Period;
};

const weekData = () => {
  const now = new Date();

  return eachDayOfInterval({
    start: startOfWeek(now),
    end: endOfWeek(now),
  }).map((date) => ({
    value: +(Math.random() * 100).toFixed(0),
    date,
    label: format(date, 'E'),
    description: format(date, 'MMM dd, yyyy'),
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
    description: format(date, 'MMM dd, yyyy'),
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
    description: format(date, 'MMMM yyyy'),
  }));
};

const StatChart = ({ width, height, period }: StatChartProps) => {
  const week = weekData();
  const month = monthData();
  const year = yearData();

  if (period === Period.WEEK) {
    return (
      <StatBarChart
        width={width}
        height={height}
        barWidth={32}
        barRadius={6}
        data={week}
      />
    );
  }

  if (period === Period.MONTH) {
    return <StatBarChart width={width} height={height} data={month} />;
  }

  if (period === Period.YEAR) {
    return (
      <StatBarChart
        width={width}
        height={height}
        barWidth={16}
        barRadius={4}
        data={year}
      />
    );
  }

  return null;
};

export default StatChart;
