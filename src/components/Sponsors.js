import React from "react";
import storyimage from "../assets/2.jpg";

export default function Sponsors() {
  return (
    <div className="flex flex-row text-neutral-800 mt-3">
      <div className="rounded-sm">
        <img src={storyimage} className="w-[100px] h-[100px] rounded-xl" />
      </div>
      <div className="self-center ml-2 mr-2">
        <p className="text-[15px] font-semibold">Github</p>
        <p className="">github.com/chryzxc</p>
      </div>
    </div>
  );
}
