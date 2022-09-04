package com.pomodorro.pomo

/**
 * Interface that defines observers of PomoService state
 */
interface PomoObserver {
  fun update(data: PomoData)
}
