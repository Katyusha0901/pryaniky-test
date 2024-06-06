import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App";
import { ChangeRowsContextProvider } from "./context/ChangeRowsContext";
import { AuthorizationContextProvider } from "./context/AuthorizationContext";
import { BrowserRouter as Router } from "react-router-dom";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <ChangeRowsContextProvider>
      <AuthorizationContextProvider>
        <Router>
          <App />
        </Router>
      </AuthorizationContextProvider>
    </ChangeRowsContextProvider>
  </React.StrictMode>
);
