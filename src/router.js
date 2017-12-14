import React from "react";
import {Route, Redirect, HashRouter, BrowserRouter, Switch} from 'react-router-dom';
import Home from "./components/Home";
import NotFound from "./components/NotFound";
import ProfilePage from './components/ProfilePage';

const router = (
  <BrowserRouter>
    <Switch>
      <Route path="/profile" component={ProfilePage} />
      <Route path="/" component={Home} />
    </Switch>
  </BrowserRouter>
);

// export
export { router };
