// path-filtering isolation test: dashboard-only change, no-op
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app.js";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
