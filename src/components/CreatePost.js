import React from "react";
import styled from "styled-components";
import ReactRoundedImage from "react-rounded-image";
import profile from "../assets/1.jpg";

const CreatePostCard = styled.div`
  overflow-y: hidden;
  overflow-x: hidden;
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

const Divider = styled.hr`
  border-top: 1pt solid #bbb;
  margin-left: 20px;
  margin-right: 20px;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  height: auto;
  width: auto;
  margin-top: -10px;

  padding: 10px;
`;

const WritePost = styled.div`
  width: 80%;
  background-color: #e4e6e9;
  border-radius: 25px;
  height: auto;
  padding: 10px;
  font-size: large;
  color: #65676b;
  margin-left: 15px;
`;

const TextArea = styled.textarea`
  width: 100%;
  height: 150px;
  padding: 12px 20px;
  box-sizing: border-box;
  border: none;
  border-radius: none;
  background-color: transparent;
  resize: none;
`;

export default function CreatePost() {
  return (
    <CreatePostCard>
      <h2>Create a post</h2>
      <div>
        <Row>
          <ReactRoundedImage
            image={profile}
            roundedSize="0"
            imageWidth="40"
            imageHeight="40"
          ></ReactRoundedImage>

          <WritePost>
            <TextArea placeholder="What's on your mind, Christian?"></TextArea>
          </WritePost>
        </Row>
      </div>
      <div>
        <Divider />
      </div>
      <div>
        <Row>
          <button>Test</button>
          <button>Test</button>
        </Row>
      </div>
    </CreatePostCard>
  );
}
