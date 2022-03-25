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
import { useParams } from "react-router-dom";
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
  console.log(" profileId" + profileId);
  const { user, FetchUserData } = useContext(UserContext);
  const dbRef = ref(db, "posts/");
  const [updateProfile, setUpdateProfile] = useState(0);

  //  useEffect(() => {
  //    FetchUserData(localStorage.getItem("user-id"));
  //  }, []);


  // await const  data  =  useGetUserData(profileId);
  // console.log("myData"+data);
    

    // const { fetchedData, isStillFetching } =  useFetchProfilePost(
    //   dbRef,
    //   updateProfile,
    //   profileId
    // );
   
  const LoadProfile = async() =>{
     const data  = await useGetUserData(profileId);
     await console.log("myData"+data);
   
   
  }

  LoadProfile();

 

  

  

  

  const handleRefresh = () => {
    setUpdateProfile(updateProfile + 1);
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
            <div className="ml-7 rounded-full bg-white p-1 z-1">
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
                <p className="font-bold text-2xl ">{`${user.firstname} ${user.lastname}`}</p>
                <p>2k Friends</p>
              </div>

              {/* Right */}
              <div className="flex flex-row font-semibold text-sm tracking-wide">
                <div className="self-center mt-10 m-1  bg-[#E4E6E9] p-2 pl-3 pr-3 rounded-lg flex flex-row items-center hover:bg-neutral-300">
                  <RiUserAddFill className="h-5 w-5" />
                  <p className="ml-1">Add friend</p>
                </div>

                <div className="self-center mt-10 m-1  text-white  bg-[#196ED8] p-2 pl-3 pr-3 rounded-lg flex flex-row items-center hover:bg-[#155bb1]">
                  <RiMessengerFill className="h-5 w-5" />
                  <p className="ml-1"> Message</p>
                </div>

                <div className="self-center mt-10 m-1  bg-[#E4E6E9] p-2 pl-3 pr-3 rounded-lg flex flex-row items-center hover:bg-neutral-300">
                  <RiPencilFill className="h-5 w-5" />
                  <p className="ml-1"> Edit profile</p>
                </div>
              </div>
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
            <CreatePost
              data={{ width: "auto", minWidth: "auto" }}
              handleRefresh={handleRefresh}
            />

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

            {/* {fetchedData !== null ? (
              fetchedData.map((post) => (
                <Posts key={post.post_id} post={post} />
              ))
            ) : (
              <p className="mt-10 mb-10 text-center font-bold text-2xl text-neutral-500">
                None
              </p>
            )} */}
          </div>
        </div>
      </LowerSection>
    </div>
  );
}
export default Profile;