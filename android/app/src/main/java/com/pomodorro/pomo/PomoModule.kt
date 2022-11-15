package com.pomodorro.pomo

import android.content.BroadcastReceiver
import android.content.Context
import android.content.Intent
import android.content.IntentFilter
import com.facebook.react.bridge.*
import com.facebook.react.modules.core.DeviceEventManagerModule
import com.pomodorro.isServiceRunning

class PomoModule(reactContext: ReactApplicationContext) :
  ReactContextBaseJavaModule(reactContext) {
  override fun getName() = "PomoModule"

  private val updateFilter = IntentFilter(PomoService.ACTION_UPDATE)

  private val updateReceiver = object : BroadcastReceiver() {
    override fun onReceive(context: Context?, intent: Intent?) {
      if (intent == null) return

      val data = Arguments.createMap().apply {
        putBoolean("timerRunning", intent.getBooleanExtra(PomoService.EXTRA_RUNNING, false))
        putString("currentState", intent.getStringExtra(PomoService.EXTRA_CURRENT_STATE))
        putInt("currentSecond", intent.getIntExtra(PomoService.EXTRA_CURRENT_SECOND, 0))
        putInt("currentCycle", intent.getIntExtra(PomoService.EXTRA_CURRENT_CYCLE, 1))
        putInt(
          "currentCycleDuration",
          intent.getIntExtra(PomoService.EXTRA_CURRENT_CYCLE_DURATION, 0)
        )
      }

      sendUpdateEvent(reactApplicationContext, data)
    }
  }

  /**
   * Sends JS event to UI
   */
  private fun sendUpdateEvent(reactContext: ReactContext, params: WritableMap?) {
    reactContext
      .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
      .emit("update", params)
  }

  /**
   * Exposes function to add event listener to RN side
   */
  @ReactMethod
  fun addListener(eventName: String) {
    reactApplicationContext.registerReceiver(updateReceiver, updateFilter)
  }

  /**
   * Exposes function to remove event listener to RN side
   */
  @ReactMethod
  fun removeListeners(count: Int) {
    reactApplicationContext.unregisterReceiver(updateReceiver)
  }

  /**
   * Find out if service is running or not
   */
  private fun isPomoServiceRunning() =
    reactApplicationContext.isServiceRunning(PomoService::class.java)

  /**
   * Exposes function to get status if the service
   */
  @ReactMethod
  fun isServiceRunning(promise: Promise) {
    promise.resolve(isPomoServiceRunning())
  }

  /**
   * Exposes function to start timer.
   */
  @ReactMethod
  fun play(promise: Promise) {
    val context = reactApplicationContext

    val intent = Intent(context, PomoService::class.java).apply {
      action = PomoService.ACTION_PLAY
    }

    context.startForegroundService(intent)

    promise.resolve(null)
  }

  /**
   * Exposes function to pause timer.
   */
  @ReactMethod
  fun pause(promise: Promise) {
    if (!isPomoServiceRunning()) {
      promise.resolve(false)
      return
    }

    val context = reactApplicationContext

    val intent = Intent(context, PomoService::class.java).apply {
      action = PomoService.ACTION_PAUSE
    }

    context.startService(intent)

    promise.resolve(true)
  }

  /**
   * Exposes function to stop timer.
   */
  @ReactMethod
  fun stop(promise: Promise) {
    if (!isPomoServiceRunning()) {
      promise.resolve(false)
      return
    }

    val context = reactApplicationContext

    val intent = Intent(context, PomoService::class.java).apply {
      action = PomoService.ACTION_STOP
    }

    context.startService(intent)

    promise.resolve(true)
  }

  /**
   * Exposes function to reset timer.
   */
  @ReactMethod
  fun reset(promise: Promise) {
    if (!isPomoServiceRunning()) {
      promise.resolve(false)
      return
    }

    val context = reactApplicationContext

    val intent = Intent(context, PomoService::class.java).apply {
      action = PomoService.ACTION_RESET
    }

    context.startService(intent)

    promise.resolve(true)
  }
}
