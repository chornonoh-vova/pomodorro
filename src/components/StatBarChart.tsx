import { scaleBand, scaleLinear } from 'd3-scale';
import { Fragment } from 'react';
import { Svg, Rect, Text } from 'react-native-svg';

import { StatBarDataPoint } from '../types/stat';

type StatBarChartProps = {
  width: number;
  height: number;

  data: StatBarDataPoint[];

  barColor: string;
  barWidth: number;
  barRadius: number;

  labelColor: string;
  labelSize: number;
  labelPadding: number;

  onBarSelect: (x: number, dataIndex: number) => void;
};

const StatBarChart = ({
  width,
  height,
  data,
  barColor,
  barWidth,
  barRadius,
  labelColor,
  labelSize,
  labelPadding,
  onBarSelect,
}: StatBarChartProps) => {
  const labelOffset = labelSize + labelPadding;

  const xDomain = data.map(({ date }) => date);
  const xRange = [0, width];

  const x = scaleBand(xDomain, xRange).padding(1);

  const yDomain = [0, Math.max(...data.map(({ value }) => value)) || 100];
  const yRange = [height - labelOffset, 0];

  const y = scaleLinear(yDomain, yRange);

  const getBarX = (date: Date) => (x(date) || 0) - barWidth / 2;

  const getBarHeight = (value: number) => height - y(value) - labelOffset;

  return (
    <Svg width={width} height={height}>
      {data.map(({ date, value, label }, index) => (
        <Fragment key={index}>
          <Rect
            key={`rect-${index}`}
            x={getBarX(date)}
            y={y(value)}
            width={barWidth}
            height={getBarHeight(value)}
            rx={barRadius}
            ry={barRadius}
            fill={barColor}
            onPress={() => onBarSelect(x(date) || 0, index)}
          />
          {label ? (
            <Text
              key={`label-${index}`}
              x={x(date)}
              y={height}
              fontSize={labelSize}
              fill={labelColor}
              textAnchor="middle"
              alignmentBaseline="text-bottom">
              {label}
            </Text>
          ) : null}
        </Fragment>
      ))}
    </Svg>
  );
};

export default StatBarChart;
