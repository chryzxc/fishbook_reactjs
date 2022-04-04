import React from "react";
import Posts from "./Posts";

export default function View({ viewData }) {
  console.log("viewData: " + JSON.stringify(viewData));

  return (
    <div className="h-[100%] w-[100%] flex flex-row">
      <div className="h-[100vh] w-[80%] bg-slate-800">
          <img src={viewData.data.content} alt="photo" className="object-cover h-[100%]"></img>
        
      </div>
      <div className="h-[100vh] ">
        <Posts post={viewData.data.post}/>
      </div>
    </div>
  );
}
