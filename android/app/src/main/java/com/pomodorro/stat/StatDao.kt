package com.pomodorro.stat

import androidx.room.*
import kotlinx.datetime.LocalDate

@Dao
interface StatDao {
  @Insert(onConflict = OnConflictStrategy.REPLACE)
  suspend fun insert(statEntry: StatEntry)

  @Update
  suspend fun update(statEntry: StatEntry)

  @Transaction
  suspend fun insertOrUpdate(date: LocalDate, duration: Int) {
    val entry = getOneByDate(date)

    if (entry == null) {
      insert(StatEntry(date, duration))
    } else {
      update(StatEntry(date, entry.duration + duration))
    }
  }

  @Query("SELECT * FROM stat_entries WHERE date = :date")
  suspend fun getOneByDate(date: LocalDate): StatEntry?

  @Query("SELECT * FROM stat_entries WHERE date >= :date")
  suspend fun getAllFromDate(date: LocalDate): List<StatEntry>
}
