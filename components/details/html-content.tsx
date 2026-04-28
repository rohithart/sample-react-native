import { ENTITY_ICONS } from '@/constants/entity-icons';
import { useThemeColors } from '@/hooks/use-theme-colors';
import React, { useState } from 'react';
import { Pressable, ScrollView, Text, View, useWindowDimensions } from 'react-native';
import RenderHtml from 'react-native-render-html';
import { SectionHeader } from '../section-header';

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


  if (!html) return null;

  const isOverflow = contentHeight > maxHeight;
  const showScroll = isOverflow && !expanded;

  const { width } = useWindowDimensions();

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
        <SectionHeader title={label} style={{ fontSize: 10, fontWeight: '700' }} />
      ) : null}

      <View style={showScroll ? { maxHeight, overflow: 'hidden' } : undefined}>
        <ScrollView
          scrollEnabled={showScroll}
          showsVerticalScrollIndicator={showScroll}
          nestedScrollEnabled
        >
          <View
            onLayout={(e) => setContentHeight(e.nativeEvent.layout.height)}
          >
            <RenderHtml
              contentWidth={width - 28}
              source={{ html }}
              baseStyle={{ color: text, fontSize: 14, lineHeight: 22 }}
            />
          </View>
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
