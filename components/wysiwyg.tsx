import React from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';
import { EditorContent, Toolbar, useEditor } from 'tiptap-react-native';

export interface WysiwygProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  style?: StyleProp<ViewStyle>;
  minHeight?: number;
  toolbarProps?: any;
  editorProps?: any;
}

export const Wysiwyg: React.FC<WysiwygProps> = ({
  value,
  onChange,
  placeholder = 'Enter text...',
  style,
  minHeight = 100,
  toolbarProps = {},
  editorProps = {},
}) => {
  const editor = useEditor({
    content: value,
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
    extensions: [], // Add extensions as needed
  });

  return (
    <View style={[{ minHeight, borderWidth: 1, borderRadius: 8, padding: 8 }, style]}>
      <Toolbar editor={editor} {...toolbarProps} />
      <EditorContent
        editor={editor}
        style={{ minHeight, borderRadius: 8 }}
        placeholder={placeholder}
        {...editorProps}
      />
    </View>
  );
};

export default Wysiwyg;
