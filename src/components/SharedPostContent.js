import React from "react";
import styled from "styled-components";
import { FaGlobeAsia } from "react-icons/fa";
import DateFormat from "../utils/DateFormat";

const Name = styled.p`
  font-weight: bold;
  // margin-top: -2px;
  font-size: 14px;

  text-align: left;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;

  height: auto;

  padding-bottom: 5px;
  // justify-content: center;

  //padding: 5px;
`;

const TimeLabel = styled.p`
  align-self: flex-start;
  text-align: start;
`;

const Caption = styled.p`
  margin-left: 15px;
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


export default function SharedPostContent({sharedPost}) {
    console.log("from shared:" + JSON.stringify(sharedPost));
  return (
    <div className="mr-4 ml-4 m-2 border-[0.5px] border-neutral-400 rounded-xl ">
      {sharedPost.data.content ? (
        <img
          className="rounded-t-xl w-[100%] object-cover"
          src={sharedPost?.data.content}
          alt="test"
        ></img>
      ) : (
        ""
      )}
      <Caption className="text-gray-600 mb-3 text-[16px]">
        {sharedPost?.data.caption}
      </Caption>

      <RowBottom className="pt-4">
        <Row>
          <div>
            {sharedPost?.data.feeling ? (
              <div className="flex flex-row">
                <Name className="ml-0 justify-self-center">
                  {sharedPost?.data.firstname + " " + sharedPost?.data.lastname}
                </Name>
                <p className="ml-1 justify-self-center">{`is ${sharedPost?.data.feeling}`}</p>
              </div>
            ) : (
              <Name className="ml-0">
                {sharedPost?.data.firstname + " " + sharedPost?.data.lastname}
              </Name>
            )}

            <div className="flex flex-row text-gray-600">
              <TimeLabel>
                <DateFormat
                  date={sharedPost?.data.date_posted}
                  addSuffix={true}
                />{" "}
                •
              </TimeLabel>
              <FaGlobeAsia className="self-center ml-1" />
            </div>
          </div>
        </Row>
      </RowBottom>
    </div>
  );
}
