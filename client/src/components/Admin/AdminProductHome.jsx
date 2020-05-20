import React, { Component } from "react";
import { connect } from "react-redux";
import { adminActions } from "../../js/actions";
import { Link } from "react-router-dom";
import { MdDeleteForever, MdModeEdit } from "react-icons/md";
import { BsPlusCircle } from "react-icons/bs";
import BootstrapTable from "react-bootstrap-table-next";
import filterFactory, { textFilter } from "react-bootstrap-table2-filter";
import requireAuth from "./../RequireAuth/RequireAuth";

class AdminProductHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      column_names: [
        {
          dataField: "id",
          text: "ID",
          filter: textFilter()
        },
        {
          dataField: "name",
          text: "Name",
          formatter: this.productNameFormatter,
          filter: textFilter()
        },
        {
          dataField: "sku",
          text: "SKU",
          filter: textFilter()
        },
        {
          dataField: "brand",
          text: "Brand"
        },
        {
          dataField: "price",
          text: "Price"
        },
        {
          dataField: "unit",
          text: "Unit"
        },
        {
          dataField: "id",
          text: "Edit",
          formatter: this.editProductFormatter
        },
        {
          text: "Delete",
          formatter: (cell, row) => {
            return (
              <button
                onClick={() => this.handleDeleteProduct(row.id)}
                className="btn btn-link"
              >
                <MdDeleteForever />
              </button>
            );
          }
        }
      ]
    };
  }

  componentDidMount() {
    if (this.props.products.length === 0) {
      console.log("before this.props.getProducts");
      this.props.getProducts();
    }
  }

  handleDeleteProduct(pId) {
    this.props.deleteProduct(pId);
  }

  productNameFormatter = (cell, row) => {
    return (
      <Link className="btn btn-link" to={`/admin/products/dv/${row.id}`}>
        {cell}
      </Link>
    );
  };

  editProductFormatter = (cell, row) => {
    return (
      <Link className="btn btn-link" to={`/admin/products/edit/${row.id}`}>
        <MdModeEdit />
      </Link>
    );
  };

  editProductFormatter = (cell, row) => {
    return (
      <Link className="btn btn-link" to={`/admin/products/edit/${cell}`}>
        <MdModeEdit />
      </Link>
    );
  };

  render() {
    console.log(this.props.products);
    return (
      <React.Fragment>
        <h2>Admin Product Home</h2>
        <Link
          to="/admin/products/add"
          className="btn btn-primary float-right m-2"
        >
          <BsPlusCircle /> Add Product
        </Link>
        {/* <table className="table">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Name</th>
              <th scope="col">Brand</th>
              <th scope="col">Price</th>
              <th scope="col">Unit</th>
              <th scope="col">Edit</th>
              <th scope="col">Delete</th>
            </tr>
          </thead>
          <tbody>
            {this.props.products.map((p) => (
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
                    <MdModeEdit />
                  </Link>
                </td>
                <td>
                  <button
                    onClick={() => this.handleDeleteProduct(p.id)}
                    className="btn btn-link"
                  >
                    <MdDeleteForever />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table> */}
        <BootstrapTable
          keyField="id"
          data={this.props.products}
          columns={this.state.column_names}
          filter={filterFactory()}
          bordered={true}
        />
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

export default requireAuth(connect(mapStateToProps, mapDispatchToProps)(AdminProductHome));
