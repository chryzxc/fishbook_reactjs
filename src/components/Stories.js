import React,{useContext} from "react";
import styled from "styled-components";
import storyimage from "../assets/2.jpg";
import profile from "../assets/github.jpg";

import ReactRoundedImage from "react-rounded-image";
import { useGetUserProfilePicture } from "../hooks/useGetUserData";
import { UserContext } from "../contexts/UserContext";

const Story = styled.div`
  margin: auto;
  background-color: white;
  position: relative;
  height: 30vh;
  width: 8vw;
  min-height: 30vh;
  min-width:8vw;
  margin-top: 20px;
  margin-left: 5px;
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
  position: absolute;
  bottom: 10px;
  left: 16px;
  color: white;
  margin-right: 16px;
`;

export default function Stories() {
  const { user } = useContext(UserContext);

  return (
    <Story>
      <StoryImage src={storyimage} alt="story"></StoryImage>
      <div>
        <StoryOwner>Christian Vllablanca</StoryOwner>
      </div>
      <ProfileContainer>
        <ReactRoundedImage
          image={useGetUserProfilePicture(user.id)}
          imageWidth="40"
          imageHeight="40"
          roundedColor="#166ADA"
          roundedSize="5"
        ></ReactRoundedImage>
      </ProfileContainer>
    </Story>
  );
}
