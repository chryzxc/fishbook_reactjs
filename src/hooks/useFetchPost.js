import { useState, useEffect } from "react";
import { onValue } from "firebase/database";

const useFetchPost = (dbRef) => {
  const [fetchedData, setFetchedData] = useState(null);
  const [isStillFetching, setIsStillFetching] = useState(true);
 
  useEffect(() => {
    onValue(dbRef, (snapshot) => {
      const fetchedData = [];
      snapshot.forEach((data) => {
        const dataVal = data.val();

        fetchedData.push({
          user_id: dataVal.user_id,
          caption: dataVal.caption,
          contents: dataVal.contents,
          date_posted: dataVal.date_posted,
          liked_users: dataVal.liked_users,
          likes: dataVal.likes,
        
        });
      });

      setIsStillFetching(false);
     
      setFetchedData(fetchedData);
    });
   
  }, []);
 
  return { fetchedData , isStillFetching};

};

export default useFetchPost;
