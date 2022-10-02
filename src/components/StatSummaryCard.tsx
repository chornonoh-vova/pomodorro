import { useMemo } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { useTheme } from '../hooks/useTheme';
import { Period, StatDataPoint } from '../types/stat';
import VisibilityIcon from '../assets/icons/visibility.svg';

type StatSummaryCardProps = {
  period: Period;
  data: StatDataPoint[];
};

const StatSummaryCard = ({ period, data }: StatSummaryCardProps) => {
  const theme = useTheme();

  const headerTitle = useMemo(() => {
    let suffix = '';

    switch (period) {
      case Period.WEEK:
        suffix = 'Weekly';
        break;
      case Period.MONTH:
        suffix = 'Monthly';
        break;
      case Period.YEAR:
        suffix = 'Yearly';
        break;
    }

    return `${suffix} summary`;
  }, [period]);

  const sum = useMemo(
    () => data.reduce((prev, curr) => prev + curr.value, 0),
    [data],
  );

  const total = useMemo(() => sum.toFixed(2), [sum]);

  const avg = useMemo(() => (sum / data.length).toFixed(2), [data, sum]);

  return (
    <View
      style={[
        {
          backgroundColor: theme.colors.background,
          borderColor: theme.colors.surface,
        },
        styles.card,
      ]}>
      <View
        style={[{ borderBottomColor: theme.colors.surface }, styles.header]}>
        <VisibilityIcon color={theme.colors.text} width={24} height={24} />

        <Text style={[{ color: theme.colors.text }, styles.headerTitle]}>
          {headerTitle}
        </Text>
      </View>

      <View style={styles.body}>
        <View style={styles.statCell}>
          <Text style={[{ color: theme.colors.text }, styles.stat]}>
            {total} min
          </Text>
          <Text>Total</Text>
        </View>

        <View style={styles.statCell}>
          <Text style={[{ color: theme.colors.text }, styles.stat]}>
            {avg} min
          </Text>
          <Text>Average</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 16,
    borderWidth: 2,
    borderRadius: 12,
  },

  header: {
    paddingBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
  },

  headerTitle: {
    marginLeft: 16,
    fontSize: 16,
    fontWeight: 'bold',
  },

  body: {
    paddingTop: 16,
    flexDirection: 'row',
  },

  statCell: {
    flexGrow: 1,
    marginHorizontal: 8,
  },

  stat: {
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default StatSummaryCard;
