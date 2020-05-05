import React, { Component } from "react";
import { connect } from "react-redux";
import { adminActions } from "../../js/actions";
import { withRouter } from "react-router-dom";
class AdminProductDV extends Component {
  componentDidMount() {
    this.props.getProductById(this.props.match.params.id);
  }

  handleGoBack() {
    this.props.history.goBack();
  }

  render() {
    if (!this.props.currProduct)
      return <React.Fragment>Not Found</React.Fragment>;

    return (
      <React.Fragment>
        <h2>AdminProductDV</h2>

        <button
          onClick={() => this.props.history.goBack()}
          className="btn btn-link"
        >
          go back
        </button>
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
                      className="card-img"
                      max-width="100%"
                      height="180px"
                      alt="car"
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
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  currProduct: state.adminReducer.currentProduct
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  // addProduct: payload => dispatch(adminActions.addProduct(payload, ownProps)),
  getProductById: id => dispatch(adminActions.getProductById(id))
  // updateProduct: payload =>
  //   dispatch(adminActions.updateProduct(payload, ownProps))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(AdminProductDV));
