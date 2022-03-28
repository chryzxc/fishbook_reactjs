import React from "react";
import ReactRoundedImage from "react-rounded-image";
import logo from "../assets/facebook.png";
export default function MessengerRow() {
  return (
    <div className="flex flex-row w-[100%] mt-1 rounded-lg hover:bg-neutral-200 p-2">
      <div>
        <ReactRoundedImage
          image={logo}
          roundedSize="0"
          imageWidth="50"
          imageHeight="50"
        />
      </div>
      <div className="flex flex-row justify-between w-[100%]">
        <div className="text-left ml-2 mt-auto mb-auto">
          <p className="font-bold">Christian</p>
          <div className="flex flex-row text-xs text-neutral-500">
            <p className="">First messeage</p>
            <p className="ml-1 mr-1">●</p>
            <p>11 mins</p>
          </div>
        </div>
        <div className="text-blue-500 mt-auto mb-auto text-2xl">
          <p>●</p>
        </div>
      </div>
    </div>
  );
}