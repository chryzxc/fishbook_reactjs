import React from "react";
import styled from "styled-components";
import fish from "../assets/fish.png";

const Main = styled.div`
  height: 100%;
  width: 100%;
  max-width: 400vh;
  min-width: 200vh;
`;

const NavBar = styled.div`
  // background-color: red;
  height: 80px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-left: 50px;
  margin-right: 50px;
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
`;

const RightNav = styled.div`
  background-color: blue;
  height: auto;
  width: 20%;
`;

const LeftNav = styled.div`
  background-color: brown;
  height: auto;
  width: 20%;
`;

const Feeds = styled.div`
  background-color: beige;
  height: 100px;
  width: 60%;
  
`;

const FishbookIcon = styled.img`
  width: 30px;
  height: 30px;
`;

const SearchBar = styled.div`
  height: 30px;
  width: 50px;
  
`;

const Search = styled.input`
  background-color: aliceblue;
  height: auto;
  width: auto;
  margin-left: 10px;
  border-radius: 5px;
  padding: 5px;
`;



function Home(props) {
  return (
    <Main>
      <NavBar>
        <Container>
          <FishbookIcon src={fish}></FishbookIcon>
          <SearchBar>
            <Search />
          </SearchBar>
        </Container>
        <Container>asdwqe</Container>
        <Container>asdwqe</Container>
      </NavBar>
      <Body>
        <LeftNav>
          <ul>
            <li>Coffee</li>
            <li>Tea</li>
            <li>Milk</li>
          </ul>
        </LeftNav>
        <Feeds></Feeds>
        <RightNav></RightNav>
      </Body>
    </Main>
  );
}

export default Home;
