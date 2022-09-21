import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { StackParamList } from '../navigation';

import AboutScreen from './AboutScreen';
import MainTabs from './MainTabs';

import HeaderButton from '../components/HeaderButton';

import { useTheme } from '../hooks/useTheme';

import InfoIcon from '../assets/icons/info.svg';

const Stack = createNativeStackNavigator<StackParamList>();

const MainStack = () => {
  const theme = useTheme();

  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleAlign: 'center',
      }}>
      <Stack.Screen
        name="Main"
        component={MainTabs}
        options={({ navigation }) => ({
          title: 'Pomodorro',
          headerRight: () => {
            return (
              <HeaderButton onPress={() => navigation.navigate('About')}>
                <InfoIcon color={theme.colors.text} width={24} height={24} />
              </HeaderButton>
            );
          },
        })}
      />

      <Stack.Screen
        name="About"
        component={AboutScreen}
        options={{ title: 'About' }}
      />
    </Stack.Navigator>
  );
};

export default MainStack;
