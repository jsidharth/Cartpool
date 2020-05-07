import React, { Component } from "react";
import { poolActions } from "./../../js/actions/index";
import { connect } from "react-redux";

class CreatePool extends Component {
  state = {
    id: "",
    name: "",
    neighbourhood: "",
    description: "",
    zip: "",
  };
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  createPool = (e) => {
    e.preventDefault();
    const payload = { ...this.state };
    this.props.createPool(payload);
  };
  render() {
    return (
      <div className="mt-5 row justify-content-center">
        <div className="card w-50 ">
          <div className="card-header">Create Pool</div>
          <div className="card-body">
            <div className="row">
              <div className="col">
                <div className="row m-2">
                  <label className="col-sm-4 col-form-label font-weight-bold">
                    Pool Name
                  </label>
                  <div className="col-sm-8">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Pool Name"
                      aria-label="Pool Name"
                      aria-describedby="basic-addon1"
                      name="name"
                      value={this.state.name}
                      onChange={this.handleChange}
                    />
                  </div>
                </div>
                <div className="row m-2">
                  <label className="col-sm-4 col-form-label font-weight-bold">
                    Pool ID
                  </label>
                  <div className="col-sm-8">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Pool ID"
                      aria-label="Pool ID"
                      aria-describedby="basic-addon1"
                      name="id"
                      value={this.state.id}
                      onChange={this.handleChange}
                    />
                  </div>
                </div>
                <div className="row m-2">
                  <label className="col-sm-4 col-form-label font-weight-bold">
                    Description
                  </label>
                  <div className="col-sm-8">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Description"
                      aria-label="Description"
                      aria-describedby="basic-addon1"
                      name="description"
                      value={this.state.description}
                      onChange={this.handleChange}
                    />
                  </div>
                </div>
                <div className="row m-2">
                  <label className="col-sm-4 col-form-label font-weight-bold">
                    Neighborhood
                  </label>
                  <div className="col-sm-8">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Neighborhood"
                      aria-label="Neighborhood"
                      aria-describedby="basic-addon1"
                      name="neighbourhood"
                      value={this.state.neighbourhood}
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
                      aria-describedby="basic-addon1"
                      name="zip"
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
                onClick={this.createPool}
              >
                Create
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  createPool: (payload) => dispatch(poolActions.createPool(payload, ownProps)),
});

export default connect(null, mapDispatchToProps)(CreatePool);
