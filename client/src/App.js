import React, { Fragment } from "react";

import Navbar from "./components/navbar";
import Home from "./components/pages/home";
import About from "./components/pages/about";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";

import ContactState from "./components/context/contact/ContactState";
import AlertState from "./components/context/alerts/AlertState";
import AuthState from "./components/context/auth/AuthState";
// import AuthContext from "./components/context/auth/authContext";
// import SetAuthToken from "../src/components/SetAuthToken"
import PrivateRoute from "./components/routing/PrivateRoutes";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";

const App = () => {
  // const authContext = useContext(AuthContext);
  // const { loadUser } = authContext;

  // if (localStorage.token) {
  //   // console.log(AuthContext)
  //   loadUser();
  // }
  return (
    <AlertState>
      <AuthState>
        <ContactState>
          <Router>
            <Fragment>
              <Navbar />
              <div className="container">
                <Switch>
                  <PrivateRoute exact path="/" component={Home}></PrivateRoute>
                  <Route exact path="/login" component={Login}></Route>
                  <Route exact path="/register" component={Register}></Route>
                  <Route exact path="/about" component={About}></Route>
                </Switch>
              </div>
            </Fragment>
          </Router>
        </ContactState>
      </AuthState>
    </AlertState>
  );
};

export default App;
