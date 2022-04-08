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
  remove,
  update,
} from "firebase/database";
import { useState } from "react";
import { db, storage } from "../config/firebase";
import { uploadBytes, ref as storageRef } from "firebase/storage";

export const userReducer = (state, action) => {
  switch (action.type) {
    case "SET_USER":
      return {
        id: action.user.id,
        firstname: action.user.firstname,
        lastname: action.user.lastname,
        email: action.user.email,
        date_registered: action.user.date_registered,
        friend_requests: action.user.friend_requests,
        notifications: action.user.notifications,
        friends: action.user.friends,
        profile_picture: action.user.profile_picture,
      };

   

    // case "CREATE_POST":
    //   return set(
    //     action.data.newPost,
    //     action.data.post,
    //     action.data.content,
    //     action.setCaption,
    //     action.setContent,
    //     action.handleRefresh
    //   )
    //     .then(async () => {
    //       action.setCaption("");
    //       console.log("ado");

    //       if (action.data.content) {
    //         const dbRef = ref(db, `posts/${action.data.newPost.key}/contents`);
    //         const newContent = push(dbRef);

    //         update(newContent, action.data.content).then(async () => {
    //           const contentRef = storageRef(
    //             storage,
    //             `posts/${action.data.newPost.key}/${newContent.key}.jpeg`
    //           );

    //           await uploadBytes(contentRef, action.data.content.file_path)
    //             .then((snapshot) => {
    //               console.log(
    //                 "Uploaded a blob or file!" + action.data.content.file_path
    //               );
    //               action.setContent();
    //               action.handleRefresh();
    //             })
    //             .catch((error) => {
    //               console.log("upload error : " + error);
    //             });
    //         });
    //       } else {
    //         action.handleRefresh();
    //       }
    //     })
    //     .catch((error) => {
    //       console.log(error);
    //     });

    // case "SEND_FRIEND_REQUEST":
    //   return set(
    //     ref(
    //       db,
    //       `users/${action.request.receiver_id}/friend_requests/${action.request.sender_id}`
    //     ),
    //     {
    //       seen: false,
    //       date_requested: Date.now(),
    //     }
    //   )
    //     .then(() => {})
    //     .catch((error) => {});

    // case "CANCEL_FRIEND_REQUEST":
    //   return remove(
    //     ref(
    //       db,
    //       `users/${action.request.receiver_id}/friend_requests/${action.request.sender_id}`
    //     ),
    //     {}
    //   )
    //     .then(() => {})
    //     .catch((error) => {});

    // case "ACCEPT_FRIEND_REQUEST":
    //   return update(
    //     ref(
    //       db,
    //       `users/${action.request.receiver_id}/friends/${action.request.sender_id}`
    //     ),
    //     {
    //       date_confirmed: Date.now(),
    //     }
    //   ).then(() => {
    //     update(
    //       ref(
    //         db,
    //         `users/${action.request.sender_id}/friends/${action.request.receiver_id}`
    //       ),
    //       {
    //         date_confirmed: Date.now(),
    //       }
    //     ).then(() => {
    //       const dbRef = ref(
    //         db,
    //         `users/${action.request.receiver_id}/notifications/`
    //       );
    //       const newId = push(dbRef);
    //       update(
    //         newId,

    //         {
    //           type: "friend_request_received_accepted",
    //           date_confirmed: Date.now(),
    //           notifications_from: action.request.sender_id,
    //         }
    //       ).then(() => {
    //         const dbRef = ref(
    //           db,
    //           `users/${action.request.sender_id}/notifications/`
    //         );
    //         const newId = push(dbRef);
    //         update(newId, {
    //           type: "friend_request_sent_accepted",
    //           date_confirmed: Date.now(),
    //           notifications_from: action.request.receiver_id,
    //         }).then(
    //           remove(
    //             ref(
    //               db,
    //               `users/${action.request.receiver_id}/friend_requests/${action.request.sender_id}`
    //             )
    //           )
    //         );
    //       });
    //     });
    //   });

    // case "DELETE_FRIEND_REQUEST":
    //   return remove(
    //     ref(
    //       db,
    //       `users/${action.request.receiver_id}/friend_requests/${action.request.sender_id}`
    //     )
    //   )
    //     .then(() => {})
    //     .catch((error) => {});


    default:
      return state;
  }
};
