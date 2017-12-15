import "babel-polyfill";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { store } from "./store.js";
import { router } from "./router.js";

const store = store.con

// render the main component
ReactDOM.render(

    {router}
 ,
  document.getElementById('app')
);
