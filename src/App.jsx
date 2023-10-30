import "./App.css";

import { Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Header from "./components/Header/Header";
import LocationList from "./components/LocationList/LocationList";
import AppLayout from "./components/AppLayout/AppLayout";

function App() {
  return (
    <div>
      <Toaster />
      <Header />
      <Routes>
        <Route path="/" element={<LocationList />} />
        <Route path="/hotels" element={<AppLayout />}>
          <Route index element={<div>Hotels</div>} />
          <Route path=":id" element={<div>single hotel</div>} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
