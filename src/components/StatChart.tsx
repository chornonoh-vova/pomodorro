import { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';

import { useTheme } from '../hooks/useTheme';
import { StatBarDataPoint } from '../types/stat';

import StatBarChart from './StatBarChart';

type StatChartProps = {
  width: number;
  height: number;

  data: StatBarDataPoint[];

  barWidth: number;

  labelSize?: number;
};

const barRadius = 4;

const labelPadding = 6;

const tooltipWidth = 112;
const tooltipLineWidth = 2;
const tooltipHeight = 80;

const StatChart = ({
  width,
  height,
  data,
  barWidth,
  labelSize = 12,
}: StatChartProps) => {
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [tooltipLeft, setTooltipLeft] = useState(0);
  const [tooltipLineLeft, setTooltipLineLeft] = useState(0);

  const theme = useTheme();

  const labelOffset = labelSize + labelPadding;

  const chartHeight = height - tooltipHeight;

  const onBarSelect = (x: number, dataIndex: number) => {
    const lineLeft = x - tooltipLineWidth / 2;
    let left = x - tooltipWidth / 2;

    if (left < 0) {
      left = x - barWidth / 2;
    }

    if (left + tooltipWidth > width) {
      left = width - tooltipWidth;
    }

    setTooltipLeft(left);
    setTooltipLineLeft(lineLeft);
    setSelectedIndex(dataIndex);
  };

  return (
    <View style={{ width, height }}>
      <View style={[{ height: tooltipHeight }, styles.tooltipWrapper]}>
        {selectedIndex !== -1 ? (
          <>
            <View
              style={[
                {
                  left: tooltipLineLeft,
                  height: chartHeight + tooltipHeight / 2 - labelOffset,
                  backgroundColor: theme.colors.surface,
                },
                styles.tooltipLine,
              ]}
            />

            <View
              style={[
                {
                  left: tooltipLeft,
                  backgroundColor: theme.colors.surface,
                },
                styles.tooltip,
              ]}>
              <Text style={[{ color: theme.colors.text }, styles.tooltipValue]}>
                {data[selectedIndex].value} min
              </Text>
              <Text
                style={[
                  { color: theme.colors.text },
                  styles.tooltipDescription,
                ]}>
                {data[selectedIndex].description}
              </Text>
            </View>
          </>
        ) : null}
      </View>

      <StatBarChart
        width={width}
        height={chartHeight}
        data={data}
        barColor={theme.colors.primary}
        barWidth={barWidth}
        barRadius={barRadius}
        labelColor={theme.colors.text}
        labelSize={labelSize}
        labelPadding={labelPadding}
        onBarSelect={onBarSelect}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  tooltipWrapper: {
    position: 'relative',
  },

  tooltip: {
    position: 'absolute',
    top: 0,
    borderRadius: 12,
    width: tooltipWidth,
    padding: 8,
  },

  tooltipLine: {
    position: 'absolute',
    top: tooltipHeight / 2,
    width: tooltipLineWidth,
  },

  tooltipValue: {
    fontSize: 16,
    fontWeight: 'bold',
  },

  tooltipDescription: {
    fontSize: 12,
  },
});

export default StatChart;
