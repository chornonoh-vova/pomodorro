import React from 'react';
import { Pressable, PressableProps, StyleSheet } from 'react-native';

type HeaderButtonProps = React.PropsWithChildren<
  Pick<PressableProps, 'onPress'>
>;

const HeaderButton = ({ children, onPress }: HeaderButtonProps) => {
  return (
    <Pressable
      style={({ pressed }) => [
        {
          backgroundColor: pressed ? 'rgb(210, 230, 255)' : 'white',
        },
        styles.wrapper,
      ]}
      onPress={onPress}>
      {children}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    borderRadius: 12,
    padding: 6,
  },
});

export default HeaderButton;
