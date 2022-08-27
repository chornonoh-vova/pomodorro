import { DarkTheme, DefaultTheme } from '@react-navigation/native';
import { useColorScheme } from 'react-native';

const LightScheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#fff',
    text: '#000',
    primary: 'rgb(66, 135, 245)',
    onPrimary: '#fff',
  },
};

const DarkScheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    text: '#fff',
    primary: 'rgb(66, 135, 245)',
    onPrimary: '#fff',
  },
};

export const useTheme = () => {
  const scheme = useColorScheme();

  return scheme === 'dark' ? DarkScheme : LightScheme;
};
