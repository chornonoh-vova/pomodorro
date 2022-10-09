package com.pomodorro.stat

import androidx.room.*
import java.util.*

@Dao
interface StatDao {
  @Insert(onConflict = OnConflictStrategy.REPLACE)
  suspend fun insert(statEntry: StatEntry)

  @Update
  suspend fun update(statEntry: StatEntry)

  @Transaction
  suspend fun insertOrUpdate(date: Date, duration: Int) {
    val entry = getOneByDate(date)

    if (entry == null) {
      insert(StatEntry(date, duration))
    } else {
      update(StatEntry(date, entry.duration + duration))
    }
  }

  @Query("SELECT * FROM stat_entries WHERE date = :date")
  suspend fun getOneByDate(date: Date): StatEntry?

  @Query("SELECT * FROM stat_entries WHERE date >= :date")
  suspend fun getAllFromDate(date: Date): List<StatEntry>
}
