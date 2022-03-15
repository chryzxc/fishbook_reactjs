import React from "react";
import storyimage from "../assets/2.jpg";

export default function FeedsFriendSuggestionList({users}) {
  console.log("data"+users.firstname);

  return (
    <div className="relative m-1 mt-[-5px] w-[180px] h-auto border-neutral-300 border-[0.5px] rounded-lg  text-neutral-500 mb-3">
      <img src={storyimage} className="w-[180px] h-[150px] rounded-t-lg" alt=""></img>
      <div className="ml-2 mr-2 h-[100%]">
        <p className="text-left font-bold text-black mt-2 text-sm">{users.firstname + " " + users.lastname}</p>
        <p className="text-left mt-[-2px] pb-10 mb-[30px]">2 mutual friends</p>
        <button className="bg-[#1877f2] p-[5px] w-[90%] text-white text-sm mb-2 mt-2 absolute bottom-[8px] left-[5%]">Add friend</button>
      </div>
    </div>
  );
}