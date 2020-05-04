import React from "react";
import SignIn from "./SignIn/SignIn";
import Home from "./Home/Home";
import { connect } from "react-redux";

const Main = ({ auth }) => {
  return (
    <div>
      <div>{auth.isEmpty ? <SignIn /> : <Home />}</div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.firebaseReducer.auth,
});
export default connect(mapStateToProps)(Main);
