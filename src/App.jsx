import "./App.css";

import { Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import HotelsProvider from "./components/context/HotelsProvider";

import Header from "./components/Header/Header";
import LocationList from "./components/LocationList/LocationList";
import AppLayout from "./components/AppLayout/AppLayout";

function App() {
  return (
    <HotelsProvider>
      <Toaster />
      <Header />
      <Routes>
        <Route path="/" element={<LocationList />} />
        <Route path="/hotels" element={<AppLayout />}>
          <Route index element={<div>Hotels</div>} />
          <Route path=":id" element={<div>single hotel</div>} />
        </Route>
      </Routes>
    </HotelsProvider>
  );
}

export default App;
