import React from "react";
import { Route } from "react-router-dom";
import Main from "./components/Main"
import SignIn from "./components/SignIn/SignIn";
import Signup from "./components/Signup/Signup";
import BrowsePool from "./components/BrowsePool/BrowsePool";
import PoolDetail from "./components/PoolDetail/PoolDetail";
import StoreDetail from "./components/StoreDetail/StoreDetail";
import { ToastContainer } from "react-toastify";
import Browse from "./components/Browse/Browse";
import Account from "./components/Account/Account";

const Routes = () => {
  return (
    <div>
      <Route exact path="/" component={Main} />
      <Route exact path="/signin" component={SignIn} />
      <Route exact path="/signup" component={Signup} />
      <Route exact path="/browse/stores" component={Browse} />
      <Route exact path="/pool/browse" component={BrowsePool}/>
      {/* TODO:Change the route to /pool/{id} */}
      <Route exact path="/pool/detail" component={PoolDetail} />
      {/* TODO:Change the route to /store/{id} */}
      <Route exact path="/store/detail" component={StoreDetail} />
      {/* TODO:Change the route to /account/{id} */}
      <Route exact path="/account" component={Account} />
      <ToastContainer autoClose={2000}/>
    </div>
  );
};

export default Routes;
