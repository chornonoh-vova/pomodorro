package com.pomodorro.stat

import com.facebook.react.bridge.*
import com.pomodorro.AppDatabase
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.SupervisorJob
import kotlinx.coroutines.launch
import java.text.SimpleDateFormat
import java.time.LocalDate
import java.util.*

class StatModule(reactContext: ReactApplicationContext) :
  ReactContextBaseJavaModule(reactContext) {
  private val scope = CoroutineScope(Dispatchers.IO + SupervisorJob())

  private val statDao =
    AppDatabase.getInstance(reactApplicationContext.applicationContext).statDao()

  private val format = SimpleDateFormat(
    "yyyy-MM-dd",
    Locale.getDefault(Locale.Category.FORMAT)
  )

  override fun getName() = "StatModule"

  private fun convert(data: List<StatEntry>) = Arguments.createArray().apply {
    data.forEach {
      pushMap(it.toMap())
    }
  }

  @ReactMethod
  fun getWeekData(promise: Promise) {
    scope.launch {
      val weekAgo = LocalDate.now().minusWeeks(1).atStartOfDay()

      val date = format.parse(weekAgo.toString())

      val data = statDao.getAllFromDate(date!!)

      promise.resolve(convert(data))
    }
  }

  @ReactMethod
  fun getMonthData(promise: Promise) {
    scope.launch {
      val monthAgo = LocalDate.now().minusMonths(1).atStartOfDay()

      val date = format.parse(monthAgo.toString())

      val data = statDao.getAllFromDate(date!!)

      promise.resolve(convert(data))
    }
  }

  @ReactMethod
  fun getYearData(promise: Promise) {
    scope.launch {
      val yearAgo = LocalDate.now().minusYears(1).atStartOfDay()

      val date = format.parse(yearAgo.toString())

      val data = statDao.getAllFromDate(date!!)

      promise.resolve(convert(data))
    }
  }
}
