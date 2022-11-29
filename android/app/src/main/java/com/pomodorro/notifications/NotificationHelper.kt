package com.pomodorro.notifications

import android.app.NotificationChannel
import android.app.NotificationManager
import android.app.PendingIntent
import android.content.Context
import android.content.Intent
import android.media.AudioAttributes
import com.pomodorro.BuildConfig
import com.pomodorro.MainActivity
import com.pomodorro.pomo.PomoService
import com.pomodorro.pomo.PomoState
import com.pomodorro.settings.Settings
import android.provider.Settings as AndroidSettings


object NotificationHelper {
  const val POMO_ACTIVE_CHANNEL_ID = "${BuildConfig.APPLICATION_ID}.notifications.active"
  const val POMO_CURRENT_CHANNEL_ID = "${BuildConfig.APPLICATION_ID}.notifications.current"

  /**
   * Create [PendingIntent] for notifications (it'll open [MainActivity])
   */
  fun getContentIntent(context: Context): PendingIntent {
    val intent = Intent(context, MainActivity::class.java).apply {
      flags = Intent.FLAG_ACTIVITY_NEW_TASK or Intent.FLAG_ACTIVITY_CLEAR_TASK
    }

    return PendingIntent.getActivity(context, 0, intent, PendingIntent.FLAG_IMMUTABLE)
  }

  /**
   * Create notification channel with provided id
   */
  fun createChannel(
    context: Context,
    channelId: String,
    name: String,
    descriptionText: String
  ) {
    val importance = NotificationManager.IMPORTANCE_HIGH

    val audioAttributes = AudioAttributes.Builder()
      .setContentType(AudioAttributes.CONTENT_TYPE_UNKNOWN)
      .setUsage(AudioAttributes.USAGE_NOTIFICATION)
      .build()

    val channel = NotificationChannel(channelId, name, importance).apply {
      description = descriptionText
      setSound(AndroidSettings.System.DEFAULT_NOTIFICATION_URI, audioAttributes)
      enableLights(true)
      enableVibration(true)
    }

    // Register the channel with the system
    val notificationManager =
      context.getSystemService(Context.NOTIFICATION_SERVICE) as NotificationManager
    notificationManager.createNotificationChannel(channel)
  }

  /**
   * Helper for getting pending intents for notification actions
   */
  fun buildPendingAction(context: Context, actionToPerform: String): PendingIntent {
    val intent = Intent(context, PomoService::class.java).apply {
      action = actionToPerform
    }

    return PendingIntent.getService(context, 0, intent, PendingIntent.FLAG_IMMUTABLE)
  }

  fun getContentTitle(settings: Settings, state: PomoState, cycle: Int): String {
    return "${state.shortDescription} $cycle/${settings.cycleCount}"
  }
}
