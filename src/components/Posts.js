import React from "react";
import styled from "styled-components";
import storyimage from "../assets/2.jpg";
import profile from "../assets/profile.jpg";
import ReactRoundedImage from "react-rounded-image";

const Post = styled.div`
  background-color: white;
  margin: auto;
  height: 100vh;
  width: 80vh;
  min-height: 20vh;
  min-width: 70vh;
  margin-top: 20px;
  border-radius: 10px;
  box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.2), 0 1px 1px 0 rgba(0, 0, 0, 0.19);
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  
  height: auto;
  width: auto;
 
  padding: 10px;
  
`;

export default function Posts() {
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
          <h1>Test</h1>
        </div>
      </Row>
    </Post>
  );
}
