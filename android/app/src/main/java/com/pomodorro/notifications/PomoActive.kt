package com.pomodorro.notifications

import android.app.Notification
import android.content.Context
import androidx.core.app.NotificationCompat
import androidx.core.app.NotificationManagerCompat
import com.pomodorro.R
import com.pomodorro.pomo.PomoService
import com.pomodorro.pomo.PomoState
import com.pomodorro.pomo.Timer
import com.pomodorro.settings.Settings

class PomoActive {
  private val settings = Settings()

  val id = 1

  /**
   * Get notification builder for pomo active notification
   */
  private fun builder(context: Context): NotificationCompat.Builder {
    NotificationHelper.createChannel(
      context,
      NotificationHelper.POMO_ACTIVE_CHANNEL_ID,
      "Pomodorro active",
      "Notification displayed when pomodorro is started"
    )

    return NotificationCompat.Builder(context, NotificationHelper.POMO_ACTIVE_CHANNEL_ID).apply {
      priority = NotificationCompat.PRIORITY_MAX
      setSmallIcon(R.drawable.ic_notification)
      setContentIntent(NotificationHelper.getContentIntent(context))
      setOnlyAlertOnce(true)
      setOngoing(true)
      setShowWhen(false)
      setWhen(0)
    }
  }

  private fun getContentText(timer: Timer, cycleDuration: Int): String {
    val second = cycleDuration - timer.currentSecond

    val min = (second / 60).toString().padStart(2, '0')
    val sec = (second % 60).toString().padStart(2, '0')

    return "$min:$sec"
  }

  fun build(
    context: Context,
    timer: Timer,
    state: PomoState,
    cycle: Int,
    cycleDuration: Int
  ): Notification {
    return builder(context).run {
      setContentTitle(NotificationHelper.getContentTitle(settings, state, cycle))
      setContentText(getContentText(timer, cycleDuration))

      if (timer.isRunning()) {
        addAction(
          R.drawable.pause, "Pause", NotificationHelper.buildPendingAction(
            context,
            PomoService.ACTION_PAUSE
          )
        )
      } else {
        addAction(
          R.drawable.play, "Continue", NotificationHelper.buildPendingAction(
            context,
            PomoService.ACTION_PLAY
          )
        )
      }

      addAction(
        R.drawable.stop, "Stop", NotificationHelper.buildPendingAction(
          context,
          PomoService.ACTION_STOP
        )
      )

      build()
    }
  }

  fun notify(context: Context, timer: Timer, state: PomoState, cycle: Int, cycleDuration: Int) {
    with(NotificationManagerCompat.from(context)) {
      notify(id, build(context, timer, state, cycle, cycleDuration))
    }
  }
}