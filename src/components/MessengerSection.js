import React ,{useContext}from "react";
import { UserContext } from "../contexts/UserContext";
import MessengerRow from "./MessengerRow";

export default function MessengerSection() {
  const { user, FetchUserData } = useContext(UserContext);
  let friends_list = [];

  Object.keys(user.friends).map((id) => {
    if (user.friends[id]) {
      friends_list.push(id);
    }
  });

  console.log("friends:"+friends_list);

  return (
    <div className="">
      <div className="flex flex-row p-3 ">
        <p className="font-extrabold text-black text-2xl tracking-wider">Chats</p>
      </div>
      <div className="ml-3 mr-3 rounded-2xl p-1 bg-[#E4E6E9] text-sm mb-2">
        <input className="m-0 p-1 pl-2 w-[100%] bg-transparent border-none" placeholder="Search"></input>
      </div>

      <ul className="w-[100%]">

        {friends_list && friends_list.map((id)=> <MessengerRow id={id}/>)}
      </ul>
    </div>
  );
}
