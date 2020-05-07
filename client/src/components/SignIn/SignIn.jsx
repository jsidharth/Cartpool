import "./style.css";
import React, { Component } from "react";
import { connect } from "react-redux";
import { FcGoogle } from "react-icons/fc";
import { Link, withRouter } from "react-router-dom";
import { authActions } from "../../js/actions";

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
  }
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  signIn = (e) => {
    e.preventDefault();
    const payload = this.state;
    this.props.signIn(payload);
  };
  render() {
    return (
      <div className="signinContainer">
        <div className="signinCard card shadow p-2">
          <div className="card-body">
            <label className="font-weight-bold">
              Sign in with your Cartpool Account.
            </label>
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text" id="basic-addon1">
                  Email
                </span>
              </div>
              <input
                type="email"
                name="email"
                className="form-control"
                placeholder="Email"
                aria-label="Email"
                aria-describedby="basic-addon1"
                onChange={this.handleChange}
              />
            </div>
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text" id="basic-addon1">
                  Password
                </span>
              </div>
              <input
                type="password"
                name="password"
                className="form-control"
                placeholder="Password"
                aria-label="Password"
                aria-describedby="basic-addon1"
                onChange={this.handleChange}
              />
            </div>
            <div className="input-group mb-3">
              <button
                type="button"
                className="btn btn-outline-success btn-block"
                onClick={this.signIn}
              >
                Sign In
              </button>
            </div>
            <div className="input-group mb-3">
              <button
                type="button"
                className="btn btn-outline-success btn-block"
                onClick={this.props.googleSignIn}
              >
                <span>
                  <FcGoogle />
                </span>{" "}
                Google Sign In
              </button>
            </div>
            <div>
              <Link to="/signup">Don't have an account yet? SignUp!</Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  signIn: (payload) => dispatch(authActions.signIn(payload, ownProps)),
  googleSignIn: () => dispatch(authActions.googleSignIn(ownProps)),
});

export default withRouter(connect(null, mapDispatchToProps)(SignIn));
