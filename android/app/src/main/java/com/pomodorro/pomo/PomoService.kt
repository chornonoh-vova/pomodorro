package com.pomodorro.pomo

import android.app.Notification
import android.app.PendingIntent
import android.app.Service
import android.content.Intent
import android.os.Binder
import androidx.core.app.NotificationManagerCompat
import com.pomodorro.AppDatabase
import com.pomodorro.BuildConfig
import com.pomodorro.R
import com.pomodorro.notifications.NotificationHelper
import com.pomodorro.settings.Settings
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.SupervisorJob
import kotlinx.coroutines.launch
import kotlinx.datetime.Clock
import kotlinx.datetime.TimeZone
import kotlinx.datetime.todayIn
import java.util.*

class PomoService : Service() {
  private var observer: PomoObserver? = null

  private val settings = Settings()

  private val scope = CoroutineScope(Dispatchers.IO + SupervisorJob())

  private val statDao by lazy {
    AppDatabase.getInstance(applicationContext).statDao()
  }

  private var pomoActiveId = UUID.randomUUID().hashCode()
  private var pomoCurrentId = UUID.randomUUID().hashCode()

  private var timer: Timer? = null

  private fun isTimerRunning() = timer != null

  private val binder = PomoBinder()

  inner class PomoBinder : Binder() {
    fun getService() = this@PomoService
  }

  override fun onBind(intent: Intent?) = binder

  override fun onStartCommand(intent: Intent?, flags: Int, startId: Int): Int {
    if (intent?.action != null) {
      when (intent.action) {
        // notification actions
        ACTION_PAUSE -> {
          pause()
        }
        ACTION_PLAY -> {
          play()
        }
        ACTION_STOP -> {
          stop()
        }

        // stop service action on reset
        ACTION_STOP_SERVICE -> {
          reset()

          // remove notifications
          stopForeground(STOP_FOREGROUND_REMOVE)
          pomoCurrentCancel()

          // stop service
          stopSelf()
        }
      }
    } else {
      startForeground(pomoActiveId, buildPomoActive())
      play()
    }

    return START_STICKY
  }

  fun setObserver(pomoObserver: PomoObserver) {
    observer = pomoObserver
  }

  fun notifyUpdate() {
    observer?.update(
      PomoData(
        isTimerRunning(),
        currentState,
        currentSecond,
        getCurrentCycleDuration(),
        currentCycle
      )
    )
  }

  private var currentStatSecond = 0

  private fun recordCurrentStat() {
    if (currentStatSecond == 0) return

    scope.launch {
      val today = Clock.System.todayIn(TimeZone.currentSystemDefault())

      statDao.insertOrUpdate(today, currentStatSecond)

      currentStatSecond = 0
    }
  }

  private var currentState = PomoState.FOCUS
  private var currentSecond = 0
  private var currentCycle = 1

  private fun getCurrentCycleDuration(): Int {
    return when (currentState) {
      PomoState.FOCUS -> settings.focusDuration
      PomoState.SHORT_BREAK -> settings.shortBreakDuration
      PomoState.LONG_BREAK -> settings.longBreakDuration
    }
  }

  private fun getPomoActiveTitle(): String {
    return "${currentState.shortDescription} $currentCycle/${settings.cycleCount}"
  }

  private fun getPomoActiveText(): String {
    val second = getCurrentCycleDuration() - currentSecond

    val min = (second / 60).toString().padStart(2, '0')
    val sec = (second % 60).toString().padStart(2, '0')

    return "$min:$sec"
  }

  /**
   * Helper for getting pending intents for notification actions
   */
  private fun buildPendingAction(actionToPerform: String): PendingIntent {
    val intent = Intent(this, PomoService::class.java).apply {
      action = actionToPerform
    }

    return PendingIntent.getService(this, 0, intent, PendingIntent.FLAG_IMMUTABLE)
  }

  /**
   * Build active/ongoing pomo notification
   */
  private fun buildPomoActive(): Notification {
    return NotificationHelper.getPomoActiveBuilder(this).run {
      setContentTitle(getPomoActiveTitle())
      setContentText(getPomoActiveText())

      if (isTimerRunning()) {
        addAction(R.drawable.pause, "Pause", buildPendingAction(ACTION_PAUSE))
      } else {
        addAction(R.drawable.play, "Continue", buildPendingAction(ACTION_PLAY))
      }

      addAction(R.drawable.stop, "Stop", buildPendingAction(ACTION_STOP))

      build()
    }
  }

  /**
   * Build current pomo notification
   */
  private fun buildPomoCurrent(): Notification {
    return NotificationHelper.getPomoCurrentBuilder(this).run {
      setContentTitle(getPomoActiveTitle())
      setContentText(currentState.longDescription)

      if (settings.autoStart) {
        setTimeoutAfter(10000)
      }

      build()
    }
  }

  /**
   * Notify active/ongoing pomo notification
   */
  private fun pomoActiveNotify() {
    with(NotificationManagerCompat.from(this)) {
      notify(pomoActiveId, buildPomoActive())
    }

    // notify clients about update
    notifyUpdate()
  }

  /**
   * Notify current pomo notification
   */
  private fun pomoCurrentNotify() {
    with(NotificationManagerCompat.from(this)) {
      notify(pomoCurrentId, buildPomoCurrent())
    }
  }

  /**
   * Cancel current pomo notification
   */
  private fun pomoCurrentCancel() {
    NotificationManagerCompat.from(this).run {
      cancel(pomoCurrentId)
    }
  }

  /**
   * Transition to next state:
   *
   * FOCUS will transition either to SHORT_BREAK or LONG_BREAK (according to currentCycle)
   * SHORT_BREAK will transition to FOCUS, and currentCycle will be incremented
   * LONG_BREAK will transition to FOCUS, but currentCycle will be reset
   */
  private fun transitionToNextState() {
    when (currentState) {
      PomoState.FOCUS -> {
        currentState = if (currentCycle < settings.cycleCount) {
          PomoState.SHORT_BREAK
        } else {
          PomoState.LONG_BREAK
        }

        recordCurrentStat()
      }
      PomoState.SHORT_BREAK -> {
        currentState = PomoState.FOCUS
        currentCycle += 1
      }
      PomoState.LONG_BREAK -> {
        currentState = PomoState.FOCUS
        currentCycle = 1
      }
    }

    currentSecond = 0
  }

  /**
   * Create timer and schedule every second update of state
   */
  fun play() {
    if (isTimerRunning()) return

    timer = Timer()
    timer?.scheduleAtFixedRate(object : TimerTask() {
      override fun run() {
        if (currentSecond < getCurrentCycleDuration()) {
          currentSecond += 1

          if (currentState == PomoState.FOCUS) {
            currentStatSecond += 1
          }

          pomoActiveNotify()
        } else {
          transitionToNextState()

          pomoCurrentNotify()

          if (!settings.autoStart) {
            pause()
          } else {
            pomoActiveNotify()
          }
        }
      }
    }, 0, 1000)
  }

  /**
   * Cancel running timer
   */
  fun pause() {
    if (isTimerRunning()) {
      timer?.cancel()
      timer = null
    }

    recordCurrentStat()
    pomoActiveNotify()
  }

  /**
   * Cancel running timer but reset current cycle second to 0
   */
  fun stop() {
    if (isTimerRunning()) {
      timer?.cancel()
      timer = null
    }

    // reset current cycle second to 0
    currentSecond = 0

    recordCurrentStat()
    pomoActiveNotify()
  }

  /**
   * Reset timer to initial state
   */
  private fun reset() {
    if (isTimerRunning()) {
      timer?.cancel()
      timer = null
    }

    // reset everything to start values
    currentState = PomoState.FOCUS
    currentSecond = 0
    currentCycle = 1

    recordCurrentStat()
    pomoActiveNotify()
  }

  companion object {
    private const val ACTION_STOP = "${BuildConfig.APPLICATION_ID}.pomo.stop"
    private const val ACTION_PLAY = "${BuildConfig.APPLICATION_ID}.pomo.play"
    private const val ACTION_PAUSE = "${BuildConfig.APPLICATION_ID}.pomo.pause"

    const val ACTION_STOP_SERVICE = "${BuildConfig.APPLICATION_ID}.pomo.stop_service"
  }
}
