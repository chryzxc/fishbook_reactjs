import logo from "../assets/github.jpg";
import React, { useState, useContext, useEffect } from "react";
import ReactRoundedImage from "react-rounded-image";
import Container from "./defaults/Container";
import styled from "styled-components";
import CreatePost from "./CreatePost";
import Intro from "./Intro";
import useFetchProfilePost from "../hooks/useFetchProfilePost";

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
import Posts from "./Posts";
import {
  RiPencilFill,
  RiMessengerFill,
  RiUserAddFill,
  RiUserSharedFill,
  RiUserFollowFill,
} from "react-icons/ri";
import { UserContext } from "../contexts/UserContext";
import { useParams, useNavigate } from "react-router-dom";
import useGetUserData from "../hooks/useGetUserData";

const UpperSection = styled.div`
  height: 80%;
  box-shadow: 0 0px 0px 0 rgba(0, 0, 0, 0.2), 0 1px 1px 0 rgba(0, 0, 0, 0.19);
`;

const LowerSection = styled.div`
  background-color: #f0f2f5;
  height: auto;
  width: 100%;
  justify-content: center;
  margin-top: 1px;
  padding-bottom: 20px;
`;
const Profile = () => {
  const { profileId } = useParams();
  const { user, dispatch, FetchUserData } = useContext(UserContext);
  let navigate = useNavigate();
  const [userId, setUserId] = useState(() => {
    if (localStorage.getItem("user-token") !== "") {
      return localStorage.getItem("user-token");
    } else {
      navigate(-2);
    }
  });
  const dbRef = ref(db, "posts/");
  const [updateProfile, setUpdateProfile] = useState(0);

  const [firstname, setFirstname] = useState();
  const [lastname, setLastname] = useState();
  const [email, setEmail] = useState();
  const [dateRegisterd, setDateRegistered] = useState();

 

  const [isAFriend, setIsAFriend] = useState(() => {
    const my_friends = user.friends;
    const my_friends_list = [];

    if (my_friends) {
      Object.keys(my_friends).map((key) => {
        my_friends_list.push(key);
      });

      if (my_friends_list.includes(profileId)) {
        return true;
      } else {
        return false;
      }
     
    }
  });
 

  const [requestSent, setRequestSent] = useState(false);
  const [myProfile, setMyProfile] = useState(() => {
    if (profileId === userId) {
      return true;
    } else {
      return false;
    }
  });

  const [hasRequested, setHasRequested] = useState(() => {
    // if(user.friend_requests)

    const my_friend_requests = user.friend_requests;
    const my_friend_requests_list = [];

    if (my_friend_requests) {
      Object.keys(my_friend_requests).map((key) => {
        my_friend_requests_list.push(key);
      });

      if (my_friend_requests_list.includes(profileId)) {
        return true;
      } else {
        return false;
      }
    }
  });

  const data = useGetUserData(profileId).then((data) => {
    setFirstname(data?.val().firstname);
    setLastname(data?.val().lastname);
    setEmail(data?.val().email);
    setDateRegistered(data?.val().date_registered);

    setRequestSent(() => {
      const friend_requests = data?.val().friend_requests;
      const friend_requests_list = [];

      if (friend_requests) {
        Object.keys(friend_requests).map((key) => {
          friend_requests_list.push(key);
        });

        if (friend_requests_list.includes(userId)) {
          return true;
        } else {
          return false;
        }
      }
    });
  });

  const { fetchedData, isStillFetching } = useFetchProfilePost(
    dbRef,
    updateProfile,
    profileId
  );

  const handleRefresh = () => {
    setUpdateProfile(updateProfile + 1);
  };

  const SendFriendRequest = () => {
    dispatch({
      type: "SEND_FRIEND_REQUEST",
      request: {
        receiver_id: profileId,
        sender_id: userId,
      },
    }).then(() => handleRefresh());
  };

  const AcceptFriendRequest = () => {
    dispatch({
      type: "ACCEPT_FRIEND_REQUEST",
      request: {
        receiver_id: userId,
        sender_id: profileId,
      },
    }).then(() => handleRefresh());
  };

  const CancelFriendRequest = () => {
    dispatch({
      type: "CANCEL_FRIEND_REQUEST",
      request: {
        receiver_id: profileId,
        sender_id: userId,
      },
    }).then(() => handleRefresh());
  };

  return (
    <div className="w-[100%] h-[auto] text-sm items-center">
      <UpperSection>
        <div className="w-[65vw] h-[100%]  m-auto pb-3">
          <div className="">
            <img
              src={logo}
              alt="cover_photo"
              className="h-[400px] w-[100%] rounded-bl-2xl rounded-br-2xl object-cover"
            ></img>
          </div>
          <div className="flex flex-row mt-[-40px]">
            {/* Left */}
            <div className="ml-7 rounded-full bg-white p-2 z-1">
              <ReactRoundedImage
                image={logo}
                roundedSize="0"
                imageWidth="140"
                imageHeight="140"
              />
            </div>

            {/* Middle */}
            <div className="flex flex-row justify-between w-[100%]">
              <div className="self-center mt-10 ml-10">
                <p className="font-bold text-2xl ">{`${firstname} ${lastname}`}</p>
                <p>2k Friends</p>
              </div>

              {/* Right */}

              {myProfile ? (
                <div className="flex flex-row font-semibold text-sm tracking-wide">
                  <div className="self-center mt-10 m-1  bg-[#E4E6E9] p-2 pl-3 pr-3 rounded-lg flex flex-row items-center hover:bg-neutral-300">
                    <RiPencilFill className="h-5 w-5" />
                    <p className="ml-1"> Edit profile</p>
                  </div>
                </div>
              ) : isAFriend ? (
                <div className="flex flex-row font-semibold text-sm tracking-wide">
                  <div className="self-center mt-10 m-1  bg-[#E4E6E9] p-2 pl-3 pr-3 rounded-lg flex flex-row items-center hover:bg-neutral-300">
                    <RiUserFollowFill className="h-5 w-5" />
                    <p className="ml-1">Friends</p>
                  </div>

                  <div className="self-center mt-10 m-1  text-white  bg-[#1877F2] p-2 pl-3 pr-3 rounded-lg flex flex-row items-center hover:bg-[#0a62ce]">
                    <RiMessengerFill className="h-5 w-5" />
                    <p className="ml-1"> Message</p>
                  </div>
                </div>
              ) : (
                <div className="flex flex-row font-semibold text-sm tracking-wide">
                  {hasRequested ? (
                    <div
                      className="self-center mt-10 m-1  text-white bg-[#1877F2] p-2 pl-3 pr-3 rounded-lg flex flex-row items-center hover:bg-[#0a62ce] "
                      onClick={() => AcceptFriendRequest()}
                    >
                      <RiUserSharedFill className="h-5 w-5" />
                      <p className="ml-1">Accept friend request</p>
                    </div>
                  ) : requestSent ? (
                    <div
                      className="self-center mt-10 m-1  text-white bg-[#1877F2] p-2 pl-3 pr-3 rounded-lg flex flex-row items-center hover:bg-[#0a62ce] "
                      onClick={() => CancelFriendRequest()}
                    >
                      <RiUserSharedFill className="h-5 w-5" />
                      <p className="ml-1">Friend request sent</p>
                    </div>
                  ) : (
                    <div
                      className="self-center mt-10 m-1  text-white bg-[#1877F2] p-2 pl-3 pr-3 rounded-lg flex flex-row items-center hover:bg-[#0a62ce] "
                      onClick={() => SendFriendRequest()}
                    >
                      <RiUserAddFill className="h-5 w-5" />
                      <p className="ml-1">Add friend</p>
                    </div>
                  )}

                  <div className="self-center mt-10 m-1  text-black  bg-[#E4E6E9] p-2 pl-3 pr-3 rounded-lg flex flex-row items-center hover:bg-neutral-300">
                    <RiMessengerFill className="h-5 w-5" />
                    <p className="ml-1"> Message</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </UpperSection>
      {/* <div id="myElement" className="sticky top-0 bg-white">
        <p>Christian VIllablanca</p>
      </div> */}
      <LowerSection>
        <div className="w-[65%] justify-center flex flex-row m-auto ">
          {/* INTRO */}
          <div className="w-[40%]">
            <Intro />
          </div>

          {/* POSTS */}
          <div className="w-[60%] ml-2">
            {myProfile ? (
              <CreatePost
                data={{ width: "auto", minWidth: "auto" }}
                handleRefresh={handleRefresh}
              />
            ) : null}

            <Container className="flex flex-row justify-between">
              <p className="font-black font-extrabold text-lg tracking-wider mt-auto mb-auto">
                Post
              </p>

              <select
                name="sort"
                id="sort"
                className="bg-[#E4E6E9] pl-2 pt-2 pb-2 rounded-lg text-sm font-semibold text-neutral-600 border-none border-hidden"
              >
                <option value="New_post" selected className="pt-2">
                  Newer
                </option>
                <option value="Old_post">Older</option>
              </select>
            </Container>

            {fetchedData !== null ? (
              fetchedData.map((post) => (
                <Posts key={post.post_id} post={post} />
              ))
            ) : (
              <p className="mt-10 mb-10 text-center font-bold text-2xl text-neutral-500">
                None
              </p>
            )}
          </div>
        </div>
      </LowerSection>
    </div>
  );
};
export default Profile;
