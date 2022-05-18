import "./App.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Event from "./pages/Event";
import ResetPassword from "./pages/ResetPassword";
import ForgotPassword from "./pages/ForgotPassword";
import Error from "./pages/Error";

import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./contexts/AuthContext";
import { Box, CssBaseline, ThemeProvider } from "@mui/material";
import { theme } from "./theme/getPaletteMode";
import Landing from "./pages/Landing";

function App() {
  const { currentUser } = useContext(AuthContext);

  const RequireAuth = ({ children }: any) => {
    if (currentUser.uid) {
      return children;
    } else {
      return <Navigate to="/register" />;
    }
  };
  const NoRequirement = ({ children }: any) => {
    if (currentUser.uid) {
      return <Navigate to="/home" />;
    } else {
      return children;
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box component="main" padding={2}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Landing />} />
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

            <Route path="/event" element={<Event />} />
            <Route path="/register" element={<Register />} />
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

            <Route path="*" element={<Error />} />
          </Routes>
        </BrowserRouter>
      </Box>
    </ThemeProvider>
  );
}

export default App;
