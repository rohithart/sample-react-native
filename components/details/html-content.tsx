import { useThemeColors } from '@/hooks/use-theme-colors';
import React from 'react';
import { Text, View, useWindowDimensions } from 'react-native';

interface HtmlContentProps {
  label?: string;
  html: string;
}

export function HtmlContent({ label, html }: HtmlContentProps) {
  const { card, text, sub, border } = useThemeColors();
  const { width } = useWindowDimensions();

  // Strip HTML tags for plain-text rendering in RN
  const plainText = html
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/p>/gi, '\n\n')
    .replace(/<\/li>/gi, '\n')
    .replace(/<li>/gi, '  • ')
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\n{3,}/g, '\n\n')
    .trim();

  if (!plainText) return null;

  return (
    <View
      style={{
        backgroundColor: card,
        borderWidth: 1,
        borderColor: border,
        borderRadius: 10,
        padding: 14,
        gap: 6,
      }}
    >
      {label ? (
        <Text style={{ fontSize: 12, fontWeight: '600', color: sub, textTransform: 'uppercase', letterSpacing: 0.5 }}>
          {label}
        </Text>
      ) : null}
      <Text style={{ fontSize: 14, color: text, lineHeight: 22 }}>{plainText}</Text>
    </View>
  );
}
