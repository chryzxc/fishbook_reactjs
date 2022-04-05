import React from "react";
import Container from "./defaults/Container";
import profile from "../assets/github.jpg";
import { useGetUserData, useGetUserInfo, useGetUserProfilePicture } from "../hooks/useGetUserData";
import { async } from "@firebase/util";

export default function Friends({ friends }) {


  const FriendsCard = ({id}) => {

     const {firstname , lastname} =  useGetUserInfo(id);


    return (
      <div className="p-1 h-[100%] w-[auto] ">
        <img
          src={useGetUserProfilePicture(id)}
          className=" h-[120px] w-[auto] object-cover rounded-lg border-[0.5px] border-neutral-200 "
        ></img>
        <p className="text-[12px] font-bold mt-1">{`${firstname} ${lastname}`}</p>
      </div>
    );
  };

  return (
    <div>
      <Container className="h-auto">
        <p className="font-black font-extrabold text-lg tracking-wider">
          Friends
        </p>
        <p className="text-xs">{friends.length !== 1 ? `${friends.length} friends` : `${friends.length} friend`}</p>

        <div className="grid grid-cols-3 gap-1">
          {friends && friends.map((id) => <FriendsCard id={id} />)}
        </div>
      </Container>
    </div>
  );
}
