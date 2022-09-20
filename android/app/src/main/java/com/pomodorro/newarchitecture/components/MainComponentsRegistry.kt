package com.pomodorro.newarchitecture.components

import com.facebook.jni.HybridData
import com.facebook.proguard.annotations.DoNotStrip
import com.facebook.react.fabric.ComponentFactory
import com.facebook.soloader.SoLoader

/**
 * Class responsible to load the custom Fabric Components. This class has native methods and needs a
 * corresponding C++ implementation/header file to work correctly (already placed inside the jni/
 * folder for you).
 *
 *
 * Please note that this class is used ONLY if you opt-in for the New Architecture (see the
 * `newArchEnabled` property). Is ignored otherwise.
 */
@DoNotStrip
class MainComponentsRegistry @DoNotStrip private constructor(componentFactory: ComponentFactory) {
  @DoNotStrip
  private val mHybridData: HybridData

  init {
    mHybridData = initHybrid(componentFactory)
  }

  @DoNotStrip
  private external fun initHybrid(componentFactory: ComponentFactory): HybridData

  companion object {
    init {
      SoLoader.loadLibrary("fabricjni")
    }

    @JvmStatic
    @DoNotStrip
    fun register(componentFactory: ComponentFactory): MainComponentsRegistry {
      return MainComponentsRegistry(componentFactory)
    }
  }
}