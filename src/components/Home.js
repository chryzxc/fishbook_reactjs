import React from "react";
import styled from "styled-components";

const Main = styled.div`
  height: 100%;
  width: 100%;
`;

const NavBar = styled.div`
  background-color: red;
  height: 80px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-left: 50px;
  margin-right: 50px;
`;

const Container = styled.div`
  background-color: aliceblue;
  height: auto;
  width: auto;
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
  width: 25%;
`;

const LeftNav = styled.div`
  background-color: brown;
  height: auto;
  width: 25%;
`;

const Feeds = styled.div`
  background-color: beige;
  height: 100px;
  width: 50%;
`;

function Home(props) {
  return (
    <Main>
      <NavBar>
        <Container>test</Container>
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
