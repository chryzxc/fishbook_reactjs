import React, { useEffect, useState } from "react";
import { ref, child, onValue,get,limitToFirst } from "firebase/database";
import { db ,storage} from "../config/firebase";
import {
  uploadBytes,
  ref as storageRef,
  getDownloadURL
} from "firebase/storage";
import default_profile from "../assets/default_profile.png";

export const useGetUserData = (myId,profileId) => {
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

export const useGetUserInfo =  (id) => {
 
  const [firstname, setFirstname] = useState(null);
  const [lastname, setLastname] = useState(null);

   useEffect(() => {
    get(ref(db, "users/" + id),limitToFirst(2))
    .then((snapshot) => {
      if (snapshot.exists()) {
        setFirstname(snapshot.val().firstname);
        setLastname(snapshot.val().lastname);
    
      
      } else {
        console.log("No data available");
      }
    })
    .catch((error) => {
      console.error(error);
    });
 
  }, []);
  return {firstname , lastname};
  
};




export const useGetUserProfilePicture = (profileId) => {

  const [profilePicture, setProfilePicture] = useState();

    useEffect(() => {

    getDownloadURL(
      storageRef(storage, `users/${profileId}/my_profile_picture.jpeg`)
    )
      .then((url) => {
        if(url !== null || url !== ""){
          setProfilePicture(url);
        }else{
          setProfilePicture(default_profile);
        }
      
      })
      .catch((error) => {
        console.log("IMAGE NOT EXIST: " + error);
        setProfilePicture(default_profile);
      });
    
 
  }, []);
  return profilePicture;
  
};


