import React, { Component } from "react";

class OrderCard extends Component {
  state = {};
  render() {
    const { id, orderStatus, total, buttonText} = this.props;
    return (
      <div className="card poolcard shadow">
        <div className="card-body">
          <h5 className="card-title">ID - {id}</h5>
          <h6 className="card-subtitle mb-2 text-muted">{orderStatus}</h6>
          <p className="card-text">${total}</p>
          <button
            type="button"
            className="btn btn-primary float-right"
            onClick={() =>this.props.goToOrderDetail(id)}
          >
            {buttonText}
          </button>
        </div>
      </div>
    );
  }
}

export default OrderCard;
