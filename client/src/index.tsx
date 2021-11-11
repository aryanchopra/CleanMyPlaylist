import React from "react";
import { render } from "react-dom";
import "./style.css";
import App from "./App";

import { BrowserRouter as Router } from "react-router-dom";

render(
  <Router>
    <App />
  </Router>,

  document.querySelector("#root")
);
