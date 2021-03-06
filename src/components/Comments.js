import React, { useState, useEffect, useContext } from "react";

import storyimage from "../assets/2.jpg";
import profile from "../assets/1.jpg";
import ReactRoundedImage from "react-rounded-image";
import {db} from "../config/firebase";
import {
  AiOutlineLike,
  AiFillLike,
  AiOutlineMessage,
  AiOutlineRetweet,
  AiOutlineSend,
} from "react-icons/ai";
import { BsArrowReturnRight } from "react-icons/bs";
import { ImForward } from "react-icons/im";

import {
  ref,
  set,
  push,
  getDatabase,
  child,
  get,
  equalTo,
  orderByChild,
  onValue,
  update,
  onChildAdded,
  onChildChanged,
  onChildRemoved,
  updateChildren,
  remove,
} from "firebase/database";
import { UserContext } from "../contexts/UserContext";
import { format } from "date-fns";
import Replies from "./Replies";
import DateFormat from "../utils/DateFormat";
import { useGetUserProfilePicture } from "../hooks/useGetData";

export default function Comments({ commentData }) {
  const { user } = useContext(UserContext);
  const dbRef = ref(db);
  const postId = commentData.post_id;
  const commentId = commentData.comment_id;
  const comment = commentData.comment;
  const datePosted = commentData.date_posted;
  const userId = commentData.user_id;
  // const commentReactors = commentData.comment_reactors;

  const [numOfReacts, setNumOfReacts] = useState(0);
  const [reactors, setReactors] = useState([]);
  const [reacted, setReacted] = useState(false);

  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");

  const [showReplies, setShowReplies] = useState(false);
  const [showReplyBox, setShowReplyBox] = useState(false);

  const [replies, setReplies] = useState([]);
  const [numberOfReplies, setNumberOfReplies] = useState(0);

  const my_profile_picture = useGetUserProfilePicture(userId);

  const handleReplyComment = () => {
    if (showReplyBox) {
      setShowReplyBox(!showReplyBox);
    } else {
      setShowReplyBox(!showReplyBox);
    }
  };

  const handleReactComment = () => {
    if (reacted) {
      remove(
        ref(
          db,
          "posts/" +
            postId +
            "/comments/" +
            commentId +
            "/reacted_users/" +
            user.id
        )
      );
    } else {
      update(
        ref(
          db,
          "posts/" +
            postId +
            "/comments/" +
            commentId +
            "/reacted_users/" +
            user.id
        ),
        {
          date_reacted: Date.now(),
        }
      );
    }

    // setPostUpdate(postUpdate + 1);
  };

  useEffect(() => {
    setReacted(false);
    async function fetchData() {
      get(child(dbRef, `users/${userId}`))
        .then((snapshot) => {
          if (snapshot.exists()) {
            setFirstname(snapshot.val().firstname);
            setLastname(snapshot.val().lastname);
          } else {
            console.log("No data available");
          }
        })
        .catch((error) => {
          console.error(error);
        });

      // Get reactors of in comments //
      onValue(
        child(dbRef, `posts/${postId}/comments/${commentId}/reacted_users`),
        async (snapshot) => {
          const data = snapshot.val();
          if (snapshot.exists()) {
            let reacted_users = [];

            await snapshot.forEach((data) => {
              reacted_users.push(data.key);
            });
            if (reacted_users.includes(user.id)) {
              setReacted(true);
            } else {
              setReacted(false);
            }
            setReactors(reacted_users);
          } else {
            setReactors([]);
            setReacted(false);
          }
        }
      );

      // get(child(dbRef, `posts/${post.post_id}/liked_users`))
      // .then((snapshot) => {
      //   if (snapshot.exists()) {
      //     let reacts = 0;
      //     let reactors = [];
      //     snapshot.forEach((data) => {
      //       reactors.push(data.key);
      //       reacts += 1;
      //     });
      //     setReactors(reactors);
      //     setNumOfReacts(reacts);

      //     setReacted(reactors.includes(user.id));
      //   } else {
      //     setReacted(false);
      //     setNumOfReacts(0);
      //   }
      // })
      // .catch((error) => {
      //   console.error(error);
      // });

      await onValue(
        child(dbRef, `posts/${postId}/comments/${commentId}/replies`),
        (snapshot) => {
          const data = snapshot.val();
          if (snapshot.exists()) {
            let replies = [];
            let numOfReplies = 0;
            snapshot.forEach((data) => {
              const replyDetails = {
                post_id: postId,
                reply_id: data.key,
                reply: data.val().reply,
                date_posted: data.val().date_posted,
                user_id: data.val().user_id,
              };

              replies.push(replyDetails);
              replies.reverse();
              numOfReplies += 1;
            });
            setReplies(replies);
            setNumberOfReplies(numOfReplies);
          } else {
            setNumberOfReplies(0);
          }
        }
      );
    }
    fetchData();
  }, []);

  const handleShowReplies = () => {
    if (showReplies) {
      setShowReplies(!showReplies);
    } else {
      setShowReplies(!showReplies);
    }
  };

  const ShowReplyBox = () => {
    const [myReply, setMyReply] = useState("");
    const handleReplyListener = (e) => {
      setMyReply(e.target.value);
    };

    const submitReply = (e) => {
      e.preventDefault();

      const replyData = {
        user_id: user.id,
        reply: myReply,
        date_posted: Date.now(),
      };

      const dbRef = ref(db, `posts/${postId}/comments/${commentId}/replies`);
      const newReply = push(dbRef);

      set(newReply, replyData)
        .then(() => {
          setMyReply("");
          setShowReplies(true);

          //handleRefresh();
        })
        .catch((error) => {
          console.log(error);
        });
    };

    return (
      <div className="w-[100%] ml-3 mb-[-10px] mt-[-5px]">
        <div className="p-4 flex flex-row ">
          <div className="self-center">
            <ReactRoundedImage
              image={my_profile_picture}
              roundedSize="0"
              imageWidth="30"
              imageHeight="30"
            ></ReactRoundedImage>
          </div>

          {myReply ? (
            <div className="ml-3 pl-1 w-[100%] pr-3 flex flex-row rounded-3xl bg-[#F0F2F5] border-transparent">
              <input
                className=" w-[100%] rounded-3xl bg-[#F0F2F5] border-transparent placeholder-neutral-500 "
                onChange={(e) => {
                  handleReplyListener(e);
                }}
                value={myReply}
              ></input>
              <div
                className="flex flex-row p-2 self-center mr-[-5px]  text-neutral-600 rounded-full hover:bg-[#E4E6E9]"
                onClick={submitReply}
              >
                <p className="self-center mr-1 font-bold">Send</p>
                <AiOutlineSend className="h-6 w-6"></AiOutlineSend>
              </div>
            </div>
          ) : (
            <div className="w-[100%] pr-3">
              <input
                className="pl-3 ml-3 w-[100%] rounded-3xl bg-[#F0F2F5] border-transparent placeholder-neutral-500 hover:bg-[#E4E6E9]"
                placeholder={`Reply to  ${firstname} ${lastname}`}
                onChange={(e) => {
                  handleReplyListener(e);
                }}
                value={myReply}
              ></input>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="text-xs" >
      <div className="flex flex-row pl-5 pr-5 mb-2">
        <div className="w-auto mt-1">
          <ReactRoundedImage
            image={my_profile_picture}
            roundedSize="0"
            imageWidth="30"
            imageHeight="30"
          ></ReactRoundedImage>
        </div>

        <div className="w-[100%]">
          <div className="text-[14px] pt-2 pb-2 pr-3 ml-3 mr-3 w-fit h-auto bg-[#F0F2F5] text-left pl-3 rounded-3xl">
            <p className="clickable-text font-bold">
              {firstname + " " + lastname}
            </p>
            <p className="mt-0.5 ml-0.5 mb-1">{comment}</p>

            {reactors.length === 0 ? (
              ""
            ) : (
              <div className="mb-[-8px] text-right mr-[-30px] flex flex-row justify-end">
                <div className="bg-[#fff] flex flex-row  justify-center items-center shadow-lg rounded-full p-[3px]">
                  <div className="bg-[#1877f2] rounded-full p-[3px]">
                    <AiFillLike className="fill-white h-2.5 w-2.5"></AiFillLike>
                  </div>
                  <p className="self-center text-center text-[10px] mr-1 ml-1 font-semibold">
                    {reactors.length}
                  </p>
                </div>
              </div>
            )}
          </div>

          <div className="flex flex-row text-left ml-5 mt-1 text-xs font-semibold">
            {reacted ? (
              <p
                className="clickable-text ml-2 text-[#1877f2]"
                onClick={() => handleReactComment()}
              >
                Liked
              </p>
            ) : (
              <p
                className="clickable-text ml-2"
                onClick={() => handleReactComment()}
              >
                Like
              </p>
            )}

            <p
              className="clickable-text ml-4"
              onClick={() => {
                handleReplyComment();
              }}
            >
              Reply
            </p>
            <p className="ml-4 font-normal text-neutral-500"><DateFormat date={datePosted}/></p>
          </div>

          {numberOfReplies ? (
            <div className="ml-10 mt-3 text-left flex flex-row items-center font-semibold">
              <ImForward className="h-4 w-4 text-neutral-800" />
              <p
                className="clickable-text text-center self-center mt-0.5 ml-1 "
                onClick={handleShowReplies}
              >
                {" "}
                {numberOfReplies && numberOfReplies + " Replies"}
              </p>
            </div>
          ) : (
            ""
          )}

          {/* List of replies */}
          {showReplies
            ? replies &&
              replies.map((replyData) => (
                <Replies
                  key={replyData.reply.id}
                  replyData={replyData}
                ></Replies>
              ))
            : ""}

          {/* Reply Box*/}
          {showReplyBox ? <ShowReplyBox /> : ""}
        </div>
      </div>
    </div>
  );
}
