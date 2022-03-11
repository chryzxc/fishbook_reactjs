import React, { useContext } from "react";
import styled from "styled-components";
import fish from "../assets/fish.png";
import logo from "../assets/logo.png";
import ReactRoundedImage from "react-rounded-image";
import CreatePost from "./CreatePost";
import Stories from "./Stories";
import AddStory from "./AddStory";
import Posts from "./Posts";
//import { useParams } from "react-router-dom";
import UserContextProvider, { UserContext } from "../context/UserContext";
import { useParams } from "react-router-dom";
import useFetchPost from "../hooks/useFetchPost";
import db from "../others/firebase";
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

const Main = styled.div`
  height: 100%;
  width: 100%;
  font-size: small;
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
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 10px;
  background-color: #f0f2f5;
`;

const RightNav = styled.div`
  // background-color: blue;
  float: left;
  display: block;
  overflow: auto;
  //height: 20vh;
  width: 20%;
`;

const LeftNav = styled.div`
  // background-color: brown;
  float: left;
  display: block;
  overflow: auto;
  //height: 90vh;
  width: 20%;
`;

const Feeds = styled.div`
  height: auto;
  width: 60%;
  display: flex;
  flex-direction: column;
  text-align: center;

  align-items: center;
  justify-content: center;
  padding-bottom: 50px;
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
  display: flex;
  justify-content: center;
  flex-direction: row;
  padding-bottom: 10px;
  padding-left: 100px;
  padding-right: 100px;

  //overflow-y: hidden;
`;

const CreatePostContainer = styled.div`
  margin: auto;
  width: auto;
  height: auto;
  display: flex;
  flex-direction: column;
  padding-bottom: 10px;
  padding-left: 100px;
  padding-right: 100px;
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

const Home = () => {
  const { userId } = useParams();
  const { user, FetchData } = useContext(UserContext);
  FetchData(userId);

  const dbRef = ref(db, "posts/");
  const { fetchedData, isStillFetching } = useFetchPost(dbRef);
 

  return (
    <Main>
      <NavBar>
        <Container>
          <FishbookIcon src={logo}></FishbookIcon>
          <SearchBar>
            <Search placeholder="Search fish" />
          </SearchBar>
        </Container>
        <Container>
          <h1
            style={{
              fontSize: "35px",
              color: "#1877f2",
              fontWeight: "bold",
            }}
          >
            Fishbook
          </h1>
        </Container>
        <Container className="text-gray-600 font-bold">
          {user.firstname + "  " + user.lastname}
        </Container>
      </NavBar>
      <Body>
        <LeftNav>
          <Row>
            <ReactRoundedImage
              image={fish}
              roundedSize="0"
              imageWidth="40"
              imageHeight="40"
            />
            <UserDisplayName className="text-gray-600 font-bold">
              {user.firstname + "  " + user.lastname}
            </UserDisplayName>
          </Row>

          <div className="ml-3 mt-5">
            <ul>
              <p>Friends · 0</p>

              <List></List>
              <List>Most Recent</List>
              <List>Watch</List>
              <List>Groups</List>
              <List>Marketplace</List>
              <List>Memories</List>
              <List>Saved</List>
            </ul>
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
            <CreatePost />
          </CreatePostContainer>

          <PostsContainer>
           
            {fetchedData &&
              fetchedData.map((post) => 
                <Posts post={post}/>
              )}
          </PostsContainer>
        </Feeds>
        <RightNav></RightNav>
      </Body>
    </Main>
  );
};

export default Home;
