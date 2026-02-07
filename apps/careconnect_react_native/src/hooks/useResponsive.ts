import { useMemo } from 'react';
import { useWindowDimensions } from 'react-native';

export function useResponsive() {
  const { width, height, fontScale, scale } = useWindowDimensions();

  return useMemo(() => {
    const isTablet = Math.min(width, height) >= 768;
    return { width, height, fontScale, scale, isTablet };
  }, [width, height, fontScale, scale]);
}
