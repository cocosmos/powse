import { useMemo, useState } from "react";
import "./App.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Event from "./pages/Event";
import ResetPassword from "./pages/ResetPassword";
import ForgotPassword from "./pages/ForgotPassword";
import Choice from "./pages/Choice";
import Error from "./pages/Error";

import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./contexts/AuthContext";
import {
  Box,
  createTheme,
  CssBaseline,
  responsiveFontSizes,
  ThemeProvider,
} from "@mui/material";
import { theme } from "./theme/getPaletteMode";

function App() {
  const { currentUser } = useContext(AuthContext);

  const RequireAuth = ({ children }: any) => {
    if (currentUser.apiKey === import.meta.env.VITE_APP_FIREBASE_API_KEY) {
      return children;
    } else {
      return <Navigate to="/login" />;
    }
  };
  //   const AlreadyAuth = ({ children }: any) => {
  //   if (currentUser.apiKey === import.meta.env.VITE_APP_FIREBASE_API_KEY) {
  //     return <Navigate to="/" />;
  //   } else {
  //     return children;
  //   }
  // }; 

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box component="main" padding={2} pb={8} height={"calc(100vh)"}>
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
              path="/login"
              element={
                  // <AlreadyAuth> 
                <Login />
                  //  </AlreadyAuth> 
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
                  // <AlreadyAuth> 
                <Register />
                  /* </AlreadyAuth>  */
              }
            />
            <Route
              path="/resetpassword"
              element={
                    // <AlreadyAuth> 
                <ResetPassword />
                   /* </AlreadyAuth>  */
              }
            />
            <Route
              path="/forgotpassword"
              element={
                  // <AlreadyAuth> 
                <ForgotPassword />
                 /* </AlreadyAuth>  */
              }
            />
            <Route
              path="/choice"
              element={
                //  <AlreadyAuth>
                <Choice />
                //  </AlreadyAuth>
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
