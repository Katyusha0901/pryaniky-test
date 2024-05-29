import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App";
import { AuthorizationContextProvider } from "./AuthorizationContextProvider";
import { BrowserRouter as Router } from "react-router-dom";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <AuthorizationContextProvider>
      <Router>
        <App />
      </Router>
    </AuthorizationContextProvider>
  </React.StrictMode>
);
