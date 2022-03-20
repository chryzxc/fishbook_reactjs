import React, { useContext, useState } from "react";
import styled from "styled-components";
import ReactRoundedImage from "react-rounded-image";
import profile from "../assets/1.jpg";
import { UserContext } from "../contexts/UserContext";
import storyimage from "../assets/2.jpg";
import { FaRegImages, FaRegSmile, FaVideo, FcGallery } from "react-icons/fa";
import { ref, set, push, update } from "firebase/database";
import { db, storage } from "../others/firebase";
import { RiCloseFill } from "react-icons/ri";

import { uploadBytes, ref as storageRef } from "firebase/storage";

// Create a root reference

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

  const [selectedFile, setSelectedFile] = useState();
  const [isFilePicked, setIsFilePicked] = useState(false);

  const [contents, setContents] = useState();
  const [contentName, setContentName] = useState();

  let inputContent = "";

  const handleContent = (e) => {
    inputContent.click();
    return false;
  };

  const updateContents = (e) => {
    setContents({
      file_path: e.target.files[0],
      date_uploaded: Date.now(),
    });

    setContentName(e.target.files[0].name);
  };

  const handleCaptionListener = (e) => {
    setCaption(e.target.value);
  };

  const submitPost = (e) => {
    e.preventDefault();

    const post = {
      user_id: user.id,
      caption: caption,
      date_posted: Date.now(),
    };

    const dbRef = ref(db, "posts/");
    const newPost = push(dbRef);

    set(newPost, post)
      .then(async () => {
        setCaption("");
        

        await contents.forEach(async (content) => {
          const dbRef = ref(db, `posts/${newPost.key}/contents`);
          const newContent = push(dbRef);

          update(newContent, content).then(async () => {
            const contentRef = storageRef(
              storage,
              `posts/${newPost.key}/${newContent.key}.jpeg`
            );

            await uploadBytes(contentRef, content.file_path)
              .then((snapshot) => {
                console.log("Uploaded a blob or file!" + content.file_path);
              })
              .catch((error) => {
                console.log("upload error : " + error);
              });
          });
        });

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
              {contents?<div className="ml-1 flex flex-row bg-[#e0e1e4] rounded-full w-fit pl-2 pr-2 pt-1 pb-1 hover:bg-[#fff]">
                <p className=" text-xs font-bold text-left">
                  Attachment: {contentName}
                </p>
                <div className="ml-1 bg-[#F4556F] text-white rounded-full" onClick={() => setContents()}>
                  <RiCloseFill className="h-4 w-4"/>
                </div>
              </div> : "" }
              
            </WritePost>
          </Row>
        </div>
        <div>
          <Divider />
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

            <div
              className="flex flex-row w-[100%] justify-center hover:bg-[#E4E6E9] rounded-xl p-2"
              onClick={(e) => handleContent(e.target)}
            >
              <FaRegImages
                className="self-center h-6 w-6"
                style={{ color: "#45BD61", fontSize: "1.5em" }}
              ></FaRegImages>
              <p className="self-center ml-2 font-bold text-sm text-gray-600">
                Photos/Videos
              </p>
              <input
                onChange={(e) => updateContents(e)}
                ref={(input) => {
                  inputContent = input;
                }}
                type="file"
                name="file"
                className="hidden"
              />
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
