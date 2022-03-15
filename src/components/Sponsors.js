import React from "react";
import storyimage from "../assets/2.jpg";

export default function Sponsors({image}) {
  const openSponsoredLink = () => {
    console.log("clicked");
    window.open("https://www.github.com/chryzxc", '_blank', 'noopener,noreferrer');
  };
  return (
    <div
      className="flex flex-row text-neutral-800 p-3 hover:bg-[#E4E6E9] rounded-xl"
      onClick={()=>openSponsoredLink()}
    >
      <div className="rounded-sm w-full">
        <img src={image} className="w-[200px] h-[120px] rounded-xl object-cover" />
      </div>
      <div className="self-center ml-2 mr-2">
        <p className="text-[15px] font-semibold">Github</p>
        <p className="">github.com/chryzxc</p>
      </div>
    </div>
  );
}
