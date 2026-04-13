import { Shimmer } from './shimmer';

interface LoadingImageProps {
  /** Diameter in pixels. Defaults to 48. */
  size?: number;
  style?: object;
}

/**
 * A circular shimmer placeholder — drop-in replacement for a round avatar/image.
 */
export function LoadingImage({ size = 48, style }: LoadingImageProps) {
  return (
    <Shimmer
      style={[{ width: size, height: size }, style]}
      borderRadius={size / 2}
    />
  );
}
