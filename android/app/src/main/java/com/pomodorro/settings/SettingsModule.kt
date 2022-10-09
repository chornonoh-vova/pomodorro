package com.pomodorro.settings

import com.facebook.react.bridge.*

class SettingsModule(reactContext: ReactApplicationContext) :
  ReactContextBaseJavaModule(reactContext) {
  private val settings = Settings()

  override fun getName() = "SettingsModule"

  @ReactMethod
  fun getAll(promise: Promise) {
    promise.resolve(settings.all.toMap())
  }

  @ReactMethod
  fun setAll(params: ReadableMap, promise: Promise) {
    settings.all = SettingsData.fromMap(params)
    promise.resolve(settings.all.toMap())
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
