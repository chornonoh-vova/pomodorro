import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import IconAlertTriangle from '../assets/icons/alert-triangle.svg';

const textColor = 'rgb(176, 0, 32)';
const backgroundColor = 'rgba(176, 0, 32, 0.25)';

const ErrorMessage = ({ error }: { error: string }) => {
  return (
    <View style={styles.wrapper}>
      <IconAlertTriangle color={textColor} width={24} height={24} />
      <Text style={styles.message}>{error}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: backgroundColor,
    flexDirection: 'row',
    padding: 8,
    borderRadius: 10,
    borderColor: textColor,
    borderWidth: 1,
    marginTop: 32,
  },

  message: {
    color: textColor,
    fontSize: 12,
    marginLeft: 8,
  },
});

export default ErrorMessage;
