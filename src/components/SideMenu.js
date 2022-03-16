import React,{useContext} from "react";
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
import { UserContext } from "../context/UserContext";


export default function SideMenu() {
  const font = "ml-2 font-bold text-sm self-center";
  const row = "flex flex-row mt-5";
  const icon = "h-8 w-8 self-center";

  const { user } = useContext(UserContext);

  return (
    <div className="w-[auto] text-left ml-4 m-2">
      <div className="flex flex-row mt-3">
        <img src={logo} className={icon} alt=""></img>
        <p className={font}>{`${user.firstname} ${user.lastname}`}</p>
      </div>

      <div className={row}>
        <FcBarChart className={icon} />
        <p className={font}>Blank</p>
      </div>

      <div className={row}>
        <FcBearish className={icon} />
        <p className={font}>Blank</p>
      </div>

      <div className={row}>
        <FcBookmark className={icon} />
        <p className={font}>Blank</p>
      </div>

      <div className={row}>
        <FcBriefcase className={icon} />
        <p className={font}>Blank</p>
      </div>

      <div className={row}>
        <FcConferenceCall className={icon} />
        <p className={font}>Blank</p>
      </div>

      <div className={row}>
        <FcSearch className={icon} />
        <p className={font}>Blank</p>
      </div>

      <div className={row}>
        <FcSportsMode className={icon} />
        <p className={font}>Blank</p>
      </div>

      <div className={row}>
        <FcVideoCall className={icon} />
        <p className={font}>Blank</p>
      </div>

      <div className={row}>
        <FcSettings className={icon} />
        <p className={font}>Blank</p>
      </div>

      <div className={row}>
        <FcBullish className={icon} />
        <p className={font}>Blank</p>
      </div>
    </div>
  );
}
