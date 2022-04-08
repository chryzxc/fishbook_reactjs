import React, { createContext, useReducer, useState } from "react";
import { db ,storage} from "../config/firebase";
import {
  ref,
  child,
  get
} from "firebase/database";
import {
  ref as storageRef,
  getDownloadURL
} from "firebase/storage";

import { userReducer } from "../reducers/userReducer";

import default_profile from "../assets/default_profile.png";


export const UserContext = createContext();

const UserContextProvider = (props) => {
  const [userContextId, setUserContextId] = useState(() => {
    let token = localStorage.getItem("user-token");
    return token;
  });

  const [user, dispatch] = useReducer(userReducer, {
    id: userContextId,
  });



  const FetchUserData = async () => {
    const dbRef = ref(db);

    let profile_picture = await getDownloadURL(
      storageRef(storage, `users/${userContextId}/my_profile_picture.jpeg`)
    )
      .then((url) => {
        if(url !== null || url !== ""){
          return url;
        }else{
          return default_profile;
        }
      })
      .catch((error) => {

        return default_profile;
      });
   
    
  
    await get(child(dbRef, "users/" + userContextId))
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
              friends: snapshot?.val().friends,
              profile_picture: profile_picture,
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
    <UserContext.Provider
      value={{ user, userContextId, setUserContextId, FetchUserData, dispatch }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
