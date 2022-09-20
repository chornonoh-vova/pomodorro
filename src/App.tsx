import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import MainScreen from './screens/Main';
import AboutScreen from './screens/About';
import SettingsScreen from './screens/Settings';

import HeaderButton from './components/HeaderButton';

import { useTheme } from './hooks/useTheme';

import { RootStackParamList } from './navigation';

import { name as appName } from '../app.json';

import InfoIcon from './assets/icons/info.svg';
import SettingsIcon from './assets/icons/settings.svg';

const RootStack = createNativeStackNavigator<RootStackParamList>();

const App = () => {
  const theme = useTheme();

  return (
    <NavigationContainer theme={theme}>
      <RootStack.Navigator
        initialRouteName="Main"
        screenOptions={{
          headerShadowVisible: false,
          headerTitleAlign: 'center',
          contentStyle: {
            backgroundColor: theme.colors.background,
          },
        }}>
        <RootStack.Screen
          name="Main"
          component={MainScreen}
          options={({ navigation }) => ({
            title: appName,
            headerLeft: () => {
              return (
                <HeaderButton onPress={() => navigation.navigate('About')}>
                  <InfoIcon color={theme.colors.text} width={24} height={24} />
                </HeaderButton>
              );
            },
            headerRight: () => {
              return (
                <HeaderButton onPress={() => navigation.navigate('Settings')}>
                  <SettingsIcon
                    color={theme.colors.text}
                    width={24}
                    height={24}
                  />
                </HeaderButton>
              );
            },
          })}
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
