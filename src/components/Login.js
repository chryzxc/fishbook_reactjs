import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import db from "../others/firebase";
import Button from "react-bootstrap/Button";
import CreateAccount from "./CreateAccount";
import {
  ref,
  set,
  push,
  getDatabase,
  child,
  get,
  equalTo,
  orderByChild,
} from "firebase/database";
import { clear } from "@testing-library/user-event/dist/clear";
import { propTypes } from "react-bootstrap/esm/Image";

const Column = styled.div`
  background-color: #f0f2f5;

  width: auto;
  display: block;
  min-width: fit-content;
  min-height: fit-content;
  flex-direction: column;
  padding-top: 150px;
`;

const Row = styled.div`
  display: flex;
  padding-left: 100px;
  padding-right: 100px;
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
  width: 350px;
  min-width: 320px;
  min-height: fit-content;

  padding: 25px;
  border-radius: 10px;
  box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.2), 0 1px 1px 0 rgba(0, 0, 0, 0.19);
`;

const Text = styled.h1`
  font-size: 3rem;
  margin-bottom: 16px;
  color: #1877f2;
  font-weight: bold;
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
  margin-top: 14px;
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
  font-weight: bold;
`;

const Text02 = styled.h1`
  margin-top: -5px;
  font-size: 25px;
  font-weight: lighter;
  padding-right: 20px;
`;

const Banner = styled("div")({
  backgroundColor: "white",
  width: "100%",
  display: "flex",

  "align-items": "center",

  "margin-top": "150px",
  "padding-left": "48px",
  "padding-right": "48px",
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

export default function Login(props) {
  const [openModal, setOpenModal] = useState(false);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [isCheckingLoginDetails, setIsCheckingLoginDetails] = useState(false);
  const [error, setError] = useState("");
  const [clearError, setClearError] = useState(true);

  const handleOpenCreateModal = () => {
    setOpenModal(true);
  };

  const handleCloseCreateModal = () => {
    setOpenModal(false);
  };

  let navigate = useNavigate();

  const performLogin = ({ userId, loginEmail, loginPassword }) => {
    const dbRef = ref(db);
    get(child(dbRef, "users/" + userId))
      .then((snapshot) => {
        if (snapshot.exists()) {
          if (
            loginEmail === snapshot.val().email &&
            loginPassword !== snapshot.val().password
          ) {
            setError("Incorrect password. Please try again");
          } else if (
            loginEmail === snapshot.val().email &&
            loginPassword === snapshot.val().password
          ) {
            navigate("/Home/" + userId);
          }
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const LoginUser = (e) => {
    e.preventDefault();

    setIsCheckingLoginDetails(true);
    setClearError(true);

    const dbRef = ref(db);

    const getData = async () => {
      const snapshot = await get(
        child(dbRef, "users"),
        orderByChild("email"),
        equalTo(loginEmail)
      );

      let userExist = false;
      let userId = "";

      const data = await snapshot.forEach((child) => {
        if (loginEmail === child.val().email) {
          userExist = true;
          userId = child.key;
        }
        return userExist;
      });

      await setIsCheckingLoginDetails(false);
      await setClearError(false);

      if (userExist) {
        await setError("");
        await performLogin({ userId, loginEmail, loginPassword });
      } else {
        await setError("Account does not exist");
      }
    };

    getData();

    // console.log(getData());

    // setTimeout(() => {
    //   get(child(dbRef, "users"), orderByChild("email"), equalTo(loginEmail))
    //     .then((snapshot) => {
    //       if (snapshot.exists()) {
    //         setUserExist(false);
    //         console.log(snapshot.val());

    //         let asdw = snapshot.forEach((child) => {
    //           if (
    //             loginEmail === child.val().email &&
    //             loginPassword === child.val().password
    //           ) {
    //             setUserExist(true);
    //             setIsCheckingLoginDetails(false);
    //             //   console.log("exist");
    //           }
    //         }).then(() => {

    //         });
    //         setIsCheckingLoginDetails(false);
    //         setClearError(false);
    //       } else {
    //         console.log("No data available");
    //         setIsCheckingLoginDetails(false);
    //       }
    //     })
    //     .catch((error) => {
    //       setIsCheckingLoginDetails(false);
    //       console.error(error);
    //     });

    //   console.log(userExist);
    // }, 5000);
  };

  return (
    <>
      {openModal ? (
        <CreateAccount
          handleOpenCreateModal={handleOpenCreateModal}
          handleCloseCreateModal={handleCloseCreateModal}
        />
      ) : (
        ""
      )}

      <Column>
        <Row>
          <div
            style={{
              textAlign: "left",
              margin: "auto",
              marginTop: "15px",
              paddingLeft: "80px",
              paddingRight: "100px",

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
              {isCheckingLoginDetails ? (
                ""
              ) : clearError ? (
                ""
              ) : (
                <p className="mb-1 text-sm text-red-500 font-semibold">
                  {error}
                </p>
              )}
              <Form onSubmit={LoginUser}>
                <EmailInput
                  placeholder="Email or phone number"
                  required
                  onChange={(e) => setLoginEmail(e.target.value)}
                ></EmailInput>
                <PasswordInput
                  placeholder="Password"
                  required
                  onChange={(e) => setLoginPassword(e.target.value)}
                ></PasswordInput>

                {isCheckingLoginDetails ? (
                  <button
                    className="mt-3.5 text-medium text-white bg-blue-400"
                    disabled
                  >
                    Logging in
                  </button>
                ) : (
                  <LoginButton type="submit">Login</LoginButton>
                )}
              </Form>

              <Divider />
              <p className="mt-5 mb-2">Don't have an account?</p>

              <CreateButton onClick={handleOpenCreateModal}>
                Create an account
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
            <span className="font-semibold">
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
}
