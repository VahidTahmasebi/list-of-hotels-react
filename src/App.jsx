import "./App.css";

import { Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import HotelsProvider from "./components/context/HotelsProvider";
import BookmarkListProvider from "./components/context/BookmarkListProvider";

import Header from "./components/Header/Header";
import LocationList from "./components/LocationList/LocationList";
import AppLayout from "./components/AppLayout/AppLayout";
import Hotels from "./components/Hotels/Hotels";
import SingleHotel from "./components/SingleHotel/SingleHotel";
import BookmarkLayout from "./components/BookmarkLayout/BookmarkLayout";
import Bookmark from "./components/Bookmark/Bookmark";

function App() {
  return (
    <BookmarkListProvider>
      <HotelsProvider>
        <Toaster />
        <Header />
        <Routes>
          <Route path="/" element={<LocationList />} />
          <Route path="/hotels" element={<AppLayout />}>
            <Route index element={<Hotels />} />
            <Route path=":id" element={<SingleHotel />} />
          </Route>
          <Route path="/bookmark" element={<BookmarkLayout />}>
            <Route index element={<Bookmark />} />

            <Route path="add" element={<div />} />
          </Route>
        </Routes>
      </HotelsProvider>
    </BookmarkListProvider>
  );
}

export default App;
