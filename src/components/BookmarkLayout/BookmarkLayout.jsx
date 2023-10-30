import { Outlet } from "react-router-dom";

import { useBookmark } from "../context/BookmarkListProvider";

import Map from "../Map/Map";

const BookmarkLayout = () => {
  const { bookmarks } = useBookmark();

  return (
    <div className="appLayout">
      <div className="sidebar">
        <Outlet />
      </div>
      <Map markerLocations={bookmarks} />
    </div>
  );
};

export default BookmarkLayout;
