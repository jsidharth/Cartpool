import React from "react";
import { Route } from "react-router-dom";
import Main from "./components/Main"
import SignIn from "./components/SignIn/SignIn";
import Signup from "./components/Signup/Signup";
import Home from "./components/Home/Home";
import { ToastContainer } from "react-toastify";

const Routes = () => {
  return (
    <div>
      <Route exact path="/" component={Main} />
      <Route exact path="/signin" component={SignIn} />
      <Route exact path="/signup" component={Signup} />
      <Route exact path="/home" component={Home} />
      <ToastContainer autoClose={2000}/>
    </div>
  );
};

export default Routes;
