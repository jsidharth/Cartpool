import React, { Component } from "react";
import { connect } from "react-redux";
import PoolCard from "../Pool/PoolCard";
import { Link } from "react-router-dom";
import { poolActions } from "../../js/actions";
class BrowsePool extends Component {
  componentDidMount() {
    this.props.getPools();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.pools.length != this.props.pools.length) {
      this.props.getPools();
    }
  }

  requestPoolLeader = id => {
    alert(id);
    this.props.requestToJoinPool(id, "");
  };

  requestPoolMember = e => {
    e.preventDefault();
  };

  render() {
    return (
      <React.Fragment>
        <Link className=" btn btn-primary float-right m-2" to="/pool/create">
          Create pool
        </Link>
        <h2>Browse Pools</h2>

        <div className="row">
          {this.props.pools && this.props.pools.length
            ? this.props.pools.map(pool => {
                return (
                  <div className="col-6 float-left">
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
      </React.Fragment>
    );
  }
}
const mapStateToProps = state => ({
  pools: state.poolReducer.pools
});
const mapDispatchToProps = dispatch => ({
  getPools: () => dispatch(poolActions.getPools()),
  requestToJoinPool: (id, screenName) =>
    dispatch(poolActions.requestToJoinPool(id, screenName))
});
export default connect(mapStateToProps, mapDispatchToProps)(BrowsePool);
