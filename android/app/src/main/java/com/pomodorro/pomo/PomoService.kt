package com.pomodorro.pomo

import android.app.Service
import android.content.Intent
import android.os.IBinder
import com.pomodorro.AppDatabase
import com.pomodorro.BuildConfig
import com.pomodorro.notifications.PomoActive
import com.pomodorro.notifications.PomoCurrent
import com.pomodorro.settings.Settings
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.SupervisorJob
import kotlinx.coroutines.launch
import kotlinx.datetime.Clock
import kotlinx.datetime.TimeZone
import kotlinx.datetime.todayIn

class PomoService : Service() {
  private val settings = Settings()

  private val scope = CoroutineScope(Dispatchers.IO + SupervisorJob())

  private val statDao by lazy {
    AppDatabase.getInstance(applicationContext).statDao()
  }

  private val timer = Timer(scope)

  private val pomoActive = PomoActive()
  private val pomoCurrent = PomoCurrent()

  override fun onStartCommand(intent: Intent?, flags: Int, startId: Int): Int {
    if (intent?.action != null) {
      when (intent.action) {
        ACTION_PLAY -> play()
        ACTION_PAUSE -> pause()
        ACTION_RESET -> reset()
        ACTION_STOP -> stop()
      }
    }

    return START_STICKY
  }

  override fun onBind(intent: Intent?): IBinder? {
    return null
  }

  private fun notifyUpdate() {
    val intent = Intent().apply {
      action = ACTION_UPDATE

      putExtra(EXTRA_RUNNING, timer.isRunning())
      putExtra(EXTRA_CURRENT_SECOND, timer.currentSecond)
      putExtra(EXTRA_CURRENT_STATE, currentState.key)
      putExtra(EXTRA_CURRENT_CYCLE, currentCycle)
      putExtra(EXTRA_CURRENT_CYCLE_DURATION, getCurrentCycleDuration())
    }

    sendBroadcast(intent)
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

  private var currentState: PomoState = PomoState.Focus
  private var currentCycle = 1

  private fun getCurrentCycleDuration(): Int {
    return when (currentState) {
      PomoState.Focus -> settings.focusDuration
      PomoState.ShortBreak -> settings.shortBreakDuration
      PomoState.LongBreak -> settings.longBreakDuration
    }
  }

  /**
   * Notify active/ongoing pomo notification
   */
  private fun pomoActiveNotify() {
    pomoActive.notify(this, timer, currentState, currentCycle, getCurrentCycleDuration())

    // notify clients about update
    notifyUpdate()
  }

  /**
   * Notify current pomo notification
   */
  private fun pomoCurrentNotify() {
    pomoCurrent.notify(this, currentState, currentCycle)

    // notify clients about update
    notifyUpdate()
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
      PomoState.Focus -> {
        currentState = if (currentCycle < settings.cycleCount) {
          PomoState.ShortBreak
        } else {
          PomoState.LongBreak
        }

        recordCurrentStat()
      }
      PomoState.ShortBreak -> {
        currentState = PomoState.Focus
        currentCycle += 1
      }
      PomoState.LongBreak -> {
        currentState = PomoState.Focus
        currentCycle = 1
      }
    }

    timer.currentSecond = 0
  }

  /**
   * Create timer and schedule every second update of state
   */
  private fun play() {
    timer.play { currentSecond ->
      if (currentSecond < getCurrentCycleDuration()) {
        if (currentState == PomoState.Focus) {
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

    startForeground(
      pomoActive.id,
      pomoActive.build(this, timer, currentState, currentCycle, getCurrentCycleDuration())
    )
  }

  /**
   * Cancel running timer
   */
  private fun pause() {
    timer.pause()

    recordCurrentStat()
    pomoActiveNotify()
  }

  /**
   * Cancel running timer but reset current cycle second to 0
   */
  private fun reset() {
    timer.stop()

    recordCurrentStat()
    pomoActiveNotify()
  }

  /**
   * Reset timer to initial state
   */
  private fun stop() {
    timer.stop()

    // reset everything to start values
    currentState = PomoState.Focus
    currentCycle = 1

    recordCurrentStat()
    notifyUpdate()

    // remove notifications
    stopForeground(STOP_FOREGROUND_REMOVE)
    pomoCurrent.cancel(this)

    // stop service
    stopSelf()
  }

  companion object {
    const val ACTION_PLAY = "${BuildConfig.APPLICATION_ID}.pomo.play"
    const val ACTION_PAUSE = "${BuildConfig.APPLICATION_ID}.pomo.pause"
    const val ACTION_STOP = "${BuildConfig.APPLICATION_ID}.pomo.stop"
    const val ACTION_RESET = "${BuildConfig.APPLICATION_ID}.pomo.reset"

    const val ACTION_UPDATE = "${BuildConfig.APPLICATION_ID}.pomo.update"

    const val EXTRA_RUNNING = "${BuildConfig.APPLICATION_ID}.pomo.update.extras.running"
    const val EXTRA_CURRENT_STATE = "${BuildConfig.APPLICATION_ID}.pomo.update.extras.current_state"
    const val EXTRA_CURRENT_SECOND =
      "${BuildConfig.APPLICATION_ID}.pomo.update.extras.current_second"
    const val EXTRA_CURRENT_CYCLE = "${BuildConfig.APPLICATION_ID}.pomo.update.extras.current_cycle"
    const val EXTRA_CURRENT_CYCLE_DURATION =
      "${BuildConfig.APPLICATION_ID}.pomo.update.extras.current_cycle_duration"
  }
}
