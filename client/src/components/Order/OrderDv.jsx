import React, { Component } from "react";
import { orderActions } from "../../js/actions";
import { connect } from "react-redux";
import _ from "lodash";

class OrderDv extends Component {
  componentDidMount() {
    this.props.getCurrentOrder(this.props.match.params.orderId);
  }
  render() {
    const {
      id,
      orderStatus,
      total,
      storeId,
      assignedToUser,
      items,
    } = this.props.currentOrder;
    if (_.isEmpty(this.props.currentOrder)) return null;
    return (
      <React.Fragment>
        <div className="card shadow mt-5">
          <div className="card-body">
            <span className="badge badge-success float-right">
              {orderStatus}
            </span>
            <h5 className="card-title">Order #{id}</h5>

            <h6 className="card-subtitle mb-2 text-muted">
              {storeId.name} | Total ${total}
            </h6>
            <table class="table mt-2">
              <thead>
                <tr>
                  <th scope="col">Product</th>
                  <th scope="col">Brand</th>
                  <th scope="col">Qnty</th>
                </tr>
              </thead>
              <tbody>
                {items && items.length
                  ? items.map((item) => {
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
            <p className="card-subtitle text-muted float-left">
              Order Picked By {`${assignedToUser}`}
            </p>
            {orderStatus && orderStatus === "DELIVERED" ? (
              <button className="btn btn-danger float-right ">
                Not delivered
              </button>
            ) : (
              <button className="btn btn-danger float-right disabled">
                Not delivered
              </button>
            )}
          </div>
        </div>
      </React.Fragment>
    );
  }
}
const mapStateToProps = (state) => ({
  currentOrder: state.orderReducer.currentOrder,
});
const mapDispatchToProps = (dispatch) => ({
  getCurrentOrder: (orderId) => dispatch(orderActions.getOrderById(orderId)),
});
export default connect(mapStateToProps, mapDispatchToProps)(OrderDv);
