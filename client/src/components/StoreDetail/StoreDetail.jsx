import React, { Component } from "react";
import ProductCard from "./../ProductCard/ProductCard";
import { connect } from "react-redux";
import { adminActions } from "../../js/actions";

class StoreDetail extends Component {
  state = {};

  componentDidMount() {
    this.props.getStoreByName(this.props.match.params.storeName);
  }

  render() {
    const { currentStore: store } = this.props;
    console.log("currentStore", store);
    if (!store) return <p>Loading Store {this.props.match.params.storeName}</p>;
    return (
      <div>
        <div className="row mt-5 justify-content-center">
          <div className="col-4">
            <img
              src={store.logoUrl}
              className="rounded float-left img-thumbnail"
              alt="..."
            />
          </div>
          <div className="col-8 mt-4">
            <small>Name</small>
            <h2>{store.name}</h2>
            <hr />
            <div className="row">
              <div className="col">
                <small>Street</small>
                <h4>{store.street}</h4>
              </div>
              <div className="col">
                <small>City</small>
                <h4>{store.city}</h4>
              </div>
              <div className="col">
                <small>State</small>
                <h4>{store.state}</h4>
              </div>
              <div className="col">
                <small>Zip</small>
                <h4>{store.zip}</h4>
              </div>
            </div>
          </div>
        </div>
        <div className="row m-1 justify-content-center font-weight-bold">
          Available products
        </div>
        <div className="row ">
          {this.props.productsInStore &&
            this.props.productsInStore.length &&
            this.props.productsInStore.map((ps) => {
              return (
                <div className="col-4 float-left ">
                  <ProductCard
                    {...ps.product}
                    psId={ps.id}
                    storeName={ps.store.name}
                    storeId={ps.storeId}
                  />
                </div>
              );
            })}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currentStore: state.adminReducer.currentStore,
  productsInStore: state.adminReducer.productsInStore,
});

const mapDispatchToProps = (dispatch) => ({
  getStoreByName: (storeName) =>
    dispatch(adminActions.getStoreByName(storeName)),
  // getStoresWithProduct: productId =>
  //   dispatch(adminActions.getStoresWithProduct(productId)),
  getProductsInStore: (productId) =>
    dispatch(adminActions.getProductsInStore(productId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(StoreDetail);
