import React, { Component } from "react";
import { connect } from "react-redux";
import { adminActions } from "../../js/actions";
import { Link } from "react-router-dom";

class AdminProductHome extends Component {
  componentDidMount() {
    if (this.props.products.length === 0) {
      console.log("before this.props.getProducts");
      this.props.getProducts();
    }
  }

  handleDeleteProduct(pId) {
    this.props.deleteProduct(pId);
  }

  render() {
    console.log(this.props.products);
    return (
      <React.Fragment>
        <h2>Admin Product Home</h2>
        <Link
          to="/admin/products/add"
          className="btn btn-primary float-right m-2"
        >
          Add Product
        </Link>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Name</th>
              <th scope="col">Brand</th>
              <th scope="col">Price</th>
              <th scope="col">Unit</th>
              <th scope="col"></th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {this.props.products.map(p => (
              <tr key={p.id}>
                <td>{p.id}</td>
                <td>
                  <Link
                    className="btn btn-link"
                    to={`/admin/products/dv/${p.id}`}
                  >
                    {p.name}
                  </Link>
                </td>
                <td>{p.brand}</td>
                <td>{p.price}</td>
                <td>{p.unit}</td>
                <td>
                  <Link
                    className="btn btn-link"
                    to={`/admin/products/edit/${p.id}`}
                  >
                    edit
                  </Link>
                </td>
                <td>
                  <button
                    onClick={() => this.handleDeleteProduct(p.id)}
                    className="btn btn-link"
                  >
                    delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  products: state.adminReducer.products
});

const mapDispatchToProps = dispatch => ({
  getProducts: () => {
    dispatch(adminActions.getProducts());
  },
  deleteProduct: productId => {
    dispatch(adminActions.deleteProduct(productId));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(AdminProductHome);
