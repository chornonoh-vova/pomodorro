package com.pomodorro.pomo

import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.WritableMap

/**
 * Encapsulates data sent to each observer with PomoService state update
 */
data class PomoData(
  val timerRunning: Boolean,
  val currentState: PomoState,
  val currentSecond: Int,
  val currentCycleDuration: Int,
  val currentCycle: Int
) {
  /**
   * Convert PomoData instance data to RN WritableMap
   */
  fun toMap(): WritableMap = Arguments.createMap().apply {
    putBoolean("timerRunning", timerRunning)
    putString("currentState", currentState.key)
    putInt("currentSecond", currentSecond)
    putInt("currentCycle", currentCycle)
    putInt("currentCycleDuration", currentCycleDuration)
  }
}
