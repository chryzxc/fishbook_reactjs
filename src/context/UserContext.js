import React, { createContext, Component } from "react";

export const UserContext = createContext();

class UserContextProvider extends Component {
  state = {
      id: "",
      firstname:"" ,
      middlename:"",
      lastname: "",
      email: "",
  };
  render() {
    return (
      <UserContext.Provider value={{ ...this.state }}>
        {this.props.children}
      </UserContext.Provider>
    );
  }
}

export default UserContextProvider;
