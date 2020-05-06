import React, { Component } from "react";
import { TiShoppingCart } from "react-icons/ti";
import { Link } from "react-router-dom";

class Navbar extends Component {
  state = {};
  render() {
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
          <ul className="navbar-nav">
            <li className="nav-item active">
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
                <Link className="dropdown-item" to="">
                  My Orders
                </Link>
                <Link className="dropdown-item" to="">
                  Orders to pickup
                </Link>
              </div>
            </li>
          </ul>
          <div className="collapse navbar-collapse justify-content-end">
            <div className="navbar-nav">
              <ul className="navbar-nav">
              <li className="nav-item dropdown dropleft">
              <div
                className="nav-link dropdown-toggle "
                id="navbarDropdownMenuLink"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Tejas
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
              </div>
            </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    );
  }
}

export default Navbar;
