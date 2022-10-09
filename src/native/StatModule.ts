import { NativeModules } from 'react-native';

const { StatModule } = NativeModules;

type StatEntry = {
  date: Date;
  duration: number;
};

interface StatModuleInterface {
  /**
   * Get stat data for a week
   */
  getWeekData(): Promise<StatEntry[]>;

  /**
   * Get stat data for a month
   */
  getMonthData(): Promise<StatEntry[]>;

  /**
   * Get stat data for a year
   */
  getYearData(): Promise<StatEntry[]>;
}

export default StatModule as StatModuleInterface;
