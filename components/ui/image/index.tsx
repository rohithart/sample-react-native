import React from 'react';
import { Image as RNImage } from 'react-native';
import type { ImageProps } from 'react-native';

type IImageProps = ImageProps & { className?: string };

const Image = React.forwardRef<React.ComponentRef<typeof RNImage>, IImageProps>(
  function Image({ className, ...props }, ref) {
    return <RNImage ref={ref} className={className} {...props} />;
  }
);

Image.displayName = 'Image';
export { Image };
