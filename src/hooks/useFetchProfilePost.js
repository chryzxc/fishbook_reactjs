import { useState, useEffect, useContext } from "react";
import { onValue, get, child, orderByChild } from "firebase/database";
import { UserContext } from "../contexts/UserContext";

const useFetchProfilePost = (dbRef, updateProfile) => {
  const [fetchedData, setFetchedData] = useState(null);
  const [isStillFetching, setIsStillFetching] = useState(true);

  const { user } = useContext(UserContext);
  useEffect(() => {
    get(dbRef, orderByChild("date_posted"))
      .then((snapshot) => {
        if (snapshot.exists()) {
          const fetchedData = [];

          snapshot.forEach((data) => {
            const dataVal = data.val();

            if (user.id === dataVal.user_id) {

              fetchedData.push({
                post_id: data.key,
                user_id: dataVal.user_id,
                caption: dataVal.caption,

                contents: dataVal.contents,
                date_posted: dataVal.date_posted,
                feeling: dataVal?.feeling,
              });
            }
           

          });

          if(fetchedData.length===0){
            setFetchedData(null);

          }else{
            fetchedData.reverse();
            setFetchedData(fetchedData);


          }


     
          setIsStillFetching(false);
        
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, [updateProfile]);

  

  return { fetchedData, isStillFetching };
};

export default useFetchProfilePost;
