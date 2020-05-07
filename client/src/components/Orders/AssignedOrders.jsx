import React, { Component } from "react";
import OrderCard from "./OrderCard";
import { connect } from "react-redux";
import { orderActions } from "../../js/actions";
import { withRouter } from "react-router-dom";

class AssignedOrders extends Component {
  state = {};
  componentDidMount() {
    this.props.getAssignedOrders();
  }

  goToOrderDetail = (orderId) => {
      this.props.history.push(`/order/${orderId}`)
  };

  render() {
    return (
      <div>
        {/* TODO: Style this heading */}
        <h1 className="display-4">Assigned Orders</h1>
        <hr />
        <div className="row ">
          {this.props.assignedOrders && this.props.assignedOrders.length
            ? this.props.assignedOrders.map((order) => {
                return (
                  <div className="col-3 float-left m-3">
                    <OrderCard
                      {...order}
                      goToOrderDetail={() => this.goToStoreDetail}
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
  assignedOrders: state.orderReducer.assignedOrders,
});
const mapDispatchToProps = (dispatch) => ({
  getAssignedOrders: () => dispatch(orderActions.getAssignedOrders()),
});
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AssignedOrders));
