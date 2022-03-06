import React, { useReducer, useState } from "react";
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
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [hasError, setHasError] = useState(false);

    const registerUser = (e) => {
      setLoading(true);
      setHasError(false);

      e.preventDefault();

      const userDetails = {
        firstname: firstname,
        lastname: lastname,
        email: email,
        password: password,
        date_registered: new Date(),
      };

      //  const dbRef = ref(db, "users/");
      //  const newAccount = push(dbRef);

      const auth = getAuth();

      setTimeout(() => {
        createUserWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            const user = userCredential.user;
            console.log(user);
      

            set(ref(db, "users/" + user.uid), userDetails)
              .then(() => {
                setLoading(false);
                setSuccess(true);

                //handleCloseCreateModal();
              })
              .catch((error) => {
                setError(error);
                setLoading(false);
                setHasError(true);
                toast(error);
              });
          })
          .catch((error) => {
            setLoading(false);
            const errorCode = error.code;
            const errorMessage = error.message;
            setError(errorMessage);
            setHasError(true);
          });
      }, 2000);
    };

    return (
      <div>
        {hasError ? <p className="mt-15 text-sm text-red-600">{error}</p> : ""}

        {loading ? (
          <p className="mt-15 text-sm text-blue-600">
            Creating account... please wait
          </p>
        ) : (
          ""
        )}

        <Divider></Divider>

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
            value={lastname}
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
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <input
              className="m-1"
              placeholder="New password"
              required
              value={password}
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
      </div>
    );
  };

  const RegisterLayout = (props) => {
    return (
      <>
        <div>
          <h1 className="font-extrabold text-3xl">Sign up</h1>
          <p className="mt-15 text-sm">It's quick and easy</p>
        </div>
        <div>
          <button
            className="absolute top-2 right-5"
            onClick={handleCloseCreateModal}
          >
            Close
          </button>
        </div>

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
      </Modal>
    </div>
  );
}
