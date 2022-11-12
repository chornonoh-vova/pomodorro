import { useEffect } from 'react';
import { ColorValue, StyleSheet } from 'react-native';
import Animated, {
  Easing,
  useAnimatedProps,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { Svg, Circle, G } from 'react-native-svg';

type ProgressCircleProps = {
  value: number;

  width: number;
  height: number;

  color: ColorValue;

  radius?: number;
  strokeWidth?: number;
};

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

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

  const progress = useSharedValue(0);

  const strokeDashoffset = useDerivedValue(() => {
    return circumference - (circumference * progress.value) / 100;
  });

  const animatedProps = useAnimatedProps(() => ({
    strokeDashoffset: strokeDashoffset.value,
  }));

  useEffect(() => {
    progress.value = withTiming(value, {
      duration: 1000,
      easing: Easing.out(Easing.exp),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return (
    <Svg
      style={StyleSheet.absoluteFill}
      width={width}
      height={height}
      viewBox={`0 0 ${halfCircle * 2} ${halfCircle * 2}`}>
      <G
        rotation="-90"
        origin={`${halfCircle}, ${halfCircle}`}
        fill="transparent"
        stroke={color}
        strokeWidth={strokeWidth}>
        <Circle
          cx="50%"
          cy="50%"
          r={radius}
          strokeLinejoin="round"
          strokeOpacity={0.2}
        />

        <AnimatedCircle
          animatedProps={animatedProps}
          cx="50%"
          cy="50%"
          r={radius}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={circumference - (circumference * value) / 100}
        />
      </G>
    </Svg>
  );
};

export default ProgressCircle;
