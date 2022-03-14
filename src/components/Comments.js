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

export default function Comments({ comment }) {
  return (
    <div className="flex flex-row pl-5 pr-5 pt-2 pb-4">
      <ReactRoundedImage
        image={profile}
        roundedSize="0"
        imageWidth="40"
        imageHeight="40"
      ></ReactRoundedImage>
      <div className=" pt-2 pb-2 pr-3 ml-3 mr-3 w-[100%] h-auto bg-[#F0F2F5] text-left pl-3 rounded-2xl">
        <p className="text-small">{comment.user_id}</p>
        <p >
          {comment.comment}
        </p>
      </div>
    </div>
  );
}
