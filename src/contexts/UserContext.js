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
  console.log("User context");
 
  const [userContextId, setUserContextId] = useState(() => {
    let token = localStorage.getItem("user-token");
    if (token) {
      return token;
    }
  });

  // let token = localStorage.getItem("user-token");
  // const [contextUserId, setContextUserId] = useState(token);
  // console.log("contetxt: " + token);

  // const [user, setUser] = useState({
  //   id: "",
  //   firstname: "",
  //   lastname: "",
  //   email: "",
  //   date_registered: "",
  // });

  const [user, dispatch] = useReducer(userReducer, {});

  // const LoginUser = () => {
  //   const dbRef = ref(db);
  //   useEffect(() => {
  //     get(child(dbRef, "users/"))
  //       .then((snapshot) => {
  //         if (snapshot.exists()) {
  //           // setUser({
  //           //   id: snapshot.key,
  //           //   firstname: snapshot.val().firstname,
  //           //   lastname: snapshot.val().lastname,
  //           //   email: snapshot.val().email,
  //           //   date_registered: snapshot?.val().date_registered,
  //           // });
  //           //   navigate("/Home/");
  //         }
  //       })

  //       .catch((error) => {
  //         console.error(error);
  //       });
  //   }, []);

  // localStorage.setItem("user-token", userId);
  //  console.log("set token");
  // setContextUserId(userId);
  //navigate("/Home/");
  // };

  const FetchUserData = (userId) => {
    const dbRef = ref(db);
    get(child(dbRef, "users/" + userId))
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
              friend_requests: snapshot?.val().friend_requests,
              notifications: snapshot?.val().notifications,
              friends:snapshot?.val().friends,
            },
          });

          // navigate("/Home/");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

 

  // const FetchData = () => {
  //   const dbRef = ref(db);
  //   useEffect(() => {
  //     get(child(dbRef, "users/" + contextUserId))
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
  // };

  return (
    <UserContext.Provider value={{ user, setUserContextId, FetchUserData ,dispatch}}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
