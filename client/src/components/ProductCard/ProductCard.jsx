import React, { Component } from "react";
import poolLogo from "./../../assets/carpool.jpg";

class Card extends Component {
  state = {};
  render() {
    const { id, name, desc, brand, price, unit, imageUrl } = this.props;
    return (
      <div className="card poolcard" style={{ width: "18rem" }}>
        <div className="card-body">
          <div className="row m-1">
            <div className="col">
              <img
                src={imageUrl || poolLogo}
                class="rounded img-thumbnail"
                alt="..."
                max-width="100%"
                height="200px"
              />
            </div>
          </div>
          <div className="row m-1">
            <div className="col">
              <h5 className="card-title">{name || "Product Name"}</h5>
            </div>
          </div>
          <div className="row m-1">
            <div className="col">
              <h6 className="card-subtitle text-muted">
                {desc || "Product description"}
              </h6>
            </div>
          </div>
          <div className="row m-1">
            <div className="col">
              <p className="card-text">Brand</p>
            </div>
            <div className="col">
              <p className="card-text">{brand}</p>
            </div>
          </div>
          <div className="row m-1">
            <div className="col">
              <p className="card-text">Price</p>
            </div>
            <div className="col">
              <p className="card-text">{price}</p>
            </div>
          </div>
          <div className="row m-1">
            <div className="col">
              <p className="card-text">Unit</p>
            </div>
            <div className="col">
              <p className="card-text">{unit}</p>
            </div>
          </div>
          <div className="row m-1">
            <div className="col">
              <p className="card-text">Quantity</p>
            </div>
            <div className="col">
              <input
                type="number"
                className="form-control"
                placeholder="Qty"
                aria-label="Quantity"
                aria-describedby="basic-addon1"
                min="0"
              />
            </div>
          </div>
          <div className="row m-1 mt-3">
            <div className="col">
              <button
                type="button"
                className="btn btn-primary float-right"
                onClick={this.props.buttonAction}
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Card;
