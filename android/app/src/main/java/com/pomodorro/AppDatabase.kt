package com.pomodorro

import android.content.Context
import androidx.room.Database
import androidx.room.Room
import androidx.room.RoomDatabase
import androidx.room.TypeConverters
import com.pomodorro.stat.Converters
import com.pomodorro.stat.StatDao
import com.pomodorro.stat.StatEntry

@Database(entities = [StatEntry::class], version = 1)
@TypeConverters(Converters::class)
abstract class AppDatabase : RoomDatabase() {
  abstract fun statDao(): StatDao

  companion object {
    private var instance: AppDatabase? = null

    fun getInstance(context: Context): AppDatabase {
      if (instance == null) {
        instance = Room.databaseBuilder(context, AppDatabase::class.java, "app-database")
          .enableMultiInstanceInvalidation().build()
      }

      return instance!!
    }
  }
}
