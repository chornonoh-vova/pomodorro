package com.pomodorro

import android.os.Bundle
import com.facebook.react.ReactActivity
import com.facebook.react.ReactActivityDelegate
import com.facebook.react.ReactRootView

class MainActivity : ReactActivity() {
  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  override fun getMainComponentName() = "Pomodorro"

  /**
   * Returns the instance of the [ReactActivityDelegate]. There the RootView is created and
   * you can specify the renderer you wish to use - the new renderer (Fabric) or the old renderer
   * (Paper).
   */
  override fun createReactActivityDelegate() = MainActivityDelegate(this, mainComponentName)

  override fun onCreate(savedInstanceState: Bundle?) {
    super.onCreate(null);
  }

  class MainActivityDelegate(activity: ReactActivity?, mainComponentName: String?) :
    ReactActivityDelegate(activity, mainComponentName) {
    // If you opted-in for the New Architecture, we enable the Fabric Renderer.
    override fun createRootView() = ReactRootView(context).apply {
      setIsFabric(BuildConfig.IS_NEW_ARCHITECTURE_ENABLED)
    }

    // If you opted-in for the New Architecture, we enable Concurrent Root (i.e. React 18).
    // More on this on https://reactjs.org/blog/2022/03/29/react-v18.html
    override fun isConcurrentRootEnabled() = BuildConfig.IS_NEW_ARCHITECTURE_ENABLED
  }
}
