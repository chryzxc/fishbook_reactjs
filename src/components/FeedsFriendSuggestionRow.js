import React from "react";
import storyimage from "../assets/2.jpg";

export default function FeedsFriendSuggestionList() {
  return (
    <div className="m-1 mt-[-5px] w-[170px] h-auto border-neutral-300 border-[0.5px] rounded-lg  text-neutral-500 mb-3">
      <img src={storyimage} className="w-[170px] h-[150px] rounded-t-lg"></img>
      <div className="ml-2 mr-2">
        <p className="text-left font-bold text-black mt-2 text-sm">Christian Rey Villablanca Villablanca</p>
        <p className="text-left mt-[-2px]">2 mutual friends</p>
        <button className="bg-[#1877f2] p-[5px] w-[90%] text-white text-sm mb-2 mt-2">Add friend</button>
      </div>
    </div>
  );
}
