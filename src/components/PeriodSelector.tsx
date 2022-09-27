import { Pressable, StyleSheet, Text, View } from 'react-native';

import { useTheme } from '../hooks/useTheme';

const PeriodSelector = <T extends string>({
  periods,
  selectedPeriod,
  setSelectedPeriod,
}: {
  periods: { value: T; label: string }[];
  selectedPeriod: T;
  setSelectedPeriod: (newPeriod: T) => void;
}) => {
  const theme = useTheme();

  return (
    <View
      style={[styles.selectorWrapper, { borderColor: theme.colors.surface }]}>
      {periods.map((period) => (
        <Pressable
          key={period.value}
          style={[
            styles.periodBtn,
            period.value === selectedPeriod && {
              backgroundColor: theme.colors.primary,
            },
          ]}
          onPress={() => setSelectedPeriod(period.value)}>
          <Text
            style={
              period.value === selectedPeriod && {
                color: theme.colors.onPrimary,
              }
            }>
            {period.label}
          </Text>
        </Pressable>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  selectorWrapper: {
    flexDirection: 'row',
    flexWrap: 'nowrap',
    borderRadius: 8,
    padding: 4,
    borderWidth: 1,
  },

  periodBtn: {
    flexGrow: 1,
    borderRadius: 6,
    padding: 8,
    alignItems: 'center',
  },
});

export default PeriodSelector;
