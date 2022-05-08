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
import getPaletteMode from "./theme/getPaletteMode";
import useLocalStorage from "./hooks/localStorage";

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
  const [mode, setMode] = useLocalStorage<"light" | "dark">("theme", "light");

  const theme = useMemo(
    () =>
      responsiveFontSizes(
        createTheme({
          typography: {
            fontFamily: ["'Inter', 'sans-serif'"].join(","),
            // fontSize: 20,
            /*  h1: {
              // letterSpacing: 0,
              // fontSize: 50,
              fontFamily: ["'Fonarto', 'sans-serif'"].join(","),
            },
            h2: {
              // fontSize: 40,
              fontFamily: ["'Fonarto', 'sans-serif'"].join(","),
            },
            h3: {
              // fontSize: 30,
              fontFamily: ["'Fonarto', 'sans-serif'"].join(","),
            },
            h4: {
              // fontSize: 25,
              fontFamily: ["'Fonarto', 'sans-serif'"].join(","),
            },*/
            h5: {
              // fontSize: 20,
              //fontFamily: ["'Fonarto', 'sans-serif'"].join(","),
              fontSize: 15,
            },
            h6: {
              //fontFamily: ["'Fonarto', 'sans-serif'"].join(","),
              fontWeight: 600,
              fontSize: 19,
            },
            body2: {
              // fontSize: 13,
            },
            subtitle1: {
              fontSize: 11,
            },
          },
          components: {
            MuiFilledInput: {
              styleOverrides: {
                root: {
                  borderRadius: 12,
                  backgroundColor: "#F3EFFA",
                  ":hover": {
                    backgroundColor: "#F3EFFA",
                  },
                  ":before": {
                    display: "none",
                  },
                  ":after": {
                    display: "none",
                  },
                },
                input: {
                  backgroundColor: "#F3EFFA",
                  borderRadius: 12,
                },
              },
            },
            MuiInput: {
              styleOverrides: {
                root: {
                  /* borderRadius: 12,
                  backgroundColor: "#DED1F4",
                  ":hover": {
                    backgroundColor: "#DED1F4",
                  }, */
                  ":before": {
                    display: "none",
                  },
                  ":after": {
                    display: "none",
                  },
                },
              },
            },
          },

          breakpoints: {
            keys: ["xs", "sm", "md", "lg", "xl"],
            values: {
              xs: 0,
              sm: 600,
              md: 900,
              lg: 1200,
              xl: 1536,
            },
          },
          ...getPaletteMode(mode),
        })
      ),
    [mode]
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        component="main"
        padding={2}
        pb={8}
        height={"100%"}
        minHeight={"100vh"}
      >
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={
                /*  <RequireAuth> */
                <Home />
                /*  </RequireAuth> */
              }
            />
            <Route
              path="/login"
              element={
                /*  <AlreadyAuth> */
                <Login />
                /*  </AlreadyAuth> */
              }
            />

            <Route
              path="/event"
              element={
                /*   <RequireAuth> */
                <Event />
                /*  </RequireAuth> */
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
            <Route
              path="/resetpassword"
              element={
                /*   <AlreadyAuth> */
                <ResetPassword />
                /*   </AlreadyAuth> */
              }
            />
            <Route
              path="/forgotpassword"
              element={
                /*   <AlreadyAuth> */
                <ForgotPassword />
                /*   </AlreadyAuth> */
              }
            />
            <Route
              path="/choice"
              element={
                /*   <AlreadyAuth> */
                <Choice />
                /*   </AlreadyAuth> */
              }
            />
            <Route
              path="*"
              element={
                /*   <AlreadyAuth> */
                <Error />
                /*   </AlreadyAuth> */
              }
            />
          </Routes>
        </BrowserRouter>
      </Box>
    </ThemeProvider>
  );
}

export default App;
