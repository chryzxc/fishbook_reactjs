import React, { useContext, useState } from "react";
import styled from "styled-components";
import ReactRoundedImage from "react-rounded-image";
import profile from "../assets/1.jpg";
import { UserContext } from "../contexts/UserContext";
import storyimage from "../assets/2.jpg";
import { FaRegImages, FaRegSmile, FaVideo, FcGallery } from "react-icons/fa";
import { ref, set, push } from "firebase/database";
import db from "../others/firebase";
import FileBase64 from "react-file-base64";

const CreatePostCard = styled.div`
  overflow-y: hidden;
  overflow-x: hidden;
  background-color: white;
  margin: auto;
  height: auto;
  width: 37vw;
  min-height: auto;
  min-width: 37vw;
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

  height: auto;

  padding-bottom: 5px;
  justify-content: center;

  //padding: 5px;
`;

const WritePost = styled.div`
  width: 85%;
  background-color: #f0f2f5;
  border-radius: 25px;
  height: auto;
  padding: 10px;
  font-size: large;
  color: #65676b;
  margin-left: 10px;

  &:hover {
    background-color: #e4e6e9;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  height: auto;
  padding: 5px;
  box-sizing: border-box;
  border: none;
  border-radius: none;
  background-color: transparent;
  resize: none;
`;

const CreatePost = ({ handleRefresh }) => {
  const { user } = useContext(UserContext);
  const [caption, setCaption] = useState("");

  const handleCaptionListener = (e) => {
    setCaption(e.target.value);
  };

  const submitPost = (e) => {
    e.preventDefault();

    const post = {
      user_id: user.id,
      caption: caption,
      date_posted: Date.now(),
      contents: ["adqwe", "adqwewqe"],
    };

    const dbRef = ref(db, "posts/");
    const newPost = push(dbRef);

    set(newPost, post)
      .then(() => {
        setCaption("");
        console.log("post submitted");
        handleRefresh();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const uploadContent = () => {};

  return (
    <form onSubmit={submitPost}>
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
                value={caption}
                onChange={(e) => {
                  handleCaptionListener(e);
                }}
              ></TextArea>
            </WritePost>
          </Row>
        </div>
        <div>
          <Divider />
          <FileBase64 type="file" multiple={false} />
        </div>
        <div className="ml-4 mr-4 mb-5 mt-5">
          <div className="flex flex-row justify-around">
            <div
              className="flex flex-row justify-center w-[100%] hover:bg-[#E4E6E9] rounded-xl p-2"
              onClick={() => {
                console.log("clicked");
              }}
            >
              <FaVideo
                className="self-center h-6 w-6"
                style={{ color: "#F4556F", fontSize: "1.5em" }}
              ></FaVideo>
              <p className="self-center ml-2 font-bold text-sm text-gray-600 ">
                Live video
              </p>
            </div>

            <div className="flex flex-row w-[100%] justify-center hover:bg-[#E4E6E9] rounded-xl p-2">
              <FaRegImages
                className="self-center h-6 w-6"
                style={{ color: "#45BD61", fontSize: "1.5em" }}
              ></FaRegImages>
              <p className="self-center ml-2 font-bold text-sm text-gray-600">
                Photos/Videos
              </p>
            </div>

            <div className="flex flex-row w-[100%] justify-center hover:bg-[#E4E6E9] rounded-xl p-2">
              <FaRegSmile
                className="self-center h-6 w-6"
                style={{ color: "#F7B927", fontSize: "1.5em" }}
              ></FaRegSmile>
              <p className="self-center ml-2 font-bold text-sm text-gray-600">
                Feeling/activity
              </p>
            </div>
          </div>

          {caption ? (
            <div className="w-full h-auto">
              <button
                className="m-auto self-center border-none bg-[#1877f2] text-white rounded-[6px] font-light mt-1 p-2 w-full "
                type="submit"
              >
                Post
              </button>
            </div>
          ) : (
            ""
          )}
        </div>
      </CreatePostCard>
    </form>
  );
};

export default CreatePost;
