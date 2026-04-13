import { useThemeColors } from '@/hooks/use-theme-colors';
import { useEffect, useRef, useState } from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import Svg, { Defs, Rect, Stop, LinearGradient as SvgGradient } from 'react-native-svg';

interface ShimmerProps {
  style?: object;
  borderRadius?: number;
}

/**
 * Base shimmer component — renders a skeleton placeholder that sweeps
 * a highlight gradient left-to-right, similar to ngx-skeleton-loader.
 */
export function Shimmer({ style, borderRadius = 8 }: ShimmerProps) {
  const { isDark, shimmer: bgColor } = useThemeColors();
  const [size, setSize] = useState({ width: 0, height: 0 });
  const anim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const loop = Animated.loop(
      Animated.timing(anim, {
        toValue: 1,
        duration: 1200,
        useNativeDriver: true,
      })
    );
    loop.start();
    return () => loop.stop();
  }, [anim]);

  const translateX = anim.interpolate({
    inputRange: [0, 1],
    outputRange: [
      size.width > 0 ? -size.width : -300,
      size.width > 0 ? size.width : 300,
    ],
  });

  return (
    <View
      onLayout={(e) =>
        setSize({
          width: e.nativeEvent.layout.width,
          height: e.nativeEvent.layout.height,
        })
      }
      style={[{ backgroundColor: bgColor, overflow: 'hidden', borderRadius }, style]}
    >
      {size.width > 0 && size.height > 0 && (
        <Animated.View
          style={[StyleSheet.absoluteFillObject, { transform: [{ translateX }] }]}
        >
          <Svg width={size.width} height={size.height}>
            <Defs>
              <SvgGradient id="shimmer" x1="0" y1="0" x2="1" y2="0">
                <Stop offset="0" stopColor={bgColor} stopOpacity="1" />
                <Stop
                  offset="0.4"
                  stopColor="#ffffff"
                  stopOpacity={isDark ? '0.06' : '0.7'}
                />
                <Stop
                  offset="0.6"
                  stopColor="#ffffff"
                  stopOpacity={isDark ? '0.06' : '0.7'}
                />
                <Stop offset="1" stopColor={bgColor} stopOpacity="1" />
              </SvgGradient>
            </Defs>
            <Rect width={size.width} height={size.height} fill="url(#shimmer)" />
          </Svg>
        </Animated.View>
      )}
    </View>
  );
}
