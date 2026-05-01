import React from 'react';
import type { ViewProps } from 'react-native';
import { View as RNView } from 'react-native';

type IViewProps = ViewProps & { className?: string };

const View = React.forwardRef<React.ComponentRef<typeof RNView>, IViewProps>(
  function View({ className, ...props }, ref) {
    return <RNView ref={ref} className={className} {...props} />;
  }
);

View.displayName = 'View';
export { View };
