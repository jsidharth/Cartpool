import React, { Component } from "react";

class PoolCard extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <div className="">
          <div className="card">
            <div className="card-header">PoolName</div>
            <ul className="list-group list-group-flush">
              <li className="list-group-item">
                <span>description dsfsdfv sdf sd fsa fsd sadf sadf sf</span>
              </li>
              <li className="list-group-item">
                <strong>PoolLeader</strong>
                <span className="badge badge-light">Sidharth</span>
                <button className="btn btn-primary  btn-sm btn-block mt-1 ">
                  Request PoolLeader
                </button>
              </li>
              <li className="list-group-item">
                <strong>Members</strong>
                <span className="badge badge-light ml-2">Member2</span>
                <span className="badge badge-light ml-2">Member2</span>
                <input
                  type="text"
                  className="form-control mt-1"
                  aria-label="Small"
                  aria-describedby="inputGroup-sizing-sm"
                  placeholder="Enter Screenname of any member"
                />
                <button className="btn btn-primary  btn-sm btn-block mt-2">
                  Request member
                </button>
              </li>
            </ul>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default PoolCard;
