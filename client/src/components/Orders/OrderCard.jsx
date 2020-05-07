import React, { Component } from "react";

class OrderCard extends Component {
  state = {};
  render() {
    const { id, orderStatus, total, buttonText } = this.props;
    return (
      <div className="card poolcard shadow">
        <div className="card-body">
          <p className="card-title">
            <small className="badge badge-info float-right">
              {orderStatus}
            </small>
            <small className="text-muted">Order#</small>
            {id}
          </p>
          <hr />

          <span className="card-text text-muted">${total}</span>
          <button
            type="button"
            className="btn btn-primary float-right"
            onClick={() => this.props.goToOrderDetail(id)}
          >
            {buttonText}
          </button>
        </div>
      </div>
    );
  }
}

export default OrderCard;
