import { useState, useEffect } from "react";
import { onValue, get, child } from "firebase/database";

const useFetchPost = (dbRef) => {
  const [fetchedData, setFetchedData] = useState(null);
  const [isStillFetching, setIsStillFetching] = useState(true);

  useEffect(() => {
    get(dbRef)
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

          setIsStillFetching(false);
          setFetchedData(fetchedData);
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

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
