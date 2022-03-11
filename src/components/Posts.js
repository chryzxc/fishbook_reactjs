import React, { useState } from "react";
import styled from "styled-components";
import storyimage from "../assets/2.jpg";
import profile from "../assets/1.jpg";
import ReactRoundedImage from "react-rounded-image";
import { AiOutlineLike, AiTwotoneLike } from "react-icons/ai";
import { TiThumbsUp } from "react-icons/ti";
import db from "../others/firebase";
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

const Post = styled.div`
  background-color: white;
  margin: auto;
  height: auto;
  width: 80vh;
  min-height: auto;
  min-width: 80vh;
  margin-top: 20px;
  border-radius: 10px;
  box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.2), 0 1px 1px 0 rgba(0, 0, 0, 0.19);
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  height: auto;
  width: auto;
  padding: 15px;
`;

const RowBottom = styled.div`
  display: flex;
  flex-direction: row;
  height: auto;
  width: auto;
  padding-left: 15px;
  padding-right: 15px;
  padding-bottom: 10px;
  justify-content: space-between;
`;

const Name = styled.p`
  font-weight: bold;
  margin-top: -2px;
  font-size: medium;
  margin-left: 10px;
`;

const Time = styled.p`
align-self: flex-start;
text-align:start;
margin-left:10px
  
`;

const Caption = styled.p`
  margin-left: 20px;
  margin-right: 20px;
  margin-top: 15px;
  text-align: justify;
`;

const PostImage = styled.img`
  height: auto;
  width: 100%;
  max-width: 100%;
  max-height: 100%;
  object-fit: cover;
`;

const NumberOfLikes = styled.p`
  text-align: end;
  justify-self: end;
`;

const Posts = ({ post }) => {
  const dbRef = ref(db);
  const [firstname,setFirstname] = useState("");
  const [lastname,setLastname] = useState("");
  

  get(child(dbRef, `users/${post.user_id}`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        setFirstname(snapshot.val().firstname);
        setLastname(snapshot.val().lastname);
       
      } else {
        console.log("No data available");
      }
    })
    .catch((error) => {
      console.error(error);
    });

  return (
    <Post>
      <Row>
        <div>
          <ReactRoundedImage
            image={profile}
            roundedSize="0"
            imageWidth="40"
            imageHeight="40"
          ></ReactRoundedImage>
        </div>
        <div>
          <Name>{firstname + " " +lastname}</Name>
          <Time className="text-gray-600">49 mins ·</Time>
        </div>
      </Row>
      <Caption className="text-gray-600 mb-3">{post.caption}</Caption>

      <PostImage src={storyimage} alt="post"></PostImage>
      <RowBottom className="mt-3">
        <button className=" text-medium text-gray-600 p-1.5" disabled>
          <div className="flex flex-row">
            {" "}
            <AiOutlineLike className="h-5 w-5"> </AiOutlineLike>
            <p className="text-sm ml-1">Like</p>
          </div>
        </button>
        <div className="self-center mr-3">
          <NumberOfLikes className=" text-gray-600 text-medium">
            0 likes
          </NumberOfLikes>
        </div>
      </RowBottom>
    </Post>
  );
};

export default Posts;
