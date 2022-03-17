import React, { createContext, useEffect, useState } from "react";
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
import { useNavigate } from "react-router-dom";

export const UserContext = createContext();

const UserContextProvider = (props) => {
  
  const [user, setUser] = useState({
    id: "",
    firstname: "",
    lastname: "",
    email: "",
    date_registered: "",
  });

  const FetchData = (userId) => {
    let navigate = useNavigate();
    const dbRef = ref(db);
    useEffect(() => {
      get(child(dbRef, "users/" + userId))
        .then((snapshot) => {
          if (snapshot.exists()) {
            setUser({
              id: snapshot.key,
              firstname: snapshot.val().firstname,
              lastname: snapshot.val().lastname,
              email: snapshot.val().email,
              date_registered: snapshot?.val().date_registered,
            });
          }
        })
        .catch((error) => {
          console.error(error);
        });
       
    }, []);
    console.log("updated");
  };

  return (
    <UserContext.Provider value={{ user, FetchData }}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
