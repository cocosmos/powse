import { useState } from "react";
import "./App.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

import Event from "./pages/Event";

import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./contexts/AuthContext";

function App() {
  const { currentUser } = useContext(AuthContext);

  const RequireAuth = ({ children }: any) => {
    if (currentUser.apiKey === import.meta.env.VITE_APP_FIREBASE_API_KEY) {
      return children;
    } else {
      return <Navigate to="/login" />;
    }
  };
  /*  const AlreadyAuth = ({ children }: any) => {
    if (currentUser.apiKey === import.meta.env.VITE_APP_FIREBASE_API_KEY) {
      return <Navigate to="/" />;
    } else {
      return children;
    }
  }; */

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            path="/login"
            element={
              /*  <AlreadyAuth> */
              <Login />
              /*  </AlreadyAuth> */
            }
          />
          <Route
            path="/"
            element={
              <RequireAuth>
                <Home />
              </RequireAuth>
            }
          />
          <Route
            path="/event"
            element={
              <RequireAuth>
                <Event />
              </RequireAuth>
            }
          />
          <Route
            path="/register"
            element={
              /*   <AlreadyAuth> */
              <Register />
              /*   </AlreadyAuth> */
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
