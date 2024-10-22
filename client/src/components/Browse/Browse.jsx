import React, { Component } from "react";
import Card from "../Card/Card";
import { connect } from "react-redux";
import { adminActions } from "../../js/actions";
import { withRouter } from "react-router-dom";
import requireAuth from "./../RequireAuth/RequireAuth";
class Browse extends Component {
  state = {};

  componentDidMount() {
    this.props.getStores();
  }

  goToStoreDetail = (id, name) => {
    this.props.history.push(`/store/detail/${name}`);
  };

  render() {
    return (
      <div>
        {/* TODO: Style this heading */}
        <h1 className="display-4">Stores</h1>
        <hr />
        <div className="row ">
          {this.props.stores && this.props.stores.length
            ? this.props.stores.map((store) => {
                return (
                  <div className="col-3 float-left m-3">
                    <Card
                      {...store}
                      id={store.id}
                      buttonAction={this.goToStoreDetail}
                      buttonText="Go to store"
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
  stores: state.adminReducer.stores,
});

const mapDispatchToProps = (dispatch) => ({
  getStores: () => {
    dispatch(adminActions.getStores());
  },
});

export default requireAuth(connect(mapStateToProps, mapDispatchToProps)(withRouter(Browse)));
