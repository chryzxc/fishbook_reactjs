import React, { useContext, useState, useEffect } from "react";
import styled from "styled-components";
import fish from "../assets/fish.png";
import logo from "../assets/facebook.png";
import ReactRoundedImage from "react-rounded-image";
import CreatePost from "./CreatePost";
import Stories from "./Stories";
import AddStory from "./AddStory";
import Posts from "./Posts";
//import { useParams } from "react-router-dom";
import UserContextProvider, { UserContext } from "../contexts/UserContext";
import { useParams, useNavigate } from "react-router-dom";
import useFetchPost from "../hooks/useFetchPost";
import { db } from "../config/firebase";
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
import SponsorsSection from "./SponsorsSection";
import ContactsSection from "./ContactsSection";
import FeedsFriendSuggestionList from "./FeedsFriendSuggestionList";
import SideNav from "./SideNav";
import SideMenu from "./SideMenu";

const Main = styled.div`
  height: 100%;
  width: 100%;

  font-size: 14px;
  background-color: #f0f2f5;
  position: absolute;
  min-width: 80vh;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: left;
  height: auto;
  width: auto;
  align-items: center;
  margin-left: 30px;
`;

const NavBar = styled.div`
  background-color: white;
  height: 60px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding-left: 20px;
  padding-right: 20px;
  box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.2), 0 0.5px 5px 0 rgba(0, 0, 0, 0.19);
  text-align: center;
`;

const Container = styled.div`
  height: auto;
  width: auto;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`;

const Body = styled.div`
  width: auto;
  height: auto;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  overflow: hidden;
  background-color: #f0f2f5;
`;

const RightNav = styled.div`
  // background-color: blue;
  float: left;
  display: block;

  //height: 20vh;
  width: 280px;
  position: fixed;

  right: 0;
  top: 0;
`;

const LeftNav = styled.div`
  // background-color: brown;
  display: fixed;
  float: left;
  display: block;
  overflow: hidden;
  height: 100%;
  width: auto;
  position: fixed;
  bottom: 0px;
  margin-left: 50px;
  left: 0;

  z-index: 0;
`;

const Feeds = styled.div`
  height: auto;
  padding: auto;
  display: flex;
  flex-direction: column;
  text-align: center;
  margin: auto;
  overflow: hidden;

  align-items: center;
  justify-content: center;
  padding-bottom: 50px;
  // padding-right: 50px;
  // margin-left: 350px;
  z-index: 0;
`;

const FishbookIcon = styled.img`
  width: 40px;
  height: 40px;
`;

const SearchBar = styled.div`
  height: auto;
  width: 50px;
`;

const Search = styled.input`
  border-style: hidden;
  background-color: #e4e6e9;
  height: auto;
  width: 250px;
  margin-left: 20px;
  border-radius: 25px;
  padding: 10px;
  font-size: small;
  padding-left: 15px;
`;

const UserDisplayName = styled.p`
  margin-left: 10px;
`;

const List = styled.li`
  text-align: left;
  list-style-type: none;
  align-items: flex-start;
  margin: 10px;
`;

const StoriesContainer = styled.div`
  margin: auto;
  height: auto;
  width: auto;
  display: inline-flex;
  justify-content: center;
  flex-direction: row;
  /* padding-bottom: 10px; */
  padding-left: 30px;
  padding-right: 30px;

  //overflow-y: hidden;
`;

const CreatePostContainer = styled.div`
  margin: auto;
  width: auto;
  height: auto;
  display: flex;
  flex-direction: column;
  /* padding-bottom: 10px; */
  padding-left: 100px;
  padding-right: 100px;
  margin-top: 10px;
`;

const PostsContainer = styled.div`
  margin: auto;
  width: auto;
  height: auto;
  display: flex;
  flex-direction: column;
  padding-bottom: 10px;
  padding-left: 100px;
  padding-right: 100px;
`;

const Divider = styled.hr`
  border-top: 1pt solid #bbb;
  /* margin-left: 20px;
  margin-right: 20px; */
  margin-top: 10px;
`;

const Home = () => {
  let navigate = useNavigate();

   const { user, FetchUserData } = useContext(UserContext);

  const [updateHome, setUpdateHome] = useState(0);

  const dbRef = ref(db, "posts/");

  if (localStorage.getItem("user-token") === "") {
    navigate(-1);
  }

  useEffect(() => {
    FetchUserData();
  }, []);

  const { fetchedData, isStillFetching } = useFetchPost(dbRef, updateHome);

  const handleRefresh = () => {
    setUpdateHome(updateHome + 1);
  };

  return (
    <Main>
      <Body>
        <LeftNav>
          <div className="flex flex-row h-[100%]">
            {/* <SideNav /> */}
            <SideMenu />
          </div>
        </LeftNav>
        <Feeds>
          <StoriesContainer>
            <AddStory />
            <Stories />
            <Stories />
            <Stories />
            <Stories />
          </StoriesContainer>

          <CreatePostContainer>
            <CreatePost
              data={{
                width: "37vw",
                minWidth: "37vw",
              }}
              handleRefresh={handleRefresh}
            />
          </CreatePostContainer>

          <FeedsFriendSuggestionList />

          <PostsContainer>
            {fetchedData &&
              fetchedData.map((post) => (
                <Posts key={post.post_id} post={post} />
              ))}
          </PostsContainer>
        </Feeds>
        <RightNav>
          <SponsorsSection />
          <Divider className="w-[100%] ml-3" />
          <ContactsSection />
        </RightNav>
      </Body>
    </Main>
  );
};

export default Home;
