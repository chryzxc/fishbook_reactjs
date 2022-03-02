import React from "react";
import styled from "styled-components";
import storyimage from "../assets/2.jpg";
import profile from "../assets/profile.jpg";
import ReactRoundedImage from "react-rounded-image";

const Story = styled.div`
margin: auto;
  background-color: white;
  position: relative;
  height: 30vh;
  width: 20vh;
  min-height: 30vh;
  min-width: 20vh;
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
`;

const ProfileContainer = styled.div`
  position: absolute;
  top: 8px;
  left: 8px;
`;

const StoryOwner = styled.p`
  position: absolute;
  font-weight: bold;
  bottom: 1px;
  left: 2px;
  margin-left: 4px;
  color: white;
`;

export default function Stories() {
  return (
    <Story>
      <StoryImage src={storyimage} alt="story"></StoryImage>
      <div>
        <StoryOwner>Christian Villablanca</StoryOwner>
      </div>
      <ProfileContainer>
        <ReactRoundedImage
          image={profile}
          imageWidth="50"
          imageHeight="50"
          roundedColor="#166ADA"
          roundedSize="7"
        ></ReactRoundedImage>
      </ProfileContainer>
    </Story>

    
  );
}
