import logo from "../assets/github.jpg";
import React, { useState, useContext, useEffect } from "react";
import ReactRoundedImage from "react-rounded-image";
import Container from "./defaults/Container";
import styled from "styled-components";
import CreatePost from "./CreatePost";
import Intro from "./Intro";
import useFetchProfilePost from "../hooks/useFetchProfilePost";
import { db, storage } from "../config/firebase";

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

import Posts from "./Posts";
import {
  RiPencilFill,
  RiMessengerFill,
  RiUserAddFill,
  RiUserSharedFill,
  RiUserFollowFill,
  RiCameraFill,
} from "react-icons/ri";
import { UserContext } from "../contexts/UserContext";
import { useParams, useNavigate } from "react-router-dom";
import {
  useGetUserData,
  useGetUserProfilePicture,
} from "../hooks/useGetUserData";
import { uploadBytes, ref as storageRef } from "firebase/storage";
import ProfileFriendsIcon from "./ProfileFriendsIcon";
import Friends from "./Friends";

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
const Profile = ({setShowView,setViewData }) => {
  const { profileId } = useParams();
  const { user, dispatch, FetchUserData } = useContext(UserContext);
  let navigate = useNavigate();
  const [myId, setMyId] = useState(() => {
    if (localStorage.getItem("user-token") !== "") {
     
      return localStorage.getItem("user-token");
    } else {
      navigate(-2);
    }
  });
  
  let inputContent = "";
  const dbRef = ref(db, "posts/");
  const [updateProfile, setUpdateProfile] = useState(0);
  const [profileData1, setProfileData1] = useState();

  const [profileFirstname, setProfileFirstname] = useState();
  const [profileLastname, setProfileLastname] = useState();
  const [profileEmail, setProfileEmail] = useState();
  const [profileDateRegistered, setProfileDateRegistered] = useState();
  const [profileFriends, setProfileFriends] = useState();
  let friends = [];
  let friends_index = 0;
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

  // const [requestSent, setRequestSent] = useState(false);

  const [myProfile, setMyProfile] = useState(() => {
    if (profileId === myId) {
      return true;
    } else {
      return false;
    }
  });

  const [hasRequested, setHasRequested] = useState(() => {
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

  const profileData = useGetUserData(myId, profileId);

  const friends_count = () => {
   
    if (profileData?.friends) {
      friends = [];
      Object.keys(profileData.friends).map((key) => {
        friends.push(key);
      });
      if (friends.length !== 1) {
        return `${friends.length} friends`;
      } else {
        return `${friends.length} friend`;
      }
    }
  };

  // const profileData = useGetUserData(profileId).then((data) => {

  //   console.log(data.val().firstname)
  //   const requestSent = () => {
  //     const friend_requests = data?.val().friend_requests;
  //     const friend_requests_list = [];
  //     if (friend_requests) {
  //       Object.keys(friend_requests).map((key) => {
  //         friend_requests_list.push(key);
  //       });
  //       if (friend_requests_list.includes(myId)) {
  //         return true;
  //       } else {
  //         return false;
  //       }
  //     }
  //   };

  //    let profileData = {
  //         firstname: data?.val().firstname,
  //         lastname:data?.val().lastname,
  //         email: data?.val().email,
  //         date_registered: data?.val().date_registered,
  //         friends: data?.val().friends,
  //         request_sent: requestSent,
  //       };
  //       console.log("before update");
  //       setProfileData1(profileData);
  //       return profileData;

  //   //   setProfileData({
  //   //     firstname: data?.val().firstname,
  //   //     lastname:data?.val().lastname,
  //   //     email: data?.val().email,
  //   //     date_registered: data?.val().date_registered,
  //   //     friends: data?.val().friends,
  //   //     request_sent: requestSent,
  //   //   });

  //   //   //   setProfileFirstname(data?.val().firstname);
  //   //   //   setProfileLastname(data?.val().lastname);
  //   //   //   setProfileEmail(data?.val().email);
  //   //   //   setProfileDateRegistered(data?.val().date_registered);
  //   //   //   console.log("get")
  //   //   //   //  setProfileFriends(data?.val().friends)
  //   //   // //  setProfileFriends(JSON.stringify(data?.val().friends));
  //   //   // //  console.log("friends:" + JSON.stringify(data?.val().friends));
  //   //   //   // await setProfileFriends(async()=>{
  //   //   //   //   const friends_list = [];
  //   //   //   //   if (data?.val().friends) {
  //   //   //   //     await Object.keys(data?.val().friends).map((key) => {
  //   //   //   //       friends_list.push(key);
  //   //   //   //     });
  //   //   //   //     return friends_list;
  //   //   //   //   }
  //   //   //   // })
  //   //   //   //
  //   //   //   setRequestSent(() => {
  //   //   //     const friend_requests = data?.val().friend_requests;
  //   //   //     const friend_requests_list = [];
  //   //   //     if (friend_requests) {
  //   //   //       Object.keys(friend_requests).map((key) => {
  //   //   //         friend_requests_list.push(key);
  //   //   //       });
  //   //   //       if (friend_requests_list.includes(myId)) {
  //   //   //         return true;
  //   //   //       } else {
  //   //   //         return false;
  //   //   //       }
  //   //   //     }
  //   //   //   });
  //   //   console.log("count:" + JSON.stringify(data));
  // });

  // if (profileData) {
  //   console.log("key" + profileData.val().firstname);
  //   //   setProfileData({
  //   //     firstname: data?.val().firstname,
  //   //     lastname:data?.val().lastname,
  //   //     email: data?.val().email,
  //   //     date_registered: data?.val().date_registered,
  //   //     friends: data?.val().friends,
  //   //     request_sent: requestSent,
  //   //   });
  //   // Object.keys(profileData1).map((key) => {
  //   //   console.log("key"+key);
  //   // });
  // }

  // useGetUserData((data)=>{

  //   const requestSent = () =>{
  //     const friend_requests = data?.val().friend_requests;
  //     const friend_requests_list = [];
  //     if (friend_requests) {
  //       Object.keys(friend_requests).map((key) => {
  //         friend_requests_list.push(key);
  //       });
  //       if (friend_requests_list.includes(userId)) {
  //         return true;
  //       } else {
  //         return false;
  //       }
  //     }
  //   }

  //   setProfileData({
  //     firstname: data?.val().firstname,
  //     lastname:data?.val().lastname,
  //     email: data?.val().email,
  //     date_registered: data?.val().date_registered,
  //     friends: data?.val().friends,
  //     request_sent: requestSent,
  //   });

  //   //   setProfileFirstname(data?.val().firstname);
  //   //   setProfileLastname(data?.val().lastname);
  //   //   setProfileEmail(data?.val().email);
  //   //   setProfileDateRegistered(data?.val().date_registered);
  //   //   console.log("get")
  //   //   //  setProfileFriends(data?.val().friends)
  //   // //  setProfileFriends(JSON.stringify(data?.val().friends));
  //   // //  console.log("friends:" + JSON.stringify(data?.val().friends));
  //   //   // await setProfileFriends(async()=>{
  //   //   //   const friends_list = [];
  //   //   //   if (data?.val().friends) {
  //   //   //     await Object.keys(data?.val().friends).map((key) => {
  //   //   //       friends_list.push(key);
  //   //   //     });
  //   //   //     return friends_list;
  //   //   //   }
  //   //   // })
  //   //   //
  //   //   setRequestSent(() => {
  //   //     const friend_requests = data?.val().friend_requests;
  //   //     const friend_requests_list = [];
  //   //     if (friend_requests) {
  //   //       Object.keys(friend_requests).map((key) => {
  //   //         friend_requests_list.push(key);
  //   //       });
  //   //       if (friend_requests_list.includes(userId)) {
  //   //         return true;
  //   //       } else {
  //   //         return false;
  //   //       }
  //   //     }
  //   //   });
  //   console.log("count:" + JSON.stringify(data));

  // },[])

  //  useGetUserData(profileId).then((data) => {

  // },[]);

  const { fetchedData, isStillFetching } = useFetchProfilePost(
    dbRef,
    updateProfile,
    profileId
  );

  const handleRefresh = () => {
  
    setUpdateProfile(updateProfile + 1);
    console.log("refrehsed");
  };

  const ShowProfileFriends = () => {
    let count = 0;
  };

  const updateProfilePicture = (e) => {
    
    const profileRef = storageRef(
      storage,
      `users/${myId}/my_profile_picture.jpeg`
    );

    uploadBytes(profileRef, e.target.files[0])
      .then((snapshot) => {
        console.log(" scucess");
        handleRefresh();
      })
      .catch((error) => {
        console.log("upload error : " + error);
      });


      // const post = {
      //   user_id: user.id,
      //   // caption: caption,
      //   date_posted: Date.now(),
      //   // feeling: feeling,
      // };
  
      // const dbRef = ref(db, "posts/");
      // const newPost = push(dbRef);
  
      // set(newPost, post)
      //   .then(async () => {
        
  
      //     if (e.target.files[0]) {
      
      //       const dbRef = ref(db, `posts/${newPost.key}/contents`);
      //       const newContent = push(dbRef);
  

      //       update(newContent, content).then(async () => {
      //         const contentRef = storageRef(
      //           storage,
      //           `posts/${newPost.key}/${newContent.key}.jpeg`
      //         );
  
      //         await uploadBytes(contentRef, e.target.files[0])
      //           .then((snapshot) => {
            
      //             handleRefresh();
      //           })
      //           .catch((error) => {
      //             console.log("upload error : " + error);
      //           });
      //       });
      //       //  });
      //     } else {
      //       handleRefresh();
      //     }
      //   })
      //   .catch((error) => {
      //     console.log(error);
      //   });




  };

  const SendFriendRequest = () => {
    dispatch({
      type: "SEND_FRIEND_REQUEST",
      request: {
        receiver_id: profileId,
        sender_id: myId,
      },
    }).then(() => handleRefresh());
  };

  const AcceptFriendRequest = () => {
    dispatch({
      type: "ACCEPT_FRIEND_REQUEST",
      request: {
        receiver_id: myId,
        sender_id: profileId,
      },
    }).then(() => handleRefresh());
  };

  const CancelFriendRequest = () => {
    dispatch({
      type: "CANCEL_FRIEND_REQUEST",
      request: {
        receiver_id: profileId,
        sender_id: myId,
      },
    }).then(() => handleRefresh());
  };

  return (
    <div className="w-[100%] h-[auto] text-sm items-center ">
      <UpperSection>
        <div className="w-[65vw] h-[100%]  m-auto pb-3 ">
          <div className="relative border-b-[1px] border-l-[1px] border-r-[1px] border-neutral-200 rounded-bl-2xl rounded-br-2xl">
            <img
              src={logo}
              alt="cover_photo"
              className="h-[400px] w-[100%] rounded-bl-2xl rounded-br-2xl object-cover"
            ></img>
             <div className="flex flex-row font-semibold text-sm tracking-wide absolute bottom-3 right-4">
                  <div className="self-center mt-10 m-1  bg-[#E4E6E9] p-2 pl-3 pr-3 rounded-lg flex flex-row items-center hover:bg-neutral-300">
                    <RiCameraFill className="h-5 w-5" />
                    <p className="ml-1">Change cover picture</p>
                  </div>
                </div>

         
          </div>
          <div className="flex flex-row mt-[-40px]">
            {/* Left */}
            <div className="ml-7 rounded-full bg-white p-2 z-1 relative">
              <ReactRoundedImage
                image={useGetUserProfilePicture(profileId)}
                roundedSize="0"
                imageWidth="180"
                imageHeight="180"
              />
              {myProfile ? (
                <div
                  className="bg-[#E4E6EB] absolute bottom-8 right-2 rounded-full p-2 hover:bg-neutral-400"
                  onClick={() => {
                    inputContent.click();
                    return false;
                  }}
                >
                  <RiCameraFill className="h-6 w-6" />
                  <input
                    onChange={(e) => updateProfilePicture(e)}
                    ref={(input) => {
                      inputContent = input;
                    }}
                    type="file"
                    name="file"
                    className="hidden"
                  />
                </div>
              ) : null}
            </div>

            {/* Middle */}
            <div className="flex flex-row justify-between w-[100%]">
              <div className="self-center mt-10 ml-10">
                <p className="font-bold text-2xl ">{`${profileData?.firstname} ${profileData?.lastname}`}</p>
                <p>{friends_count()}</p>
                <div className="flex flex-row ml-2 mt-1">
                  {/* {() => {
                    let index= friends.length
                    let count = 0;
                    friends &&
                      friends.map(() => {
                        count +=1;

                        return (
                          <div className={`ml-[-10px] p-[2px] bg-white rounded-full z-[${index-count}]`}>
                            <ReactRoundedImage
                              image={logo}
                              roundedSize="0"
                              imageWidth="40"
                              imageHeight="40"
                            />
                          </div>
                        );
                      });
                    
                  }} */}

                  {friends &&
                    friends.map((id) => {
                      friends_index += 1;

                      return (
                        <ProfileFriendsIcon
                          id={id}
                          index={friends.length - friends_index}
                        />
                      );
                    })}
                </div>
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
                  ) : profileData?.request_sent ? (
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
            {/* <Intro /> */}
            <Friends friends={friends}/>
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
                <Posts key={post.post_id} post={post} notView={true} setShowView={setShowView} setViewData={setViewData}/>
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
