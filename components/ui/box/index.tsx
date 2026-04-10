import React from 'react';
import { View } from 'react-native';
import type { ViewProps } from 'react-native';

type IBoxProps = ViewProps & { className?: string };

const Box = React.forwardRef<React.ComponentRef<typeof View>, IBoxProps>(
  function Box({ className, ...props }, ref) {
    return <View ref={ref} className={className} {...props} />;
  }
);

Box.displayName = 'Box';
export { Box };
