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

  goToOrderDetail = orderId => {
    this.props.history.push(`/order/dv/${orderId}?assigned=true`);
  };

  render() {
    return (
      <div>
        {/* TODO: Style this heading */}
        <h1 className="display-4">Orders to pickup</h1>
        <hr />
        <div className="row ">
          {this.props.assignedOrders && this.props.assignedOrders.length
            ? this.props.assignedOrders.map(order => {
                return (
                  <div className="col-3 float-left mt-3">
                    <OrderCard
                      {...order}
                      goToOrderDetail={this.goToOrderDetail}
                      buttonText="Checkout"
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
const mapStateToProps = state => ({
  assignedOrders: state.orderReducer.assignedOrders
});
const mapDispatchToProps = dispatch => ({
  getAssignedOrders: () => dispatch(orderActions.getAssignedOrders())
});
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(AssignedOrders)
);
