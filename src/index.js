import "babel-polyfill";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { router } from "./router.js";

// render the main component
ReactDOM.render(
  <Provider>
  {router}
  </Provider>,
  document.getElementById('app')
);
