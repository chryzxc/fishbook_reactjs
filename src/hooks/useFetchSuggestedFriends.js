import { useState, useEffect } from "react";
import { onValue, ref,get, child, orderByChild ,limitToFirst} from "firebase/database";
import db from "../others/firebase";

const useFetchSuggestedFriends = () => {
  const [fetchedData, setFetchedData] = useState(null);

  useEffect(() => {
    get(ref(db, "users"),limitToFirst(2))
      .then((snapshot) => {
        if (snapshot.exists()) {
          const fetchedData = [];
        
          snapshot.forEach((data) => {
            const dataVal = data.val();

            fetchedData.push({
              user_id: data.key,
              firstname: dataVal.firstname,
              lastname: dataVal.lastname,
            });
          });

          fetchedData.reverse();

         
          setFetchedData(fetchedData);
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return { fetchedData };
};

export default useFetchSuggestedFriends;
