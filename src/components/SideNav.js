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
import { useNavigate } from "react-router-dom";

const spaceAbove = "mt-5";

const icon =
  "p-1 m-auto rounded-full bg-[#E4E6E9] h-10 w-10 relative hover:bg-[#C1C1C1]";

  // className="p-0 m-0 overflow-hidden h-[100vh]"

const Container = styled.div`
  position: fixed;
  background-color: white;
  margin: 0;
  height: 100vh;
  padding:0;
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.2), 0 2px 1px 0 rgba(0, 0, 0, 0.19);
`;

const iconPressed = "";

 const SideNav = ({showContainer,setShowContainer}) => {
  let navigate = useNavigate();
 // const [showContainer, setShowContainer] = useState("home");


  const NavButtons = (props) => {
    if (props === showContainer) {
      return "h-5 w-5 absolute top-[25%] left-[25%] translate-[-25%,-25%] text-[#0371EE]";
    } else {
      return "h-5 w-5 absolute top-[25%] left-[25%] translate-[-25%,-25%]";
    }
  };

  // useEffect(() => {}, [showContainer]);

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
    <Container >
      {/* {showContainer === "messenger" ? (
        <div>
          <Container>
            <div className="p-3">
              <div className="flex flex-row ">
                <p className="font-extrabold text-black text-xl ">Chats</p>
              </div>
            </div>
          </Container>
        </div>
      ) : (
        ""
      )}

      {showContainer === "notification" ? (
        <div>
          <Container>
            <div className="p-3">
              <div className="flex flex-row ">
                <p className="font-extrabold text-black text-xl">
                  Notifications
                </p>
              </div>
            </div>
          </Container>
        </div>
      ) : (
        ""
      )} */}

      <div className="bg-white w-auto shadow-md text-[#050505] h-full overflow-hidden">
        <ul className="m-1 p-2 items-center justify-center">
          <li>
            <div className="m-0.5" onClick={() => navigate("/Main")}>
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
              <RiHome3Fill className={NavButtons("home")} />
            </div>
          </li>
          <li className={spaceAbove}>
            <div className={icon} onClick={() => navigationListener("search")}>
              <RiSearch2Line className={NavButtons("search")} />
            </div>
          </li>
          <li className={spaceAbove}>
            <div
              className={icon}
              onClick={() => navigationListener("notification")}
            >
              <RiNotification2Fill className={NavButtons("notification")} />
            </div>
          </li>
          <li className={spaceAbove}>
            <div
              className={icon}
              onClick={() => navigationListener("messenger")}
            >
              <RiMessengerFill className={NavButtons("messenger")} />
            </div>
          </li>

          <li className={spaceAbove}>
            <div
              className={icon}
              onClick={() => navigationListener("settings")}
            >
              <RiApps2Fill className={NavButtons("settings")} />
            </div>
          </li>
        </ul>
      </div>
    </Container>
  );
}
export default SideNav;