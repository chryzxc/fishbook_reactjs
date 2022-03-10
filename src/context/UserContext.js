import React, { createContext, useState } from "react";
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
} from "firebase/database";

export const UserContext = createContext();

const UserContextProvider = (props) => {
  const [user, setUser] = useState({
    id: "",
    firstname: "CHristian",
    middlename: "",
    lastname: "",
    email: "",
  });

  const fetchData = (userId) => {
    const dbRef = ref(db);
    get(child(dbRef, "users/" + userId))
      .then((snapshot) => {
        if (snapshot.exists()) {
         
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  fetchData();

  return (
    <UserContext.Provider value={{ user }}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
