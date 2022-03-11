import React, { useContext } from "react";
import styled from "styled-components";
import ReactRoundedImage from "react-rounded-image";
import profile from "../assets/1.jpg";
import { UserContext } from "../context/UserContext";
import storyimage from "../assets/2.jpg";
import { FaRegImages, FaRegSmile, FaVideo, FcGallery } from "react-icons/fa";

const CreatePostCard = styled.div`
  overflow-y: hidden;
  overflow-x: hidden;
  background-color: white;
  margin: auto;
  height: auto;
  width: 80vh;
  min-height: auto;
  min-width: 80vh;
  margin-top: 20px;
  border-radius: 10px;
  box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.2), 0 1px 1px 0 rgba(0, 0, 0, 0.19);
`;

const Divider = styled.hr`
  border-top: 1pt solid #bbb;
  margin-left: 20px;
  margin-right: 20px;
  margin-top: 10px;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  height: auto;
  width: auto;
  margin-top: -10px;

  padding: 10px;
`;

const WritePost = styled.div`
  width: 80%;
  background-color: #e4e6e9;
  border-radius: 25px;
  height: auto;
  padding: 10px;
  font-size: large;
  color: #65676b;
  margin-left: 15px;
`;

const TextArea = styled.textarea`
  width: 100%;
  height: auto;
  padding: 12px 20px;
  box-sizing: border-box;
  border: none;
  border-radius: none;
  background-color: transparent;
  resize: none;
`;

const CreatePost = () => {
  const { user, FetchData } = useContext(UserContext);

  return (
    <CreatePostCard>
      <div className="mt-5">
        <Row>
          <div className="mt-3">
            <ReactRoundedImage
              image={profile}
              roundedSize="0"
              imageWidth="40"
              imageHeight="40"
            ></ReactRoundedImage>
          </div>

          <WritePost>
            <TextArea
              placeholder={"What's on your mind, " + user.firstname + "?"}
            ></TextArea>
          </WritePost>
        </Row>
      </div>
      <div>
        <Divider />
      </div>
      <div className="ml-10 mr-10 mb-2 mt-4">
        <div className="flex flex-row justify-around">
          <div
            className="flex flex-row justify-between"
            onClick={() => {
              console.log("clicked");
            }}
          >
            <FaVideo
              className="self-center h-6 w-6"
              style={{ color: "#F4556F", fontSize: "1.5em" }}
            ></FaVideo>
            <p className="self-center ml-2 font-bold text-sm text-gray-600">
              Live video
            </p>
          </div>

          <div className="flex flex-row justify-between">
            <FaRegImages
              className="self-center h-6 w-6"
              style={{ color: "#45BD61", fontSize: "1.5em" }}
            ></FaRegImages>
            <p className="self-center ml-2 font-bold text-sm text-gray-600">
              Photos/Videos
            </p>
          </div>

          <div className="flex flex-row justify-between">
            <FaRegSmile
              className="self-center h-6 w-6"
              style={{ color: "#F7B927", fontSize: "1.5em" }}
            ></FaRegSmile>
            <p className="self-center ml-2 font-bold text-sm text-gray-600">
              Feeling/activity
            </p>
          </div>
        </div>
        <div className="w-full">
          <button className="m-auto self-center border-none bg-[#1877f2] text-white rounded-[6px] font-light mt-3 p-2 w-full mb-2">
            Post
          </button>
        </div>
      </div>
    </CreatePostCard>
  );
};

export default CreatePost;
