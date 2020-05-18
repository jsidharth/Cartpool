import React, { Component } from "react";
import { connect } from "react-redux";
import { adminActions } from "../../js/actions";
import { Link } from "react-router-dom";
import { MdDeleteForever, MdModeEdit } from "react-icons/md";
import { BsPlusCircle } from "react-icons/bs";



class AdminStoreHome extends Component {
  componentDidMount() {
    if (this.props.stores.length === 0) {
      this.props.getStores();
    }
  }
  handleDeleteStore(storeId) {
    //alert("delete " + storeId);
    this.props.deleteStore(storeId);
  }

  
  render() {
    return (
      <React.Fragment>
        <h2>AdminStoreHome</h2>
        <Link
          to="/admin/stores/add"
          className="btn btn-primary float-right m-2"
        >
          <BsPlusCircle /> Add Store
        </Link>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Name</th>
              <th scope="col">Street</th>
              <th scope="col">City</th>
              <th scope="col">State</th>
              <th scope="col">Zip</th>
              <th scope="col">Edit</th>
              <th scope="col">Delete</th>
            </tr>
          </thead>
          <tbody>
            {this.props.stores.map(s => (
              <tr key={s.id}>
                <td>{s.id}</td>
                <td>
                  <Link
                    className="btn btn-link"
                    to={`/admin/stores/dv/${s.id}`}
                  >
                    {s.name}
                  </Link>
                </td>
                <td>{s.street}</td>
                <td>{s.city}</td>
                <td>{s.state}</td>
                <td>{s.zip}</td>
                <td>
                  <Link
                    className="btn btn-link"
                    to={`/admin/stores/edit/${s.name}`}
                  >
                    <MdModeEdit />
                  </Link>
                </td>
                <td>
                  <button
                    onClick={() => this.handleDeleteStore(s.id)}
                    className="btn btn-link"
                  >
                    <MdDeleteForever />
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
  //products: state.adminReducer.products
  stores: state.adminReducer.stores
});

const mapDispatchToProps = dispatch => ({
  getStores: () => {
    dispatch(adminActions.getStores());
  },
  // getProducts: () => {
  //   dispatch(adminActions.getProducts());
  // },
  deleteStore: storeId => {
    dispatch(adminActions.deleteStore(storeId));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(AdminStoreHome);
