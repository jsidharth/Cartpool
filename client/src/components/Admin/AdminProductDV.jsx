import React, { Component } from "react";
import { connect } from "react-redux";
import { adminActions } from "../../js/actions";
//import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";
import requireAuth from "./../RequireAuth/RequireAuth";

import _ from "lodash";
class AdminProductDV extends Component {
  state = {
    selectedStores: []
  };

  componentDidMount() {
    this.props.getProductById(this.props.match.params.id);
    this.props.getStoresWithProduct(this.props.match.params.id);
    this.props.getStores();
    this.setState({ productId: this.props.match.params.id });
  }

  handleGoBack() {
    this.props.history.goBack();
  }

  handleStoreSelected(storeId) {
    //alert(storeId);
    const storeIds = [...this.state.selectedStores];
    if (storeIds.indexOf(storeId) < 0) {
      //not there
      storeIds.push(storeId);
    } else {
      //there
      storeIds.splice(storeIds.indexOf(storeId), 1);
    }
    this.setState({ selectedStores: storeIds });
  }

  handleAddProdToStoreClick = () => {
    const data = {};
    data["product"] = this.state.productId;
    data["stores"] = [...this.state.selectedStores];
    console.log("handleAddProdToStoreClick", data);
    this.props.addProductToStore(data, this.state.productId);
  };

  render() {
    if (!this.props.currProduct)
      return <React.Fragment>Not Found</React.Fragment>;

    var dif = _.differenceWith(
      this.props.stores,
      this.props.storesWithProduct,
      _.isEqual
    );
    console.log("dif", dif);
    return (
      <React.Fragment>
        <h2>AdminProductDV</h2>

        <Link to="/admin/products" className="btn btn-link ">
          Go Back
        </Link>

        {/* <button
          onClick={() => this.props.history.goBack()}
          className="btn btn-link"
        >
          go back
        </button> */}
        <div className="row justify-content-center mt-5">
          <div className="col-10">
            <div className="card">
              <div className="card-header">
                {`Product ID: ${this.props.currProduct.id}`}
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-4">
                    <img
                      src={this.props.currProduct.imgUrl}
                      className="rounded img-thumbnail "
                      max-width="100%"
                      height="180px"
                      alt="product"
                    />
                  </div>
                  <div className="col-8">
                    <div className="row">
                      <div className="col">
                        <small>Name</small>
                        <h2>{this.props.currProduct.name}</h2>
                      </div>
                      <div className="col">
                        <small>Brand</small>
                        <h2>{this.props.currProduct.brand}</h2>
                      </div>
                      <div className="col">
                        <small>Price</small>
                        <h2>{`$${this.props.currProduct.price}`}</h2>
                      </div>
                      <div className="col">
                        <small>unit</small>
                        <h2>{this.props.currProduct.unit}</h2>
                      </div>
                      <br />
                    </div>
                    <hr />
                    <small>Description</small>
                    <p>{this.props.currProduct.description}</p>
                  </div>
                </div>
                <small>
                  {`Available in ${this.props.storesWithProduct.length} store(s)`}{" "}
                </small>
                <br />
                <div className="row m-1 text-center">
                  {this.props.storesWithProduct.map(store => (
                    <div
                      key={store.name}
                      className="card float-left m-1 col-3 border-dark"
                    >
                      <div className="card-body ">{store.name}</div>
                    </div>
                  ))}
                </div>

                {dif.length !== 0 && (
                  <React.Fragment>
                    <hr />
                    <h6>Add product to other stores</h6>
                    <div className="row m-1 text-center">
                      {dif.map(store => (
                        <div
                          key={store.id}
                          className={this.addCardClass(store.id)}
                          onClick={() => this.handleStoreSelected(store.id)}
                        >
                          <div className="card-body ">{store.name}</div>
                        </div>
                      ))}
                    </div>
                    <button
                      className="btn btn-primary float-right"
                      disabled={this.state.selectedStores.length === 0}
                      onClick={this.handleAddProdToStoreClick}
                    >
                      Add this product to selected stores
                    </button>
                  </React.Fragment>
                )}
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }

  addCardClass(id) {
    let border = "";
    if (this.state.selectedStores.indexOf(id) >= 0) {
      border = " border-primary ";
    }
    return "card float-left col-3 m-1 " + border;
  }
}

const mapStateToProps = state => ({
  currProduct: state.adminReducer.currentProduct,
  storesWithProduct: state.adminReducer.storesWithProduct,
  stores: state.adminReducer.stores
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  getProductById: id => dispatch(adminActions.getProductById(id)),
  getStoresWithProduct: productId =>
    dispatch(adminActions.getStoresWithProduct(productId)),
  getStores: () => {
    dispatch(adminActions.getStores());
  },
  addProductToStore: (payload, productId) =>
    dispatch(adminActions.addProductToStore(payload, productId))
});

export default requireAuth(connect(mapStateToProps, mapDispatchToProps)(AdminProductDV));
