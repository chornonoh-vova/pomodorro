package com.pomodorro.settings

import android.content.SharedPreferences

/**
 * Settings util class
 */
class Settings(private val preferences: SharedPreferences) {
  var autoStart: Boolean
    get() = preferences.getBoolean(AUTO_START_KEY, DEFAULT_AUTO_START)
    set(value) {
      preferences.edit().run {
        putBoolean(AUTO_START_KEY, value)
        apply()
      }
    }

  var focusDuration: Int
    get() = preferences.getInt(FOCUS_DURATION_KEY, DEFAULT_FOCUS_DURATION)
    set(value) {
      preferences.edit().run {
        putInt(FOCUS_DURATION_KEY, value)
        apply()
      }
    }

  var shortBreakDuration: Int
    get() = preferences.getInt(SHORT_BREAK_DURATION_KEY, DEFAULT_SHORT_BREAK_DURATION)
    set(value) {
      preferences.edit().run {
        putInt(SHORT_BREAK_DURATION_KEY, value)
        apply()
      }
    }

  var longBreakDuration: Int
    get() = preferences.getInt(LONG_BREAK_DURATION_KEY, DEFAULT_LONG_BREAK_DURATION)
    set(value) {
      preferences.edit().apply {
        putInt(LONG_BREAK_DURATION_KEY, value)
        apply()
      }
    }

  var cycleCount: Int
    get() = preferences.getInt(CYCLE_COUNT_KEY, DEFAULT_CYCLE_COUNT)
    set(value) {
      preferences.edit().apply {
        putInt(CYCLE_COUNT_KEY, value)
        apply()
      }
    }

  companion object {
    // automatically start next focus/break
    const val AUTO_START_KEY = "autoStart"
    const val DEFAULT_AUTO_START = false

    // focus duration by default is 25 minutes
    const val FOCUS_DURATION_KEY = "focusDuration"
    const val DEFAULT_FOCUS_DURATION = 25 * 60

    // short break duration by default is 5 minutes
    const val SHORT_BREAK_DURATION_KEY = "shortBreakDuration"
    const val DEFAULT_SHORT_BREAK_DURATION = 5 * 60

    // long break duration by default is 15 minutes
    const val LONG_BREAK_DURATION_KEY = "longBreakDuration"
    const val DEFAULT_LONG_BREAK_DURATION = 15 * 60

    // number of cycles by default is 4
    const val CYCLE_COUNT_KEY = "cycleCount"
    const val DEFAULT_CYCLE_COUNT = 4
  }
}
