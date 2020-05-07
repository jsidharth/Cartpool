import React, { Component } from "react";
import OrderCard from "./OrderCard";
import { connect } from "react-redux";
import { orderActions } from "../../js/actions";
import { withRouter } from "react-router-dom";

class MyOrders extends Component {
  state = {};
  componentDidMount() {
    this.props.getUserOrders(this.props.userId);
  }

  goToOrderDetail = orderId => {
    this.props.history.push(`/order/dv/${orderId}`);
  };

  render() {
    return (
      <div>
        {/* TODO: Style this heading */}
        <h1 className="display-4">My Orders</h1>
        <hr />
        <div className="row ">
          {this.props.userOrders && this.props.userOrders.length
            ? this.props.userOrders.map(order => {
                return (
                  <div className="col-3 float-left mt-3">
                    <OrderCard
                      {...order}
                      goToOrderDetail={this.goToOrderDetail}
                      buttonText="View"
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
  userOrders: state.orderReducer.userOrders,
  userId: state.auth.user.id
});
const mapDispatchToProps = dispatch => ({
  getUserOrders: userId => dispatch(orderActions.getUserOrders(userId))
});
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(MyOrders)
);
