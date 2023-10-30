import { useState } from "react";

export default function useGeoLocation() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const [position, setPosition] = useState({});

  function getPosition() {
    if (!navigator.geolocation)
      return setError("Your browser does not support geolocation");

    setIsLoading(true);

    // https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/getCurrentPosition
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        setPosition({ lat: coords.latitude, lng: coords.longitude });
        setIsLoading(false);
      },
      (error) => {
        setError(error.message);
        setIsLoading(false);
      }
    );
  }
  return { isLoading, error, position, getPosition };
}
