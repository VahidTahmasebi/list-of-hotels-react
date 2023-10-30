import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";

import { useHotels } from "../context/HotelsProvider";
import useGeoLocation from "../../hooks/useGeoLocation";

const Map = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const { isLoading, hotels } = useHotels();

  const {
    isLoading: isLoadingPosition,
    position: geoLocationPosition,
    getPosition,
  } = useGeoLocation();

  const [mapCenter, setMapCenter] = useState([
    52.3683983335535, 4.901213818026321,
  ]);

  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");

  useEffect(() => {
    if (lat && lng) setMapCenter([lat, lng]);
  }, [lat, lng]);

  useEffect(() => {
    if (geoLocationPosition?.lat && geoLocationPosition?.lng)
      setMapCenter([geoLocationPosition.lat, geoLocationPosition.lng]);
  }, [geoLocationPosition]);

  return (
    <div className="mapContainer">
      <MapContainer
        center={mapCenter}
        zoom={13}
        scrollWheelZoom={true}
        className="map">
        <button onClick={getPosition} className="getLocation">
          {isLoadingPosition ? "Loading..." : "Use Your Location"}
        </button>

        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />

        <ChangeCenter position={mapCenter} />

        {hotels.map((item) => (
          <Marker key={item.id} position={[item.latitude, item.longitude]}>
            <Popup>{item.host_location}</Popup>
          </Marker>
        ))}
      </MapContainer>
      ,
    </div>
  );
};

export default Map;

//   change the center according to the user's choice
function ChangeCenter({ position }) {
  const map = useMap();
  map.setView(position);
  return null;
}
