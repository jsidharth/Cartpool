import React, { Component } from "react";
import { connect } from "react-redux";
import { adminActions } from "../../js/actions";
import { Link } from "react-router-dom";

class AdminStoreHome extends Component {
  //state = {};

  handleDeleteStore(sId) {
    alert("delete " + sId);
  }

  render() {
    return (
      <React.Fragment>
        <h2>AdminStoreHome</h2>
        <Link
          to="/admin/stores/add"
          className="btn btn-primary float-right m-2"
        >
          Add Store
        </Link>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Name</th>
              <th scope="col">Logo Url</th>
              <th scope="col">Street</th>
              <th scope="col">City</th>
              <th scope="col">State</th>
              <th scope="col">Zip</th>
              <th scope="col"></th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {/* {this.props.stores.map(s => (
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
                <td>{s.logoUrl}</td>
                <td>{s.street}</td>
                <td>{s.city}</td>
                <td>{s.state}</td>
                <td>{s.zip}</td>
                <td>
                  <Link
                    className="btn btn-link"
                    to={`/admin/stores/edit/${s.id}`}
                  >
                    edit
                  </Link>
                </td>
                <td>
                  <button
                    onClick={() => this.handleDeleteStore(s.id)}
                    className="btn btn-link"
                  >
                    delete
                  </button>
                </td>
              </tr>
            ))} */}
          </tbody>
        </table>
      </React.Fragment>
    );
  }
}

export default AdminStoreHome;
