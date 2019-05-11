import React from "react";
import { Route, Switch } from 'react-router-dom';
import { Home } from './components/Home/Home.js';
import { Login } from './components/Login/Login.js';
import { Signup } from './components/Signup/Signup.js';
import { PrivateRoute } from './components/PrivateRoute.js';
import "./App.css";

function App() {
  return (
    <div className="App">
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/signup" component={Signup} />
          <PrivateRoute path="/home" component={Home} />
        </Switch>
    </div>
  );
}

export default App;
