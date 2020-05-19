import React, { Component } from "react";
import { connect } from "react-redux";
import { poolActions } from "../../js/actions";
import _ from "lodash";
import Modal from "react-modal";
Modal.setAppElement("#root");
class Pool extends Component {
  state = { showModal: false, message: "" };
  componentDidMount() {
    this.props.getUserPool();
  }
  handleOpenModal = screenName => {
    //alert("here");
    this.setState({ showModal: true, screenName });
  };
  handleCloseModal = () => {
    this.setState({ showModal: false });
  };

  leavePool = () => {
    alert("You are about to leave pool");
    const userid = this.props.user.id;
    this.props.leavePool(userid);
  };

  deletePool = () => {
    alert("You are about to delete pool");
    const userid = this.props.user.id;
    this.props.deletePool(userid);
  };
  onSendMessage = () => {
    alert("send message clicked");
    const data = {};
    data["screenName"] = this.state.screenName;
    data["message"] = this.state.message;
    console.log(data);
    this.props.sendMessage(data);
    this.setState({ showModal: false });
  };

  handleChange = ({ currentTarget: input }) => {
    const message = input.value;
    //data["message"] = input.value;
    this.setState({ message });
  };

  render() {
    const {
      id,
      name,
      description,
      neighbourhood,
      zip,
      poolLeaderScreenNameTransient,
      userScreenNamesTransient
    } = this.props.poolDetail;

    return (
      <React.Fragment>
        <React.Fragment>
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
                            ? userScreenNamesTransient.map(screenName => {
                                return (
                                  <li className="list-group-item d-flex justify-content-around align-items-center">
                                    <div className="row">
                                      <div className="col">{screenName}</div>
                                      {screenName !==
                                        poolLeaderScreenNameTransient && (
                                        <div className="col">
                                          <button
                                            type="button"
                                            className="btn btn-outline-primary btn-sm"
                                            onClick={() =>
                                              this.handleOpenModal(screenName)
                                            }
                                          >
                                            Message
                                          </button>
                                        </div>
                                      )}
                                    </div>
                                  </li>
                                );
                              })
                            : null}
                        </ul>
                      </div>
                      <div className="row mt-2">
                        {this.props.user.screenName ===
                        poolLeaderScreenNameTransient ? (
                          <button
                            type="button"
                            className="btn btn-danger"
                            onClick={this.deletePool}
                          >
                            Delete Pool
                          </button>
                        ) : (
                          <button
                            type="button"
                            className="btn btn-danger"
                            onClick={this.leavePool}
                          >
                            Leave Pool
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </React.Fragment>
        <Modal
          isOpen={this.state.showModal}
          contentLabel="Minimal Modal Example"
        >
          <button
            onClick={() => this.handleCloseModal()}
            className="btn btn-light float-right"
          >
            x
          </button>
          <h4>Send Message</h4>
          <p>
            to: <strong>{" " + this.state.screenName}</strong>
          </p>
          <textarea
            onChange={this.handleChange}
            class="form-control"
            rows={3}
          />
          <button
            onClick={() => this.onSendMessage()}
            className="btn btn-primary float-right m-2"
          >
            Send Message
          </button>
        </Modal>
      </React.Fragment>
    );
  }
}

const mapStateToPros = state => ({
  poolDetail: state.poolReducer.userPool,
  user: state.auth.user
});
const mapDispatchToProps = (dispatch, ownProps) => ({
  getUserPool: () => dispatch(poolActions.getUserPool()),
  leavePool: userId => dispatch(poolActions.leavePool(ownProps)),
  deletePool: userId => dispatch(poolActions.deletePool(ownProps)),
  sendMessage: data => dispatch(poolActions.sendMessage(data))
});
export default connect(mapStateToPros, mapDispatchToProps)(Pool);
