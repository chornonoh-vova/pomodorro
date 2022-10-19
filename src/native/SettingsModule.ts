import { NativeModules } from 'react-native';

import { Settings } from '../types/settings';

const { SettingsModule } = NativeModules;

interface SettingsModuleInterface {
  /**
   * Get all settings from storage
   */
  getAll(): Promise<Settings>;

  /**
   * Save new values of settings to storage
   * @param settings
   */
  setAll(settings: Settings): Promise<void>;

  /**
   * Get auto start setting from storage
   */
  getAutoStart(): Promise<boolean>;

  /**
   * Save new value of auto start setting to storage
   * @param newValue
   */
  setAutoStart(newValue: boolean): Promise<boolean>;

  /**
   * Get focus duration setting from storage
   */
  getFocusDuration(): Promise<number>;

  /**
   * Save new value of focus duration setting to storage
   * @param newValue
   */
  setFocusDuration(newValue: number): Promise<number>;

  /**
   * Get short break duration setting from storage
   */
  getShortBreakDuration(): Promise<number>;

  /**
   * Save new value of short break duration to storage
   * @param newValue
   */
  setShortBreakDuration(newValue: number): Promise<number>;

  /**
   * Get long break duration setting from storage
   */
  getLongBreakDuration(): Promise<number>;

  /**
   * Save new value of long break duration to storage
   * @param newValue
   */
  setLongBreakDuration(newValue: number): Promise<number>;

  /**
   * Get cycle count setting from storage
   */
  getCycleCount(): Promise<number>;

  /**
   * Save new value of cycle count setting to storage
   * @param newValue
   */
  setCycleCount(newValue: number): Promise<number>;
}

export default SettingsModule as SettingsModuleInterface;
