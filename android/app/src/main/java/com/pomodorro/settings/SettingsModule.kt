package com.pomodorro.settings

import androidx.preference.PreferenceManager
import com.facebook.react.bridge.*

class SettingsModule(reactContext: ReactApplicationContext) :
  ReactContextBaseJavaModule(reactContext) {
  private val preferences = PreferenceManager.getDefaultSharedPreferences(reactApplicationContext)

  private val settings = Settings(preferences)

  override fun getName() = "SettingsModule"

  @ReactMethod
  fun getAll(promise: Promise) {
    val params = Arguments.createMap().apply {
      putBoolean(Settings.AUTO_START_KEY, settings.autoStart)
      putInt(Settings.FOCUS_DURATION_KEY, settings.focusDuration)
      putInt(Settings.SHORT_BREAK_DURATION_KEY, settings.shortBreakDuration)
      putInt(Settings.LONG_BREAK_DURATION_KEY, settings.longBreakDuration)
      putInt(Settings.CYCLE_COUNT_KEY, settings.cycleCount)
    }

    promise.resolve(params)
  }

  @ReactMethod
  fun setAll(params: ReadableMap, promise: Promise) {
    settings.autoStart = params.getBoolean(Settings.AUTO_START_KEY)
    settings.focusDuration = params.getInt(Settings.FOCUS_DURATION_KEY)
    settings.shortBreakDuration = params.getInt(Settings.SHORT_BREAK_DURATION_KEY)
    settings.longBreakDuration = params.getInt(Settings.LONG_BREAK_DURATION_KEY)
    settings.cycleCount = params.getInt(Settings.CYCLE_COUNT_KEY)

    promise.resolve(params)
  }

  @ReactMethod
  fun getAutoStart(promise: Promise) = promise.resolve(settings.autoStart)

  @ReactMethod
  fun setAutoStart(newValue: Boolean, promise: Promise) {
    settings.autoStart = newValue
    promise.resolve(newValue)
  }

  @ReactMethod
  fun getFocusDuration(promise: Promise) = promise.resolve(settings.focusDuration)

  @ReactMethod
  fun setFocusDuration(newValue: Int, promise: Promise) {
    settings.focusDuration = newValue
    promise.resolve(newValue)
  }

  @ReactMethod
  fun getShortBreakDuration(promise: Promise) = promise.resolve(settings.shortBreakDuration)

  @ReactMethod
  fun setShortBreakDuration(newValue: Int, promise: Promise) {
    settings.shortBreakDuration = newValue
    promise.resolve(newValue)
  }

  @ReactMethod
  fun getLongBreakDuration(promise: Promise) = promise.resolve(settings.longBreakDuration)

  @ReactMethod
  fun setLongBreakDuration(newValue: Int, promise: Promise) {
    settings.longBreakDuration = newValue
    promise.resolve(newValue)
  }

  @ReactMethod
  fun getCycleCount(promise: Promise) = promise.resolve(settings.cycleCount)

  @ReactMethod
  fun setCycleCount(newValue: Int, promise: Promise) {
    settings.cycleCount = newValue
    promise.resolve(newValue)
  }
}
