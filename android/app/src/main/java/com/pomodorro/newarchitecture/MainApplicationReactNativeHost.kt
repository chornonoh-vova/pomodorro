package com.pomodorro.newarchitecture

import android.app.Application
import com.facebook.react.PackageList
import com.facebook.react.ReactNativeHost
import com.facebook.react.ReactPackage
import com.facebook.react.bridge.*
import com.facebook.react.fabric.ComponentFactory
import com.facebook.react.fabric.CoreComponentsRegistry
import com.facebook.react.fabric.FabricJSIModuleProvider
import com.facebook.react.fabric.ReactNativeConfig
import com.facebook.react.uimanager.ViewManagerRegistry
import com.pomodorro.BuildConfig
import com.pomodorro.newarchitecture.components.MainComponentsRegistry
import com.pomodorro.newarchitecture.modules.MainApplicationTurboModuleManagerDelegate
import com.pomodorro.pomo.PomoPackage
import com.pomodorro.settings.SettingsPackage
import com.pomodorro.stat.StatPackage

/**
 * A [ReactNativeHost] that helps you load everything needed for the New Architecture, both
 * TurboModule delegates and the Fabric Renderer.
 *
 *
 * Please note that this class is used ONLY if you opt-in for the New Architecture (see the
 * `newArchEnabled` property). Is ignored otherwise.
 */
class MainApplicationReactNativeHost(application: Application?) : ReactNativeHost(application) {
  override fun getUseDeveloperSupport() = BuildConfig.DEBUG

  override fun getPackages(): List<ReactPackage> = PackageList(this).packages.apply {
    // Packages that cannot be autolinked yet can be added manually here, for example:
    // add(MyReactNativePackage());
    // add settings package
    add(SettingsPackage())
    // add pomo package
    add(PomoPackage())
    // add stat package
    add(StatPackage())
    // TurboModules must also be loaded here providing a valid TurboReactPackage implementation:
    // add(object : TurboReactPackage() { ... });
    // If you have custom Fabric Components, their ViewManagers should also be loaded here
    // inside a ReactPackage.
  }

  override fun getJSMainModuleName() = "index"

  // Here we provide the ReactPackageTurboModuleManagerDelegate Builder. This is necessary
  // for the new architecture and to use TurboModules correctly.
  override fun getReactPackageTurboModuleManagerDelegateBuilder() =
    MainApplicationTurboModuleManagerDelegate.Builder()

  override fun getJSIModulePackage(): JSIModulePackage {
    return JSIModulePackage { reactApplicationContext: ReactApplicationContext?, _: JavaScriptContextHolder? ->
      val specs: MutableList<JSIModuleSpec<*>> = ArrayList()

      // Here we provide a new JSIModuleSpec that will be responsible of providing the
      // custom Fabric Components.
      specs.add(
        object : JSIModuleSpec<UIManager> {
          override fun getJSIModuleType(): JSIModuleType {
            return JSIModuleType.UIManager
          }

          override fun getJSIModuleProvider(): JSIModuleProvider<UIManager> {
            val componentFactory = ComponentFactory()
            CoreComponentsRegistry.register(componentFactory)

            // Here we register a Components Registry.
            // The one that is generated with the template contains no components
            // and just provides you the one from React Native core.
            MainComponentsRegistry.register(componentFactory)

            val reactInstanceManager = reactInstanceManager

            val viewManagerRegistry = ViewManagerRegistry(
              reactInstanceManager.getOrCreateViewManagers(reactApplicationContext)
            )

            return FabricJSIModuleProvider(
              reactApplicationContext!!,
              componentFactory,
              ReactNativeConfig.DEFAULT_CONFIG,
              viewManagerRegistry
            )
          }
        })

      specs
    }
  }
}