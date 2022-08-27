import React, { useLayoutEffect } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import HeaderButton from '../components/HeaderButton';

import { RootStackParamList } from '../navigation';

import InfoCircle from '../assets/icons/info-circle.svg';
import Settings from '../assets/icons/settings.svg';

type MainScreenProps = NativeStackScreenProps<RootStackParamList, 'Main'>;

const MainScreen = ({ navigation }: MainScreenProps) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => {
        return (
          <HeaderButton onPress={() => navigation.navigate('About')}>
            <InfoCircle color="#000" width={24} height={24} />
          </HeaderButton>
        );
      },
      headerRight: () => {
        return (
          <HeaderButton onPress={() => navigation.navigate('Settings')}>
            <Settings color="#000" width={24} height={24} />
          </HeaderButton>
        );
      },
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text>Home Screen</Text>

      <Button
        title="Go to About"
        onPress={() => navigation.navigate('About')}
      />
      <Button
        title="Go to Settings"
        onPress={() => navigation.navigate('Settings')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default MainScreen;
