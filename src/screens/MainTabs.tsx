import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { TabParamList } from '../navigation';

import SettingsScreen from './SettingsScreen';
import PomoScreen from './PomoScreen';

import { useTheme } from '../hooks/useTheme';

import TimerIcon from '../assets/icons/timer.svg';
import SettingsIcon from '../assets/icons/settings.svg';

const Tab = createBottomTabNavigator<TabParamList>();

const MainTabs = () => {
  const theme = useTheme();

  return (
    <Tab.Navigator
      initialRouteName="Pomo"
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.colors.primary,
        tabBarStyle: {
          paddingBottom: 4,
        },
      }}>
      <Tab.Screen
        name="Pomo"
        component={PomoScreen}
        options={{
          title: 'Pomodoro',
          tabBarIcon: ({ color, size }) => (
            <TimerIcon color={color} width={size} height={size} />
          ),
        }}
      />

      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          title: 'Settings',
          tabBarIcon: ({ color, size }) => (
            <SettingsIcon color={color} width={size} height={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default MainTabs;
