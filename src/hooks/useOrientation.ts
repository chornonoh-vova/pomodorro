import { useEffect, useState } from 'react';
import { Dimensions } from 'react-native';

export const enum Orientation {
  PORTRAIT = 'PORTRAIT',
  LANDSCAPE = 'LANDSCAPE',
}

/**
 * Returns true if the screen is in portrait mode
 */
const isPortrait = () => {
  const dim = Dimensions.get('screen');
  return dim.height >= dim.width;
};

/**
 * A React Hook which updates when the orientation changes
 * @returns whether the user is in 'PORTRAIT' or 'LANDSCAPE'
 */
export function useOrientation(): Orientation {
  const [orientation, setOrientation] = useState<Orientation>(
    isPortrait() ? Orientation.PORTRAIT : Orientation.LANDSCAPE,
  );

  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', () =>
      setOrientation(
        isPortrait() ? Orientation.PORTRAIT : Orientation.LANDSCAPE,
      ),
    );

    return () => {
      subscription.remove();
    };
  }, []);

  return orientation;
}
