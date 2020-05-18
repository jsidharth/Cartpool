import React, { Component } from "react";
import {connect} from "react-redux";
import queryString from "query-string";
import { userActions } from "../../js/actions";
import requireAuth from "./../RequireAuth/RequireAuth";

class VerifyEMail extends Component {
  state = {};
  componentDidMount() {
    const queryParams = queryString.parse(this.props.location.search);
    const userEmail = queryParams.userEmail;
    this.props.verifyEmail(userEmail)
  }
  render() {
    
    return (
      <div className="row justify-content-center mt-7">
        Your email has been verified
      </div>
    );
  }
}

const mapStateToProps = state => ({

})
const mapDispatchToProps = dispatch => ({
    verifyEmail: (userEmail) => dispatch(userActions.verifyEmail(userEmail))
})
export default requireAuth(connect(mapStateToProps, mapDispatchToProps)(VerifyEMail));
