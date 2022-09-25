import { ReactNode } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import IconAlertTriangle from '../assets/icons/alert-triangle.svg';

const textColor = '#b91c1c';
const backgroundColor = '#fecaca';

const ErrorMessage = ({ children }: { children: ReactNode }) => {
  return (
    <View style={styles.wrapper}>
      <IconAlertTriangle color={textColor} width={24} height={24} />
      <Text style={styles.message}>{children}</Text>
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
  },

  message: {
    color: textColor,
    fontSize: 12,
    marginLeft: 8,
  },
});

export default ErrorMessage;
