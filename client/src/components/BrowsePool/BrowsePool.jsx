import React, { Component } from "react";
import { connect } from "react-redux";
import PoolCard from "../Pool/PoolCard";
import { Link } from "react-router-dom";
import { poolActions } from "../../js/actions";
import _ from "lodash";
class BrowsePool extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchfield: "",
      pools: []
    };
  }
  componentDidMount() {
    this.props.getPools();
  }

  componentDidUpdate(prevProps) {
    if (!_.isEqual(prevProps.pools, this.props.pools) )  {
      this.setState({
        pools: this.props.pools
      });
    }
  }

  componentWillUnmount() {
    this.props.clearPools();
  }

  requestPoolLeader = (id) => {
    //alert(id);
    this.props.requestToJoinPool(id, "");
  };

  requestPoolMember = (id, screenName) => {
    //alert(id + " - " + screenName);
    this.props.requestToJoinPool(id, screenName);
  };

  setSearch = (field) => {
    this.setState({
      searchfield: field,
    });
  };

  searchPool = (e) => {
    console.log(this.state.searchfield, this.props.pools )
    if (this.state.searchfield && this.props.pools && this.props.pools.length) {
      console.log('hre')
      const serachParam = `^${e.target.value}.*$`;
      const regex = new RegExp(serachParam, "i");
      const searchField = this.state.searchfield;
      const searchResults = this.props.pools.filter((pool) => {
        const match = pool[searchField].match(regex);
        return match && match.length && pool;
      });
      console.log(searchResults)
      this.setState({
        pools: searchResults,
      });
    }
  };

  render() {
    return (
      <React.Fragment>
        <Link className=" btn btn-primary float-right m-2" to="/pool/create">
          Create pool
        </Link>
        <h2>Browse Pools</h2>
        <div className="input-group mb-3">
          <div className="input-group-prepend">
            <button
              className="btn btn-outline-secondary dropdown-toggle"
              type="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              {this.state.searchfield || "Search By"}
            </button>
            <div className="dropdown-menu">
              <p
                className="dropdown-item"
                onClick={() => this.setSearch("name")}
              >
                Name
              </p>
              <p
                className="dropdown-item"
                onClick={() => this.setSearch("neighbourhood")}
              >
                Neighborhood
              </p>
              <p
                className="dropdown-item"
                onClick={() => this.setSearch("zip")}
              >
                Zipcode
              </p>
            </div>
            <input
              type="text"
              className="form-control"
              aria-label="Text input with dropdown button"
              onChange={this.searchPool}
              // onKeyDown={this.searchPool}
            />
          </div>
        </div>
        <div className="row">
          {this.state.pools && this.state.pools.length
            ? this.state.pools.map((pool) => {
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
const mapStateToProps = (state) => ({
  pools: state.poolReducer.pools,
});
const mapDispatchToProps = (dispatch) => ({
  getPools: () => dispatch(poolActions.getPools()),
  clearPools: () => dispatch(poolActions.clearPools()),
  requestToJoinPool: (id, screenName) =>
    dispatch(poolActions.requestToJoinPool(id, screenName)),
});
export default connect(mapStateToProps, mapDispatchToProps)(BrowsePool);
