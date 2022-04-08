import React, { useContext, useState } from "react";
import Divider from "./defaults/Divider";

import styled from "styled-components";
import ReactRoundedImage from "react-rounded-image";

import { UserContext } from "../contexts/UserContext";
import { FaRegImages, FaRegSmile, FaVideo } from "react-icons/fa";

import Modal from "react-modal";
import CreatePost from "./CreatePost";

const CreatePostCard = styled.div`
  overflow-y: hidden;
  overflow-x: hidden;
  background-color: white;
  margin: 5px;
  height: auto;

  width: 35rem;
  min-height: auto;

  margin-top: 10px;
  border-radius: 10px;
  box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.2), 0 1px 1px 0 rgba(0, 0, 0, 0.19);
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;

  height: auto;

  padding-bottom: 5px;
  // justify-content: center;

  //padding: 5px;
`;

const WritePost = styled.div`
  background-color: #f0f2f5;
  border-radius: 15px;
  height: auto;
  padding: 10px;
  font-size: large;
  color: #65676b;

  &:hover {
    background-color: #e4e6e9;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  height: 40px;
  padding: 5px;
  box-sizing: border-box;
  border: none;
  border-radius: none;
  background-color: transparent;
  resize: none;
`;

export default function PostSection() {
  const { user } = useContext(UserContext);
  const [openPostModal, setOpenPostModal] = useState();

  const modalStyle = {
    content: {
      top: "35%",
      left: "50%",
      right: "180px",
      bottom: "0%",
      ariaHideApp: false,
      transform: "translate(-50%, -35%)",
    },
  };


  return (
    <div>
      {openPostModal ? (
        <Modal
          isOpen={() => setOpenPostModal(true)}
          // onAfterOpen={afterOpenModal}
          onRequestClose={() => setOpenPostModal(false)}
          style={modalStyle}
          ariaHideApp={false}
          // ariaHideApp={true}
          contentLabel=""
        >
          <CreatePost
            data={{
              width: "auto",
              minWidth: "auto",
            }}
            setOpenPostModal={setOpenPostModal}
          />
        </Modal>
      ) : (
        ""
      )}

      <CreatePostCard>
        <div className="pt-5">
          <div className=" pl-3 flex flex-row">
            <ReactRoundedImage
              image={user.profile_picture}
              roundedSize="0"
              imageWidth="55"
              imageHeight="50"
            ></ReactRoundedImage>
            <div className="w-full pl-2 pr-2">
              <WritePost  onClick={() => setOpenPostModal(true)}>
                <TextArea
                  placeholder={"What's on your mind, " + user.firstname + "?"}
                  onClick={() => setOpenPostModal(true)}
                  disabled="true"
                ></TextArea>
              </WritePost>
            </div>
          </div>
        </div>
        <div className="ml-3 mr-3 mt-3">
          <Divider />
        </div>
        <div className="ml-4 mr-4 mb-5 mt-2">
          <div className="flex flex-row justify-around">
            <div
              className="flex flex-row justify-center w-[100%] hover:bg-[#E4E6E9] rounded-xl p-2"
              onClick={() => setOpenPostModal(true)}
            >
              <FaVideo
                className="self-center h-6 w-6"
                style={{ color: "#F4556F", fontSize: "1.5em" }}
              ></FaVideo>
              <p className="self-center ml-2 font-bold text-sm text-gray-600 ">
                Live video
              </p>
            </div>

            <div
              className="flex flex-row w-[100%] justify-center hover:bg-[#E4E6E9] rounded-xl p-2"
              onClick={() => setOpenPostModal(true)}
            >
              <FaRegImages
                className="self-center h-6 w-6"
                style={{ color: "#45BD61", fontSize: "1.5em" }}
              ></FaRegImages>
              <p className="self-center ml-2 font-bold text-sm text-gray-600">
                Photos/Videos
              </p>
            </div>

            <div
              className="flex flex-row w-[100%] justify-center hover:bg-[#E4E6E9] rounded-xl p-2"
              onClick={() => setOpenPostModal(true)}
            >
              <FaRegSmile
                className="self-center h-6 w-6"
                style={{ color: "#F7B927", fontSize: "1.5em" }}
              ></FaRegSmile>
              <p className="self-center ml-2 font-bold text-sm text-gray-600">
                Feeling/activity
              </p>
            </div>
          </div>
        </div>
      </CreatePostCard>
    </div>
  );
}
