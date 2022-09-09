package com.pomodorro.settings

import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.ReadableMap
import com.facebook.react.bridge.WritableMap

data class SettingsData(
  val autoStart: Boolean,
  val focusDuration: Int,
  val shortBreakDuration: Int,
  val longBreakDuration: Int,
  val cycleCount: Int
) {
  /**
   * Convert [SettingsData] instance data to RN [WritableMap]
   */
  fun toMap(): WritableMap = Arguments.createMap().apply {
    putBoolean(AUTO_START_KEY, autoStart)
    putInt(FOCUS_DURATION_KEY, focusDuration)
    putInt(SHORT_BREAK_DURATION_KEY, shortBreakDuration)
    putInt(LONG_BREAK_DURATION_KEY, longBreakDuration)
    putInt(CYCLE_COUNT_KEY, cycleCount)
  }

  companion object {
    /**
     * Convert RN [ReadableMap] to [SettingsData] instance
     */
    fun fromMap(params: ReadableMap) = params.run {
      SettingsData(
        getBoolean(AUTO_START_KEY),
        getInt(FOCUS_DURATION_KEY),
        getInt(SHORT_BREAK_DURATION_KEY),
        getInt(LONG_BREAK_DURATION_KEY),
        getInt(CYCLE_COUNT_KEY)
      )
    }

    const val AUTO_START_KEY = "autoStart"
    const val DEFAULT_AUTO_START = false

    const val FOCUS_DURATION_KEY = "focusDuration"
    const val DEFAULT_FOCUS_DURATION = 25 * 60

    const val SHORT_BREAK_DURATION_KEY = "shortBreakDuration"
    const val DEFAULT_SHORT_BREAK_DURATION = 5 * 60

    const val LONG_BREAK_DURATION_KEY = "longBreakDuration"
    const val DEFAULT_LONG_BREAK_DURATION = 15 * 60

    const val CYCLE_COUNT_KEY = "cycleCount"
    const val DEFAULT_CYCLE_COUNT = 4
  }
}
