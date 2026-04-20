import { RichText, Toolbar, useEditorBridge } from '@10play/tentap-editor';
import React from 'react';
import { KeyboardAvoidingView, Platform, StyleProp, View, ViewStyle } from 'react-native';
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
  style,
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

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={[{ flex: 1, minHeight }, style]}
      >
        <View style={{ flex: 1, borderWidth: 1, borderRadius: 8, overflow: 'hidden' }}>
          <RichText editor={editor} />
        </View>
        
        <Toolbar editor={editor} />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Wysiwyg;
