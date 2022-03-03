import React, { useState } from "react";

import styled from "styled-components";

import Modal from "react-modal";
import Button from "react-bootstrap/Button";

const Column = styled.div`
  background-color: #f0f2f5;
  height: 80vh;
  width: auto;
  display: block;
  min-width: fit-content;
  min-height: fit-content;
  flex-direction: column;
  padding-top: 100px;
  padding-left: 100px;
  padding-right: 100px;
`;

const Row = styled.div`
  display: flex;

  height: auto;
  width: 100%;
  justify-content: space-around;

  @media (max-width: 412px) {
    flex-direction: column;
  }
  @media (min-width: 413px) {
    flex-direction: row;
  }
`;

const Divider = styled.hr`
  margin-top: 20px;
  border-top: 1px solid #bbb;
  margin-left: 5px;
  margin-right: 5px;
`;

const LoginCard = styled.div`
  display: flex;
  flex-direction: column;

  background-color: white;
  margin: auto;
  margin-left: 50px;
  margin-right: 50px;
  height: auto;
  width: 320px;
  min-width: 320px;
  min-height: fit-content;
  margin-top: 20px;
  padding: 25px;
  border-radius: 10px;
  box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.2), 0 1px 1px 0 rgba(0, 0, 0, 0.19);
`;

const Text = styled.h1`
  font-size: 3rem;
  margin-bottom: 16px;
`;

const EmailInput = styled.input`
  input:focus {
    outline: none;
  }
  font-size: medium;
  padding: 10px;
  border-radius: 5px;
  border-color: none;
  outline: none;
  outline-style: none;
  border-color: #babfc4;
  border-width: 1pt;
`;

const PasswordInput = styled.input`
  margin-top: 15px;
  font-size: medium;
  padding: 10px;
  border-radius: 5px;
  outline: none;
  outline-style: none;
  border-color: #babfc4;
  border-width: 1pt;
`;

const LoginButton = styled.button`
  margin-top: 15px;
  font-size: medium;
  padding: 12px;
  border-radius: 5px;
  color: white;
  background-color: #1877f2;

  border-style: none;
`;

const CreateButton = styled.button`
  font-size: medium;
  padding: 15px;
  border-radius: 5px;
  width: fit-content;
  min-width: fit-content;
  margin-top: 5px;
  align-self: center;
  border-style: none;
  color: white;
  background-color: #42b72a;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Text01 = styled.h1`
  font-size: 50px;
  color: #1877f2;
`;

const Text02 = styled.h1`
  margin-top: -20px;
  font-size: 30px;
  font-weight: lighter;
  padding-right: 20px;
`;

const Banner = styled("div")({
  width: "100%",
  display: "flex",

  "align-items": "center",

  "margin-top": "180px",
  // "padding-left": "48px",
  // "padding-right": "48px",
  "flex-direction": "column",
  "padding-bottom": "64px",
  "justify-content": "center",
  left: "0px",
  //position: "absolute",
  bottom: "0px",
  "@media(max-width: 767px)": {
    "padding-left": "32px",
    "padding-right": "32px",
  },
  "@media(max-width: 479px)": {
    "padding-top": "48px",
    "padding-left": "16px",
    "padding-right": "16px",
    "padding-bottom": "48px",
  },
});

const Text03 = styled("span")({
  "font-size": "0.75rem",
  "text-align": "center",
  "font-weight": "600",
  "margin-bottom": "32px",
  "letter-spacing": "2px",
  "margin-top": "100px",
});

const Text04 = styled("span")({
  "text-transform": "uppercase",
});

const Text06 = styled("span")({
  "max-width": "1400px",
  "text-align": "center",
  "margin-bottom": "32px",
  "@media(max-width: 991px)": {
    width: "100%",
  },
  "@media(max-width: 767px)": {
    "padding-left": "16px",
    "padding-right": "16px",
  },
});

const modalStyle = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

const Login = (props) => {
  const[modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  // function afterOpenModal() {
  //   // references are now sync'd and can be accessed.
  //   subtitle.style.color = "#f00";
  // }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <>
      <Modal
        isOpen={modalIsOpen}
       // onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={modalStyle}
        contentLabel="Example Modal"
      >
        <h2>Hello</h2>
        <button onClick={closeModal}>close</button>
        <div>I am a modal</div>
        <form>
          <input />
          <button>tab navigation</button>
          <button>stays</button>
          <button>inside</button>
          <button>the modal</button>
        </form>
      </Modal>
      <Column>
        <Row>
          <div
            style={{
              textAlign: "left",
              margin: "auto",
              paddingLeft: "50px",
              paddingRight: "50px",

              justifyContent: "center",
            }}
          >
            <Text01>Fishbook</Text01>
            <Text02>
              Connect with fish and the ocean around you on Fishbook.
            </Text02>
          </div>
          <div
            style={{
              textAlign: "left",
              margin: "auto",
            }}
          >
            <LoginCard>
              <Form>
                <EmailInput placeholder="Email or phone number"></EmailInput>
                <PasswordInput placeholder="Password"></PasswordInput>
                <LoginButton>Login</LoginButton>
              </Form>

              <Divider />
              <p>Dont have an account?</p>

              <CreateButton onClick={openModal}>
                Create account
              </CreateButton>
            </LoginCard>
          </div>
        </Row>

        <Banner>
          <Text03>
            <Text04>Swim, Swim, Swim</Text04>
          </Text03>
          <Text>Discover the ocean</Text>
          <Text06>
            <span>
              A fish is an amazing animal which lives and breathes in water.
              Fish have been on the Earth for over 500 million years. All fish
              have a backbone and most breathe through gills and have fins and
              scales. Fish have excellent senses of sight, touch, taste and many
              possess a good sense of smell and 'hearing'.
            </span>
          </Text06>
        </Banner>
      </Column>
    </>
  );
};

export default Login;
