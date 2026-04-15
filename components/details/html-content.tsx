import { ENTITY_ICONS } from '@/constants/entity-icons';
import { useThemeColors } from '@/hooks/use-theme-colors';
import React, { useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';

const COLLAPSED_HEIGHT = 160;

interface HtmlContentProps {
  label?: string;
  html: string;
  maxHeight?: number;
}

export function HtmlContent({ label, html, maxHeight = COLLAPSED_HEIGHT }: HtmlContentProps) {
  const { card, text, sub, border, primary } = useThemeColors();
  const [expanded, setExpanded] = useState(false);
  const [contentHeight, setContentHeight] = useState(0);
  const I = ENTITY_ICONS;

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

  const isOverflow = contentHeight > maxHeight;
  const showScroll = isOverflow && !expanded;

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

      <View style={showScroll ? { maxHeight, overflow: 'hidden' } : undefined}>
        <ScrollView
          scrollEnabled={showScroll}
          showsVerticalScrollIndicator={showScroll}
          nestedScrollEnabled
        >
          <Text
            style={{ fontSize: 14, color: text, lineHeight: 22 }}
            onLayout={(e) => setContentHeight(e.nativeEvent.layout.height)}
          >
            {plainText}
          </Text>
        </ScrollView>
      </View>

      {isOverflow && (
        <Pressable
          onPress={() => setExpanded((v) => !v)}
          style={{ flexDirection: 'row', alignItems: 'center', gap: 4, paddingTop: 4 }}
        >
          <View style={expanded ? { transform: [{ rotate: '180deg' }] } : undefined}>
            <I.chevronDown size={14} color={primary} />
          </View>
          <Text style={{ fontSize: 12, fontWeight: '600', color: primary }}>
            {expanded ? 'Show less' : 'Show more'}
          </Text>
        </Pressable>
      )}
    </View>
  );
}
