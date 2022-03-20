import React, { useContext } from "react";
import logo from "../assets/facebook.png";
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
import profile from "../assets/1.jpg";
import ReactRoundedImage from "react-rounded-image";
import { UserContext } from "../contexts/UserContext";

export default function SideMenu() {
  const font = "ml-2 font-bold text-sm self-center";
  const row = "flex flex-row mt-2 p-2 hover:bg-[#E4E6E9] rounded-xl";
  const icon = "h-7 w-7 self-center";

  const { user } = useContext(UserContext);



  return (
    <div className="w-[auto] text-left ml-2 m-2 w-[60%]">
      <div className={row}>
        <ReactRoundedImage
          image={profile}
          roundedSize="0"
          imageWidth="30"
          imageHeight="30"
        />
        <p className={font}>{`${user.firstname} ${user.lastname}`}</p>
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
