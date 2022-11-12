import { scaleBand, scaleLinear } from 'd3-scale';
import { Fragment, useEffect } from 'react';
import Animated, {
  Easing,
  useAnimatedProps,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { Svg, Rect, Text, RectProps } from 'react-native-svg';

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

const AnimatedRect = Animated.createAnimatedComponent(Rect);

const AnimatedBar = ({
  y,
  height,
  ...props
}: RectProps & { y: number; height: number }) => {
  const animatedVal = useSharedValue(0);

  const animatedProps = useAnimatedProps(() => ({
    height: height * animatedVal.value,
    y: y + height * (1 - animatedVal.value),
  }));

  useEffect(() => {
    animatedVal.value = withTiming(1, {
      duration: 1000,
      easing: Easing.out(Easing.exp),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [y, height]);

  return <AnimatedRect animatedProps={animatedProps} {...props} />;
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
          <AnimatedBar
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
