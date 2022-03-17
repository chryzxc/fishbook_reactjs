import React from "react";
import styled from "styled-components";
import storyimage from "../assets/2.jpg";
import profile from "../assets/profile.jpg";
import ReactRoundedImage from "react-rounded-image";

import { AiTwotonePlusCircle } from "react-icons/ai";

const Story = styled.div`
  margin: auto;
  background-color: white;
  position: relative;
  height: 30vh;
  width: 8vw;
  min-height: 30vh;
  min-width: 8vw;
  margin-top: 20px;
  margin-left: 10px;
  border-radius: 20px;
  box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.2), 0 1px 1px 0 rgba(0, 0, 0, 0.19);
  text-align: center;
`;

const StoryImage = styled.img`
  height: 100%;
  max-width: 100%;
  max-height: 100%;
  object-fit: cover;
  border-radius: 20px;
  padding-bottom: 50%;
`;

const ProfileContainer = styled.div`
  position: absolute;
  top: 8px;
  left: 8px;
`;

const StoryOwner = styled.p`
 
  position: absolute;
  font-weight: bold;
  bottom: -7px;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export default function AddStory() {
  return (
    <Story>
      <StoryImage src={storyimage} alt="story"></StoryImage>
      <div className="text-center justify-center align-content-center bg-white">
       
        <StoryOwner className="text-gray-600">Create story</StoryOwner>
      </div>
    </Story>
  );
}
