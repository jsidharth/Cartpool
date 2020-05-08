import React, { Component } from "react";
import { connect } from "react-redux";
import poolLogo from "./../../assets/carpool.jpg";
import { orderActions } from "./../../js/actions/index";
class ProductCard extends Component {
  state = {};

  addToCart = () => {
    const {
      psId,
      id,
      name,
      brand,
      price,
      unit,
      storeId,
      storeName,
      currentCart,
    } = this.props;
    this.props.addToCart({
      psId,
      id,
      name,
      brand,
      price,
      unit,
      storeId,
      storeName,
      currentCart,
    });
  };
  render() {
    const { name, desc, brand, price, unit, imgUrl } = this.props;
    return (
      <div className="card poolcard shadow m-2">
        {/* <img
          src={imgUrl || poolLogo}
          className="rounded img-thumbnail"
          alt="..."
          max-width="100%"
          height="150px"
        /> */}
        <img
          src={imgUrl||poolLogo}
          className="card-img"
          max-width="100%"
          height="180px"
          alt="..."
        />
        <div className="card-body">
          <div className="row">
            <div className="col">
              <h5 className="card-title">
                {name} | {brand}
              </h5>
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
              <p className="card-text">
                {unit} | ${price}
              </p>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <button
                type="button"
                className="btn btn-primary float-right"
                onClick={this.addToCart}
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

const mapStateToProps = (state) => ({
  currentCart: state.orderReducer.cart,
});
const mapDisPatchToProps = (dispatch) => ({
  addToCart: (payload) => dispatch(orderActions.addToCart(payload)),
});
export default connect(mapStateToProps, mapDisPatchToProps)(ProductCard);
