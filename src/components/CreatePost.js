import React, { useContext, useState, useEffect } from "react";
import styled from "styled-components";
import ReactRoundedImage from "react-rounded-image";

import { UserContext } from "../contexts/UserContext";
import photo from "../assets/github.jpg";
import { FaRegImages, FaRegSmile, FaVideo } from "react-icons/fa";
import { ref, push } from "firebase/database";
import { db } from "../config/firebase";
import { RiCloseFill, RiArrowLeftLine } from "react-icons/ri";
import Modal from "react-modal";

import { FaGlobeAsia } from "react-icons/fa";

import { CREATE_POST, SHARED_BY, SHARED_BY_NOTIFICATION } from "./Actions";
import SharedPostContent from "./SharedPostContent";

// const CreatePostCard = styled.div`
//   overflow-y: hidden;
//   overflow-x: hidden;
//   background-color: white;
//   margin: 5px;
//   height: auto;
//   width: ${(props) => props.data.width};

//   // width: 37vw;
//   min-height: auto;

//   margin-top: 10px;
//   border-radius: 10px;
//   box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.2), 0 1px 1px 0 rgba(0, 0, 0, 0.19);
// `;

const Divider = styled.hr`
  border-top: 1pt solid #bbb;
  //margin-left: 20px;
  // margin-right: 20px;
  margin-top: 10px;
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
  height: auto;
  padding: 5px;
  box-sizing: border-box;
  border: none;
  border-radius: none;
  background-color: transparent;
  resize: none;
  margin-top: 10px;
  font-size: 20px;
`;

const FeelingList = styled.ul`
  columns: 2;
  -webkit-columns: 2;
  -moz-columns: 2;
`;

const NumberOfLikes = styled.p`
  text-align: end;
  justify-self: end;
`;

const CreatePost = ({ handleRefresh, data, setOpenPostModal, sharedPost }) => {
  console.log("shared: " + JSON.stringify(sharedPost));
  const { user, userContextId, FetchUserData, dispatch } =
    useContext(UserContext);
  const [caption, setCaption] = useState("");

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
    innerHeight: "auto",
    content: {
      top: "30%",
      left: "50%",
      right: "180px",
      bottom: "0%",
      ariaHideApp: false,
      transform: "translate(-50%, -35%)",
      borderRadius: "10px",
    },
  };
  // const modalStyle = {
  //   content: {
  //     top: "30%",
  //     left: "50%",
  //     right: "20px",
  //     bottom: "20%",
  //     ariaHideApp: false,
  //     transform: "translate(-50%, -30%)",
  //   },
  // };

  const submitPost = (e) => {
    e.preventDefault();

    const post = {
      user_id: user.id,
      caption: caption,
      date_posted: Date.now(),
      feeling: feeling,
      shared_post: sharedPost.shared ? sharedPost.data.shared_post_id : null,
    };

    const dbRef = ref(db, "posts/");
    const newPost = push(dbRef);

    if (sharedPost.shared) {
      SHARED_BY({
        user_id: user.id,
        post_id: sharedPost.data.shared_post_id,
      });

      const dbRef = ref(
        db,
        `users/${sharedPost.data.shared_post_user_id}/notifications/`
      );
      const newId = push(dbRef);

      SHARED_BY_NOTIFICATION({
        sender_id: user.id,
        newId: newId,
      });
    }

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
      { postEmoji: "????", postFeeling: "happy" },
      { postEmoji: "????", postFeeling: "loved" },
      { postEmoji: "????", postFeeling: "lovely" },
      { postEmoji: "????", postFeeling: "excited" },
      { postEmoji: "????", postFeeling: "crazy" },
      { postEmoji: "????", postFeeling: "blissful" },
      { postEmoji: "????", postFeeling: "blessed" },
      { postEmoji: "????", postFeeling: "sad" },
      { postEmoji: "????", postFeeling: "thankful" },
      { postEmoji: "????", postFeeling: "in love" },
      { postEmoji: "????", postFeeling: "grateful" },
      { postEmoji: "????", postFeeling: "fantastic" },
      { postEmoji: "????", postFeeling: "silly" },
      { postEmoji: "????", postFeeling: "wonderful" },
      { postEmoji: "????", postFeeling: "amused" },
      { postEmoji: "????", postFeeling: "positive" },
      { postEmoji: "????", postFeeling: "hopeful" },
      { postEmoji: "????", postFeeling: "tired" },
      { postEmoji: "????", postFeeling: "festive" },
      { postEmoji: "????", postFeeling: "cool" },
      { postEmoji: "????", postFeeling: "relaxed" },
      { postEmoji: "????", postFeeling: "chill" },
      { postEmoji: "????", postFeeling: "joyful" },
      { postEmoji: "????", postFeeling: "motivated" },
      { postEmoji: "????", postFeeling: "proud" },
      { postEmoji: "????", postFeeling: "thoughtful" },
      { postEmoji: "????", postFeeling: "nostalgic" },
      { postEmoji: "????", postFeeling: "sick" },
      { postEmoji: "????", postFeeling: "drained" },
      { postEmoji: "????", postFeeling: "confident" },
      { postEmoji: "????", postFeeling: "motivated" },
      { postEmoji: "????", postFeeling: "alone" },
      { postEmoji: "????", postFeeling: "ok" },
      { postEmoji: "????", postFeeling: "angry" },
      { postEmoji: "????", postFeeling: "delighted" },
      { postEmoji: "????", postFeeling: "emotional" },
      { postEmoji: "????", postFeeling: "aweosme" },
      { postEmoji: "????", postFeeling: "great" },
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
          onAfterClose={() => (document.body.style.overflow = "hidden")}
          // onAfterOpen={afterOpenModal}
          onRequestClose={handleCloseFeelingModal}
          style={modalStyle}
          ariaHideApp={false}
          // ariaHideApp={true}
          contentLabel=""
        >
          <div>
            <div
              className="absolute border-[1px] border-neutral-300 self-center ml-[-1px] p-1 left-5 top-4  bg-[#E4E6E9] rounded-full flex flex-row items-center hover:bg-neutral-300"
              onClick={() => {
                handleCloseFeelingModal();
              }}
            >
              <RiArrowLeftLine className="h-6 w-6" />
            </div>

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
    <div className="p-0 m-0 text-center text-sm">
      {openModal ? (
        <FeelingModal
          handleOpenFeelingModal={handleOpenFeelingModal}
          handleCloseFeelingModal={handleCloseFeelingModal}
        />
      ) : (
        ""
      )}

      <div
        className="absolute border-[1px] border-neutral-300 self-center p-1 right-5 top-4 bg-[#E4E6E9] rounded-full flex flex-row items-center hover:bg-neutral-300"
        onClick={() => {
          document.body.style.overflow = "auto";
          setOpenPostModal(false);
        }}
      >
        <RiCloseFill className="h-6 w-6" />
      </div>

      <p className="font-bold text-black text-xl text-center">
        {sharedPost.shared ? "Share a post" : "Write a post"}
      </p>

      <Divider></Divider>

      <form onSubmit={submitPost}>
        <div data={data}>
          <div className="mt-1 ">
            <div className="mt-3 ml-3 mb-2 flex flex-row">
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

            <TextArea
              placeholder={"What's on your mind, " + user.firstname + "?"}
              value={caption}
              onChange={(e) => {
                handleCaptionListener(e);
              }}
            ></TextArea>

            <div
              className={`${
                sharedPost.shared ? "h-[40vh] overflow-y-scroll" : null
              }`}
            >
              {sharedPost.shared ? (
                <SharedPostContent sharedPost={sharedPost} />
              ) : null}
            </div>

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
          </div>
          {/* <div>
            <Divider className="ml-3 mr-3" />
          </div> */}
          <div className="mt-5">
            <div className="mb-2 flex flex-row justify-between border-neutral-300 border-[1px] p-1 rounded-xl">
              <div className="text-[13px] text-center mt-auto mb-auto ml-2 font-semibold text-neutral-600">
                <p>Add to your post</p>
              </div>

              <div className="flex flex-row">
                {/* <div
                  className="flex flex-row justify-center w-[100%] hover:bg-[#E4E6E9] rounded-xl p-2"
                  onClick={() => {}}
                >
                  <FaVideo
                    className="self-center h-6 w-6"
                    style={{ color: "#F4556F", fontSize: "1.5em" }}
                  ></FaVideo>
                </div> */}

                {!sharedPost.shared ? (
                  <div
                    className="flex flex-row w-[100%] justify-center hover:bg-[#E4E6E9] rounded-xl p-2"
                    onClick={(e) => handleContent(e.target)}
                  >
                    <FaRegImages
                      className="self-center h-6 w-6"
                      style={{ color: "#45BD61", fontSize: "1.5em" }}
                    ></FaRegImages>

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
                ) : null}

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
                </div>
              </div>
            </div>

            {/* <div className="flex flex-row justify-around">
              <div
                className="flex flex-row justify-center w-[100%] hover:bg-[#E4E6E9] rounded-xl p-2"
                onClick={() => {}}
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
            </div> */}

            <div className="w-full h-auto">
              <button
                className={
                  caption
                    ? `m-auto self-center border-none bg-[#1877f2] text-white rounded-[6px] font-light mt-1 p-2 w-full`
                    : `m-auto self-center border-none bg-neutral-300 text-white rounded-[6px] font-light mt-1 p-2 w-full `
                }
                type="submit"
                disabled={caption ? false : true}
              >
                {sharedPost.shared ? "Share" : "Post"}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreatePost;
