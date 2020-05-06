import "./style.css";
import React, { Component } from "react";
import { connect } from "react-redux";
import { authActions } from "./../../js/actions/index";
import { FcGoogle } from "react-icons/fc";
<<<<<<< HEAD
=======
import { ToastContainer } from "react-toastify";
>>>>>>> db8d55d0599f963f8fbbe19bcf51f0a6aff9ad76

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      nickName: "",
      email: "",
      password: ""
    };
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  signUp = e => {
    e.preventDefault();
    const payload = this.state;
    this.props.signUp(payload);
  };

  render() {
    return (
      <div className="signupContainer">
        <div className="signupCard card shadow p-2">
          <div className="card-body">
            <label className="font-weight-bold">
              Register your Cartpool Account.
            </label>
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text" id="basic-addon1">
                  First Name
                </span>
              </div>
              <input
                type="text"
                className="form-control"
                placeholder="First name"
                aria-label="First name"
                name="firstName"
                aria-describedby="basic-addon1"
                onChange={this.handleChange}
              />
            </div>
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text" id="basic-addon1">
                  Last Name
                </span>
              </div>
              <input
                type="text"
                className="form-control"
                placeholder="Last Name"
                aria-label="Last Name"
                name="lastName"
                aria-describedby="basic-addon1"
                onChange={this.handleChange}
              />
            </div>
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text" id="basic-addon1">
                  Nick Name
                </span>
              </div>
              <input
                type="text"
                className="form-control"
                placeholder="Nick Name"
                aria-label="Nick Name"
                name="nickName"
                aria-describedby="basic-addon1"
                onChange={this.handleChange}
              />
            </div>
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text" id="basic-addon1">
                  Email
                </span>
              </div>
              <input
                type="email"
                className="form-control"
                placeholder="Email"
                aria-label="Email"
                name="email"
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
                className="form-control"
                placeholder="Password"
                aria-label="Password"
                name="password"
                aria-describedby="basic-addon1"
                onChange={this.handleChange}
              />
            </div>
            <div className="input-group mt-3">
              <button
                type="button"
                className="btn btn-outline-success btn-block"
                onClick={this.signUp}
              >
                Sign Up
              </button>
            </div>
            <div className="input-group mt-3">
              <button
                type="button"
                className="btn btn-outline-success btn-block"
                onClick={this.props.googleSignUp}
              >
                <span>
                  <FcGoogle />
                </span>{" "}
                Google Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  signUp: payload => dispatch(authActions.signUp(payload, ownProps)),
  googleSignUp: () => dispatch(authActions.googleSignUp(ownProps))
});

export default connect(null, mapDispatchToProps)(Signup);
