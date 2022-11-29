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

  private fun everyDayData(
    start: LocalDate,
    end: LocalDate,
    data: List<StatEntry>
  ): List<StatEntry> {
    val mutableData = data.toMutableList()
    val result = mutableListOf<StatEntry>()

    for (day in 0..start.daysUntil(end)) {
      val date = start.plus(day, DateTimeUnit.DAY)

      val found = mutableData.find {
        it.date.dayOfYear == date.dayOfYear
      }

      if (found != null) {
        result.add(found)

        mutableData.remove(found)
      } else {
        result.add(StatEntry(date, 0))
      }
    }

    return result
  }

  private fun everyMonthData(start: LocalDate, data: List<StatEntry>): List<StatEntry> {
    val mutableData = data.toMutableList()
    val result = mutableListOf<StatEntry>()

    for (month in 0..12) {
      val date = start.plus(month, DateTimeUnit.MONTH)

      val foundInMonth = mutableData.filter {
        it.date.month === date.month && it.date.year == date.year
      }

      var duration = 0

      foundInMonth.forEach {
        duration += it.duration

        mutableData.remove(it)
      }

      result.add(StatEntry(date, duration))
    }

    return result
  }

  @ReactMethod
  fun getWeekData(promise: Promise) {
    scope.launch {
      val weekAgo = today().minus(1, DateTimeUnit.WEEK)

      val recordedData = statDao.getAllFromDate(weekAgo)

      val wholeWeekData = everyDayData(weekAgo, today(), recordedData)

      promise.resolve(toRNArray(wholeWeekData))
    }
  }

  @ReactMethod
  fun getMonthData(promise: Promise) {
    scope.launch {
      val monthAgo = today().minus(1, DateTimeUnit.MONTH)

      val recordedData = statDao.getAllFromDate(monthAgo)

      val wholeMonthData = everyDayData(monthAgo, today(), recordedData)

      promise.resolve(toRNArray(wholeMonthData))
    }
  }

  @ReactMethod
  fun getYearData(promise: Promise) {
    scope.launch {
      val yearAgo = today().minus(1, DateTimeUnit.YEAR)

      val recordedData = statDao.getAllFromDate(yearAgo)

      val monthByMonthData = everyMonthData(yearAgo, recordedData)

      promise.resolve(toRNArray(monthByMonthData))
    }
  }
}
