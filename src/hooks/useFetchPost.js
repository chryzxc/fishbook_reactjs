import { useState, useEffect } from "react";
import { onValue, get, child, orderByChild } from "firebase/database";

const useFetchPost = (dbRef,updateHome) => {
  const [fetchedData, setFetchedData] = useState(null);
  const [isStillFetching, setIsStillFetching] = useState(true);

  useEffect(() => {
    get(dbRef,orderByChild('date_posted'))
      .then((snapshot) => {
        if (snapshot.exists()) {
          const fetchedData = [];
          console.log("to be fetched : " + snapshot);
          snapshot.forEach((data) => {
            const dataVal = data.val();

            fetchedData.push({
              post_id: data.key,
              user_id: dataVal.user_id,
              caption: dataVal.caption,
              contents: dataVal.contents,
              date_posted: dataVal.date_posted,
            });
          });

          fetchedData.reverse();

          setIsStillFetching(false);
          setFetchedData(fetchedData);
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, [updateHome]);

  // useEffect(() => {
  //   onValue(dbRef, (snapshot) => {
  //     const fetchedData = [];
  //     snapshot.forEach((data) => {
  //       const dataVal = data.val();

  //       fetchedData.push({
  //         user_id: dataVal.user_id,
  //         caption: dataVal.caption,
  //         contents: dataVal.contents,
  //         date_posted: dataVal.date_posted,
  //         liked_users: dataVal.liked_users,
  //         likes: dataVal.likes,
  //       });
  //     });

  //     setIsStillFetching(false);

  //     setFetchedData(fetchedData);
  //   });
  // }, []);

  return { fetchedData, isStillFetching };
};

export default useFetchPost;