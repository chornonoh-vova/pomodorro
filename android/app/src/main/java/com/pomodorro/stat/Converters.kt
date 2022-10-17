package com.pomodorro.stat

import androidx.room.TypeConverter
import kotlinx.datetime.LocalDate
import kotlinx.datetime.toLocalDate

class Converters {
  @TypeConverter
  fun fromDateString(value: String?): LocalDate? {
    return value?.toLocalDate()
  }

  @TypeConverter
  fun dateToDateString(date: LocalDate?): String? {
    return date?.toString()
  }
}
