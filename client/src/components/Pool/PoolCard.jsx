import React, { Component } from "react";
import { connect } from "react-redux";
import { toast } from "react-toastify";
class PoolCard extends Component {
  state = {
    screenName: "",
  };

  handleChange = (e) => {
    //console.log(e.target);
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  render() {
    return (
      <React.Fragment>
        <div className="mt-3">
          <div className="card shadow">
            <div className="card-header">
              <strong>{this.props.name}</strong>
              <button
                className="btn btn-primary  btn-sm  mt-1 float-right "
                onClick={() => {
                  if (
                    !this.props.user.screenName ||
                    !this.props.user.street ||
                    !this.props.user.city ||
                    !this.props.user.state ||
                    !this.props.user.zip
                  ) {
                    toast.error(
                      "Incomplete account info. Please fill account details!"
                    );
                  } else {
                    this.props.requestPoolLeader(this.props.id);
                  }
                }}
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
                  ? this.props.userNickNamesTransient.map((member) => {
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
                      placeholder="Enter Screen name of any member"
                      value={this.state.screenName}
                      onChange={this.handleChange}
                      name="screenName"
                    />
                  </div>
                  <div>
                    <button
                      className="btn btn-primary  btn-sm btn-block mt-2"
                      onClick={() =>
                        this.props.requestPoolMember(
                          this.props.id,
                          this.state.screenName
                        )
                      }
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

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

export default connect(mapStateToProps)(PoolCard);
