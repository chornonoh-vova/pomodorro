import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import MainScreen from './screens/Main';
import AboutScreen from './screens/About';
import SettingsScreen from './screens/Settings';

import { RootStackParamList } from './navigation';

import { name as appName } from '../app.json';

const RootStack = createNativeStackNavigator<RootStackParamList>();

const App = () => {
  return (
    <NavigationContainer>
      <RootStack.Navigator
        initialRouteName="Main"
        screenOptions={{
          headerTitleAlign: 'center',
        }}>
        <RootStack.Screen
          name="Main"
          component={MainScreen}
          options={{ title: appName }}
        />

        <RootStack.Screen
          name="About"
          component={AboutScreen}
          options={{ title: 'About' }}
        />

        <RootStack.Screen
          name="Settings"
          component={SettingsScreen}
          options={{ title: 'Settings' }}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default App;
