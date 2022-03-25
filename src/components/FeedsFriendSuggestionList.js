import React from "react";
import styled from "styled-components";
import FeedsFriendSuggestionRow from "./FeedsFriendSuggestionRow";
import useFetchSuggestedFriends from "../hooks/useFetchSuggestedFriends";

const Container = styled.div`
  background-color: white;
  margin: auto;
  height: auto;
  width: 37vw;
  min-height: auto;
  min-width: 37vw;
  margin-top: 10px;
  border-radius: 10px;
  box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.2), 0 1px 1px 0 rgba(0, 0, 0, 0.19);
`;

export default function FeedsFriendSuggestion() {
  const { fetchedData } = useFetchSuggestedFriends();

  return (
    <div className="pl-[100px] pr-[100px] m-auto p-1 overflow-hidden">
      <Container className="overflow-y-hidden overflow-x-auto ">
        <p className="text-left text-neutral-500 font-semibold text-[15px] m-4">
          People you may know
        </p>
       
        <div className="inline-flex pl-2 mb-2 pr-2">
          {fetchedData &&
            fetchedData.map((users) => (
              <FeedsFriendSuggestionRow key={users.user_id} users={users} />
            ))}
        </div>
      </Container>
    </div>
  );
}
