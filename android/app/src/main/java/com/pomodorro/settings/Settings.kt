package com.pomodorro.settings

import android.content.SharedPreferences

/**
 * Settings util class
 */
class Settings(private val preferences: SharedPreferences) {
  var autoStart: Boolean
    get() = preferences.getBoolean(SettingsData.AUTO_START_KEY, SettingsData.DEFAULT_AUTO_START)
    set(value) {
      preferences.edit().run {
        putBoolean(SettingsData.AUTO_START_KEY, value)
        apply()
      }
    }

  var focusDuration: Int
    get() = preferences.getInt(SettingsData.FOCUS_DURATION_KEY, SettingsData.DEFAULT_FOCUS_DURATION)
    set(value) {
      preferences.edit().run {
        putInt(SettingsData.FOCUS_DURATION_KEY, value)
        apply()
      }
    }

  var shortBreakDuration: Int
    get() = preferences.getInt(
      SettingsData.SHORT_BREAK_DURATION_KEY,
      SettingsData.DEFAULT_SHORT_BREAK_DURATION
    )
    set(value) {
      preferences.edit().run {
        putInt(SettingsData.SHORT_BREAK_DURATION_KEY, value)
        apply()
      }
    }

  var longBreakDuration: Int
    get() = preferences.getInt(
      SettingsData.LONG_BREAK_DURATION_KEY,
      SettingsData.DEFAULT_LONG_BREAK_DURATION
    )
    set(value) {
      preferences.edit().apply {
        putInt(SettingsData.LONG_BREAK_DURATION_KEY, value)
        apply()
      }
    }

  var cycleCount: Int
    get() = preferences.getInt(SettingsData.CYCLE_COUNT_KEY, SettingsData.DEFAULT_CYCLE_COUNT)
    set(value) {
      preferences.edit().apply {
        putInt(SettingsData.CYCLE_COUNT_KEY, value)
        apply()
      }
    }

  var all: SettingsData
    get() = SettingsData(
      autoStart, focusDuration, shortBreakDuration, longBreakDuration, cycleCount
    )
    set(value) {
      autoStart = value.autoStart
      focusDuration = value.focusDuration
      shortBreakDuration = value.shortBreakDuration
      longBreakDuration = value.longBreakDuration
      cycleCount = value.cycleCount
    }
}
