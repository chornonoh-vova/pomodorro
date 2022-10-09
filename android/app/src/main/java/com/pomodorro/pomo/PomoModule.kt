package com.pomodorro.pomo

import android.content.ComponentName
import android.content.Intent
import android.content.ServiceConnection
import android.os.Build
import android.os.IBinder
import com.facebook.react.bridge.*
import com.facebook.react.modules.core.DeviceEventManagerModule
import com.pomodorro.isServiceRunning

class PomoModule(reactContext: ReactApplicationContext) :
  ReactContextBaseJavaModule(reactContext) {
  override fun getName() = "PomoModule"

  // Stores bound service instance
  private lateinit var service: PomoService
  private var bound: Boolean = false

  /**
   * Defines callbacks for service binding, passed to bindService()
   */
  private val connection = object : ServiceConnection {
    override fun onServiceConnected(className: ComponentName, binder: IBinder) {
      // We've bound to PomoService, cast the IBinder and get PomoService instance
      service = (binder as PomoService.PomoBinder).getService()
      bound = true

      // observe changes in service state
      service.setObserver(observer)
      // update UI right after connection
      service.notifyUpdate()
    }

    override fun onServiceDisconnected(arg0: ComponentName) {
      bound = false
    }
  }

  /**
   * Defined observer for service tick changes, passed to service.setObserver
   */
  private val observer = object : PomoObserver {
    // internal list of observers coming from RN side
    private val observers = ArrayList<PomoObserver>()

    /**
     * Add observer to list of observers from RN
     */
    fun addObserver(observer: PomoObserver) {
      observers.add(observer)
    }

    /**
     * Remove one observer from list of RN observers
     */
    fun removeObserver() {
      if (observers.isNotEmpty()) {
        observers.removeAt(observers.lastIndex)
      }
    }

    override fun update(data: PomoData) {
      observers.forEach {
        // redirect update to each individual observer
        it.update(data)
      }
    }

  }

  /**
   * Sends JS event to UI
   */
  private fun sendEvent(reactContext: ReactContext, eventName: String, params: WritableMap?) {
    reactContext
      .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
      .emit(eventName, params)
  }

  /**
   * Exposes function to add event listener to RN side
   */
  @ReactMethod
  fun addListener(eventName: String) {
    observer.addObserver(object : PomoObserver {
      override fun update(data: PomoData) {
        sendEvent(reactApplicationContext, eventName, data.toMap())
      }
    })
  }

  /**
   * Exposes function to remove event listener to RN side
   */
  @ReactMethod
  fun removeListeners(@Suppress("UNUSED_PARAMETER") count: Int) {
    observer.removeObserver()
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
   * Exposes function to bind to PomoService
   */
  @ReactMethod
  fun bind(promise: Promise) {
    val context = reactApplicationContext

    val intent = Intent(context, PomoService::class.java)

    promise.resolve(context.bindService(intent, connection, 0))
  }

  /**
   * Exposes function to unbind from PomoService
   */
  @ReactMethod
  fun unbind(promise: Promise) {
    val context = reactApplicationContext

    context.unbindService(connection)

    promise.resolve(null)
  }

  /**
   * Exposes function to start timer.
   *
   * If service is not running - it will be created.
   *
   * If service already running - just calls play of bound service instance
   */
  @ReactMethod
  fun play(promise: Promise) {
    val context = reactApplicationContext

    val intent = Intent(context, PomoService::class.java)

    if (!isPomoServiceRunning()) {
      if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
        context.startForegroundService(intent)
      } else {
        context.startService(intent)
      }
    } else {
      service.play()
    }

    context.bindService(intent, connection, 0)

    promise.resolve(null)
  }

  /**
   * Exposes function to pause timer. Has no effect when service is not bound.
   */
  @ReactMethod
  fun pause(promise: Promise) {
    if (!bound) return

    service.pause()

    promise.resolve(null)
  }

  /**
   * Exposes function to stop timer. Has no effect when service is not bound.
   */
  @ReactMethod
  fun stop(promise: Promise) {
    if (!bound) return

    service.stop()

    promise.resolve(null)
  }

  /**
   * Exposes function to reset timer. PomoService will be stopped and connection will be unbound.
   */
  @ReactMethod
  fun reset(promise: Promise) {
    val context = reactApplicationContext

    val intent = Intent(context, PomoService::class.java)

    context.startService(intent.also {
      it.action = PomoService.ACTION_STOP_SERVICE
    })

    context.unbindService(connection)

    promise.resolve(null)
  }
}
