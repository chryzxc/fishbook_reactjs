import React, { useEffect, useState } from "react";
import ReactRoundedImage from "react-rounded-image";
import logo from "../assets/facebook.png";
import {
  RiHome3Fill,
  RiSearch2Line,
  RiNotification2Fill,
  RiMessengerFill,
  RiApps2Fill,
} from "react-icons/ri";
import styled from "styled-components";

const NavButtons =
  "h-5 w-5 absolute top-[25%] left-[25%] translate-[-25%,-25%]";
const spaceAbove = "mt-5";

const icon =
  "p-1 m-auto rounded-full bg-[#E4E6E9] h-10 w-10 relative hover:bg-[#C1C1C1]";

  const iconPressed = ""

  

export default function SideNav() {
  const [showContainer, setShowContainer] = useState("");

  useEffect(()=>{

   


  },[showContainer]);

 

  


  const navigationListener = (id) => {
    switch (id) {
      case "home":
        setShowContainer("home");
        return;
      case "search":
        setShowContainer("search");
        return;

      case "notification":
        setShowContainer("notification");
        return;

      case "messenger":
        setShowContainer("messenger");
        return;

      case "settings":
        setShowContainer("settings");
        return;
      default:
        setShowContainer("home");
    }
  };

  return (
    <div className="bg-white w-auto shadow-md text-[#050505] ">
      <ul className="m-1 p-2 items-center justify-center">
        <li>
          <div className="m-0.5">
            <ReactRoundedImage
              image={logo}
              roundedSize="0"
              imageWidth="40"
              imageHeight="40"
            />
          </div>
        </li>

        <li className={spaceAbove}>
          <div className={icon} onClick={() => navigationListener("home")}>
            <RiHome3Fill className={NavButtons} />
          </div>
        </li>
        <li className={spaceAbove}>
          <div className={icon} onClick={() => navigationListener("search")}>
            <RiSearch2Line className={NavButtons} />
          </div>
        </li>
        <li className={spaceAbove}>
          <div
            className={icon}
            onClick={() => navigationListener("notification")}
          >
            <RiNotification2Fill className={NavButtons} />
          </div>
        </li>
        <li className={spaceAbove}>
          <div className={icon} onClick={() => navigationListener("messenger")}>
            <RiMessengerFill className={NavButtons} />
          </div>
        </li>
        <li className={spaceAbove}>
          <div className={icon} onClick={() => navigationListener("settings")}>
            <RiApps2Fill className={NavButtons} />
          </div>
        </li>
      </ul>
    </div>
  );
}
