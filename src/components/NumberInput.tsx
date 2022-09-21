import {
  FieldPath,
  FieldValues,
  useController,
  UseControllerProps,
} from 'react-hook-form';
import { StyleSheet, Text, TextInput, View } from 'react-native';

import { useTheme } from '../hooks/useTheme';
import ErrorMessage from './ErrorMessage';

const NumberInput = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  control,
  title,
  subtitle,
  ...props
}: UseControllerProps<TFieldValues, TName> & {
  title: string;
  subtitle?: string;
}) => {
  const theme = useTheme();

  const {
    field: { ref, value, onChange, onBlur },
    fieldState: { error },
  } = useController<TFieldValues, TName>({
    control,
    ...props,
  });

  return (
    <View>
      <View style={styles.inputWrapper}>
        <View style={styles.inputDescription}>
          <Text style={[{ color: theme.colors.text }, styles.title]}>
            {title}
          </Text>

          <Text style={[{ color: theme.colors.text }, styles.subtitle]}>
            {subtitle}
          </Text>
        </View>

        <TextInput
          ref={ref}
          style={styles.input}
          value={value.toString()}
          onBlur={onBlur}
          onChangeText={(e) => {
            const parsed = parseInt(e, 10);
            onChange(isNaN(parsed) ? '' : parsed);
          }}
          keyboardType="numeric"
        />
      </View>

      {error && <ErrorMessage>{error.message}</ErrorMessage>}
    </View>
  );
};

const styles = StyleSheet.create({
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 8,
  },

  inputDescription: {
    flex: 1,
    flexDirection: 'column',
  },

  input: {
    marginLeft: 16,
  },

  title: {
    fontSize: 16,
    fontWeight: '600',
  },

  subtitle: {
    fontSize: 14,
    fontWeight: 'normal',
  },
});

export default NumberInput;
