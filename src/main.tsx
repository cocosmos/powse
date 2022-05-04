import React from "react";
import ReactDOM from "react-dom/client";
import App, { UserContext } from "./App";
import "./index.css";
import AuthReducer from "./contexts/AuthReducer";
import { AuthContext, AuthContextProvider } from "./contexts/AuthContext";
import { AuthProvider } from "./contexts/FirebaseAuthContext";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    {/* <AuthContextProvider></AuthContextProvider> */}
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);
