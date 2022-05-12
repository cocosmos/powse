import "./App.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Event from "./pages/Event";
import ResetPassword from "./pages/ResetPassword";
import ForgotPassword from "./pages/ForgotPassword";
import Error from "./pages/Error";

import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "./contexts/AuthContext";
import { Box, CssBaseline, ThemeProvider } from "@mui/material";
import { theme } from "./theme/getPaletteMode";
import { collection, doc, onSnapshot, query, where } from "firebase/firestore";
import { db } from "./components/common/firebase/config";
import Company from "./pages/Company";

function App() {
  const { currentUser } = useContext(AuthContext);

  /* const docRef = doc(db, "users", currentUser.uid);

  // realtime collection data

  //useEffect(() => {
  if (currentUser.uid) {
    onSnapshot(docRef, (doc) => {
      hasCompany = doc.data().entrepriseUid;
    });
  } */

  const RequireAuth = ({ children }: any) => {
    if (currentUser.uid) {
      return children;
    } else {
      return <Navigate to="/register" />;
    }
  };

  const RequireAuthCompany = ({ children }: any) => {
    if (currentUser.uid) {
      return <Navigate to="/" />;
    } else {
      return <Navigate to="/register" />;
    }
  };

  const NoRequirement = ({ children }: any) => {
    if (currentUser.uid) {
      return <Navigate to="/" />;
    } else {
      return children;
    }
  };

  // }, []);

  /*   if (currentUser.uid) {
    // useEffect(() => {
    const docRef = doc(db, `users`, currentUser.uid);
    try {
      onSnapshot(docRef, (doc) => {
        setUser({ ...doc.data() });
      });
    } catch (error) {
      console.log(error);
    }
    // }, [currentUser.uid]);
  }
  const AlreadyAuth = ({ children }: any) => {
    if (
      currentUser.apiKey === import.meta.env.VITE_APP_FIREBASE_API_KEY &&
      user.entrepriseUid
    ) {
      return <Navigate to="/" />;
    } else {
      return children;
    }
  }; */

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        component="main"
        padding={2} /* pb={8} */ /* height={"calc(100vh)"} */
      >
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={
                <RequireAuth>
                  <Home />
                </RequireAuth>
              }
            />
            <Route
              path="/home"
              element={
                <RequireAuth>
                  <Home />
                </RequireAuth>
              }
            />
            <Route
              path="/login"
              element={
                <NoRequirement>
                  <Login />
                </NoRequirement>
              }
            />

            <Route
              path="/event"
              element={
                // <RequireAuth>
                  <Event />
                /* </RequireAuth> */
              }
            />
            <Route
              path="/register"
              element={
                <NoRequirement>
                  <Register />
                </NoRequirement>
              }
            />
            <Route
              path="/resetpassword"
              element={
                <NoRequirement>
                  <ResetPassword />
                </NoRequirement>
              }
            />
            <Route
              path="/forgotpassword"
              element={
                <NoRequirement>
                  <ForgotPassword />
                </NoRequirement>
              }
            />
            <Route
              path="/company"
              element={
                /*    <RequireAuthCompany> */
                <Company />
                /*    </RequireAuthCompany> */
              }
            />

            <Route path="*" element={<Error />} />
          </Routes>
        </BrowserRouter>
      </Box>
    </ThemeProvider>
  );
}

export default App;
