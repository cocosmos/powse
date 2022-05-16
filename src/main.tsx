import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import logo from "./assets/logo/square/transparent/512x512.png";
import { AuthContextProvider } from "./contexts/AuthContext";
import { registerSW } from "virtual:pwa-register";

const updateSW = registerSW({
  onNeedRefresh() {},
  onOfflineReady() {},
});

const loadingMarkup = (
  <div
    style={{
      height: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    <img src={logo} alt="loading" height={300} width={300} />
  </div>
);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Suspense fallback={loadingMarkup}>
    <React.StrictMode>
      <AuthContextProvider>
        <App />
      </AuthContextProvider>
    </React.StrictMode>
  </Suspense>
);
