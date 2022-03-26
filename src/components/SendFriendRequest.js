import React from 'react'
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
  } from "firebase/database";
  import { db } from "../others/firebase";

export default function SendFriendRequest({request}) {
    

    set(ref(db, `users/${request.receiver_id}/friend_requests/${request.sender_id}`), {
        seen: false,
        date_requested: Date.now(),
      })
      .then(() => {
        // Data saved successfully!
      })
      .catch((error) => {
        // The write failed...
      });
      



  return (
    <div>SendFriendRequest</div>
  )
}
