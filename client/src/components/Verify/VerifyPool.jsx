import React, { Component } from "react";
import {connect} from "react-redux";
import queryString from "query-string";
import { userActions } from "../../js/actions";

class VerifyPool extends Component {
  state = {};
  componentDidMount() {
    const queryParams = queryString.parse(this.props.location.search);
    const poolMemberId = queryParams.poolMemberId;
    const accept = queryParams.accept;
    this.props.verifyPool(poolMemberId, accept)
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
    verifyPool: (poolMemberId, accept) => dispatch(userActions.verifyPool(poolMemberId, accept))
})
export default connect(null, mapDispatchToProps)(VerifyPool);
