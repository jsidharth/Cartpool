import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import _ from "lodash";
import { orderActions } from "./../../js/actions/index";
import Modal from "react-modal";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { toast } from "react-toastify";

Modal.setAppElement("#root");
class OrderConfirmed extends Component {
  state = {
    selectedOrders: [],
    showModal: false
  };

  componentDidMount() {
    this.setState({
      orderId: this.props.match.params.orderId,
      selectedOrders: [parseInt(this.props.match.params.orderId)]
    });
    this.props.getOrderById(this.props.match.params.orderId);
    this.props.getSimilarOrdersFromPool(this.props.match.params.orderId);
  }

  handleCardClick = orderId => {
    const orders = [...this.state.selectedOrders];
    if (orders.indexOf(orderId) < 0) {
      if (this.state.selectedOrders.length <= 9) {
        orders.push(orderId);
      } else {
        toast.error("Max limit for pickup is 10");
      }
    } else {
      if (orderId !== parseInt(this.props.match.params.orderId))
        orders.splice(orders.indexOf(orderId), 1);
    }
    this.setState({ selectedOrders: orders });
  };

  handleOpenModal = () => {
    //alert("here");
    this.setState({ showModal: true });
  };
  handleCloseModal = () => {
    this.setState({ showModal: false });
  };

  handlePickupClick = () => {
    alert("here");
    const data = {};
    data["order_ids"] = [...this.state.selectedOrders];
    this.props.pickupOrders(data);
  };

  render() {
    console.log("currentOrder", this.props.currentOrder);
    if (
      _.isEmpty(this.props.currentOrder) ||
      _.isEmpty(this.props.similarOrders)
    )
      return <p>Invalid order</p>;
    console.log("currentUser", this.props.currentUser);
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
              <div className="row mt-2">
                {similarOrders.map(order => (
                  <div key={order.id} className="col-3 float-left ">
                    <div
                      onClick={() => this.handleCardClick(order.id)}
                      className={"card " + this.addCardClass(order.id)}
                    >
                      <div className="card-header">
                        #{order.id}{" "}
                        {order.id ===
                          parseInt(this.props.match.params.orderId) && (
                          <span className="badge badge-primary float-right">
                            Your order
                          </span>
                        )}
                      </div>
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
                  <button
                    onClick={this.handleOpenModal}
                    className="btn btn-secondary btn-block"
                  >
                    Place your order in pool
                  </button>
                </div>
                <div className="col">
                  <button
                    onClick={this.handlePickupClick}
                    className="btn btn-primary btn-block"
                  >
                    Pickup your order along with{" "}
                    {this.state.selectedOrders.length - 1} order(s) from pool
                  </button>
                </div>
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

          <div className="row justify-content-center">
            <div className="col-2">
              <CircularProgressbar value={50} text={"1"} />
            </div>
            <div className="col-5">
              <p>Note: Your current credit is 4.</p>
              <hr />
              <p>Placing order in pool will reduce your credit score.</p>
              <p>
                Do you still want to proceed with placing the order in pool?
              </p>
              <div className="row">
                <div className="col">
                  <button className="btn btn-secondary">
                    Yes, place my order in pool
                  </button>
                </div>
                <div className="col">
                  <button
                    onClick={() => this.handleCloseModal()}
                    className="btn btn-primary btn-block"
                  >
                    No, go back
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Modal>
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
  currentUser: state.auth.user,
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
    dispatch(orderActions.getSimilarOrdersFromPool(id)),
  pickupOrders: (data, ownProps) =>
    dispatch(orderActions.pickupOrders(data, ownProps))
});
export default withRouter(
  connect(mapStateToProps, mapDisPatchToProps)(OrderConfirmed)
);
