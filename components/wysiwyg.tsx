import { useThemeColors } from '@/hooks/use-theme-colors';
import { RichText, Toolbar, useEditorBridge } from '@10play/tentap-editor';
import React from 'react';
import { KeyboardAvoidingView, StyleProp, ViewStyle } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export interface WysiwygProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  style?: StyleProp<ViewStyle>;
  minHeight?: number;
}

export const Wysiwyg: React.FC<WysiwygProps> = ({
  value,
  onChange,
  placeholder = 'Enter text...',
  minHeight = 150,
}) => {
  const editor = useEditorBridge({
    autofocus: true,
    avoidIosKeyboard: true,
    initialContent: value || `<p>${placeholder}</p>`, 
    onChange: async () => {
      const html = await editor.getHTML();
      onChange(html);
    },
  });

  const colors = useThemeColors();

  return (
    <SafeAreaView style={{ flex: 1, minHeight: 120, borderWidth: 1, borderColor: colors.border, borderRadius: 8, backgroundColor: colors.bg, marginBottom: 8 }}>
      <RichText editor={editor} />
      <KeyboardAvoidingView
        behavior={'padding'}
        style={{
          minHeight,
          position: 'absolute',
          width: '100%',
          bottom: 0,
        }}
      >
        <Toolbar editor={editor} />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
