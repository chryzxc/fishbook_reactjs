import React, { useContext } from "react";


import {
  FcBarChart,
  FcBearish,
  FcBookmark,
  FcBriefcase,
  FcConferenceCall,
  FcSearch,
  FcSportsMode,
  FcVideoCall,
  FcSettings,
  FcBullish,
} from "react-icons/fc";
import { RiArrowDownSLine } from "react-icons/ri";

import profile from "../assets/github.jpg";
import ReactRoundedImage from "react-rounded-image";
import { UserContext } from "../contexts/UserContext";
import { useNavigate } from "react-router-dom";
import { useGetUserProfilePicture } from "../hooks/useGetUserData";

export default function SideMenu() {
  const font = "ml-2 font-bold text-sm self-center";
  const row = "flex flex-row mt-2 p-2 hover:bg-[#E4E6E9] rounded-xl";
  const icon = "h-7 w-7 self-center";

  const { user ,userContextId } = useContext(UserContext);
  let navigate = useNavigate();
  const my_profile_picture = useGetUserProfilePicture(userContextId);
  
  const handleVisitProfile = () => {
    navigate("/Main/Profile/"+user.id);
  };
  

  return (
    <div
      className="w-[auto] text-left ml-[30px] m-1 "
     
    >
      <div className={row}  onClick={() => handleVisitProfile()}>
        <div className="self-center">
          <ReactRoundedImage
            image={my_profile_picture}
            roundedSize="0"
            imageWidth="30"
            imageHeight="30"
          />
        </div>

        <div>
          <p className={font}>{`${user.firstname} ${user.lastname}`}</p>
          <p className="ml-[7px] text-neutral-600 text-[12px] font-semibold">
            Not yet verified
          </p>
          <div className=" rounded-md p-[2px] ml-[5px] text-xs font-medium text-blue-500">
            <p>● Email verification not available</p>
          </div>
        </div>
      </div>

      <div className={row}>
        <FcBarChart className={icon} />
        <p className={font}>Not available</p>
      </div>

      <div className={row}>
        <FcBearish className={icon} />
        <p className={font}>Not available</p>
      </div>

      <div className={row}>
        <FcBookmark className={icon} />
        <p className={font}>Not available</p>
      </div>

      <div className={row}>
        <FcBriefcase className={icon} />
        <p className={font}>Not available</p>
      </div>

      <div className={row}>
        <FcSearch className={icon} />
        <p className={font}>Not available</p>
      </div>

      <div className={row}>
        <FcSportsMode className={icon} />
        <p className={font}>Not available</p>
      </div>

      <div className={row}>
        <FcSettings className={icon} />
        <p className={font}>Not available</p>
      </div>

      <div className={row}>
        <FcBullish className={icon} />
        <p className={font}>Not available</p>
      </div>

      <div className={row}>
        <div className="p-1 bg-[#E4E6EB] rounded-full">
          <RiArrowDownSLine className="h-5 w-5 self-center m-auto" />
        </div>

        <p className={font}>See more</p>
      </div>
    </div>
  );
}
