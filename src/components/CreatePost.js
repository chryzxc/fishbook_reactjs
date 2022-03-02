import React from "react";
import styled from "styled-components";
import ReactRoundedImage from "react-rounded-image";
import profile from "../assets/1.jpg";

const CreatePostCard = styled.div`
  background-color: white;
  margin: auto;
  height: 20vh;
  width: 80vh;
  min-height: 20vh;
  min-width: 80vh;
  margin-top: 20px;
  border-radius: 10px;
  box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.2), 0 1px 1px 0 rgba(0, 0, 0, 0.19);
`;

const Divider = styled.hr`

  border-top: 1pt solid #bbb;
  margin: 10px;
`;

const Row = styled.div`
 
  display: flex;
  flex-direction: row;
  justify-content: center;
  height: auto;
  width: auto;
  align-items: center;
  padding: 10px;
  padding-top: 20px;
`;

const WritePost = styled.div`
  width: 80%;
  background-color: #e4e6e9;
  border-radius: 25px;
  height: auto;
  padding: 10px;
  font-size: large;
  color: #65676B;
  margin-left: 15px;
`;

export default function CreatePost() {
  return (
    <CreatePostCard>
      <div>
        <Row>
          <ReactRoundedImage
            image={profile}
            roundedSize="0"
            imageWidth="40"
            imageHeight="40"
          ></ReactRoundedImage>

          <WritePost>What's on your mind, Christian?</WritePost>
        </Row>
      </div>
      <div>
        <Divider />
      </div>
      <div>Create a post</div>
    </CreatePostCard>

  );
}
