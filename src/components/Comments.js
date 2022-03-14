import React, { useState, useEffect, useContext } from "react";

import storyimage from "../assets/2.jpg";
import profile from "../assets/1.jpg";
import ReactRoundedImage from "react-rounded-image";
import db from "../others/firebase";
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

import { format } from "date-fns";

export default function Comments({ commentData }) {
  const dbRef = ref(db);
  const commentId = commentData.comment_id;
  const comment = commentData.comment;
  const datePosted = commentData.date_posted;
  const userId = commentData.user_id;

  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");

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
      <div className="flex flex-row pl-5 pr-5 pt-2 pb-4">
        <ReactRoundedImage
          image={profile}
          roundedSize="0"
          imageWidth="40"
          imageHeight="40"
        ></ReactRoundedImage>
        <div className="w-[100%] ">
          <div className="text-[14px] pt-2 pb-2 pr-3 ml-3 mr-3 h-auto bg-[#F0F2F5] text-left pl-3 rounded-3xl">
            <p className="font-bold">{firstname + " " + lastname}</p>
            <p className="mt-0.5">{comment}</p>
          </div>
       
          <p className="text-left">10 hrs</p>
        </div>
      </div>
    </div>
  );
}
