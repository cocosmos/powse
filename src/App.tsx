import { useState } from "react";
import "./App.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

import Event from "./pages/Event";

import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./contexts/AuthContext";
export const UserContext = React.createContext();
function App() {
  const { currentUser } = useContext(AuthContext);
  const RequireAuth = ({ children }: any) => {
    return currentUser ? children : <Navigate to="/login" />;
  };
  console.log(currentUser);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
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
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
