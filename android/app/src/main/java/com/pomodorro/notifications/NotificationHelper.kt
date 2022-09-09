package com.pomodorro.notifications

import android.app.Notification
import android.app.NotificationChannel
import android.app.NotificationManager
import android.app.PendingIntent
import android.content.Context
import android.content.Intent
import android.media.AudioAttributes
import android.os.Build
import android.provider.Settings
import androidx.core.app.NotificationCompat
import com.pomodorro.BuildConfig
import com.pomodorro.MainActivity
import com.pomodorro.R


object NotificationHelper {
  private const val POMO_ACTIVE_CHANNEL_ID = "${BuildConfig.APPLICATION_ID}.notifications.active"
  private const val POMO_CURRENT_CHANNEL_ID = "${BuildConfig.APPLICATION_ID}.notifications.current"

  /**
   * Create [PendingIntent] for notifications (it'll open [MainActivity])
   */
  private fun getContentIntent(context: Context): PendingIntent {
    val intent = Intent(context, MainActivity::class.java).apply {
      flags = Intent.FLAG_ACTIVITY_NEW_TASK or Intent.FLAG_ACTIVITY_CLEAR_TASK
    }

    return PendingIntent.getActivity(context, 0, intent, PendingIntent.FLAG_IMMUTABLE)
  }

  /**
   * Create notification channel with provided id
   */
  private fun createChannel(
    context: Context,
    channelId: String,
    name: String,
    descriptionText: String
  ) {
    // Create the NotificationChannel, but only on API 26+ because
    // the NotificationChannel class is new and not in the support library
    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
      val importance = NotificationManager.IMPORTANCE_HIGH

      val audioAttributes = AudioAttributes.Builder()
        .setContentType(AudioAttributes.CONTENT_TYPE_UNKNOWN)
        .setUsage(AudioAttributes.USAGE_NOTIFICATION)
        .build()

      val channel = NotificationChannel(channelId, name, importance).apply {
        description = descriptionText
        setSound(Settings.System.DEFAULT_NOTIFICATION_URI, audioAttributes)
        enableLights(true)
        enableVibration(true)
      }

      // Register the channel with the system
      val notificationManager =
        context.getSystemService(Context.NOTIFICATION_SERVICE) as NotificationManager
      notificationManager.createNotificationChannel(channel)
    }
  }

  /**
   * Get notification builder for pomo active notification
   */
  fun getPomoActiveBuilder(context: Context): NotificationCompat.Builder {
    createChannel(
      context,
      POMO_ACTIVE_CHANNEL_ID,
      "Pomodorro active",
      "Notification displayed when pomodorro is started"
    )

    return NotificationCompat.Builder(context, POMO_ACTIVE_CHANNEL_ID).apply {
      priority = NotificationCompat.PRIORITY_MAX
      setSmallIcon(R.drawable.ic_notification)
      setContentIntent(getContentIntent(context))
      setOnlyAlertOnce(true)
      setOngoing(true)
      setShowWhen(false)
      setWhen(0)
    }
  }

  /**
   * Get notification builder for pomo current notification
   */
  fun getPomoCurrentBuilder(context: Context): NotificationCompat.Builder {
    createChannel(
      context,
      POMO_CURRENT_CHANNEL_ID,
      "Pomodorro current",
      "Notification displayed when current focus/break ended, and it's time to start next one"
    )

    return NotificationCompat.Builder(context, POMO_CURRENT_CHANNEL_ID).apply {
      priority = NotificationCompat.PRIORITY_MAX
      setDefaults(Notification.DEFAULT_ALL)
      setSmallIcon(R.drawable.ic_notification)
      setContentIntent(getContentIntent(context))
      setWhen(System.currentTimeMillis())
      setSilent(false)
      setAutoCancel(true)
    }
  }
}
