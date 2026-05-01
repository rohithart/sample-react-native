import React from 'react';
import { ScrollView as RNScrollView } from 'react-native';
import type { ScrollViewProps } from 'react-native';

type IScrollViewProps = ScrollViewProps & { className?: string };

const ScrollView = React.forwardRef<React.ComponentRef<typeof RNScrollView>, IScrollViewProps>(
  function ScrollView({ className, ...props }, ref) {
    return <RNScrollView ref={ref} className={className} {...props} />;
  }
);

ScrollView.displayName = 'ScrollView';
export { ScrollView };
