package com.pomodorro.stat

import com.facebook.react.bridge.*
import com.pomodorro.AppDatabase
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.SupervisorJob
import kotlinx.coroutines.launch
import kotlinx.datetime.*

class StatModule(reactContext: ReactApplicationContext) :
  ReactContextBaseJavaModule(reactContext) {
  private val scope = CoroutineScope(Dispatchers.IO + SupervisorJob())

  private val statDao =
    AppDatabase.getInstance(reactApplicationContext.applicationContext).statDao()

  override fun getName() = "StatModule"

  private fun today() = Clock.System.todayIn(TimeZone.currentSystemDefault())

  private fun toRNArray(data: List<StatEntry>) = Arguments.createArray().apply {
    data.forEach {
      pushMap(it.toMap())
    }
  }

  @ReactMethod
  fun getWeekData(promise: Promise) {
    scope.launch {
      val weekAgo = today().minus(1, DateTimeUnit.WEEK)

      val data = statDao.getAllFromDate(weekAgo)

      promise.resolve(toRNArray(data))
    }
  }

  @ReactMethod
  fun getMonthData(promise: Promise) {
    scope.launch {
      val monthAgo = today().minus(1, DateTimeUnit.MONTH)

      val data = statDao.getAllFromDate(monthAgo)

      promise.resolve(toRNArray(data))
    }
  }

  @ReactMethod
  fun getYearData(promise: Promise) {
    scope.launch {
      val yearAgo = today().minus(1, DateTimeUnit.YEAR)

      val data = statDao.getAllFromDate(yearAgo)

      promise.resolve(toRNArray(data))
    }
  }
}
