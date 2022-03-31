import React ,{useState} from "react";
import ReactRoundedImage from "react-rounded-image";
import profile from "../assets/1.jpg";
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
import {db} from "../config/firebase";
import DateFormat from "../utils/DateFormat";
import { useGetUserProfilePicture } from "../hooks/useGetUserData";

export default function Replies({ replyData }) {
  const postId = replyData.post_id;
  const replyId = replyData.reply_id;
  const reply = replyData.reply;
  const datePosted = replyData.date_posted;
  const userId = replyData.user_id;

  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const my_profile_picture = useGetUserProfilePicture(userId);
  const dbRef = ref(db);
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

  return (
    <div>
      <div className="flex flex-row pl-5 pr-5 pt-2 mt-[5px] ml-5">
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
            <p className="mt-0.5 ml-0.5 mb-2">{reply}</p>
          </div>
          <div className="flex flex-row text-left ml-2 text-xs font-semibold">
            {/* <p className="clickable-text ml-2">Like</p> */}
            {/* <p
              className="clickable-text ml-4"
              onClick={() => {
                //  handleReplyComment();
              }}
            >
              Reply
            </p> */}
            <p className="ml-4 font-normal text-gray-600"><DateFormat date={datePosted}/></p>
          </div>
        </div>
      </div>
    </div>
  );
}
