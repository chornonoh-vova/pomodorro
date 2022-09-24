import { scaleBand, scaleLinear } from 'd3-scale';
import { View } from 'react-native';
import { Svg, G, Rect, Text } from 'react-native-svg';

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

  barColor: string;
  barWidth?: number;
  barRadius?: number;

  textColor: string;
  textSize?: number;

  marginTop?: number;
  marginBottom?: number;
  marginLeft?: number;
  marginRight?: number;
};

const StatBarChart = ({
  width,
  height,
  data,
  barColor,
  barWidth = 8,
  barRadius = 2,
  textColor,
  textSize = 12,
  marginTop = 8,
  marginBottom = 8,
  marginLeft = 8,
  marginRight = 8,
}: StatBarChartProps) => {
  const textOffset = textSize + 6;

  const chartWidth = width - marginLeft - marginRight;
  const chartHeight = height - marginTop - marginBottom;

  const xDomain = data.map(({ date }) => date);
  const xRange = [0, chartWidth];

  const x = scaleBand(xDomain, xRange).padding(1);

  const yDomain = [0, Math.max(...data.map(({ value }) => value))];
  const yRange = [0, chartHeight - textOffset];

  const y = scaleLinear(yDomain, yRange);

  return (
    <View
      style={{
        width,
        height,
        marginTop,
        marginBottom,
        marginLeft,
        marginRight,
      }}>
      <Svg width={chartWidth} height={chartHeight}>
        <G fill={barColor}>
          {data.map(({ date, value }) => (
            <Rect
              key={`rect-${date.toISOString()}`}
              x={(x(date) || 0) - barWidth / 2}
              y={y(value)}
              width={barWidth}
              height={chartHeight - y(value) - textOffset}
              rx={barRadius}
              ry={barRadius}
            />
          ))}
        </G>

        <G fill={textColor}>
          {data
            .filter(({ label }) => label)
            .map(({ date, label }) => (
              <Text
                key={`label-${date.toISOString()}`}
                x={x(date)}
                y={chartHeight}
                fontSize={textSize}
                textAnchor="middle"
                alignmentBaseline="text-bottom">
                {label}
              </Text>
            ))}
        </G>
      </Svg>
    </View>
  );
};

export default StatBarChart;
