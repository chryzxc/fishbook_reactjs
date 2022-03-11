import React from "react";
import styled from "styled-components";
import storyimage from "../assets/2.jpg";
import profile from "../assets/1.jpg";
import ReactRoundedImage from "react-rounded-image";

import { AiOutlineLike, AiTwotoneLike } from "react-icons/ai";

import { TiThumbsUp} from "react-icons/ti";

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
  margin-left: 10px;
`;

const Caption = styled.p`
  margin-left: 20px;
  margin-right: 20px;
  margin-top: -5px;
  text-align: justify;
`;

const PostImage = styled.img`
  height: auto;
  max-width: 100%;
  max-height: 100%;
  object-fit: cover;
`;

const NumberOfLikes = styled.p`
  text-align: end;
  justify-self: end;
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
          <Name>Test</Name>
          <Time className="text-gray-600">49 mins ·</Time>
        </div>
      </Row>
      <Caption className="text-gray-600 mb-3">
        We are greatly saddened to report that the famed Ukrainian Air Force
        Flanker air show display pilot, and national hero of Ukraine, Colonel
        Oleksandr “Grey Wolf” Oksanchenko, was shot down over the capital Kyiv
        last Friday night shortly after his seventh air to air kill against the
        Russian Air Force (RAF) by a Russian S-400 Triumph Air Defence Missile
        System . The famed Ukrainian Colonel from 831st Tactical Aviation
        Brigade was better known as “Grey Wolf”, and aside from bein…
      </Caption>

      <PostImage src={storyimage} alt="post"></PostImage>
      <RowBottom className="mt-3">
        <button
          className=" text-medium text-gray-600 p-1.5"
          disabled
        >
          <div className="flex flex-row">
            {" "}
            <AiOutlineLike className="h-5 w-5"> </AiOutlineLike>
            <p className="text-sm ml-1">Like</p>
          </div>
        </button>
        <div className="self-center mr-3">
          <NumberOfLikes className=" text-gray-600 text-medium">0 likes</NumberOfLikes>
        </div>
      </RowBottom>
    </Post>
  );
}
