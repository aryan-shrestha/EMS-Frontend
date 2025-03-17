import { useState, useEffect } from "react";

/**
 * Interface representing the state of geolocation.
 */
interface GeolocationState {
  latitude: number | null;
  longitude: number | null;
  error: string | null;
}

/**
 * Custom hook to get the user's geolocation (latitude & longitude).
 *
 * @returns {GeolocationState} An object containing latitude, longitude, and error (if any).
 */
const useGeolocation = (): GeolocationState => {
  const [location, setLocation] = useState<GeolocationState>({
    latitude: null,
    longitude: null,
    error: null,
  });

  useEffect(() => {
    if (!navigator.geolocation) {
      setLocation((prev) => ({
        ...prev,
        error: "Geolocation is not supported by your browser",
      }));
      return;
    }

    /**
     * Success handler for the geolocation API.
     *
     * @param {GeolocationPosition} position - The geolocation position object.
     */
    const successHandler = (position: GeolocationPosition) => {
      setLocation({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        error: null,
      });
    };

    /**
     * Error handler for the geolocation API.
     *
     * @param {GeolocationPositionError} error - The error object returned by the geolocation API.
     */
    const errorHandler = (error: GeolocationPositionError) => {
      setLocation((prev) => ({
        ...prev,
        error: error.message,
      }));
    };

    // Geolocation options
    const geoOptions: PositionOptions = {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 0,
    };

    // Start watching the user's location
    const watchId = navigator.geolocation.watchPosition(
      successHandler,
      errorHandler,
      geoOptions
    );

    // Cleanup function to stop watching when the component unmounts
    return () => navigator.geolocation.clearWatch(watchId);
  }, []);

  return location;
};

export default useGeolocation;
