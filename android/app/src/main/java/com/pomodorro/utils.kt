package com.pomodorro

import android.app.ActivityManager
import android.content.Context

/**
 * Find out if service is running by getting running services from activity manager.
 * This method is deprecated for third-party services, but we'll be looking for local service anyway
 */
@Suppress("DEPRECATION")
fun <T> Context.isServiceRunning(service: Class<T>) =
  (getSystemService(Context.ACTIVITY_SERVICE) as ActivityManager)
    .getRunningServices(Integer.MAX_VALUE)
    .any { it.service.className == service.name }
