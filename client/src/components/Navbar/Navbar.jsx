import React, { Component } from "react";
import { TiShoppingCart } from "react-icons/ti";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { authActions } from "../../js/actions";
import _ from "lodash";

class Navbar extends Component {
  state = {};

  signOut = () => {
    this.props.signOut();
  };
  render() {
    console.log("navbar-cart", this.props.cart);

    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        {/* TODO: Change to link */}
        <Link className="navbar-brand" to="/">
          <TiShoppingCart />
          pool
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          {!_.isEmpty(this.props.user) ? (
            this.props.user.role === "USER" ? (
              <ul className="navbar-nav">
                <li className="nav-item ">
                  <Link to="/browse/stores" style={{ textDecoration: "none" }}>
                    <div className="nav-link">Browse</div>
                  </Link>
                </li>

                <li className="nav-item dropdown">
                  <div
                    className="nav-link dropdown-toggle"
                    id="navbarDropdownMenuLink"
                    role="button"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    Pool
                  </div>
                  <div
                    className="dropdown-menu"
                    aria-labelledby="navbarDropdownMenuLink"
                  >
                    <Link className="dropdown-item" to="/pool/browse">
                      Browse pools
                    </Link>
                    <Link className="dropdown-item" to="/pool/detail">
                      My Pool
                    </Link>
                  </div>
                </li>

                <li className="nav-item dropdown">
                  <div
                    className="nav-link dropdown-toggle"
                    id="navbarDropdownMenuLink"
                    role="button"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    Order
                  </div>
                  <div
                    className="dropdown-menu"
                    aria-labelledby="navbarDropdownMenuLink"
                  >
                    <Link className="dropdown-item" to="/order/myorders">
                      My Orders
                    </Link>
                    <Link className="dropdown-item" to="/order/assignedorders">
                      Orders to pickup
                    </Link>
                  </div>
                </li>
              </ul>
            ) : (
              <ul className="navbar-nav">
                <li className="nav-item active">
                  <Link to="/admin/stores" style={{ textDecoration: "none" }}>
                    <div className="nav-link">Store</div>
                  </Link>
                </li>
                <li className="nav-item active">
                  <Link to="/admin/products" style={{ textDecoration: "none" }}>
                    <div className="nav-link">Products</div>
                  </Link>
                </li>
              </ul>
            )
          ) : null}
          {!_.isEmpty(this.props.user) ? (
            <div className="collapse navbar-collapse justify-content-end">
              <div className="navbar-nav">
                <ul className="navbar-nav">
                  <li>
                    <Link to="/cart" style={{ textDecoration: "none" }}>
                      <div className="nav-link">
                        Cart
                        {!_.isEmpty(this.props.cart) && (
                          <span className="badge badge-danger ml-1">
                            {this.props.cart.products.length}
                          </span>
                        )}
                      </div>
                    </Link>
                  </li>
                  <li className="nav-item dropdown dropleft">
                    <div
                      className="nav-link dropdown-toggle "
                      id="navbarDropdownMenuLink"
                      role="button"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      {this.props.user.nickName}
                    </div>

                    <div
                      className="dropdown-menu"
                      aria-labelledby="navbarDropdownMenuLink"
                    >
                      <Link className="dropdown-item" to="/account">
                        Account
                      </Link>
                      <Link className="dropdown-item" to="/cart">
                        Cart
                      </Link>
                      <div className="dropdown-item" onClick={this.signOut}>
                        Logout
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          ) : null}
        </div>
      </nav>
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth.user,
  cart: state.orderReducer.cart
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  signOut: () => dispatch(authActions.signOut(ownProps))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Navbar));
