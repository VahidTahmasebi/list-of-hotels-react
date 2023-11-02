import useFetch from "../../hooks/useFetch";

import Loader from "../Loader/Loader";

const LocationList = () => {
  // const { isLoading, data } = useFetch("http://localhost:5000/hotels", "");
  const { isLoading, data } = useFetch(
    "https://api.npoint.io/a3ca200dd8f4b2737aff/hotels",
    ""
  );

  if (isLoading) return <Loader />;

  return (
    <div className="nearbyLocation">
      <h2>Nearby Locations</h2>
      <div className="locationList">
        {data.map((item) => {
          return (
            <div key={item.id} className="locationItem">
              <img src={item.picture_url.url} alt={item.name} />
              <div className="locationItemDesc">
                <p className="location">{item.smart_location}</p>
                <p className="name">{item.name}</p>
                <p className="price">
                  €&nbsp;{item.price}&nbsp;
                  <span>night</span>
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LocationList;
