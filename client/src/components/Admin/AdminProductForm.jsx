import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { adminActions } from "../../js/actions";

class AdminProductForm extends Component {
  state = {
    data: {
      name: "",
      description: "",
      imgUrl: "",
      brand: "",
      unit: "",
      price: ""
    },
    edit: false
  };

  componentDidMount() {
    if (this.props.match.params.id && !this.state.edit) {
      this.props.getProductById(this.props.match.params.id);
      this.setState({ edit: true });
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
      const data = { ...this.state.data };
      alert("update");
      this.props.updateProduct(data);
    } else {
      const data = { ...this.state.data };
      this.props.addProduct(data);
    }
  };

  render() {
    const { data, edit } = this.state;
    if (
      edit &&
      this.props.productToEdit &&
      JSON.stringify(this.props.productToEdit) !==
        JSON.stringify(this.state.data)
    ) {
      const data = { ...this.props.productToEdit };
      this.setState({ data });
    }

    return (
      <React.Fragment>
        <h2>AdminProductForm</h2>
        <Link to="/admin/products" className="btn btn-link ">
          Go Back
        </Link>

        <div className="row justify-content-center mt-5">
          <div className="col-10">
            <div className="card">
              <div className="card-header">
                {edit
                  ? `Editing Product ID: ${data.id}`
                  : "Enter Product details"}
              </div>
              <div className="card-body">
                <form onSubmit={this.handleSubmit}>
                  <div className="row">
                    <div className="col">
                      <div className="form-group">
                        <label>Name</label>
                        <input
                          name="name"
                          onChange={this.handleChange}
                          required
                          type="text"
                          className="form-control"
                          placeholder="Enter Product name"
                          value={data.name}
                        />
                      </div>
                      <div className="form-group">
                        <label>Brand</label>
                        <input
                          name="brand"
                          onChange={this.handleChange}
                          required
                          type="text"
                          className="form-control"
                          placeholder="Enter Product brand"
                          value={data.brand}
                        />
                      </div>
                      <div className="form-group">
                        <label>Description</label>
                        <textarea
                          name="description"
                          onChange={this.handleChange}
                          className="form-control"
                          rows="2"
                          required
                          placeholder="Enter product description.."
                          value={data.description}
                        ></textarea>
                      </div>
                    </div>
                    <div className="col">
                      <div className="form-group">
                        <label>Image URL</label>
                        <input
                          name="imgUrl"
                          onChange={this.handleChange}
                          required
                          type="text"
                          className="form-control"
                          placeholder="Enter Product image url"
                          value={data.imgUrl}
                        />
                      </div>
                      <div className="form-group">
                        <label>Product Unit</label>
                        <input
                          name="unit"
                          onChange={this.handleChange}
                          required
                          type="text"
                          className="form-control"
                          placeholder="Enter Product unit eg. 2 lb"
                          value={data.unit}
                        />
                      </div>
                      <div className="form-group">
                        <label>Product price</label>
                        <input
                          name="price"
                          onChange={this.handleChange}
                          required
                          type="number"
                          className="form-control"
                          placeholder="Enter Product price in $ "
                          value={data.price}
                        />
                      </div>
                    </div>
                  </div>
                  <button className="btn btn-primary float-right">
                    {edit ? "Update Product" : "Add Product"}
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
  productToEdit: state.adminReducer.currentProduct
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  addProduct: payload => dispatch(adminActions.addProduct(payload, ownProps)),
  getProductById: id => dispatch(adminActions.getProductById(id)),
  updateProduct: payload =>
    dispatch(adminActions.updateProduct(payload, ownProps))
});

export default connect(mapStateToProps, mapDispatchToProps)(AdminProductForm);
