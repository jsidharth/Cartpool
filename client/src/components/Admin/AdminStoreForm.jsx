import React, { Component } from "react";
import { Link } from "react-router-dom";
import { adminActions } from "../../js/actions";
import { connect } from "react-redux";

class AdminStoreForm extends Component {
  state = {
    data: {
      name: "",
      logoUrl: "",
      street: "",
      city: "",
      state: "",
      zip: ""
    },
    edit: false
  };

  componentDidMount() {
    if (this.props.match.params.storeName && !this.state.edit) {
      this.props.getStoreByName(this.props.match.params.storeName);
      this.setState({ edit: true });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      (this.state.edit &&
        JSON.stringify(this.props.storeToEdit) !==
          JSON.stringify(prevProps.storeToEdit)) ||
      (JSON.stringify(this.props.storeToEdit) ===
        JSON.stringify(prevProps.storeToEdit) &&
        this.state.data.name === "")
    ) {
      const data = { ...this.props.storeToEdit };
      this.setState({ data });
    }
  }

  handleChange = ({ currentTarget: input }) => {
    const data = { ...this.state.data };
    data[input.name] = input.value;
    this.setState({ data });
  };
  handleSubmit = e => {
    e.preventDefault();
    if (this.state.edit) {
      //alert("edit store");
      const data = { ...this.state.data };
      this.props.updateStore(data);
    } else {
      //alert("add store");
      const data = { ...this.state.data };
      this.props.addStore(data);
    }
  };
  render() {
    const { data, edit } = this.state;

    return (
      <React.Fragment>
        <h2>AdminStoreForm</h2>
        <Link to="/admin/stores" className="btn btn-link ">
          Go Back
        </Link>

        <div className="row justify-content-center mt-5">
          <div className="col-10">
            <div className="card">
              <div className="card-header">
                {edit ? `Editing Store ID: ${data.id}` : "Enter Store details"}
              </div>
              <div className="card-body">
                <form onSubmit={this.handleSubmit}>
                  <div className="form-group">
                    <label>Name</label>
                    <input
                      name="name"
                      onChange={this.handleChange}
                      required
                      type="text"
                      className="form-control"
                      placeholder="Enter Store name"
                      value={data.name}
                    />
                  </div>
                  <div className="form-group">
                    <label>Logo</label>
                    <input
                      name="logoUrl"
                      onChange={this.handleChange}
                      required
                      type="text"
                      className="form-control"
                      placeholder="Enter Store logo Url"
                      value={data.logoUrl}
                    />
                  </div>
                  <div className="row">
                    <div className="col">
                      <div className="form-group">
                        <label>Street</label>
                        <input
                          name="street"
                          onChange={this.handleChange}
                          required
                          type="text"
                          className="form-control"
                          placeholder="Enter Store street"
                          value={data.street}
                        />
                      </div>
                      <div className="form-group">
                        <label>City</label>
                        <input
                          name="city"
                          onChange={this.handleChange}
                          required
                          type="text"
                          className="form-control"
                          placeholder="Enter Store city"
                          value={data.city}
                        />
                      </div>
                    </div>
                    <div className="col">
                      <div className="form-group">
                        <label>State</label>
                        <input
                          name="state"
                          onChange={this.handleChange}
                          required
                          type="text"
                          className="form-control"
                          placeholder="Enter Store state"
                          value={data.state}
                        />
                      </div>
                      <div className="form-group">
                        <label>Zip</label>
                        <input
                          name="zip"
                          onChange={this.handleChange}
                          required
                          type="text"
                          className="form-control"
                          placeholder="Enter Store zip"
                          value={data.zip}
                        />
                      </div>
                    </div>
                  </div>
                  <button className="btn btn-primary float-right">
                    {edit ? "Update Store" : "Add Store"}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  storeToEdit: state.adminReducer.currentStore
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  addStore: payload => dispatch(adminActions.addStore(payload, ownProps)),
  getStoreByName: storeName => dispatch(adminActions.getStoreByName(storeName)),
  updateStore: payload => dispatch(adminActions.updateStore(payload, ownProps))
});

export default connect(mapStateToProps, mapDispatchToProps)(AdminStoreForm);
