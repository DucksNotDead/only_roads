import { useCallback } from "react";

export function useCurrentGeo() {
  const getPosition = useCallback(() => {
    return new Promise<GeolocationPosition>((resolve) => {
      window.navigator.geolocation.getCurrentPosition(resolve, (e) => {
        console.log('e',e);
      });
    });
  }, []);

  return { getPosition };
}
