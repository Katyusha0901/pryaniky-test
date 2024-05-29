import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App";
import { AuthorizationContextProvider } from "./AuthorizationContextProvider";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <AuthorizationContextProvider>
      <App />
    </AuthorizationContextProvider>
  </React.StrictMode>
);
