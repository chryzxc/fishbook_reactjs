
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
  remove
} from "firebase/database";
import { useState } from "react";
import { db } from "../others/firebase";


export const userReducer = (state, action) => {
  switch (action.type) {

    case "SET_USER":
     
      return  {
        id: action.user.id,
        firstname: action.user.firstname,
        lastname: action.user.lastname,
        email: action.user.email,
        date_registered: action.user.date_registered,
        friend_requests: action.user.friend_requests,
        notifications: action.user.notifications,
      };

      case "LOGIN_USER":
          return
     
    case "CREATE_POST":
      set(action.newPost, action.post)
        .then(() => {
          action.setCaption("");
          console.log("post submitted");
          action.handleRefresh();
        })
        .catch((error) => {
          console.log(error);
        });
      return;

      case "SEND_FRIEND_REQUEST":
        
        return set(ref(db, `users/${action.request.receiver_id}/friend_requests/${action.request.sender_id}`), {
          seen: false,
          date_requested: Date.now(),
        })
        .then(() => {
      
        })
        .catch((error) => {
         
        });

        case "CANCEL_FRIEND_REQUEST":
        
          return remove(ref(db, `users/${action.request.receiver_id}/friend_requests/${action.request.sender_id}`), {
          })
.then(() => {
        
          })
          .catch((error) => {
           
          });
      
    default:
      return state;
  }
};
