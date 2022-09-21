import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';

import { useTheme } from './hooks/useTheme';

import MainStack from './screens/MainStack';

const App = () => {
  const theme = useTheme();

  return (
    <SafeAreaProvider>
      <NavigationContainer theme={theme}>
        <MainStack />
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;
