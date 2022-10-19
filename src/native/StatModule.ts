import { NativeModules } from 'react-native';

import { StatEntry } from '../types/stat';

const { StatModule } = NativeModules;

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
