import { scaleBand, scaleLinear } from 'd3-scale';
import { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Svg, G, Rect, Text as SvgText } from 'react-native-svg';

import { useTheme } from '../hooks/useTheme';

type DataPoint = {
  value: number;
  date: Date;
  label: string;
  description: string;
};

type StatBarChartProps = {
  width: number;
  height: number;
  data: DataPoint[];

  barWidth?: number;
  barRadius?: number;

  textSize?: number;
};

const textPadding = 6;

const tooltipWidth = 110;
const tooltipLineWidth = 2;
const tooltipHeight = 80;

const StatBarChart = ({
  width,
  height,
  data,
  barWidth = 8,
  barRadius = 2,
  textSize = 12,
}: StatBarChartProps) => {
  const [selected, setSelected] = useState(-1);
  const theme = useTheme();

  const textOffset = textSize + textPadding;

  const chartHeight = height - tooltipHeight;

  const xDomain = data.map(({ date }) => date);
  const xRange = [0, width];

  const x = scaleBand(xDomain, xRange).padding(1);

  const yDomain = [0, Math.max(...data.map(({ value }) => value))];
  const yRange = [chartHeight - textOffset, 0];

  const y = scaleLinear(yDomain, yRange);

  const getBarX = (date: Date) => (x(date) || 0) - barWidth / 2;

  const getBarHeight = (value: number) => chartHeight - y(value) - textOffset;

  const getTooltipLineLeft = (date: Date) =>
    (x(date) || 0) - tooltipLineWidth / 2;

  const getTooltipLeft = (date: Date) => {
    const raw = x(date) || 0;
    const left = raw - tooltipWidth / 2;

    if (left < 0) {
      return getBarX(date);
    }

    if (left + tooltipWidth > width) {
      return width - tooltipWidth;
    }

    return left;
  };

  return (
    <View style={{ width, height }}>
      <View style={[{ height: tooltipHeight }, styles.tooltipWrapper]}>
        {selected !== -1 ? (
          <>
            <View
              style={[
                {
                  left: getTooltipLineLeft(data[selected].date),
                  height: chartHeight + tooltipHeight / 2 - textOffset,
                  backgroundColor: theme.colors.surface,
                },
                styles.tooltipLine,
              ]}
            />

            <View
              style={[
                {
                  left: getTooltipLeft(data[selected].date),
                  backgroundColor: theme.colors.surface,
                },
                styles.tooltip,
              ]}>
              <Text style={[{ color: theme.colors.text }, styles.tooltipValue]}>
                {data[selected].value} min
              </Text>
              <Text
                style={[
                  { color: theme.colors.text },
                  styles.tooltipDescription,
                ]}>
                {data[selected].description}
              </Text>
            </View>
          </>
        ) : null}
      </View>

      <Svg width={width} height={chartHeight} onPress={() => setSelected(-1)}>
        <G>
          {data.map(({ date, value }, index) => (
            <Rect
              key={index}
              x={getBarX(date)}
              y={y(value)}
              width={barWidth}
              height={getBarHeight(value)}
              rx={barRadius}
              ry={barRadius}
              fill={
                index === selected
                  ? theme.colors.primaryDarken
                  : theme.colors.primary
              }
              onPress={() => setSelected(index)}
            />
          ))}
        </G>

        <G fill={theme.colors.text}>
          {data
            .filter(({ label }) => label)
            .map(({ date, label }, index) => (
              <SvgText
                key={index}
                x={x(date)}
                y={chartHeight}
                fontSize={textSize}
                textAnchor="middle"
                alignmentBaseline="text-bottom">
                {label}
              </SvgText>
            ))}
        </G>
      </Svg>
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

export default StatBarChart;
