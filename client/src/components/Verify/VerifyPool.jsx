import React, { Component } from "react";
import {connect} from "react-redux";
import queryString from "query-string";
import { userActions } from "../../js/actions";

class VerifyPool extends Component {
  state = {};
  componentDidMount() {
    const queryParams = queryString.parse(this.props.location.search);
    const poolMemberId = queryParams.poolMemberId;
    this.props.verifyPool(poolMemberId)
  }
  render() {
    
    return (
      <div className="row justify-content-center mt-5">
        Pool membership has been changed.
      </div>
    );
  }
}


const mapDispatchToProps = dispatch => ({
    verifyPool: (poolMemberId) => dispatch(userActions.verifyPool(poolMemberId))
})
export default connect(null, mapDispatchToProps)(VerifyPool);
