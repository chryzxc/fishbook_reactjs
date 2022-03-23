import Home from "./Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserContextProvider from "../contexts/UserContext.js";
import SideNav from "./SideNav";
import SideMenu from "./SideMenu";
import Profile from "./Profile";
import styled from "styled-components";
import { useEffect, useState } from "react";

const Float = styled.div`
  // background-color: brown;
  // display: fixed;
  float: left;
  display: block;
  overflow: auto;
  //height: 100%;
  // width: 400px;
  width: auto;
  position: fixed;
  z-index: 2;
  height: 100vh;

  // left: 0;
  // top: 0;
`;

const Container = styled.div`
  position: fixed;
  width: auto;

  background-color: white;
  margin: auto;
  height: auto;
  //width: 300px;
  margin-left: 65px;
  min-height: auto;
  min-width: 300px;
  margin-top: 5px;
  border-radius: 7px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);

  z-index: 2;
`;

const Main = () => {
  const [showContainer, setShowContainer] = useState("home");

  useEffect(() => {}, [showContainer]);

  return (
    <UserContextProvider>
      <div className="flex flex-row">
        <Float>
          <SideNav
            setShowContainer={setShowContainer}
            showContainer={showContainer}
          />
        </Float>
        <div className="w-[auto]">
          {showContainer === "messenger" ? (
            <div>
              <Container>
                <div className="p-3">
                  <div className="flex flex-row ">
                    <p className="font-extrabold text-black text-xl ">Chatss</p>
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
          )}

          {/* // <Home/> */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Profile" element={<Profile />} />
          </Routes>
        </div>
      </div>
    </UserContextProvider>
  );
};

export default Main;
