import React, { Component } from "react";

class PoolCard extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <div className="">
          <div className="card">
            <div className="card-header">{this.props.name}</div>
            <ul className="list-group list-group-flush">
              <li className="list-group-item">
                <span>{this.props.description}</span>
              </li>
              <li className="list-group-item">
                <strong>PoolLeader</strong>
                <span className="badge badge-light">
                  {this.props.poolLeader.nickName}
                </span>
                <button className="btn btn-primary  btn-sm btn-block mt-1 " onClick={this.props.requestPoolLeader}>
                  Request PoolLeader
                </button>
              </li>
              <li className="list-group-item">
                <strong>Members</strong>
                {this.props.userNickNamesTransient && this.props.userNickNamesTransient.length
                  ? this.props.userNickNamesTransient.map((member) => {
                      return (
                        <span className="badge badge-light ml-2">
                          {member}
                        </span>
                      );
                    })
                  : null}
                <input
                  type="text"
                  className="form-control mt-1"
                  aria-label="Small"
                  aria-describedby="inputGroup-sizing-sm"
                  placeholder="Enter Screenname of any member"
                />
                <button className="btn btn-primary  btn-sm btn-block mt-2" onClick={this.props.requestPoolMember}>
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
