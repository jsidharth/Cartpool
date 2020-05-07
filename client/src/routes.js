import React from "react";
import { Route } from "react-router-dom";
import Main from "./components/Main";
import SignIn from "./components/SignIn/SignIn";
import Signup from "./components/Signup/Signup";
import BrowsePool from "./components/BrowsePool/BrowsePool";
import PoolDetail from "./components/PoolDetail/PoolDetail";
import StoreDetail from "./components/StoreDetail/StoreDetail";
import { ToastContainer } from "react-toastify";
import Browse from "./components/Browse/Browse";
import Account from "./components/Account/Account";
import AdminProductHome from "./components/Admin/AdminProductHome";
import AdminProductForm from "./components/Admin/AdminProductForm";
import AdminProductDV from "./components/Admin/AdminProductDV";
import AdminStoreHome from "./components/Admin/AdminStoreHome";
import AdminStoreForm from "./components/Admin/AdminStoreForm";
import Cart from "./components/Cart/Cart";
import CreatePool from "./components/CreatePool/CreatePool";
import OrderDv from "./components/Order/OrderDv";

const Routes = () => {
  return (
    <div>
      <Route exact path="/" component={Main} />
      <Route exact path="/signin" component={SignIn} />
      <Route exact path="/signup" component={Signup} />
      <Route exact path="/browse/stores" component={Browse} />
      <Route exact path="/pool/browse" component={BrowsePool} />
      <Route exact path="/pool/detail" component={PoolDetail} />
      <Route exact path="/store/detail/:storeName" component={StoreDetail} />
      <Route exact path="/account" component={Account} />
      <Route exact path="/cart" component={Cart} />
      <Route exact path="/pool/create" component={CreatePool} />
      <Route exact path="/order" component={OrderDv} />
      <Route exact path="/admin/stores" component={AdminStoreHome} />
      <Route exact path="/admin/products" component={AdminProductHome} />
      <Route exact path="/admin/products/add" component={AdminProductForm} />
      <Route exact path="/admin/products/dv/:id" component={AdminProductDV} />
      <Route
        exact
        path="/admin/products/edit/:id"
        component={AdminProductForm}
      />
      <Route
        exact
        path="/admin/stores/edit/:storeName"
        component={AdminStoreForm}
      />
      <Route exact path="/admin/stores/add" component={AdminStoreForm} />
      <ToastContainer autoClose={2000} />
    </div>
  );
};

export default Routes;
