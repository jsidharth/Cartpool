import React, { Component } from "react";
import { orderActions } from "../../js/actions";
import { connect } from "react-redux";
import _ from "lodash";
import queryString from "query-string";
import QRcode from "qrcode.react";

class OrderDv extends Component {
  componentDidMount() {
    this.props.getCurrentOrder(this.props.match.params.orderId);
  }

  handleUpdateOrder = (orderStatus, id) => {
    if (orderStatus === "ORDER_PLACED") {
      alert("ORDER_PLACED " + orderStatus + " + " + id);
      this.props.updateOrder(id, "ORDER_PICKED");
    }
    if (orderStatus === "ORDER_PICKED") {
      alert("ORDER_PLACED " + orderStatus + " + " + id);
      this.props.updateOrder(id, "ORDER_DELIVERED");
    }
  };

  render() {
    const {
      id,
      orderStatus,
      total,
      storeId,
      assignedToUser,
      items
    } = this.props.currentOrder;
    const queryParams = queryString.parse(this.props.location.search);
    const assigned = queryParams.assigned;
    if (_.isEmpty(this.props.currentOrder)) return null;
    const qrcodeString = String(id);
    return (
      <React.Fragment>
        <div className="card shadow mt-5">
          <div className="card-body">
            <div className="row">
              {assigned && (
                <div className="col-2">
                  <QRcode value={`#${qrcodeString}`} renderAs="svg" />
                </div>
              )}
              <div className="col">
                <span className="badge badge-success float-right">
                  {orderStatus}
                </span>
                <h5 className="card-title">Order #{id}</h5>

                <h6 className="card-subtitle mb-2 text-muted">
                  {storeId.name} | Total ${total}
                </h6>
              </div>
            </div>

            <table className="table mt-2">
              <thead>
                <tr>
                  <th scope="col">Product</th>
                  <th scope="col">Brand</th>
                  <th scope="col">Qnty</th>
                </tr>
              </thead>
              <tbody>
                {items && items.length
                  ? items.map(item => {
                      return (
                        <tr>
                          <td>{item.productStore.product.name}</td>
                          <td>{item.productStore.product.brand}</td>
                          <td>{item.quantity}</td>
                        </tr>
                      );
                    })
                  : null}
              </tbody>
            </table>

            {assigned && orderStatus === "ORDER_PICKED" && (
              <div className="row">
                <strong>Delivery Address: </strong>
                <p>{this.props.currentOrder.screenName},</p>
                <br />
                <p>{this.props.currentOrder.street}</p>
                <br />
                <p>{this.props.currentOrder.state}</p>
                <br />
                <p>{this.props.currentOrder.zip}</p>
                <br />
              </div>
            )}

            {assigned && orderStatus === "ORDER_PLACED" && (
              <button
                className="btn btn-primary"
                onClick={() => this.handleUpdateOrder(orderStatus, id)}
              >
                Order picked up
              </button>
            )}
            {assigned && orderStatus === "ORDER_PICKED" && (
              <button
                className="btn btn-primary"
                onClick={() => this.handleUpdateOrder(orderStatus, id)}
              >
                Order Delivered
              </button>
            )}
          </div>
        </div>
      </React.Fragment>
    );
  }
}
const mapStateToProps = state => ({
  currentOrder: state.orderReducer.currentOrder
});
const mapDispatchToProps = dispatch => ({
  getCurrentOrder: orderId => dispatch(orderActions.getOrderById(orderId)),
  updateOrder: (orderId, orderStatus) =>
    dispatch(orderActions.updateOrder(orderId, orderStatus))
});
export default connect(mapStateToProps, mapDispatchToProps)(OrderDv);
