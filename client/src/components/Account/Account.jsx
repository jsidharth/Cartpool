import React, { Component } from "react";
import { connect } from "react-redux";
import { userActions } from "./../../js/actions";
import _ from 'lodash';
class Account extends Component {
  state = {
    screenName: "",
    nickName: "",
    email: "",
    imgUrl: "",
    street: "",
    city: "",
    state: "",
    zip: "",
    credit: "",
    verified: "",
  };

  static getDerivedStateFromProps(props, state) {
    if(!_.isEqual(props.user.screenName, state.screenName)) {
      return {...props.user}
    }
  }

  componentDidMount() {
    this.props.getDetails();
  }

  // componentDidUpdate(prevProps) {
  //   if(!_.isEqual(this.props.user, prevProps.user)) 
  //   {
  //     this.setState({
  //       ...this.props.user
  //     });
  //   }
  // } 

  handleChange = (e) => {
    console.log(e.target);
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  updateProfile = (e) => {
    e.preventDefault();
    const payload = { ...this.state };
    this.props.updateProfile(payload);
  };
  render() {
    
    return (
      <div className="mt-5 ">
        <div className="card">
          <div className="card-header">Account Information</div>
          <div className="card-body">
            <div className="row">
              <div className="col-6">
                <div className="row ml-5">
                  <img
                    src={this.state.imgUrl}
                    className="rounded img-thumbnail"
                    alt="..."
                    max-width="100%"
                    height="200px"
                  />
                </div>
                <div className="row ml-5">
                  <label className="col-sm-4 col-form-label font-weight-bold">
                    Verified
                  </label>
                  <div className="col-sm-8">
                    <input
                      type="text"
                      className="form-control-plaintext"
                      disabled
                      value={this.state.verified ? "YES" : "NO"}
                    />
                  </div>
                </div>
                <div className="row ml-5">
                  <label className="col-sm-4 col-form-label font-weight-bold">
                    Contribution Credit
                  </label>
                  <div className="col-sm-8">
                    <input
                      type="text"
                      className="form-control-plaintext"
                      disabled
                      value={this.state.credit}
                    />
                  </div>
                </div>
              </div>

              <div className="col-6">
                <div className="row m-2">
                  <label className="col-sm-4 col-form-label font-weight-bold">
                    Screen Name
                  </label>
                  <div className="col-sm-8">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Screen Name"
                      aria-label="Screen Name"
                      disabled
                      aria-describedby="basic-addon1"
                      value={this.state.screenName}
                    />
                  </div>
                </div>
                <div className="row m-2">
                  <label className="col-sm-4 col-form-label font-weight-bold">
                    Nick Name
                  </label>
                  <div className="col-sm-8">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Nick name"
                      aria-label="Nick name"
                      aria-describedby="basic-addon1"
                      name="nickName"
                      value={this.state.nickName}
                      onChange={this.handleChange}
                    />
                  </div>
                </div>
                <div className="row m-2">
                  <label className="col-sm-4 col-form-label font-weight-bold">
                    Email
                  </label>
                  <div className="col-sm-8">
                    <input
                      type="text"
                      className="form-control-plaintext"
                      id="staticEmail"
                      disabled
                      value={this.state.email}
                    />
                  </div>
                </div>
                <div className="row m-2">
                  <label className="col-sm-4 col-form-label font-weight-bold">
                    Image
                  </label>
                  <div className="col-sm-8">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Image url"
                      aria-label="Image"
                      aria-describedby="basic-addon1"
                      name="imgUrl"
                      value={this.state.imgUrl}
                      onChange={this.handleChange}
                    />
                  </div>
                </div>
                <div className="row m-2">
                  <label className="col-sm-4 col-form-label font-weight-bold">
                    Street
                  </label>
                  <div className="col-sm-8">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Street"
                      aria-label="Street"
                      aria-describedby="basic-addon1"
                      name="street"
                      value={this.state.street}
                      onChange={this.handleChange}
                    />
                  </div>
                </div>
                <div className="row m-2">
                  <label className="col-sm-4 col-form-label font-weight-bold">
                    City
                  </label>
                  <div className="col-sm-8">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="City"
                      aria-label="City"
                      aria-describedby="basic-addon1"
                      name="city"
                      value={this.state.city}
                      onChange={this.handleChange}
                    />
                  </div>
                </div>
                <div className="row m-2">
                  <label className="col-sm-4 col-form-label font-weight-bold">
                    State
                  </label>
                  <div className="col-sm-8">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="State"
                      aria-label="State"
                      aria-describedby="basic-addon1"
                      name="state"
                      value={this.state.state}
                      onChange={this.handleChange}
                    />
                  </div>
                </div>
                <div className="row m-2">
                  <label className="col-sm-4 col-form-label font-weight-bold">
                    Zipcode
                  </label>
                  <div className="col-sm-8">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Zipcode"
                      aria-label="Zipcode"
                      name="zip"
                      aria-describedby="basic-addon1"
                      value={this.state.zip}
                      onChange={this.handleChange}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="row m-3 float-right">
              <button
                type="button"
                className="btn btn-outline-success"
                onClick={this.updateProfile}
              >
                Update
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

const mapDispatchToProps = (dispatch) => ({
  updateProfile: (payload) => dispatch(userActions.updateProfile(payload)),
  getDetails: () => dispatch(userActions.getDetails())
});
export default connect(mapStateToProps, mapDispatchToProps)(Account);
