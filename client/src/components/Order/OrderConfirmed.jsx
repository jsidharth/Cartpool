import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import _ from "lodash";
import { orderActions } from "./../../js/actions/index";
class OrderConfirmed extends Component {
  state = {
    selectedOrders: []
  };

  componentDidMount() {
    // if (
    //   _.isEmpty(this.props.currentOrder) ||
    //   this.props.currentOrder.id != this.props.match.params.orderId
    // ) {
    this.setState({ orderId: this.props.match.params.orderId });
    this.props.getOrderById(this.props.match.params.orderId);
    this.props.getSimilarOrdersFromPool(this.props.match.params.orderId);
    //}
  }

  handleCardClick = orderId => {
    //alert(orderId);
    const orders = [...this.state.selectedOrders];
    if (orders.indexOf(orderId) < 0) {
      //not there
      orders.push(orderId);
    } else {
      //there
      orders.splice(orders.indexOf(orderId), 1);
    }
    this.setState({ selectedOrders: orders });
  };

  render() {
    console.log("currentOrder", this.props.currentOrder);
    if (
      _.isEmpty(this.props.currentOrder) ||
      _.isEmpty(this.props.similarOrders)
    )
      return <p>Invalid order</p>;

    console.log("similarOrders", this.props.similarOrders);
    const { similarOrders } = this.props;
    return (
      <React.Fragment>
        <React.Fragment>
          <div className="card shadow mt-3">
            <div className="card-body">
              <span className="badge badge-success float-right">
                {this.props.currentOrder.orderStatus}
              </span>
              <h5 className="card-title">
                Order #{this.props.currentOrder.id}
              </h5>
              <h6 className="card-subtitle mb-2 text-muted">
                {/* 13:00hrs 30Jul2020 | */}
                {this.props.currentOrder.storeId.name} | Total $
                {this.props.currentOrder.total}
              </h6>
              <hr />
              Select orders to pickup
              <div className="row">
                {similarOrders.map(order => (
                  <div key={order.id} className="col-3 float-left ">
                    <div
                      onClick={() => this.handleCardClick(order.id)}
                      className={"card " + this.addCardClass(order.id)}
                    >
                      <div className="card-header">#{order.id}</div>
                      <div className="card-body ">
                        <h5 className="card-title">{order.storeId.name}</h5>
                        <p className="card-text">
                          {order.items.map(item => (
                            <span className="badge badge-info m-1">
                              {item.productStore.product.name}
                            </span>
                          ))}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="row mt-4">
                <div className="col">
                  <button className="btn btn-secondary btn-block">
                    Place your order in pool
                  </button>
                </div>
                <div className="col">
                  <button className="btn btn-primary btn-block">
                    Pickup your order along with{" "}
                    {this.state.selectedOrders.length} order(s)
                  </button>
                </div>
              </div>
            </div>
          </div>
        </React.Fragment>
      </React.Fragment>
    );
  }
  addCardClass(id) {
    return this.state.selectedOrders.indexOf(id) >= 0
      ? " border-primary shadow"
      : "";
  }
}
const mapStateToProps = state => ({
  currentOrder: state.orderReducer.currentOrder,
  similarOrders: state.orderReducer.similarOrders
});
const mapDisPatchToProps = (dispatch, ownProps) => ({
  // modifyProductQntyInCart: (productId, cart, step) =>
  //   dispatch(orderActions.modifyProductQntyInCart(productId, cart, step)),
  // deleteProductFromCart: (productId, cart) =>
  //   dispatch(orderActions.deleteProductFromCart(productId, cart)),
  // placeOrder: (orderDetails) => dispatch(orderActions.placeOrder(orderDetails, ownProps)),
  getOrderById: id => dispatch(orderActions.getOrderById(id)),
  getSimilarOrdersFromPool: id =>
    dispatch(orderActions.getSimilarOrdersFromPool(id))
});
export default withRouter(
  connect(mapStateToProps, mapDisPatchToProps)(OrderConfirmed)
);
