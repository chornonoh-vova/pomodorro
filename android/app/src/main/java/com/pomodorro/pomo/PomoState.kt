package com.pomodorro.pomo

/**
 * Pomodoro states with their string description for using in RN side
 */
enum class PomoState(val key: String, val shortDescription: String, val longDescription: String) {
  FOCUS("FOCUS", "Focus", "Time to focus!"),
  SHORT_BREAK("SHORT_BREAK", "Short break", "Time for a short break!"),
  LONG_BREAK("LONG_BREAK", "Long break", "Time for a long break!")
}
