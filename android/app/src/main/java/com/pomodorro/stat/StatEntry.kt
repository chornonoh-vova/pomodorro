package com.pomodorro.stat

import androidx.room.Entity
import androidx.room.PrimaryKey
import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.WritableMap
import java.util.*

@Entity(tableName = "stat_entries")
data class StatEntry(
  @PrimaryKey val date: Date,
  val duration: Int
) {
  fun toMap(): WritableMap = Arguments.createMap().apply {
    putString("date", date.toString())
    putInt("duration", duration)
  }
}
