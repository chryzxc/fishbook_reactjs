import React, { useEffect, useState } from "react";
import { ref, child, onValue } from "firebase/database";
import { db } from "../config/firebase";

const useGetUserData = (myId,profileId) => {
  const dbRef = ref(db, "users/" + profileId);
  const [data, setData] = useState(null);

  
  
 
   useEffect(() => {
    onValue(dbRef, (snapshot) => {
      if (snapshot.exists()) {
        let profileData = null;
        let requestSent = false;

     
          const friend_requests = snapshot?.val().friend_requests;
          const friend_requests_list = [];
          if (friend_requests) {
            Object.keys(friend_requests).map((key) => {
              friend_requests_list.push(key);
            });
            if (friend_requests_list.includes(myId)) {
              requestSent = true;
            } else {
              requestSent= false;
            }
          }
        
      
        profileData = {
          firstname: snapshot?.val().firstname,
          lastname:snapshot?.val().lastname,
          email: snapshot?.val().email,
          date_registered: snapshot?.val().date_registered,
          friends: snapshot?.val().friends,
          request_sent: requestSent,
        };


         console.log("user :" + profileData);
        setData(profileData);
      } else {
        setData();
      }
    });
 
  }, []);
  return data;
  
};

export default useGetUserData;
