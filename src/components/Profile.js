import logo from "../assets/github.jpg";
import React from "react";

export default function Profile() {
  console.log("PROFUILE");
  return (
    <div className="h-[70vh] bg-slate-500 w-[100vw]">
      <div className="w-[60vw] h-[100%] bg-red-400 m-auto">
        <div>
            <img src={logo} alt="cover_photo" className="h-[60vh] w-[100vw]">
            </img>
        </div>
        <div className="flex flex-row justi">
          <div>
            <p>Test</p>
            <p>TEST1</p>
          </div>
        </div>
      </div>
    </div>
  );
}
