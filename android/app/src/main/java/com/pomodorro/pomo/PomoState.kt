package com.pomodorro.pomo

/**
 * Pomodoro states with their string description for using in RN side
 */
enum class PomoState(val desc: String) {
  FOCUS("FOCUS"),
  SHORT_BREAK("SHORT_BREAK"),
  LONG_BREAK("LONG_BREAK")
}
