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

export function CREATE_POST(action) {
  return set(
    action.data.newPost,
    action.data.post,
    action.data.content,
    action.setCaption,
    action.setContent,
    action.handleRefresh
  )
    .then(async () => {
      action.setCaption("");

      if (action.data.content) {
        const dbRef = ref(db, `posts/${action.data.newPost.key}/contents`);
        const newContent = push(dbRef);

        update(newContent, action.data.content).then(async () => {
          const contentRef = storageRef(
            storage,
            `posts/${action.data.newPost.key}/${newContent.key}.jpeg`
          );

          await uploadBytes(contentRef, action.data.content.file_path)
            .then((snapshot) => {
              console.log(
                "Uploaded a blob or file!" + action.data.content.file_path
              );
              action.setContent();
              action.handleRefresh();
            })
            .catch((error) => {
              console.log("upload error : " + error);
            });
        });
      } else {
        action.handleRefresh();
      }
    })
    .catch((error) => {
      console.log(error);
    });
}

export function SEND_FRIEND_REQUEST(action) {
  return set(
    ref(
      db,
      `users/${action.request.receiver_id}/friend_requests/${action.request.sender_id}`
    ),
    {
      seen: false,
      date_requested: Date.now(),
    }
  )
    .then(() => {})
    .catch((error) => {});
}

export function CANCEL_FRIEND_REQUEST(action) {
  return remove(
    ref(
      db,
      `users/${action.request.receiver_id}/friend_requests/${action.request.sender_id}`
    ),
    {}
  )
    .then(() => {})
    .catch((error) => {});
}

export function ACCEPT_FRIEND_REQUEST(action) {
  return update(
    ref(
      db,
      `users/${action.request.receiver_id}/friends/${action.request.sender_id}`
    ),
    {
      date_confirmed: Date.now(),
    }
  ).then(() => {
    update(
      ref(
        db,
        `users/${action.request.sender_id}/friends/${action.request.receiver_id}`
      ),
      {
        date_confirmed: Date.now(),
      }
    ).then(() => {
      const dbRef = ref(
        db,
        `users/${action.request.receiver_id}/notifications/`
      );
      const newId = push(dbRef);
      update(
        newId,

        {
          type: "friend_request_received_accepted",
          date_confirmed: Date.now(),
          notifications_from: action.request.sender_id,
        }
      ).then(() => {
        const dbRef = ref(
          db,
          `users/${action.request.sender_id}/notifications/`
        );
        const newId = push(dbRef);
        update(newId, {
          type: "friend_request_sent_accepted",
          date_confirmed: Date.now(),
          notifications_from: action.request.receiver_id,
        }).then(
          remove(
            ref(
              db,
              `users/${action.request.receiver_id}/friend_requests/${action.request.sender_id}`
            )
          )
        );
      });
    });
  });
}

export function DELETE_FRIEND_REQUEST(action) {
  return remove(
    ref(
      db,
      `users/${action.request.receiver_id}/friend_requests/${action.request.sender_id}`
    )
  )
    .then(() => {})
    .catch((error) => {});
}

export function SHARED_BY(action) {
  return update(ref(db, `posts/${action.post_id}/shared_by/${action.user_id}`), {
      date_shared: Date.now(),
    })
      .then(() => {})
      .catch((error) => {});
  };


export function SHARED_BY_NOTIFICATION(action) {
  return update(action.newId, {
      type: "shared_post",
      date_shared: Date.now(),
      notifications_from: action.sender_id,
    });
  };

