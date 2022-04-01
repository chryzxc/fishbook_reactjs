import React, { useContext, useState } from "react";
import ReactRoundedImage from "react-rounded-image";
import profile from "../assets/github.jpg";
import { UserContext } from "../contexts/UserContext";
import { db } from "../config/firebase";
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
import DateFormat from "../utils/DateFormat";
import { useGetUserInfo } from "../hooks/useGetUserData";
import { info } from "autoprefixer";

const row =
  "flex flex-row w-[100%] mt-1 text-sm rounded-lg hover:bg-neutral-200 pl-1 pr-2 pb-1 pt-1";

export default function NotificationSection() {
  const { user, dispatch } = useContext(UserContext);

  const notifications = user.notifications;
  const notifications_list = [];

  const [userId, setUserId] = useState(() => {
    if (localStorage.getItem("user-token") !== "") {
      return localStorage.getItem("user-token");
    }
  });

  if (notifications) {
  
    Object.keys(notifications).map((id) => {
      if (notifications[id]) {
        notifications_list.push({
          id: id,
          type: notifications[id].type,
          date_confirmed: notifications[id].date_confirmed,
          notifications_from: notifications[id].notifications_from,
        });
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

  const RequestSentAccepted = ({data}) => {
    const info = useGetUserInfo(data.notifications_from);
   
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
            <p className="font-bold">{`${info.firstname} ${info.lastname} accepted your friend request`}</p>
            <div className="flex flex-row text-xs text-neutral-500">
              <p className="text-blue-500"><DateFormat date={data.date_confirmed} addSuffix/></p>
            </div>
          </div>
          <div className="text-blue-500 mt-auto mb-auto text-2xl">
            <p>●</p>
          </div>
        </div>
      </div>
    );
  };


  const RequestReceivedAccepted = ({data}) => {

    const info = useGetUserInfo(data.id);
    
  

   

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
            <p className="font-bold">{`You are now friends with ${info.firstname} ${info.lastname}`}</p>
            <div className="flex flex-row text-xs text-neutral-500">
              <p className="text-blue-500"><DateFormat date={data.date_confirmed} addSuffix={true}/></p>
            </div>
          </div>
          <div className="text-blue-500 mt-auto mb-auto text-2xl">
            <p>●</p>
          </div>
        </div>
      </div>
    );
  };

  const FriendRequest = ({ id, date_requested }) => {
    const [fullname, setFullname] = useState("");
    const [dateRequested, setDateRequested] = useState("");
   
    const dbRef = ref(db);
    get(child(dbRef, "users/" + id))
      .then((snapshot) => {
        if (snapshot.exists()) {
          setFullname(`${snapshot.val().firstname} ${snapshot.val().lastname}`);
        }
      })
      .catch((error) => {
        console.error(error);
      });

    const handleAcceptButton = () => {
      dispatch({
        type: "ACCEPT_FRIEND_REQUEST",
        request: {
          receiver_id: userId,
          sender_id: id,
        },
      });
    };

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
              <p className="text-blue-500">
                <DateFormat date={date_requested} addSuffix={true} />
              </p>
            </div>
            <div className="flex flex-row mt-2 w-[100%]">
              <button
                className="bg-[#1877F1]  w-full p-3 m-1 text-white text-sm font-normal rounded-lg"
                onClick={() => handleAcceptButton()}
              >
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

            {friend_requests &&
              Object.keys(friend_requests).map((id) => (
             
                <FriendRequest
                  id={id}
                  date_requested={friend_requests[id].date_requested}
                />
              ))}

            {/* {friend_requests_list && friend_requests_list.map((id) => <FriendRequest id={id}/>)} */}
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
        {notifications_list.map((notification) => {
        

          if (notification.type === "friend_request_sent_accepted") {
            return <RequestSentAccepted data={notification}/>;
          }
          if (notification.type === "friend_request_received_accepted") {
            return <RequestReceivedAccepted data={notification}/>;
          }
        })}
        {/* <SharedPost />
      
        <Others /> */}
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
