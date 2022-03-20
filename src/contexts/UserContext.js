import React, { createContext, useEffect, useReducer, useState } from "react";
import { db } from "../others/firebase";
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
import { useNavigate } from "react-router-dom";
import { userReducer } from "../reducers/userReducer";

export const UserContext = createContext();

const UserContextProvider = (props) => {
  let token = localStorage.getItem("user-token");
  const [contextUserId, setContextUserId] = useState(token);


  // const [user, setUser] = useState({
  //   id: "",
  //   firstname: "",
  //   lastname: "",
  //   email: "",
  //   date_registered: "",
  // });

  const [user, dispatch] = useReducer(userReducer, {});

  const LoginUser = (userId, navigate) => {
   
    localStorage.setItem("user-token", userId);
    setContextUserId(token);
    console.log("RUNB");
    navigate("/Home/");
  };

  const FetchData = () => {
    const dbRef = ref(db);
    useEffect(() => {
      get(child(dbRef, "users/" + contextUserId))
        .then((snapshot) => {
          if (snapshot.exists()) {
            dispatch({
              type: "SET_USER",
              user: {
                id: snapshot.key,
                firstname: snapshot.val().firstname,
                lastname: snapshot.val().lastname,
                email: snapshot.val().email,
                date_registered: snapshot?.val().date_registered,
              },
            });
          }
          // console.log("user is : " + user.firstname);
        })
        .catch((error) => {
          console.error(error);
        });
    }, []);
  };

  // const FetchData = () => {
  //   const dbRef = ref(db);
  //   useEffect(() => {
  //     get(child(dbRef, "users/" + userId))
  //       .then((snapshot) => {
  //         if (snapshot.exists()) {

  //           setUser({
  //             id: snapshot.key,
  //             firstname: snapshot.val().firstname,
  //             lastname: snapshot.val().lastname,
  //             email: snapshot.val().email,
  //             date_registered: snapshot?.val().date_registered,
  //           });
  //         }
  //       })
  //       .catch((error) => {
  //         console.error(error);
  //       });
  //   }, []);
  //   console.log("updated");
  // };

  return (
    <UserContext.Provider value={{ user, FetchData, LoginUser }}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
