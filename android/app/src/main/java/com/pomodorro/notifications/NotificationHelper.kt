package com.pomodorro.notifications

import android.annotation.SuppressLint
import android.app.Notification
import android.app.NotificationChannel
import android.app.NotificationManager
import android.app.PendingIntent
import android.content.Context
import android.content.Intent
import android.os.Build
import androidx.core.app.NotificationCompat
import com.pomodorro.BuildConfig
import com.pomodorro.MainActivity
import com.pomodorro.R


object NotificationHelper {
  private const val POMO_ACTIVE_CHANNEL_ID = "${BuildConfig.APPLICATION_ID}.notifications.active"
  private const val POMO_CURRENT_CHANNEL_ID = "${BuildConfig.APPLICATION_ID}.notifications.current"

  /**
   * Create notification channel with provided id
   */
  private fun createChannel(context: Context, channelId: String) {
    // Create the NotificationChannel, but only on API 26+ because
    // the NotificationChannel class is new and not in the support library
    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
      val name = context.getString(R.string.app_name)
      val descriptionText = context.getString(R.string.app_name)

      val importance = NotificationManager.IMPORTANCE_HIGH

      val channel = NotificationChannel(channelId, name, importance).apply {
        description = descriptionText
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
  @SuppressLint("UnspecifiedImmutableFlag")
  fun getPomoActiveBuilder(context: Context): NotificationCompat.Builder {
    createChannel(context, POMO_ACTIVE_CHANNEL_ID)

    val intent = Intent(context, MainActivity::class.java).apply {
      flags = Intent.FLAG_ACTIVITY_NEW_TASK or Intent.FLAG_ACTIVITY_CLEAR_TASK
    }

    val pendingIntent = if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
      PendingIntent.getActivity(context, 0, intent, PendingIntent.FLAG_IMMUTABLE)
    } else {
      PendingIntent.getActivity(context, 0, intent, 0)
    }

    return NotificationCompat.Builder(context, POMO_ACTIVE_CHANNEL_ID).apply {
      priority = NotificationCompat.PRIORITY_MAX
      setSmallIcon(R.drawable.ic_notification)
      setContentIntent(pendingIntent)
      setOnlyAlertOnce(true)
      setOngoing(true)
      setShowWhen(false)
      setWhen(0)
    }
  }

  /**
   * Get notification builder for pomo current notification
   */
  @SuppressLint("UnspecifiedImmutableFlag")
  fun getPomoCurrentBuilder(context: Context): NotificationCompat.Builder {
    createChannel(context, POMO_CURRENT_CHANNEL_ID)

    val intent = Intent(context, MainActivity::class.java).apply {
      flags = Intent.FLAG_ACTIVITY_NEW_TASK or Intent.FLAG_ACTIVITY_CLEAR_TASK
    }

    val pendingIntent = if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
      PendingIntent.getActivity(context, 0, intent, PendingIntent.FLAG_IMMUTABLE)
    } else {
      PendingIntent.getActivity(context, 0, intent, 0)
    }

    return NotificationCompat.Builder(context, POMO_CURRENT_CHANNEL_ID).apply {
      priority = NotificationCompat.PRIORITY_MAX
      setDefaults(Notification.DEFAULT_SOUND or Notification.DEFAULT_VIBRATE)
      setSmallIcon(R.drawable.ic_notification)
      setContentIntent(pendingIntent)
      setTimeoutAfter(5000)
      setSilent(false)
      setAutoCancel(true)
    }
  }
}
