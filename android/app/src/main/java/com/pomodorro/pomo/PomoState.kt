package com.pomodorro.pomo

/**
 * Pomodoro states with their string description for using in RN side
 */
sealed class PomoState(val key: String, val shortDescription: String, val longDescription: String) {
  object Focus : PomoState("FOCUS", "Focus", "Time to focus!")
  object ShortBreak : PomoState("SHORT_BREAK", "Short break", "Time for a short break!")
  object LongBreak : PomoState("LONG_BREAK", "Long break", "Time for a long break!")
}
