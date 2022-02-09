import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import PastesState from "./contexts/pastes/State";

ReactDOM.render(
  <React.StrictMode>
    <PastesState>
      <App />
    </PastesState>
  </React.StrictMode>,
  document.getElementById("root")
);
