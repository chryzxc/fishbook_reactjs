import React, { useEffect, useState } from "react";
import { ref, child, onValue } from "firebase/database";
import { db } from "../others/firebase";

const useGetUserData = async (profileId) => {
  const dbRef = ref(db, "users/" + profileId);
  const [data, setData] = useState(null);
  await useEffect(() => {
    onValue(dbRef, (snapshot) => {
      if (snapshot.exists()) {
        // console.log("user :" + snapshot.val().firstname);
        setData(snapshot);
      } else {
        setData();
      }
    });
  }, []);

  return data;
};

export default useGetUserData;
