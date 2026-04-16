import { ENTITY_ICONS } from '@/constants/entity-icons';
import { TERMS_AND_CONDITIONS_KEY } from '@/constants/memory';
import { useThemeColors } from '@/hooks/use-theme-colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Stack, useRouter } from 'expo-router';
import * as WebBrowser from 'expo-web-browser';
import { useEffect, useState } from 'react';
import { Pressable, Text as RNText, ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const I = ENTITY_ICONS;

export default function TermsAndConditionsScreen() {
  const router = useRouter();
  const colors = useThemeColors();
  const [isAgreed, setIsAgreed] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem(TERMS_AND_CONDITIONS_KEY).then((value) => {
      if (value === 'true') {
        setIsAgreed(true);
      }
    });
  }, []);

  const { bg, card, text, sub: textSecondary, border, primary } = colors;

  const handleOpenTerms = async () => {
    await WebBrowser.openBrowserAsync('https://example.com/terms');
  };

  const handleProceed = async () => {
    if (isAgreed) {
      await AsyncStorage.setItem(TERMS_AND_CONDITIONS_KEY, 'true');
      router.replace('/home');
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: bg }}>
      <Stack.Screen options={{ headerShown: false }} />

      <ScrollView 
        contentContainerStyle={{ paddingHorizontal: 24, paddingVertical: 24, paddingBottom: 120 }}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ alignItems: 'center', marginBottom: 32 }}>
          <RNText
            style={{
              fontSize: 32,
              fontWeight: '800',
              color: text,
              marginBottom: 8,
              letterSpacing: 0.5,
            }}
          >
            Terms & Conditions
          </RNText>
          <RNText
            style={{
              fontSize: 14,
              color: textSecondary,
              textAlign: 'center',
              lineHeight: 20,
            }}
          >
            Please review and accept our terms to continue
          </RNText>
        </View>

        <View style={{ gap: 16, marginBottom: 32 }}>
          <TermSection
            title="1. Usage License"
            content="We grant you a limited, non-exclusive, non-transferable license to use our application for personal use."
            card={card}
            border={border}
            text={text}
            textSecondary={textSecondary}
            primary={primary}
          />
          <TermSection
            title="2. Privacy & Data"
            content="We respect your privacy and handle your data securely in accordance with applicable laws and industry standards."
            card={card}
            border={border}
            text={text}
            textSecondary={textSecondary}
            primary={primary}
          />
          <TermSection
            title="3. User Responsibilities"
            content="You agree to use the application responsibly and not engage in any illegal or harmful activities."
            card={card}
            border={border}
            text={text}
            textSecondary={textSecondary}
            primary={primary}
          />
          <TermSection
            title="4. Limitations of Liability"
            content="We are not liable for any indirect, incidental, or consequential damages arising from your use."
            card={card}
            border={border}
            text={text}
            textSecondary={textSecondary}
            primary={primary}
          />
          <TermSection
            title="5. Changes to Terms"
            content="We reserve the right to modify these terms at any time. Your continued use constitutes acceptance."
            card={card}
            border={border}
            text={text}
            textSecondary={textSecondary}
            primary={primary}
          />
        </View>

        <Pressable
          onPress={() => setIsAgreed(!isAgreed)}
          style={{
            backgroundColor: card,
            borderRadius: 16,
            padding: 16,
            borderWidth: 2,
            borderColor: isAgreed ? primary : border,
            marginBottom: 24,
            flexDirection: 'row',
            alignItems: 'flex-start',
            gap: 12,
          }}
        >
          <View
            style={{
              width: 28,
              height: 28,
              borderRadius: 6,
              backgroundColor: isAgreed ? primary : 'transparent',
              borderWidth: isAgreed ? 0 : 2,
              borderColor: isAgreed ? primary : textSecondary,
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: 2,
            }}
          >
            {isAgreed && (
              <I.checkCircle size={32} color="#ffffff" strokeWidth={3} />
            )}
          </View>
          <View style={{ flex: 1 }}>
            <RNText style={{ fontSize: 14, color: text, lineHeight: 20 }}>
              I agree to all{' '}
              <RNText
                style={{
                  color: primary,
                  fontWeight: '700',
                  textDecorationLine: 'underline',
                }}
                onPress={handleOpenTerms}
              >
                terms and conditions
              </RNText>
            </RNText>
          </View>
        </Pressable>
      </ScrollView>

      <View
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: bg,
          paddingHorizontal: 24,
          paddingVertical: 16,
          borderTopWidth: 1,
          borderTopColor: border,
          gap: 12,
        }}
      >
        <Pressable
          onPress={handleProceed}
          disabled={!isAgreed}
          style={({ pressed }) => ({
            paddingVertical: 14,
            paddingHorizontal: 24,
            borderRadius: 12,
            backgroundColor: isAgreed ? primary : card,
            borderWidth: isAgreed ? 0 : 1,
            borderColor: isAgreed ? primary : border,
            alignItems: 'center',
            justifyContent: 'center',
            opacity: pressed ? 0.8 : 1,
            transform: [{ scale: pressed ? 0.98 : 1 }],
          })}
        >
          <RNText
            style={{
              fontSize: 15,
              fontWeight: '700',
              color: text,
              letterSpacing: 0.5,
            }}
          >
            {isAgreed ? 'Proceed to App' : 'Agree to Continue'}
          </RNText>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

function TermSection({
  title,
  content,
  card,
  border,
  text,
  textSecondary,
  primary,
}: {
  title: string;
  content: string;
  card: string;
  border: string;
  text: string;
  textSecondary: string;
  primary: string;
}) {
  return (
    <View
      style={{
        backgroundColor: card,
        borderRadius: 16,
        padding: 16,
        borderLeftWidth: 4,
        borderLeftColor: primary,
        borderTopWidth: 1,
        borderTopColor: border,
        borderRightWidth: 1,
        borderRightColor: border,
        borderBottomWidth: 1,
        borderBottomColor: border,
        gap: 8,
      }}
    >
      <RNText
        style={{
          fontSize: 15,
          fontWeight: '700',
          color: primary,
          letterSpacing: 0.3,
        }}
      >
        {title}
      </RNText>
      <RNText
        style={{
          fontSize: 14,
          color: text,
          lineHeight: 20,
        }}
      >
        {content}
      </RNText>
    </View>
  );
}
