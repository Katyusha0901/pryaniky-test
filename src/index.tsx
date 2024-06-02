import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App";
import { ChangeRowsAndAuthorizationContextProvider } from "./ChangeRowsAndAuthorizationContextProvider";
import { BrowserRouter as Router } from "react-router-dom";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <ChangeRowsAndAuthorizationContextProvider>
      <Router>
        <App />
      </Router>
    </ChangeRowsAndAuthorizationContextProvider>
  </React.StrictMode>
);
