import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { useTheme } from '../hooks/useTheme';
import type { StackParamList } from '../types/navigation';
import HeaderButton from '../components/HeaderButton';
import InfoIcon from '../assets/icons/info.svg';

import AboutScreen from './AboutScreen';
import MainTabs from './MainTabs';

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
