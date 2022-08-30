package com.pomodorro.settings

import androidx.preference.PreferenceManager
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod

class SettingsModule(reactContext: ReactApplicationContext) :
  ReactContextBaseJavaModule(reactContext) {
  private val preferences = PreferenceManager.getDefaultSharedPreferences(reactApplicationContext)

  val settings = Settings(preferences)

  override fun getName() = "SettingsModule"

  // default values exported to React Native side
  override fun getConstants(): MutableMap<String, Any> =
    hashMapOf(
      "DEFAULT_AUTO_START" to Settings.DEFAULT_AUTO_START,
      "DEFAULT_FOCUS_DURATION" to Settings.DEFAULT_FOCUS_DURATION,
      "DEFAULT_SHORT_BREAK_DURATION" to Settings.DEFAULT_SHORT_BREAK_DURATION,
      "DEFAULT_LONG_BREAK_DURATION" to Settings.DEFAULT_LONG_BREAK_DURATION,
      "DEFAULT_CYCLE_COUNT" to Settings.DEFAULT_CYCLE_COUNT
    )

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
