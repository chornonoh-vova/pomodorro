package com.pomodorro.pomo

import android.app.ActivityManager
import android.content.BroadcastReceiver
import android.content.Context
import android.content.Intent
import android.content.IntentFilter
import com.facebook.react.bridge.*
import com.facebook.react.modules.core.DeviceEventManagerModule

class PomoModule(reactContext: ReactApplicationContext) :
  ReactContextBaseJavaModule(reactContext) {
  override fun getName() = "PomoModule"

  private var lastUpdate: Intent? = null

  private val updateFilter = IntentFilter(PomoService.ACTION_UPDATE)

  private val updateReceiver = object : BroadcastReceiver() {
    override fun onReceive(context: Context?, intent: Intent?) {
      if (intent == null) return

      lastUpdate = intent
      sendUpdate(intent)
    }
  }

  private fun sendUpdate(intent: Intent) {
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

    reactApplicationContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
      .emit("update", data)
  }

  /**
   * Exposes function to add event listener to RN side
   */
  @Suppress("unused")
  @ReactMethod
  fun addListener(eventName: String) {
    reactApplicationContext.registerReceiver(updateReceiver, updateFilter)

    lastUpdate?.let { sendUpdate(it) }
  }

  /**
   * Exposes function to remove event listener to RN side
   */
  @Suppress("unused")
  @ReactMethod
  fun removeListeners(count: Int) {
    reactApplicationContext.unregisterReceiver(updateReceiver)
  }

  @Suppress("deprecation")
  private fun isPomoServiceRunning() =
    (reactApplicationContext.getSystemService(Context.ACTIVITY_SERVICE) as ActivityManager)
      .getRunningServices(Integer.MAX_VALUE)
      .any { it.service.className == PomoService::class.java.name }

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

    context.startService(intent)

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
