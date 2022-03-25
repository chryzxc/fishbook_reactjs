import React from "react";
import MessengerRow from "./MessengerRow";

export default function MessengerSection() {
  return (
    <div className="">
      <div className="flex flex-row p-3 ">
        <p className="font-extrabold text-black text-2xl tracking-wider">Chats</p>
      </div>
      <div className="ml-3 mr-3 rounded-2xl p-1 bg-[#E4E6E9] text-sm mb-2">
        <input className="m-0 p-1 pl-2 w-[100%] bg-transparent border-none" placeholder="Search"></input>
      </div>

      <ul className="w-[100%]">
          <MessengerRow/>
          <MessengerRow/>
          <MessengerRow/>
          <MessengerRow/>
          <MessengerRow/>
          <MessengerRow/>
          <MessengerRow/>
          <MessengerRow/>
          <MessengerRow/>
          <MessengerRow/>
          <MessengerRow/>
      </ul>
    </div>
  );
}
