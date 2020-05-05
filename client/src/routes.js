import React from "react";
import { Route } from "react-router-dom";
import Main from "./components/Main";
import SignIn from "./components/SignIn/SignIn";
import Signup from "./components/Signup/Signup";
import Home from "./components/Home/Home";
import { ToastContainer } from "react-toastify";
import AdminProductHome from "./components/Admin/AdminProductHome";
import AdminProductForm from "./components/Admin/AdminProductForm";
import AdminProductDV from "./components/Admin/AdminProductDV";
import AdminStoreHome from "./components/Admin/AdminStoreHome";
import AdminStoreForm from "./components/Admin/AdminStoreForm";

const Routes = () => {
  return (
    <div>
      <Route exact path="/" component={Main} />
      <Route exact path="/signin" component={SignIn} />
      <Route exact path="/signup" component={Signup} />
      <Route exact path="/home" component={Home} />
      <Route exact path="/admin/products/add" component={AdminProductForm} />
      <Route exact path="/admin/products/dv/:id" component={AdminProductDV} />
      <Route
        exact
        path="/admin/products/edit/:id"
        component={AdminProductForm}
      />
      <Route exact path="/admin/products" component={AdminProductHome} />

      <Route
        exact
        path="/admin/stores/edit/:storeName"
        component={AdminStoreForm}
      />
      <Route exact path="/admin/stores/add" component={AdminStoreForm} />
      <Route exact path="/admin/stores" component={AdminStoreHome} />
      <ToastContainer autoClose={2000} />
    </div>
  );
};

export default Routes;
