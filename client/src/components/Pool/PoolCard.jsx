import React, { Component } from "react";

class PoolCard extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <div className="">
          <div className="card shadow">
            <div className="card-header">
              {this.props.name}
              <button
                className="btn btn-primary  btn-sm  mt-1 float-right "
                onClick={() => this.props.requestPoolLeader(this.props.id)}
              >
                Request PoolLeader {this.props.poolLeader.nickName}
              </button>
            </div>
            <ul className="list-group list-group-flush">
              <li className="list-group-item">
                <span>{this.props.description}</span>
              </li>

              <li className="list-group-item">
                <strong>Members</strong>
                {this.props.userNickNamesTransient &&
                this.props.userNickNamesTransient.length
                  ? this.props.userNickNamesTransient.map(member => {
                      return (
                        <span className="badge badge-light ml-2">{member}</span>
                      );
                    })
                  : null}
                <div className="row">
                  <div className="col">
                    <input
                      type="text"
                      className="form-control mt-1"
                      aria-label="Small"
                      aria-describedby="inputGroup-sizing-sm"
                      placeholder="Enter Screenname of any member"
                    />
                  </div>
                  <div>
                    <button
                      className="btn btn-primary  btn-sm btn-block mt-2"
                      onClick={this.props.requestPoolMember}
                    >
                      Request member
                    </button>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default PoolCard;
