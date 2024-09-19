import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./app/app";
import axios from "axios";

axios.defaults.headers.common = {
  "ngrok-skip-browser-warning": "69420"
};

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
