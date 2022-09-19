package com.pomodorro.settings

import com.tencent.mmkv.MMKV

/**
 * Settings util class
 */
class Settings {
  private val kv = MMKV.defaultMMKV(MMKV.MULTI_PROCESS_MODE, null)

  var autoStart: Boolean
    get() = kv.decodeBool(SettingsData.AUTO_START_KEY, SettingsData.DEFAULT_AUTO_START)
    set(value) {
      kv.encode(SettingsData.AUTO_START_KEY, value)
    }

  var focusDuration: Int
    get() = kv.decodeInt(SettingsData.FOCUS_DURATION_KEY, SettingsData.DEFAULT_FOCUS_DURATION)
    set(value) {
      kv.encode(SettingsData.FOCUS_DURATION_KEY, value)
    }

  var shortBreakDuration: Int
    get() = kv.decodeInt(
      SettingsData.SHORT_BREAK_DURATION_KEY,
      SettingsData.DEFAULT_SHORT_BREAK_DURATION
    )
    set(value) {
      kv.encode(SettingsData.SHORT_BREAK_DURATION_KEY, value)
    }

  var longBreakDuration: Int
    get() = kv.decodeInt(
      SettingsData.LONG_BREAK_DURATION_KEY,
      SettingsData.DEFAULT_LONG_BREAK_DURATION
    )
    set(value) {
      kv.encode(SettingsData.LONG_BREAK_DURATION_KEY, value)
    }

  var cycleCount: Int
    get() = kv.decodeInt(SettingsData.CYCLE_COUNT_KEY, SettingsData.DEFAULT_CYCLE_COUNT)
    set(value) {
      kv.encode(SettingsData.CYCLE_COUNT_KEY, value)
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
