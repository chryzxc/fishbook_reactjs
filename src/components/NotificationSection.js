import React, { useContext,useState } from "react";
import ReactRoundedImage from "react-rounded-image";
import profile from "../assets/github.jpg";
import { UserContext } from "../contexts/UserContext";
import { db } from "../others/firebase";
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

const row =
  "flex flex-row w-[100%] mt-1 text-sm rounded-lg hover:bg-neutral-200 pl-1 pr-2 pb-1 pt-1";

export default function NotificationSection() {
  const { user, dispatch } = useContext(UserContext);

  const notifications = user.notifications;
  const notifications_list = [];

  if (notifications) {
    Object.keys(notifications).map((key) => {
      if (notifications[key].type === "friend_request") {
        notifications_list.push(...notifications_list, {});
      }
    });
  }

  const SharedPost = () => {
    return (
      <div className={row}>
        <div>
          <ReactRoundedImage
            image={profile}
            roundedSize="0"
            imageWidth="50"
            imageHeight="50"
          />
        </div>
        <div className="flex flex-row justify-between w-[100%]">
          <div className="text-left ml-2 mt-auto mb-auto">
            <p className="font-bold">Christian shared a post</p>
            <div className="flex flex-row text-xs text-neutral-500">
              <p className="text-blue-500">5 mins ago</p>
            </div>
          </div>
          <div className="text-blue-500 mt-auto mb-auto text-2xl">
            <p>●</p>
          </div>
        </div>
      </div>
    );
  };

  const Others = () => {
    return (
      <div className={row}>
        <div>
          <ReactRoundedImage
            image={profile}
            roundedSize="0"
            imageWidth="50"
            imageHeight="50"
          />
        </div>
        <div className="flex flex-row justify-between w-[100%]">
          <div className="text-left ml-2 mt-auto mb-auto">
            <p className="font-bold">Good to see you</p>
            <div className="flex flex-row text-xs text-neutral-500">
              <p className="text-blue-500">1 seconds ago</p>
            </div>
          </div>
          <div className="text-blue-500 mt-auto mb-auto text-2xl">
            <p>●</p>
          </div>
        </div>
      </div>
    );
  };

  const RequestAccepted = () => {
    return (
      <div className={row}>
        <div>
          <ReactRoundedImage
            image={profile}
            roundedSize="0"
            imageWidth="50"
            imageHeight="50"
          />
        </div>
        <div className="flex flex-row justify-between w-[100%]">
          <div className="text-left ml-2 mt-auto mb-auto">
            <p className="font-bold">Christian accepted your friend request</p>
            <div className="flex flex-row text-xs text-neutral-500">
              <p className="text-blue-500">1 day ago</p>
            </div>
          </div>
          <div className="text-blue-500 mt-auto mb-auto text-2xl">
            <p>●</p>
          </div>
        </div>
      </div>
    );
  };

  const FriendRequest = ({id}) => {

    const [fullname,setFullname] = useState("");

    const dbRef = ref(db);
    get(child(dbRef, "users/" + id))
      .then((snapshot) => {
        if (snapshot.exists()) {
          setFullname(`${snapshot.val().firstname} ${snapshot.val().lastname}`)
        }
      })
      .catch((error) => {
        console.error(error);
      });

    return (
      <div className={row}>
        <div>
          <ReactRoundedImage
            image={profile}
            roundedSize="0"
            imageWidth="50"
            imageHeight="50"
          />
        </div>
        <div className="flex flex-row justify-between w-[100%]">
          <div className="text-left ml-2 mt-auto mb-auto w-[100%]">
            <p className="font-bold">{fullname} sent you a friend request</p>
            <div className="flex flex-row text-xs text-neutral-500">
              <p className="text-blue-500">4 days ago</p>
            </div>
            <div className="flex flex-row mt-2 w-[100%]">
              <button className="bg-[#1877F1]  w-full p-3 m-1 text-white text-sm font-normal rounded-lg">
                Confirm
              </button>
              <button className="bg-neutral-200 w-full p-3 m-1 text-black text-sm font-normal rounded-lg">
                Delete
              </button>
            </div>
          </div>
          {/* <div className="text-blue-500  text-2xl">
            <p>●</p>
          </div> */}
        </div>
        <div></div>
      </div>
    );
  };

  const FriendRequestArea = () => {
    const friend_requests = user.friend_requests;
    const friend_requests_list = [];

    if (friend_requests) {
      Object.keys(friend_requests).map((key) => {
        friend_requests_list.push(key);
      });
    }

    return (
      <div>
        {friend_requests_list.length !== 0 ? (
          
          <div>
            <p className="font-semibold text-neutral-700">Friend requests</p>

            {friend_requests_list && friend_requests_list.map((id) => <FriendRequest id={id}/>)}

           
          </div>
        ) : (
          ""
        )}
      </div>
    );
  };

  const NotificationsArea = () => {
    return (
      <div>
        <p className="font-semibold text-neutral-700">Others</p>
        <SharedPost />
        <RequestAccepted />
        <Others />
      </div>
    );
  };

  return (
    <div className="">
      <div className="flex flex-row p-3 ">
        <p className="font-extrabold text-black text-2xl tracking-wider">
          Notifications
        </p>
      </div>

      <ul className="w-[100%] pl-3">
        <FriendRequestArea />

        <NotificationsArea />
      </ul>
    </div>
  );
}
