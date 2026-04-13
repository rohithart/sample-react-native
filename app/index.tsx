import { useThemeColors } from '@/hooks/use-theme-colors';
import { Stack, useRouter } from 'expo-router';
import { Sparkles, Zap, Shield, Rocket } from 'lucide-react-native';
import { useEffect, useRef } from 'react';
import { Animated, Easing, View, ScrollView, Text as RNText } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SplashScreen() {
  const colors = useThemeColors();
  const router = useRouter();

  // Multiple animations for staggered effects
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;
  const logoScale = useRef(new Animated.Value(0.8)).current;
  const featureAnim1 = useRef(new Animated.Value(20)).current;
  const featureAnim2 = useRef(new Animated.Value(20)).current;
  const featureAnim3 = useRef(new Animated.Value(20)).current;
  const floatAnim = useRef(new Animated.Value(0)).current;

  const { bg, card, text, sub: textSecondary, primary, secondary } = colors;

  useEffect(() => {
    // Main fade and slide in
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();

    // Logo scale
    Animated.sequence([
      Animated.delay(200),
      Animated.timing(logoScale, {
        toValue: 1,
        duration: 700,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
    ]).start();

    // Slide content up
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 800,
      easing: Easing.out(Easing.quad),
      useNativeDriver: true,
    }).start();

    // Feature items stagger
    Animated.stagger(150, [
      Animated.timing(featureAnim1, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(featureAnim2, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(featureAnim3, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();

    // Floating animation (continuous)
    Animated.loop(
      Animated.sequence([
        Animated.timing(floatAnim, {
          toValue: 1,
          duration: 3000,
          useNativeDriver: true,
        }),
        Animated.timing(floatAnim, {
          toValue: 0,
          duration: 3000,
          useNativeDriver: true,
        }),
      ])
    ).start();

    // Redirect after 3 seconds
    const timer = setTimeout(() => {
      router.replace('/terms-and-conditions');
    }, 3000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: bg }}>
      <Stack.Screen options={{ headerShown: false }} />

      <ScrollView 
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        <Animated.View
          style={{
            flex: 1,
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
          }}
        >
          <View style={{ flex: 1, paddingHorizontal: 24, paddingVertical: 32, justifyContent: 'space-between' }}>
            {/* Hero Section */}
            <View style={{ alignItems: 'center', marginTop: 20 }}>
              {/* Animated Logo Container */}
              <Animated.View
                style={{
                  marginBottom: 32,
                  transform: [{ scale: logoScale }],
                  opacity: logoScale.interpolate({
                    inputRange: [0.8, 1],
                    outputRange: [0.5, 1],
                  }),
                }}
              >
                <View
                  style={{
                    width: 120,
                    height: 120,
                    borderRadius: 40,
                    backgroundColor: primary + '15',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderWidth: 2,
                    borderColor: primary + '30',
                  }}
                >
                  <Animated.View
                    style={{
                      transform: [
                        {
                          rotateZ: floatAnim.interpolate({
                            inputRange: [0, 1],
                            outputRange: ['0deg', '360deg'],
                          }),
                        },
                      ],
                    }}
                  >
                    <Sparkles size={60} color={primary} strokeWidth={1.5} />
                  </Animated.View>
                </View>
              </Animated.View>

              {/* Branding */}
              <RNText
                style={{
                  fontSize: 48,
                  fontWeight: '800',
                  color: text,
                  marginBottom: 8,
                  letterSpacing: 1,
                }}
              >
                Darth
                <RNText style={{ color: primary }}>Vader</RNText>
              </RNText>

              <RNText
                style={{
                  fontSize: 14,
                  color: textSecondary,
                  textAlign: 'center',
                  marginBottom: 24,
                  lineHeight: 20,
                }}
              >
                Enterprise Management Platform{'\n'}For Modern Teams
              </RNText>
            </View>

            {/* Features Container */}
            <View style={{ gap: 12, marginVertical: 32 }}>
              {/* Feature 1 */}
              <Animated.View
                style={{
                  opacity: featureAnim1.interpolate({
                    inputRange: [0, 20],
                    outputRange: [1, 0],
                  }),
                  transform: [{ translateY: featureAnim1 }],
                }}
              >
                <FeatureCard
                  icon={<Rocket size={28} color={primary} />}
                  title="Lightning Fast"
                  description="Built on Expo 54 with Metro bundler for instant delivery"
                  bgColor={card}
                  borderColor={primary + '20'}
                />
              </Animated.View>

              {/* Feature 2 */}
              <Animated.View
                style={{
                  opacity: featureAnim2.interpolate({
                    inputRange: [0, 20],
                    outputRange: [1, 0],
                  }),
                  transform: [{ translateY: featureAnim2 }],
                }}
              >
                <FeatureCard
                  icon={<Zap size={28} color={secondary} />}
                  title="Beautifully Designed"
                  description="Premium UI with Gluestack components and Tailwind CSS"
                  bgColor={card}
                  borderColor={secondary + '20'}
                />
              </Animated.View>

              {/* Feature 3 */}
              <Animated.View
                style={{
                  opacity: featureAnim3.interpolate({
                    inputRange: [0, 20],
                    outputRange: [1, 0],
                  }),
                  transform: [{ translateY: featureAnim3 }],
                }}
              >
                <FeatureCard
                  icon={<Shield size={28} color={colors.success} />}
                  title="Production Ready"
                  description="Complete with authentication, error handling & deep linking"
                  bgColor={card}
                  borderColor={colors.success + '20'}
                />
              </Animated.View>
            </View>
          </View>
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
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
        <RNText
          style={{
            fontSize: 16,
            fontWeight: '700',
            color: featureColors.text,
            letterSpacing: 0.3,
          }}
        >
          {title}
        </RNText>
        <RNText
          style={{
            fontSize: 13,
            color: featureColors.sub,
            lineHeight: 18,
          }}
        >
          {description}
        </RNText>
      </View>
    </View>
  );
}
