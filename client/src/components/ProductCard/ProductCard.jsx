import React, { Component } from "react";
import poolLogo from "./../../assets/carpool.jpg";

class Card extends Component {
  state = {};
  render() {
    const { id, name, desc, brand, price, unit, imageUrl } = this.props;
    return (
      <div className="card poolcard" style={{ width: "18rem" }}>
        <img
          src={imageUrl || poolLogo}
          class="rounded img-thumbnail"
          alt="..."
          max-width="100%"
          height="150px"
        />

        <div className="card-body">
          <div className="row">
            <div className="col">
              <h5 className="card-title">{name} | {brand}</h5>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <h6 className="card-subtitle text-muted">
                {desc || "Product description"}
              </h6>
            </div>
          </div>
          
          <div className="row">
            <div className="col">
              <p className="card-text">{unit} @ ${price}</p>
            </div>
          </div>
          
          <div className="row">
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
