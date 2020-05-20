import React, { useEffect } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

export default ChildComponent => {
  const ComposedComponent = props => {
    useEffect(() => {
      if (props.auth.isLoaded && props.auth.isEmpty) return props.history.push("/");
    }, [props.auth, props.history]);

    return <ChildComponent {...props} />;
  };

  function mapStateToProps(state) {
    return {
      auth: state.firebaseReducer.auth
    };
  }

  return connect(mapStateToProps)(withRouter(ComposedComponent));
};