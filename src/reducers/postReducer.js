import { set } from "firebase/database";

export const postReducer = (state, action) => {
  switch (action.type) {
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
