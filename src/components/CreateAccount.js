import React, { useState } from "react";
import Modal from "react-modal";
import styled from "styled-components";
import db from "../others/firebase";
import { ref, set, push } from "firebase/database";
import { toast } from "react-toastify";

import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const Divider = styled.hr`
  margin-top: 20px;
  border-top: 1px solid #bbb;
  margin-left: 5px;
  margin-right: 5px;
`;

export default function CreateAccount({
  handleOpenCreateModal,
  handleCloseCreateModal,
}) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const auth = getAuth();

  const modalStyle = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };

  const InputLayout = () => {
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const registerUser = (e) => {
      setLoading(true);

      e.preventDefault();

      const userDetails = {
        firstname: firstname,
        lastname: lastname,
        email: email,
        password: password,
        date_registered: new Date(),
      };

      
      const dbRef = ref(db, "users/");
      const newAccount = push(dbRef);

      setTimeout(() => {
        set(newAccount, userDetails)
          .then(() => {
            setLoading(false);

            const auth = getAuth();
            createUserWithEmailAndPassword(auth, email, password)
              .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                console.log(user)
                // ...
              })
              .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode + errorMessage)
                // ..
              });
            //setSuccess(true);
            //handleCloseCreateModal();
          })
          .catch((error) => {
            toast(error);
          });
      }, 2000);
    };

    return (
      <form className="pt-2" onSubmit={registerUser}>
        <input
          className="m-1"
          placeholder="Fishname"
          required
          onChange={(e) => {
            setFirstname(e.target.value);
          }}
        />
        <input
          className="m-1"
          placeholder="Lastname"
          required
          onChange={(e) => {
            setLastname(e.target.value);
          }}
        />
        <div
          style={{
            display: "flex",
            "flex-direction": "column",
          }}
        >
          <input
            className="m-1"
            placeholder="Email or phone number"
            required
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <input
            className="m-1"
            placeholder="New password"
            required
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
        <button
          className="m-auto self-center border-none bg-[#42b72a] text-white rounded-[5px] font-semibold mt-3"
          onClick="submit"
        >
          Sign up
        </button>
      </form>
    );
  };

  const RegisterLayout = () => {
    return (
      <>
        <div>
          <h1 className="font-extrabold text-3xl">Sign up</h1>
          <p className="mt-15 text-sm">It's quick and easy</p>
          {loading ? (
            <p className="mt-15 text-sm text-blue-600">
              Creating account... please wait
            </p>
          ) : (
            ""
          )}
        </div>
        <div>
          <button
            className="absolute top-2 right-5"
            onClick={handleCloseCreateModal}
          >
            Close
          </button>
        </div>

        <Divider></Divider>
        <div className="text-center">
          <InputLayout />
        </div>
      </>
    );
  };

  const SuccessLayout = () => {
    return (
      <div className="p-10 text-center">
        <p className="place-self-center font-bold mb-5 text-lg">
          Account created
        </p>

        <button
          className="m-auto self-center border-none bg-[#1877f2] text-white rounded-[5px] font-semibold mt-3"
          onClick={handleCloseCreateModal}
        >
          Go back to home page
        </button>
      </div>
    );
  };

  return (
    <div>
      <Modal
        isOpen={handleOpenCreateModal}
        // onAfterOpen={afterOpenModal}
        onRequestClose={handleCloseCreateModal}
        style={modalStyle}
        contentLabel="Sign up"
      >
        <div className="flex flex-row relative"></div>
        {success ? <SuccessLayout /> : <RegisterLayout />}
        {console.log(success)}
      </Modal>
    </div>
  );
}
