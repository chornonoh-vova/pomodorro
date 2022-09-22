import {
  eachDayOfInterval,
  eachWeekOfInterval,
  endOfWeek,
  format,
  startOfWeek,
  startOfMonth,
  endOfMonth,
  startOfYear,
  endOfYear,
} from 'date-fns';

import { Period } from '../types/stat';
import { exhaustiveCheck } from '../types/utils';

import WeekAndMonthStatChart from './WeekAndMonthStatChart';
import YearStatChart from './YearStatChart';

type StatChartProps = {
  width: number;
  period: Period;
};

const HEIGHT = 350;

const weekData = () => {
  const now = new Date();

  const labels = eachDayOfInterval({
    start: startOfWeek(now),
    end: endOfWeek(now),
  }).map((date) => format(date, 'E'));

  return {
    labels,
    datasets: [
      {
        data: Array(labels.length)
          .fill(0)
          .map(() => +(Math.random() * 100).toFixed(0)),
      },
    ],
  };
};

const monthData = () => {
  const now = new Date();

  const labels = eachWeekOfInterval({
    start: startOfMonth(now),
    end: endOfMonth(now),
  }).map((date) => format(date, 'MMM dd'));

  return {
    labels,
    datasets: [
      {
        data: Array(labels.length)
          .fill(0)
          .map(() => +(Math.random() * 100).toFixed(0)),
      },
    ],
  };
};

const yearData = () => {
  const now = new Date();

  return eachDayOfInterval({
    start: startOfYear(now),
    end: endOfYear(now),
  }).map((date) => ({
    date: format(date, 'yyyy-MM-dd'),
    count: +(Math.random() * 5).toFixed(0),
  }));
};

const StatChart = ({ width, period }: StatChartProps) => {
  const week = weekData();
  const month = monthData();
  const year = yearData();

  switch (period) {
    case Period.WEEK:
      return (
        <WeekAndMonthStatChart width={width} height={HEIGHT} data={week} />
      );
    case Period.MONTH:
      return (
        <WeekAndMonthStatChart width={width} height={HEIGHT} data={month} />
      );
    case Period.YEAR:
      return <YearStatChart height={HEIGHT} data={year} />;
    default:
      exhaustiveCheck(period);
  }
};

export default StatChart;
