import { AnimatedFeatureCard } from '@/components/cards/animated-card';
import { ScrollView } from '@/components/ui/scroll-view';
import { Text } from '@/components/ui/text';
import { View } from '@/components/ui/view';
import { ENTITY_ICONS } from '@/constants/entity-icons';
import { useToast } from '@/context/toast-context';
import { useThemeColors } from '@/hooks/use-theme-colors';
import { useAlertsAndroid, useAlertsiOS } from '@/services/alert';
import { useHealth } from '@/services/health';
import { Alert } from '@/types';
import Constants from 'expo-constants';
import { Stack, useRouter } from 'expo-router';
import { useEffect, useRef } from 'react';
import { Animated, BackHandler, Easing, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SplashScreen() {
  const colors = useThemeColors();
  const router = useRouter();
  const I = ENTITY_ICONS;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;
  const logoScale = useRef(new Animated.Value(0.8)).current;
  const featureAnim1 = useRef(new Animated.Value(20)).current;
  const featureAnim2 = useRef(new Animated.Value(20)).current;
  const featureAnim3 = useRef(new Animated.Value(20)).current;
  const floatAnim = useRef(new Animated.Value(0)).current;
  const { bg, text, sub: textSecondary, primary } = colors;
  const { showToast } = useToast();

  const useAlerts = () => {
    const androidAlerts = useAlertsAndroid();
    const iosAlerts = useAlertsiOS();

    return Platform.OS === 'android' ? androidAlerts : iosAlerts;
  };
  const alertsQuery = useAlerts();
  const healthQuery = useHealth();

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();

    Animated.sequence([
      Animated.delay(200),
      Animated.timing(logoScale, {
        toValue: 1,
        duration: 700,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
    ]).start();

    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 800,
      easing: Easing.out(Easing.quad),
      useNativeDriver: true,
    }).start();

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
  }, [fadeAnim, slideAnim, logoScale, featureAnim1, featureAnim2, featureAnim3, floatAnim]);

  const FEATURE_CARDS = [
    {
      key: 'fast',
      icon: (I: any, colors: any) => <I.rocket size={28} color={colors.primary} />,
      title: 'Lightning Fast',
      description: 'Built on Expo 54 with Metro bundler for instant delivery',
      getBg: (colors: any) => colors.card,
      getBorder: (colors: any) => colors.primary + '20',
      animValue: featureAnim1,
    },
    {
      key: 'design',
      icon: (I: any, colors: any) => <I.zap size={28} color={colors.secondary} />,
      title: 'Beautifully Designed',
      description: 'Premium UI with Gluestack components and Tailwind CSS',
      getBg: (colors: any) => colors.card,
      getBorder: (colors: any) => colors.secondary + '20',
      animValue: featureAnim2,
    },
    {
      key: 'prod',
      icon: (I: any, colors: any) => <I.shield size={28} color={colors.success} />,
      title: 'Production Ready',
      description: 'Complete with authentication, error handling & deep linking',
      getBg: (colors: any) => colors.card,
      getBorder: (colors: any) => colors.success + '20',
      animValue: featureAnim3,
    }
  ];

  useEffect(() => {
    if (alertsQuery.data && Array.isArray(alertsQuery.data)) {
      alertsQuery.data.forEach((alert: Alert) => {
        showToast({
          type: alert.alertType || 'info',
          title: 'Alert',
          message: alert.name || 'Alert',
          duration: 4000,
        });
      });
    }
  }, [alertsQuery.data, showToast]);

  useEffect(() => {
    if (healthQuery.isError || (healthQuery.data && healthQuery.data.status !== 'Ok')) {
      showToast({
        type: 'error',
        title: 'Server Error',
        message: 'Unable to connect to the server. The app will now close.',
        duration: 5000,
      });
      setTimeout(() => {
        BackHandler.exitApp();
      }, 2000);
      throw new Error('Health check failed');
    }
    if (healthQuery.data) {
      const minVersion = healthQuery.data?.minVersion;
      let currentVersion = '1.0.0';
      if (Constants.expoConfig?.version) {
        currentVersion = Constants.expoConfig.version;
      }
      if (minVersion && compareVersions(minVersion, currentVersion) > 0) {
        showToast({
          type: 'error',
          title: 'Update Required',
          message: 'A new version of the app is required. Please update to continue.',
          duration: 5000,
        });
        setTimeout(() => {
          BackHandler.exitApp();
        }, 2000);
      }
    }
  }, [healthQuery.data, healthQuery.isError, showToast]);

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace('/login');
    }, 3000);
    return () => clearTimeout(timer);
  }, [router]);

  function compareVersions(a: string, b: string) {
    const pa = a.split('.').map(Number);
    const pb = b.split('.').map(Number);
    for (let i = 0; i < Math.max(pa.length, pb.length); i++) {
      const na = pa[i] || 0, nb = pb[i] || 0;
      if (na > nb) return 1;
      if (na < nb) return -1;
    }
    return 0;
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: bg }}>
      <Stack.Screen options={{ headerShown: false }} />

      <ScrollView 
        contentContainerStyle={{ padding: 20, gap: 16 }}
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
            <View style={{ alignItems: 'center', marginTop: 20 }}>
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
                    <I.sparkles size={60} color={primary} />
                  </Animated.View>
                </View>
              </Animated.View>

              <Text
                style={{
                  fontSize: 48,
                  fontWeight: '800',
                  color: text,
                  marginBottom: 8,
                  letterSpacing: 1,
                }}
              >
                Darth
                <Text style={{ color: primary }}>Vader</Text>
              </Text>

              <Text
                style={{
                  fontSize: 14,
                  color: textSecondary,
                  textAlign: 'center',
                  marginBottom: 24,
                  lineHeight: 20,
                }}
              >
                Enterprise Management Platform{'\n'}For Modern Teams
              </Text>
            </View>

            <View style={{ gap: 12, marginVertical: 32 }}>
              {FEATURE_CARDS.map((feature, idx) => (
                <AnimatedFeatureCard
                  key={feature.key}
                  animValue={feature.animValue}
                  icon={feature.icon(I, colors)}
                  title={feature.title}
                  description={feature.description}
                  bgColor={feature.getBg(colors)}
                  borderColor={feature.getBorder(colors)}
                />
              ))}
            </View>
          </View>
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
}
