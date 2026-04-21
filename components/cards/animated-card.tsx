import { useThemeColors } from "@/hooks/use-theme-colors";
import React from "react";
import { Animated, View, Text } from "react-native";

export function AnimatedFeatureCard({
  animValue,
  icon,
  title,
  description,
  bgColor,
  borderColor,
}: {
  animValue: Animated.Value;
  icon: React.ReactNode;
  title: string;
  description: string;
  bgColor: string;
  borderColor: string;
}) {
  return (
    <Animated.View
      style={{
        opacity: animValue.interpolate({ inputRange: [0, 20], outputRange: [1, 0] }),
        transform: [{ translateY: animValue }],
      }}
    >
      <FeatureCard
        icon={icon}
        title={title}
        description={description}
        bgColor={bgColor}
        borderColor={borderColor}
      />
    </Animated.View>
  );
}

function FeatureCard({
  icon,
  title,
  description,
  bgColor,
  borderColor,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  bgColor: string;
  borderColor: string;
}) {
  const featureColors = useThemeColors();
  return (
    <View
      style={{
        backgroundColor: bgColor,
        borderRadius: 16,
        padding: 16,
        borderWidth: 1,
        borderColor: borderColor,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: featureColors.isDark ? 0.1 : 0.05,
        shadowRadius: 8,
        elevation: 3,
      }}
    >
      <View
        style={{
          width: 56,
          height: 56,
          borderRadius: 14,
          backgroundColor: borderColor,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {icon}
      </View>
      <View style={{ flex: 1, gap: 4 }}>
        <Text
          style={{
            fontSize: 16,
            fontWeight: '700',
            color: featureColors.text,
            letterSpacing: 0.3,
          }}
        >
          {title}
        </Text>
        <Text
          style={{
            fontSize: 13,
            color: featureColors.sub,
            lineHeight: 18,
          }}
        >
          {description}
        </Text>
      </View>
    </View>
  );
}