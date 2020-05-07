import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import _ from "lodash";
import { orderActions } from "./../../js/actions/index";

class Cart extends Component {
  state = {};

  placeOrder = (total) => {
    const payload = {
      userId: this.props.userId,
      storeId: this.props.cart.storeId,
      productStore: this.props.cart.products.map((product) => ({
        productStoreId: product.psId,
        quantity: product.qty,
      })),
      total,
    };
    this.props.placeOrder(payload);
  };

  handleQntyChange(pId, step, currQty) {
    this.props.modifyProductQntyInCart(pId, this.props.cart, step);
    if (currQty === 1 && step === -1) {
      this.props.deleteProductFromCart(pId, this.props.cart);
    }
  }

  handelDeleteProduct(pId) {
    this.props.deleteProductFromCart(pId, this.props.cart);
  }

  render() {
    if (
      _.isEmpty(this.props.cart) ||
      (this.props.cart.products && !this.props.cart.products.length)
    )
      return <p>No Items in cart</p>;
    const { cart } = this.props;
    const total = cart.products.reduce((total, p) => {
      return (total += _.round(p.qty * p.price, 2));
    }, 0);
    let tax = _.round(0.0925 * total, 2);
    let conFee = _.round(0.005 * total, 2);
    const finalCartTotal = _.round(total + conFee + tax, 2);
    return (
      <React.Fragment>
        <div className="card mt-5">
          <div className="card-header">
            Cart
            <span className="float-right badge badge-primary">
              {cart.storeName}
            </span>
          </div>

          <ul className="list-group list-group-flush">
            {this.props.cart.products.map((p) => (
              <li className="list-group-item">
                <div className="row">
                  <div className="col">
                    {p.brand} - {p.name}
                  </div>
                  <div className="col-2">
                    {p.unit} @ ${p.price}
                  </div>
                  <div className="col-2">
                    <button
                      onClick={() => this.handleQntyChange(p.id, -1, p.qty)}
                      className="btn btn-light btn-sm mr-1"
                    >
                      -
                    </button>
                    {p.qty}
                    <button
                      onClick={() => this.handleQntyChange(p.id, +1, p.qty)}
                      className="btn btn-light btn-sm ml-1"
                    >
                      +
                    </button>
                  </div>
                  <div className="col-2"> ${_.round(p.price * p.qty, 2)}</div>
                  <button
                    onClick={() => this.handelDeleteProduct(p.id)}
                    className="btn btn-danger btn-sm float-right"
                  >
                    X
                  </button>
                </div>
              </li>
            ))}

            <li className="list-group-item">
              <div className="row text-right">
                <div className="col">Tax@9.25%</div>
                <div className="col-2 ">${tax}</div>
              </div>
            </li>
            <li className="list-group-item">
              <div className="row text-right">
                <div className="col">convenience fee@0.5%</div>
                <div className="col-2 ">${conFee}</div>
              </div>
            </li>
          </ul>
          <div className="card-body text-right">
            <h2 className="">Total ${_.round(total + conFee + tax, 2)}</h2>
          </div>
          <div className="card-footer">
            <button
              className="btn btn-primary btn-block"
              onClick={() => this.placeOrder(finalCartTotal)}
            >
              Place Order
            </button>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
const mapStateToProps = (state) => ({
  cart: state.orderReducer.cart,
  userId: state.auth.user.id,
});
const mapDisPatchToProps = (dispatch, ownProps) => ({
  modifyProductQntyInCart: (productId, cart, step) =>
    dispatch(orderActions.modifyProductQntyInCart(productId, cart, step)),
  deleteProductFromCart: (productId, cart) =>
    dispatch(orderActions.deleteProductFromCart(productId, cart)),
  placeOrder: (orderDetails) => dispatch(orderActions.placeOrder(orderDetails, ownProps)),
});
export default withRouter(connect(mapStateToProps, mapDisPatchToProps)(Cart));
