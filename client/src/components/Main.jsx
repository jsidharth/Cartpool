import React from "react";
import SignIn from "./SignIn/SignIn";
import { connect } from "react-redux";
import Browse from "./Browse/Browse";

const Main = ({ auth }) => {
  return (
    <div>
      <div>{auth.isEmpty ? <SignIn /> : <Browse />}</div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.firebaseReducer.auth,
});
export default connect(mapStateToProps)(Main);
