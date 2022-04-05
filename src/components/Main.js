import Home from "./Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserContextProvider from "../contexts/UserContext.js";
import SideNav from "./SideNav";
import SideMenu from "./SideMenu";
import Profile from "./Profile";
import styled from "styled-components";
import { useEffect, useState } from "react";
import MessengerSection from "./MessengerSection";
import NotificationSection from "./NotificationSection";
import MyRoutes from "../routes/MyRoutes";
import View from "./View";
import Modal from "react-modal";

const FloatingSideNav = styled.div`
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

const FloatingContainer = styled.div`
  position: fixed;

  background-color: white;
  margin: auto;

  height: 98%;
  width: 380px;
  margin-left: 65px;
  min-height: auto;
  min-width: 350px;
  margin-top: 5px;
  border-radius: 7px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  padding: 5px;
  z-index: 2;
  overflow: auto;
`;

const Main = () => {
  const [viewData, setViewData] = useState(null);
  const [showView, setShowView] = useState(false);
  console.log("showView: " + showView);

  const modalStyle = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };

  const handleOpenViewModal = () => {
    setShowView(true);
  };

  const handleCloseViewModal = () => {
    setShowView(false);
  };

  const SideNavigation = () => {
    const [showContainer, setShowContainer] = useState("home");
    const [isHomePage, setIsHomePage] = useState(true);
    useEffect(() => {}, [showContainer]);

    return (
      <>
        <FloatingSideNav>
          <SideNav
            isHomePage={isHomePage}
            setShowContainer={setShowContainer}
            showContainer={showContainer}
          />
        </FloatingSideNav>
        <div className="w-[100%]">
          {showContainer === "messenger" ? (
            <FloatingContainer>
              <MessengerSection />
            </FloatingContainer>
          ) : (
            ""
          )}

          {showContainer === "notification" ? (
            <div>
              <FloatingContainer>
                <NotificationSection />
              </FloatingContainer>
            </div>
          ) : (
            ""
          )}

          {/* // <Home/> */}
        </div>
      </>
    );
  };

  return (
    <UserContextProvider>
      <div className="flex flex-row"></div>
      <SideNavigation />
      <div>
        <MyRoutes
          viewData={viewData}
          setViewData={setViewData}
          setShowView={setShowView}
        />

        {showView ? (
          <Modal
            isOpen={handleOpenViewModal}
            // onAfterOpen={afterOpenModal}
            onRequestClose={handleCloseViewModal}
            style={modalStyle}
            // contentLabel="Sign up"
          >
            <div className="flex flex-row relative"></div>
            <View viewData={viewData} setShowView={setShowView} />
          </Modal>
        ) : (
          ""
        )}

        {/* <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Profile/:profileId" element={<Profile />} />
        </Routes> */}
      </div>
    </UserContextProvider>
  );
};

export default Main;
