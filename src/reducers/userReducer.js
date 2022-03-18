import { set } from "firebase/database";

export const userReducer = (state, action) => {
  switch (action.type) {

    case "SET_USER":
      return  {
        id: action.user.id,
        firstname: action.user.firstname,
        lastname: action.user.lastname,
        email: action.user.email,
        date_registered: action.user.date_registered,
      };

      case "LOGIN_USER":
          return
     
    case "CREATE_POST":
      set(action.newPost, action.post)
        .then(() => {
          action.setCaption("");
          console.log("post submitted");
          action.handleRefresh();
        })
        .catch((error) => {
          console.log(error);
        });
      return;
    default:
      return state;
  }
};
