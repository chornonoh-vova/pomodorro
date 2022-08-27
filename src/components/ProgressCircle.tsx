import React from 'react';
import { ColorValue, StyleSheet } from 'react-native';
import Svg, { Circle, G } from 'react-native-svg';

type ProgressCircleProps = {
  value: number;

  width: number;
  height: number;

  color: ColorValue;

  radius?: number;
  strokeWidth?: number;
};

const ProgressCircle = ({
  value,
  width,
  height,
  color,
  radius = 45,
  strokeWidth = 5,
}: ProgressCircleProps) => {
  const circumference = 2 * Math.PI * radius;
  const halfCircle = radius + strokeWidth;

  return (
    <Svg
      style={StyleSheet.absoluteFill}
      width={width}
      height={height}
      viewBox={`0 0 ${halfCircle * 2} ${halfCircle * 2}`}>
      <G rotation="-90" origin={`${halfCircle}, ${halfCircle}`}>
        <Circle
          cx="50%"
          cy="50%"
          r={radius}
          fill="transparent"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinejoin="round"
          strokeOpacity=".2"
        />

        <Circle
          cx="50%"
          cy="50%"
          r={radius}
          fill="transparent"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={circumference - (circumference * value) / 100}
        />
      </G>
    </Svg>
  );
};

export default ProgressCircle;
