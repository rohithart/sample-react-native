import React from 'react';
import type { ScrollViewProps } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';

type IScrollViewProps = ScrollViewProps & { className?: string };

const ScrollView = React.forwardRef<React.ComponentRef<typeof KeyboardAwareScrollView>, IScrollViewProps>(
  function ScrollView({ className, ...props }, ref) {
    return <KeyboardAwareScrollView ref={ref} className={className} bottomOffset={20} {...props} />;
  }
);

ScrollView.displayName = 'ScrollView';
export { ScrollView };
