import React, { useContext, useState, useEffect } from "react";
import styled from "styled-components";
import ReactRoundedImage from "react-rounded-image";

import { UserContext } from "../contexts/UserContext";

import { FaRegImages, FaRegSmile, FaVideo, FcGallery } from "react-icons/fa";
import { ref, set, push, update } from "firebase/database";
import { db, storage } from "../config/firebase";
import { RiCloseFill } from "react-icons/ri";
import Modal from "react-modal";
import { uploadBytes, ref as storageRef } from "firebase/storage";
import { FaGlobeAsia } from "react-icons/fa";
import { useGetUserProfilePicture } from "../hooks/useGetUserData";
import { CREATE_POST } from "./Actions";

const CreatePostCard = styled.div`
  overflow-y: hidden;
  overflow-x: hidden;
  background-color: white;
  margin: 5px;
  height: auto;
  width: ${(props) => props.data.width};

  // width: 37vw;
  min-height: auto;

  margin-top: 10px;
  border-radius: 10px;
  box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.2), 0 1px 1px 0 rgba(0, 0, 0, 0.19);
`;

const Divider = styled.hr`
  border-top: 1pt solid #bbb;
  //margin-left: 20px;
  // margin-right: 20px;
  margin-top: 10px;
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
  width: auto;
  background-color: #f0f2f5;
  border-radius: 15px;
  height: auto;
  padding: 10px;
  font-size: large;
  color: #65676b;
  margin: 10px;

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

const FeelingList = styled.ul`
  columns: 2;
  -webkit-columns: 2;
  -moz-columns: 2;
`;

const CreatePost = ({ handleRefresh, data }) => {
  const { user, userContextId, FetchUserData, dispatch } =
    useContext(UserContext);
  const [caption, setCaption] = useState("");

  const [selectedFile, setSelectedFile] = useState();
  const [isFilePicked, setIsFilePicked] = useState(false);

  const [content, setContent] = useState();
  const [contentName, setContentName] = useState();

  const [feeling, setFeeling] = useState("");

  const [openModal, setOpenModal] = useState(false);



  const handleOpenFeelingModal = () => {
    setOpenModal(true);
  };

  const handleCloseFeelingModal = () => {
    document.body.style.overflow = "auto";
    setOpenModal(false);
  };

  let inputContent = "";

  const handleContent = (e) => {
    inputContent.click();
    return false;
  };

  const handleFeeling = ({ postEmoji, postFeeling }) => {
    if (feeling === `${postEmoji} feeling ${postFeeling}`) {
      setFeeling("");
    } else {
      setFeeling(`${postEmoji} feeling ${postFeeling}`);
    }
    document.body.style.overflow = "auto";

    setOpenModal(false);
  };

  const updateContents = (e) => {
    setContent({
      file_path: e.target.files[0],
      date_uploaded: Date.now(),
    });

    setContentName(e.target.files[0].name);
  };

  const handleCaptionListener = (e) => {
    setCaption(e.target.value);
  };

  const modalStyle = {
    content: {
      top: "30%",
      left: "50%",
      right: "20px",
      bottom: "20%",
      ariaHideApp: false,
      transform: "translate(-50%, -30%)",
    },
  };

  const submitPost = (e) => {
    e.preventDefault();

    const post = {
      user_id: user.id,
      caption: caption,
      date_posted: Date.now(),
      feeling: feeling,
    };

    const dbRef = ref(db, "posts/");
    const newPost = push(dbRef);

    CREATE_POST({
      setContent,
      setCaption,
      handleRefresh,
      data: {
        newPost: newPost,
        post: post,
        content: content,
      },
    });

    // dispatch({
    //   type: "CREATE_POST",
    //   setContent,
    //   setCaption,
    //   handleRefresh,
    //   data: {
    //     newPost: newPost,
    //     post: post,
    //     content: content,
    //   },
    // });
  };

  const FeelingModal = () => {
    const feelingList = [
      { postEmoji: "😀", postFeeling: "happy" },
      { postEmoji: "🥰", postFeeling: "loved" },
      { postEmoji: "😍", postFeeling: "lovely" },
      { postEmoji: "🤩", postFeeling: "excited" },
      { postEmoji: "😵", postFeeling: "crazy" },
      { postEmoji: "😌", postFeeling: "blissful" },
      { postEmoji: "😛", postFeeling: "blessed" },
      { postEmoji: "😔", postFeeling: "sad" },
      { postEmoji: "😊", postFeeling: "thankful" },
      { postEmoji: "😍", postFeeling: "in love" },
      { postEmoji: "😘", postFeeling: "grateful" },
      { postEmoji: "😇", postFeeling: "fantastic" },
      { postEmoji: "😛", postFeeling: "silly" },
      { postEmoji: "😊", postFeeling: "wonderful" },
      { postEmoji: "😅", postFeeling: "amused" },
      { postEmoji: "🤔", postFeeling: "positive" },
      { postEmoji: "😏", postFeeling: "hopeful" },
      { postEmoji: "🤗", postFeeling: "tired" },
      { postEmoji: "🤭", postFeeling: "festive" },
      { postEmoji: "😝", postFeeling: "cool" },
      { postEmoji: "😔", postFeeling: "relaxed" },
      { postEmoji: "😕", postFeeling: "chill" },
      { postEmoji: "🤧", postFeeling: "joyful" },
      { postEmoji: "😯", postFeeling: "motivated" },
      { postEmoji: "🥺", postFeeling: "proud" },
      { postEmoji: "🥺", postFeeling: "thoughtful" },
      { postEmoji: "🥺", postFeeling: "nostalgic" },
      { postEmoji: "🥺", postFeeling: "sick" },
      { postEmoji: "🥺", postFeeling: "drained" },
      { postEmoji: "🥺", postFeeling: "confident" },
      { postEmoji: "🥺", postFeeling: "motivated" },
      { postEmoji: "🥺", postFeeling: "alone" },
      { postEmoji: "🥺", postFeeling: "ok" },
      { postEmoji: "🥺", postFeeling: "angry" },
      { postEmoji: "🥺", postFeeling: "delighted" },
      { postEmoji: "🥺", postFeeling: "emotional" },
      { postEmoji: "🥺", postFeeling: "aweosme" },
      { postEmoji: "🥺", postFeeling: "great" },
    ];

    const Feelings = ({ postEmoji, postFeeling }) => {
      const selectedFeeling = `${postEmoji} feeling ${postFeeling}`;

      return (
        <>
          {feeling === selectedFeeling ? (
            <div
              className="flex flex-row mt-2 mb-2 mr-1 ml-1 p-3 rounded-2xl bg-slate-200 hover:bg-slate-200 "
              onClick={() => handleFeeling({ postEmoji, postFeeling })}
            >
              <div className="p-2 bg-[#E4E6EB] rounded-full">
                <p className="text-xl">{postEmoji}</p>
              </div>

              <li className="self-center ml-2">{postFeeling}</li>
            </div>
          ) : (
            <div
              className="flex flex-row m-1 p-3 hover:bg-slate-200 rounded-2xl"
              onClick={() => handleFeeling({ postEmoji, postFeeling })}
            >
              <div className="p-2 bg-[#E4E6EB] rounded-full">
                <p className="text-xl">{postEmoji}</p>
              </div>

              <li className="self-center ml-2">{postFeeling}</li>
            </div>
          )}
        </>
      );
    };

    return (
      <div>
        <Modal
          isOpen={handleOpenFeelingModal}
          // onAfterOpen={afterOpenModal}
          onRequestClose={handleCloseFeelingModal}
          style={modalStyle}
          ariaHideApp={false}
          // ariaHideApp={true}
          contentLabel=""
        >
          <div>
            <p className="font-bold text-black text-xl text-center">
              How are you feeling today?
            </p>
            <Divider></Divider>
            <FeelingList className="p-2">
              {feelingList.map((feeling) => (
                <Feelings
                  postEmoji={feeling.postEmoji}
                  postFeeling={feeling.postFeeling}
                />
              ))}
            </FeelingList>
          </div>
        </Modal>
      </div>
    );
  };

  return (
    <div>
      {openModal ? (
        <FeelingModal
          handleOpenFeelingModal={handleOpenFeelingModal}
          handleCloseFeelingModal={handleCloseFeelingModal}
        />
      ) : (
        ""
      )}

      <form onSubmit={submitPost}>
        <CreatePostCard data={data}>
          <div className="mt-5">
            <div className="mt-3 ml-3 flex flex-row">
              <ReactRoundedImage
                image={user.profile_picture}
                roundedSize="0"
                imageWidth="50"
                imageHeight="50"
              ></ReactRoundedImage>
              <div className="ml-2">
                {feeling ? (
                  <div className="flex flex-row">
                    <p className="font-semibold text-sm ml-1">{`${user.firstname} ${user.lastname}`}</p>
                    <p className="ml-1 text-center text-sm">{`is ${feeling}`}</p>
                  </div>
                ) : (
                  <p className="font-semibold text-sm ml-1">{`${user.firstname} ${user.lastname}`}</p>
                )}

                <div className="text-neutral-700 mt-[2px] rounded-lg bg-[#E4E6E9] pt-1 pb-1 pl-2 pr-2  w-fit h-auto text-xs font-medium flex flex-row justify-center">
                  <FaGlobeAsia className="self-center" />
                  <p className="text-center ml-[3px] font-semibold ">Public</p>
                </div>
              </div>
            </div>

            <WritePost>
              <TextArea
                placeholder={"What's on your mind, " + user.firstname + "?"}
                value={caption}
                onChange={(e) => {
                  handleCaptionListener(e);
                }}
              ></TextArea>
              {content ? (
                <div className="ml-1 flex flex-row bg-[#e0e1e4] rounded-full w-fit pl-2 pr-2 pt-1 pb-1 hover:bg-[#fff]">
                  <p className=" text-xs font-bold text-left">
                    Attachment: {contentName}
                  </p>
                  <div
                    className="ml-1 bg-[#F4556F] text-white rounded-full"
                    onClick={() => setContent()}
                  >
                    <RiCloseFill className="h-4 w-4" />
                  </div>
                </div>
              ) : (
                ""
              )}
            </WritePost>
          </div>
          <div>
            <Divider className="ml-3 mr-3" />
          </div>
          <div className="ml-4 mr-4 mb-5 mt-5">
            <div className="flex flex-row justify-around">
              <div
                className="flex flex-row justify-center w-[100%] hover:bg-[#E4E6E9] rounded-xl p-2"
                onClick={() => {
                 
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

              <div
                className="flex flex-row w-[100%] justify-center hover:bg-[#E4E6E9] rounded-xl p-2"
                onClick={() => {
                  document.body.style.overflow = "hidden";
                  setOpenModal(true);
                }}
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
    </div>
  );
};

export default CreatePost;
