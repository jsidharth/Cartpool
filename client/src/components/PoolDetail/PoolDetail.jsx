import React, { Component } from "react";
import poolLogo from "./../../assets/carpool.jpg";
class Pool extends Component {
  state = {};
  render() {
    return (
      <div className="mt-5 ">
        <div className="card">
          <div className="card-header">My Pool</div>
          <div className="card-body">
            <div className="row">
              <div className="col-8">
                <div className="row">
                  <label className="col-sm-4 col-form-label font-weight-bold">
                    Name
                  </label>
                  <div className="col-sm-8">
                    <input
                      type="text"
                      readonly
                      className="form-control-plaintext"
                      id="staticEmail"
                      value="Pool Name"
                    />
                  </div>
                </div>
                <div className="row">
                  <label className="col-sm-4 col-form-label font-weight-bold">
                    ID
                  </label>
                  <div className="col-sm-8">
                    <input
                      type="text"
                      readonly
                      className="form-control-plaintext"
                      id="staticEmail"
                      value="Pool ID"
                    />
                  </div>
                </div>
                <div className="row">
                  <label className="col-sm-4 col-form-label font-weight-bold">
                    Description
                  </label>
                  <div className="col-sm-8">
                    <input
                      type="text"
                      readonly
                      className="form-control-plaintext"
                      id="staticEmail"
                      value="Pool Description"
                    />
                  </div>
                </div>
                <div className="row">
                  <label className="col-sm-4 col-form-label font-weight-bold">
                    Neighborhood
                  </label>
                  <div className="col-sm-8">
                    <input
                      type="text"
                      readonly
                      className="form-control-plaintext"
                      id="staticEmail"
                      value="San Jose"
                    />
                  </div>
                </div>
                <div className="row">
                  <label className="col-sm-4 col-form-label font-weight-bold">
                    Zipcode
                  </label>
                  <div className="col-sm-8">
                    <input
                      type="text"
                      readonly
                      className="form-control-plaintext"
                      id="staticEmail"
                      value="95112"
                    />
                  </div>
                </div>
                <div className="row">
                  <label className="col-sm-4 col-form-label font-weight-bold">
                    Pool Leader
                  </label>
                  <div className="col-sm-8">
                    <input
                      type="text"
                      readonly
                      className="form-control-plaintext"
                      id="staticEmail"
                      value="Jojo"
                    />
                  </div>
                </div>
              </div>
              <div className="col-4">
                <div className="row font-weight-bold">Members</div>
                <div className="row">
                  <ul className="list-group">
                    <li className="list-group-item d-flex justify-content-around align-items-center">
                      <div className="row">
                        <div className="col-6">Sushant</div>
                        <div className="col-6">
                          <button
                            type="button"
                            className="btn btn-outline-primary btn-sm"
                          >
                            Message
                          </button>
                        </div>
                      </div>
                    </li>
                    <li className="list-group-item d-flex justify-content-around align-items-center">
                      <div className="row">
                        <div className="col-6">Harsh</div>
                        <div className="col-6">
                          <button
                            type="button"
                            className="btn btn-outline-primary btn-sm"
                          >
                            Message
                          </button>
                        </div>
                      </div>
                    </li>
                    <li className="list-group-item d-flex justify-content-around align-items-center">
                      <div className="row">
                        <div className="col-6">Jojo</div>
                        <div className="col-6">
                          <button
                            type="button"
                            className="btn btn-outline-primary btn-sm"
                          >
                            Message
                          </button>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Pool;
