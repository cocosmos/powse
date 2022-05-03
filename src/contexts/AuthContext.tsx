/* import React, { createContext, useContext } from "react";
import { useState } from "react";
import { auth } from "../components/firebase";
import { User } from "../types/user";
//const AuthContext = createContext();

export const useAuth = () => {
  //return useContext(AuthContext);
};

export const AuthProvider = ({ children }: any) => {
  const [currentUser, setCurrentUser] = useState();

    function signup(email: User, password: User) {
    auth.createUserWithEmailAndPassword(email, password);
  }

  const value = {
    currentUser,
  }; 

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
 */
const AuthContext = () => {
  return <div>test</div>;
};

export default AuthContext;
