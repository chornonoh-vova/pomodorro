package com.pomodorro.notifications

import android.app.Notification
import android.content.Context
import androidx.core.app.NotificationCompat
import androidx.core.app.NotificationManagerCompat
import com.pomodorro.R
import com.pomodorro.pomo.PomoState
import com.pomodorro.settings.Settings

class PomoCurrent {
  private val settings = Settings()

  private val id = 1

  /**
   * Get notification builder for pomo current notification
   */
  private fun builder(context: Context): NotificationCompat.Builder {
    NotificationHelper.createChannel(
      context,
      NotificationHelper.POMO_CURRENT_CHANNEL_ID,
      "Pomodorro current",
      "Notification displayed when current focus/break ended, and it's time to start next one"
    )

    return NotificationCompat.Builder(context, NotificationHelper.POMO_CURRENT_CHANNEL_ID).apply {
      priority = NotificationCompat.PRIORITY_MAX
      setDefaults(Notification.DEFAULT_ALL)
      setSmallIcon(R.drawable.ic_notification)
      setContentIntent(NotificationHelper.getContentIntent(context))
      setWhen(System.currentTimeMillis())
      setSilent(false)
      setAutoCancel(true)
    }
  }

  /**
   * Build current pomo notification
   */
  private fun build(context: Context, state: PomoState, cycle: Int): Notification {
    return builder(context).run {
      setContentTitle(NotificationHelper.getContentTitle(settings, state, cycle))
      setContentText(state.longDescription)

      if (settings.autoStart) {
        setTimeoutAfter(10000)
      }

      build()
    }
  }

  fun notify(context: Context, state: PomoState, cycle: Int) {
    with(NotificationManagerCompat.from(context)) {
      notify(id, build(context, state, cycle))
    }
  }

  fun cancel(context: Context) {
    NotificationManagerCompat.from(context).run {
      cancel(id)
    }
  }
}