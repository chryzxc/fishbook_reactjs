import React from 'react'
import { useGetUserProfilePicture } from '../hooks/useGetUserData'
import ReactRoundedImage from "react-rounded-image";

export default function ProfileFriends({id,index}) {
  
  return (
    <div className={`ml-[-10px] p-[2px] bg-white rounded-full z-[${index}] `}>
    <ReactRoundedImage
      image={useGetUserProfilePicture(id)}
      roundedSize="0"
      imageWidth="40"
      imageHeight="40"
    />
  </div>
  )
}
