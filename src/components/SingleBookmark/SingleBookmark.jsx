import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ReactCountryFlag from "react-country-flag";

import { useBookmark } from "../context/BookmarkListProvider";

import Loader from "../Loader/Loader";

const SingleBookmark = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { isLoadingCurrBookmark, getBookmark, currentBookmark } = useBookmark();

  useEffect(() => {
    getBookmark(id);
  }, [id]);

  if (isLoadingCurrBookmark || !currentBookmark) return <Loader />;

  return (
    <div>
      <button onClick={() => navigate(-1)} className="btn btn--back">
        &larr; Back
      </button>
      <div className="bookmarkItem">
        <ReactCountryFlag svg countryCode={currentBookmark.countryCode} />
        &nbsp; <strong>{currentBookmark.cityName}</strong> &nbsp;
        <span>{currentBookmark.country}</span>
      </div>
    </div>
  );
};

export default SingleBookmark;
