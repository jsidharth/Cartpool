import React, { Component } from "react";
import { connect } from "react-redux";
import PoolCard from "../Pool/PoolCard";
import { Link } from "react-router-dom";
import { poolActions } from "../../js/actions";
class BrowsePool extends Component {
  componentDidMount() {
    if (!this.props.pools.length) {
      this.props.getPools();
    }
  }

  requestPoolLeader = (e) => {
    e.preventDefault();
  };

  requestPoolMember = (e) => {
    e.preventDefault();
  };

  render() {
    return (
      <div>
        {/* TODO: Style this heading */}
        <div className="row">
          <div className="col">
            <h1 className="display-4">Pools</h1>
          </div>
          <div className="col">
            <Link to="/pool/create">
              <button type="button" class="btn btn-outline-success">
                Create
              </button>
            </Link>
          </div>
        </div>
        <div className="row justify-content-around">
          {this.props.pools && this.props.pools.length
            ? this.props.pools.map((pool) => {
                return (
                  <div className="col-3 float-left">
                    <PoolCard
                      {...pool}
                      requestPoolLeader={this.requestPoolLeader}
                      requestPoolMember={this.requestPoolMember}
                    />
                  </div>
                );
              })
            : null}
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  pools: state.poolReducer.pools,
});
const mapDispatchToProps = (dispatch) => ({
  getPools: () => dispatch(poolActions.getPools()),
});
export default connect(mapStateToProps, mapDispatchToProps)(BrowsePool);
