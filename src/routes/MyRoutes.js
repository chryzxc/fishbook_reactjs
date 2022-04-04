import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../components/Home";

import Profile from "../components/Profile";
import View from "../components/View";

export default function MyRoutes({viewData,setViewData}) {
  return (
    <Routes>
   

      <Route path="/" element={<Home setViewData={setViewData}/>} />

      <Route path="/Profile/:profileId" element={<Profile setViewData={setViewData}/>} />
      <Route path="/View/" element={<View viewData={viewData}/>} />
    </Routes>
  );
}
