import React, { Component } from "react";
import { connect } from "react-redux";
import { poolActions } from "../../js/actions";
import _ from "lodash";
class Pool extends Component {
  state = {};
  componentDidMount() {
    this.props.getUserPool();
  }
  leavePool = () => {
    const userid = this.props.user.id;
    this.props.leavePool(userid)
  }

  deletePool = () => {
    const userid = this.props.user.id;
    this.props.deletePool(userid)
  }
  render() {
    const {
      id,
      name,
      description,
      neighbourhood,
      zip,
      poolLeaderScreenNameTransient,
      userScreenNamesTransient,
    } = this.props.poolDetail;

    return (
      <div className="mt-5 ">
        <div className="card">
          <div className="card-header">My Pool</div>
          <div className="card-body">
            {!_.isEmpty(this.props.poolDetail) ? (
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
                        value={name}
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
                        value={id}
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
                        value={description}
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
                        value={neighbourhood}
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
                        value={zip}
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
                        value={poolLeaderScreenNameTransient}
                      />
                    </div>
                  </div>
                </div>
                <div className="col-4">
                  <div className="row font-weight-bold">Members</div>
                  <div className="row">
                    <ul className="list-group">
                      {userScreenNamesTransient &&
                      userScreenNamesTransient.length
                        ? userScreenNamesTransient.map((screenName) => {
                            return (
                              <li className="list-group-item d-flex justify-content-around align-items-center">
                                <div className="row">
                                  <div className="col-6">{screenName}</div>
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
                            );
                          })
                        : null}
                    </ul>
                  </div>
                  <div className="row">
                    {this.props.user.screenName ===
                    poolLeaderScreenNameTransient ? (
                      <button type="button" className="btn btn-danger" onClick={() => this.leavePool}>
                        Delete
                      </button>
                    ) : (
                      <button type="button" className="btn btn-danger" onClick={() => this.deletePool}>
                        Leave
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToPros = (state) => ({
  poolDetail: state.poolReducer.userPool,
  user: state.auth.user,
});
const mapDispatchToProps = (dispatch) => ({
  getUserPool: () => dispatch(poolActions.getUserPool()),
  leavePool: (userId) => dispatch(poolActions.leavePool(userId)),
  deletePool: (userId) => dispatch(poolActions.deletePool(userId))
});
export default connect(mapStateToPros, mapDispatchToProps)(Pool);
