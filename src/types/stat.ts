export const enum Period {
  WEEK = 'week',
  MONTH = 'month',
  YEAR = 'year',
}

export type StatDataPoint = {
  value: number;
  date: Date;
};

export type StatBarDataPoint = {
  value: number;
  date: Date;
  label: string;
  description: string;
};
