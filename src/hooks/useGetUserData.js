import React, { useEffect, useState } from "react";
import { ref, child, get } from "firebase/database";
import { db } from "../others/firebase";

const useGetUserData = async (profileId) => {
  const dbRef = ref(db);
  const [data, setData] = useState(null);
  await useEffect(() => {
    get(child(dbRef, "users/" + profileId))
      .then((snapshot) => {
        if (snapshot.exists()) {
          console.log(snapshot);
          setData(snapshot);
        } else {
          setData();
        }
      })
      .catch((error) => {
        console.error(error);
        setData();
      });
  }, []);

  return data;
};

export default useGetUserData;
