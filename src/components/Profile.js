import logo from "../assets/github.jpg";
import React ,{useState} from "react";
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
  padding-bottom:20px;
`;
export default function Profile() {
  const dbRef = ref(db, "posts/");
  const [updateProfile, setUpdateProfile] = useState(0);
  const { fetchedData, isStillFetching } = useFetchProfilePost(dbRef, updateProfile);

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
            <div className="ml-7 rounded-full bg-white p-1 z-1">
              <ReactRoundedImage
                image={logo}
                roundedSize="0"
                imageWidth="140"
                imageHeight="140"
              />
            </div>
            <div className="self-center mt-10 ml-10">
              <p className="font-bold text-2xl ">Test Test</p>
              <p>2k Friends</p>
            </div>

            <div>
             <p>Edit</p>
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
            <CreatePost data={{ width: "auto", minWidth: "auto" }} handleRefresh={handleRefresh} />

            <Container>
              <p className='font-black font-extrabold text-lg tracking-wider'>Post</p>
            </Container>

            {fetchedData !== null?
              fetchedData.map((post) => (
                <Posts key={post.post_id} post={post} />
              )) : <p className="mt-10 mb-10 text-center font-bold text-2xl text-neutral-500">None</p>}
          
          

           
          </div>
        </div>
      </LowerSection>
    </div>
  );
}
