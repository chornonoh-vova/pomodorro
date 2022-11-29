package com.pomodorro.pomo

import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Job
import kotlinx.coroutines.delay
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.FlowCollector
import kotlinx.coroutines.flow.cancellable
import kotlinx.coroutines.flow.flow
import kotlinx.coroutines.launch
import kotlin.time.Duration.Companion.seconds

class Timer(private val scope: CoroutineScope) {
  private val period = 1.seconds

  private fun tickerFlow(): Flow<Int> = flow {
    // immediately emit current second right after starting
    emit(currentSecond)

    while (true) {
      delay(period)
      currentSecond++
      emit(currentSecond)
    }
  }

  private lateinit var job: Job

  var currentSecond = 0

  fun isRunning() = this::job.isInitialized && !job.isCancelled

  fun play(collector: FlowCollector<Int>) {
    job = scope.launch {
      tickerFlow().cancellable().collect(collector)
    }
  }

  fun pause() {
    job.cancel()
  }

  fun stop() {
    job.cancel()

    currentSecond = 0
  }
}
